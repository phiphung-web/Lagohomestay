import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  cafeMenuPage,
  diningMenuVenues,
  restaurantMenuPages,
} from "@/features/showcase/data/dining-menu";

const source = (path: string) =>
  readFileSync(join(process.cwd(), path), "utf8").replace(/\s+/g, " ");

describe("restaurant image menu", () => {
  it("keeps all ten supplied categories in printed page order", () => {
    expect(restaurantMenuPages.map((page) => page.title.vi)).toEqual([
      "Mẹt nướng & set BBQ",
      "Combo theo nhóm",
      "Lẩu & đồ nhúng",
      "Khai vị, salad & món nhậu",
      "Gia cầm & thịt",
      "Cá nước ngọt đặc sản",
      "Hải sản & cá cao cấp",
      "Đặc sản đặt trước",
      "Cơm nhà & món ăn kèm",
      "Đồ uống",
    ]);
    expect(new Set(restaurantMenuPages.map((page) => page.id)).size).toBe(10);
    expect(new Set(restaurantMenuPages.map((page) => page.src)).size).toBe(10);
  });

  it("ships local WebP artwork for every category at its original dimensions", () => {
    restaurantMenuPages.forEach((page, index) => {
      expect(page.src).toMatch(
        new RegExp(
          `^/images/dining/restaurant/${String(index + 1).padStart(2, "0")}-[a-z-]+\\.webp$`,
        ),
      );
      expect(page.title.en.length).toBeGreaterThan(0);
      expect(page).toMatchObject({ width: 992, height: 1404 });
      const image = readFileSync(join(process.cwd(), "public", page.src));
      expect(image.subarray(0, 4).toString()).toBe("RIFF");
      expect(image.subarray(8, 12).toString()).toBe("WEBP");
      expect(image.length).toBeGreaterThan(100_000);
    });
  });

  it("keeps the restaurant and coffee shop menus separate", () => {
    expect(diningMenuVenues.find((venue) => venue.id === "cafe")?.menuStatus).toBe("available");
    expect(cafeMenuPage.src).toBe("/images/dining/cafe/menu-laka-coffee.jpg");
    const sections = source("src/features/showcase/components/destination-sections.tsx");
    expect(sections).not.toContain("venue.groups");
    expect(sections).not.toContain("Danh mục món dự kiến");
    expect(sections).not.toContain("không hiển thị giá");
    expect(sections).toContain('href={venue.id === "cafe" ? "#thuc-don-ca-phe" : "#thuc-don"}');
    expect(sections.match(/<RestaurantMenuGallery /g)).toHaveLength(1);
    expect(sections.match(/<CafeMenu /g)).toHaveLength(1);
  });

  it("links directly to a bounded, single-page menu with a small client boundary", () => {
    const gallery = source("src/features/showcase/components/restaurant-menu-gallery.tsx");
    const styles = source("src/features/showcase/components/restaurant-menu-gallery.module.css");
    const site = source("src/features/showcase/pages/dining-page.tsx");
    expect(gallery.startsWith('"use client";')).toBe(true);
    expect(site).not.toContain('"use client"');
    expect(site).toContain('actionHref="#thuc-don"');
    expect(gallery).toContain('id="thuc-don"');
    expect(gallery).toContain("const page = restaurantMenuPages[active]");
    expect(styles).toContain("height: clamp(300px, 60svh, 640px)");
    expect(styles).toContain("object-fit: contain");
    expect(styles).toContain(".mobilePicker { display: none; }");
  });

  it("provides a native modal, keyboard navigation, full-resolution zoom and focus restoration", () => {
    const gallery = source("src/features/showcase/components/restaurant-menu-gallery.tsx");
    expect(gallery).toContain("dialog.showModal()");
    expect(gallery).toContain("onCancel=");
    expect(gallery).toContain('event.key === "Escape"');
    expect(gallery).toContain('event.key === "ArrowLeft"');
    expect(gallery).toContain("event.target instanceof HTMLSelectElement");
    expect(gallery).toContain("returnFocusRef.current?.focus({ preventScroll: true })");
    expect(gallery).toContain("document.body.style.overflow = previousOverflow");
    expect(gallery).toContain("aria-pressed={zoomed}");
    expect(gallery).toContain("onTouchCancel=");
    expect(gallery).toContain("Menu images are in Vietnamese.");
  });
});
