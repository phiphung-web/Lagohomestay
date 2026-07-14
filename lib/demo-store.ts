import { addHours } from "date-fns";
import { normalizePhone } from "./format";

export type StoredBooking = {
  code: string; unitId: string; stayName: string; fullName: string; phone: string; email?: string;
  checkIn: string; checkOut: string; guests: number; totalAmount: number; status: string;
  holdExpiresAt: string; createdAt: string; note?: string;
};

const globalStore = globalThis as unknown as { lagoBookings?: Map<string, StoredBooking>; lagoIdempotency?: Map<string, string> };
export const demoBookingStore = globalStore.lagoBookings ?? new Map<string, StoredBooking>();
export const demoIdempotencyStore = globalStore.lagoIdempotency ?? new Map<string, string>();
if (!globalStore.lagoBookings) globalStore.lagoBookings = demoBookingStore;
if (!globalStore.lagoIdempotency) globalStore.lagoIdempotency = demoIdempotencyStore;

export function makeBookingCode() {
  const date = new Date();
  const stamp = `${String(date.getFullYear()).slice(-2)}${String(date.getMonth()+1).padStart(2,"0")}${String(date.getDate()).padStart(2,"0")}`;
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LAGO-${stamp}-${random}`;
}

export function createDemoBooking(data: Omit<StoredBooking, "code" | "holdExpiresAt" | "createdAt" | "status">, idempotencyKey?: string) {
  if (idempotencyKey) {
    const existing = demoIdempotencyStore.get(idempotencyKey);
    if (existing) return demoBookingStore.get(existing)!;
  }
  const overlap = [...demoBookingStore.values()].some((item) =>
    item.unitId === data.unitId && ["HELD", "CONFIRMED", "CHECKED_IN"].includes(item.status) &&
    new Date(item.holdExpiresAt) > new Date() && item.checkIn < data.checkOut && item.checkOut > data.checkIn
  );
  if (overlap) return null;
  const booking: StoredBooking = { ...data, code: makeBookingCode(), status: "HELD", holdExpiresAt: addHours(new Date(), 2).toISOString(), createdAt: new Date().toISOString() };
  demoBookingStore.set(booking.code, booking);
  if (idempotencyKey) demoIdempotencyStore.set(idempotencyKey, booking.code);
  return booking;
}

export function clearDemoStoreForTests() { demoBookingStore.clear(); demoIdempotencyStore.clear(); }

export function findDemoBooking(code: string, phone: string) {
  const booking = demoBookingStore.get(code.toUpperCase());
  if (!booking || normalizePhone(booking.phone) !== normalizePhone(phone)) return null;
  if (booking.status === "HELD" && new Date(booking.holdExpiresAt) <= new Date()) booking.status = "EXPIRED";
  return booking;
}
