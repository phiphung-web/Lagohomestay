import { BookingStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { calculatePrice } from "@/features/booking/domain/pricing";
import { availabilitySchema } from "@/features/booking/domain/validation";
import { isDemoUnitAvailable } from "@/features/booking/server/demo-store";
import { stays } from "@/features/stays/data/demo-data";
import { prisma } from "@/server/database/prisma";

const demoRules = [
  { type: "WEEKDAY" as const, amount: 250000, priority: 10, weekdays: [5, 6] },
  { type: "EXTRA_GUEST" as const, amount: 300000, priority: 20 }
];

export async function GET(request: NextRequest) {
  const parsed = availabilitySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Thông tin ngày ở chưa hợp lệ" }, { status: 400 });
  const { checkIn, checkOut, guests } = parsed.data;

  if (process.env.DEMO_MODE !== "false" || !process.env.DATABASE_URL) {
    const results = stays
      .filter((stay) => stay.maxGuests >= guests && isDemoUnitAvailable(stay.unitId, checkIn, checkOut))
      .map((stay) => ({
        id: stay.id,
        unitId: stay.unitId,
        slug: stay.slug,
        name: stay.name,
        subtitle: stay.subtitle,
        description: stay.description,
        image: stay.image,
        maxGuests: stay.maxGuests,
        bedrooms: stay.bedrooms,
        basePrice: stay.basePrice,
        highlights: stay.highlights,
        location: stay.location,
        badge: stay.badge,
        quote: calculatePrice({
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          guests,
          baseGuests: stay.baseGuests,
          basePrice: stay.basePrice,
          rules: demoRules.map((rule) => ({ ...rule, minGuests: rule.type === "EXTRA_GUEST" ? stay.baseGuests + 1 : undefined }))
        })
      }));
    return NextResponse.json({ data: results, meta: { checkIn, checkOut, guests } });
  }

  try {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    await prisma.booking.updateMany({ where: { status: BookingStatus.HELD, holdExpiresAt: { lte: new Date() } }, data: { status: BookingStatus.EXPIRED } });
    const types = await prisma.accommodationType.findMany({
      where: { active: true, maxGuests: { gte: guests } },
      include: {
        rateRules: { where: { active: true } },
        units: {
          where: {
            active: true,
            bookings: { none: { checkIn: { lt: end }, checkOut: { gt: start }, status: { in: [BookingStatus.HELD, BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN] } } },
            availabilityBlocks: { none: { startDate: { lt: end }, endDate: { gt: start } } }
          },
          take: 1
        }
      }
    });

    const results = types.filter((type) => type.units.length > 0).map((type) => {
      const concept = stays.find((stay) => stay.slug === type.slug);
      const rules = type.rateRules.map((rule) => ({
        type: rule.type as "WEEKDAY" | "DATE_RANGE" | "EXTRA_GUEST",
        amount: Number(rule.amount),
        priority: rule.priority,
        weekdays: rule.weekdays,
        startDate: rule.startDate ?? undefined,
        endDate: rule.endDate ?? undefined,
        minGuests: rule.minGuests ?? undefined
      }));
      const highlights = concept?.highlights ?? (Array.isArray(type.amenities) ? (type.amenities as string[]).slice(0, 3) : []);
      return {
        id: type.id,
        unitId: type.units[0].id,
        slug: type.slug,
        name: type.name,
        subtitle: type.shortName,
        description: type.description,
        image: type.heroImage,
        maxGuests: type.maxGuests,
        bedrooms: type.bedrooms,
        basePrice: Number(type.basePrice),
        highlights,
        location: concept?.location ?? "LAKA Homestay",
        badge: concept?.badge,
        quote: calculatePrice({ checkIn: start, checkOut: end, guests, baseGuests: type.baseGuests, basePrice: Number(type.basePrice), rules })
      };
    });
    return NextResponse.json({ data: results, meta: { checkIn, checkOut, guests } });
  } catch (error) {
    console.error("availability_lookup_failed", { reason: error instanceof Error ? error.message : "unknown" });
    return NextResponse.json({ message: "LAKA chưa thể kiểm tra lịch lúc này. Vui lòng thử lại sau ít phút." }, { status: 500 });
  }
}
