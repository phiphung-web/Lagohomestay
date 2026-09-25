import { ExperienceLayer } from "@/features/showcase/components/experience-layer";
import { DocumentLocale } from "@/features/showcase/components/document-locale";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { SkipLink } from "@/shared/components/ui/skip-link";
import type { PublicRoute } from "@/features/showcase/site/public-routes";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { SiteHeader } from "@/features/showcase/site/site-header";
import { SiteFooter } from "@/features/showcase/site/site-footer";
import { Content } from "@/features/showcase/site/page-content";

export function SiteLayout({
  route,
  config,
  home,
  locale = "vi",
}: {
  route: PublicRoute;
  config: SiteConfig;
  home: React.ReactNode;
  locale?: ShowcaseLocale;
}) {
  if (route.kind === "home") return home;
  const routeKey =
    route.kind === "stay"
      ? `${config.slug}-${route.kind}-${route.slug}`
      : `${config.slug}-${route.kind}`;
  const style = {
    "--template-bg": config.background,
    "--template-ink": config.ink,
    "--template-accent": config.accent,
    "--template-surface": config.surface,
  } as React.CSSProperties;
  return (
    <div
      style={style}
      className={`showcase-root min-h-screen bg-[var(--template-bg)] text-[var(--template-ink)] ${config.mood === "organic" ? "template-organic" : config.mood === "cinematic" ? "template-cinematic" : "template-editorial"}`}
    >
      <DocumentLocale locale={locale} />
      <SkipLink label={locale === "en" ? "Skip navigation" : "Bỏ qua điều hướng"} />
      <ExperienceLayer mood={config.mood} />
      <SiteHeader config={config} locale={locale} overlay />
      <main id="noi-dung-chinh" tabIndex={-1}>
        <div key={routeKey} className={`template-page-enter template-page-enter-${config.mood}`}>
          <Content route={route} config={config} locale={locale} />
        </div>
      </main>
      <SiteFooter config={config} locale={locale} />
    </div>
  );
}
