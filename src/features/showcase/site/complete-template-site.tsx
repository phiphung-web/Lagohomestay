import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  Clock3,
  House,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  Phone,
  Plus,
  Ruler,
  Sparkles,
  Users,
  X
} from "lucide-react";
import { BookingExperience } from "@/features/booking/components/booking-experience";
import { LookupForm } from "@/features/booking/components/lookup-form";
import { ShowcaseSwitcher } from "@/features/showcase/components/showcase-switcher";
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
  ["Nội dung concept", "Hình ảnh, địa chỉ, giá và một số chính sách trong showroom là dữ liệu minh họa, chưa phải cam kết thương mại."]
];

function scoped(basePath: string, path = "") {
  return path ? `${basePath}/${path}` : basePath;
}

function TemplateHeader({ config }: { config: CompleteTemplateConfig }) {
  const organic = config.mood === "organic";
  const cinematic = config.mood === "cinematic";
  return <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${cinematic ? "border-white/10 bg-[#07130f]/88" : "border-black/10 bg-white/82"}`}>
    <div className="mx-auto flex h-[76px] w-[min(1420px,calc(100%-28px))] items-center justify-between gap-4">
      <Link href={config.basePath} className={`focus-ring flex items-center gap-2 ${organic ? "text-xl font-extrabold" : cinematic ? "text-sm font-extrabold uppercase tracking-[.22em]" : "font-serif text-3xl font-semibold tracking-[-.05em]"}`}>
        {organic && <span className="grid h-9 w-9 place-items-center rounded-full bg-[#21483d] text-white"><Leaf className="h-4 w-4" /></span>}
        Lago{organic ? "!" : cinematic ? "" : "."}
      </Link>
      <nav aria-label={`Điều hướng mẫu ${config.name}`} className="hidden items-center gap-6 text-[.68rem] font-bold uppercase tracking-[.12em] lg:flex">
        {navItems.map(([label, path]) => <Link key={path} href={scoped(config.basePath, path)} className="opacity-62 transition hover:opacity-100">{label}</Link>)}
      </nav>
      <div className="flex items-center gap-2">
        <Link href={scoped(config.basePath, "tra-cuu")} className="hidden min-h-10 items-center px-3 text-xs font-bold opacity-60 transition hover:opacity-100 sm:inline-flex">Tra cứu</Link>
        <Link href={scoped(config.basePath, "dat-phong")} className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-xs font-bold ${cinematic ? "bg-[#e5c59c] text-[#07130f]" : organic ? "bg-[#f18b68] text-[#17312b]" : "bg-[#19322c] text-white"}`}>
          <CalendarDays className="h-4 w-4" /> <span className="hidden sm:inline">Kiểm tra lịch</span><span className="sm:hidden">Đặt căn</span>
        </Link>
        <details className="group relative lg:hidden">
          <summary aria-label="Mở menu" className="focus-ring grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-current/15"><Menu className="h-5 w-5 group-open:hidden" /><X className="hidden h-5 w-5 group-open:block" /></summary>
          <nav className={`absolute right-0 top-14 w-[min(310px,calc(100vw-28px))] overflow-hidden rounded-3xl border p-3 shadow-2xl ${cinematic ? "border-white/12 bg-[#0b1b16]" : "border-black/10 bg-white"}`}>
            {navItems.map(([label, path]) => <Link key={path} href={scoped(config.basePath, path)} className="flex min-h-12 items-center justify-between rounded-2xl px-4 text-sm font-bold transition hover:bg-current/5">{label}<ArrowRight className="h-4 w-4 opacity-35" /></Link>)}
            <Link href={scoped(config.basePath, "lien-he")} className="mt-1 flex min-h-12 items-center justify-between rounded-2xl px-4 text-sm font-bold">Liên hệ<Phone className="h-4 w-4 opacity-40" /></Link>
          </nav>
        </details>
      </div>
    </div>
  </header>;
}

