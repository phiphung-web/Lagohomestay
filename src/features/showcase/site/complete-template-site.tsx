import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  House,
  Instagram,
  Phone
} from "lucide-react";
import { BookingExperience } from "@/features/booking/components/booking-experience";
import { LookupForm } from "@/features/booking/components/lookup-form";
import { GalleryLightbox } from "@/features/showcase/components/gallery-lightbox";
import { TemplateExperienceLayer } from "@/features/showcase/components/template-experience-layer";
import { TemplateMobileMenu } from "@/features/showcase/components/template-mobile-menu";
import { TemplateNavLink } from "@/features/showcase/components/template-nav-link";
import { TemplateStayHero, TemplateStaysCollection } from "@/features/showcase/components/template-stay-showcase";
import { TemplateExperienceStory } from "@/features/showcase/components/template-experience-story";
import { TemplateFaqSection, TemplatePolicySection } from "@/features/showcase/components/template-info-sections";
import { TemplateAboutStory, TemplateContactChannels } from "@/features/showcase/components/template-brand-sections";
import { TemplateLanguageSwitcher } from "@/features/showcase/components/template-language-switcher";
import { TemplateDocumentLocale } from "@/features/showcase/components/template-document-locale";
import { TemplateAtmosphereController } from "@/features/showcase/components/template-atmosphere-controller";
import {
  DemoContentNotice,
  TemplateDiningAndOccasions,
  TemplateExperienceCatalog,
  TemplateJourneySection
} from "@/features/showcase/components/template-destination-sections";
import type { ShowcaseTemplateSlug } from "@/features/showcase/data/templates";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";
import { conceptImages, stays } from "@/features/stays/data/demo-data";
import { formatCurrency } from "@/shared/lib/format";
import { SkipLink } from "@/shared/components/ui/skip-link";
import { BrandLogo } from "@/shared/components/brand/brand-logo";
import type { TemplateRoute } from "@/features/showcase/site/template-route";

export type TemplateMood = "editorial" | "cinematic" | "organic";

export type CompleteTemplateConfig = {
  slug: ShowcaseTemplateSlug;
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
  ["Các căn", "luu-tru"],
  ["Trải nghiệm", "trai-nghiem"],
  ["Thư viện", "thu-vien"],
  ["Về LAKA", "ve-lago"],
  ["Cần biết", "thong-tin"]
] as const;

const englishNavItems = [
  ["Homes", "luu-tru"],
  ["Experiences", "trai-nghiem"],
  ["Gallery", "thu-vien"],
  ["About LAKA", "ve-lago"],
  ["Good to know", "thong-tin"]
] as const;

const policies = [
  ["Đặt chỗ và xác nhận", "Yêu cầu từ website được giữ trong 2 giờ. Đặt chỗ chỉ được xác nhận sau khi đội ngũ LAKA liên hệ qua điện thoại hoặc Zalo."],
  ["Thay đổi và hủy", "Điều kiện đổi ngày, hủy và hoàn cọc sẽ được thông báo rõ ràng trong bước xác nhận. Nội dung chính thức cần được duyệt trước khi mở bán."],
  ["Nhận và trả căn", "Khung giờ minh họa: nhận căn từ 14:00 và trả căn trước 11:00. Hướng dẫn nhận căn chi tiết được gửi qua Zalo trước ngày đến."],
  ["Số khách và trẻ em", "Số khách không vượt quá sức chứa công bố của từng căn. Chính sách phụ thu, trẻ em và giường bổ sung cần được xác nhận khi đặt."],
  ["Không gian và tiếng ồn", "LAKA hướng đến kỳ nghỉ yên tĩnh. Khách vui lòng giữ âm lượng vừa phải sau 22:00 và trao đổi trước nếu tổ chức hoạt động nhóm."],
  ["Vật nuôi", "Khả năng đón vật nuôi phụ thuộc từng căn và điều kiện vận hành tại thời điểm lưu trú. Vui lòng hỏi LAKA trước khi đặt."],
  ["Quyền riêng tư", "Thông tin liên hệ chỉ được dùng để xử lý yêu cầu lưu trú, chăm sóc khách và thực hiện các nghĩa vụ vận hành cần thiết."],
  ["Nội dung minh họa", "Hình ảnh, địa chỉ, giá và một số chính sách trong bản trình bày là dữ liệu minh họa, chưa phải cam kết thương mại."]
] as const;

function scoped(basePath: string, path = "") {
  return path ? `${basePath}/${path}` : basePath;
}

