import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  Check,
  House,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone
} from "lucide-react";
import { TemplateBookingControl } from "@/features/showcase/components/template-booking-control";
import { TemplateExperienceLayer } from "@/features/showcase/components/template-experience-layer";
import { TemplateMobileMenu } from "@/features/showcase/components/template-mobile-menu";
import { TemplateNavLink } from "@/features/showcase/components/template-nav-link";
import { TemplateStayHero } from "@/features/showcase/components/template-stay-showcase";
import { StayBannerHero } from "@/features/showcase/components/stay-banner-hero";
import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import { StayProductExplorer } from "@/features/showcase/components/stay-product-explorer";
import { ContactInquiryForm } from "@/features/showcase/components/contact-inquiry-form";
import { ScrollAwareHeader } from "@/features/showcase/components/scroll-aware-header";
import { TemplateExperienceStory } from "@/features/showcase/components/template-experience-story";
import { TemplateFaqIndex, TemplateFaqSection, TemplateInfoHighlights, TemplateInfoRelatedLinks, TemplatePolicySection } from "@/features/showcase/components/template-info-sections";
import { TemplateAboutStory, TemplateContactChannels } from "@/features/showcase/components/template-brand-sections";
import { TemplateLanguageSwitcher } from "@/features/showcase/components/template-language-switcher";
import { TemplateDocumentLocale } from "@/features/showcase/components/template-document-locale";
import {
  TemplateDiningAndOccasions,
  TemplateExperienceCatalog,
  TemplateJourneySection,
  TemplateServicesCatalog
} from "@/features/showcase/components/template-destination-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";
import { conceptImages, getUnitsForStay, stays } from "@/features/stays/data/demo-data";
import { SkipLink } from "@/shared/components/ui/skip-link";
import { BrandLogo } from "@/shared/components/brand/brand-logo";
import { ZaloIcon } from "@/shared/components/ui/zalo-icon";
import type { TemplateRoute } from "@/features/showcase/site/template-route";
import { publicContact } from "@/shared/lib/public-contact";

export type TemplateMood = "editorial" | "cinematic" | "organic";

export type CompleteTemplateConfig = {
  slug: "main";
  name: string;
  mood: TemplateMood;
  basePath: string;
  background: string;
  ink: string;
  accent: string;
  surface: string;
  muted: string;
};

const navItems = [
  ["Lưu trú", "luu-tru"],
  ["Ẩm thực", "am-thuc"],
  ["Trải nghiệm", "trai-nghiem"],
  ["Dịch vụ", "dich-vu"],
  ["Về LAKA", "ve-laka"],
  ["Thông tin", "thong-tin"]
] as const;

const englishNavItems = [
  ["Stays", "luu-tru"],
  ["Dining", "am-thuc"],
  ["Experiences", "trai-nghiem"],
  ["Services", "dich-vu"],
  ["About LAKA", "ve-laka"],
  ["Information", "thong-tin"]
] as const;

const policies = [
  ["Đặt chỗ và xác nhận", "Yêu cầu từ website được giữ trong 2 giờ. Đặt chỗ chỉ được xác nhận sau khi đội ngũ LAKA liên hệ qua điện thoại hoặc Zalo."],
  ["Thay đổi và hủy", "Điều kiện đổi ngày, hủy và hoàn cọc sẽ được thông báo rõ ràng trong bước xác nhận. Nội dung chính thức cần được duyệt trước khi mở bán."],
  ["Nhận và trả căn", "Khung giờ chính thức chưa được công bố. LAKA xác nhận cùng thông tin căn, lịch trống và hướng dẫn đến nơi trước chuyến đi."],
  ["Số khách và trẻ em", "Số khách không vượt quá sức chứa công bố của từng căn. Chính sách phụ thu, trẻ em và giường bổ sung cần được xác nhận khi đặt."],
  ["Không gian và tiếng ồn", "LAKA hướng đến kỳ nghỉ yên tĩnh. Khách vui lòng giữ âm lượng vừa phải sau 22:00 và trao đổi trước nếu tổ chức hoạt động nhóm."],
  ["Vật nuôi", "Khả năng đón vật nuôi phụ thuộc từng căn và điều kiện vận hành tại thời điểm lưu trú. Vui lòng hỏi LAKA trước khi đặt."],
  ["Quyền riêng tư", "Thông tin liên hệ chỉ được dùng để xử lý yêu cầu lưu trú, chăm sóc khách và thực hiện các nghĩa vụ vận hành cần thiết."],
  ["Nội dung minh họa", "Hình ảnh concept, giá và một số chính sách chưa phải cam kết thương mại. Địa chỉ và cấu trúc 20 căn đã được cập nhật từ tài liệu LAKA."]
] as const;

function scoped(basePath: string, path = "") {
  return path ? `${basePath}/${path}` : basePath || "/";
}

