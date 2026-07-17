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
  Leaf,
  MapPin,
  Phone,
  Plus,
  Sparkles
} from "lucide-react";
import { BookingExperience } from "@/features/booking/components/booking-experience";
import { LookupForm } from "@/features/booking/components/lookup-form";
import { ShowcaseSwitcher } from "@/features/showcase/components/showcase-switcher";
import { GalleryLightbox } from "@/features/showcase/components/gallery-lightbox";
import { TemplateExperienceLayer } from "@/features/showcase/components/template-experience-layer";
import { TemplateMobileMenu } from "@/features/showcase/components/template-mobile-menu";
import { TemplateNavLink } from "@/features/showcase/components/template-nav-link";
import { TemplateStayHero, TemplateStaysCollection } from "@/features/showcase/components/template-stay-showcase";
import { experienceMoments, showcaseFaqs, stayPromises } from "@/features/showcase/data/showcase-content";
import type { ShowcaseTemplateSlug } from "@/features/showcase/data/templates";
import { conceptImages, stays } from "@/features/stays/data/demo-data";
import { formatCurrency } from "@/shared/lib/format";
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
  ["Về Lago", "ve-lago"],
  ["Cần biết", "thong-tin"]
] as const;

const policies = [
  ["Đặt chỗ và xác nhận", "Yêu cầu từ website được giữ trong 2 giờ. Đặt chỗ chỉ được xác nhận sau khi đội ngũ Lago liên hệ qua điện thoại hoặc Zalo."],
  ["Thay đổi và hủy", "Điều kiện đổi ngày, hủy và hoàn cọc sẽ được thông báo rõ ràng trong bước xác nhận. Nội dung chính thức cần được duyệt trước khi mở bán."],
  ["Quyền riêng tư", "Thông tin liên hệ chỉ được dùng để xử lý yêu cầu lưu trú, chăm sóc khách và thực hiện các nghĩa vụ vận hành cần thiết."],
  ["Nội dung minh họa", "Hình ảnh, địa chỉ, giá và một số chính sách trong bản trình bày là dữ liệu minh họa, chưa phải cam kết thương mại."]
];

function scoped(basePath: string, path = "") {
  return path ? `${basePath}/${path}` : basePath;
}

export function TemplateHeader({ config }: { config: CompleteTemplateConfig }) {
  const organic = config.mood === "organic";
  const cinematic = config.mood === "cinematic";
  const mobileItems = navItems.map(([label, path]) => ({ label, href: scoped(config.basePath, path), exact: !path }));
  return <header className={`sticky top-0 z-50 backdrop-blur-xl ${organic ? "border-transparent bg-[#edf3df]/88 py-2" : cinematic ? "border-b border-white/10 bg-[#07130f]/92" : "border-b border-[#19322c]/12 bg-[#f3eee5]/92"}`}>
    <div className={`mx-auto flex w-[min(1420px,calc(100%-28px))] items-center justify-between gap-4 ${organic ? "h-16 rounded-full border border-[#21483d]/10 bg-white/90 px-4 shadow-[0_14px_45px_rgba(33,72,61,.1)] sm:px-6" : "h-[76px]"}`}>
      <Link href={config.basePath} className={`focus-ring flex items-center gap-2 ${organic ? "text-xl font-extrabold" : cinematic ? "text-sm font-extrabold uppercase tracking-[.22em]" : "font-serif text-3xl font-semibold tracking-[-.05em]"}`}>
        {organic && <span className="grid h-9 w-9 place-items-center rounded-full bg-[#21483d] text-white"><Leaf className="h-4 w-4" /></span>}
        Lago{organic ? "!" : cinematic ? "" : "."}
      </Link>
      <nav aria-label={`Điều hướng mẫu ${config.name}`} className="hidden items-center gap-6 text-[.68rem] font-bold uppercase tracking-[.12em] lg:flex">
        {navItems.map(([label, path]) => <TemplateNavLink key={path} href={scoped(config.basePath, path)} label={label} mood={config.mood} exact={!path} />)}
      </nav>
      <div className="flex items-center gap-2">
        <Link href={scoped(config.basePath, "tra-cuu")} className="hidden min-h-10 items-center px-3 text-xs font-bold opacity-60 transition hover:opacity-100 sm:inline-flex">Tra cứu</Link>
        <Link href={scoped(config.basePath, "dat-phong")} className={`inline-flex min-h-11 items-center gap-2 px-4 text-xs font-bold ${cinematic ? "rounded-full bg-[#e5c59c] text-[#07130f]" : organic ? "rounded-full bg-[#f18b68] text-[#17312b]" : "border-b border-[#19322c] px-1"}`}>
          <CalendarDays className="h-4 w-4" /> <span className="hidden sm:inline">Kiểm tra lịch</span><span className="sm:hidden">Đặt căn</span>
        </Link>
        <TemplateMobileMenu name={config.name} mood={config.mood} items={mobileItems} bookingHref={scoped(config.basePath, "dat-phong")} lookupHref={scoped(config.basePath, "tra-cuu")} contactHref={scoped(config.basePath, "lien-he")} />
      </div>
    </div>
  </header>;
}

