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
import { diningMenuVenues } from "@/features/showcase/data/dining-menu";
import { englishFaqs } from "@/features/showcase/i18n/showcase-copy";
import { getUnitsForStay, stays, stayUnits, stayZones } from "@/features/stays/data/demo-data";

describe("LAKA presentation content", () => {
  it("covers the complete guest journey in both languages", () => {
    expect(lakaExperiences).toHaveLength(6);
    expect(diningStories).toHaveLength(3);
    expect(specialMoments).toHaveLength(3);
    expect(guestServices).toHaveLength(4);
    expect(sharedFacilities).toHaveLength(6);
    expect(journeySteps).toHaveLength(4);
    expect(showcaseFaqs).toHaveLength(8);
    expect(englishFaqs).toHaveLength(showcaseFaqs.length);
  });

  it("gives every home enough decision-making detail", () => {
    expect(stays).toHaveLength(8);
    for (const stay of stays) {
      expect(stay.amenities.length).toBeGreaterThanOrEqual(3);
      expect(stay.idealFor.length).toBeGreaterThanOrEqual(3);
      expect(stay.included.length).toBeGreaterThanOrEqual(2);
      expect(stay.stayNotes.length).toBeGreaterThanOrEqual(2);
      expect(stay.basePrice).toBe(0);
    }
  });

  it("models inventory as zone, home type and physical unit", () => {
    expect(stayZones).toHaveLength(3);
    expect(stays).toHaveLength(8);
    expect(stayUnits).toHaveLength(20);
    expect(getUnitsForStay("stay-khoang-troi")).toHaveLength(6);
    expect(getUnitsForStay("stay-guest-house")).toHaveLength(1);
    expect(new Set(stayUnits.map((unit) => unit.code)).size).toBe(20);
    expect(stays.every((stay) => stayZones.some((zone) => zone.id === stay.zoneId))).toBe(true);
    expect(stayUnits.every((unit) => stays.some((stay) => stay.id === unit.stayId))).toBe(true);
    expect(stayUnits.every((unit) => unit.position.length > 0 && unit.character.length > 0)).toBe(true);
  });

  it("uses the latest verified accommodation details without publishing rates", () => {
    const guestHouse = stays.find((stay) => stay.slug === "nha-ben-ho")!;
    const bungalow = stays.find((stay) => stay.slug === "bungalow-ben-ho")!;

    expect(guestHouse).toMatchObject({ maxGuests: 10, beds: 5, bathrooms: 1, area: 35, basePrice: 0 });
    expect(bungalow).toMatchObject({ maxGuests: 7, beds: 2, bathrooms: 1, area: 15, basePrice: 0 });
    expect(stays.flatMap((stay) => stay.stayNotes).join(" ").toLowerCase()).not.toContain("giá");
  });

  it("builds restaurant and cafe menu layouts without prices or internal notes", () => {
    expect(diningMenuVenues.map((venue) => venue.id)).toEqual(["restaurant", "cafe"]);
    expect(diningMenuVenues.every((venue) => venue.groups.length >= 4)).toBe(true);

    const publicMenuText = JSON.stringify(diningMenuVenues).toLowerCase();
    expect(publicMenuText).not.toMatch(/giá bán|price|người phụ trách|tham khảo|đang tuyển|số điện thoại/);
    expect(publicMenuText).toContain("gà đồi nướng");
    expect(publicMenuText).toContain("cold brew");
  });

  it("does not present illustrative stories as verified guest reviews", () => {
    const source = showcaseFaqs.flat().join(" ");
    expect(source).toContain("minh họa");
  });
});
