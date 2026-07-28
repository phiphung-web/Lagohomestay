import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  Check,
  House,
  Instagram,
  Phone
} from "lucide-react";
import { BookingExperience } from "@/features/booking/components/booking-experience";
import { LookupForm } from "@/features/booking/components/lookup-form";
import { TemplateExperienceLayer } from "@/features/showcase/components/template-experience-layer";
import { TemplateMobileMenu } from "@/features/showcase/components/template-mobile-menu";
import { TemplateNavLink } from "@/features/showcase/components/template-nav-link";
import { TemplateStayHero } from "@/features/showcase/components/template-stay-showcase";
import { StayProductExplorer } from "@/features/showcase/components/stay-product-explorer";
import { TemplateExperienceStory } from "@/features/showcase/components/template-experience-story";
import { TemplateFaqSection, TemplatePolicySection } from "@/features/showcase/components/template-info-sections";
import { TemplateAboutStory, TemplateContactChannels } from "@/features/showcase/components/template-brand-sections";
import { TemplateLanguageSwitcher } from "@/features/showcase/components/template-language-switcher";
import { TemplateDocumentLocale } from "@/features/showcase/components/template-document-locale";
import {
  DemoContentNotice,
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
  ["Các căn", "luu-tru"],
  ["Trải nghiệm", "trai-nghiem"],
  ["Dịch vụ", "dich-vu"],
  ["Ẩm thực", "am-thuc"],
  ["Về LAKA", "ve-lago"],
  ["Cần biết", "thong-tin"]
] as const;

const englishNavItems = [
  ["Homes", "luu-tru"],
  ["Experiences", "trai-nghiem"],
  ["Services", "dich-vu"],
  ["Dining", "am-thuc"],
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

  const headerTone = overlay
    ? "-mb-[92px] border-b border-[#eae1d2]/20 bg-[#16311c]/48 text-[#eae1d2]"
    : "border-b border-[#16311c]/12 bg-[#eae1d2]/92 text-[#16311c]";

  return <header className={`sticky top-0 z-50 backdrop-blur-xl ${headerTone}`}>
    <div className="mx-auto grid h-[92px] w-[min(1500px,calc(100%-24px))] grid-cols-[1fr_auto_1fr] items-center gap-3 sm:w-[min(1500px,calc(100%-48px))]">
      <div className="flex min-w-0 items-center justify-start">
        <nav aria-label={locale === "en" ? "Primary navigation" : "Điều hướng chính"} className="hidden items-center gap-5 text-[.62rem] font-bold uppercase tracking-[.12em] xl:flex 2xl:gap-7">
          {(storyMode ? storyItems.slice(0, 2) : localizedNavItems.slice(0, 3)).map(([label, path]) => <TemplateNavLink key={path} href={storyMode ? `${config.basePath}${path}` : scoped(config.basePath, path)} label={label} mood={config.mood} exact={!path} />)}
        </nav>
        <div className="xl:hidden">
          <TemplateLanguageSwitcher locale={locale} compact alwaysVisible />
        </div>
      </div>

      <Link
        href={scoped(config.basePath)}
        aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"}
        className="focus-ring flex items-center justify-self-center rounded-md"
      >
        <BrandLogo variant="homestay" decorative className="w-[122px] sm:w-[148px] lg:w-[164px]" />
      </Link>

      <div className="flex min-w-0 items-center justify-end gap-2">
        <nav aria-label={locale === "en" ? "Secondary navigation" : "Điều hướng bổ sung"} className="hidden items-center gap-5 text-[.62rem] font-bold uppercase tracking-[.12em] xl:flex 2xl:gap-7">
          {(storyMode ? storyItems.slice(2) : localizedNavItems.slice(3)).map(([label, path]) => <TemplateNavLink key={path} href={storyMode ? `${config.basePath}${path}` : scoped(config.basePath, path)} label={label} mood={config.mood} exact={!path} />)}
        </nav>
        <div className="hidden xl:block">
          <TemplateLanguageSwitcher locale={locale} compact alwaysVisible />
        </div>
        <TemplateMobileMenu name={config.name} mood={config.mood} items={mobileItems} locale={locale} wideHeader />
      </div>
    </div>
  </header>;
}

