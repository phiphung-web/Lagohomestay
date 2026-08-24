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
import { StayProductExplorer } from "@/features/showcase/components/stay-product-explorer";
import { ContactInquiryForm } from "@/features/showcase/components/contact-inquiry-form";
import { ScrollAwareHeader } from "@/features/showcase/components/scroll-aware-header";
import { TemplateExperienceStory } from "@/features/showcase/components/template-experience-story";
import { TemplateFaqIndex, TemplateFaqSection, TemplatePolicySection } from "@/features/showcase/components/template-info-sections";
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
  return <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4" aria-label="Các kênh liên hệ">
    <a href="https://facebook.com/lagohomestay" target="_blank" rel="noreferrer" aria-label="Facebook LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-current/20 transition hover:scale-105 hover:border-[#80613f] hover:bg-[#80613f] hover:text-white">
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    </a>
    <a href="https://m.me/lagohomestay" target="_blank" rel="noreferrer" aria-label="Messenger LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-current/20 transition hover:scale-105 hover:border-[#80613f] hover:bg-[#80613f] hover:text-white">
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.09.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.96 3.127 3.26 5.89-3.26-6.558 6.96z"/></svg>
    </a>
    <a href="https://instagram.com/lagohomestay" target="_blank" rel="noreferrer" aria-label="Instagram LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-current/20 transition hover:scale-105 hover:border-[#80613f] hover:bg-[#80613f] hover:text-white">
      <Instagram className="h-4 w-4" />
    </a>
    <a href={publicContact.zaloHref} target="_blank" rel="noreferrer" aria-label="Zalo LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-current/20 transition hover:scale-105 hover:border-[#80613f] hover:bg-[#80613f] hover:text-white">
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.52 3.66 1.43 5.18L2 22l4.98-1.39C8.44 21.5 10.18 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1.8 13.6h-2.8v-1.6l2.3-3.4H7.4V9h4.4v1.6l-2.3 3.4h2.7v1.6zm2.8 0h-1.6V9h1.6v6.6zm3.4 0c-1.3 0-2.3-1-2.3-2.3V9h1.6v4.3c0 .4.3.7.7.7s.7-.3.7-.7V9h1.6v4.3c0 1.3-1 2.3-2.3 2.3z"/></svg>
    </a>
    <a href="https://tiktok.com/@lagohomestay" target="_blank" rel="noreferrer" aria-label="TikTok LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-current/20 transition hover:scale-105 hover:border-[#80613f] hover:bg-[#80613f] hover:text-white">
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .57.04.84.12V9.34a6.34 6.34 0 00-1-.08 6.33 6.33 0 00-6.33 6.33 6.33 6.33 0 0010.82 4.48V11.8a8.31 8.31 0 005.23 1.83V10.1a4.84 4.84 0 01-2.45-3.41z"/></svg>
    </a>
    <a href={publicContact.phoneHref} aria-label="Hotline LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-current/20 transition hover:scale-105 hover:border-[#80613f] hover:bg-[#80613f] hover:text-white">
      <Phone className="h-4 w-4" />
    </a>
  </div>;
}

