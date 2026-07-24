import { describe, expect, it } from "vitest";
import { languageHref, localizedTemplateBasePath, resolveLocalizedTemplatePath } from "@/features/showcase/i18n/locale";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";
import { stays } from "@/features/stays/data/demo-data";

describe("Quiet Living locale routing", () => {
  it("switches language without losing the current page", () => {
    expect(languageHref("/mau/tinh-lang/luu-tru/nha-may", "en"))
      .toBe("/mau/tinh-lang/en/luu-tru/nha-may");
    expect(languageHref("/mau/tinh-lang/en/luu-tru/nha-may", "vi"))
      .toBe("/mau/tinh-lang/luu-tru/nha-may");
  });

  it("resolves the English prefix before route matching", () => {
    expect(resolveLocalizedTemplatePath(["en", "dat-phong"]))
      .toEqual({ locale: "en", routePath: ["dat-phong"] });
    expect(localizedTemplateBasePath("/mau/tinh-lang", "en"))
      .toBe("/mau/tinh-lang/en");
  });

  it("localizes accommodation content while preserving its identity", () => {
    const cloudHouse = localizeStay(stays.find((stay) => stay.slug === "nha-may")!, "en");
    expect(cloudHouse.name).toBe("Cloud House");
    expect(cloudHouse.slug).toBe("nha-may");
  });
});
