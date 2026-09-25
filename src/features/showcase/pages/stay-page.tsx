import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, House } from "lucide-react";
import { StayHero } from "@/features/showcase/components/stay-showcase";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";
import { getUnitsForStay, stays } from "@/features/stays/data/stay-catalog";
import { isConceptImage } from "@/features/showcase/data/laka-images";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { scoped } from "@/features/showcase/site/navigation";

export function StayPage({
  config,
  slug,
  locale,
}: {
  config: SiteConfig;
  slug: string;
  locale: ShowcaseLocale;
}) {
  const stay = localizeStay(stays.find((item) => item.slug === slug)!, locale);
  const units = getUnitsForStay(stay.id);
  const cinematic = config.mood === "cinematic";
  const organic = config.mood === "organic";
  const galleryGrid = cinematic
    ? "sm:grid-cols-12"
    : organic
      ? "sm:grid-cols-12"
      : "sm:grid-cols-3";
  const galleryShape = (index: number) => {
    if (cinematic)
      return index === 0
        ? "aspect-[4/3] sm:col-span-7"
        : index === 1
          ? "aspect-[4/5] sm:col-span-5"
          : "aspect-[16/7] sm:col-span-12";
    if (organic)
      return index === 0
        ? "aspect-[4/3] rounded-[70px_26px_70px_26px] sm:col-span-7"
        : index === 1
          ? "aspect-[4/5] rounded-[28px_72px_28px_72px] sm:col-span-5"
          : "aspect-[16/7] rounded-[44px] sm:col-span-12";
    return index === 0 ? "aspect-[4/5]" : "aspect-[4/3] sm:mt-12";
  };
  return (
    <>
      <StayHero mood={config.mood} basePath={config.basePath} stay={stay} locale={locale} />
      <section
        id="khong-gian"
        className={`laka-section-normal mx-auto grid scroll-mt-24 gap-12 lg:grid-cols-[1fr_360px] ${cinematic ? "w-[min(1420px,calc(100%-40px))] lg:grid-cols-[1fr_390px]" : "w-[min(1240px,calc(100%-40px))]"}`}
      >
        <div>
          <h2 className="laka-heading-section max-w-3xl">
            {locale === "en"
              ? "Inside the home"
              : cinematic
                ? "Bên trong khung hình"
                : organic
                  ? "Có gì trong nhà?"
                  : "Không gian của căn"}
          </h2>
          <p className="laka-section-lead mt-5 max-w-3xl opacity-72">{stay.longDescription}</p>
          <div className={`mt-12 grid gap-4 ${galleryGrid}`}>
            {stay.gallery.map((image, index) => (
              <div key={image} className={`group relative overflow-hidden ${galleryShape(index)}`}>
                <Image
                  src={image}
                  alt={`${stay.name} - ${locale === "en" ? `space ${index + 1}` : `góc không gian ${index + 1}`}`}
                  fill
                  sizes="(max-width:640px) 100vw, 55vw"
                  className={`object-cover transition duration-700 group-hover:scale-[1.025] ${cinematic ? "opacity-78 group-hover:opacity-100" : ""}`}
                />
                <span
                  className={`absolute bottom-3 left-3 px-3 py-1.5 text-[.56rem] font-bold uppercase tracking-wider ${cinematic ? "bg-black/55 text-white backdrop-blur" : "bg-white/88 text-[#16311c]"}`}
                >
                  {locale === "en" ? "Frame" : "Góc"} {String(index + 1).padStart(2, "0")}
                  {isConceptImage(image) ? ` · ${locale === "en" ? "concept" : "minh họa"}` : ""}
                </span>
              </div>
            ))}
          </div>
          <h3 className="laka-heading-card mt-14">
            {locale === "en"
              ? "Featured amenities"
              : organic
                ? "Đủ tiện nghi để ở thật vui"
                : cinematic
                  ? "Những chi tiết trong căn"
                  : "Tiện nghi nổi bật"}
          </h3>
          <div className={`mt-6 grid gap-3 sm:grid-cols-2 ${organic ? "gap-2" : ""}`}>
            {stay.amenities.map((item, index) => (
              <span
                key={item}
                className={`flex items-center gap-3 py-3 text-sm ${organic ? "rounded-full bg-white px-4 font-bold shadow-sm" : "border-b border-current/10"}`}
              >
                <span
                  className={`${cinematic ? "text-[.6rem] font-bold text-[var(--template-accent)]" : ""}`}
                >
                  {cinematic ? (
                    String(index + 1).padStart(2, "0")
                  ) : (
                    <Check className="h-4 w-4 text-[var(--template-accent)]" />
                  )}
                </span>
                {item}
              </span>
            ))}
          </div>
          <section className="mt-14 border-t border-current/12 pt-10">
            <div className="grid gap-5 sm:grid-cols-[1fr_.55fr] sm:items-start">
              <div>
                <p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[var(--template-accent)]">
                  {locale === "en"
                    ? "Physical homes in this type"
                    : "Các căn thực tế thuộc dòng này"}
                </p>
                <h3 className="laka-heading-card mt-4">
                  {locale === "en"
                    ? `${units.length} homes, each with its own position.`
                    : `${units.length} căn, mỗi căn có một vị trí riêng.`}
                </h3>
              </div>
              <p className="text-sm leading-7 opacity-60">
                {locale === "en"
                  ? "Units in the same type share an architectural direction. LAKA confirms the specific unit according to availability and your preference."
                  : "Các căn cùng dòng chia sẻ một định hướng kiến trúc. LAKA sẽ xác nhận căn cụ thể theo lịch trống và mong muốn của bạn."}
              </p>
            </div>
            <div className={`mt-7 grid gap-3 ${units.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {units.map((unit, index) => (
                <article
                  key={unit.id}
                  className={`border border-current/12 p-5 ${organic ? "rounded-[24px] bg-white" : "bg-[var(--template-surface)]"}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[.58rem] font-bold uppercase tracking-[.14em] text-[var(--template-accent)]">
                      {unit.code}
                    </span>
                    <span className="text-[.56rem] font-bold uppercase tracking-[.12em] opacity-45">
                      0{index + 1}
                    </span>
                  </div>
                  <h4 className="laka-heading-card mt-6">
                    {locale === "en" ? unit.nameEn : unit.name}
                  </h4>
                  <p className="mt-2 text-xs font-bold opacity-55">
                    {locale === "en" ? unit.positionEn : unit.position}
                  </p>
                  <p className="mt-4 text-sm leading-6 opacity-70">
                    {locale === "en" ? unit.characterEn : unit.character}
                  </p>
                </article>
              ))}
            </div>
          </section>
          <div className="mt-14 grid border-y border-current/12 sm:grid-cols-3">
            {[
              [locale === "en" ? "Best for" : "Phù hợp nhất", stay.idealFor],
              [locale === "en" ? "Included" : "Đã bao gồm", stay.included],
              [locale === "en" ? "Good to know" : "Cần biết", stay.stayNotes],
            ].map(([title, items], index) => (
              <section
                key={title as string}
                className={`py-7 sm:px-6 ${index < 2 ? "border-b border-current/12 sm:border-b-0 sm:border-r" : ""} sm:first:pl-0`}
              >
                <h3 className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[var(--template-accent)]">
                  {title as string}
                </h3>
                <ul className="mt-5 space-y-3">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 opacity-75">
                      <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--template-accent)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 opacity-55">
            {locale === "en"
              ? "Amenities and inclusions are illustrative and must be approved before launch."
              : "Tiện nghi và hạng mục bao gồm đang là dữ liệu minh họa, cần được duyệt trước khi mở bán."}
          </p>
        </div>
        <aside
          className={`h-fit border border-current/12 bg-[var(--template-surface)] p-6 lg:sticky lg:top-28 ${cinematic ? "shadow-[0_30px_90px_rgba(0,0,0,.28)]" : organic ? "rounded-[32px] shadow-[0_24px_70px_rgba(33,72,61,.12)]" : "rounded-t-[120px] px-7 pb-7 pt-20 shadow-xl"}`}
        >
          <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[var(--template-accent)]">
            {locale === "en" ? "A different way to stay" : "Một cách ở khác"}
          </p>
          <h2 className="laka-heading-card mt-4">
            {locale === "en"
              ? "A whole home, with room for your own rhythm."
              : "Một căn nhà trọn vẹn cho nhịp sống của riêng bạn."}
          </h2>
          <p className="mt-5 text-sm leading-7 opacity-65">
            {locale === "en"
              ? "Private living spaces, a distinct position in the landscape and the freedom to spend the day without a schedule."
              : "Không gian sinh hoạt riêng, một vị trí riêng trong cảnh quan và sự tự do để ngày trôi qua không cần lịch trình."}
          </p>
          <div className="my-7 border-y border-current/10 py-5 text-sm">
            <p className="flex items-center gap-2">
              <House className="h-4 w-4 text-[var(--template-accent)]" />
              {locale === "en"
                ? "A distinct LAKA accommodation type"
                : "Một dòng lưu trú riêng tại LAKA"}
            </p>
            <p className="mt-3 text-xs leading-6 opacity-55">
              {units.length}{" "}
              {locale === "en"
                ? "physical homes share this architectural language."
                : "căn thực tế cùng chung một ngôn ngữ kiến trúc."}
            </p>
          </div>
          <Link
            href={scoped(config.basePath, "trai-nghiem")}
            className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#16311c] px-5 py-4 text-sm font-bold text-white"
          >
            {locale === "en" ? "Experience a day at LAKA" : "Cảm nhận một ngày tại LAKA"}{" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={scoped(config.basePath, "luu-tru")}
            className="mt-3 flex min-h-12 items-center justify-center text-sm font-bold"
          >
            {locale === "en" ? "Return to all homes" : "Trở lại các căn nhà"}
          </Link>
        </aside>
      </section>
    </>
  );
}
