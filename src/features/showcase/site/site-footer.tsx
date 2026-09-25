import Link from "next/link";
import { Instagram, Phone } from "lucide-react";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { BrandLogo } from "@/shared/components/brand/brand-logo";
import { ZaloIcon } from "@/shared/components/ui/zalo-icon";
import { publicContact } from "@/shared/lib/public-contact";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { scoped } from "@/features/showcase/site/navigation";

export function SocialContactIcons() {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:flex-nowrap md:justify-start"
      aria-label="Các kênh liên hệ"
    >
      <a
        href={publicContact.facebookHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook LAKA"
        className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white"
      >
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      <a
        href={publicContact.messengerHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Messenger LAKA"
        className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white"
      >
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.09.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.96 3.127 3.26 5.89-3.26-6.558 6.96z" />
        </svg>
      </a>
      <a
        href={publicContact.instagramHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram LAKA"
        className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white"
      >
        <Instagram className="h-5 w-5" />
      </a>
      <a
        href={publicContact.zaloHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Zalo LAKA"
        className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white"
      >
        <ZaloIcon className="h-6 w-6" />
      </a>
      <a
        href={publicContact.tiktokHref}
        target="_blank"
        rel="noreferrer"
        aria-label="TikTok LAKA"
        className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white"
      >
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      </a>
      <a
        href={publicContact.phoneHref}
        aria-label="Hotline LAKA"
        className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}

export function SiteFooter({
  config,
  locale = "vi",
  storyMode = false,
  homeMode = false,
}: {
  config: SiteConfig;
  locale?: ShowcaseLocale;
  storyMode?: boolean;
  homeMode?: boolean;
}) {
  if (homeMode)
    return (
      <footer className="border-t border-[#16311c]/25 bg-[#eae1d2] pt-14 pb-8 text-[#16311c] sm:pb-10">
        <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] items-start gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-[1fr_1.1fr_auto]">
          {/* Col 1: Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Link
              href={config.basePath}
              aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"}
              className="inline-flex"
            >
              <BrandLogo variant="established" decorative className="w-[190px]" />
            </Link>
          </div>

          {/* Col 2: Thông tin - Mobile: 1 row; Desktop: 2-column list */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-full text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-[.16em] opacity-80">
                {locale === "en" ? "Information" : "Thông tin"}
              </p>
              {/* Mobile view (1 row centered) */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] font-medium opacity-90 md:hidden">
                <Link href={scoped(config.basePath, "di-chuyen")} className="hover:underline">
                  {locale === "en" ? "Getting here" : "Hướng dẫn di chuyển"}
                </Link>
                <Link href={scoped(config.basePath, "dieu-khoan")} className="hover:underline">
                  {locale === "en" ? "Terms" : "Điều khoản"}
                </Link>
                <Link href={scoped(config.basePath, "faq")} className="hover:underline">
                  {locale === "en" ? "FAQ" : "Câu hỏi thường gặp"}
                </Link>
                <Link href={scoped(config.basePath, "bao-mat")} className="hover:underline">
                  {locale === "en" ? "Privacy" : "Bảo mật"}
                </Link>
                <Link
                  href={scoped(config.basePath, "chinh-sach-luu-tru")}
                  className="hover:underline"
                >
                  {locale === "en" ? "Stay policies" : "Chính sách lưu trú"}
                </Link>
                <Link href={scoped(config.basePath, "lien-he")} className="hover:underline">
                  {locale === "en" ? "Contact" : "Liên hệ"}
                </Link>
              </div>
              {/* Desktop view (2-column tidy grid) */}
              <div className="mt-5 hidden grid-cols-2 justify-items-start gap-x-8 gap-y-3.5 text-[15px] font-medium md:grid">
                <Link
                  href={scoped(config.basePath, "di-chuyen")}
                  className="w-fit transition hover:underline"
                >
                  {locale === "en" ? "Getting here" : "Hướng dẫn di chuyển"}
                </Link>
                <Link
                  href={scoped(config.basePath, "dieu-khoan")}
                  className="w-fit transition hover:underline"
                >
                  {locale === "en" ? "Terms" : "Điều khoản"}
                </Link>
                <Link
                  href={scoped(config.basePath, "faq")}
                  className="w-fit transition hover:underline"
                >
                  {locale === "en" ? "FAQ" : "Câu hỏi thường gặp"}
                </Link>
                <Link
                  href={scoped(config.basePath, "bao-mat")}
                  className="w-fit transition hover:underline"
                >
                  {locale === "en" ? "Privacy" : "Bảo mật"}
                </Link>
                <Link
                  href={scoped(config.basePath, "chinh-sach-luu-tru")}
                  className="w-fit transition hover:underline"
                >
                  {locale === "en" ? "Stay policies" : "Chính sách lưu trú"}
                </Link>
                <Link
                  href={scoped(config.basePath, "lien-he")}
                  className="w-fit transition hover:underline"
                >
                  {locale === "en" ? "Contact" : "Liên hệ"}
                </Link>
              </div>
            </div>
          </div>

          {/* Col 3: Kết nối */}
          <div className="flex flex-col items-center md:col-span-2 md:items-start lg:col-span-1">
            <p className="text-xs font-bold uppercase tracking-[.16em] opacity-80">
              {locale === "en" ? "Connect" : "Kết nối"}
            </p>
            <div className="mt-5 flex justify-center md:justify-start">
              <SocialContactIcons />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex flex-col items-center border-t border-[#16311c]/25 pt-6 text-center">
          <div className="text-sm leading-6 opacity-75">
            <p>@2026 Lakahomestay</p>
            <p className="mt-0.5">Dốc Dây Diều, Xóm 1, Thanh Hà, Trung Giã, Hà Nội</p>
            <p className="mt-0.5">{publicContact.email}</p>
            <p className="mt-0.5">{publicContact.phoneDisplay}</p>
          </div>
        </div>
      </footer>
    );

  if (storyMode)
    return (
      <footer className="border-t border-[#16311c]/25 bg-[#eae1d2] pt-14 pb-8 text-[#16311c] sm:pb-10">
        <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] gap-12 text-center md:grid-cols-[1.25fr_.75fr] md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link
              href={config.basePath}
              aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"}
              className="inline-flex"
            >
              <BrandLogo variant="established" decorative className="w-[190px]" />
            </Link>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="w-full text-center md:w-fit md:text-right">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#80613f]">
                {locale === "en" ? "Keep exploring" : "Tiếp tục khám phá"}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] md:flex-col md:items-end md:gap-3">
                <Link
                  href={scoped(config.basePath, "ve-laka")}
                  className="w-fit transition hover:underline"
                >
                  {locale === "en" ? "The LAKA story" : "Câu chuyện LAKA"}
                </Link>
                <Link
                  href={scoped(config.basePath, "trai-nghiem")}
                  className="w-fit transition hover:underline"
                >
                  {locale === "en" ? "The LAKA rhythm" : "Nhịp sống LAKA"}
                </Link>
                <Link
                  href={scoped(config.basePath, "lien-he")}
                  className="w-fit transition hover:underline"
                >
                  {locale === "en" ? "Contact" : "Liên hệ"}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex flex-col items-center gap-5 border-t border-[#16311c]/25 pt-6 text-center">
          <SocialContactIcons />
          <div className="text-sm leading-6 opacity-75">
            <p>@2026 Lakahomestay</p>
            <p className="mt-0.5">Dốc Dây Diều, Xóm 1, Thanh Hà, Trung Giã, Hà Nội</p>
            <p className="mt-0.5">{publicContact.email}</p>
            <p className="mt-0.5">{publicContact.phoneDisplay}</p>
          </div>
        </div>
      </footer>
    );

  return (
    <footer
      className={`border-t border-current/25 pt-14 pb-8 sm:pb-10 ${config.mood === "organic" ? "bg-[#e7ded1]" : config.mood === "cinematic" ? "bg-[#0b190f]" : "bg-[#eae1d2]"}`}
    >
      <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] items-start gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-[1fr_1.1fr_auto]">
        <div className="flex flex-col items-center md:items-start">
          <Link
            href={config.basePath || "/"}
            aria-label={locale === "en" ? "LAKA Homestay - Home" : "LAKA Homestay - Trang chủ"}
            className="inline-flex"
          >
            <BrandLogo
              variant={config.mood === "editorial" ? "established" : "homestay"}
              decorative
              className={`${config.mood === "editorial" ? "w-[190px]" : "w-[210px]"} ${config.mood === "cinematic" ? "text-[#eae1d2]" : "text-[#16311c]"}`}
            />
          </Link>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <div className="w-full text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[.16em] opacity-80">
              {locale === "en" ? "Information" : "Thông tin"}
            </p>
            {/* Mobile view (1 row centered) */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] font-medium opacity-90 md:hidden">
              <Link href={scoped(config.basePath, "di-chuyen")} className="hover:underline">
                {locale === "en" ? "Getting here" : "Hướng dẫn di chuyển"}
              </Link>
              <Link href={scoped(config.basePath, "dieu-khoan")} className="hover:underline">
                {locale === "en" ? "Terms" : "Điều khoản"}
              </Link>
              <Link href={scoped(config.basePath, "faq")} className="hover:underline">
                FAQ
              </Link>
              <Link href={scoped(config.basePath, "bao-mat")} className="hover:underline">
                {locale === "en" ? "Privacy" : "Bảo mật"}
              </Link>
              <Link
                href={scoped(config.basePath, "chinh-sach-luu-tru")}
                className="hover:underline"
              >
                {locale === "en" ? "Stay policies" : "Chính sách lưu trú"}
              </Link>
              <Link href={scoped(config.basePath, "lien-he")} className="hover:underline">
                {locale === "en" ? "Contact" : "Liên hệ"}
              </Link>
            </div>
            {/* Desktop view (2-column tidy grid) */}
            <div className="mt-5 hidden grid-cols-2 justify-items-start gap-x-8 gap-y-3.5 text-[15px] font-medium md:grid">
              <Link
                href={scoped(config.basePath, "di-chuyen")}
                className="w-fit transition hover:underline"
              >
                {locale === "en" ? "Getting here" : "Hướng dẫn di chuyển"}
              </Link>
              <Link
                href={scoped(config.basePath, "dieu-khoan")}
                className="w-fit transition hover:underline"
              >
                {locale === "en" ? "Terms" : "Điều khoản"}
              </Link>
              <Link
                href={scoped(config.basePath, "faq")}
                className="w-fit transition hover:underline"
              >
                FAQ
              </Link>
              <Link
                href={scoped(config.basePath, "bao-mat")}
                className="w-fit transition hover:underline"
              >
                {locale === "en" ? "Privacy" : "Bảo mật"}
              </Link>
              <Link
                href={scoped(config.basePath, "chinh-sach-luu-tru")}
                className="w-fit transition hover:underline"
              >
                {locale === "en" ? "Stay policies" : "Chính sách lưu trú"}
              </Link>
              <Link
                href={scoped(config.basePath, "lien-he")}
                className="w-fit transition hover:underline"
              >
                {locale === "en" ? "Contact" : "Liên hệ"}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:col-span-2 md:items-start lg:col-span-1">
          <p className="text-xs font-bold uppercase tracking-[.16em] opacity-80">
            {locale === "en" ? "Connect" : "Kết nối"}
          </p>
          <div className="mt-5 flex justify-center md:justify-start">
            <SocialContactIcons />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex flex-col items-center gap-5 border-t border-current/25 pt-6 text-center">
        <div className="text-sm leading-6 opacity-75">
          <p>@2026 Lakahomestay</p>
          <p className="mt-0.5">Dốc Dây Diều, Xóm 1, Thanh Hà, Trung Giã, Hà Nội</p>
          <p className="mt-0.5">{publicContact.email}</p>
          <p className="mt-0.5">{publicContact.phoneDisplay}</p>
        </div>
      </div>
    </footer>
  );
}