function TemplateFooter({ config }: { config: CompleteTemplateConfig }) {
  return <footer className="border-t border-current/12 pb-28 pt-14 sm:pb-32">
    <div className="mx-auto grid w-[min(1420px,calc(100%-40px))] gap-10 md:grid-cols-[1.1fr_.7fr_.7fr]">
      <div><Link href={config.basePath} className="font-serif text-3xl font-semibold">Lago.</Link><p className="mt-4 max-w-md text-sm leading-7 opacity-52">Bốn căn nhà riêng giữa thiên nhiên, cho những ngày mọi người muốn sống chậm và gần nhau hơn.</p><span className="mt-5 inline-flex rounded-full border border-current/15 px-3 py-1.5 text-[.6rem] font-bold uppercase tracking-wider opacity-55">Showroom · Mẫu {config.name}</span></div>
      <div><p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-42">Khám phá</p><div className="mt-5 flex flex-col gap-3 text-sm font-bold">{navItems.slice(0, 4).map(([label, path]) => <Link key={path} href={scoped(config.basePath, path)}>{label}</Link>)}</div></div>
      <div><p className="text-[.65rem] font-bold uppercase tracking-[.16em] opacity-42">Kết nối</p><div className="mt-5 flex flex-col gap-3 text-sm"><a href="tel:0900000000" className="font-bold">0900 000 000</a><a href="https://zalo.me/0900000000">Zalo đặt phòng</a><Link href={scoped(config.basePath, "chinh-sach")}>Chính sách</Link><span className="flex items-center gap-2 opacity-55"><Instagram className="h-4 w-4" /> @lagohomestay</span></div></div>
    </div>
  </footer>;
}

function PageIntro({ eyebrow, title, text, image, config }: { eyebrow: string; title: string; text: string; image?: string; config: CompleteTemplateConfig }) {
  const cinematic = config.mood === "cinematic";
  const organic = config.mood === "organic";
  return <section className={`relative overflow-hidden border-b border-current/10 ${image ? "min-h-[520px]" : ""}`}>
    {image && <><Image src={image} alt={`${title} - ảnh concept`} fill priority sizes="100vw" className={`object-cover ${cinematic ? "opacity-55" : "opacity-36"}`} /><div className={`absolute inset-0 ${cinematic ? "bg-gradient-to-r from-[#07130f] via-[#07130f]/55 to-transparent" : "bg-gradient-to-r from-[var(--template-bg)] via-[var(--template-bg)]/80 to-transparent"}`} /></>}
    <div className={`relative z-10 mx-auto flex w-[min(1420px,calc(100%-40px))] flex-col justify-center py-20 sm:py-28 ${image ? "min-h-[520px]" : ""}`}>
      <p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-[var(--template-accent)]">{eyebrow}</p>
      <h1 className={`mt-5 max-w-5xl leading-[.98] tracking-[-.045em] ${organic ? "text-5xl font-extrabold sm:text-7xl" : "font-serif text-5xl font-medium sm:text-7xl lg:text-8xl"}`}>{title}</h1>
      <p className="mt-6 max-w-2xl text-sm leading-7 opacity-60 sm:text-base">{text}</p>
    </div>
  </section>;
}

