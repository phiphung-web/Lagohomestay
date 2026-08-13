import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bath, BedDouble, Users } from "lucide-react";
import { getUnitsForStay, getZoneForStay, stays } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { localizeStayZone } from "@/features/showcase/i18n/showcase-copy";

type Mood = "editorial" | "cinematic" | "organic";
type Stay = typeof stays[number];

function StayFacts({ stay, compact = false, locale = "vi" }: { stay: Stay; compact?: boolean; locale?: ShowcaseLocale }) {
  return <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold ${compact ? "opacity-55" : "opacity-72"}`}>
    <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{stay.maxGuests > 0 ? `${stay.maxGuests} ${locale === "en" ? "guests" : "khách"}` : (locale === "en" ? "Capacity pending" : "Đang xác nhận sức chứa")}</span>
    {stay.bedrooms > 0 && <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" />{stay.bedrooms} {locale === "en" ? "bedrooms" : "phòng"}</span>}
    {!compact && stay.bathrooms > 0 && <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" />{stay.bathrooms} {locale === "en" ? "bathrooms" : "phòng tắm"}</span>}
  </div>;
}

export function TemplateStayHero({ mood, basePath, stay, locale = "vi" }: { mood: Mood; basePath: string; stay: Stay; locale?: ShowcaseLocale }) {
  const backHref = `${basePath}/luu-tru`;
  const zone = localizeStayZone(getZoneForStay(stay), locale);
  const units = getUnitsForStay(stay.id);

  if (mood === "editorial") return <section className="relative min-h-[100svh] overflow-hidden bg-[#10251d] text-white">
    <Image src={stay.image} alt={`${stay.name} — ${locale === "en" ? "concept image" : "ảnh minh họa"}`} fill priority sizes="100vw" className="showcase-visual-media object-cover transition duration-[1400ms] hover:scale-[1.015]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,14,.22),rgba(5,18,14,.82))]" />
    <div className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1480px,calc(100%-40px))] flex-col justify-between pb-12 pt-28 sm:pb-16">
      <Link href={backHref} className="mt-4 w-fit rounded-full border border-white/25 bg-black/12 px-4 py-2 text-[.6rem] font-bold uppercase tracking-[.16em] backdrop-blur">← {locale === "en" ? "The collection" : "Bộ sưu tập căn"}</Link>
      <div><p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">{zone.name} · {stay.subtitle}</p><h1 className="mt-5 font-serif text-[clamp(4.2rem,14vw,12rem)] font-medium leading-[.76] tracking-[-.075em]">{stay.name}</h1><div className="mt-7 grid gap-7 border-t border-white/24 pt-6 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="max-w-xl text-sm leading-7 text-white/66">{stay.description}</p><div className="mt-5 flex flex-wrap items-center gap-4"><StayFacts stay={stay} locale={locale} /><span className="text-xs font-bold text-[#dfc6a5]">{units.length} {locale === "en" ? "physical homes" : "căn thực tế"} · {units.map((unit) => unit.code).join(" / ")}</span></div></div><a href="#khong-gian" className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#eae1d2] px-6 text-sm font-bold text-[#16311c]">{locale === "en" ? "Enter the space" : "Đi vào không gian"} <ArrowRight className="h-4 w-4" /></a></div></div>
    </div>
  </section>;

  if (mood === "organic") return <section className="overflow-hidden px-3 py-4 sm:px-5 sm:py-7">
    <div className="relative mx-auto grid min-h-[calc(78svh-76px)] w-[min(1420px,100%)] overflow-hidden rounded-[42px] border border-[#16311c]/8 bg-white shadow-[0_28px_90px_rgba(33,72,61,.1)] lg:grid-cols-[.78fr_1.22fr]">
      <span className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[#f7cf58]/75" />
      <div className="relative z-10 flex flex-col justify-center px-7 py-16 sm:px-12 lg:px-16"><Link href={backHref} className="text-[.62rem] font-extrabold uppercase tracking-[.14em] opacity-48">← Xem tất cả căn</Link><span className="mt-14 w-fit rounded-full bg-[#dce9c6] px-4 py-2 text-[.62rem] font-extrabold uppercase tracking-[.13em]">{stay.badge} · {stay.location}</span><h1 className="mt-6 text-[clamp(3.5rem,10vw,7rem)] font-extrabold leading-[.92] tracking-[-.055em]">{stay.name}</h1><p className="mt-6 max-w-xl text-sm font-medium leading-7 opacity-58">{stay.description}</p><div className="mt-7"><StayFacts stay={stay} /></div><div className="mt-9"><a href="#khong-gian" className="inline-flex min-h-13 items-center gap-3 rounded-full bg-[#16311c] px-6 text-sm font-extrabold text-white">Đi vào không gian <ArrowRight className="h-4 w-4" /></a></div></div>
      <div className="relative m-3 min-h-[500px] overflow-hidden rounded-[34px]"><Image src={stay.image} alt={`${stay.name} - ảnh minh họa`} fill priority sizes="(max-width:1024px) 100vw, 60vw" className="object-cover transition duration-1000 hover:scale-[1.02]" /><span className="absolute right-5 top-5 grid h-20 w-20 place-items-center rounded-full bg-[#f18b68] text-center text-[.58rem] font-extrabold uppercase tracking-wider">Ảnh<br />concept</span></div>
    </div>
  </section>;

  return <section className="grain relative min-h-[76svh] overflow-hidden"><Image src={stay.image} alt={`${stay.name} - ảnh minh họa`} fill priority sizes="100vw" className="object-cover opacity-72 transition duration-[1400ms] hover:scale-[1.015]" /><div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/18 to-black/35" /><div className="relative z-10 mx-auto flex min-h-[76svh] w-[min(1420px,calc(100%-40px))] flex-col justify-end pb-12 text-white sm:pb-16"><Link href={backHref} className="mb-10 text-[.62rem] font-bold uppercase tracking-[.2em] text-white/58">← Film index / Bộ sưu tập</Link><p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#c7a882]">Chương riêng · {stay.subtitle}</p><h1 className="mt-5 font-serif text-[clamp(4rem,13vw,9rem)] font-medium leading-[.84] tracking-[-.065em]">{stay.name}</h1><div className="mt-8 flex flex-wrap items-end justify-between gap-7 border-t border-white/18 pt-6"><StayFacts stay={stay} /><a href="#khong-gian" className="inline-flex min-h-12 items-center gap-2 text-sm font-bold text-[#c7a882]">Đi vào không gian <ArrowRight className="h-4 w-4" /></a></div></div>
  </section>;
}
