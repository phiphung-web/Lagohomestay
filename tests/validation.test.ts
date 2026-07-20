import { describe, expect, it } from "vitest";
import { availabilitySchema, createBookingSchema, lookupBookingSchema } from "@/features/booking/domain/validation";
import { validateBookingContact, validateLookupPhone } from "@/features/booking/domain/contact-validation";

describe("booking validation", () => {
  it("chấp nhận yêu cầu hợp lệ", () => { expect(createBookingSchema.safeParse({unitId:"u1",checkIn:"2026-08-01",checkOut:"2026-08-03",guests:2,fullName:"Nguyễn An",phone:"0901234567",email:"",consent:true}).success).toBe(true); });
  it("từ chối ngày trả trước ngày nhận", () => { expect(availabilitySchema.safeParse({checkIn:"2026-08-03",checkOut:"2026-08-01",guests:2}).success).toBe(false); });
  it("từ chối số điện thoại không hợp lệ", () => { expect(createBookingSchema.safeParse({unitId:"u1",checkIn:"2026-08-01",checkOut:"2026-08-03",guests:2,fullName:"Nguyễn An",phone:"abc",email:"",consent:true}).success).toBe(false); });
  it("tra cứu chỉ cần số điện thoại hợp lệ", () => {
    expect(lookupBookingSchema.safeParse({ phone: "090 123 4567" }).success).toBe(true);
    expect(lookupBookingSchema.safeParse({ code: "LAGO-TEST" }).success).toBe(false);
  });
  it("trả lỗi theo từng trường để giao diện không dùng thông báo mặc định của trình duyệt", () => {
    expect(validateBookingContact({ fullName: "A", phone: "abc", email: "sai-email", consent: false })).toEqual({
      fullName: "Vui lòng nhập họ tên đầy đủ.",
      phone: "Số điện thoại chưa đúng. Ví dụ: 090 123 4567.",
      email: "Email chưa đúng định dạng.",
      consent: "Bạn cần đồng ý để LAKA xử lý yêu cầu đặt căn."
    });
    expect(validateLookupPhone("090 123 4567")).toBe("");
  });
});
