import { differenceInCalendarDays, eachDayOfInterval, subDays } from "date-fns";

export type RateRule = {
  type: "WEEKDAY" | "DATE_RANGE" | "EXTRA_GUEST"; amount: number; priority: number;
  weekdays?: number[]; startDate?: Date; endDate?: Date; minGuests?: number;
};

export type PriceQuote = { nights: number; base: number; weekend: number; seasonal: number; extraGuest: number; total: number };

export function calculatePrice(input: { checkIn: Date; checkOut: Date; guests: number; baseGuests: number; basePrice: number; rules?: RateRule[] }): PriceQuote {
  const { checkIn, checkOut, guests, baseGuests, basePrice, rules = [] } = input;
  const nights = differenceInCalendarDays(checkOut, checkIn);
  if (nights < 1) throw new Error("Ngày trả phòng phải sau ngày nhận phòng");
  const days = eachDayOfInterval({ start: checkIn, end: subDays(checkOut, 1) });
  let weekend = 0;
  let seasonal = 0;
  for (const day of days) {
    const matching = rules.filter((rule) => {
      if (rule.type === "WEEKDAY") return rule.weekdays?.includes(day.getDay());
      if (rule.type === "DATE_RANGE") return rule.startDate && rule.endDate && day >= rule.startDate && day <= rule.endDate;
      return false;
    }).sort((a, b) => b.priority - a.priority);
    const rule = matching[0];
    if (rule?.type === "WEEKDAY") weekend += rule.amount;
    if (rule?.type === "DATE_RANGE") seasonal += rule.amount;
  }
  const extraRule = rules.filter((r) => r.type === "EXTRA_GUEST" && guests >= (r.minGuests ?? baseGuests + 1)).sort((a, b) => b.priority - a.priority)[0];
  const extraGuest = Math.max(0, guests - baseGuests) * (extraRule?.amount ?? 300000) * nights;
  const base = basePrice * nights;
  return { nights, base, weekend, seasonal, extraGuest, total: base + weekend + seasonal + extraGuest };
}
