import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { stays } from "@/features/stays/data/demo-data";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function HomeStaySpotlight({
  basePath,
  locale = "vi"
}: {
  basePath: string;
  locale?: ShowcaseLocale;
}) {
  const en = locale === "en";
  const featured = ["lago-house", "nha-rung", "nha-may"]
    .map((slug) => stays.find((stay) => stay.slug === slug))
    .filter((stay): stay is (typeof stays)[number] => Boolean(stay))
    .map((stay) => localizeStay(stay, locale));
  const heroStay = featured[0];
  if (!heroStay) return null;

  return (
    <section id="luu-tru-noi-bat" className="relative min-h-[92svh] scroll-mt-20 overflow-hidden bg-[#0b1d16] text-white">
      <Image
        src={heroStay.image}
        alt={`${heroStay.name} — ${en ? "concept image" : "hình ảnh minh họa"}`}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,18,14,.93)_0%,rgba(5,18,14,.68)_43%,rgba(5,18,14,.16)_76%),linear-gradient(180deg,rgba(5,18,14,.18),rgba(5,18,14,.72))]" />

      <div className="relative z-10 mx-auto flex min-h-[92svh] w-[min(1460px,calc(100%-40px))] flex-col justify-between py-20 sm:w-[min(1460px,calc(100%-64px))] sm:py-24 lg:py-28">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">
            {en ? "04 — The homes" : "04 — Những căn nhà"}
          </p>
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-white/62">
            {en ? "Concept imagery · project in development" : "Hình ảnh concept · dự án đang hoàn thiện"}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_.68fr] lg:items-end">
          <div>
            <h2 className="max-w-5xl font-serif text-[clamp(3rem,8vw,8rem)] font-medium leading-[.84] tracking-[-.065em]">
              {en ? (
                <>
                  A home for
                  <br />
                  <i className="text-[#dfc6a5]">your own rhythm.</i>
                </>
              ) : (
                <>
                  Một căn nhà
                  <br />
                  <i className="text-[#dfc6a5]">cho nhịp của riêng mình.</i>
                </>
              )}
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
              {en
                ? "Eight home types are arranged across Lake, Forest and Hill—each shaped around a different way of being close to nature and to one another."
                : "Tám dòng nhà trải trên Hệ Hồ, Hệ Rừng và Hệ Đồi — mỗi căn mở ra một cách khác để sống gần thiên nhiên và gần nhau hơn."}
            </p>
          </div>

          <div className="border-y border-white/22">
            {featured.map((stay, index) => (
              <Link
                key={stay.id}
                href={`${basePath}/luu-tru/${stay.slug}`}
                className="focus-ring group flex min-h-20 items-center justify-between gap-5 border-b border-white/16 py-4 last:border-b-0"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="text-[11px] font-bold tracking-[.14em] text-white/62">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-2xl font-medium sm:text-3xl">{stay.name}</span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] font-bold uppercase tracking-[.12em] text-white/62">
                      <Users className="h-3.5 w-3.5" />
                      <span className="min-w-0 break-words">
                        {stay.maxGuests} {en ? "guests" : "khách"}
                        {stay.highlights[0] ? ` · ${stay.highlights[0]}` : ""}
                      </span>
                    </span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 transition duration-300 group-hover:translate-x-1.5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/22 pt-6">
          <p className="max-w-md text-xs leading-6 text-white/64">
            {en
              ? "Open the full collection to compare every home without leaving the page."
              : "Mở bộ sưu tập đầy đủ để xem và so sánh từng căn ngay trên cùng một trang."}
          </p>
          <Link
            href={`${basePath}/luu-tru`}
            className="focus-ring group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#eae1d2] px-6 text-sm font-bold text-[#16311c]"
          >
            {en ? "Explore all homes" : "Khám phá toàn bộ căn"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
