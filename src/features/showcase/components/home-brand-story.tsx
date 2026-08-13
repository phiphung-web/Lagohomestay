import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const storyImages = [
  { src: conceptImages.detail1, className: "aspect-[3/4]" },
  { src: conceptImages.forest, className: "aspect-[3/4]" },
  { src: conceptImages.table, className: "col-span-2 aspect-[16/10]" }
] as const;

export function HomeBrandStory({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const en = locale === "en";

  return (
    <section id="gioi-thieu" className="scroll-mt-20 bg-[#eae1d2] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid w-[min(1380px,100%)] gap-14 lg:grid-cols-[.78fr_1.22fr] lg:items-start lg:gap-20">
        <div className="lg:sticky lg:top-32">
          <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">
            {en ? "The LAKA mark" : "Dấu ấn LAKA"}
          </p>
          <h2 className="mt-6 max-w-2xl font-serif text-[clamp(3.2rem,6.5vw,6.5rem)] font-medium leading-[.92] tracking-[-.055em]">
            {en ? <>Choose a cabin.<br /><i className="text-[#9a7550]">Hold the whole valley.</i></> : <>“Chọn” Cabin.<br /><i className="text-[#9a7550]">“Trọn” Thung Lũng.</i></>}
          </h2>
          <div className="mt-9 grid gap-6 border-t border-[#16311c]/16 pt-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <p className="text-base leading-8 text-[#16311c]/68">
              {en
                ? "At LAKA, the valley's untouched beauty is held in every window frame, letting each cabin bring you closer to nature."
                : "Tại LAKA, vẻ đẹp nguyên sơ của thung lũng được lưu giữ qua từng khung kính — mỗi cabin là một góc nhìn để bạn chạm gần hơn vào thiên nhiên."}
            </p>
            <p className="text-base leading-8 text-[#16311c]/68">
              {en
                ? "The fullest moments happen together: a paddle on the lake, a lively game, a quiet pause by the pool or a story that carries on beside the barbecue."
                : "Sự trọn vẹn còn nằm trong những khoảnh khắc cùng nhau: một nhịp chèo trên hồ, một trận pickleball đầy tiếng cười, phút thảnh thơi bên hồ bơi hay câu chuyện kéo dài bên bếp BBQ."}
            </p>
          </div>
          <Link href={`${basePath}/ve-laka`} className="focus-ring group mt-9 inline-flex min-h-12 items-center gap-3 border-b border-[#16311c]/35 text-xs font-bold uppercase tracking-[.12em]">
            {en ? "Read the full story" : "Đọc trọn câu chuyện"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {storyImages.map((image, index) => (
            <figure key={image.src} className={`group relative overflow-hidden bg-[#d8cdbd] ${image.className}`}>
              <Image
                src={image.src}
                alt={en ? `A fragment of life at LAKA — concept image ${index + 1}` : `Một lát cắt cuộc sống tại LAKA — ảnh minh họa ${index + 1}`}
                fill
                sizes={index === 2 ? "(max-width:1024px) 100vw, 62vw" : "(max-width:1024px) 50vw, 31vw"}
                className="object-cover transition duration-1000 ease-out group-hover:scale-[1.025]"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-[#07150f]/55 px-3 py-1.5 text-[.52rem] font-bold uppercase tracking-[.14em] text-white/78 backdrop-blur">
                {en ? "Concept image" : "Hình ảnh minh họa"}
              </span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
