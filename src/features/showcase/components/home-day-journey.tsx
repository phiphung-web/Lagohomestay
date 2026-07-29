import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { lakaExperiences, specialMoments } from "@/features/showcase/data/laka-demo-content";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function HomeDayJourney({
  basePath = "",
  locale = "vi"
}: {
  basePath?: string;
  locale?: ShowcaseLocale;
}) {
  const en = locale === "en";
  const experiences = lakaExperiences.slice(0, 3);

  return (
    <section id="mot-ngay" className="scroll-mt-20 bg-[#0a1a13] px-5 py-24 text-white sm:px-8 sm:py-32">
      <div className="mx-auto w-[min(1480px,100%)]">
        <div className="grid gap-8 lg:grid-cols-[.4fr_1fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">
              {en ? "Experiences" : "Một ngày ở LAKA"}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/52">
              {en
                ? "Gentle invitations to move, notice and let the day unfold without a schedule."
                : "Những lời mời vừa đủ để chuyển động, quan sát và để một ngày tự nhiên diễn ra mà không cần lịch trình."}
            </p>
          </div>
          <h2 className="max-w-5xl font-serif text-[clamp(3.4rem,7.5vw,7.2rem)] font-medium leading-[.9] tracking-[-.06em]">
            {en ? (
              <>
                Let curiosity
                <br />
                <i className="text-[#dfc6a5]">set the pace.</i>
              </>
            ) : (
              <>
                Để sự tò mò
                <br />
                <i className="text-[#dfc6a5]">dẫn nhịp một ngày.</i>
              </>
            )}
          </h2>
        </div>

        <div
          role="group"
          tabIndex={0}
          aria-label={en ? "Experiences, scroll horizontally" : "Trải nghiệm, cuộn ngang"}
          className="focus-ring showcase-snap-rail mt-14 lg:grid lg:grid-cols-3 lg:gap-5"
        >
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <article
                key={experience.title.vi}
                className={`showcase-snap-card group ${index === 1 ? "lg:mt-24" : ""}`}
              >
                <div className="relative min-h-[62svh] overflow-hidden bg-[#10251d] lg:min-h-[720px]">
                  <Image
                    src={experience.image}
                    alt={`${en ? experience.title.en : experience.title.vi} — ${en ? "concept image" : "ảnh minh họa"}`}
                    fill
                    sizes="(max-width:1024px) 82vw, 33vw"
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

        <div className="mt-16 grid gap-10 border-t border-white/18 pt-10 lg:grid-cols-[.42fr_1fr] lg:gap-16">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">
              {en ? "Moments worth marking" : "Những dịp đáng ghi nhớ"}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/52">
              {en
                ? "Thoughtful support for the moments that matter, without taking the story away from you."
                : "Những chuẩn bị vừa đủ cho khoảnh khắc quan trọng, nhưng không bao giờ lấn át câu chuyện của bạn."}
            </p>
          </div>
          <div className="divide-y divide-white/16 border-y border-white/16">
            {specialMoments.slice(0, 3).map((moment, index) => {
              const Icon = moment.icon;
              return (
                <article
                  key={moment.title.vi}
                  className="grid gap-4 py-6 sm:grid-cols-[64px_1fr] sm:items-start sm:gap-6"
                >
                  <span className="flex items-center gap-3 text-[11px] font-bold tracking-[.14em] text-white/62">
                    {String(index + 1).padStart(2, "0")}
                    <Icon className="h-4 w-4 text-[#dfc6a5]" />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-medium sm:text-3xl">
                      {en ? moment.title.en : moment.title.vi}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">
                      {en ? moment.text.en : moment.text.vi}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          <Link
            href={`${basePath}/trai-nghiem`}
            className="focus-ring group inline-flex min-h-12 items-center gap-3 border-b border-white/32 text-xs font-bold uppercase tracking-[.12em]"
          >
            {en ? "See every experience" : "Xem toàn bộ trải nghiệm"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link
            href={`${basePath}/dich-vu`}
            className="focus-ring group inline-flex min-h-12 items-center gap-3 border-b border-white/32 text-xs font-bold uppercase tracking-[.12em]"
          >
            {en ? "Explore thoughtful services" : "Khám phá dịch vụ riêng"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
