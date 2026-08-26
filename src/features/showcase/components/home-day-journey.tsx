import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { lakaExperiences } from "@/features/showcase/data/laka-demo-content";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function HomeDayJourney({
  basePath = "",
  locale = "vi"
}: {
  basePath?: string;
  locale?: ShowcaseLocale;
}) {
  const en = locale === "en";
  const experiences = lakaExperiences.slice(0, 4);

  return (
    <section id="mot-ngay" className="laka-section-normal scroll-mt-20 bg-gradient-to-b from-[#0e2118] via-[#0a1a13] to-[#0d1e16] px-5 text-white sm:px-8">
      <div className="mx-auto w-[min(1480px,100%)]">
        {/* Balanced Header layout */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/14 pb-8 sm:pb-10">
          <div>
            <h2 className="laka-home-section-title text-[#dfc6a5]">
              {en ? "A day at LaKa" : "Một ngày ở LaKa"}
            </h2>
          </div>
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight md:text-right shrink-0">
            {en ? (
              <>Today is <i className="text-[#dfc6a5]">just for fun!</i></>
            ) : (
              <>Hôm nay chỉ để <i className="text-[#dfc6a5]">vui thôi!</i></>
            )}
          </p>
        </header>

        <div
          role="group"
          tabIndex={0}
          aria-label={en ? "Experiences, scroll horizontally" : "Trải nghiệm, cuộn ngang"}
          className="focus-ring showcase-snap-rail mt-10 sm:mt-14 lg:grid lg:grid-cols-4 lg:gap-4"
        >
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <article
                key={experience.title.vi}
                className="showcase-snap-card group"
              >
                <div className="laka-media-frame relative h-[min(580px,75svh)] overflow-hidden rounded-xl sm:rounded-2xl bg-[#10251d]">
                  <Image
                    src={experience.image}
                    alt={`${en ? experience.title.en : experience.title.vi} — ${en ? "concept image" : "ảnh minh họa"}`}
                    fill
                    sizes="(max-width:1024px) 82vw, 25vw"
                    className="object-cover transition duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07150f]/90 via-[#07150f]/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-[.16em] text-white/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon className="h-5 w-5 text-[#dfc6a5]" />
                    </div>
                    <p className="mt-4 text-[.58rem] font-bold uppercase tracking-[.16em] text-[#dfc6a5]">
                      {en ? experience.meta.en : experience.meta.vi}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-medium leading-tight sm:text-3xl text-white">
                      {en ? experience.title.en : experience.title.vi}
                    </h3>
                    <p className="laka-body mt-3 text-white/70 text-sm">
                      {en ? experience.text.en : experience.text.vi}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/18 pt-8">
          <Link
            href={`${basePath}/trai-nghiem`}
            className="focus-ring group inline-flex min-h-12 items-center gap-3 border-b border-white/32 text-xs font-bold uppercase tracking-[.12em]"
          >
            {en ? "See every experience" : "Xem toàn bộ trải nghiệm"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
