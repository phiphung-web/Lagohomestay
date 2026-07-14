import { BookingStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { demoBookingStore } from "@/lib/demo-store";
import { prisma } from "@/lib/prisma";

const schema = z.object({ status: z.nativeEnum(BookingStatus), note: z.string().max(500).optional() });
const transitions: Record<BookingStatus, BookingStatus[]> = {
  HELD: [BookingStatus.CONFIRMED, BookingStatus.CANCELLED, BookingStatus.EXPIRED],
  CONFIRMED: [BookingStatus.CHECKED_IN, BookingStatus.CANCELLED, BookingStatus.NO_SHOW],
  CHECKED_IN: [BookingStatus.CHECKED_OUT], CHECKED_OUT: [], CANCELLED: [], EXPIRED: [], NO_SHOW: []
};

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth(); if (!session?.user) return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ message: "Trạng thái không hợp lệ" }, { status: 400 });
  const { id } = await params;
  if (process.env.DEMO_MODE !== "false" || !process.env.DATABASE_URL) {
    const item = demoBookingStore.get(id); if (!item) return NextResponse.json({ message: "Không tìm thấy booking demo" }, { status: 404 });
    const current = item.status as BookingStatus; if (!transitions[current]?.includes(parsed.data.status)) return NextResponse.json({ message: "Không thể chuyển sang trạng thái này" }, { status: 409 });
    item.status = parsed.data.status; return NextResponse.json({ booking: item });
  }
  const current = await prisma.booking.findUnique({ where: { id } }); if (!current) return NextResponse.json({ message: "Không tìm thấy booking" }, { status: 404 });
  if (!transitions[current.status].includes(parsed.data.status)) return NextResponse.json({ message: "Không thể chuyển sang trạng thái này" }, { status: 409 });
  const booking = await prisma.$transaction(async tx => { const updated=await tx.booking.update({where:{id},data:{status:parsed.data.status,internalNote:parsed.data.note}});await tx.auditLog.create({data:{userId:session.user.id,action:"BOOKING_STATUS_CHANGED",entityType:"Booking",entityId:id,metadata:{from:current.status,to:parsed.data.status}}});return updated; });
  return NextResponse.json({ booking });
}
