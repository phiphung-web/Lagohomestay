import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { diningMenuVenues } from "@/features/showcase/data/dining-menu";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";
import { stays } from "@/features/stays/data/demo-data";

const root = process.cwd();
const source = (path: string) => readFileSync(join(root, path), "utf8");

describe("LAKA public contact funnel", () => {
  it("redirects legacy booking and lookup pages to contact in both locales", () => {
    const config = source("next.config.ts");

    expect(config).toContain('source: "/dat-phong"');
    expect(config).toContain('source: "/tra-cuu"');
    expect(config).toContain('destination: "/lien-he"');
    expect(config).toContain('destination: "/en/lien-he"');
  });

  it("sends stay advice to the contextual contact form", () => {
    const explorer = source("src/features/showcase/components/stay-product-explorer.tsx");
    const form = source("src/features/showcase/components/contact-inquiry-form.tsx");
    const mobileMenu = source("src/features/showcase/components/template-mobile-menu.tsx");

    expect(explorer).toContain('/lien-he?stay=${activeStay.slug}#inquiry-form');
    expect(form).toContain('id="inquiry-form"');
    expect(form).toContain('query.get("stay")');
    expect(form).toContain('query.get("guests")');
    expect(mobileMenu).not.toContain("Tra cứu đặt chỗ");
  });

  it("keeps approved accommodation facts aligned in Vietnamese and English", () => {
    const bungalow = stays.find((stay) => stay.slug === "bungalow-ben-ho")!;
    const anTru = stays.find((stay) => stay.slug === "cabin-an-tru")!;
    const thongReo = stays.find((stay) => stay.slug === "nha-thong-reo")!;
    const topHill = stays.find((stay) => stay.slug === "nha-tren-doi")!;

    expect(bungalow.subtitle).toContain("5–7 khách");
    expect(anTru.included).toContain("Một bữa sáng");
    expect(localizeStay(anTru, "en").included).toContain("One breakfast");
    expect(thongReo.maxGuests).toBe(0);
    expect(topHill).toMatchObject({ bedrooms: 1, beds: 5, bathrooms: 1, area: 35 });
  });

  it("uses the approved coffee-shop name", () => {
    const cafe = diningMenuVenues.find((venue) => venue.id === "cafe")!;
    expect(cafe.title).toEqual({ vi: "Tiệm Cà Phê Tầng Mây", en: "Tang May Coffee Shop" });
  });
});