export function TemplateFooter({ config }: { config: CompleteTemplateConfig }) {
  return <footer className={`border-t border-current/12 pb-28 pt-14 sm:pb-32 ${config.mood === "organic" ? "bg-[#dce9c6]" : config.mood === "cinematic" ? "bg-[#07130f]" : "bg-[#f3eee5]"}`}>
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] gap-10 md:grid-cols-[1.1fr_.7fr_.7fr]">
      <div><Link href={config.basePath} className={config.mood === "organic" ? "text-3xl font-extrabold" : config.mood === "cinematic" ? "text-lg font-extrabold uppercase tracking-[.2em]" : "font-serif text-3xl font-semibold"}>Lago{config.mood === "organic" ? "!" : config.mood === "editorial" ? "." : ""}</Link><p className="mt-4 max-w-md text-sm leading-7 opacity-52">Bốn căn nhà riêng giữa thiên nhiên, cho những ngày mọi người muốn sống chậm và gần nhau hơn.</p><span className="mt-5 inline-flex rounded-full border border-current/15 px-3 py-1.5 text-[.6rem] font-bold uppercase tracking-wider opacity-55">Bản trình bày · Mẫu {config.name}</span></div>
      <div><p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-42">Khám phá</p><div className="mt-5 flex flex-col gap-3 text-sm font-bold">{navItems.slice(0, 4).map(([label, path]) => <Link key={path} href={scoped(config.basePath, path)}>{label}</Link>)}</div></div>
      <div><p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-42">Kết nối</p><div className="mt-5 flex flex-col gap-3 text-sm"><a href="tel:0900000000" className="font-bold">0900 000 000</a><a href="https://zalo.me/0900000000">Zalo đặt phòng</a><Link href={scoped(config.basePath, "chinh-sach")}>Chính sách</Link><span className="flex items-center gap-2 opacity-55"><Instagram className="h-4 w-4" /> @lagohomestay</span></div></div>
    </div>
  </footer>;
}

