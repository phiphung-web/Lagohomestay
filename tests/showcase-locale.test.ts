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

  it("keeps contact as the only public enquiry destination", () => {
    expect(resolveTemplateRoute(["lien-he"])).toEqual({ kind: "contact" });
    expect(resolveTemplateRoute(["dat-phong"])).toBeNull();
    expect(resolveTemplateRoute(["tra-cuu"])).toBeNull();
    expect(templateStaticPaths().map(({ path }) => path.join("/")))
      .not.toEqual(expect.arrayContaining(["dat-phong", "tra-cuu", "chinh-sach"]));
  });

  it("localizes accommodation content while preserving its identity", () => {
    const infinityCabin = localizeStay(stays.find((stay) => stay.slug === "forest-lake-bathtub-suite")!, "en");
    expect(infinityCabin.name).toBe("Forest Lake Bathtub Suite");
    expect(infinityCabin.slug).toBe("forest-lake-bathtub-suite");
  });
});
