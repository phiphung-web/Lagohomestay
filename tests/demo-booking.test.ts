import { beforeEach, describe, expect, it } from "vitest";
import { clearDemoStoreForTests, createDemoBooking, demoBookingStore, findDemoBookings, isDemoUnitAvailable } from "@/features/booking/server/demo-store";

const base = { unitId:"unit-test",stayName:"Nhà Test",fullName:"Khách Test",phone:"0900000000",checkIn:"2026-09-10",checkOut:"2026-09-12",guests:2,totalAmount:2_000_000 };
describe("demo booking store",()=>{
  beforeEach(clearDemoStoreForTests);
  it("trả cùng booking khi lặp idempotency key",()=>{const first=createDemoBooking(base,"same-key");const second=createDemoBooking(base,"same-key");expect(second?.code).toBe(first?.code);});
  it("chặn hai yêu cầu giao nhau trên cùng đơn vị",()=>{expect(createDemoBooking(base,"one")).not.toBeNull();expect(createDemoBooking({...base,checkIn:"2026-09-11",checkOut:"2026-09-13"},"two")).toBeNull();});
  it("cho phép các khoảng ngày liền kề",()=>{expect(createDemoBooking(base,"one")).not.toBeNull();expect(createDemoBooking({...base,checkIn:"2026-09-12",checkOut:"2026-09-14"},"two")).not.toBeNull();});
  it("tìm tất cả booking bằng số điện thoại đã chuẩn hóa",()=>{createDemoBooking(base,"one");expect(findDemoBookings("090 000 0000")).toHaveLength(1);expect(findDemoBookings("0910000000")).toHaveLength(0);});
  it("phản ánh booking đang giữ trong kết quả lịch trống",()=>{createDemoBooking(base,"one");expect(isDemoUnitAvailable("unit-test","2026-09-11","2026-09-13")).toBe(false);expect(isDemoUnitAvailable("unit-test","2026-09-12","2026-09-14")).toBe(true);});
  it("booking đã xác nhận vẫn khóa lịch dù hết thời gian giữ",()=>{const booking=createDemoBooking(base,"one");if(!booking) throw new Error("Không tạo được booking test");booking.status="CONFIRMED";booking.holdExpiresAt="2020-01-01T00:00:00.000Z";demoBookingStore.set(booking.code,booking);expect(isDemoUnitAvailable("unit-test","2026-09-10","2026-09-12")).toBe(false);});
  it("một căn bị giữ không làm khóa căn khác cùng dòng nhà",()=>{
    createDemoBooking({ ...base, unitId:"unit-cloud-01", stayName:"Nhà Mây" },"cloud-one");
    expect(isDemoUnitAvailable("unit-cloud-01","2026-09-10","2026-09-12")).toBe(false);
    expect(isDemoUnitAvailable("unit-cloud-02","2026-09-10","2026-09-12")).toBe(true);
  });
});
