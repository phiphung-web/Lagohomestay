import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { diningStories } from "@/features/showcase/data/laka-demo-content";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function HomeDiningPreview({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const en = locale === "en";
  const stories = diningStories.slice(0, 2);

  return (
    <section id="am-thuc" className="laka-section-normal bg-[#f2ece2] px-5 sm:px-8">
      <div className="mx-auto w-[min(1380px,100%)]">
        {/* Header with balanced layout on desktop and mobile */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#16311c]/15 pb-8 sm:pb-10">
          <div className="max-w-xl">
            <h2 className="laka-home-section-title text-[#16311c]">{en ? "Dining" : "Ẩm thực"}</h2>
            <p className="laka-body-muted mt-3 text-sm sm:text-base">
              {en
                ? "Every flavour at LaKa is a pause to enjoy and reconnect. In the open valley, stay at the table a little longer."
                : "Mỗi hương vị tại LaKa đều là một khoảng nghỉ để tận hưởng và kết nối. Giữa thung lũng rộng mở, cứ ngồi lại lâu hơn một chút."}
            </p>
          </div>
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#16311c] md:text-right shrink-0">
            {en ? (
              <>Flavours that keep<br className="hidden md:inline" /> <i className="text-[#80613f]">the good times going.</i></>
            ) : (
              <>Những hương vị<br className="hidden md:inline" /> <i className="text-[#80613f]">nối dài cuộc vui.</i></>
            )}
          </p>
        </header>

        {/* 2 Dining Space Cards */}
        <div className="mt-10 sm:mt-12 grid gap-8 sm:gap-10 md:grid-cols-2">
          {stories.map((story) => (
            <article key={story.title.vi} className="group flex flex-col">
              <div className="laka-media-frame relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl bg-[#d8cdbd]">
                <Image
                  src={story.image}
                  alt={`${en ? story.title.en : story.title.vi} — ${en ? "concept image" : "ảnh minh họa"}`}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover transition duration-1000 ease-out group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-[#07150f]/55 px-3 py-1.5 text-[.52rem] font-bold uppercase tracking-[.14em] text-white/78 backdrop-blur">
                  {en ? "Concept image" : "Hình ảnh minh họa"}
                </span>
              </div>
              <div className="mt-5 border-b border-[#16311c]/16 pb-6">
                <h3 className="laka-heading-card text-xl sm:text-2xl font-bold text-[#16311c]">
                  {en ? story.title.en : story.title.vi}
                </h3>
                <p className="laka-body-muted mt-2.5 text-sm sm:text-base leading-relaxed">
                  {en ? story.text.en : story.text.vi}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-start">
          <Link
            href={`${basePath}/am-thuc`}
            className="focus-ring group inline-flex min-h-12 items-center gap-3 border-b border-[#16311c]/35 text-xs font-bold uppercase tracking-[.12em]"
          >
            {en ? "Explore the spaces and menu" : "Khám phá không gian và danh mục món"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