export function TemplateHeader({ config, locale = "vi", overlay = false, storyMode = false }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale; overlay?: boolean; storyMode?: boolean }) {
  const localizedNavItems = locale === "en" ? englishNavItems : navItems;
  const storyItems = locale === "en"
    ? [["Story", "#cau-chuyen"], ["Space", "#khong-gian"], ["Rhythm", "#nhip-song"], ["What remains", "#du-am"]] as const
    : [["Câu chuyện", "#cau-chuyen"], ["Không gian", "#khong-gian"], ["Nhịp sống", "#nhip-song"], ["Dư âm", "#du-am"]] as const;
  const mobileItems = storyMode
    ? storyItems.map(([label, hash]) => ({ label, href: `${config.basePath}${hash}`, exact: true }))
    : localizedNavItems.map(([label, path]) => ({ label, href: scoped(config.basePath, path), exact: !path }));
  const contactHref = scoped(config.basePath, "lien-he");

  const headerTone = overlay
    ? "-mb-[92px] border-b border-[#eae1d2]/20 bg-[#16311c]/48 text-[#eae1d2]"
    : "border-b border-[#16311c]/12 bg-[#eae1d2]/92 text-[#16311c]";

  return <>
    <ScrollAwareHeader className={`sticky top-0 z-50 backdrop-blur-xl ${headerTone}`}>
      <div className="mx-auto grid h-[92px] w-[min(1500px,calc(100%-24px))] grid-cols-[1fr_auto_1fr] items-center gap-3 sm:w-[min(1500px,calc(100%-48px))] xl:gap-7 2xl:gap-10">
        <div className="flex min-w-0 items-center justify-start xl:hidden">
          <TemplateMobileMenu name={config.name} mood={config.mood} items={mobileItems} contactHref={contactHref} locale={locale} wideHeader />
        </div>

        <div className="hidden min-w-0 items-center justify-start xl:flex">
          <nav aria-label={locale === "en" ? "Primary navigation" : "Điều hướng chính"} className="flex min-w-0 items-center gap-5 whitespace-nowrap text-[.6rem] font-bold uppercase tracking-[.1em] 2xl:gap-7 2xl:text-[.62rem] 2xl:tracking-[.12em]">
            {(storyMode ? storyItems.slice(0, 2) : localizedNavItems.slice(0, 4)).map(([label, path]) => <TemplateNavLink key={path} href={storyMode ? `${config.basePath}${path}` : scoped(config.basePath, path)} label={label} mood={config.mood} exact={!path} />)}
          </nav>
        </div>

        <Link
          href={scoped(config.basePath)}
          aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"}
          className="focus-ring col-start-2 flex items-center justify-self-center rounded-md xl:col-start-auto"
        >
          <BrandLogo variant="wordmark" decorative className="w-[118px] sm:w-[132px] xl:w-[140px] 2xl:w-[148px]" />
        </Link>

        <div className="col-start-3 flex min-w-0 items-center justify-end gap-2 xl:col-start-auto xl:gap-3">
          <nav aria-label={locale === "en" ? "Secondary navigation" : "Điều hướng bổ sung"} className="hidden min-w-0 items-center gap-5 whitespace-nowrap text-[.6rem] font-bold uppercase tracking-[.1em] xl:flex 2xl:gap-7 2xl:text-[.62rem] 2xl:tracking-[.12em]">
            {(storyMode ? storyItems.slice(2) : localizedNavItems.slice(4)).map(([label, path]) => <TemplateNavLink key={path} href={storyMode ? `${config.basePath}${path}` : scoped(config.basePath, path)} label={label} mood={config.mood} exact={!path} />)}
            <TemplateNavLink href={contactHref} label={locale === "en" ? "Contact" : "Liên hệ"} mood={config.mood} exact />
          </nav>
          <div className="hidden xl:block">
            <TemplateLanguageSwitcher locale={locale} compact alwaysVisible />
          </div>
          <TemplateBookingControl locale={locale} />
        </div>
      </div>
    </ScrollAwareHeader>
  </>;
}

function SocialContactIcons() {
  return <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:flex-nowrap md:justify-start" aria-label="Các kênh liên hệ">
    <a href={publicContact.facebookHref} target="_blank" rel="noreferrer" aria-label="Facebook LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white">
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    </a>
    <a href={publicContact.messengerHref} target="_blank" rel="noreferrer" aria-label="Messenger LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white">
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.09.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.96 3.127 3.26 5.89-3.26-6.558 6.96z"/></svg>
    </a>
    <a href={publicContact.instagramHref} target="_blank" rel="noreferrer" aria-label="Instagram LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white">
      <Instagram className="h-5 w-5" />
    </a>
    <a href={publicContact.zaloHref} target="_blank" rel="noreferrer" aria-label="Zalo LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white">
      <ZaloIcon className="h-6 w-6" />
    </a>
    <a href={publicContact.tiktokHref} target="_blank" rel="noreferrer" aria-label="TikTok LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white">
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
    </a>
    <a href={publicContact.phoneHref} aria-label="Hotline LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-[#16311c]/60 bg-white/70 text-[#16311c] shadow-sm transition hover:scale-105 hover:border-[#16311c] hover:bg-[#16311c] hover:text-white">
      <Phone className="h-5 w-5" />
    </a>
  </div>;
}

