import { MainHome } from "@/features/showcase/site/main-home";
import { SiteLayout } from "@/features/showcase/site/site-layout";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import type { PublicRoute } from "@/features/showcase/site/public-routes";
import { localizedBasePath, type ShowcaseLocale } from "@/features/showcase/i18n/locale";

export const mainSiteConfig: SiteConfig = {
  slug: "main",
  name: "LAKA Homestay",
  mood: "editorial",
  basePath: "",
  background: "#eae1d2",
  ink: "#16311c",
  accent: "#c7a882",
  surface: "#e7ded1",
  muted: "#d4c7b6",
};

export function MainSite({
  route,
  locale = "vi",
}: {
  route: PublicRoute;
  locale?: ShowcaseLocale;
}) {
  const config = {
    ...mainSiteConfig,
    basePath: localizedBasePath(mainSiteConfig.basePath, locale),
  };
  return (
    <SiteLayout
      route={route}
      config={config}
      locale={locale}
      home={<MainHome config={config} locale={locale} />}
    />
  );
}
