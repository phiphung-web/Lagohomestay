import { TinhLangHome } from "@/features/showcase/templates/tinh-lang/home";
import { CompleteTemplateSite, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import type { TemplateRoute } from "@/features/showcase/site/template-route";
import { localizedTemplateBasePath, type ShowcaseLocale } from "@/features/showcase/i18n/locale";

export const tinhLangConfig: CompleteTemplateConfig = {
  slug: "tinh-lang",
  name: "Tĩnh lặng",
  mood: "editorial",
  basePath: "/mau/tinh-lang",
  background: "#faf3ea",
  ink: "#17321d",
  accent: "#c7a882",
  surface: "#e7ded1",
  muted: "#d4c7b6"
};

export function TinhLangSite({ route, locale = "vi" }: { route: TemplateRoute; locale?: ShowcaseLocale }) {
  const config = {
    ...tinhLangConfig,
    name: locale === "en" ? "Quiet Living" : tinhLangConfig.name,
    basePath: localizedTemplateBasePath(tinhLangConfig.basePath, locale)
  };
  return <CompleteTemplateSite route={route} config={config} locale={locale} home={<TinhLangHome config={config} locale={locale} />} />;
}
