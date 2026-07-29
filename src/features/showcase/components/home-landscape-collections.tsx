import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { stayZones } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

function zoneCopy(zone: (typeof stayZones)[number], locale: ShowcaseLocale) {
  return {
    name: locale === "en" ? zone.nameEn : zone.name,
    eyebrow: locale === "en" ? zone.eyebrowEn : zone.eyebrow,
    description: locale === "en" ? zone.descriptionEn : zone.description
  };
}

export function HomeLandscapeCollections({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const en = locale === "en";

  return (
    <section id="khong-gian" className="scroll-mt-20 border-y border-[#16311c]/12 bg-[#e3d8c9] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto w-[min(1480px,100%)]">
        <div className="grid gap-8 lg:grid-cols-[.42fr_1fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">
              {en ? "Stay with the landscape" : "Lưu trú cùng cảnh quan"}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#16311c]/58">
              {en
                ? "Each collection begins with the land already there: water, canopy or an open hillside."
                : "Mỗi hệ bắt đầu từ địa hình vốn có: mặt nước, tán rừng hoặc khoảng đồi nhiều ánh sáng."}
            </p>
          </div>
          <h2 className="max-w-5xl font-serif text-[clamp(3.2rem,7vw,6.8rem)] font-medium leading-[.92] tracking-[-.055em]">
            {en ? <>Choose the landscape<br /><i>that feels like yours.</i></> : <>Chọn một cảnh quan<br /><i>hợp với nhịp của mình.</i></>}
          </h2>
        </div>

        <div className="showcase-snap-rail mt-14 lg:grid lg:grid-cols-3 lg:gap-5">
          {stayZones.map((zone, index) => {
            const copy = zoneCopy(zone, locale);
            return (
              <Link
                key={zone.id}
                href={`${basePath}/luu-tru?khu=${zone.slug}`}
                className={`focus-ring showcase-snap-card group block ${index === 1 ? "lg:mt-24" : ""}`}
                aria-label={en ? `Explore ${copy.name}` : `Khám phá ${copy.name}`}
              >
                <div className="relative min-h-[62svh] overflow-hidden bg-[#10251d] lg:min-h-[760px]">
                  <Image
                    src={zone.image}
                    alt={`${copy.name} — ${en ? "concept image" : "hình ảnh minh họa"}`}
                    fill
                    sizes="(max-width:1024px) 82vw, 34vw"
                    className="object-cover transition duration-1000 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07150f]/82 via-[#07150f]/4 to-transparent" />
                  <span className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-[#f2ece2] text-[#16311c] transition duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#dfc6a5]">
                      {String(index + 1).padStart(2, "0")} · {copy.eyebrow}
                    </p>
                    <h3 className="mt-4 font-serif text-4xl font-medium sm:text-5xl">{copy.name}</h3>
                    <p className="mt-4 max-w-md text-sm leading-7 text-white/66">{copy.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