function StaysPage({ config }: { config: CompleteTemplateConfig }) {
  const organic = config.mood === "organic";
  return <><PageIntro config={config} eyebrow="The private collection" title="Bốn căn nhà, bốn nhịp nghỉ riêng." text="Chọn căn theo người đồng hành, số ngày ở và cách bạn muốn thức dậy mỗi sáng." image={conceptImages.detail1} />
    <section className="mx-auto w-[min(1420px,calc(100%-40px))] py-20 sm:py-28">
      <div className="grid gap-6 md:grid-cols-2">{stays.map((stay, index) => <Link href={scoped(config.basePath, `luu-tru/${stay.slug}`)} key={stay.id} className={`group overflow-hidden border border-current/10 bg-[var(--template-surface)] ${organic ? "rounded-[34px] p-3" : config.mood === "cinematic" ? "rounded-sm" : "rounded-t-[180px]"}`}>
        <div className={`relative overflow-hidden ${organic ? "aspect-[4/3] rounded-[26px]" : "aspect-[4/5]"}`}><Image src={stay.image} alt={`${stay.name} - ảnh concept`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[.58rem] font-bold uppercase tracking-wider text-[#17312b]">0{index + 1} · Ảnh concept</span></div>
        <div className="p-6 sm:p-7"><p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[var(--template-accent)]">{stay.location}</p><div className="mt-2 flex items-start justify-between gap-5"><h2 className={`${organic ? "text-3xl font-extrabold" : "font-serif text-4xl font-medium"}`}>{stay.name}</h2><ArrowRight className="mt-2 h-5 w-5 transition group-hover:translate-x-1" /></div><p className="mt-3 text-sm leading-6 opacity-55">{stay.description}</p><div className="mt-5 flex flex-wrap gap-4 border-t border-current/10 pt-4 text-xs font-bold opacity-65"><span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{stay.maxGuests} khách</span><span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" />{stay.bedrooms} phòng</span><span className="ml-auto">Từ {formatCurrency(stay.basePrice)}</span></div></div>
      </Link>)}</div>
    </section></>;
}

function StayPage({ config, slug }: { config: CompleteTemplateConfig; slug: string }) {
  const stay = stays.find((item) => item.slug === slug)!;
  return <><section className="relative min-h-[72svh] overflow-hidden"><Image src={stay.image} alt={`${stay.name} - ảnh concept`} fill priority sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/12 to-black/25" /><div className="relative z-10 mx-auto flex min-h-[72svh] w-[min(1420px,calc(100%-40px))] flex-col justify-end pb-12 text-white sm:pb-16"><Link href={scoped(config.basePath, "luu-tru")} className="mb-7 text-xs font-bold uppercase tracking-wider text-white/65">← Trở lại bộ sưu tập</Link><p className="text-[.65rem] font-bold uppercase tracking-[.2em] text-[#f0ca9b]">{stay.subtitle}</p><h1 className="mt-4 font-serif text-6xl font-medium leading-none tracking-[-.05em] sm:text-8xl">{stay.name}</h1><div className="mt-7 flex flex-wrap gap-5 text-xs font-bold text-white/75"><span className="flex items-center gap-2"><Users className="h-4 w-4" />{stay.maxGuests} khách</span><span className="flex items-center gap-2"><BedDouble className="h-4 w-4" />{stay.bedrooms} phòng ngủ</span><span className="flex items-center gap-2"><Bath className="h-4 w-4" />{stay.bathrooms} phòng tắm</span><span className="flex items-center gap-2"><Ruler className="h-4 w-4" />{stay.area} m²</span></div></div></section>
    <section className="mx-auto grid w-[min(1240px,calc(100%-40px))] gap-12 py-20 lg:grid-cols-[1fr_360px] lg:py-28"><div><p className="text-[.65rem] font-bold uppercase tracking-[.18em] text-[var(--template-accent)]">Không gian của căn</p><h2 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight sm:text-5xl">{stay.longDescription}</h2><div className="mt-12 grid gap-4 sm:grid-cols-3">{stay.gallery.map((image, index) => <div key={image} className={`relative overflow-hidden ${index === 0 ? "aspect-[4/5]" : "aspect-[4/3] sm:mt-12"}`}><Image src={image} alt={`${stay.name} - góc không gian ${index + 1}`} fill sizes="33vw" className="object-cover" /></div>)}</div><h3 className="mt-14 font-serif text-3xl font-medium">Tiện nghi nổi bật</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{stay.amenities.map((item) => <span key={item} className="flex items-center gap-3 border-b border-current/10 py-3 text-sm"><Check className="h-4 w-4 text-[var(--template-accent)]" />{item}</span>)}</div></div>
      <aside className="h-fit border border-current/12 bg-[var(--template-surface)] p-6 shadow-xl lg:sticky lg:top-28"><p className="text-xs opacity-50">Giá dự kiến từ</p><p className="mt-1 text-2xl font-bold">{formatCurrency(stay.basePrice)} <span className="text-xs font-medium opacity-45">/ đêm</span></p><div className="my-6 border-y border-current/10 py-5 text-sm"><p className="flex items-center gap-2"><House className="h-4 w-4 text-[var(--template-accent)]" />Thuê nguyên căn, không dùng chung</p><p className="mt-3 flex items-center gap-2"><Clock3 className="h-4 w-4 text-[var(--template-accent)]" />Giữ chỗ miễn phí trong 2 giờ</p></div><Link href={scoped(config.basePath, "dat-phong")} className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[var(--template-ink)] px-5 py-4 text-sm font-bold text-[var(--template-bg)]">Kiểm tra lịch căn này <ArrowRight className="h-4 w-4" /></Link><a href="tel:0900000000" className="mt-3 flex min-h-12 items-center justify-center gap-2 text-sm font-bold"><Phone className="h-4 w-4" />Gọi Lago tư vấn</a></aside>
    </section></>;
}

function ExperiencePage({ config }: { config: CompleteTemplateConfig }) {
  return <><PageIntro config={config} eyebrow="A day at Lago" title="Một ngày không cần lên kế hoạch quá nhiều." text="Lago chuẩn bị không gian. Phần còn lại, bạn có thể để thiên nhiên và cảm hứng dẫn đường." image={conceptImages.experience} />
    <section className="mx-auto w-[min(1120px,calc(100%-40px))] py-20 sm:py-28"><div className="border-t border-current/12">{experienceMoments.map(({ icon: Icon, time, title, text }, index) => <article key={time} className="grid gap-5 border-b border-current/12 py-8 sm:grid-cols-[70px_70px_1fr] sm:items-start"><span className="text-xs font-bold text-[var(--template-accent)]">0{index + 1}</span><span className="text-xs font-bold opacity-45">{time}</span><div><Icon className="mb-4 h-6 w-6 text-[var(--template-accent)]" /><h2 className="font-serif text-3xl font-medium">{title}</h2><p className="mt-3 max-w-2xl text-sm leading-7 opacity-58">{text}</p></div></article>)}</div></section>
    <section className="mx-auto mb-24 grid w-[min(1240px,calc(100%-28px))] gap-6 md:grid-cols-3">{stayPromises.map(({ icon: Icon, title, text }) => <article key={title} className="bg-[var(--template-surface)] p-7"><Icon className="h-7 w-7 text-[var(--template-accent)]" /><h3 className="mt-7 font-serif text-2xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 opacity-55">{text}</p></article>)}</section></>;
}

function GalleryPage({ config }: { config: CompleteTemplateConfig }) {
  const images = [...stays.flatMap((stay) => [stay.image, ...stay.gallery]), conceptImages.hero, conceptImages.experience];
  return <><PageIntro config={config} eyebrow="Visual journal" title="Những lát cắt của một kỳ nghỉ chậm." text="Bộ ảnh concept dùng để xác lập cảm xúc hình ảnh. Toàn bộ sẽ được thay hoặc duyệt trước khi Lago mở cửa." />
    <section className="mx-auto columns-1 gap-4 py-16 sm:w-[min(1420px,calc(100%-32px))] sm:columns-2 lg:columns-3">{images.map((src, index) => <figure key={`${src}-${index}`} className={`relative mb-4 break-inside-avoid overflow-hidden ${index % 4 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}><Image src={src} alt={`Lago Homestay - ảnh concept ${index + 1}`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 hover:scale-[1.025]" /><figcaption className="absolute bottom-3 left-3 rounded-full bg-black/52 px-3 py-1.5 text-[.58rem] font-bold uppercase tracking-wider text-white backdrop-blur">Concept · {String(index + 1).padStart(2, "0")}</figcaption></figure>)}</section></>;
}

function AboutPage({ config }: { config: CompleteTemplateConfig }) {
  return <><PageIntro config={config} eyebrow="Our philosophy" title="Một nơi đủ xa để nghỉ, đủ gần để trở về." text="Lago bắt đầu từ mong muốn tạo ra những căn nhà nơi con người có thể dành trọn sự chú ý cho thiên nhiên và cho nhau." image={conceptImages.forest} />
    <section className="mx-auto grid w-[min(1240px,calc(100%-40px))] items-center gap-12 py-20 sm:py-28 lg:grid-cols-2"><div className="relative aspect-[4/5] overflow-hidden"><Image src={conceptImages.detail2} alt="Câu chuyện Lago - ảnh concept" fill sizes="50vw" className="object-cover" /><span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[.58rem] font-bold uppercase text-[#17312b]">Ảnh concept</span></div><div className="lg:px-10"><Sparkles className="h-7 w-7 text-[var(--template-accent)]" /><p className="mt-7 font-serif text-4xl font-medium leading-[1.2] sm:text-5xl">“Một kỳ nghỉ tốt không cần quá nhiều thứ để làm. Chỉ cần đúng người, đúng không gian và đủ thời gian.”</p><div className="mt-8 space-y-5 text-sm leading-7 opacity-60"><p>Mỗi căn được hình dung như một ngôi nhà thực sự: có bếp để nấu, hiên để ngồi và những khoảng trống vừa đủ để tâm trí được thảnh thơi.</p><p>Lago ưu tiên sự riêng tư, vật liệu gần gũi và dịch vụ vừa đủ. Đội ngũ xuất hiện khi khách cần, rồi trả lại không gian cho kỳ nghỉ.</p></div></div></section></>;
}

function FaqPage({ config }: { config: CompleteTemplateConfig }) {
  return <><PageIntro config={config} eyebrow="Before your stay" title="Thông tin rõ ràng để bạn nghỉ thật nhẹ lòng." text="Các câu trả lời ngắn gọn về đặt căn, thời gian giữ chỗ và trải nghiệm tại Lago." />
    <section className="mx-auto grid w-[min(1120px,calc(100%-40px))] gap-12 py-20 sm:py-28 lg:grid-cols-[.55fr_1fr]"><div><p className="font-serif text-3xl font-medium">Chưa thấy điều bạn cần?</p><p className="mt-4 text-sm leading-7 opacity-55">Gọi hoặc nhắn Zalo, đội ngũ Lago sẽ tư vấn theo nhu cầu của từng đoàn.</p><a href="tel:0900000000" className="mt-6 inline-flex items-center gap-2 font-bold"><Phone className="h-4 w-4" />0900 000 000</a></div><div className="border-t border-current/15">{showcaseFaqs.map(([question, answer]) => <details key={question} className="group border-b border-current/15 py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-bold"><span>{question}</span><Plus className="h-5 w-5 shrink-0 transition group-open:rotate-45" /></summary><p className="mt-4 max-w-2xl text-sm leading-7 opacity-58">{answer}</p></details>)}<Link href={scoped(config.basePath, "chinh-sach")} className="mt-8 inline-flex items-center gap-2 font-bold">Đọc chính sách lưu trú <ArrowRight className="h-4 w-4" /></Link></div></section></>;
}

function PolicyPage({ config }: { config: CompleteTemplateConfig }) {
  return <><PageIntro config={config} eyebrow="Stay policy" title="Rõ ràng trước khi bắt đầu chuyến đi." text="Các nguyên tắc giúp Lago và khách lưu trú cùng có trải nghiệm minh bạch, nhẹ nhàng." />
    <section className="mx-auto w-[min(900px,calc(100%-40px))] py-20 sm:py-28">{policies.map(([title, text], index) => <article key={title} className="grid gap-4 border-b border-current/12 py-9 sm:grid-cols-[70px_1fr]"><span className="text-xs font-bold text-[var(--template-accent)]">0{index + 1}</span><div><h2 className="font-serif text-3xl font-medium">{title}</h2><p className="mt-4 text-sm leading-7 opacity-58">{text}</p></div></article>)}</section></>;
}

function ContactPage({ config }: { config: CompleteTemplateConfig }) {
  const cards = [[Phone, "Điện thoại", "0900 000 000", "tel:0900000000"], [Phone, "Zalo", "0900 000 000", "https://zalo.me/0900000000"], [MapPin, "Địa chỉ", "Sẽ được cập nhật", "#"]] as const;
  return <><PageIntro config={config} eyebrow="Talk to Lago" title="Chúng mình luôn sẵn sàng lắng nghe." text="Kết nối trực tiếp nếu bạn cần tư vấn chọn căn, ngày ở hoặc một yêu cầu đặc biệt." image={conceptImages.cloud} />
    <section className="mx-auto grid w-[min(1240px,calc(100%-40px))] gap-5 py-20 sm:py-28 md:grid-cols-3">{cards.map(([Icon, label, value, href]) => <a href={href} key={label} className="group border border-current/12 bg-[var(--template-surface)] p-7 transition hover:-translate-y-1"><Icon className="h-6 w-6 text-[var(--template-accent)]" /><p className="mt-10 text-[.62rem] font-bold uppercase tracking-[.16em] opacity-45">{label}</p><p className="mt-2 text-lg font-bold">{value}</p><ArrowRight className="mt-7 h-5 w-5 opacity-35 transition group-hover:translate-x-1 group-hover:opacity-100" /></a>)}</section></>;
}

function BookingPage({ config }: { config: CompleteTemplateConfig }) {
  return <section className="min-h-screen bg-[#fbfaf6] text-[#17312b]"><Suspense fallback={<div className="container-lago py-24">Đang chuẩn bị lịch căn nhà…</div>}><BookingExperience lookupPath={scoped(config.basePath, "tra-cuu")} /></Suspense></section>;
}

function LookupPage() {
  return <section className="min-h-[75svh] bg-[#f6f1e8] py-16 text-[#17312b] sm:py-24"><div className="container-lago grid gap-12 lg:grid-cols-[1fr_480px]"><div className="pt-5"><p className="eyebrow text-lago-clay">Thông tin chuyến đi</p><h1 className="display mt-4 text-5xl font-semibold sm:text-7xl">Xem lại đặt chỗ của bạn.</h1><p className="mt-6 max-w-xl leading-7 text-lago-ink/60">Chỉ cần nhập số điện thoại đã dùng khi đặt. Lago sẽ hiển thị các yêu cầu gần nhất gắn với số này.</p><div className="mt-8 rounded-2xl border border-lago-ink/10 bg-white/60 p-5 text-sm leading-6 text-lago-ink/58">Không cần nhớ mã booking. Nếu cần hỗ trợ ngay, gọi <a href="tel:0900000000" className="font-bold underline underline-offset-4">0900 000 000</a>.</div></div><LookupForm /></div></section>;
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
    case "lookup": return <LookupPage />;
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
    <ShowcaseSwitcher current={config.slug} />
    <TemplateHeader config={config} />
    <TemplateContent route={route} config={config} />
    <TemplateFooter config={config} />
  </main>;
}