export function TemplateHeader({ config, locale = "vi", overlay = false }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale; overlay?: boolean }) {
  const organic = config.mood === "organic";
  const cinematic = config.mood === "cinematic";
  const darkHeader = cinematic || overlay;
  const localizedNavItems = locale === "en" ? englishNavItems : navItems;
  const mobileItems = localizedNavItems.map(([label, path]) => ({ label, href: scoped(config.basePath, path), exact: !path }));

  if (config.slug === "tinh-lang") {
    const headerTone = overlay
      ? "-mb-[92px] border-b border-[#eae1d2]/20 bg-[#16311c]/48 text-[#eae1d2]"
      : "border-b border-[#16311c]/12 bg-[#eae1d2]/92 text-[#16311c]";

    return <header className={`sticky top-0 z-50 backdrop-blur-xl ${headerTone}`}>
      <div className="mx-auto grid h-[92px] w-[min(1500px,calc(100%-24px))] grid-cols-[1fr_auto_1fr] items-center gap-3 sm:w-[min(1500px,calc(100%-48px))]">
        <div className="flex min-w-0 items-center justify-start">
          <nav aria-label={locale === "en" ? "Primary navigation" : "Điều hướng chính"} className="hidden items-center gap-5 text-[.62rem] font-bold uppercase tracking-[.12em] xl:flex 2xl:gap-7">
            {localizedNavItems.slice(0, 3).map(([label, path]) => <TemplateNavLink key={path} href={scoped(config.basePath, path)} label={label} mood={config.mood} exact={!path} />)}
          </nav>
          <div className="xl:hidden">
            <TemplateLanguageSwitcher locale={locale} compact alwaysVisible />
          </div>
        </div>

        <Link
          href={config.basePath}
          aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"}
          className="focus-ring flex items-center justify-self-center rounded-md"
        >
          <BrandLogo variant="homestay" decorative className="w-[122px] sm:w-[148px] lg:w-[164px]" />
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-2">
          <nav aria-label={locale === "en" ? "Secondary navigation" : "Điều hướng bổ sung"} className="hidden items-center gap-5 text-[.62rem] font-bold uppercase tracking-[.12em] xl:flex 2xl:gap-7">
            {localizedNavItems.slice(3).map(([label, path]) => <TemplateNavLink key={path} href={scoped(config.basePath, path)} label={label} mood={config.mood} exact={!path} />)}
          </nav>
          <div className="hidden xl:block">
            <TemplateLanguageSwitcher locale={locale} compact alwaysVisible />
          </div>
          <Link
            href={scoped(config.basePath, "dat-phong")}
            className={`hidden min-h-11 items-center gap-2 rounded-full px-4 text-xs font-bold sm:inline-flex ${overlay ? "border border-[#eae1d2]/30 bg-[#eae1d2]/10 text-[#eae1d2]" : "bg-[#16311c] text-[#eae1d2]"}`}
          >
            <CalendarDays className="h-4 w-4" />
            <span className="hidden lg:inline">{locale === "en" ? "Check dates" : "Kiểm tra lịch"}</span>
          </Link>
          <TemplateMobileMenu
            name={config.name}
            mood={config.mood}
            items={mobileItems}
            bookingHref={scoped(config.basePath, "dat-phong")}
            lookupHref={scoped(config.basePath, "tra-cuu")}
            contactHref={scoped(config.basePath, "lien-he")}
            locale={locale}
            wideHeader
          />
        </div>
      </div>
    </header>;
  }

  return <header className={`sticky top-0 z-50 backdrop-blur-xl ${overlay ? "-mb-[76px] border-b border-white/15 bg-[#0b190f]/45 text-white" : organic ? "border-transparent bg-[#eae1d2]/88 py-2" : cinematic ? "border-b border-white/10 bg-[#0b190f]/92" : "border-b border-[#16311c]/12 bg-[#eae1d2]/92"}`}>
    <div className={`mx-auto flex w-[min(1420px,calc(100%-28px))] items-center justify-between gap-4 ${organic ? "h-16 rounded-full border border-[#16311c]/10 bg-white/90 px-4 shadow-[0_14px_45px_rgba(22,49,28,.1)] sm:px-6" : "h-[76px]"}`}>
      <Link href={config.basePath} aria-label={locale === "en" ? "LAKA Homestay — concept home" : "LAKA Homestay — trang chủ mẫu"} className={`focus-ring flex items-center ${darkHeader ? "text-[#eae1d2]" : "text-[#16311c]"}`}>
        <BrandLogo variant="wordmark" decorative className={organic ? "w-[104px]" : cinematic ? "w-[118px]" : "w-[126px]"} />
      </Link>
      <nav aria-label={locale === "en" ? `${config.name} navigation` : `Điều hướng mẫu ${config.name}`} className="hidden items-center gap-6 text-[.68rem] font-bold uppercase tracking-[.12em] lg:flex">
        {localizedNavItems.map(([label, path]) => <TemplateNavLink key={path} href={scoped(config.basePath, path)} label={label} mood={config.mood} exact={!path} />)}
      </nav>
      <div className="flex items-center gap-2">
        <Link href={scoped(config.basePath, "tra-cuu")} className="hidden min-h-10 items-center px-3 text-xs font-bold opacity-80 transition hover:opacity-100 xl:inline-flex">{locale === "en" ? "Find booking" : "Tra cứu"}</Link>
        <Link href={scoped(config.basePath, "dat-phong")} className={`inline-flex min-h-11 items-center gap-2 px-4 text-xs font-bold ${overlay ? "rounded-full border border-white/25 bg-white/12 text-white" : cinematic ? "rounded-full bg-[#c7a882] text-[#0b190f]" : organic ? "rounded-full bg-[#c7a882] text-[#16311c]" : "border-b border-[#16311c] px-1"}`}>
          <CalendarDays className="h-4 w-4" /> <span className="hidden sm:inline">{locale === "en" ? "Check dates" : "Kiểm tra lịch"}</span><span className="sm:hidden">{locale === "en" ? "Book" : "Đặt căn"}</span>
        </Link>
        <TemplateMobileMenu name={config.name} mood={config.mood} items={mobileItems} bookingHref={scoped(config.basePath, "dat-phong")} lookupHref={scoped(config.basePath, "tra-cuu")} contactHref={scoped(config.basePath, "lien-he")} locale={locale} />
      </div>
    </div>
  </header>;
}

