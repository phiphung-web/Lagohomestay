import { MainHome } from "@/features/showcase/site/main-home";
import { CompleteTemplateSite, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import type { TemplateRoute } from "@/features/showcase/site/template-route";
import { localizedTemplateBasePath, type ShowcaseLocale } from "@/features/showcase/i18n/locale";

export const mainSiteConfig: CompleteTemplateConfig = {
  slug: "tinh-lang",
  name: "LAKA Homestay",
  mood: "editorial",
  basePath: "",
  background: "#eae1d2",
  ink: "#16311c",
  accent: "#c7a882",
  surface: "#e7ded1",
  muted: "#d4c7b6"
};

export function MainSite({ route, locale = "vi" }: { route: TemplateRoute; locale?: ShowcaseLocale }) {
  const config = {
    ...mainSiteConfig,
    basePath: localizedTemplateBasePath(mainSiteConfig.basePath, locale)
  };
  return <CompleteTemplateSite route={route} config={config} locale={locale} home={<MainHome config={config} locale={locale} />} />;
}
