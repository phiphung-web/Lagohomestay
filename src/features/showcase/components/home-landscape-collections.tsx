"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { stayZones } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

function zoneCopy(zone: (typeof stayZones)[number], locale: ShowcaseLocale) {
  return {
    name: locale === "en" ? zone.nameEn : zone.name,
    eyebrow: locale === "en" ? zone.eyebrowEn : zone.eyebrow,
    description: locale === "en" ? zone.descriptionEn : zone.description,
    experience: locale === "en" ? zone.experienceEn : zone.experience
  };
}

export function HomeLandscapeCollections({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeZone = stayZones[activeIndex];
  const activeCopy = zoneCopy(activeZone, locale);
  const staysHref = `${basePath}/luu-tru?khu=${activeZone.slug}`;

  return (
    <section id="khong-gian" className="border-y border-[#16311c]/12 bg-[#e3d8c9] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto w-[min(1420px,100%)]">
        <div className="grid gap-8 lg:grid-cols-[.42fr_1fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">
              {locale === "en" ? "Three landscape collections" : "Ba hệ cảnh quan"}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#16311c]/58">
              {locale === "en"
                ? "Rather than placing homes on the land, each collection begins with the landscape already there."
                : "Thay vì đặt những căn nhà lên cảnh quan, mỗi hệ bắt đầu từ chính địa hình, ánh sáng và nhịp sống vốn có."}
            </p>
          </div>
          <h2 className="max-w-5xl font-serif text-[clamp(3.2rem,7vw,6.8rem)] font-medium leading-[.92] tracking-[-.055em]">
            {locale === "en" ? <>Choose the landscape<br /><i>that feels like yours.</i></> : <>Chọn một cảnh quan<br /><i>hợp với nhịp của mình.</i></>}
          </h2>
        </div>

        <div className="mt-14 grid overflow-hidden border border-[#16311c]/14 bg-[#eae1d2] lg:min-h-[690px] lg:grid-cols-[1.12fr_.88fr]">
          <div className="relative min-h-[58svh] overflow-hidden bg-[#10251d] lg:min-h-0">
            {stayZones.map((zone, index) => {
              const copy = zoneCopy(zone, locale);
              return (
                <Image
                  key={zone.id}
                  src={zone.image}
                  alt={`${copy.name} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`}
                  fill
                  sizes="(max-width:1024px) 100vw, 56vw"
                  className={`object-cover transition-[opacity,transform] duration-700 ${
                    index === activeIndex ? "scale-100 opacity-100" : "pointer-events-none scale-[1.025] opacity-0"
                  }`}
                />
              );
            })}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07150f]/72 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6 text-white sm:bottom-8 sm:left-8 sm:right-8">
              <div>
                <p className="text-[.58rem] font-bold uppercase tracking-[.18em] text-white/58">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(stayZones.length).padStart(2, "0")}
                </p>
                <p className="mt-2 font-serif text-4xl font-medium sm:text-5xl">{activeCopy.name}</p>
              </div>
              <span className="hidden rounded-full border border-white/25 bg-black/15 px-4 py-2 text-[.56rem] font-bold uppercase tracking-[.14em] text-white/72 backdrop-blur sm:inline-flex">
                {locale === "en" ? "Concept image" : "Hình ảnh minh họa"}
              </span>
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-9 lg:p-12">
            <div role="group" aria-label={locale === "en" ? "Landscape collections" : "Các hệ cảnh quan"} className="border-t border-[#16311c]/14">
              {stayZones.map((zone, index) => {
                const copy = zoneCopy(zone, locale);
                const active = index === activeIndex;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`focus-ring group flex min-h-20 w-full items-center gap-5 border-b border-[#16311c]/14 px-1 text-left transition ${
                      active ? "text-[#16311c]" : "text-[#16311c]/46 hover:text-[#16311c]"
                    }`}
                  >
                    <span className={`text-[.58rem] font-bold tracking-[.14em] transition ${active ? "text-[#80613f]" : ""}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-serif text-2xl font-medium sm:text-3xl">{copy.name}</span>
                    <ArrowRight className={`h-4 w-4 transition ${active ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-10" aria-live="polite">
              <p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{activeCopy.eyebrow}</p>
              <p className="mt-4 max-w-lg text-base leading-8 text-[#16311c]/66">{activeCopy.description}</p>
              <p className="mt-5 border-l border-[#80613f]/55 pl-4 text-sm leading-7 text-[#16311c]/52">{activeCopy.experience}</p>
              <Link href={staysHref} className="focus-ring group mt-8 inline-flex min-h-12 items-center gap-3 border-b border-[#16311c]/35 text-xs font-bold uppercase tracking-[.12em]">
                {locale === "en" ? `Explore ${activeCopy.name}` : `Khám phá ${activeCopy.name}`}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
