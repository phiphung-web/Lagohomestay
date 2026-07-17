import { describe, expect, it } from "vitest";
import { getDayPeriod, getTemplateTimeGreeting } from "@/features/showcase/lib/time-greeting";

describe("time-aware showroom greeting", () => {
  it("uses stable day-period boundaries", () => {
    expect(getDayPeriod(4)).toBe("night");
    expect(getDayPeriod(5)).toBe("morning");
    expect(getDayPeriod(10)).toBe("day");
    expect(getDayPeriod(17)).toBe("evening");
    expect(getDayPeriod(22)).toBe("night");
  });

  it("normalizes hours outside the usual range", () => {
    expect(getDayPeriod(25)).toBe("night");
    expect(getDayPeriod(-1)).toBe("night");
  });

  it("keeps a distinct voice for every template", () => {
    const messages = [
      getTemplateTimeGreeting("editorial", 18).message,
      getTemplateTimeGreeting("cinematic", 18).message,
      getTemplateTimeGreeting("organic", 18).message
    ];
    expect(new Set(messages).size).toBe(3);
  });
});
