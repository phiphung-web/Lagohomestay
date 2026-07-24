import { describe, expect, it } from "vitest";
import {
  atmosphereToDayPeriod,
  getAutomaticAtmosphere,
  getHourInTimeZone,
  resolveAtmosphere
} from "@/features/showcase/lib/atmosphere";

describe("LAKA time-aware atmosphere", () => {
  it("uses clear visual periods for the LAKA clock", () => {
    expect(getAutomaticAtmosphere(4)).toBe("night");
    expect(getAutomaticAtmosphere(5)).toBe("dawn");
    expect(getAutomaticAtmosphere(8)).toBe("day");
    expect(getAutomaticAtmosphere(17)).toBe("sunset");
    expect(getAutomaticAtmosphere(19)).toBe("night");
  });

  it("lets a visitor override the automatic atmosphere", () => {
    expect(resolveAtmosphere("auto", 12)).toBe("day");
    expect(resolveAtmosphere("night", 12)).toBe("night");
    expect(resolveAtmosphere("dawn", 22)).toBe("dawn");
  });

  it("keeps greetings aligned with the chosen light", () => {
    expect(atmosphereToDayPeriod("dawn")).toBe("morning");
    expect(atmosphereToDayPeriod("sunset")).toBe("evening");
  });

  it("reads Vietnam time independently of the visitor timezone", () => {
    const utcMidnight = new Date("2026-07-24T00:00:00.000Z");
    expect(getHourInTimeZone(utcMidnight)).toBe(7);
  });
});