export function TemplateFooter({ config, locale = "vi", storyMode = false, homeMode = false }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale; storyMode?: boolean; homeMode?: boolean }) {
  if (homeMode) return <footer className="border-t border-[#16311c]/12 bg-[#eae1d2] pb-28 pt-14 text-[#16311c] sm:pb-32">
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] gap-10 text-center md:grid-cols-2 md:text-left xl:grid-cols-[1.2fr_1.3fr_.9fr]">
      <div className="flex flex-col items-center md:items-start">
        <Link href={config.basePath} aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"} className="inline-flex">
          <BrandLogo variant="established" decorative className="w-[190px]" />
        </Link>
      </div>
      <div>
        <p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Information" : "Thông tin"}</p>
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5 text-sm font-medium">
          <Link href={scoped(config.basePath, "di-chuyen")}>{locale === "en" ? "Getting here" : "Hướng dẫn di chuyển"}</Link>
          <Link href={scoped(config.basePath, "dieu-khoan")}>{locale === "en" ? "Terms" : "Điều khoản"}</Link>
          <Link href={scoped(config.basePath, "faq")}>{locale === "en" ? "FAQ" : "Câu hỏi thường gặp"}</Link>
          <Link href={scoped(config.basePath, "bao-mat")}>{locale === "en" ? "Privacy" : "Bảo mật"}</Link>
          <Link href={scoped(config.basePath, "chinh-sach-luu-tru")}>{locale === "en" ? "Stay policies" : "Chính sách lưu trú"}</Link>
          <Link href={scoped(config.basePath, "lien-he")} className="font-bold">{locale === "en" ? "Contact" : "Liên hệ"}</Link>
        </div>
      </div>
      <div>
        <p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Connect" : "Kết nối"}</p>
        <div className="mt-5 flex flex-col items-center gap-3.5 text-sm md:items-start">
          <a href={publicContact.phoneHref} className="flex items-center gap-2.5 font-bold hover:underline"><Phone className="h-4 w-4 shrink-0 text-[#80613f]" />{publicContact.phoneDisplay}</a>
          <a href={publicContact.zaloHref} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:underline"><MessageCircle className="h-4 w-4 shrink-0 text-[#80613f]" />{locale === "en" ? "Chat on Zalo" : "Trò chuyện qua Zalo"}</a>
          <a href={publicContact.emailHref} className="flex items-center gap-2.5 hover:underline"><Mail className="h-4 w-4 shrink-0 text-[#80613f]" />{publicContact.email}</a>
          <span className="flex items-start justify-center gap-2.5 leading-6 opacity-80 md:justify-start"><MapPin className="mt-1 h-4 w-4 shrink-0 text-[#80613f]" />{publicContact.address}</span>
        </div>
      </div>
    </div>
    <div className="mx-auto mt-10 flex flex-col items-center gap-5 border-t border-[#16311c]/12 pt-8 text-center">
      <SocialContactIcons />
      <div className="text-xs leading-6 opacity-75">
        <p>@2026 Lakahomestay</p>
        <p className="mt-0.5">Dốc Dây Diều, Xóm 1, Thanh Hà, Trung Giã, Hà Nội</p>
        <p className="mt-0.5">{publicContact.phoneDisplay}</p>
      </div>
    </div>
  </footer>;
  if (storyMode) return <footer className="border-t border-[#16311c]/12 bg-[#eae1d2] pb-28 pt-14 text-[#16311c] sm:pb-32">
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] gap-12 text-center md:grid-cols-[1.25fr_.75fr] md:text-left">
      <div className="flex flex-col items-center md:items-start">
        <Link href={config.basePath} aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"} className="inline-flex">
          <BrandLogo variant="established" decorative className="w-[190px]" />
        </Link>
      </div>
      <div className="md:text-right">
        <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{locale === "en" ? "Keep exploring" : "Tiếp tục khám phá"}</p>
        <div className="mt-5 flex flex-col gap-3 text-sm md:items-end">
          <Link href={scoped(config.basePath, "ve-laka")} className="font-bold">{locale === "en" ? "The LAKA story" : "Câu chuyện LAKA"}</Link>
          <Link href={scoped(config.basePath, "trai-nghiem")}>{locale === "en" ? "The LAKA rhythm" : "Nhịp sống LAKA"}</Link>
          <Link href={scoped(config.basePath, "lien-he")} className="font-bold">{locale === "en" ? "Contact" : "Liên hệ"}</Link>
        </div>
      </div>
    </div>
    <div className="mx-auto mt-10 flex flex-col items-center gap-5 border-t border-[#16311c]/12 pt-8 text-center">
      <SocialContactIcons />
      <div className="text-xs leading-6 opacity-75">
        <p>@2026 Lakahomestay</p>
        <p className="mt-0.5">Dốc Dây Diều, Xóm 1, Thanh Hà, Trung Giã, Hà Nội</p>
        <p className="mt-0.5">{publicContact.phoneDisplay}</p>
      </div>
    </div>
  </footer>;
  return <footer className={`border-t border-current/12 pb-28 pt-14 sm:pb-32 ${config.mood === "organic" ? "bg-[#e7ded1]" : config.mood === "cinematic" ? "bg-[#0b190f]" : "bg-[#eae1d2]"}`}>
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] gap-10 text-center md:grid-cols-2 md:text-left xl:grid-cols-[1.2fr_1.3fr_.9fr]">
      <div className="flex flex-col items-center md:items-start">
        <Link href={config.basePath || "/"} aria-label={locale === "en" ? "LAKA Homestay - Home" : "LAKA Homestay - Trang chủ"} className="inline-flex">
          <BrandLogo variant={config.mood === "editorial" ? "established" : "homestay"} decorative className={`${config.mood === "editorial" ? "w-[190px]" : "w-[210px]"} ${config.mood === "cinematic" ? "text-[#eae1d2]" : "text-[#16311c]"}`} />
        </Link>
      </div>
      <div>
        <p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Information" : "Thông tin"}</p>
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5 text-sm font-medium">
          <Link href={scoped(config.basePath, "di-chuyen")}>{locale === "en" ? "Getting here" : "Hướng dẫn di chuyển"}</Link>
          <Link href={scoped(config.basePath, "dieu-khoan")}>{locale === "en" ? "Terms" : "Điều khoản"}</Link>
          <Link href={scoped(config.basePath, "faq")}>FAQ</Link>
          <Link href={scoped(config.basePath, "bao-mat")}>{locale === "en" ? "Privacy" : "Bảo mật"}</Link>
          <Link href={scoped(config.basePath, "chinh-sach-luu-tru")}>{locale === "en" ? "Stay policies" : "Chính sách lưu trú"}</Link>
          <Link href={scoped(config.basePath, "lien-he")} className="font-bold">{locale === "en" ? "Contact" : "Liên hệ"}</Link>
        </div>
      </div>
      <div>
        <p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Connect" : "Kết nối"}</p>
        <div className="mt-5 flex flex-col items-center gap-3.5 text-sm md:items-start">
          <a href={publicContact.phoneHref} className="flex items-center gap-2.5 font-bold hover:underline"><Phone className="h-4 w-4 shrink-0" />{publicContact.phoneDisplay}</a>
          <a href={publicContact.zaloHref} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:underline"><MessageCircle className="h-4 w-4 shrink-0" />{locale === "en" ? "Chat on Zalo" : "Trò chuyện qua Zalo"}</a>
          <a href={publicContact.emailHref} className="flex items-center gap-2.5 hover:underline"><Mail className="h-4 w-4 shrink-0" />{publicContact.email}</a>
          <span className="flex items-start justify-center gap-2.5 leading-6 opacity-80 md:justify-start"><MapPin className="mt-1 h-4 w-4 shrink-0" />{publicContact.address}</span>
        </div>
      </div>
    </div>
    <div className="mx-auto mt-10 flex flex-col items-center gap-5 border-t border-current/10 pt-8 text-center">
      <SocialContactIcons />
      <div className="text-xs leading-6 opacity-75">
        <p>@2026 Lakahomestay</p>
        <p className="mt-0.5">Dốc Dây Diều, Xóm 1, Thanh Hà, Trung Giã, Hà Nội</p>
        <p className="mt-0.5">{publicContact.phoneDisplay}</p>
      </div>
    </div>
  </footer>;
}