export function TemplateFooter({ config, locale = "vi", storyMode = false, homeMode = false }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale; storyMode?: boolean; homeMode?: boolean }) {
  if (homeMode) return <footer className="border-t border-[#16311c]/25 bg-[#eae1d2] pt-14 pb-8 text-[#16311c] sm:pb-10">
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] items-start gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-[1fr_1.1fr_auto]">
      {/* Col 1: Logo */}
      <div className="flex flex-col items-center md:items-start">
        <Link href={config.basePath} aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"} className="inline-flex">
          <BrandLogo variant="established" decorative className="w-[190px]" />
        </Link>
      </div>

      {/* Col 2: Thông tin - Mobile: 1 row; Desktop: 2-column list */}
      <div className="flex flex-col items-center md:items-start">
        <div className="w-full text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Information" : "Thông tin"}</p>
          {/* Mobile view (1 row centered) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] font-medium opacity-90 md:hidden">
            <Link href={scoped(config.basePath, "di-chuyen")} className="hover:underline">{locale === "en" ? "Getting here" : "Hướng dẫn di chuyển"}</Link>
            <Link href={scoped(config.basePath, "dieu-khoan")} className="hover:underline">{locale === "en" ? "Terms" : "Điều khoản"}</Link>
            <Link href={scoped(config.basePath, "faq")} className="hover:underline">{locale === "en" ? "FAQ" : "Câu hỏi thường gặp"}</Link>
            <Link href={scoped(config.basePath, "bao-mat")} className="hover:underline">{locale === "en" ? "Privacy" : "Bảo mật"}</Link>
            <Link href={scoped(config.basePath, "chinh-sach-luu-tru")} className="hover:underline">{locale === "en" ? "Stay policies" : "Chính sách lưu trú"}</Link>
            <Link href={scoped(config.basePath, "lien-he")} className="hover:underline">{locale === "en" ? "Contact" : "Liên hệ"}</Link>
          </div>
          {/* Desktop view (2-column tidy grid) */}
          <div className="mt-5 hidden grid-cols-2 justify-items-start gap-x-8 gap-y-3.5 text-[15px] font-medium md:grid">
            <Link href={scoped(config.basePath, "di-chuyen")} className="w-fit transition hover:underline">{locale === "en" ? "Getting here" : "Hướng dẫn di chuyển"}</Link>
            <Link href={scoped(config.basePath, "dieu-khoan")} className="w-fit transition hover:underline">{locale === "en" ? "Terms" : "Điều khoản"}</Link>
            <Link href={scoped(config.basePath, "faq")} className="w-fit transition hover:underline">{locale === "en" ? "FAQ" : "Câu hỏi thường gặp"}</Link>
            <Link href={scoped(config.basePath, "bao-mat")} className="w-fit transition hover:underline">{locale === "en" ? "Privacy" : "Bảo mật"}</Link>
            <Link href={scoped(config.basePath, "chinh-sach-luu-tru")} className="w-fit transition hover:underline">{locale === "en" ? "Stay policies" : "Chính sách lưu trú"}</Link>
            <Link href={scoped(config.basePath, "lien-he")} className="w-fit transition hover:underline">{locale === "en" ? "Contact" : "Liên hệ"}</Link>
          </div>
        </div>
      </div>

      {/* Col 3: Kết nối */}
      <div className="flex flex-col items-center md:col-span-2 md:items-start lg:col-span-1">
        <p className="text-xs font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Connect" : "Kết nối"}</p>
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
  </footer>;

  if (storyMode) return <footer className="border-t border-[#16311c]/25 bg-[#eae1d2] pt-14 pb-8 text-[#16311c] sm:pb-10">
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] gap-12 text-center md:grid-cols-[1.25fr_.75fr] md:text-left">
      <div className="flex flex-col items-center md:items-start">
        <Link href={config.basePath} aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"} className="inline-flex">
          <BrandLogo variant="established" decorative className="w-[190px]" />
        </Link>
      </div>
      <div className="flex flex-col items-center md:items-end">
        <div className="w-full text-center md:w-fit md:text-right">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#80613f]">{locale === "en" ? "Keep exploring" : "Tiếp tục khám phá"}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] md:flex-col md:items-end md:gap-3">
            <Link href={scoped(config.basePath, "ve-laka")} className="w-fit transition hover:underline">{locale === "en" ? "The LAKA story" : "Câu chuyện LAKA"}</Link>
            <Link href={scoped(config.basePath, "trai-nghiem")} className="w-fit transition hover:underline">{locale === "en" ? "The LAKA rhythm" : "Nhịp sống LAKA"}</Link>
            <Link href={scoped(config.basePath, "lien-he")} className="w-fit transition hover:underline">{locale === "en" ? "Contact" : "Liên hệ"}</Link>
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
  </footer>;

  return <footer className={`border-t border-current/25 pt-14 pb-8 sm:pb-10 ${config.mood === "organic" ? "bg-[#e7ded1]" : config.mood === "cinematic" ? "bg-[#0b190f]" : "bg-[#eae1d2]"}`}>
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] items-start gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-[1fr_1.1fr_auto]">
      <div className="flex flex-col items-center md:items-start">
        <Link href={config.basePath || "/"} aria-label={locale === "en" ? "LAKA Homestay - Home" : "LAKA Homestay - Trang chủ"} className="inline-flex">
          <BrandLogo variant={config.mood === "editorial" ? "established" : "homestay"} decorative className={`${config.mood === "editorial" ? "w-[190px]" : "w-[210px]"} ${config.mood === "cinematic" ? "text-[#eae1d2]" : "text-[#16311c]"}`} />
        </Link>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <div className="w-full text-center md:text-left">
          <p className="text-xs font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Information" : "Thông tin"}</p>
          {/* Mobile view (1 row centered) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] font-medium opacity-90 md:hidden">
            <Link href={scoped(config.basePath, "di-chuyen")} className="hover:underline">{locale === "en" ? "Getting here" : "Hướng dẫn di chuyển"}</Link>
            <Link href={scoped(config.basePath, "dieu-khoan")} className="hover:underline">{locale === "en" ? "Terms" : "Điều khoản"}</Link>
            <Link href={scoped(config.basePath, "faq")} className="hover:underline">FAQ</Link>
            <Link href={scoped(config.basePath, "bao-mat")} className="hover:underline">{locale === "en" ? "Privacy" : "Bảo mật"}</Link>
            <Link href={scoped(config.basePath, "chinh-sach-luu-tru")} className="hover:underline">{locale === "en" ? "Stay policies" : "Chính sách lưu trú"}</Link>
            <Link href={scoped(config.basePath, "lien-he")} className="hover:underline">{locale === "en" ? "Contact" : "Liên hệ"}</Link>
          </div>
          {/* Desktop view (2-column tidy grid) */}
          <div className="mt-5 hidden grid-cols-2 justify-items-start gap-x-8 gap-y-3.5 text-[15px] font-medium md:grid">
            <Link href={scoped(config.basePath, "di-chuyen")} className="w-fit transition hover:underline">{locale === "en" ? "Getting here" : "Hướng dẫn di chuyển"}</Link>
            <Link href={scoped(config.basePath, "dieu-khoan")} className="w-fit transition hover:underline">{locale === "en" ? "Terms" : "Điều khoản"}</Link>
            <Link href={scoped(config.basePath, "faq")} className="w-fit transition hover:underline">FAQ</Link>
            <Link href={scoped(config.basePath, "bao-mat")} className="w-fit transition hover:underline">{locale === "en" ? "Privacy" : "Bảo mật"}</Link>
            <Link href={scoped(config.basePath, "chinh-sach-luu-tru")} className="w-fit transition hover:underline">{locale === "en" ? "Stay policies" : "Chính sách lưu trú"}</Link>
            <Link href={scoped(config.basePath, "lien-he")} className="w-fit transition hover:underline">{locale === "en" ? "Contact" : "Liên hệ"}</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center md:col-span-2 md:items-start lg:col-span-1">
        <p className="text-xs font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Connect" : "Kết nối"}</p>
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
  </footer>;
}

function StaysPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return (
    <>
      <StayBannerHero config={config} locale={locale} />
      <Suspense fallback={<div className="min-h-[60svh] bg-[#eae1d2]" />}>
        <StayProductExplorer basePath={config.basePath} locale={locale} />
      </Suspense>
    </>
  );
}