function PageIntro({ eyebrow, title, text, image, config }: { eyebrow: string; title: string; text: string; image?: string; config: CompleteTemplateConfig }) {
  const cinematic = config.mood === "cinematic";
  const organic = config.mood === "organic";
  if (cinematic) return <section className={`grain relative overflow-hidden border-b border-white/10 ${image ? "min-h-[560px]" : "bg-[#0a1914]"}`}>
    {image && <><Image src={image} alt={`${title} - ảnh minh họa`} fill priority sizes="100vw" className="object-cover opacity-55 transition duration-[1400ms] hover:scale-[1.015]" /><div className="absolute inset-0 bg-gradient-to-r from-[#07130f] via-[#07130f]/68 to-[#07130f]/18" /></>}
    <div className={`relative z-10 mx-auto flex w-[min(1420px,calc(100%-40px))] flex-col justify-center py-24 ${image ? "min-h-[560px]" : "sm:py-32"}`}>
      <p className="text-[.65rem] font-bold uppercase tracking-[.24em] text-[var(--template-accent)]">{eyebrow}</p>
      <h1 className="mt-6 max-w-5xl font-serif text-5xl font-medium leading-[.92] tracking-[-.05em] sm:text-7xl lg:text-8xl">{title}</h1>
      <p className="mt-7 max-w-2xl border-l border-[#e5c59c]/45 pl-5 text-sm leading-7 text-white/58 sm:text-base">{text}</p>
    </div>
  </section>;

  if (organic) return <section className="relative overflow-hidden px-3 py-5 sm:px-5 sm:py-8">
    <div className={`relative mx-auto grid w-[min(1420px,100%)] overflow-hidden rounded-[38px] border border-[#21483d]/8 bg-[var(--template-surface)] shadow-[0_28px_80px_rgba(33,72,61,.08)] ${image ? "min-h-[540px] lg:grid-cols-[.78fr_1.22fr]" : "min-h-[400px]"}`}>
      <div className="relative z-10 flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-16"><span className="w-fit rounded-full bg-[#f7cf58] px-4 py-2 text-[.62rem] font-extrabold uppercase tracking-[.14em]">{eyebrow}</span><h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-[.98] tracking-[-.045em] sm:text-7xl">{title}</h1><p className="mt-6 max-w-2xl text-sm font-medium leading-7 opacity-58 sm:text-base">{text}</p></div>
      {image && <div className="relative m-3 min-h-[360px] overflow-hidden rounded-[32px] lg:min-h-0"><Image src={image} alt={`${title} - ảnh minh họa`} fill priority sizes="(max-width:1024px) 100vw, 58vw" className="object-cover transition duration-700 hover:scale-[1.025]" /><span className="absolute bottom-5 right-5 grid h-20 w-20 place-items-center rounded-full bg-[#f18b68] text-center text-[.58rem] font-extrabold uppercase tracking-wider text-[#17312b]">Ảnh<br />minh họa</span></div>}
    </div>
  </section>;

  return <section className="border-b border-current/10 bg-[#eee6da]">
    <div className={`mx-auto grid w-[min(1420px,calc(100%-40px))] items-center gap-12 py-16 sm:py-24 ${image ? "lg:grid-cols-[.9fr_1.1fr]" : ""}`}>
      <div className="relative z-10"><p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-[var(--template-accent)]">{eyebrow}</p><h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.02] tracking-[-.045em] sm:text-7xl lg:text-8xl">{title}</h1><p className="mt-7 max-w-2xl text-sm leading-7 opacity-60 sm:text-base">{text}</p></div>
      {image && <div className="relative min-h-[460px] overflow-hidden rounded-t-[240px]"><Image src={image} alt={`${title} - ảnh minh họa`} fill priority sizes="(max-width:1024px) 100vw, 55vw" className="object-cover transition duration-1000 hover:scale-[1.02]" /><span className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#f3eee5]/92 px-4 py-2 text-[.58rem] font-bold uppercase tracking-[.14em] text-[#19322c]">Hình ảnh minh họa</span></div>}
    </div>
  </section>;
}

function StaysPage({ config }: { config: CompleteTemplateConfig }) {
  return <><PageIntro config={config} eyebrow="Bộ sưu tập căn riêng" title="Bốn căn nhà, bốn nhịp nghỉ riêng." text="Chọn căn theo người đồng hành, số ngày ở và cách bạn muốn thức dậy mỗi sáng." image={conceptImages.detail1} />
    <TemplateStaysCollection mood={config.mood} basePath={config.basePath} /></>;
}

function StayPage({ config, slug }: { config: CompleteTemplateConfig; slug: string }) {
  const stay = stays.find((item) => item.slug === slug)!;
  const cinematic = config.mood === "cinematic";
  const organic = config.mood === "organic";
  const galleryGrid = cinematic ? "sm:grid-cols-12" : organic ? "sm:grid-cols-12" : "sm:grid-cols-3";
  const galleryShape = (index: number) => {
    if (cinematic) return index === 0 ? "aspect-[4/3] sm:col-span-7" : index === 1 ? "aspect-[4/5] sm:col-span-5" : "aspect-[16/7] sm:col-span-12";
    if (organic) return index === 0 ? "aspect-[4/3] rounded-[70px_26px_70px_26px] sm:col-span-7" : index === 1 ? "aspect-[4/5] rounded-[28px_72px_28px_72px] sm:col-span-5" : "aspect-[16/7] rounded-[44px] sm:col-span-12";
    return index === 0 ? "aspect-[4/5]" : "aspect-[4/3] sm:mt-12";
  };
  return <><TemplateStayHero mood={config.mood} basePath={config.basePath} stay={stay} />
    <section className={`mx-auto grid gap-12 py-20 lg:grid-cols-[1fr_360px] lg:py-28 ${cinematic ? "w-[min(1420px,calc(100%-40px))] lg:grid-cols-[1fr_390px]" : "w-[min(1240px,calc(100%-40px))]"}`}><div><p className="text-[.65rem] font-bold uppercase tracking-[.18em] text-[var(--template-accent)]">{cinematic ? "Bên trong khung hình" : organic ? "Có gì trong nhà?" : "Không gian của căn"}</p><h2 className={`mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl ${organic ? "font-extrabold tracking-[-.04em]" : "font-serif font-medium"}`}>{stay.longDescription}</h2><div className={`mt-12 grid gap-4 ${galleryGrid}`}>{stay.gallery.map((image, index) => <div key={image} className={`group relative overflow-hidden ${galleryShape(index)}`}><Image src={image} alt={`${stay.name} - góc không gian ${index + 1}`} fill sizes="(max-width:640px) 100vw, 55vw" className={`object-cover transition duration-700 group-hover:scale-[1.025] ${cinematic ? "opacity-78 group-hover:opacity-100" : ""}`} /><span className={`absolute bottom-3 left-3 px-3 py-1.5 text-[.56rem] font-bold uppercase tracking-wider ${cinematic ? "bg-black/55 text-white backdrop-blur" : "bg-white/88 text-[#17312b]"}`}>Góc {String(index + 1).padStart(2, "0")} · minh họa</span></div>)}</div><h3 className={`mt-14 text-3xl ${organic ? "font-extrabold" : "font-serif font-medium"}`}>{organic ? "Đủ tiện nghi để ở thật vui" : cinematic ? "Những chi tiết trong căn" : "Tiện nghi nổi bật"}</h3><div className={`mt-6 grid gap-3 sm:grid-cols-2 ${organic ? "gap-2" : ""}`}>{stay.amenities.map((item, index) => <span key={item} className={`flex items-center gap-3 py-3 text-sm ${organic ? "rounded-full bg-white px-4 font-bold shadow-sm" : "border-b border-current/10"}`}><span className={`${cinematic ? "text-[.6rem] font-bold text-[var(--template-accent)]" : ""}`}>{cinematic ? String(index + 1).padStart(2, "0") : <Check className="h-4 w-4 text-[var(--template-accent)]" />}</span>{item}</span>)}</div></div>
      <aside className={`h-fit border border-current/12 bg-[var(--template-surface)] p-6 lg:sticky lg:top-28 ${cinematic ? "shadow-[0_30px_90px_rgba(0,0,0,.28)]" : organic ? "rounded-[32px] shadow-[0_24px_70px_rgba(33,72,61,.12)]" : "rounded-t-[120px] px-7 pb-7 pt-20 shadow-xl"}`}><p className="text-xs opacity-50">Giá dự kiến từ</p><p className="mt-1 text-2xl font-bold">{formatCurrency(stay.basePrice)} <span className="text-xs font-medium opacity-45">/ đêm</span></p><div className="my-6 border-y border-current/10 py-5 text-sm"><p className="flex items-center gap-2"><House className="h-4 w-4 text-[var(--template-accent)]" />Thuê nguyên căn, không dùng chung</p><p className="mt-3 flex items-center gap-2"><Clock3 className="h-4 w-4 text-[var(--template-accent)]" />Giữ chỗ miễn phí trong 2 giờ</p></div><Link href={scoped(config.basePath, "dat-phong")} className={`flex min-h-13 w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-bold ${cinematic ? "bg-[#e5c59c] text-[#07130f]" : organic ? "bg-[#21483d] text-white" : "bg-[#19322c] text-white"}`}>Kiểm tra lịch căn này <ArrowRight className="h-4 w-4" /></Link><a href="tel:0900000000" className="mt-3 flex min-h-12 items-center justify-center gap-2 text-sm font-bold"><Phone className="h-4 w-4" />Gọi Lago tư vấn</a></aside>
    </section></>;
}

function ExperiencePage({ config }: { config: CompleteTemplateConfig }) {
  return <><PageIntro config={config} eyebrow="Một ngày tại Lago" title="Một ngày không cần lên kế hoạch quá nhiều." text="Lago chuẩn bị không gian. Phần còn lại, bạn có thể để thiên nhiên và cảm hứng dẫn đường." image={conceptImages.experience} />
    <section className="mx-auto w-[min(1120px,calc(100%-40px))] py-20 sm:py-28"><div className="border-t border-current/12">{experienceMoments.map(({ icon: Icon, time, title, text }, index) => <article key={time} className="grid gap-5 border-b border-current/12 py-8 sm:grid-cols-[70px_70px_1fr] sm:items-start"><span className="text-xs font-bold text-[var(--template-accent)]">0{index + 1}</span><span className="text-xs font-bold opacity-45">{time}</span><div><Icon className="mb-4 h-6 w-6 text-[var(--template-accent)]" /><h2 className="font-serif text-3xl font-medium">{title}</h2><p className="mt-3 max-w-2xl text-sm leading-7 opacity-58">{text}</p></div></article>)}</div></section>
    <section className="mx-auto mb-24 grid w-[min(1240px,calc(100%-28px))] gap-6 md:grid-cols-3">{stayPromises.map(({ icon: Icon, title, text }) => <article key={title} className="template-panel bg-[var(--template-surface)] p-7"><Icon className="h-7 w-7 text-[var(--template-accent)]" /><h3 className="mt-7 font-serif text-2xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 opacity-55">{text}</p></article>)}</section></>;
}

function GalleryPage({ config }: { config: CompleteTemplateConfig }) {
  const images = [...stays.flatMap((stay) => [stay.image, ...stay.gallery]), conceptImages.hero, conceptImages.experience];
  return <><PageIntro config={config} eyebrow="Nhật ký bằng hình" title="Những lát cắt của một kỳ nghỉ chậm." text="Bộ ảnh minh họa dùng để xác lập cảm xúc hình ảnh. Toàn bộ sẽ được thay hoặc duyệt trước khi Lago mở cửa." />
    <GalleryLightbox images={images} mood={config.mood} /></>;
}

function AboutPage({ config }: { config: CompleteTemplateConfig }) {
  return <><PageIntro config={config} eyebrow="Triết lý của Lago" title="Một nơi đủ xa để nghỉ, đủ gần để trở về." text="Lago bắt đầu từ mong muốn tạo ra những căn nhà nơi con người có thể dành trọn sự chú ý cho thiên nhiên và cho nhau." image={conceptImages.forest} />
    <section className="mx-auto grid w-[min(1240px,calc(100%-40px))] items-center gap-12 py-20 sm:py-28 lg:grid-cols-2"><div className="template-media relative aspect-[4/5] overflow-hidden"><Image src={conceptImages.detail2} alt="Câu chuyện Lago - ảnh minh họa" fill sizes="50vw" className="object-cover" /><span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[.58rem] font-bold uppercase text-[#17312b]">Ảnh minh họa</span></div><div className="lg:px-10"><Sparkles className="h-7 w-7 text-[var(--template-accent)]" /><p className="mt-7 font-serif text-4xl font-medium leading-[1.2] sm:text-5xl">“Một kỳ nghỉ tốt không cần quá nhiều thứ để làm. Chỉ cần đúng người, đúng không gian và đủ thời gian.”</p><div className="mt-8 space-y-5 text-sm leading-7 opacity-60"><p>Mỗi căn được hình dung như một ngôi nhà thực sự: có bếp để nấu, hiên để ngồi và những khoảng trống vừa đủ để tâm trí được thảnh thơi.</p><p>Lago ưu tiên sự riêng tư, vật liệu gần gũi và dịch vụ vừa đủ. Đội ngũ xuất hiện khi khách cần, rồi trả lại không gian cho kỳ nghỉ.</p></div></div></section></>;
}

function FaqPage({ config }: { config: CompleteTemplateConfig }) {
  return <><PageIntro config={config} eyebrow="Trước kỳ nghỉ" title="Thông tin rõ ràng để bạn nghỉ thật nhẹ lòng." text="Các câu trả lời ngắn gọn về đặt căn, thời gian giữ chỗ và trải nghiệm tại Lago." />
    <section className="mx-auto grid w-[min(1120px,calc(100%-40px))] gap-12 py-20 sm:py-28 lg:grid-cols-[.55fr_1fr]"><div><p className="font-serif text-3xl font-medium">Chưa thấy điều bạn cần?</p><p className="mt-4 text-sm leading-7 opacity-55">Gọi hoặc nhắn Zalo, đội ngũ Lago sẽ tư vấn theo nhu cầu của từng đoàn.</p><a href="tel:0900000000" className="mt-6 inline-flex items-center gap-2 font-bold"><Phone className="h-4 w-4" />0900 000 000</a></div><div className="border-t border-current/15">{showcaseFaqs.map(([question, answer]) => <details key={question} className="group border-b border-current/15 py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-bold"><span>{question}</span><Plus className="h-5 w-5 shrink-0 transition group-open:rotate-45" /></summary><p className="mt-4 max-w-2xl text-sm leading-7 opacity-58">{answer}</p></details>)}<Link href={scoped(config.basePath, "chinh-sach")} className="mt-8 inline-flex items-center gap-2 font-bold">Đọc chính sách lưu trú <ArrowRight className="h-4 w-4" /></Link></div></section></>;
}

function PolicyPage({ config }: { config: CompleteTemplateConfig }) {
  return <><PageIntro config={config} eyebrow="Chính sách lưu trú" title="Rõ ràng trước khi bắt đầu chuyến đi." text="Các nguyên tắc giúp Lago và khách lưu trú cùng có trải nghiệm minh bạch, nhẹ nhàng." />
    <section className="mx-auto w-[min(900px,calc(100%-40px))] py-20 sm:py-28">{policies.map(([title, text], index) => <article key={title} className="grid gap-4 border-b border-current/12 py-9 sm:grid-cols-[70px_1fr]"><span className="text-xs font-bold text-[var(--template-accent)]">0{index + 1}</span><div><h2 className="font-serif text-3xl font-medium">{title}</h2><p className="mt-4 text-sm leading-7 opacity-58">{text}</p></div></article>)}</section></>;
}

function ContactPage({ config }: { config: CompleteTemplateConfig }) {
  const cards = [[Phone, "Điện thoại", "0900 000 000", "tel:0900000000"], [Phone, "Zalo", "0900 000 000", "https://zalo.me/0900000000"], [MapPin, "Địa chỉ", "Sẽ được cập nhật", "#"]] as const;
  return <><PageIntro config={config} eyebrow="Trò chuyện cùng Lago" title="Chúng mình luôn sẵn sàng lắng nghe." text="Kết nối trực tiếp nếu bạn cần tư vấn chọn căn, ngày ở hoặc một yêu cầu đặc biệt." image={conceptImages.cloud} />
    <section className="mx-auto grid w-[min(1240px,calc(100%-40px))] gap-5 py-20 sm:py-28 md:grid-cols-3">{cards.map(([Icon, label, value, href]) => <a href={href} key={label} className="template-panel group border border-current/12 bg-[var(--template-surface)] p-7 transition hover:-translate-y-1"><Icon className="h-6 w-6 text-[var(--template-accent)]" /><p className="mt-10 text-[.62rem] font-bold uppercase tracking-[.16em] opacity-45">{label}</p><p className="mt-2 text-lg font-bold">{value}</p><ArrowRight className="mt-7 h-5 w-5 opacity-35 transition group-hover:translate-x-1 group-hover:opacity-100" /></a>)}</section></>;
}

function BookingPrelude({ config }: { config: CompleteTemplateConfig }) {
  if (config.mood === "cinematic") return <div className="relative overflow-hidden border-b border-white/10 bg-[#07130f] px-6 py-16 text-white sm:px-10 sm:py-20"><span aria-hidden="true" className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-[#e5c59c]/15" /><span aria-hidden="true" className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[#e5c59c]/5 blur-2xl" /><div className="relative mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1fr_.45fr] lg:items-end"><div><p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#e5c59c]">Chương tiếp theo · lịch trình của bạn</p><p className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[.92] tracking-[-.05em] sm:text-7xl">Chọn ngày cho<br /><i className="text-[#e5c59c]">thước phim Lago.</i></p></div><p className="max-w-md border-l border-[#e5c59c]/35 pl-5 text-sm leading-7 text-white/52">Kiểm tra lịch thật, xem giá dự kiến và giữ căn trong 2 giờ — không cần thanh toán ngay.</p></div></div>;

  if (config.mood === "organic") return <div className="relative overflow-hidden bg-[#dce9c6] px-5 py-14 text-[#21483d] sm:px-10 sm:py-[4.5rem]"><span aria-hidden="true" className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#f18b68]" /><span aria-hidden="true" className="absolute bottom-6 right-[24%] h-20 w-20 rounded-full bg-[#f7cf58]" /><div className="relative mx-auto max-w-[1240px]"><span className="inline-flex rounded-full bg-white px-4 py-2 text-[.62rem] font-extrabold uppercase tracking-[.13em] shadow-sm">3 bước · chưa cần thanh toán</span><div className="mt-7 grid gap-7 lg:grid-cols-[1fr_.42fr] lg:items-end"><p className="max-w-4xl text-5xl font-extrabold leading-[.98] tracking-[-.045em] sm:text-7xl">Chọn ngày đẹp.<br /><i className="font-serif font-medium text-[#e66e4c]">Lên lịch chuyến vui.</i></p><p className="max-w-md text-sm font-medium leading-7 opacity-58">Tìm căn hợp số người, xem giá rõ ràng rồi để Lago giữ chỗ trong lúc bạn bàn tiếp cùng cả nhóm.</p></div></div></div>;

  return <div className="border-b border-[#19322c]/12 bg-[#eee6da] px-6 py-16 text-[#19322c] sm:px-10 sm:py-20"><div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#a36349]">Lago ký sự · Lịch lưu trú</p><p className="mt-12 max-w-xs text-sm leading-7 opacity-55">Chọn một khoảng thời gian đủ rộng để nghỉ ngơi, rồi để Lago tìm căn phù hợp nhất.</p></div><p className="font-serif text-5xl font-medium leading-[.98] tracking-[-.05em] sm:text-7xl">Giữ lại một khoảng<br /><i>thật riêng cho bạn.</i></p></div></div>;
}

function BookingPage({ config }: { config: CompleteTemplateConfig }) {
  return <section className="min-h-screen bg-[var(--template-bg)] px-0 py-0 text-[#17312b] sm:px-4 sm:py-8"><div className={`mx-auto max-w-[1480px] overflow-hidden bg-[#fbfaf6] ${config.mood === "organic" ? "sm:rounded-[38px]" : config.mood === "cinematic" ? "border border-white/10" : "border border-[#19322c]/10"}`}><BookingPrelude config={config} /><Suspense fallback={<div className="container-lago py-24">Đang chuẩn bị lịch căn nhà…</div>}><BookingExperience lookupPath={scoped(config.basePath, "tra-cuu")} /></Suspense></div></section>;
}

function LookupPage({ config }: { config: CompleteTemplateConfig }) {
  return <section className="min-h-[75svh] bg-[var(--template-bg)] px-0 py-0 sm:px-4 sm:py-8"><div className={`mx-auto max-w-[1480px] bg-[#f6f1e8] py-16 text-[#17312b] sm:py-24 ${config.mood === "organic" ? "sm:rounded-[38px]" : config.mood === "cinematic" ? "border border-white/10" : "border border-[#19322c]/10"}`}><div className="container-lago grid gap-12 lg:grid-cols-[1fr_480px]"><div className="pt-5"><p className="eyebrow text-lago-clay">Thông tin chuyến đi</p><h1 className="display mt-4 text-5xl font-semibold sm:text-7xl">Xem lại đặt chỗ của bạn.</h1><p className="mt-6 max-w-xl leading-7 text-lago-ink/60">Chỉ cần nhập số điện thoại đã dùng khi đặt. Lago sẽ hiển thị các yêu cầu gần nhất gắn với số này.</p><div className="mt-8 rounded-2xl border border-lago-ink/10 bg-white/60 p-5 text-sm leading-6 text-lago-ink/58">Không cần nhớ mã đặt chỗ. Nếu cần hỗ trợ ngay, gọi <a href="tel:0900000000" className="font-bold underline underline-offset-4">0900 000 000</a>.</div></div><LookupForm /></div></div></section>;
}

function TemplateContent({ route, config }: { route: TemplateRoute; config: CompleteTemplateConfig }) {
  switch (route.kind) {
    case "stays": return <StaysPage config={config} />;
    case "stay": return <StayPage config={config} slug={route.slug} />;
    case "experience": return <ExperiencePage config={config} />;
    case "gallery": return <GalleryPage config={config} />;
    case "about": return <AboutPage config={config} />;
    case "faq": return <FaqPage config={config} />;
    case "policy": return <PolicyPage config={config} />;
    case "contact": return <ContactPage config={config} />;
    case "booking": return <BookingPage config={config} />;
    case "lookup": return <LookupPage config={config} />;
    default: return null;
  }
}

export function CompleteTemplateSite({ route, config, home }: { route: TemplateRoute; config: CompleteTemplateConfig; home: React.ReactNode }) {
  if (route.kind === "home") return home;
  const style = {
    "--template-bg": config.background,
    "--template-ink": config.ink,
    "--template-accent": config.accent,
    "--template-surface": config.surface
  } as React.CSSProperties;
  return <main style={style} className={`showcase-root min-h-screen bg-[var(--template-bg)] text-[var(--template-ink)] ${config.mood === "organic" ? "template-organic" : config.mood === "cinematic" ? "template-cinematic" : "template-editorial"}`}>
    <TemplateExperienceLayer mood={config.mood} />
    <ShowcaseSwitcher current={config.slug} />
    <TemplateHeader config={config} />
    <TemplateContent route={route} config={config} />
    <TemplateFooter config={config} />
  </main>;
}
