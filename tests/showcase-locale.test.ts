import { describe, expect, it } from "vitest";
import { languageHref, localizedTemplateBasePath, resolveLocalizedTemplatePath } from "@/features/showcase/i18n/locale";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";
import { resolveTemplateRoute, templateStaticPaths } from "@/features/showcase/site/template-route";
import { stays } from "@/features/stays/data/demo-data";

describe("Quiet Living locale routing", () => {
  it("switches language without losing the current page", () => {
    expect(languageHref("/luu-tru/cabin-vo-cuc", "en"))
      .toBe("/en/luu-tru/cabin-vo-cuc");
    expect(languageHref("/en/luu-tru/cabin-vo-cuc", "vi"))
      .toBe("/luu-tru/cabin-vo-cuc");
  });

  it("resolves the English prefix before route matching", () => {
    expect(resolveLocalizedTemplatePath(["en", "luu-tru"]))
      .toEqual({ locale: "en", routePath: ["luu-tru"] });
    expect(localizedTemplateBasePath("", "en"))
      .toBe("/en");
    expect(languageHref("/am-thuc", "en"))
      .toBe("/en/am-thuc");
  });

  it("keeps booking utilities available as secondary direct routes", () => {
    expect(resolveTemplateRoute(["dat-phong"])).toEqual({ kind: "booking" });
    expect(resolveTemplateRoute(["tra-cuu"])).toEqual({ kind: "lookup" });
    expect(templateStaticPaths().map(({ path }) => path.join("/")))
      .toEqual(expect.arrayContaining(["dat-phong", "tra-cuu"]));
  });

  it("localizes accommodation content while preserving its identity", () => {
    const infinityCabin = localizeStay(stays.find((stay) => stay.slug === "cabin-vo-cuc")!, "en");
    expect(infinityCabin.name).toBe("Vo Cuc Cabin");
    expect(infinityCabin.slug).toBe("cabin-vo-cuc");
  });
});
