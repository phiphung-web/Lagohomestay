import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bath, BedDouble, Ruler, Users } from "lucide-react";
import { stays } from "@/features/stays/data/demo-data";
import { formatCurrency } from "@/shared/lib/format";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";

type Mood = "editorial" | "cinematic" | "organic";
type Stay = typeof stays[number];

function StayFacts({ stay, compact = false, locale = "vi" }: { stay: Stay; compact?: boolean; locale?: ShowcaseLocale }) {
  return <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold ${compact ? "opacity-55" : "opacity-72"}`}>
    <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{stay.maxGuests} {locale === "en" ? "guests" : "khách"}</span>
    <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" />{stay.bedrooms} {locale === "en" ? "bedrooms" : "phòng"}</span>
    {!compact && <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" />{stay.bathrooms} {locale === "en" ? "bathrooms" : "phòng tắm"}</span>}
  </div>;
}

export function TemplateStaysCollection({ mood, basePath, locale = "vi" }: { mood: Mood; basePath: string; locale?: ShowcaseLocale }) {
  const localizedStays = stays.map((stay) => localizeStay(stay, locale));
  if (mood === "cinematic") return <section className="mx-auto w-[min(1500px,calc(100%-40px))] py-20 sm:py-28">
    <div className="mb-8 flex items-end justify-between border-b border-white/12 pb-6"><div><p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#c7a882]">Film index · Chương 01—04</p><p className="mt-3 text-sm text-white/42">Chọn khung cảnh mở đầu cho chuyến đi.</p></div><span className="font-serif text-4xl text-white/18">04</span></div>
    <div>{localizedStays.map((stay, index) => <Link href={`${basePath}/luu-tru/${stay.slug}`} key={stay.id} className="group grid gap-5 border-b border-white/12 py-7 sm:grid-cols-[52px_1fr] lg:grid-cols-[64px_minmax(260px,.8fr)_minmax(300px,1fr)_190px] lg:items-center">
      <span className="text-xs font-bold tracking-[.18em] text-[#c7a882]/48">0{index + 1}</span>
      <div><p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-white/32">{stay.location}</p><h2 className="mt-2 font-serif text-4xl font-medium tracking-[-.045em] transition duration-300 group-hover:text-[#c7a882] sm:text-5xl">{stay.name}</h2><p className="mt-3 max-w-lg text-sm leading-6 text-white/45">{stay.subtitle}</p></div>
      <div className="relative aspect-[16/9] overflow-hidden lg:order-none"><Image src={stay.image} alt={`${stay.name} - ảnh minh họa`} fill sizes="(max-width:1024px) 100vw, 36vw" className="object-cover opacity-68 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100" /><span className="absolute inset-0 border border-white/10" /></div>
      <div className="flex items-end justify-between gap-4 lg:block lg:text-right"><StayFacts stay={stay} compact locale={locale} /><p className="mt-4 text-sm font-bold text-[#c7a882]">{locale === "en" ? "From" : "Từ"} {formatCurrency(stay.basePrice)}</p><ArrowRight className="mt-5 ml-auto hidden h-5 w-5 transition group-hover:translate-x-1 lg:block" /></div>
    </Link>)}</div>
  </section>;

  if (mood === "organic") return <section className="mx-auto w-[min(1380px,calc(100%-28px))] py-20 sm:py-28">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">{localizedStays.map((stay, index) => {
      const wide = index === 0 || index === 3;
      return <Link href={`${basePath}/luu-tru/${stay.slug}`} key={stay.id} className={`group overflow-hidden rounded-[36px] border border-[#17321d]/8 bg-white p-3 shadow-[0_20px_60px_rgba(33,72,61,.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(33,72,61,.14)] ${wide ? "lg:col-span-7" : "lg:col-span-5"}`}>
        <div className={`relative overflow-hidden rounded-[28px] ${wide ? "aspect-[16/10]" : "aspect-[4/3]"}`}><Image src={stay.image} alt={`${stay.name} - ảnh minh họa`} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover transition duration-700 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-[#f7cf58] px-3 py-1.5 text-[.58rem] font-extrabold uppercase tracking-wider">0{index + 1} · {stay.badge}</span></div>
        <div className="p-3 pb-4 pt-5"><div className="flex items-start justify-between gap-5"><div><p className="text-[.62rem] font-extrabold uppercase tracking-[.14em] text-[#e66e4c]">{stay.location}</p><h2 className="mt-2 text-3xl font-extrabold tracking-[-.045em] sm:text-4xl">{stay.name}</h2></div><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#dce9c6] transition group-hover:rotate-12 group-hover:bg-[#f7cf58]"><ArrowRight className="h-5 w-5" /></span></div><p className="mt-3 max-w-xl text-sm leading-6 opacity-55">{stay.description}</p><div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[#17321d]/10 pt-4"><StayFacts stay={stay} compact locale={locale} /><span className="ml-auto text-xs font-extrabold">{locale === "en" ? "From" : "Từ"} {formatCurrency(stay.basePrice)}</span></div></div>
      </Link>;
    })}</div>
  </section>;

  return <section className="mx-auto w-[min(1320px,calc(100%-40px))] py-20 sm:py-28">
    <div className="mb-12 grid gap-5 border-b border-[#17321d]/15 pb-8 sm:grid-cols-[1fr_auto] sm:items-end"><p className="max-w-xl font-serif text-3xl font-medium leading-tight">Một catalogue nhỏ cho những khoảng riêng giữa thiên nhiên.</p><span className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#80613f]">Bộ sưu tập · 01—04</span></div>
    <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">{localizedStays.map((stay, index) => <Link href={`${basePath}/luu-tru/${stay.slug}`} key={stay.id} className={`group ${index % 2 ? "md:mt-24" : ""}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[200px] bg-[#ded5c8]"><Image src={stay.image} alt={`${stay.name} - ảnh minh họa`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition duration-1000 group-hover:scale-[1.03]" /><span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-[#faf3ea]/92 text-[.62rem] font-bold">0{index + 1}</span></div>
      <div className="grid gap-5 border-b border-[#17321d]/15 py-6 sm:grid-cols-[1fr_auto]"><div><p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{stay.location}</p><h2 className="mt-2 font-serif text-4xl font-medium tracking-[-.045em] sm:text-5xl">{stay.name}</h2><p className="mt-3 max-w-lg text-sm leading-6 opacity-52">{stay.description}</p><div className="mt-5"><StayFacts stay={stay} compact locale={locale} /></div></div><div className="flex items-end justify-between gap-4 sm:block sm:text-right"><p className="text-[.58rem] uppercase tracking-wider opacity-42">{locale === "en" ? "Per night from" : "Mỗi đêm từ"}</p><p className="mt-1 text-sm font-bold">{formatCurrency(stay.basePrice)}</p><ArrowRight className="mt-8 ml-auto h-5 w-5 transition group-hover:translate-x-1" /></div></div>
    </Link>)}</div>
  </section>;
}