export function TemplateFooter({ config, locale = "vi" }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale }) {
  const localizedNavItems = locale === "en" ? englishNavItems : navItems;
  return <footer className={`border-t border-current/12 pb-28 pt-14 sm:pb-32 ${config.mood === "organic" ? "bg-[#e7ded1]" : config.mood === "cinematic" ? "bg-[#0b190f]" : "bg-[#eae1d2]"}`}>
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] gap-10 md:grid-cols-[1.1fr_.7fr_.7fr]">
      <div><Link href={config.basePath} aria-label={locale === "en" ? "LAKA Homestay - Concept home" : "LAKA Homestay - Trang chủ mẫu"} className="inline-flex"><BrandLogo variant={config.mood === "editorial" ? "established" : "homestay"} decorative className={`${config.mood === "editorial" ? "w-[190px]" : "w-[210px]"} ${config.mood === "cinematic" ? "text-[#eae1d2]" : "text-[#16311c]"}`} /></Link><p className="mt-5 max-w-md text-sm leading-7 opacity-80">{locale === "en" ? "Three landscape collections, four home types and six private homes made for slower days together." : "Ba hệ cảnh quan, bốn dòng nhà và sáu căn riêng cho những ngày mọi người muốn sống chậm cùng nhau."}</p><span className="mt-5 inline-flex rounded-full border border-current/15 px-3 py-1.5 text-[.6rem] font-bold uppercase tracking-wider opacity-80">{locale === "en" ? "Presentation · Concept" : "Bản trình bày · Mẫu"} {config.name}</span></div>
      <div><p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Explore" : "Khám phá"}</p><div className="mt-5 flex flex-col gap-3 text-sm font-bold">{localizedNavItems.slice(0, 4).map(([label, path]) => <Link key={path} href={scoped(config.basePath, path)}>{label}</Link>)}</div></div>
      <div><p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Connect" : "Kết nối"}</p><div className="mt-5 flex flex-col gap-3 text-sm"><a href="tel:0900000000" className="font-bold">0900 000 000</a><a href="https://zalo.me/0900000000">{locale === "en" ? "Book via Zalo" : "Zalo đặt phòng"}</a><Link href={scoped(config.basePath, "chinh-sach")}>{locale === "en" ? "Policies" : "Chính sách"}</Link><span className="flex items-center gap-2 opacity-80"><Instagram className="h-4 w-4" /> @lagohomestay</span></div></div>
    </div>
  </footer>;
}

