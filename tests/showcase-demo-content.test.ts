import { describe, expect, it } from "vitest";
import {
  diningStories,
  guestServices,
  journeySteps,
  lakaExperiences,
  sharedFacilities,
  specialMoments
} from "@/features/showcase/data/laka-demo-content";
import { showcaseFaqs } from "@/features/showcase/data/showcase-content";
import { englishFaqs } from "@/features/showcase/i18n/showcase-copy";
import { getUnitsForStay, stays, stayUnits, stayZones } from "@/features/stays/data/demo-data";

describe("LAKA presentation content", () => {
  it("covers the complete guest journey in both languages", () => {
    expect(lakaExperiences).toHaveLength(6);
    expect(diningStories).toHaveLength(3);
    expect(specialMoments).toHaveLength(4);
    expect(guestServices).toHaveLength(6);
    expect(sharedFacilities).toHaveLength(3);
    expect(journeySteps).toHaveLength(4);
    expect(showcaseFaqs.length).toBeGreaterThanOrEqual(10);
    expect(englishFaqs).toHaveLength(showcaseFaqs.length);
  });

  it("gives every home enough decision-making detail", () => {
    expect(stays).toHaveLength(8);
    for (const stay of stays) {
      expect(stay.amenities.length).toBeGreaterThanOrEqual(7);
      expect(stay.idealFor.length).toBeGreaterThanOrEqual(3);
      expect(stay.included.length).toBeGreaterThanOrEqual(4);
      expect(stay.stayNotes.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("models inventory as zone, home type and physical unit", () => {
    expect(stayZones).toHaveLength(3);
    expect(stays).toHaveLength(8);
    expect(stayUnits).toHaveLength(15);
    expect(getUnitsForStay("stay-cloud")).toHaveLength(2);
    expect(getUnitsForStay("stay-lago")).toHaveLength(1);
    expect(stays.every((stay) => stayZones.some((zone) => zone.id === stay.zoneId))).toBe(true);
    expect(stayUnits.every((unit) => stays.some((stay) => stay.id === unit.stayId))).toBe(true);
    expect(stayUnits.every((unit) => unit.position.length > 0 && unit.character.length > 0)).toBe(true);
  });

  it("does not present illustrative stories as verified guest reviews", () => {
    const source = showcaseFaqs.flat().join(" ");
    expect(source).toContain("minh họa");
  });
});
