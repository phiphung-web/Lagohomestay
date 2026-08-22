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
    <section id="mot-ngay" className="scroll-mt-20 bg-[#0a1a13] px-5 py-24 text-white sm:px-8 sm:py-32">
      <div className="mx-auto w-[min(1480px,100%)]">
        <div className="grid gap-8 lg:grid-cols-[.4fr_1fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">
              {en ? "A day at LaKa" : "Một ngày ở LaKa"}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/52">
              {en
                ? "A day at LaKa moves from lively fun to unhurried moments in nature. Explore together, give it everything and take home memories worth keeping."
                : "Một ngày ở LaKa là hành trình nối dài từ những cuộc vui rộn ràng đến phút thảnh thơi giữa thiên nhiên. Cùng nhau khám phá, cùng nhau hết mình và gom về những kỷ niệm thật đáng nhớ!"}
            </p>
          </div>
          <h2 className="max-w-5xl font-serif text-[clamp(3.4rem,7.5vw,7.2rem)] font-medium leading-[.9] tracking-[-.06em]">
            {en ? (
              <>Today is<br /><i className="text-[#dfc6a5]">just for fun!</i></>
            ) : (
              <>Hôm nay chỉ để<br /><i className="text-[#dfc6a5]">vui thôi!</i></>
            )}
          </h2>
        </div>

        <div
          role="group"
          tabIndex={0}
          aria-label={en ? "Experiences, scroll horizontally" : "Trải nghiệm, cuộn ngang"}
          className="focus-ring showcase-snap-rail mt-14 lg:grid lg:grid-cols-4 lg:gap-4"
        >
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <article
                key={experience.title.vi}
                className={`showcase-snap-card group ${index % 2 === 1 ? "lg:mt-20" : ""}`}
              >
                <div className="relative min-h-[62svh] overflow-hidden bg-[#10251d] lg:min-h-[720px]">
                  <Image
                    src={experience.image}
                    alt={`${en ? experience.title.en : experience.title.vi} — ${en ? "concept image" : "ảnh minh họa"}`}
                    fill
                    sizes="(max-width:1024px) 82vw, 25vw"
                    className="object-cover transition duration-1000 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07150f]/88 via-transparent to-[#07150f]/12" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-[.16em] text-white/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon className="h-5 w-5 text-[#dfc6a5]" />
                    </div>
                    <p className="mt-5 text-[.58rem] font-bold uppercase tracking-[.16em] text-[#dfc6a5]">
                      {en ? experience.meta.en : experience.meta.vi}
                    </p>
                    <h3 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">
                      {en ? experience.title.en : experience.title.vi}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/64">
                      {en ? experience.text.en : experience.text.vi}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/18 pt-8">
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
