import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import type { PublicRoute } from "@/features/showcase/site/public-routes";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { StaysPage } from "@/features/showcase/pages/stays-page";
import { StayPage } from "@/features/showcase/pages/stay-page";
import { ExperiencePage } from "@/features/showcase/pages/experience-page";
import { ServicesPage } from "@/features/showcase/pages/services-page";
import { DiningPage } from "@/features/showcase/pages/dining-page";
import { AboutPage } from "@/features/showcase/pages/about-page";
import { InfoPage } from "@/features/showcase/pages/info-page";
import { FaqPage } from "@/features/showcase/pages/faq-page";
import { DirectionsPage } from "@/features/showcase/pages/directions-page";
import { PolicyPage } from "@/features/showcase/pages/policy-page";
import { TermsPage } from "@/features/showcase/pages/terms-page";
import { PrivacyPage } from "@/features/showcase/pages/privacy-page";
import { ContactPage } from "@/features/showcase/pages/contact-page";

export function Content({
  route,
  config,
  locale,
}: {
  route: PublicRoute;
  config: SiteConfig;
  locale: ShowcaseLocale;
}) {
  switch (route.kind) {
    case "stays":
      return <StaysPage config={config} locale={locale} />;
    case "stay":
      return <StayPage config={config} slug={route.slug} locale={locale} />;
    case "experience":
      return <ExperiencePage config={config} locale={locale} />;
    case "services":
      return <ServicesPage config={config} locale={locale} />;
    case "dining":
      return <DiningPage config={config} locale={locale} />;
    case "about":
      return <AboutPage config={config} locale={locale} />;
    case "info":
      return <InfoPage config={config} locale={locale} />;
    case "faq":
      return <FaqPage config={config} locale={locale} />;
    case "policy":
      return <PolicyPage config={config} locale={locale} />;
    case "directions":
      return <DirectionsPage config={config} locale={locale} />;
    case "terms":
      return <TermsPage config={config} locale={locale} />;
    case "privacy":
      return <PrivacyPage config={config} locale={locale} />;
    case "contact":
      return <ContactPage config={config} locale={locale} />;
    default:
      return null;
  }
}
