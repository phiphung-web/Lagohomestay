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
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "Dining at LAKA" : "Ẩm thực tại LAKA"}</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#16311c]/58">
              {en ? "Not a formal restaurant ritual, but warm food placed in the middle for everyone to share." : "Không phải một nghi thức nhà hàng cầu kỳ, mà là món ăn ấm được đặt giữa bàn để mọi người cùng sẻ chia."}
            </p>
          </div>
          <h2 className="max-w-5xl font-serif text-[clamp(3.2rem,7vw,6.8rem)] font-medium leading-[.92] tracking-[-.055em]">
            {en ? <>A meal becomes part<br /><i className="text-[#9a7550]">of the memory.</i></> : <>Một bữa ăn cũng trở thành<br /><i className="text-[#9a7550]">một phần ký ức.</i></>}
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
                  <h3 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">{en ? story.title.en : story.title.vi}</h3>
                </div>
                <p className="text-sm leading-7 text-[#16311c]/58">{en ? story.text.en : story.text.vi}</p>
              </div>
            </article>
          ))}
        </div>

        <Link href={`${basePath}/am-thuc`} className="focus-ring group mt-10 inline-flex min-h-12 items-center gap-3 border-b border-[#16311c]/35 text-xs font-bold uppercase tracking-[.12em]">
          {en ? "Explore the dining story" : "Khám phá câu chuyện ẩm thực"}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
