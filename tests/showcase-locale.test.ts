import { describe, expect, it } from "vitest";
import { languageHref, localizedTemplateBasePath, resolveLocalizedTemplatePath } from "@/features/showcase/i18n/locale";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";
import { stays } from "@/features/stays/data/demo-data";

describe("Quiet Living locale routing", () => {
  it("switches language without losing the current page", () => {
    expect(languageHref("/luu-tru/nha-may", "en"))
      .toBe("/en/luu-tru/nha-may");
    expect(languageHref("/en/luu-tru/nha-may", "vi"))
      .toBe("/luu-tru/nha-may");
  });

  it("resolves the English prefix before route matching", () => {
    expect(resolveLocalizedTemplatePath(["en", "dat-phong"]))
      .toEqual({ locale: "en", routePath: ["dat-phong"] });
    expect(localizedTemplateBasePath("", "en"))
      .toBe("/en");
    expect(languageHref("/am-thuc", "en"))
      .toBe("/en/am-thuc");
  });

  it("localizes accommodation content while preserving its identity", () => {
    const cloudHouse = localizeStay(stays.find((stay) => stay.slug === "nha-may")!, "en");
    expect(cloudHouse.name).toBe("Cloud House");
    expect(cloudHouse.slug).toBe("nha-may");
  });
});
