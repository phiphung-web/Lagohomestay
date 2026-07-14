import { BookingStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { demoBookingStore } from "@/lib/demo-store";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const expected = process.env.HOLD_EXPIRY_SECRET;
  if (!expected || request.headers.get("authorization") !== `Bearer ${expected}`) return NextResponse.json({ message: "Không được phép" }, { status: 401 });
  if (process.env.DEMO_MODE !== "false" || !process.env.DATABASE_URL) {
    let count = 0;
    for (const item of demoBookingStore.values()) if (item.status === "HELD" && new Date(item.holdExpiresAt) <= new Date()) { item.status = "EXPIRED"; count += 1; }
    return NextResponse.json({ expired: count });
  }
  const result = await prisma.booking.updateMany({ where: { status: BookingStatus.HELD, holdExpiresAt: { lte: new Date() } }, data: { status: BookingStatus.EXPIRED } });
  return NextResponse.json({ expired: result.count });
}
