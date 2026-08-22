import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { diningStories } from "@/features/showcase/data/laka-demo-content";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function HomeDiningPreview({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const en = locale === "en";
  const stories = diningStories.slice(0, 2);

  return (
    <section id="am-thuc" className="bg-[#f2ece2] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto w-[min(1380px,100%)]">
        <div className="grid gap-8 lg:grid-cols-[.42fr_1fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "Dining at LaKa" : "Ẩm thực tại LaKa"}</p>
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-[#16311c]/64 sm:text-base sm:leading-8">
              {en ? "Every flavour at LaKa is a pause to enjoy and reconnect. In the open valley, stay at the table a little longer." : "Mỗi hương vị tại LaKa đều là một khoảng nghỉ để tận hưởng và kết nối. Giữa thung lũng rộng mở, cứ ngồi lại lâu hơn một chút."}
            </p>
          </div>
          <h2 className="max-w-5xl font-serif text-[clamp(2.6rem,5.5vw,5.2rem)] font-medium leading-[.95] tracking-[-.045em]">
            {en ? <>Flavours that keep<br /><i className="text-[#9a7550]">the good times going.</i></> : <>Những hương vị<br /><i className="text-[#9a7550]">nối dài cuộc vui.</i></>}
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {stories.map((story, index) => (
            <article key={story.title.vi} className="group">
              <div className={`relative overflow-hidden bg-[#d8cdbd] ${index === 0 ? "aspect-[4/3]" : "aspect-[4/3] lg:mt-24"}`}>
                <Image src={story.image} alt={`${en ? story.title.en : story.title.vi} — ${en ? "concept image" : "ảnh minh họa"}`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition duration-1000 ease-out group-hover:scale-[1.025]" />
                <span className="absolute bottom-4 left-4 rounded-full bg-[#07150f]/55 px-3 py-1.5 text-[.52rem] font-bold uppercase tracking-[.14em] text-white/78 backdrop-blur">
                  {en ? "Concept image" : "Hình ảnh minh họa"}
                </span>
              </div>
              <div className="grid gap-4 border-b border-[#16311c]/16 py-7 sm:grid-cols-[1fr_.72fr]">
                <div>
                  <p className="text-[.58rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{en ? story.kicker.en : story.kicker.vi}</p>
                  <h3 className="mt-3 font-serif text-[1.75rem] font-medium leading-tight sm:text-[2.25rem]">{en ? story.title.en : story.title.vi}</h3>
                </div>
                <p className="text-[15px] leading-7 text-[#16311c]/68 sm:text-base sm:leading-8">{en ? story.text.en : story.text.vi}</p>
              </div>
            </article>
          ))}
        </div>

        <Link href={`${basePath}/am-thuc`} className="focus-ring group mt-10 inline-flex min-h-12 items-center gap-3 border-b border-[#16311c]/35 text-xs font-bold uppercase tracking-[.12em]">
          {en ? "Explore the spaces and menu" : "Khám phá không gian và danh mục món"}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
