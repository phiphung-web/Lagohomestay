import { BookingStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { lookupBookingSchema } from "@/features/booking/domain/validation";
import { findDemoBookings } from "@/features/booking/server/demo-store";
import { prisma } from "@/server/database/prisma";
import { rateLimit } from "@/server/security/rate-limit";
import { normalizePhone } from "@/shared/lib/format";

type PublicBooking = {
  status: string;
  stayName: string;
  checkIn: string | Date;
  checkOut: string | Date;
  guests: number;
  totalAmount: number;
  holdExpiresAt: string | Date | null;
};

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!rateLimit(`lookup:${ip}`, 10, 60_000).allowed) return NextResponse.json({ message: "Bạn đã kiểm tra quá nhiều lần. Vui lòng thử lại sau." }, { status: 429 });

  const parsed = lookupBookingSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Số điện thoại chưa đúng định dạng." }, { status: 400 });
  const phone = normalizePhone(parsed.data.phone);

  let bookings: PublicBooking[];
  if (process.env.DEMO_MODE !== "false" || !process.env.DATABASE_URL) {
    bookings = findDemoBookings(phone).map((booking) => ({
      status: booking.status,
      stayName: booking.stayName,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      totalAmount: booking.totalAmount,
      holdExpiresAt: booking.holdExpiresAt
    }));
  } else {
    await prisma.booking.updateMany({ where: { status: BookingStatus.HELD, holdExpiresAt: { lte: new Date() } }, data: { status: BookingStatus.EXPIRED } });
    const records = await prisma.booking.findMany({
      where: { guest: { phone } },
      include: { unit: { include: { accommodationType: true } } },
      orderBy: { createdAt: "desc" },
      take: 10
    });
    bookings = records.map((booking) => ({
      status: booking.status,
      stayName: booking.unit.accommodationType.name,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      totalAmount: Number(booking.totalAmount),
      holdExpiresAt: booking.holdExpiresAt
    }));
  }

  if (!bookings.length) return NextResponse.json({ message: "Không tìm thấy yêu cầu đặt chỗ với số điện thoại này." }, { status: 404 });
  return NextResponse.json({ bookings });
}