export function TemplateStayHero({ mood, basePath, stay, locale = "vi" }: { mood: Mood; basePath: string; stay: Stay; locale?: ShowcaseLocale }) {
  const backHref = `${basePath}/luu-tru`;
  const bookingHref = mood === "editorial"
    ? `${basePath}/dat-phong?stay=${stay.slug}`
    : `${basePath}/dat-phong`;

  if (mood === "editorial") return <section className="border-b border-[#17321d]/12 bg-[#e7ded1]">
    <div className="mx-auto grid min-h-[calc(82svh-76px)] w-[min(1420px,calc(100%-40px))] gap-10 py-10 lg:grid-cols-[.72fr_1.28fr] lg:items-stretch lg:py-14">
      <div className="flex flex-col justify-center py-8"><Link href={backHref} className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#80613f]">← {locale === "en" ? "Back to the collection" : "Trở lại bộ sưu tập"}</Link><p className="mt-16 text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{stay.subtitle}</p><h1 className="mt-5 font-serif text-[clamp(3.6rem,10vw,7.5rem)] font-medium leading-[.86] tracking-[-.06em]">{stay.name}</h1><p className="mt-7 max-w-md text-sm leading-7 opacity-58">{stay.description}</p><div className="mt-7"><StayFacts stay={stay} locale={locale} /></div><Link href={bookingHref} className="mt-9 inline-flex min-h-13 w-fit items-center gap-3 rounded-full bg-[#17321d] px-6 text-sm font-bold text-white">{locale === "en" ? "Check this home" : "Kiểm tra lịch căn này"} <ArrowRight className="h-4 w-4" /></Link></div>
      <div className="relative min-h-[520px] overflow-hidden rounded-t-[260px]"><Image src={stay.image} alt={`${stay.name} - ${locale === "en" ? "concept image" : "ảnh minh họa"}`} fill priority sizes="(max-width:1024px) 100vw, 60vw" className="object-cover transition duration-[1200ms] hover:scale-[1.015]" /><span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#faf3ea]/94 px-4 py-2 text-[.58rem] font-bold uppercase tracking-wider">{locale === "en" ? "Concept image" : "Ảnh minh họa"}</span></div>
    </div>
  </section>;

  if (mood === "organic") return <section className="overflow-hidden px-3 py-4 sm:px-5 sm:py-7">
    <div className="relative mx-auto grid min-h-[calc(78svh-76px)] w-[min(1420px,100%)] overflow-hidden rounded-[42px] border border-[#17321d]/8 bg-white shadow-[0_28px_90px_rgba(33,72,61,.1)] lg:grid-cols-[.78fr_1.22fr]">
      <span className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[#f7cf58]/75" />
      <div className="relative z-10 flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-16"><Link href={backHref} className="text-[.62rem] font-extrabold uppercase tracking-[.14em] opacity-48">← Xem tất cả căn</Link><span className="mt-14 w-fit rounded-full bg-[#dce9c6] px-4 py-2 text-[.62rem] font-extrabold uppercase tracking-[.13em]">{stay.badge} · {stay.location}</span><h1 className="mt-6 text-[clamp(3.5rem,10vw,7rem)] font-extrabold leading-[.92] tracking-[-.055em]">{stay.name}</h1><p className="mt-6 max-w-xl text-sm font-medium leading-7 opacity-58">{stay.description}</p><div className="mt-7"><StayFacts stay={stay} /></div><div className="mt-9 flex flex-wrap gap-3"><Link href={bookingHref} className="inline-flex min-h-13 items-center gap-3 rounded-full bg-[#17321d] px-6 text-sm font-extrabold text-white">Xem lịch trống <ArrowRight className="h-4 w-4" /></Link><a href="tel:0900000000" className="inline-flex min-h-13 items-center rounded-full border-2 border-[#17321d]/14 px-6 text-sm font-extrabold">Hỏi LAKA</a></div></div>
      <div className="relative m-3 min-h-[500px] overflow-hidden rounded-[34px]"><Image src={stay.image} alt={`${stay.name} - ảnh minh họa`} fill priority sizes="(max-width:1024px) 100vw, 60vw" className="object-cover transition duration-1000 hover:scale-[1.02]" /><span className="absolute right-5 top-5 grid h-20 w-20 place-items-center rounded-full bg-[#f18b68] text-center text-[.58rem] font-extrabold uppercase tracking-wider">Nhà<br />nguyên căn</span></div>
    </div>
  </section>;

  return <section className="grain relative min-h-[76svh] overflow-hidden"><Image src={stay.image} alt={`${stay.name} - ảnh minh họa`} fill priority sizes="100vw" className="object-cover opacity-72 transition duration-[1400ms] hover:scale-[1.015]" /><div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-black/35" /><div className="relative z-10 mx-auto flex min-h-[76svh] w-[min(1420px,calc(100%-40px))] flex-col justify-end pb-12 text-white sm:pb-16"><Link href={backHref} className="mb-10 text-[.62rem] font-bold uppercase tracking-[.2em] text-white/58">← Film index / Bộ sưu tập</Link><p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#c7a882]">Chương riêng · {stay.subtitle}</p><h1 className="mt-5 font-serif text-[clamp(4rem,13vw,9rem)] font-medium leading-[.84] tracking-[-.065em]">{stay.name}</h1><div className="mt-8 flex flex-wrap items-end justify-between gap-7 border-t border-white/18 pt-6"><StayFacts stay={stay} /><div className="text-right"><p className="text-[.58rem] uppercase tracking-wider text-white/45">Giá dự kiến từ</p><p className="mt-1 text-lg font-bold text-[#c7a882]">{formatCurrency(stay.basePrice)} / đêm</p></div></div></div>
  </section>;
}