export function TemplateFooter({ config, locale = "vi", storyMode = false, homeMode = false }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale; storyMode?: boolean; homeMode?: boolean }) {
  const localizedNavItems = locale === "en" ? englishNavItems : navItems;
  if (homeMode) return <footer className="border-t border-[#16311c]/12 bg-[#eae1d2] pb-28 pt-14 text-[#16311c] sm:pb-32">
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] gap-10 md:grid-cols-[1.1fr_.7fr_.7fr]">
      <div>
        <Link href={config.basePath} aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"} className="inline-flex">
          <BrandLogo variant="established" decorative className="w-[190px]" />
        </Link>
        <p className="mt-5 max-w-md text-sm leading-7 opacity-80">
          {locale === "en" ? "A place close to nature, created for slower days and more meaningful time together." : "Một nơi gần thiên nhiên, dành cho những ngày sống chậm và khoảng thời gian thật sự có ý nghĩa bên nhau."}
        </p>
      </div>
      <div>
        <p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Explore" : "Khám phá"}</p>
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-bold md:grid-cols-1">
          {localizedNavItems.map(([label, path]) => <Link key={path} href={scoped(config.basePath, path)}>{label}</Link>)}
        </div>
      </div>
      <div>
        <p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Connect" : "Kết nối"}</p>
        <div className="mt-5 flex flex-col gap-3 text-sm">
          <a href="tel:0900000000" className="font-bold">0900 000 000</a>
          <a href="https://zalo.me/0900000000">{locale === "en" ? "Chat on Zalo" : "Trò chuyện qua Zalo"}</a>
          <Link href={scoped(config.basePath, "lien-he")}>{locale === "en" ? "Contact LAKA" : "Liên hệ LAKA"}</Link>
          <span className="flex items-center gap-2 opacity-80"><Instagram className="h-4 w-4" /> @lagohomestay</span>
        </div>
      </div>
    </div>
  </footer>;
  if (storyMode) return <footer className="border-t border-[#16311c]/12 bg-[#eae1d2] pb-28 pt-14 text-[#16311c] sm:pb-32">
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] gap-12 md:grid-cols-[1.25fr_.75fr]">
      <div>
        <Link href={config.basePath} aria-label={locale === "en" ? "LAKA Homestay — home" : "LAKA Homestay — trang chủ"} className="inline-flex">
          <BrandLogo variant="established" decorative className="w-[190px]" />
        </Link>
        <p className="mt-6 max-w-lg font-serif text-2xl leading-9">
          {locale === "en" ? "A place to return. First, to yourself." : "Một nơi để trở về. Trước hết, với chính mình."}
        </p>
      </div>
      <div className="md:text-right">
        <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{locale === "en" ? "Keep exploring" : "Tiếp tục khám phá"}</p>
        <div className="mt-5 flex flex-col gap-3 text-sm md:items-end">
          <Link href={scoped(config.basePath, "ve-lago")} className="font-bold">{locale === "en" ? "The LAKA story" : "Câu chuyện LAKA"}</Link>
          <Link href={scoped(config.basePath, "trai-nghiem")}>{locale === "en" ? "The LAKA rhythm" : "Nhịp sống LAKA"}</Link>
          <span className="flex items-center gap-2 opacity-70"><Instagram className="h-4 w-4" /> @lagohomestay</span>
        </div>
      </div>
    </div>
  </footer>;
  return <footer className={`border-t border-current/12 pb-28 pt-14 sm:pb-32 ${config.mood === "organic" ? "bg-[#e7ded1]" : config.mood === "cinematic" ? "bg-[#0b190f]" : "bg-[#eae1d2]"}`}>
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] gap-10 md:grid-cols-[1.1fr_.7fr_.7fr]">
      <div><Link href={config.basePath || "/"} aria-label={locale === "en" ? "LAKA Homestay - Home" : "LAKA Homestay - Trang chủ"} className="inline-flex"><BrandLogo variant={config.mood === "editorial" ? "established" : "homestay"} decorative className={`${config.mood === "editorial" ? "w-[190px]" : "w-[210px]"} ${config.mood === "cinematic" ? "text-[#eae1d2]" : "text-[#16311c]"}`} /></Link><p className="mt-5 max-w-md text-sm leading-7 opacity-80">{locale === "en" ? "Three landscape collections, eight home types and fifteen private homes made for slower days together." : "Ba hệ cảnh quan, tám dòng nhà và mười lăm căn riêng cho những ngày mọi người muốn sống chậm cùng nhau."}</p><span className="mt-5 inline-flex rounded-full border border-current/15 px-3 py-1.5 text-[.6rem] font-bold uppercase tracking-wider opacity-80">{locale === "en" ? "Coming soon · In development" : "Sắp ra mắt · Đang hoàn thiện"}</span></div>
      <div><p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Explore" : "Khám phá"}</p><div className="mt-5 flex flex-col gap-3 text-sm font-bold">{localizedNavItems.slice(0, 4).map(([label, path]) => <Link key={path} href={scoped(config.basePath, path)}>{label}</Link>)}</div></div>
      <div><p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-80">{locale === "en" ? "Connect" : "Kết nối"}</p><div className="mt-5 flex flex-col gap-3 text-sm"><a href="tel:0900000000" className="font-bold">0900 000 000</a><a href="https://zalo.me/0900000000">{locale === "en" ? "Chat on Zalo" : "Trò chuyện qua Zalo"}</a><Link href={scoped(config.basePath, "chinh-sach")}>{locale === "en" ? "Policies" : "Chính sách"}</Link><span className="flex items-center gap-2 opacity-80"><Instagram className="h-4 w-4" /> @lagohomestay</span></div></div>
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
    <div className="relative mx-auto grid min-h-[calc(100svh-40px)] w-[min(1420px,100%)] overflow-hidden rounded-[38px] border border-[#16311c]/8 bg-[var(--template-surface)] shadow-[0_28px_80px_rgba(33,72,61,.08)] lg:grid-cols-[.78fr_1.22fr]">
      <div className="relative z-10 flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-16"><span className="w-fit rounded-full bg-[#f7cf58] px-4 py-2 text-[.62rem] font-extrabold uppercase tracking-[.14em]">{eyebrow}</span><h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[.98] tracking-[-.045em] sm:text-7xl">{title}</h1><p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-[#16311c]/78 sm:text-base">{text}</p></div>
      <div className="relative m-3 min-h-[48svh] overflow-hidden rounded-[32px] lg:min-h-0"><Image src={heroImage} alt={`${title} - ảnh minh họa`} fill priority sizes="(max-width:1024px) 100vw, 58vw" className="showcase-visual-media object-cover transition duration-700 hover:scale-[1.025]" /><span className="absolute bottom-5 right-5 grid h-20 w-20 place-items-center rounded-full bg-[#f18b68] text-center text-[.58rem] font-extrabold uppercase tracking-wider text-[#16311c]">Ảnh<br />minh họa</span></div>
    </div>
  </section>;

  return <section className="relative min-h-[100svh] overflow-hidden border-b border-white/12 bg-[#10251d] text-white">
    <Image src={heroImage} alt={`${title} — ${locale === "en" ? "concept image" : "ảnh minh họa"}`} fill priority sizes="100vw" className="showcase-visual-media object-cover transition duration-[1400ms] hover:scale-[1.015]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,14,.12),rgba(5,18,14,.82))]" />
    <div className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1480px,calc(100%-40px))] flex-col justify-end pb-12 pt-32 sm:pb-16">
      <p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#dfc6a5]">{eyebrow}</p>
      <h1 className="mt-5 max-w-6xl font-serif text-[clamp(3.8rem,10vw,9rem)] font-medium leading-[.84] tracking-[-.07em]">{title}</h1>
      <div className="mt-7 grid gap-6 border-t border-white/22 pt-6 sm:grid-cols-[1fr_auto] sm:items-end"><p className="max-w-2xl text-sm leading-7 text-white/68 sm:text-base">{text}</p><span className="w-fit rounded-full border border-white/25 bg-black/12 px-4 py-2 text-[.56rem] font-bold uppercase tracking-[.14em] text-white/70 backdrop-blur">{locale === "en" ? "Concept image" : "Hình ảnh minh họa"}</span></div>
    </div>
  </section>;
}

function StaysPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "The LAKA product map" : "Bản đồ lưu trú LAKA"} title={locale === "en" ? "Three landscapes. One place to return." : "Ba hệ cảnh quan. Một nơi để trở về."} text={locale === "en" ? "Begin with Lake, Forest or Hill, then choose from eight home types and fifteen physical homes." : "Bắt đầu từ Hệ Hồ, Hệ Rừng hoặc Hệ Đồi; sau đó chọn trong tám dòng nhà và mười lăm căn thực tế."} image={conceptImages.detail1} />
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
    <section id="khong-gian" className={`mx-auto grid scroll-mt-24 gap-12 py-20 lg:grid-cols-[1fr_360px] lg:py-28 ${cinematic ? "w-[min(1420px,calc(100%-40px))] lg:grid-cols-[1fr_390px]" : "w-[min(1240px,calc(100%-40px))]"}`}><div><p className="text-[.65rem] font-bold uppercase tracking-[.18em] text-[var(--template-accent)]">{locale === "en" ? "Inside the home" : cinematic ? "Bên trong khung hình" : organic ? "Có gì trong nhà?" : "Không gian của căn"}</p><h2 className={`mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl ${organic ? "font-extrabold tracking-[-.04em]" : "font-serif font-medium"}`}>{stay.longDescription}</h2><div className={`mt-12 grid gap-4 ${galleryGrid}`}>{stay.gallery.map((image, index) => <div key={image} className={`group relative overflow-hidden ${galleryShape(index)}`}><Image src={image} alt={`${stay.name} - ${locale === "en" ? `space ${index + 1}` : `góc không gian ${index + 1}`}`} fill sizes="(max-width:640px) 100vw, 55vw" className={`object-cover transition duration-700 group-hover:scale-[1.025] ${cinematic ? "opacity-78 group-hover:opacity-100" : ""}`} /><span className={`absolute bottom-3 left-3 px-3 py-1.5 text-[.56rem] font-bold uppercase tracking-wider ${cinematic ? "bg-black/55 text-white backdrop-blur" : "bg-white/88 text-[#16311c]"}`}>{locale === "en" ? "Frame" : "Góc"} {String(index + 1).padStart(2, "0")} · {locale === "en" ? "concept" : "minh họa"}</span></div>)}</div><h3 className={`mt-14 text-3xl ${organic ? "font-extrabold" : "font-serif font-medium"}`}>{locale === "en" ? "Featured amenities" : organic ? "Đủ tiện nghi để ở thật vui" : cinematic ? "Những chi tiết trong căn" : "Tiện nghi nổi bật"}</h3><div className={`mt-6 grid gap-3 sm:grid-cols-2 ${organic ? "gap-2" : ""}`}>{stay.amenities.map((item, index) => <span key={item} className={`flex items-center gap-3 py-3 text-sm ${organic ? "rounded-full bg-white px-4 font-bold shadow-sm" : "border-b border-current/10"}`}><span className={`${cinematic ? "text-[.6rem] font-bold text-[var(--template-accent)]" : ""}`}>{cinematic ? String(index + 1).padStart(2, "0") : <Check className="h-4 w-4 text-[var(--template-accent)]" />}</span>{item}</span>)}</div>
      <section className="mt-14 border-t border-current/12 pt-10">
        <div className="grid gap-5 sm:grid-cols-[1fr_.55fr] sm:items-end">
          <div><p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[var(--template-accent)]">{locale === "en" ? "Physical homes in this type" : "Các căn thực tế thuộc dòng này"}</p><h3 className={`mt-4 text-3xl sm:text-4xl ${organic ? "font-extrabold" : "font-serif font-medium"}`}>{locale === "en" ? `${units.length} homes, each with its own position.` : `${units.length} căn, mỗi căn có một vị trí riêng.`}</h3></div>
          <p className="text-sm leading-7 opacity-60">{locale === "en" ? "Layout and core amenities are equivalent. LAKA assigns or confirms the specific home according to availability and your preference." : "Thiết kế và tiện nghi chính tương đương. LAKA sẽ phân hoặc xác nhận căn cụ thể theo lịch trống và mong muốn của bạn."}</p>
        </div>
        <div className={`mt-7 grid gap-3 ${units.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {units.map((unit, index) => <article key={unit.id} className={`border border-current/12 p-5 ${organic ? "rounded-[24px] bg-white" : "bg-[var(--template-surface)]"}`}>
            <div className="flex items-center justify-between gap-4"><span className="text-[.58rem] font-bold uppercase tracking-[.14em] text-[var(--template-accent)]">{unit.code}</span><span className="text-[.56rem] font-bold uppercase tracking-[.12em] opacity-45">0{index + 1}</span></div>
            <h4 className={`mt-6 text-2xl ${organic ? "font-extrabold" : "font-serif font-medium"}`}>{locale === "en" ? unit.nameEn : unit.name}</h4>
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
        <h2 className={`mt-4 text-3xl leading-tight ${organic ? "font-extrabold" : "font-serif font-medium"}`}>{locale === "en" ? "A whole home, with room for your own rhythm." : "Một căn nhà trọn vẹn cho nhịp sống của riêng bạn."}</h2>
        <p className="mt-5 text-sm leading-7 opacity-65">{locale === "en" ? "Private living spaces, a distinct position in the landscape and the freedom to spend the day without a schedule." : "Không gian sinh hoạt riêng, một vị trí riêng trong cảnh quan và sự tự do để ngày trôi qua không cần lịch trình."}</p>
        <div className="my-7 border-y border-current/10 py-5 text-sm">
          <p className="flex items-center gap-2"><House className="h-4 w-4 text-[var(--template-accent)]" />{locale === "en" ? "An entire private home" : "Nguyên căn, không dùng chung"}</p>
          <p className="mt-3 text-xs leading-6 opacity-55">{units.length} {locale === "en" ? "physical homes share this architectural language." : "căn thực tế cùng chung một ngôn ngữ kiến trúc."}</p>
        </div>
        <Link href={scoped(config.basePath, "trai-nghiem")} className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#16311c] px-5 py-4 text-sm font-bold text-white">{locale === "en" ? "Experience a day at LAKA" : "Cảm nhận một ngày tại LAKA"} <ArrowRight className="h-4 w-4" /></Link>
        <Link href={scoped(config.basePath, "luu-tru")} className="mt-3 flex min-h-12 items-center justify-center text-sm font-bold">{locale === "en" ? "Return to all homes" : "Trở lại các căn nhà"}</Link>
      </aside>
    </section></>;
}

function ExperiencePage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "A day at LAKA" : "Một ngày tại LAKA"} title={locale === "en" ? "A day that needs very little planning." : "Một ngày không cần lên kế hoạch quá nhiều."} text={locale === "en" ? "LAKA prepares the space. Let nature and curiosity guide everything else." : "LAKA chuẩn bị không gian. Phần còn lại, bạn có thể để thiên nhiên và cảm hứng dẫn đường."} image={conceptImages.experience} />
    <DemoContentNotice locale={locale} />
    <TemplateExperienceStory mood={config.mood} locale={locale} />
    <TemplateExperienceCatalog locale={locale} /></>;
}

function ServicesPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Services and shared spaces" : "Dịch vụ và tiện ích"} title={locale === "en" ? "Everything useful. Nothing intrusive." : "Đủ đầy khi cần. Riêng tư khi muốn."} text={locale === "en" ? "From family essentials to private transfers and shared nature spaces, choose only what makes your stay lighter." : "Từ tiện ích gia đình, xe đưa đón đến không gian thiên nhiên dùng chung — bạn chỉ cần chọn những gì khiến kỳ nghỉ nhẹ nhàng hơn."} image={conceptImages.detail2} />
    <DemoContentNotice locale={locale} />
    <TemplateServicesCatalog locale={locale} /></>;
}

function DiningPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Dining at LAKA" : "Ẩm thực tại LAKA"} title={locale === "en" ? "A table that belongs to the stay." : "Một bàn ăn thuộc về kỳ nghỉ."} text={locale === "en" ? "Breakfast on the veranda, seasonal dishes to share and private evening tables — all designed to keep you close to your home and one another." : "Giỏ sáng bên hiên, món theo mùa để sẻ chia và bàn tối riêng tư — tất cả giữ bạn ở thật gần căn nhà và những người đồng hành."} image={conceptImages.dining} />
    <DemoContentNotice locale={locale} />
    <TemplateDiningAndOccasions locale={locale} /></>;
}

function AboutPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "The LAKA philosophy" : "Triết lý của LAKA"} title={locale === "en" ? "Far enough to rest. Close enough to return." : "Một nơi đủ xa để nghỉ, đủ gần để trở về."} text={locale === "en" ? "LAKA began with a wish to create homes where people can give their full attention to nature and to one another." : "LAKA bắt đầu từ mong muốn tạo ra những căn nhà nơi con người có thể dành trọn sự chú ý cho thiên nhiên và cho nhau."} image={conceptImages.forest} />
    <TemplateAboutStory mood={config.mood} locale={locale} /></>;
}

function FaqPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Understanding LAKA" : "Hiểu thêm về LAKA"} title={locale === "en" ? "Clear information, with space left for discovery." : "Thông tin rõ ràng, vẫn đủ khoảng trống để khám phá."} text={locale === "en" ? "A concise guide to the landscape, homes, experiences and the concept currently taking shape." : "Những câu trả lời ngắn gọn về cảnh quan, các căn nhà, trải nghiệm và concept đang dần thành hình."} image={conceptImages.hill} />
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
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Stay policies" : "Chính sách lưu trú"} title={locale === "en" ? "Clarity before the journey begins." : "Rõ ràng trước khi bắt đầu chuyến đi."} text={locale === "en" ? "Simple principles that create a transparent and considerate experience for guests and the LAKA team." : "Các nguyên tắc giúp LAKA và khách lưu trú cùng có trải nghiệm minh bạch, nhẹ nhàng."} image={conceptImages.detail3} />
    <TemplatePolicySection mood={config.mood} policies={localizedPolicies} /></>;
}

function ContactPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Talk to LAKA" : "Trò chuyện cùng LAKA"} title={locale === "en" ? "We are always ready to listen." : "Chúng mình luôn sẵn sàng lắng nghe."} text={locale === "en" ? "Get in touch to learn more about the place, follow its journey or share what you hope to find at LAKA." : "Kết nối để hiểu thêm về nơi này, theo dõi hành trình hoàn thiện hoặc chia sẻ điều bạn mong được tìm thấy tại LAKA."} image={conceptImages.cloud} />
    <TemplateContactChannels mood={config.mood} locale={locale} /></>;
}

function BookingPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Plan your LAKA stay" : "Lên lịch kỳ nghỉ LAKA"} title={locale === "en" ? "Choose the days worth slowing down for." : "Chọn những ngày đáng để sống chậm."} text={locale === "en" ? "When you are ready, check the available homes and send LAKA a private stay request." : "Khi đã sẵn sàng, bạn có thể xem những căn còn trống và gửi LAKA một yêu cầu lưu trú riêng tư."} image={conceptImages.cloud} />
    <section className="min-h-screen border-t border-[#16311c]/12 bg-[#fbfaf6] text-[#16311c]">
      <Suspense fallback={<div className="container-lago py-24">{locale === "en" ? "Preparing availability…" : "Đang chuẩn bị lịch căn nhà…"}</div>}>
        <BookingExperience lookupPath={scoped(config.basePath, "tra-cuu")} locale={locale} />
      </Suspense>
    </section></>;
}

function LookupPage({ config, locale }: { config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  return <><PageIntro config={config} locale={locale} eyebrow={locale === "en" ? "Your upcoming stay" : "Chuyến đi sắp tới"} title={locale === "en" ? "Return to the place waiting for you." : "Trở lại khoảng riêng đang chờ bạn."} text={locale === "en" ? "This quiet utility remains available whenever you need to review a request, without interrupting the main LAKA story." : "Tiện ích nhỏ này luôn sẵn sàng khi bạn cần xem lại yêu cầu, nhưng không làm gián đoạn câu chuyện chính của LAKA."} image={conceptImages.forest} />
    <section className="border-b border-[#16311c]/12 bg-[#e7ded1] py-16 text-[#16311c] sm:py-24">
      <div className="mx-auto grid w-[min(1240px,calc(100%-40px))] gap-12 lg:grid-cols-[1fr_480px] lg:items-center">
        <div>
          <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Private and simple" : "Riêng tư và đơn giản"}</p>
          <h2 className="mt-6 max-w-3xl font-serif text-5xl font-medium leading-[.98] tracking-[-.05em] sm:text-7xl">{locale === "en" ? <>Only your phone<br /><i>number is needed.</i></> : <>Chỉ cần số điện thoại<br /><i>đã dùng khi gửi yêu cầu.</i></>}</h2>
          <p className="mt-7 max-w-xl text-sm leading-7 text-[#16311c]/65">{locale === "en" ? "LAKA will show the most recent requests linked to that number. No booking code is required." : "LAKA sẽ hiển thị những yêu cầu gần nhất gắn với số này. Bạn không cần ghi nhớ mã đặt chỗ."}</p>
          <a href="tel:0900000000" className="mt-7 inline-flex items-center gap-2 text-sm font-bold"><Phone className="h-4 w-4" />{locale === "en" ? "Need help? Call LAKA" : "Cần hỗ trợ? Gọi LAKA"}</a>
        </div>
        <div className="rounded-t-[150px] border border-[#16311c]/12 bg-[#eae1d2] px-6 pb-8 pt-24 text-[#16311c] shadow-xl sm:px-8"><LookupForm locale={locale} /></div>
      </div>
    </section></>;
}

function TemplateContent({ route, config, locale }: { route: TemplateRoute; config: CompleteTemplateConfig; locale: ShowcaseLocale }) {
  switch (route.kind) {
    case "stays": return <StaysPage config={config} locale={locale} />;
    case "stay": return <StayPage config={config} slug={route.slug} locale={locale} />;
    case "experience": return <ExperiencePage config={config} locale={locale} />;
    case "services": return <ServicesPage config={config} locale={locale} />;
    case "dining": return <DiningPage config={config} locale={locale} />;
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
    <TemplateHeader config={config} locale={locale} overlay />
    <main id="noi-dung-chinh" tabIndex={-1}>
      <div key={routeKey} className={`template-page-enter template-page-enter-${config.mood}`}>
        <TemplateContent route={route} config={config} locale={locale} />
      </div>
    </main>
    <TemplateFooter config={config} locale={locale} />
  </div>;
}
