import { describe, expect, it } from "vitest";
import { getVietnamDateString } from "@/shared/lib/vietnam-date";

describe("Vietnam date", () => {
  it("uses Asia/Ho_Chi_Minh instead of the VPS timezone", () => {
    expect(getVietnamDateString(new Date("2026-07-17T18:30:00.000Z"))).toBe("2026-07-18");
    expect(getVietnamDateString(new Date("2026-07-17T01:00:00.000Z"))).toBe("2026-07-17");
  });
});
