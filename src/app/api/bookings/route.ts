import { BookingStatus, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { addMinutes } from "date-fns";
import { stays } from "@/features/stays/data/demo-data";
import { createDemoBooking } from "@/features/booking/server/demo-store";
import { normalizePhone } from "@/shared/lib/format";
import { calculatePrice } from "@/features/booking/domain/pricing";
import { prisma } from "@/server/database/prisma";
import { rateLimit } from "@/server/security/rate-limit";
import { createBookingSchema } from "@/features/booking/domain/validation";

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!rateLimit(`booking:${forwarded}`, 6, 60_000).allowed) return NextResponse.json({ message: "Bạn thao tác hơi nhanh. Vui lòng thử lại sau một phút." }, { status: 429 });
  const body = await request.json().catch(() => null);
  const parsed = createBookingSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Thông tin đặt phòng chưa hợp lệ" }, { status: 400 });
  const data = parsed.data;
  const idempotencyKey = request.headers.get("idempotency-key") ?? undefined;

  if (process.env.DEMO_MODE !== "false" || !process.env.DATABASE_URL) {
    const stay = stays.find((item) => item.unitId === data.unitId);
    if (!stay || data.guests > stay.maxGuests) return NextResponse.json({ message: "Không gian này không phù hợp với số khách đã chọn." }, { status: 409 });
    const quote = calculatePrice({
      checkIn: new Date(data.checkIn),
      checkOut: new Date(data.checkOut),
      guests: data.guests,
      baseGuests: stay.baseGuests,
      basePrice: stay.basePrice,
      rules: [
        { type: "WEEKDAY", amount: 250000, priority: 10, weekdays: [5, 6] },
        { type: "EXTRA_GUEST", amount: 300000, priority: 20, minGuests: stay.baseGuests + 1 }
      ]
    });
    const booking = createDemoBooking({ ...data, stayName: stay.name, totalAmount: quote.total, phone: normalizePhone(data.phone), email: data.email || undefined }, idempotencyKey);
    if (!booking) return NextResponse.json({ message: "Phòng vừa được khách khác giữ. Vui lòng chọn không gian hoặc ngày khác." }, { status: 409 });
    return NextResponse.json({ holdExpiresAt: booking.holdExpiresAt, totalAmount: booking.totalAmount }, { status: 201 });
  }

  try {
    if (idempotencyKey) {
      const existing = await prisma.booking.findUnique({ where: { idempotencyKey } });
      if (existing) return NextResponse.json({ holdExpiresAt: existing.holdExpiresAt, totalAmount: Number(existing.totalAmount) });
    }
    const result = await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${data.unitId}))`;
      await tx.booking.updateMany({ where: { status: BookingStatus.HELD, holdExpiresAt: { lte: new Date() } }, data: { status: BookingStatus.EXPIRED } });
      const unit = await tx.unit.findUnique({ where: { id: data.unitId }, include: { accommodationType: { include: { rateRules: { where: { active: true } }, property: true } } } });
      if (!unit?.active || !unit.accommodationType.active) throw new Error("UNIT_NOT_FOUND");
      if (data.guests > unit.accommodationType.maxGuests) throw new Error("CAPACITY_EXCEEDED");
      const checkIn = new Date(data.checkIn); const checkOut = new Date(data.checkOut);
      const conflict = await tx.booking.findFirst({ where: { unitId: unit.id, checkIn: { lt: checkOut }, checkOut: { gt: checkIn }, status: { in: [BookingStatus.HELD, BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] } } });
      const blocked = await tx.availabilityBlock.findFirst({ where: { unitId: unit.id, startDate: { lt: checkOut }, endDate: { gt: checkIn } } });
      if (conflict || blocked) throw new Error("NOT_AVAILABLE");
      const rules = unit.accommodationType.rateRules.map((rule) => ({ type: rule.type as "WEEKDAY" | "DATE_RANGE" | "EXTRA_GUEST", amount: Number(rule.amount), priority: rule.priority, weekdays: rule.weekdays, startDate: rule.startDate ?? undefined, endDate: rule.endDate ?? undefined, minGuests: rule.minGuests ?? undefined }));
      const quote = calculatePrice({ checkIn, checkOut, guests: data.guests, baseGuests: unit.accommodationType.baseGuests, basePrice: Number(unit.accommodationType.basePrice), rules });
      const guest = await tx.guest.create({ data: { fullName: data.fullName, phone: normalizePhone(data.phone), email: data.email || null } });
      const code = `LAGO-${new Date().toISOString().slice(2,10).replace(/-/g,"")}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
      const holdExpiresAt = addMinutes(new Date(), unit.accommodationType.property.defaultHoldMinutes);
      const booking = await tx.booking.create({ data: { code, unitId: unit.id, guestId: guest.id, checkIn, checkOut, guests: data.guests, totalAmount: quote.total, priceSnapshot: quote as unknown as Prisma.InputJsonValue, guestNote: data.note, holdExpiresAt, idempotencyKey } });
      await tx.auditLog.create({ data: { action: "BOOKING_CREATED", entityType: "Booking", entityId: booking.id, metadata: { source: "public_web" } } });
      return booking;
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    return NextResponse.json({ holdExpiresAt: result.holdExpiresAt, totalAmount: Number(result.totalAmount) }, { status: 201 });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "";
    if (["NOT_AVAILABLE", "UNIT_NOT_FOUND", "CAPACITY_EXCEEDED"].includes(reason)) return NextResponse.json({ message: reason === "NOT_AVAILABLE" ? "Phòng vừa được khách khác giữ. Vui lòng chọn không gian hoặc ngày khác." : "Không gian này hiện không thể đặt." }, { status: 409 });
    console.error("booking_create_failed", { reason });
    return NextResponse.json({ message: "LAKA chưa thể ghi nhận yêu cầu. Vui lòng thử lại hoặc gọi trực tiếp cho chúng mình." }, { status: 500 });
  }
}
