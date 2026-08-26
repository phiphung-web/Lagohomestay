import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const stayCollections = [
  {
    title: { vi: "Nhà Bên Hồ", en: "Lakeside House" },
    subtitle: { vi: "Khoảng Nghỉ Ven Hồ", en: "A Pause by the Water" },
    image: conceptImages.hero
  },
  {
    title: { vi: "Nhà Trên Đồi", en: "Hill House" },
    subtitle: { vi: "Tụ Họp Giữa Lưng Đồi", en: "Gathering on the Hillside" },
    image: conceptImages.hill
  },
  {
    title: { vi: "Nhà Giữa Rừng", en: "Forest House" },
    subtitle: { vi: "Ôm trọn bình yên", en: "Embracing Quietude" },
    image: conceptImages.forest
  }
] as const;

export function HomeLandscapeCollections({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const en = locale === "en";

  return (
    <section id="luu-tru" className="laka-section-normal scroll-mt-20 bg-gradient-to-b from-[#e7ded0] via-[#dfd4c3] to-[#e8dfd2] px-5 sm:px-8">
      <div className="mx-auto w-[min(1380px,100%)]">
        {/* Balanced Header layout matching other sections */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#16311c]/15 pb-8 sm:pb-10">
          <div>
            <h2 className="laka-home-section-title text-[#16311c]">
              {en ? "Stays" : "Lưu Trú"}
            </h2>
          </div>
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#16311c] md:text-right shrink-0">
            {en ? (
              <>A green sanctuary,<br className="hidden md:inline" /> <i className="text-[#80613f]">a rhythm of your own.</i></>
            ) : (
              <>Một khoảng xanh,<br className="hidden md:inline" /> <i className="text-[#80613f]">một nhịp riêng.</i></>
            )}
          </p>
        </header>

        {/* 3 Stay Cards with Horizontal Scroll on Mobile and Grid on Desktop */}
        <div
          className="mt-10 sm:mt-14 flex overflow-x-auto gap-4 sm:gap-6 snap-x snap-mandatory scrollbar-none pb-5 lg:pb-0 lg:grid lg:grid-cols-3 lg:gap-7 scroll-smooth"
          aria-label={en ? "LAKA stay collections" : "Ba nhóm lưu trú tại LAKA"}
          role="group"
          tabIndex={0}
        >
          {stayCollections.map((item) => (
            <Link
              key={item.title.vi}
              href={basePath + "/luu-tru"}
              className="shrink-0 w-[78vw] sm:w-[350px] lg:w-auto snap-start group relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#10251d] focus-ring block"
            >
              <Image
                src={item.image}
                alt={item.title[locale] + " — " + (en ? "concept image" : "hình ảnh minh họa")}
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 360px, 33vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
              />

              {/* Bottom Subtle Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent pointer-events-none" />

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg border border-white/40 transition-all duration-300 group-hover:bg-white group-hover:translate-y-[-2px]">
                <h3 className="font-bold text-lg sm:text-xl text-[#16311c] tracking-tight">
                  {item.title[locale]}
                </h3>
                <p className="text-xs sm:text-sm text-[#80613f] font-medium mt-1">
                  {item.subtitle[locale]}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Action Link */}
        <div className="mt-10 flex justify-start sm:mt-12">
          <Link
            href={basePath + "/luu-tru"}
            className="focus-ring group inline-flex min-h-12 items-center gap-3 border-b border-[#16311c]/35 pb-1 text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#16311c] hover:border-[#16311c] transition-all"
          >
            {en ? "Explore all stays" : "Khám phá toàn bộ không gian lưu trú"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