function PageIntro({ eyebrow, title, text, image, config, locale = "vi" }: { eyebrow: string; title: string; text: string; image?: string; config: CompleteTemplateConfig; locale?: ShowcaseLocale }) {
  const cinematic = config.mood === "cinematic";
  const organic = config.mood === "organic";
  const heroImage = image ?? conceptImages.hero;
  if (cinematic) return <section className="grain relative min-h-[100svh] overflow-hidden border-b border-white/10">
    <Image src={heroImage} alt={`${title} - ảnh minh họa`} fill priority sizes="100vw" className="showcase-visual-media object-cover opacity-55 transition duration-[1400ms] hover:scale-[1.015]" /><div className="absolute inset-0 bg-gradient-to-r from-[#0b190f] via-[#0b190f]/68 to-[#0b190f]/18" />
    <div className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1420px,calc(100%-40px))] flex-col justify-center py-24">
      <p className="text-[.65rem] font-bold uppercase tracking-[.24em] text-[var(--template-accent)]">{eyebrow}</p>
      <h1 className="mt-6 max-w-5xl font-serif text-5xl font-medium leading-[.92] tracking-[-.05em] sm:text-7xl lg:text-8xl">{title}</h1>
      <p className="mt-7 max-w-2xl border-l border-[#c7a882]/45 pl-5 text-sm leading-7 text-white/58 sm:text-base">{text}</p>
    </div>
  </section>;

  if (organic) return <section className="relative min-h-[100svh] overflow-hidden px-3 py-5 sm:px-5 sm:py-8">
    <div className="relative mx-auto grid min-h-[calc(100svh-40px)] w-[min(1420px,100%)] overflow-hidden rounded-[38px] border border-[#16311c]/8 bg-[var(--template-surface)] shadow-[0_28px_80px_rgba(33,72,61,.08)] sm:min-h-[calc(100svh-64px)] lg:grid-cols-[.78fr_1.22fr]">
      <div className="relative z-10 flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-16"><span className="w-fit rounded-full bg-[#f7cf58] px-4 py-2 text-[.62rem] font-extrabold uppercase tracking-[.14em]">{eyebrow}</span><h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[.98] tracking-[-.045em] sm:text-7xl">{title}</h1><p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-[#16311c]/78 sm:text-base">{text}</p></div>
      <div className="relative m-3 min-h-[48svh] overflow-hidden rounded-[32px] lg:min-h-0"><Image src={heroImage} alt={`${title} - ảnh minh họa`} fill priority sizes="(max-width:1024px) 100vw, 58vw" className="showcase-visual-media object-cover transition duration-700 hover:scale-[1.025]" /><span className="absolute bottom-5 right-5 grid h-20 w-20 place-items-center rounded-full bg-[#f18b68] text-center text-[.58rem] font-extrabold uppercase tracking-wider text-[#16311c]">Ảnh<br />minh họa</span></div>
    </div>
  </section>;

  return <section className="relative min-h-[100svh] overflow-hidden border-b border-white/12 bg-[#10251d] text-white">
    <Image src={heroImage} alt={`${title} — ${locale === "en" ? "concept image" : "ảnh minh họa"}`} fill priority sizes="100vw" className="showcase-visual-media object-cover transition duration-[1400ms] hover:scale-[1.015]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,14,.12),rgba(5,18,14,.82))]" />
    <div className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1480px,calc(100%-40px))] flex-col justify-end pb-12 pt-32 sm:pb-16">
      <p className="laka-eyebrow text-[#dfc6a5]">{eyebrow}</p>
      <h1 className="laka-display-page mt-5 max-w-6xl">{title}</h1>
      <div className="mt-7 grid gap-6 border-t border-white/22 pt-6 sm:grid-cols-[1fr_auto] sm:items-end"><p className="laka-body max-w-2xl text-white/68">{text}</p><span className="w-fit rounded-full border border-white/25 bg-black/12 px-4 py-2 text-[.56rem] font-bold uppercase tracking-[.14em] text-white/70 backdrop-blur">{locale === "en" ? "Concept image" : "Hình ảnh minh họa"}</span></div>
    </div>
  </section>;
}

function StaysPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "The LAKA product map" : "Bản đồ lưu trú LAKA"} title={locale === "en" ? "From lake to pine-covered hill." : "Từ ven hồ đến đồi thông."} text={locale === "en" ? "Explore eight accommodation types and twenty units, from intimate lake suites to group cabins and a secluded hilltop villa." : "Khám phá tám dòng lưu trú và hai mươi căn, từ suite bên hồ cho hai người đến cabin nhóm và villa biệt lập trên đỉnh đồi."} image={conceptImages.detail1} />
    <Suspense fallback={<div className="min-h-[60svh] bg-[#eae1d2]" />}><StayProductExplorer basePath={config.basePath} locale={locale} /></Suspense></>;
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
        ].map(([title, items], index) => <section key={title as string} className={`py-7 sm:px-6 ${index < 2 ? "border-b border-current/12 sm:border-b-0 sm:border-r" : ""} sm:first:pl-0`}>
          <h3 className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[var(--template-accent)]">{title as string}</h3>
          <ul className="mt-5 space-y-3">{(items as string[]).map((item) => <li key={item} className="flex gap-2 text-sm leading-6 opacity-75"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--template-accent)]" />{item}</li>)}</ul>
        </section>)}
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
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "A day at LAKA" : "Một ngày tại LAKA"} title={locale === "en" ? "A day that needs very little planning." : "Một ngày không cần lên kế hoạch quá nhiều."} text={locale === "en" ? "LAKA prepares the space. Let nature and curiosity guide everything else." : "LAKA chuẩn bị không gian. Phần còn lại, bạn có thể để thiên nhiên và cảm hứng dẫn đường."} image={conceptImages.experience} />
    <TemplateExperienceStory mood={config.mood} locale={locale} />
    <TemplateExperienceCatalog locale={locale} /></>;
}

function ServicesPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Services and shared spaces" : "Dịch vụ và tiện ích"} title={locale === "en" ? "Everything useful. Nothing intrusive." : "Đủ đầy khi cần. Riêng tư khi muốn."} text={locale === "en" ? "From family essentials to private transfers and shared nature spaces, choose only what makes your stay lighter." : "Từ tiện ích gia đình, xe đưa đón đến không gian thiên nhiên dùng chung — bạn chỉ cần chọn những gì khiến kỳ nghỉ nhẹ nhàng hơn."} image={conceptImages.detail2} />
    <TemplateServicesCatalog locale={locale} /></>;
}

function DiningPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Dining at LAKA" : "Ẩm thực tại LAKA"} title={locale === "en" ? "A table that belongs to the stay." : "Một bàn ăn thuộc về kỳ nghỉ."} text={locale === "en" ? "From grilled dishes and shared hot pots by the lake to coffee, fruit tea and a light afternoon snack — the menu is being shaped around time spent together." : "Từ món nướng, lẩu và bữa cơm quây quần bên hồ đến cà phê, trà trái cây và một món ăn nhẹ giữa chiều — danh mục món được xây dựng quanh thời gian ở bên nhau."} image={conceptImages.dining} />
    <TemplateDiningAndOccasions locale={locale} /></>;
}

function AboutPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "The LAKA philosophy" : "Triết lý của LAKA"} title={locale === "en" ? "Far enough to rest. Close enough to return." : "Một nơi đủ xa để nghỉ, đủ gần để trở về."} text={locale === "en" ? "LAKA began with a wish to create homes where people can give their full attention to nature and to one another." : "LAKA bắt đầu từ mong muốn tạo ra những căn nhà nơi con người có thể dành trọn sự chú ý cho thiên nhiên và cho nhau."} image={conceptImages.forest} />
    <TemplateAboutStory mood={config.mood} locale={locale} /></>;
}

function InfoPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Understanding LAKA" : "Hiểu thêm về LAKA"} title={locale === "en" ? "Clear information, with space left for discovery." : "Thông tin rõ ràng, vẫn đủ khoảng trống để khám phá."} text={locale === "en" ? "A concise guide to the landscape, homes, experiences and the concept currently taking shape." : "Những câu trả lời ngắn gọn về cảnh quan, các căn nhà, trải nghiệm và concept đang dần thành hình."} image={conceptImages.hill} />
    <TemplateJourneySection locale={locale} contactHref={scoped(config.basePath, "lien-he")} />
    <TemplateFaqSection mood={config.mood} policyHref={scoped(config.basePath, "chinh-sach-luu-tru")} locale={locale} /></>;
}

function FaqPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Frequently asked questions" : "Câu hỏi thường gặp"} title={locale === "en" ? "The useful details, without the noise." : "Những điều cần biết, không vòng vo."} text={locale === "en" ? "Short, practical answers about stays, families, dining, services and the current LAKA concept." : "Câu trả lời ngắn gọn về lưu trú, gia đình, ẩm thực, dịch vụ và concept LAKA đang hoàn thiện."} image={conceptImages.detail1} />
    <TemplateFaqIndex locale={locale} />
    <TemplateFaqSection mood={config.mood} policyHref={scoped(config.basePath, "chinh-sach-luu-tru")} locale={locale} /></>;
}

function DirectionsPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Getting to LAKA" : "Đường đến LAKA"} title={locale === "en" ? "The journey should feel easy before it begins." : "Hành trình nên nhẹ nhàng từ trước khi khởi hành."} text={locale === "en" ? "A dedicated place for routes, travel times, transfers and arrival notes. Final map details will be updated before opening." : "Một nơi riêng cho cung đường, thời gian di chuyển, phương án đưa đón và lưu ý khi đến. Bản đồ chính thức sẽ được cập nhật trước ngày mở cửa."} image={conceptImages.cloud} />
    <TemplateJourneySection locale={locale} contactHref={scoped(config.basePath, "lien-he")} /></>;
}

function PolicyPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
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
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Stay policies" : "Chính sách lưu trú"} title={locale === "en" ? "Clarity before the journey begins." : "Rõ ràng trước khi bắt đầu chuyến đi."} text={locale === "en" ? "Simple principles that create a transparent and considerate experience for guests and the LAKA team." : "Các nguyên tắc giúp LAKA và khách lưu trú cùng có trải nghiệm minh bạch, nhẹ nhàng."} image={conceptImages.detail3} />
    <TemplatePolicySection mood={config.mood} policies={localizedPolicies} intro={locale === "en" ? "Small details that help everyone enjoy a calmer stay." : undefined} /></>;
}

function TermsPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
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
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Terms and conditions" : "Điều khoản và điều kiện"} title={locale === "en" ? "A clear agreement begins with plain language." : "Một thỏa thuận rõ ràng bắt đầu bằng ngôn ngữ dễ hiểu."} text={locale === "en" ? "A concise legal-information structure ready for final review before LAKA opens." : "Khung thông tin pháp lý gọn, rõ và sẵn sàng để rà soát chính thức trước ngày LAKA mở cửa."} image={conceptImages.forest} />
    <TemplatePolicySection mood={config.mood} policies={items} intro={locale === "en" ? "Concept structure — final legal review required before launch." : "Cấu trúc minh họa — cần được pháp lý duyệt trước khi phát hành."} /></>;
}

function PrivacyPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
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
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Privacy" : "Quyền riêng tư"} title={locale === "en" ? "Collect less. Explain clearly. Protect carefully." : "Thu thập vừa đủ. Giải thích rõ ràng. Bảo vệ cẩn trọng."} text={locale === "en" ? "A transparent structure for how LAKA will handle guest information." : "Cấu trúc minh bạch về cách LAKA dự kiến tiếp nhận và xử lý thông tin của khách."} image={conceptImages.detail2} />
    <TemplatePolicySection mood={config.mood} policies={items} intro={locale === "en" ? "Concept structure — formal privacy review required before launch." : "Cấu trúc minh họa — cần được duyệt chính thức trước khi phát hành."} /></>;
}

function ContactPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Talk to LAKA" : "Trò chuyện cùng LAKA"} title={locale === "en" ? "We are always ready to listen." : "Chúng mình luôn sẵn sàng lắng nghe."} text={locale === "en" ? "Get in touch to learn more about the place, follow its journey or share what you hope to find at LAKA." : "Kết nối để hiểu thêm về nơi này, theo dõi hành trình hoàn thiện hoặc chia sẻ điều bạn mong được tìm thấy tại LAKA."} image={conceptImages.cloud} />
    <TemplateContactChannels mood={config.mood} locale={locale} />
    <ContactInquiryForm locale={locale} /></>;
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