function PageIntro({ eyebrow, title, text, image, config, locale = "vi" }: { eyebrow: string; title: string; text: string; image?: string; config: CompleteTemplateConfig; locale?: ShowcaseLocale }) {
  const cinematic = config.mood === "cinematic";
  const organic = config.mood === "organic";
  if (cinematic) return <section className={`grain relative overflow-hidden border-b border-white/10 ${image ? "min-h-[560px]" : "bg-[#0a1914]"}`}>
    {image && <><Image src={image} alt={`${title} - ảnh minh họa`} fill priority sizes="100vw" className="showcase-atmosphere-media object-cover opacity-55 transition duration-[1400ms] hover:scale-[1.015]" /><div className="absolute inset-0 bg-gradient-to-r from-[#0b190f] via-[#0b190f]/68 to-[#0b190f]/18" /></>}
    <div className={`relative z-10 mx-auto flex w-[min(1420px,calc(100%-40px))] flex-col justify-center py-24 ${image ? "min-h-[560px]" : "sm:py-32"}`}>
      <p className="text-[.65rem] font-bold uppercase tracking-[.24em] text-[var(--template-accent)]">{eyebrow}</p>
      <h1 className="mt-6 max-w-5xl font-serif text-5xl font-medium leading-[.92] tracking-[-.05em] sm:text-7xl lg:text-8xl">{title}</h1>
      <p className="mt-7 max-w-2xl border-l border-[#c7a882]/45 pl-5 text-sm leading-7 text-white/58 sm:text-base">{text}</p>
    </div>
  </section>;

  if (organic) return <section className="relative overflow-hidden px-3 py-5 sm:px-5 sm:py-8">
    <div className={`relative mx-auto grid w-[min(1420px,100%)] overflow-hidden rounded-[38px] border border-[#16311c]/8 bg-[var(--template-surface)] shadow-[0_28px_80px_rgba(33,72,61,.08)] ${image ? "min-h-[540px] lg:grid-cols-[.78fr_1.22fr]" : "min-h-[400px]"}`}>
      <div className="relative z-10 flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-16"><span className="w-fit rounded-full bg-[#f7cf58] px-4 py-2 text-[.62rem] font-extrabold uppercase tracking-[.14em]">{eyebrow}</span><h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[.98] tracking-[-.045em] sm:text-7xl">{title}</h1><p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-[#16311c]/78 sm:text-base">{text}</p></div>
      {image && <div className="relative m-3 min-h-[360px] overflow-hidden rounded-[32px] lg:min-h-0"><Image src={image} alt={`${title} - ảnh minh họa`} fill priority sizes="(max-width:1024px) 100vw, 58vw" className="showcase-atmosphere-media object-cover transition duration-700 hover:scale-[1.025]" /><span className="absolute bottom-5 right-5 grid h-20 w-20 place-items-center rounded-full bg-[#f18b68] text-center text-[.58rem] font-extrabold uppercase tracking-wider text-[#16311c]">Ảnh<br />minh họa</span></div>}
    </div>
  </section>;

  if (image) return <section className="relative min-h-[78svh] overflow-hidden border-b border-white/12 bg-[#10251d] text-white">
    <Image src={image} alt={`${title} — ${locale === "en" ? "concept image" : "ảnh minh họa"}`} fill priority sizes="100vw" className="showcase-atmosphere-media object-cover transition duration-[1400ms] hover:scale-[1.015]" />
    <span aria-hidden="true" className="showcase-natural-light absolute inset-0" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,14,.12),rgba(5,18,14,.82))]" />
    <div className="relative z-10 mx-auto flex min-h-[78svh] w-[min(1480px,calc(100%-40px))] flex-col justify-end pb-12 pt-28 sm:pb-16">
      <p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#dfc6a5]">{eyebrow}</p>
      <h1 className="mt-5 max-w-6xl font-serif text-[clamp(3.8rem,10vw,9rem)] font-medium leading-[.84] tracking-[-.07em]">{title}</h1>
      <div className="mt-7 grid gap-6 border-t border-white/22 pt-6 sm:grid-cols-[1fr_auto] sm:items-end"><p className="max-w-2xl text-sm leading-7 text-white/68 sm:text-base">{text}</p><span className="w-fit rounded-full border border-white/25 bg-black/12 px-4 py-2 text-[.56rem] font-bold uppercase tracking-[.14em] text-white/70 backdrop-blur">{locale === "en" ? "Concept image" : "Hình ảnh minh họa"}</span></div>
    </div>
  </section>;

  return <section className="flex min-h-[64svh] items-end border-b border-[#16311c]/12 bg-[#e3d8c9]">
    <div className="mx-auto w-[min(1420px,calc(100%-40px))] py-20 sm:py-28">
      <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{eyebrow}</p>
      <h1 className="mt-6 max-w-6xl font-serif text-[clamp(3.8rem,10vw,9rem)] font-medium leading-[.86] tracking-[-.07em]">{title}</h1>
      <p className="mt-8 max-w-2xl border-t border-[#16311c]/18 pt-6 text-sm leading-7 text-[#16311c]/62 sm:text-base">{text}</p>
    </div>
  </section>;
}

function StaysPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "The LAKA product map" : "Bản đồ lưu trú LAKA"} title={locale === "en" ? "Three landscapes. One place to return." : "Ba hệ cảnh quan. Một nơi để trở về."} text={locale === "en" ? "Begin with Lake, Forest or Hill, then choose from four home types and six physical homes." : "Bắt đầu từ Hệ Hồ, Hệ Rừng hoặc Hệ Đồi; sau đó chọn trong bốn dòng nhà và sáu căn thực tế."} image={conceptImages.detail1} />
    <TemplateStaysCollection mood={config.mood} basePath={config.basePath} locale={locale} /></>;
}

