import { describe, expect, it } from "vitest";
import { calculatePrice } from "@/lib/pricing";

describe("calculatePrice", () => {
  it("tính đúng số đêm và giá cơ bản", () => {
    const quote = calculatePrice({ checkIn: new Date("2026-07-14"), checkOut: new Date("2026-07-16"), guests: 2, baseGuests: 2, basePrice: 1_000_000 });
    expect(quote.nights).toBe(2); expect(quote.total).toBe(2_000_000);
  });
  it("áp dụng phụ thu khách cho mỗi đêm", () => {
    const quote = calculatePrice({ checkIn: new Date("2026-07-14"), checkOut: new Date("2026-07-16"), guests: 4, baseGuests: 2, basePrice: 1_000_000, rules: [{ type:"EXTRA_GUEST", amount:250_000, priority:10, minGuests:3 }] });
    expect(quote.extraGuest).toBe(1_000_000); expect(quote.total).toBe(3_000_000);
  });
  it("chỉ lấy quy tắc ngày có ưu tiên cao nhất", () => {
    const quote = calculatePrice({ checkIn: new Date("2026-07-18"), checkOut: new Date("2026-07-19"), guests: 2, baseGuests: 2, basePrice: 1_000_000, rules: [{ type:"WEEKDAY",amount:100_000,priority:1,weekdays:[6] },{ type:"WEEKDAY",amount:300_000,priority:10,weekdays:[6] }] });
    expect(quote.weekend).toBe(300_000);
  });
  it("từ chối khoảng ngày bằng hoặc âm", () => {
    expect(() => calculatePrice({ checkIn:new Date("2026-07-16"),checkOut:new Date("2026-07-16"),guests:2,baseGuests:2,basePrice:1 })).toThrow();
  });
});
