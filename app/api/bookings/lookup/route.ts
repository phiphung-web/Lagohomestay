import { BookingStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { findDemoBooking } from "@/lib/demo-store";
import { normalizePhone } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { lookupBookingSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!rateLimit(`lookup:${ip}`, 10, 60_000).allowed) return NextResponse.json({ message: "Bạn đã tra cứu quá nhiều lần. Vui lòng thử lại sau." }, { status: 429 });
  const parsed = lookupBookingSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Mã yêu cầu hoặc số điện thoại chưa đúng định dạng." }, { status: 400 });
  const { code, phone } = parsed.data;
  if (process.env.DEMO_MODE !== "false" || !process.env.DATABASE_URL) {
    const booking = findDemoBooking(code, phone);
    if (!booking) return NextResponse.json({ message: "Không tìm thấy yêu cầu phù hợp." }, { status: 404 });
    return NextResponse.json({ booking });
  }
  await prisma.booking.updateMany({ where: { status: BookingStatus.HELD, holdExpiresAt: { lte: new Date() } }, data: { status: BookingStatus.EXPIRED } });
  const booking = await prisma.booking.findFirst({ where: { code: code.toUpperCase(), guest: { phone: normalizePhone(phone) } }, include: { guest: true, unit: { include: { accommodationType: true } } } });
  if (!booking) return NextResponse.json({ message: "Không tìm thấy yêu cầu phù hợp." }, { status: 404 });
  return NextResponse.json({ booking: { code: booking.code, status: booking.status, fullName: booking.guest.fullName, stayName: booking.unit.accommodationType.name, checkIn: booking.checkIn, checkOut: booking.checkOut, guests: booking.guests, totalAmount: Number(booking.totalAmount), holdExpiresAt: booking.holdExpiresAt } });
}