function StayPage({ config, slug, locale }: { config: CompleteTemplateConfig; slug: string; locale: ShowcaseLocale }) {
  const stay = localizeStay(stays.find((item) => item.slug === slug)!, locale);
  const cinematic = config.mood === "cinematic";
  const organic = config.mood === "organic";
  const galleryGrid = cinematic ? "sm:grid-cols-12" : organic ? "sm:grid-cols-12" : "sm:grid-cols-3";
  const galleryShape = (index: number) => {
    if (cinematic) return index === 0 ? "aspect-[4/3] sm:col-span-7" : index === 1 ? "aspect-[4/5] sm:col-span-5" : "aspect-[16/7] sm:col-span-12";
    if (organic) return index === 0 ? "aspect-[4/3] rounded-[70px_26px_70px_26px] sm:col-span-7" : index === 1 ? "aspect-[4/5] rounded-[28px_72px_28px_72px] sm:col-span-5" : "aspect-[16/7] rounded-[44px] sm:col-span-12";
    return index === 0 ? "aspect-[4/5]" : "aspect-[4/3] sm:mt-12";
  };
  return <><TemplateStayHero mood={config.mood} basePath={config.basePath} stay={stay} locale={locale} />
    <section className={`mx-auto grid gap-12 py-20 lg:grid-cols-[1fr_360px] lg:py-28 ${cinematic ? "w-[min(1420px,calc(100%-40px))] lg:grid-cols-[1fr_390px]" : "w-[min(1240px,calc(100%-40px))]"}`}><div><p className="text-[.65rem] font-bold uppercase tracking-[.18em] text-[var(--template-accent)]">{locale === "en" ? "Inside the home" : cinematic ? "Bên trong khung hình" : organic ? "Có gì trong nhà?" : "Không gian của căn"}</p><h2 className={`mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl ${organic ? "font-extrabold tracking-[-.04em]" : "font-serif font-medium"}`}>{stay.longDescription}</h2><div className={`mt-12 grid gap-4 ${galleryGrid}`}>{stay.gallery.map((image, index) => <div key={image} className={`group relative overflow-hidden ${galleryShape(index)}`}><Image src={image} alt={`${stay.name} - ${locale === "en" ? `space ${index + 1}` : `góc không gian ${index + 1}`}`} fill sizes="(max-width:640px) 100vw, 55vw" className={`object-cover transition duration-700 group-hover:scale-[1.025] ${cinematic ? "opacity-78 group-hover:opacity-100" : ""}`} /><span className={`absolute bottom-3 left-3 px-3 py-1.5 text-[.56rem] font-bold uppercase tracking-wider ${cinematic ? "bg-black/55 text-white backdrop-blur" : "bg-white/88 text-[#16311c]"}`}>{locale === "en" ? "Frame" : "Góc"} {String(index + 1).padStart(2, "0")} · {locale === "en" ? "concept" : "minh họa"}</span></div>)}</div><h3 className={`mt-14 text-3xl ${organic ? "font-extrabold" : "font-serif font-medium"}`}>{locale === "en" ? "Featured amenities" : organic ? "Đủ tiện nghi để ở thật vui" : cinematic ? "Những chi tiết trong căn" : "Tiện nghi nổi bật"}</h3><div className={`mt-6 grid gap-3 sm:grid-cols-2 ${organic ? "gap-2" : ""}`}>{stay.amenities.map((item, index) => <span key={item} className={`flex items-center gap-3 py-3 text-sm ${organic ? "rounded-full bg-white px-4 font-bold shadow-sm" : "border-b border-current/10"}`}><span className={`${cinematic ? "text-[.6rem] font-bold text-[var(--template-accent)]" : ""}`}>{cinematic ? String(index + 1).padStart(2, "0") : <Check className="h-4 w-4 text-[var(--template-accent)]" />}</span>{item}</span>)}</div>
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
      <aside className={`h-fit border border-current/12 bg-[var(--template-surface)] p-6 lg:sticky lg:top-28 ${cinematic ? "shadow-[0_30px_90px_rgba(0,0,0,.28)]" : organic ? "rounded-[32px] shadow-[0_24px_70px_rgba(33,72,61,.12)]" : "rounded-t-[120px] px-7 pb-7 pt-20 shadow-xl"}`}><p className="text-xs opacity-80">{locale === "en" ? "Estimated from" : "Giá dự kiến từ"}</p><p className="mt-1 text-2xl font-bold">{formatCurrency(stay.basePrice)} <span className="text-xs font-medium opacity-80">/ {locale === "en" ? "night" : "đêm"}</span></p><div className="my-6 border-y border-current/10 py-5 text-sm"><p className="flex items-center gap-2"><House className="h-4 w-4 text-[var(--template-accent)]" />{locale === "en" ? "Your own private home" : "Thuê nguyên căn, không dùng chung"}</p><p className="mt-3 flex items-center gap-2"><Clock3 className="h-4 w-4 text-[var(--template-accent)]" />{locale === "en" ? "Complimentary 2-hour hold" : "Giữ chỗ miễn phí trong 2 giờ"}</p></div><Link href={config.mood === "editorial" ? `${scoped(config.basePath, "dat-phong")}?stay=${stay.slug}` : scoped(config.basePath, "dat-phong")} className={`flex min-h-13 w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-bold ${cinematic ? "bg-[#c7a882] text-[#0b190f]" : organic ? "bg-[#16311c] text-white" : "bg-[#16311c] text-white"}`}>{locale === "en" ? "Check this home" : "Kiểm tra lịch căn này"} <ArrowRight className="h-4 w-4" /></Link><a href="tel:0900000000" className="mt-3 flex min-h-12 items-center justify-center gap-2 text-sm font-bold"><Phone className="h-4 w-4" />{locale === "en" ? "Call LAKA" : "Gọi LAKA tư vấn"}</a></aside>
    </section></>;
}

