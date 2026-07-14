import { NextRequest, NextResponse } from "next/server";
import { stays } from "@/lib/demo-data";
import { calculatePrice } from "@/lib/pricing";
import { availabilitySchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const parsed = availabilitySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Thông tin ngày ở chưa hợp lệ" }, { status: 400 });
  const { checkIn, checkOut, guests } = parsed.data;
  const results = stays.filter((stay) => stay.maxGuests >= guests).map((stay) => ({
    ...stay,
    quote: calculatePrice({ checkIn: new Date(checkIn), checkOut: new Date(checkOut), guests, baseGuests: stay.baseGuests, basePrice: stay.basePrice, rules: [{ type: "WEEKDAY", amount: 250000, priority: 10, weekdays: [5, 6] }, { type: "EXTRA_GUEST", amount: 300000, priority: 20, minGuests: stay.baseGuests + 1 }] })
  }));
  return NextResponse.json({ data: results, meta: { checkIn, checkOut, guests } });
}
