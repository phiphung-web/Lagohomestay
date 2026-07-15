import { describe, expect, it } from "vitest";
import { availabilitySchema, createBookingSchema, lookupBookingSchema } from "@/features/booking/domain/validation";

describe("booking validation", () => {
  it("chấp nhận yêu cầu hợp lệ", () => { expect(createBookingSchema.safeParse({unitId:"u1",checkIn:"2026-08-01",checkOut:"2026-08-03",guests:2,fullName:"Nguyễn An",phone:"0901234567",email:"",consent:true}).success).toBe(true); });
  it("từ chối ngày trả trước ngày nhận", () => { expect(availabilitySchema.safeParse({checkIn:"2026-08-03",checkOut:"2026-08-01",guests:2}).success).toBe(false); });
  it("từ chối số điện thoại không hợp lệ", () => { expect(createBookingSchema.safeParse({unitId:"u1",checkIn:"2026-08-01",checkOut:"2026-08-03",guests:2,fullName:"Nguyễn An",phone:"abc",email:"",consent:true}).success).toBe(false); });
  it("tra cứu chỉ cần số điện thoại hợp lệ", () => {
    expect(lookupBookingSchema.safeParse({ phone: "090 123 4567" }).success).toBe(true);
    expect(lookupBookingSchema.safeParse({ code: "LAGO-TEST" }).success).toBe(false);
  });
});