function ExperiencePage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "A day at LAKA" : "Một ngày tại LAKA"} title={locale === "en" ? "A day that needs very little planning." : "Một ngày không cần lên kế hoạch quá nhiều."} text={locale === "en" ? "LAKA prepares the space. Let nature and curiosity guide everything else." : "LAKA chuẩn bị không gian. Phần còn lại, bạn có thể để thiên nhiên và cảm hứng dẫn đường."} image={conceptImages.experience} />
    <DemoContentNotice locale={locale} />
    <TemplateExperienceStory mood={config.mood} locale={locale} />
    <TemplateExperienceCatalog locale={locale} />
    <TemplateDiningAndOccasions locale={locale} /></>;
}

function GalleryPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const images = [...stays.flatMap((stay) => [stay.image, ...stay.gallery]), conceptImages.hero, conceptImages.experience];
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "A visual journal" : "Nhật ký bằng hình"} title={locale === "en" ? "Fragments of a slower stay." : "Những lát cắt của một kỳ nghỉ chậm."} text={locale === "en" ? "These concept images establish the visual mood. Every image will be replaced or approved before LAKA opens." : "Bộ ảnh minh họa dùng để xác lập cảm xúc hình ảnh. Toàn bộ sẽ được thay hoặc duyệt trước khi LAKA mở cửa."} />
    <GalleryLightbox images={images} mood={config.mood} locale={locale} /></>;
}

function AboutPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "The LAKA philosophy" : "Triết lý của LAKA"} title={locale === "en" ? "Far enough to rest. Close enough to return." : "Một nơi đủ xa để nghỉ, đủ gần để trở về."} text={locale === "en" ? "LAKA began with a wish to create homes where people can give their full attention to nature and to one another." : "LAKA bắt đầu từ mong muốn tạo ra những căn nhà nơi con người có thể dành trọn sự chú ý cho thiên nhiên và cho nhau."} image={conceptImages.forest} />
    <TemplateAboutStory mood={config.mood} locale={locale} /></>;
}

function FaqPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Before your stay" : "Trước kỳ nghỉ"} title={locale === "en" ? "Clear information, so you can truly unwind." : "Thông tin rõ ràng để bạn nghỉ thật nhẹ lòng."} text={locale === "en" ? "Concise answers about reservations, complimentary holds and the LAKA experience." : "Các câu trả lời ngắn gọn về đặt căn, thời gian giữ chỗ và trải nghiệm tại LAKA."} />
    <DemoContentNotice locale={locale} />
    <TemplateJourneySection locale={locale} contactHref={scoped(config.basePath, "lien-he")} />
    <TemplateFaqSection mood={config.mood} policyHref={scoped(config.basePath, "chinh-sach")} locale={locale} /></>;
}

function PolicyPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  const localizedPolicies = locale === "en" ? [
    ["Reservation and confirmation", "Requests made on the website are held for two hours. A reservation is confirmed only after the LAKA team contacts you by phone or Zalo."],
    ["Changes and cancellation", "Date changes, cancellations and deposit refunds are explained clearly during confirmation. Final terms must be approved before bookings open."],
    ["Arrival and departure", "Concept hours are check-in from 2 pm and check-out by 11 am. Detailed arrival instructions are shared via Zalo before the stay."],
    ["Guests and children", "Guest numbers may not exceed each home's stated capacity. Extra guest, child and additional bed terms are confirmed when booking."],
    ["Shared quiet", "LAKA is designed for restful stays. Please keep noise considerate after 10 pm and discuss group activities with the team in advance."],
    ["Pets", "Pet stays depend on the selected home and current operating conditions. Please check with LAKA before booking."],
    ["Your privacy", "Contact information is used only to process your stay, support your experience and meet essential operating obligations."],
    ["Concept content", "Images, addresses, prices and selected policies in this presentation are illustrative and do not constitute a commercial commitment."]
  ] as const : policies;
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Stay policies" : "Chính sách lưu trú"} title={locale === "en" ? "Clarity before the journey begins." : "Rõ ràng trước khi bắt đầu chuyến đi."} text={locale === "en" ? "Simple principles that create a transparent and considerate experience for guests and the LAKA team." : "Các nguyên tắc giúp LAKA và khách lưu trú cùng có trải nghiệm minh bạch, nhẹ nhàng."} />
    <TemplatePolicySection mood={config.mood} policies={localizedPolicies} /></>;
}

function ContactPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Talk to LAKA" : "Trò chuyện cùng LAKA"} title={locale === "en" ? "We are always ready to listen." : "Chúng mình luôn sẵn sàng lắng nghe."} text={locale === "en" ? "Get in touch if you would like help choosing a home, planning dates or arranging something special." : "Kết nối trực tiếp nếu bạn cần tư vấn chọn căn, ngày ở hoặc một yêu cầu đặc biệt."} image={conceptImages.cloud} />
    <TemplateContactChannels mood={config.mood} locale={locale} /></>;
}

