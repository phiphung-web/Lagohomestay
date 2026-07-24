import { describe, expect, it } from "vitest";
import { getShowcasePageLabel, getShowcaseRouteSuffix, getShowcaseTemplateHref } from "@/features/showcase/lib/comparison-path";

describe("showroom same-page comparison", () => {
  it("keeps the current nested route when switching templates", () => {
    expect(getShowcaseTemplateHref("dien-anh", "/mau/tinh-lang/luu-tru/lago-house"))
      .toBe("/mau/dien-anh/luu-tru/lago-house");
  });

  it("keeps the template homepage scoped to the selected template", () => {
    expect(getShowcaseRouteSuffix("/mau/song-dong")).toBe("");
    expect(getShowcaseTemplateHref("tinh-lang", "/mau/song-dong")).toBe("/mau/tinh-lang");
  });

  it("returns a clear Vietnamese page label", () => {
    expect(getShowcasePageLabel("/mau/dien-anh/dat-phong")).toBe("Đặt chỗ");
    expect(getShowcasePageLabel("/mau/song-dong/luu-tru/nha-rung")).toBe("Chi tiết căn");
  });

  it("keeps English routes valid when comparing concepts", () => {
    expect(getShowcaseRouteSuffix("/mau/tinh-lang/en/luu-tru/nha-may")).toBe("/luu-tru/nha-may");
    expect(getShowcaseTemplateHref("tinh-lang", "/mau/tinh-lang/en/luu-tru/nha-may"))
      .toBe("/mau/tinh-lang/en/luu-tru/nha-may");
    expect(getShowcaseTemplateHref("dien-anh", "/mau/tinh-lang/en/luu-tru/nha-may"))
      .toBe("/mau/dien-anh/luu-tru/nha-may");
    expect(getShowcasePageLabel("/mau/tinh-lang/en/luu-tru/nha-may", "en")).toBe("Home details");
  });
});
