import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ShowcaseLink as Link } from "@/features/showcase/site/showcase-link";
import { localizeStayZone } from "@/features/showcase/i18n/showcase-copy";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { stayZones } from "@/features/stays/data/demo-data";

export function HomeLandscapeReveal({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const zones = stayZones.map((zone) => localizeStayZone(zone, locale));

  return <section id="he-canh-quan" className="scroll-mt-20 bg-[#0b2119] px-3 py-3 text-white sm:px-5 sm:py-5" aria-labelledby="landscape-reveal-title">
    <div className="mx-auto mb-8 flex w-[min(1480px,100%)] items-end justify-between gap-8 px-2 pt-12 sm:mb-10 sm:px-4 sm:pt-16">
      <div>
        <p className="text-[.6rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">{locale === "en" ? "Three ways into nature" : "Ba lối đi vào thiên nhiên"}</p>
        <h2 id="landscape-reveal-title" className="mt-5 max-w-5xl font-serif text-5xl font-medium leading-[.92] tracking-[-.05em] sm:text-7xl">{locale === "en" ? "Which landscape feels like yours?" : "Khung cảnh nào gọi tên bạn?"}</h2>
      </div>
      <p className="hidden max-w-xs text-sm leading-7 text-white/48 lg:block">{locale === "en" ? "Move across each landscape. Let the image answer before the details do." : "Lướt qua từng hệ cảnh quan. Hãy để hình ảnh trả lời trước những thông số."}</p>
    </div>

    <div className="mx-auto flex w-[min(1480px,100%)] flex-col gap-2 lg:h-[72svh] lg:min-h-[620px] lg:flex-row">
      {zones.map((zone, index) => <Link
        key={zone.id}
        href={`${basePath}/luu-tru#${zone.slug}`}
        className="group relative min-h-[58svh] flex-1 overflow-hidden rounded-[24px] transition-[flex] duration-700 ease-[cubic-bezier(.2,.72,.2,1)] focus-within:flex-[1.7] hover:flex-[1.7] lg:min-h-0"
      >
        <Image src={zone.image} alt={`${zone.name} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover opacity-72 transition duration-[1200ms] group-hover:scale-[1.035] group-hover:opacity-90" />
        <span className="absolute inset-0 bg-gradient-to-t from-[#06150f]/92 via-[#06150f]/8 to-[#06150f]/28" />
        <span className="relative flex h-full min-h-[58svh] flex-col justify-between p-5 sm:p-7 lg:min-h-0">
          <span className="flex items-center justify-between gap-5">
            <span className="text-[.58rem] font-bold uppercase tracking-[.18em] text-white/58">0{index + 1} · {zone.eyebrow}</span>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 bg-black/10 backdrop-blur transition duration-500 group-hover:rotate-45 group-hover:bg-[#eae1d2] group-hover:text-[#16311c]"><ArrowUpRight className="h-4 w-4" /></span>
          </span>
          <span>
            <strong className="font-serif text-[clamp(3.5rem,6vw,6.8rem)] font-medium leading-none tracking-[-.06em]">{zone.name}</strong>
            <span className="mt-5 block max-w-xl text-sm leading-7 text-white/60 opacity-100 transition duration-500 lg:translate-y-5 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">{zone.description}</span>
          </span>
        </span>
      </Link>)}
    </div>
    <p className="mx-auto w-[min(1480px,100%)] px-2 pb-10 pt-4 text-[.55rem] font-bold uppercase tracking-[.16em] text-white/34 sm:px-4">{locale === "en" ? "Concept imagery · all visuals require approval before launch" : "Hình ảnh minh họa · toàn bộ hình cần được duyệt trước khi mở bán"}</p>
  </section>;
}