function BookingPrelude({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  if (config.mood === "cinematic") return <div className="relative overflow-hidden border-b border-white/10 bg-[#0b190f] px-6 py-16 text-white sm:px-10 sm:py-20"><span aria-hidden="true" className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-[#c7a882]/15" /><span aria-hidden="true" className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[#c7a882]/5 blur-2xl" /><div className="relative mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1fr_.45fr] lg:items-end"><div><p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#c7a882]">Chương tiếp theo · lịch trình của bạn</p><p className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[.92] tracking-[-.05em] sm:text-7xl">Chọn ngày cho<br /><i className="text-[#c7a882]">thước phim LAKA.</i></p></div><p className="max-w-md border-l border-[#c7a882]/35 pl-5 text-sm leading-7 text-white/52">Kiểm tra lịch thật, xem giá dự kiến và giữ căn trong 2 giờ — không cần thanh toán ngay.</p></div></div>;

  if (config.mood === "organic") return <div className="relative overflow-hidden bg-[#dce9c6] px-5 py-14 text-[#16311c] sm:px-10 sm:py-[4.5rem]"><span aria-hidden="true" className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#f18b68]" /><span aria-hidden="true" className="absolute bottom-6 right-[24%] h-20 w-20 rounded-full bg-[#f7cf58]" /><div className="relative mx-auto max-w-[1240px]"><span className="inline-flex rounded-full bg-white px-4 py-2 text-[.62rem] font-extrabold uppercase tracking-[.13em] shadow-sm">3 bước · chưa cần thanh toán</span><div className="mt-7 grid gap-7 lg:grid-cols-[1fr_.42fr] lg:items-end"><p className="max-w-4xl text-5xl font-extrabold leading-[.98] tracking-[-.045em] sm:text-7xl">Chọn ngày đẹp.<br /><i className="font-serif font-medium text-[#e66e4c]">Lên lịch chuyến vui.</i></p><p className="max-w-md text-sm font-medium leading-7 text-[#16311c]/78">Tìm căn hợp số người, xem giá rõ ràng rồi để LAKA giữ chỗ trong lúc bạn bàn tiếp cùng cả nhóm.</p></div></div></div>;

  return <div className="border-b border-[#16311c]/12 bg-[#e7ded1] px-6 py-16 text-[#16311c] sm:px-10 sm:py-20"><div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "LAKA journal · Stay dates" : "LAKA ký sự · Lịch lưu trú"}</p><p className="mt-12 max-w-xs text-sm leading-7 text-[#16311c]/72">{locale === "en" ? "Choose enough time to truly rest, then let LAKA find the home that fits." : "Chọn một khoảng thời gian đủ rộng để nghỉ ngơi, rồi để LAKA tìm căn phù hợp nhất."}</p></div><p className="font-serif text-5xl font-medium leading-[.98] tracking-[-.05em] sm:text-7xl">{locale === "en" ? <>Keep a place<br /><i>entirely your own.</i></> : <>Giữ lại một khoảng<br /><i>thật riêng cho bạn.</i></>}</p></div></div>;
}

function BookingPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <section className="min-h-screen bg-[var(--template-bg)] px-0 py-0 text-[#16311c] sm:px-4 sm:py-8"><div className={`mx-auto max-w-[1480px] overflow-hidden bg-[#fbfaf6] ${config.mood === "organic" ? "sm:rounded-[38px]" : config.mood === "cinematic" ? "border border-white/10" : "border border-[#16311c]/10"}`}><BookingPrelude config={config} locale={locale} /><Suspense fallback={<div className="container-lago py-24">{locale === "en" ? "Preparing availability…" : "Đang chuẩn bị lịch căn nhà…"}</div>}><BookingExperience lookupPath={scoped(config.basePath, "tra-cuu")} locale={locale} /></Suspense></div></section>;
}

function LookupPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  if (config.mood === "cinematic") return <section className="min-h-[75svh] bg-[#0b190f] px-0 py-0 sm:px-4 sm:py-8"><div className="mx-auto grid max-w-[1480px] overflow-hidden border border-white/10 lg:grid-cols-[1fr_520px]"><div className="relative flex min-h-[560px] flex-col justify-center overflow-hidden px-7 py-16 text-white sm:px-12 lg:px-16"><span aria-hidden="true" className="absolute -right-32 top-8 font-serif text-[15rem] leading-none text-white/[.025]">#</span><p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#c7a882]">After credit · Thông tin chuyến đi</p><h1 className="mt-6 max-w-3xl font-serif text-5xl font-medium leading-[.94] tracking-[-.05em] sm:text-7xl">Xem lại chương<br /><i className="text-[#c7a882]">sắp diễn ra.</i></h1><p className="mt-7 max-w-xl text-sm leading-7 text-white/52">Nhập số điện thoại đã dùng khi đặt. LAKA sẽ hiển thị những yêu cầu gần nhất gắn với số này.</p><p className="mt-8 max-w-lg border-l border-[#c7a882]/35 pl-5 text-sm leading-6 text-white/48">Không cần nhớ mã đặt chỗ. Nếu cần hỗ trợ ngay, gọi <a href="tel:0900000000" className="font-bold text-[#c7a882]">0900 000 000</a>.</p></div><div className="bg-[#eae1d2] px-5 py-16 text-[#16311c] sm:px-8 lg:flex lg:items-center lg:px-10"><div className="w-full"><LookupForm /></div></div></div></section>;

  if (config.mood === "organic") return <section className="min-h-[75svh] bg-[#edf3df] p-3 sm:p-5"><div className="relative mx-auto grid max-w-[1420px] overflow-hidden rounded-[42px] bg-[#dce9c6] text-[#16311c] shadow-[0_28px_90px_rgba(33,72,61,.1)] lg:grid-cols-[1fr_500px]"><span aria-hidden="true" className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#f7cf58]" /><span aria-hidden="true" className="absolute left-[44%] top-14 h-24 w-24 rounded-full bg-[#f18b68]" /><div className="relative z-10 flex min-h-[520px] flex-col justify-center px-7 py-16 sm:px-12 lg:px-16"><span className="w-fit rounded-full bg-white px-4 py-2 text-[.62rem] font-extrabold uppercase tracking-[.13em] shadow-sm">Chỉ cần số điện thoại</span><h1 className="mt-7 max-w-3xl text-5xl font-extrabold leading-[.98] tracking-[-.045em] sm:text-7xl">Chuyến đi của bạn<br /><i className="font-serif font-medium text-[#e66e4c]">đang ở đâu nhỉ?</i></h1><p className="mt-6 max-w-xl text-sm font-medium leading-7 text-[#16311c]/78">LAKA sẽ tìm những yêu cầu gần nhất bằng đúng số điện thoại hoặc số Zalo bạn đã sử dụng.</p><a href="tel:0900000000" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#16311c]/14 px-5 py-3 text-sm font-extrabold"><Phone className="h-4 w-4" />Cần giúp? Gọi LAKA</a></div><div className="relative z-10 m-3 rounded-[34px] bg-[#eae1d2] px-5 py-12 text-[#16311c] sm:px-8 lg:flex lg:items-center"><div className="w-full"><LookupForm /></div></div></div></section>;

  return <section className="min-h-[75svh] border-b border-[#16311c]/12 bg-[#e7ded1] py-16 text-[#16311c] sm:py-24"><div className="mx-auto grid w-[min(1240px,calc(100%-40px))] gap-12 lg:grid-cols-[1fr_480px] lg:items-center"><div><p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "LAKA journal · Your stay" : "LAKA ký sự · Thông tin chuyến đi"}</p><h1 className="mt-6 max-w-3xl font-serif text-5xl font-medium leading-[.98] tracking-[-.05em] sm:text-7xl">{locale === "en" ? <>Find the place<br /><i>waiting for you.</i></> : <>Xem lại khoảng riêng<br /><i>đang chờ bạn.</i></>}</h1><p className="mt-7 max-w-xl text-sm leading-7 text-[#16311c]/72">{locale === "en" ? "Enter the phone number used for your request. LAKA will show the most recent bookings linked to it." : "Chỉ cần nhập số điện thoại đã dùng khi đặt. LAKA sẽ hiển thị các yêu cầu gần nhất gắn với số này."}</p><div className="mt-8 max-w-xl border-l border-[#80613f]/45 pl-5 text-sm leading-6 text-[#16311c]/72">{locale === "en" ? "No booking code required. For immediate assistance, call " : "Không cần nhớ mã đặt chỗ. Nếu cần hỗ trợ ngay, gọi "}<a href="tel:0900000000" className="font-bold underline underline-offset-4">0900 000 000</a>.</div></div><div className="rounded-t-[150px] border border-[#16311c]/12 bg-[#eae1d2] px-6 pb-8 pt-24 text-[#16311c] shadow-xl sm:px-8"><LookupForm locale={locale} /></div></div></section>;
}

function TemplateContent({ route, config, locale }: { route: TemplateRoute; config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  switch (route.kind) {
    case "stays": return <StaysPage config={config} locale={locale} />;
    case "stay": return <StayPage config={config} slug={route.slug} locale={locale} />;
    case "experience": return <ExperiencePage config={config} locale={locale} />;
    case "gallery": return <GalleryPage config={config} locale={locale} />;
    case "about": return <AboutPage config={config} locale={locale} />;
    case "faq": return <FaqPage config={config} locale={locale} />;
    case "policy": return <PolicyPage config={config} locale={locale} />;
    case "contact": return <ContactPage config={config} locale={locale} />;
    case "booking": return <BookingPage config={config} locale={locale} />;
    case "lookup": return <LookupPage config={config} locale={locale} />;
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
    <SkipLink />
    <TemplateExperienceLayer mood={config.mood} />
    {config.slug === "tinh-lang" && <TemplateAtmosphereController locale={locale} />}
    <TemplateHeader config={config} locale={locale} />
    <main id="noi-dung-chinh" tabIndex={-1}>
      <div key={routeKey} className={`template-page-enter template-page-enter-${config.mood}`}>
        <TemplateContent route={route} config={config} locale={locale} />
      </div>
    </main>
    <TemplateFooter config={config} locale={locale} />
  </div>;
}
