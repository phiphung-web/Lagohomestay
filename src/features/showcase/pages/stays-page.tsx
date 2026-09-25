import { Suspense } from "react";
import { StayBannerHero } from "@/features/showcase/components/stay-banner-hero";
import { StayProductExplorer } from "@/features/showcase/components/stay-product-explorer";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { type SiteConfig } from "@/features/showcase/site/site-types";

export function StaysPage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  return (
    <>
      <StayBannerHero config={config} locale={locale} />
      <Suspense fallback={<div className="min-h-[60svh] bg-[#eae1d2]" />}>
        <StayProductExplorer basePath={config.basePath} locale={locale} />
      </Suspense>
    </>
  );
}