function StayPage({ config, slug, locale }: { config: CompleteTemplateConfig; slug: string; locale: ShowcaseLocale }) {
  const stay = localizeStay(stays.find((item) => item.slug === slug)!, locale);
  const units = getUnitsForStay(stay.id);
  const cinematic = config.mood === "cinematic";
  const organic = config.mood === "organic";
  const galleryGrid = cinematic ? "sm:grid-cols-12" : organic ? "sm:grid-cols-12" : "sm:grid-cols-3";
  const galleryShape = (index: number) => {
    if (cinematic) return index === 0 ? "aspect-[4/3] sm:col-span-7" : index === 1 ? "aspect-[4/5] sm:col-span-5" : "aspect-[16/7] sm:col-span-12";
    if (organic) return index === 0 ? "aspect-[4/3] rounded-[70px_26px_70px_26px] sm:col-span-7" : index === 1 ? "aspect-[4/5] rounded-[28px_72px_28px_72px] sm:col-span-5" : "aspect-[16/7] rounded-[44px] sm:col-span-12";
    return index === 0 ? "aspect-[4/5]" : "aspect-[4/3] sm:mt-12";
  };
  return <><TemplateStayHero mood={config.mood} basePath={config.basePath} stay={stay} locale={locale} />
    <section id="khong-gian" className={`laka-section-normal mx-auto grid scroll-mt-24 gap-12 lg:grid-cols-[1fr_360px] ${cinematic ? "w-[min(1420px,calc(100%-40px))] lg:grid-cols-[1fr_390px]" : "w-[min(1240px,calc(100%-40px))]"}`}><div><h2 className="laka-heading-section max-w-3xl">{locale === "en" ? "Inside the home" : cinematic ? "Bên trong khung hình" : organic ? "Có gì trong nhà?" : "Không gian của căn"}</h2><p className="laka-section-lead mt-5 max-w-3xl opacity-72">{stay.longDescription}</p><div className={`mt-12 grid gap-4 ${galleryGrid}`}>{stay.gallery.map((image, index) => <div key={image} className={`group relative overflow-hidden ${galleryShape(index)}`}><Image src={image} alt={`${stay.name} - ${locale === "en" ? `space ${index + 1}` : `góc không gian ${index + 1}`}`} fill sizes="(max-width:640px) 100vw, 55vw" className={`object-cover transition duration-700 group-hover:scale-[1.025] ${cinematic ? "opacity-78 group-hover:opacity-100" : ""}`} /><span className={`absolute bottom-3 left-3 px-3 py-1.5 text-[.56rem] font-bold uppercase tracking-wider ${cinematic ? "bg-black/55 text-white backdrop-blur" : "bg-white/88 text-[#16311c]"}`}>{locale === "en" ? "Frame" : "Góc"} {String(index + 1).padStart(2, "0")} · {locale === "en" ? "concept" : "minh họa"}</span></div>)}</div><h3 className="laka-heading-card mt-14">{locale === "en" ? "Featured amenities" : organic ? "Đủ tiện nghi để ở thật vui" : cinematic ? "Những chi tiết trong căn" : "Tiện nghi nổi bật"}</h3><div className={`mt-6 grid gap-3 sm:grid-cols-2 ${organic ? "gap-2" : ""}`}>{stay.amenities.map((item, index) => <span key={item} className={`flex items-center gap-3 py-3 text-sm ${organic ? "rounded-full bg-white px-4 font-bold shadow-sm" : "border-b border-current/10"}`}><span className={`${cinematic ? "text-[.6rem] font-bold text-[var(--template-accent)]" : ""}`}>{cinematic ? String(index + 1).padStart(2, "0") : <Check className="h-4 w-4 text-[var(--template-accent)]" />}</span>{item}</span>)}</div>
      <section className="mt-14 border-t border-current/12 pt-10">
         <div className="grid gap-5 sm:grid-cols-[1fr_.55fr] sm:items-start">
           <div><p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[var(--template-accent)]">{locale === "en" ? "Physical homes in this type" : "Các căn thực tế thuộc dòng này"}</p><h3 className="laka-heading-card mt-4">{locale === "en" ? `${units.length} homes, each with its own position.` : `${units.length} căn, mỗi căn có một vị trí riêng.`}</h3></div>
          <p className="text-sm leading-7 opacity-60">{locale === "en" ? "Units in the same type share an architectural direction. LAKA confirms the specific unit according to availability and your preference." : "Các căn cùng dòng chia sẻ một định hướng kiến trúc. LAKA sẽ xác nhận căn cụ thể theo lịch trống và mong muốn của bạn."}</p>
        </div>
        <div className={`mt-7 grid gap-3 ${units.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {units.map((unit, index) => <article key={unit.id} className={`border border-current/12 p-5 ${organic ? "rounded-[24px] bg-white" : "bg-[var(--template-surface)]"}`}>
            <div className="flex items-center justify-between gap-4"><span className="text-[.58rem] font-bold uppercase tracking-[.14em] text-[var(--template-accent)]">{unit.code}</span><span className="text-[.56rem] font-bold uppercase tracking-[.12em] opacity-45">0{index + 1}</span></div>
             <h4 className="laka-heading-card mt-6">{locale === "en" ? unit.nameEn : unit.name}</h4>
            <p className="mt-2 text-xs font-bold opacity-55">{locale === "en" ? unit.positionEn : unit.position}</p>
            <p className="mt-4 text-sm leading-6 opacity-70">{locale === "en" ? unit.characterEn : unit.character}</p>
          </article>)}
        </div>
      </section>
      <div className="mt-14 grid border-y border-current/12 sm:grid-cols-3">
        {[
          [locale === "en" ? "Best for" : "Phù hợp nhất", stay.idealFor],
          [locale === "en" ? "Included" : "Đã bao gồm", stay.included],
          [locale === "en" ? "Good to know" : "Cần biết", stay.stayNotes]
        ].map(([title, items], index) => (
          <section key={title as string} className={`py-7 sm:px-6 ${index < 2 ? "border-b border-current/12 sm:border-b-0 sm:border-r" : ""} sm:first:pl-0`}>
            <h3 className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[var(--template-accent)]">{title as string}</h3>
            <ul className="mt-5 space-y-3">{(items as string[]).map((item) => <li key={item} className="flex gap-2 text-sm leading-6 opacity-75"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--template-accent)]" />{item}</li>)}</ul>
          </section>
        ))}
      </div>
      <p className="mt-5 text-xs leading-6 opacity-55">{locale === "en" ? "Amenities and inclusions are illustrative and must be approved before launch." : "Tiện nghi và hạng mục bao gồm đang là dữ liệu minh họa, cần được duyệt trước khi mở bán."}</p>
      </div>
      <aside className={`h-fit border border-current/12 bg-[var(--template-surface)] p-6 lg:sticky lg:top-28 ${cinematic ? "shadow-[0_30px_90px_rgba(0,0,0,.28)]" : organic ? "rounded-[32px] shadow-[0_24px_70px_rgba(33,72,61,.12)]" : "rounded-t-[120px] px-7 pb-7 pt-20 shadow-xl"}`}>
        <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[var(--template-accent)]">{locale === "en" ? "A different way to stay" : "Một cách ở khác"}</p>
         <h2 className="laka-heading-card mt-4">{locale === "en" ? "A whole home, with room for your own rhythm." : "Một căn nhà trọn vẹn cho nhịp sống của riêng bạn."}</h2>
        <p className="mt-5 text-sm leading-7 opacity-65">{locale === "en" ? "Private living spaces, a distinct position in the landscape and the freedom to spend the day without a schedule." : "Không gian sinh hoạt riêng, một vị trí riêng trong cảnh quan và sự tự do để ngày trôi qua không cần lịch trình."}</p>
        <div className="my-7 border-y border-current/10 py-5 text-sm">
          <p className="flex items-center gap-2"><House className="h-4 w-4 text-[var(--template-accent)]" />{locale === "en" ? "A distinct LAKA accommodation type" : "Một dòng lưu trú riêng tại LAKA"}</p>
          <p className="mt-3 text-xs leading-6 opacity-55">{units.length} {locale === "en" ? "physical homes share this architectural language." : "căn thực tế cùng chung một ngôn ngữ kiến trúc."}</p>
        </div>
        <Link href={scoped(config.basePath, "trai-nghiem")} className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#16311c] px-5 py-4 text-sm font-bold text-white">{locale === "en" ? "Experience a day at LAKA" : "Cảm nhận một ngày tại LAKA"} <ArrowRight className="h-4 w-4" /></Link>
        <Link href={scoped(config.basePath, "luu-tru")} className="mt-3 flex min-h-12 items-center justify-center text-sm font-bold">{locale === "en" ? "Return to all homes" : "Trở lại các căn nhà"}</Link>
      </aside>
    </section></>;
}

function ExperiencePage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.experience}
        pill={isEn ? "Experiences at LAKA" : "Trải Nghiệm Tại LAKA"}
        title={isEn ? "LaKa - Experience" : "LaKa - Trải nghiệm"}
        subtitle={
          isEn
            ? "Every moment opens a new experience"
            : "Để mỗi khoảnh khắc tại LaKa mở ra một trải nghiệm mới."
        }
        description={
          isEn
            ? "From energetic pickleball matches and lake kayaking to calm swims in the blue pool, cycling and lively board games — every moment at LAKA unfolds a new experience."
            : "Từ những trận pickleball sôi nổi, lướt kayak rẽ sóng mặt hồ đến những phút thả mình trong làn nước xanh, đạp xe rong ruổi hay cùng nhau nhập cuộc ván board game rộn rã — để mỗi khoảnh khắc tại LaKa đều mở ra một trải nghiệm mới."
        }
        cardImage={conceptImages.experience}
        cardBadge="LAKA · Experience"
        cardAlt={isEn ? "Experience at LAKA" : "Trải nghiệm tại LAKA"}
        brandTagTop="Moments &"
        brandTagBottom="Discovery."
        dateStamp={isEn ? "Pickleball · Kayak · Pool · Games" : "Pickleball · Kayak · Hồ Xanh · Trò Chơi"}
        subTag={isEn ? "Lake · Valley · Active Living" : "Mặt Hồ · Thung Lũng · Trải Nghiệm"}
        actionText={isEn ? "Explore experiences" : "Khám phá trải nghiệm"}
        actionHref="#trai-nghiem"
        locale={locale}
      />
      <TemplateExperienceCatalog locale={locale} />
      <TemplateExperienceStory mood={config.mood} locale={locale} />
    </>
  );
}

function ServicesPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.detail2}
        pill={isEn ? "Services & Amenities" : "Dịch Vụ & Tiện Ích"}
        title={isEn ? "LaKa - Services" : "LaKa - Dịch Vụ"}
        subtitle={isEn ? "Everything useful, nothing intrusive" : "Đủ đầy khi cần, riêng tư khi muốn"}
        description={
          isEn
            ? "From family essentials and private transfers to shared nature spaces — choose only what makes your stay lighter."
            : "Từ tiện ích gia đình, xe đưa đón đến không gian thiên nhiên dùng chung — bạn chỉ cần chọn những gì khiến kỳ nghỉ nhẹ nhàng hơn."
        }
        cardImage={conceptImages.detail2}
        cardBadge="LAKA · Services"
        cardAlt={isEn ? "Services and amenities at LAKA" : "Dịch vụ và tiện ích tại LAKA"}
        brandTagTop="Comfort &"
        brandTagBottom="Care."
        dateStamp={isEn ? "Family Essentials · Transfers · Freedom" : "Tiện Ích Gia Đình · Di Chuyển · Tự Do"}
        subTag={isEn ? "Thoughtful & Discreet Support" : "Chăm Sóc Chu Đáo & Kín Đáo"}
        actionText={isEn ? "View services catalog" : "Danh mục dịch vụ"}
        actionHref="#danh-muc-dich-vu"
        locale={locale}
      />
      <TemplateServicesCatalog locale={locale} contactHref={scoped(config.basePath, "lien-he")} />
    </>
  );
}

function DiningPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.dining}
        pill={isEn ? "Dining & Occasions" : "Ẩm Thực & Bàn Tiệc"}
        title={isEn ? "LaKa - Dining" : "LaKa - Ẩm Thực"}
        subtitle={isEn ? "Flavours that keep the good times going." : "Những hương vị nối dài cuộc vui."}
        description={
          isEn
            ? "From lakeside barbecue grills and warm hot pots to cloud-viewing coffee and serene breakfast amidst nature — dining at LAKA is shaped around unforgettable shared time."
            : "Từ món nướng, lẩu quây quần bên hồ đến cà phê ngắm mây và bữa sáng thanh lành giữa thiên nhiên — ẩm thực tại LAKA nối dài những khoảnh khắc sum vầy."
        }
        cardImage={conceptImages.dining}
        cardBadge="LAKA · Dining"
        cardAlt={isEn ? "Dining at LAKA" : "Ẩm thực tại LAKA"}
        brandTagTop="Taste &"
        brandTagBottom="Culinary."
        dateStamp={isEn ? "Lakeside Grill · Local Flavors" : "Bếp Nướng Hồ · Hương Vị Bản Địa"}
        subTag={isEn ? "Slow Dining & Shared Moments" : "Bàn Ăn Chậm & Khoảnh Khắc Sum Vầy"}
        actionText={isEn ? "View restaurant menu" : "Xem thực đơn"}
        actionHref="#thuc-don"
        locale={locale}
      />
      <TemplateDiningAndOccasions locale={locale} />
    </>
  );
}

function AboutPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.forest}
        pill={isEn ? "The LAKA Philosophy" : "Triết Lý LAKA"}
        title={isEn ? '"Choose" Cabin. "Hold" Valley.' : '"Chọn" Cabin. "Trọn" Thung Lũng.'}
        subtitle={
          isEn
            ? "Choose an open space, embrace every moment of connection."
            : "Chọn một không gian mở, Trọn phút giây gắn kết."
        }
        description={
          isEn
            ? "LAKA began with a wish to create homes where people can give their full attention to nature and to one another."
            : "LAKA bắt đầu từ mong muốn tạo ra những căn nhà nơi con người có thể dành trọn sự chú ý cho thiên nhiên và cho nhau."
        }
        cardImage={conceptImages.forest}
        cardBadge="LAKA · Story"
        cardAlt={isEn ? "Pine forest at LAKA" : "Rừng thông tại LAKA"}
        brandTagTop="Origin &"
        brandTagBottom="Essence."
        dateStamp={isEn ? "Trung Gia · Soc Son · Hanoi" : "Trung Giã · Sóc Sơn · Hà Nội"}
        subTag={isEn ? "Nature Refuge Since 2026" : "Chốn An Trú Tự Nhiên 2026"}
        actionText={isEn ? "Read the LAKA story" : "Đọc câu chuyện"}
        actionHref="#cau-chuyen"
        locale={locale}
      />
      <TemplateAboutStory mood={config.mood} locale={locale} />
    </>
  );
}

function InfoPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        compact
        bgImage={conceptImages.hill}
        pill={isEn ? "Understanding LAKA" : "Hiểu Thêm Về LAKA"}
        title={isEn ? "LaKa - Information" : "LaKa - Thông Tin"}
        subtitle={isEn ? "Clear information, space for discovery" : "Thông tin rõ ràng, không gian khám phá"}
        description={
          isEn
            ? "A concise guide to the landscape, private homes, experiences and arrival notes to help you prepare before your stay."
            : "Những câu trả lời ngắn gọn và hướng dẫn chi tiết về cảnh quan, các căn nhà, trải nghiệm và lưu ý chuẩn bị trước chuyến đi."
        }
        cardImage={conceptImages.hill}
        cardBadge="LAKA · Handbook"
        cardAlt={isEn ? "Valley landscape at LAKA" : "Cảnh sắc thung lũng LAKA"}
        brandTagTop="Guide &"
        brandTagBottom="Handbook."
        dateStamp={isEn ? "Stays · Journey · FAQ" : "Lưu Trú · Hành Trình · FAQ"}
        subTag={isEn ? "All Essentials Before Arrival" : "Cẩm Nang Đầy Đủ Trước Khi Đến"}
        actionText={isEn ? "View FAQs" : "Xem câu hỏi"}
        actionHref="#faq-1"
        locale={locale}
      />
      <TemplateInfoHighlights locale={locale} />
      <TemplateJourneySection locale={locale} contactHref={scoped(config.basePath, "lien-he")} />
      <TemplateFaqSection mood={config.mood} policyHref={scoped(config.basePath, "chinh-sach-luu-tru")} locale={locale} />
      <TemplateInfoRelatedLinks basePath={config.basePath} locale={locale} />
    </>
  );
}

function FaqPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.detail1}
        pill={isEn ? "FAQ & Answers" : "Câu Hỏi Thường Gặp"}
        title={isEn ? "LaKa - FAQ" : "LaKa - Hỏi & Đáp"}
        subtitle={isEn ? "The useful details, without the noise" : "Những điều cần biết, không vòng vo"}
        description={
          isEn
            ? "Short, practical answers about stays, families, dining, services and the current LAKA concept taking shape."
            : "Câu trả lời ngắn gọn về lưu trú, gia đình, ẩm thực, dịch vụ và concept LAKA đang hoàn thiện."
        }
        cardImage={conceptImages.detail1}
        cardBadge="LAKA · Q&A"
        cardAlt={isEn ? "Peaceful corner at LAKA" : "Góc yên bình tại LAKA"}
        brandTagTop="Answers &"
        brandTagBottom="Details."
        dateStamp={isEn ? "Quick Q&A · 24/7 Support" : "Hỏi Đáp Nhanh · Hỗ Trợ 24/7"}
        subTag={isEn ? "Clear & Transparent Answers" : "Giải Đáp Minh Bạch & Tận Tâm"}
        actionText={isEn ? "View FAQ list" : "Danh sách câu hỏi"}
        actionHref="#faq-1"
        locale={locale}
      />
      <TemplateFaqIndex locale={locale} />
      <TemplateFaqSection mood={config.mood} policyHref={scoped(config.basePath, "chinh-sach-luu-tru")} locale={locale} />
    </>
  );
}

function DirectionsPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.cloud}
        pill={isEn ? "Getting to LAKA" : "Đường Đến LAKA"}
        title={isEn ? "LaKa - Directions" : "LaKa - Di Chuyển"}
        subtitle={isEn ? "The journey feels easy before it begins" : "Hành trình nhẹ nhàng từ trước khi khởi hành"}
        description={
          isEn
            ? "A dedicated place for routes, travel times, transfers and arrival notes. Map details and direct directions guide your way."
            : "Một nơi riêng cho cung đường, thời gian di chuyển, phương án đưa đón và lưu ý khi đến. Bản đồ và hỗ trợ đường đi thuận tiện nhất."
        }
        cardImage={conceptImages.cloud}
        cardBadge="LAKA · Route"
        cardAlt={isEn ? "Clouds over pine hills at LAKA" : "Mây trời và đồi thông tại LAKA"}
        brandTagTop="Map &"
        brandTagBottom="Routes."
        dateStamp={isEn ? "Doc Day Dieu, Trung Gia, Soc Son" : "Dốc Dây Diều, Trung Giã, Sóc Sơn"}
        subTag={isEn ? "45 Minutes From Central Hanoi" : "45 Phút Từ Trung Tâm Hà Nội"}
        actionText={isEn ? "View route guide" : "Xem chỉ đường"}
        actionHref="#chi-duong"
        locale={locale}
      />
      <TemplateJourneySection locale={locale} contactHref={scoped(config.basePath, "lien-he")} />
    </>
  );
}

function PolicyPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  const localizedPolicies = locale === "en" ? [
    ["Reservation and confirmation", "Requests made on the website are held for two hours. A reservation is confirmed only after the LAKA team contacts you by phone or Zalo."],
    ["Changes and cancellation", "Date changes, cancellations and deposit refunds are explained clearly during confirmation. Final terms must be approved before bookings open."],
    ["Arrival and departure", "Official times are not yet published. LAKA confirms them with unit, availability and arrival guidance before the stay."],
    ["Guests and children", "Guest numbers may not exceed each home's stated capacity. Extra guest, child and additional bed terms are confirmed when booking."],
    ["Shared quiet", "LAKA is designed for restful stays. Please keep noise considerate after 10 pm and discuss group activities with the team in advance."],
    ["Pets", "Pet stays depend on the selected home and current operating conditions. Please check with LAKA before booking."],
    ["Your privacy", "Contact information is used only to process your stay, support your experience and meet essential operating obligations."],
    ["Concept content", "Concept images, prices and selected policies do not yet constitute a commercial commitment. The address and twenty-unit structure are sourced from LAKA's project material."]
  ] as const : policies;
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.detail3}
        pill={isEn ? "Stay Policies" : "Chính Sách Lưu Trú"}
        title={isEn ? "LaKa - Policies" : "LaKa - Chính Sách"}
        subtitle={isEn ? "Clarity before the journey begins" : "Rõ ràng trước khi bắt đầu chuyến đi"}
        description={
          isEn
            ? "Simple principles that create a transparent, restful and considerate experience for guests and the LAKA team."
            : "Các nguyên tắc giúp LAKA và khách lưu trú cùng có trải nghiệm minh bạch, nhẹ nhàng và an tâm trọn vẹn."
        }
        cardImage={conceptImages.detail3}
        cardBadge="LAKA · Policy"
        cardAlt={isEn ? "Quiet corner at LAKA" : "Khoảng lặng tại LAKA"}
        brandTagTop="Principles &"
        brandTagBottom="Care."
        dateStamp={isEn ? "Reservation · Check-in · Quiet Hours" : "Đặt Căn · Nhận Nhà · Giờ Yên Tĩnh"}
        subTag={isEn ? "Considerate & Restful Stays" : "Trải Nghiệm Tinh Tế & An Tâm"}
        actionText={isEn ? "View policies" : "Xem chính sách"}
        actionHref="#chinh-sach"
        locale={locale}
      />
      <TemplatePolicySection mood={config.mood} policies={localizedPolicies} intro={locale === "en" ? "Small details that help everyone enjoy a calmer stay." : undefined} />
    </>
  );
}

function TermsPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  const items = locale === "en" ? [
    ["Scope", "These terms describe the structure proposed for using the LAKA website and requesting a stay. Final legal wording must be reviewed before launch."],
    ["Stay requests", "A website request is not a confirmed reservation until LAKA contacts the guest and confirms the applicable home, dates and terms."],
    ["Prices and deposits", "Published prices, inclusions, deposits and payment schedules must be shown clearly before a guest confirms."],
    ["Changes and responsibility", "Change, cancellation, no-show and exceptional-event terms will be tied to the confirmed reservation conditions."],
    ["Concept status", "This page currently demonstrates content structure. It is not final legal advice or a commercial commitment."]
  ] as const : [
    ["Phạm vi áp dụng", "Điều khoản mô tả cấu trúc đề xuất khi sử dụng website LAKA và gửi yêu cầu lưu trú. Nội dung pháp lý cuối cùng cần được rà soát trước khi ra mắt."],
    ["Yêu cầu lưu trú", "Yêu cầu trên website chưa phải đặt chỗ đã xác nhận cho đến khi LAKA liên hệ và thống nhất căn, ngày cùng điều kiện áp dụng."],
    ["Giá và đặt cọc", "Giá công bố, quyền lợi đi kèm, khoản cọc và tiến độ thanh toán phải được trình bày rõ trước khi khách xác nhận."],
    ["Thay đổi và trách nhiệm", "Điều kiện đổi, hủy, không đến và các tình huống bất khả kháng sẽ gắn với điều kiện của yêu cầu đã được xác nhận."],
    ["Trạng thái concept", "Trang hiện minh họa cấu trúc nội dung, chưa phải tư vấn pháp lý hay cam kết thương mại cuối cùng."]
  ] as const;
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.forest}
        pill={isEn ? "Terms of Service" : "Điều Khoản Sử Dụng"}
        title={isEn ? "LaKa - Terms" : "LaKa - Điều Khoản"}
        subtitle={isEn ? "A clear agreement in plain language" : "Thỏa thuận rõ ràng, ngôn ngữ dễ hiểu"}
        description={
          isEn
            ? "A concise, transparent legal structure ready for final review before LAKA welcomes guests."
            : "Khung thông tin pháp lý gọn, rõ và sẵn sàng để rà soát chính thức trước ngày LAKA mở cửa."
        }
        cardImage={conceptImages.forest}
        cardBadge="LAKA · Terms"
        cardAlt={isEn ? "Nature at LAKA" : "Thiên nhiên tại LAKA"}
        brandTagTop="Agreement &"
        brandTagBottom="Trust."
        dateStamp={isEn ? "Transparent · Respect · Guarantee" : "Minh Bạch · Tôn Trọng · Bảo Đảm"}
        subTag={isEn ? "Clear Foundation For Your Stay" : "Nền Tảng Rõ Ràng Cho Kỳ Nghỉ"}
        actionText={isEn ? "View terms" : "Xem điều khoản"}
        actionHref="#chinh-sach"
        locale={locale}
      />
      <TemplatePolicySection mood={config.mood} policies={items} intro={locale === "en" ? "Concept structure — final legal review required before launch." : "Cấu trúc minh họa — cần được pháp lý duyệt trước khi phát hành."} />
    </>
  );
}

function PrivacyPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  const items = locale === "en" ? [
    ["Information collected", "The proposed flow collects only the contact and stay details needed to respond to a request."],
    ["Purpose", "Information is used to advise guests, process stay requests and provide essential pre-arrival support."],
    ["Retention and security", "Final retention periods, access controls and service providers must be documented before launch."],
    ["Your choices", "Guests will be able to request access, correction or deletion through LAKA's published contact channel."],
    ["Concept status", "This privacy page is a structural demonstration and requires formal data-protection review before publication."]
  ] as const : [
    ["Thông tin được thu thập", "Luồng đề xuất chỉ thu thập thông tin liên hệ và nhu cầu lưu trú cần thiết để phản hồi yêu cầu."],
    ["Mục đích sử dụng", "Thông tin được dùng để tư vấn, xử lý yêu cầu lưu trú và hỗ trợ những nội dung thiết yếu trước chuyến đi."],
    ["Lưu trữ và bảo vệ", "Thời hạn lưu trữ, quyền truy cập và các nhà cung cấp liên quan phải được công bố trước khi website vận hành thật."],
    ["Lựa chọn của khách", "Khách có thể yêu cầu xem, chỉnh sửa hoặc xóa dữ liệu qua kênh liên hệ chính thức của LAKA."],
    ["Trạng thái concept", "Trang bảo mật hiện minh họa cấu trúc và cần được rà soát chính thức về bảo vệ dữ liệu trước khi phát hành."]
  ] as const;
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.detail2}
        pill={isEn ? "Privacy Policy" : "Quyền Riêng Tư"}
        title={isEn ? "LaKa - Privacy" : "LaKa - Bảo Mật"}
        subtitle={isEn ? "Collect less, explain clearly, protect carefully" : "Thu thập vừa đủ, giải thích rõ ràng, bảo vệ cẩn trọng"}
        description={
          isEn
            ? "A transparent structure for how LAKA receives and securely handles guest information."
            : "Cấu trúc minh bạch về cách LAKA dự kiến tiếp nhận và xử lý thông tin của khách hàng một cách an toàn."
        }
        cardImage={conceptImages.detail2}
        cardBadge="LAKA · Privacy"
        cardAlt={isEn ? "Privacy at LAKA" : "Bảo mật tại LAKA"}
        brandTagTop="Security &"
        brandTagBottom="Privacy."
        dateStamp={isEn ? "Data Protection & Privacy" : "Bảo Vệ Dữ Liệu & Thông Tin Cá Nhân"}
        subTag={isEn ? "Your Trust Is Our Priority" : "Sự Tin Tưởng Của Bạn Là Ưu Tiên Hàng Đầu"}
        actionText={isEn ? "View privacy details" : "Xem bảo mật"}
        actionHref="#chinh-sach"
        locale={locale}
      />
      <TemplatePolicySection mood={config.mood} policies={items} intro={locale === "en" ? "Concept structure — formal privacy review required before launch." : "Cấu trúc minh họa — cần được duyệt chính thức trước khi phát hành."} />
    </>
  );
}

function ContactPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.cloud}
        pill={isEn ? "Talk to LAKA" : "Trò Chuyện Cùng LAKA"}
        title={isEn ? "LaKa - Contact" : "LaKa - Liên Hệ"}
        subtitle={isEn ? "We are always ready to listen" : "Chúng mình luôn sẵn sàng lắng nghe"}
        description={
          isEn
            ? "Get in touch to learn more about the place, follow its journey or share what you hope to find at LAKA."
            : "Kết nối để hiểu thêm về nơi này, theo dõi hành trình hoàn thiện hoặc chia sẻ điều bạn mong được tìm thấy tại LAKA."
        }
        cardImage={conceptImages.cloud}
        cardBadge="LAKA · Contact"
        cardAlt={isEn ? "Contact LAKA" : "Liên hệ LAKA"}
        brandTagTop="Connect &"
        brandTagBottom="Inquiry."
        dateStamp={isEn ? `Hotline: ${publicContact.phoneDisplay} · Zalo · Messenger` : `Hotline: ${publicContact.phoneDisplay} · Zalo · Messenger`}
        subTag={isEn ? "Prompt & Thoughtful Response" : "Phản Hồi Nhanh Chóng & Tận Tâm"}
        actionText={isEn ? "Send a message" : "Gửi lời nhắn"}
        actionHref="#inquiry-form"
        locale={locale}
      />
      <TemplateContactChannels mood={config.mood} locale={locale} />
      <ContactInquiryForm locale={locale} />
    </>
  );
}

function TemplateContent({ route, config, locale }: { route: TemplateRoute; config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  switch (route.kind) {
    case "stays": return <StaysPage config={config} locale={locale} />;
    case "stay": return <StayPage config={config} slug={route.slug} locale={locale} />;
    case "experience": return <ExperiencePage config={config} locale={locale} />;
    case "services": return <ServicesPage config={config} locale={locale} />;
    case "dining": return <DiningPage config={config} locale={locale} />;
    case "about": return <AboutPage config={config} locale={locale} />;
    case "info": return <InfoPage config={config} locale={locale} />;
    case "faq": return <FaqPage config={config} locale={locale} />;
    case "policy": return <PolicyPage config={config} locale={locale} />;
    case "directions": return <DirectionsPage config={config} locale={locale} />;
    case "terms": return <TermsPage config={config} locale={locale} />;
    case "privacy": return <PrivacyPage config={config} locale={locale} />;
    case "contact": return <ContactPage config={config} locale={locale} />;
    default: return null;
  }
}

export function CompleteTemplateSite({ route, config, home, locale = "vi" }: { route: TemplateRoute; config: CompleteTemplateConfig; home: React.ReactNode; locale?: ShowcaseLocale }) {
  if (route.kind === "home") return home;
  const routeKey = route.kind === "stay" ? `${config.slug}-${route.kind}-${route.slug}` : `${config.slug}-${route.kind}`;
  const style = {
    "--template-bg": config.background,
    "--template-ink": config.ink,
    "--template-accent": config.accent,
    "--template-surface": config.surface
  } as React.CSSProperties;
  return <div style={style} className={`showcase-root min-h-screen bg-[var(--template-bg)] text-[var(--template-ink)] ${config.mood === "organic" ? "template-organic" : config.mood === "cinematic" ? "template-cinematic" : "template-editorial"}`}>
    <TemplateDocumentLocale locale={locale} />
    <SkipLink label={locale === "en" ? "Skip navigation" : "Bỏ qua điều hướng"} />
    <TemplateExperienceLayer mood={config.mood} />
    <TemplateHeader config={config} locale={locale} overlay />
    <main id="noi-dung-chinh" tabIndex={-1}>
      <div key={routeKey} className={`template-page-enter template-page-enter-${config.mood}`}>
        <TemplateContent route={route} config={config} locale={locale} />
      </div>
    </main>
    <TemplateFooter config={config} locale={locale} />
  </div>;
}
