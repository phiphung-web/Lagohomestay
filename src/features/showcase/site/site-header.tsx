import Link from "next/link";
import { BookingControl } from "@/features/showcase/components/booking-control";
import { MobileMenu } from "@/features/showcase/components/mobile-menu";
import { NavLink } from "@/features/showcase/components/nav-link";
import { ScrollAwareHeader } from "@/features/showcase/components/scroll-aware-header";
import { LanguageSwitcher } from "@/features/showcase/components/language-switcher";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { BrandLogo } from "@/shared/components/brand/brand-logo";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { navItems, englishNavItems, scoped } from "@/features/showcase/site/navigation";

export function SiteHeader({
  config,
  locale = "vi",
  overlay = false,
  storyMode = false,
}: {
  config: SiteConfig;
  locale?: ShowcaseLocale;
  overlay?: boolean;
  storyMode?: boolean;
}) {
  const localizedNavItems = locale === "en" ? englishNavItems : navItems;
  const storyItems =
    locale === "en"
      ? ([
          ["Story", "#cau-chuyen"],
          ["Space", "#khong-gian"],
          ["Rhythm", "#nhip-song"],
          ["What remains", "#du-am"],
        ] as const)
      : ([
          ["Câu chuyện", "#cau-chuyen"],
          ["Không gian", "#khong-gian"],
          ["Nhịp sống", "#nhip-song"],
          ["Dư âm", "#du-am"],
        ] as const);
  const mobileItems = storyMode
    ? storyItems.map(([label, hash]) => ({ label, href: `${config.basePath}${hash}`, exact: true }))
    : localizedNavItems.map(([label, path]) => ({
        label,
        href: scoped(config.basePath, path),
        exact: !path,
      }));
  const contactHref = scoped(config.basePath, "lien-he");

  const headerTone = overlay
    ? "-mb-[92px] border-b border-[#eae1d2]/20 bg-[#16311c]/48 text-[#eae1d2]"
    : "border-b border-[#16311c]/12 bg-[#eae1d2]/92 text-[#16311c]";

  return (
    <>
      <ScrollAwareHeader className={`sticky top-0 z-50 backdrop-blur-xl ${headerTone}`}>
        <div className="mx-auto grid h-[92px] w-[min(1500px,calc(100%-24px))] grid-cols-[1fr_auto_1fr] items-center gap-3 sm:w-[min(1500px,calc(100%-48px))] xl:gap-7 2xl:gap-10">
          <div className="flex min-w-0 items-center justify-start xl:hidden">
            <MobileMenu
              name={config.name}
              mood={config.mood}
              items={mobileItems}
              contactHref={contactHref}
              locale={locale}
              wideHeader
            />
          </div>

          <div className="hidden min-w-0 items-center justify-start xl:flex">
            <nav
              aria-label={locale === "en" ? "Primary navigation" : "Điều hướng chính"}
              className="flex min-w-0 items-center gap-5 whitespace-nowrap text-[.6rem] font-bold uppercase tracking-[.1em] 2xl:gap-7 2xl:text-[.62rem] 2xl:tracking-[.12em]"
            >
              {(storyMode ? storyItems.slice(0, 2) : localizedNavItems.slice(0, 4)).map(
                ([label, path]) => (
                  <NavLink
                    key={path}
                    href={storyMode ? `${config.basePath}${path}` : scoped(config.basePath, path)}
                    label={label}
                    mood={config.mood}
                    exact={!path}
                  />
                ),
              )}
            </nav>
          </div>

          <Link
            href={scoped(config.basePath)}
            aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"}
            className="focus-ring col-start-2 flex items-center justify-self-center rounded-md xl:col-start-auto"
          >
            <BrandLogo
              variant="wordmark"
              decorative
              className="w-[118px] sm:w-[132px] xl:w-[140px] 2xl:w-[148px]"
            />
          </Link>

          <div className="col-start-3 flex min-w-0 items-center justify-end gap-2 xl:col-start-auto xl:gap-3">
            <nav
              aria-label={locale === "en" ? "Secondary navigation" : "Điều hướng bổ sung"}
              className="hidden min-w-0 items-center gap-5 whitespace-nowrap text-[.6rem] font-bold uppercase tracking-[.1em] xl:flex 2xl:gap-7 2xl:text-[.62rem] 2xl:tracking-[.12em]"
            >
              {(storyMode ? storyItems.slice(2) : localizedNavItems.slice(4)).map(
                ([label, path]) => (
                  <NavLink
                    key={path}
                    href={storyMode ? `${config.basePath}${path}` : scoped(config.basePath, path)}
                    label={label}
                    mood={config.mood}
                    exact={!path}
                  />
                ),
              )}
              <NavLink
                href={contactHref}
                label={locale === "en" ? "Contact" : "Liên hệ"}
                mood={config.mood}
                exact
              />
            </nav>
            <div className="hidden xl:block">
              <LanguageSwitcher locale={locale} compact alwaysVisible />
            </div>
            <BookingControl locale={locale} />
          </div>
        </div>
      </ScrollAwareHeader>
    </>
  );
}
