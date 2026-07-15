import { beforeEach, describe, expect, it } from "vitest";
import { clearDemoStoreForTests, createDemoBooking, findDemoBookings } from "@/features/booking/server/demo-store";

const base = { unitId:"unit-test",stayName:"Nhà Test",fullName:"Khách Test",phone:"0900000000",checkIn:"2026-09-10",checkOut:"2026-09-12",guests:2,totalAmount:2_000_000 };
describe("demo booking store",()=>{
  beforeEach(clearDemoStoreForTests);
  it("trả cùng booking khi lặp idempotency key",()=>{const first=createDemoBooking(base,"same-key");const second=createDemoBooking(base,"same-key");expect(second?.code).toBe(first?.code);});
  it("chặn hai yêu cầu giao nhau trên cùng đơn vị",()=>{expect(createDemoBooking(base,"one")).not.toBeNull();expect(createDemoBooking({...base,checkIn:"2026-09-11",checkOut:"2026-09-13"},"two")).toBeNull();});
  it("cho phép các khoảng ngày liền kề",()=>{expect(createDemoBooking(base,"one")).not.toBeNull();expect(createDemoBooking({...base,checkIn:"2026-09-12",checkOut:"2026-09-14"},"two")).not.toBeNull();});
  it("tìm tất cả booking bằng số điện thoại đã chuẩn hóa",()=>{createDemoBooking(base,"one");expect(findDemoBookings("090 000 0000")).toHaveLength(1);expect(findDemoBookings("0910000000")).toHaveLength(0);});
});
