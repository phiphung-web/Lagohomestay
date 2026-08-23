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
    <section id="gioi-thieu" className="laka-section-normal scroll-mt-20 bg-[#eae1d2] px-5 sm:px-8">
      <div className="mx-auto w-[min(1380px,100%)]">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-16">
          <div>
          <p className="laka-eyebrow text-[#80613f]">
            {en ? "Our mission" : "Sứ mệnh"}
          </p>
          <h2 className="laka-heading-section mt-6 max-w-5xl">
            {en ? "Preserving untouched beauty through every window, where the truest connections begin." : "Lưu giữ vẻ đẹp nguyên sơ qua từng khung kính, nơi khởi nguồn cho những kết nối chân thật nhất."}
          </h2>
          </div>
          <div>
          <p className="laka-body-muted mt-8 border-t border-[#16311c]/16 pt-7">
            {en
              ? "At LaKa, the valley's untouched beauty is preserved through every window — each cabin offers a view that brings you closer to nature. Yet LaKa is more than a place to look out from. Fulfilment lives in shared moments too: paddling together on the lake, a pickleball game filled with laughter, an unhurried pause beside the infinity pool or stories that linger by the BBQ. Amid untouched beauty, every moment brings us closer."
              : "Tại LaKa, vẻ đẹp nguyên sơ của thung lũng được lưu giữ qua từng khung kính — mỗi cabin là một góc nhìn để bạn chạm gần hơn vào thiên nhiên. Nhưng LaKa không chỉ là nơi để ngắm nhìn. Sự trọn vẹn còn nằm trong những khoảnh khắc cùng nhau: một nhịp chèo trên hồ, một trận pickleball đầy tiếng cười, phút thảnh thơi bên hồ vô cực hay câu chuyện kéo dài bên bếp BBQ. Giữa vẻ đẹp nguyên sơ, từng khoảnh khắc đưa ta gần nhau hơn."}
          </p>
          <Link href={`${basePath}/ve-laka`} className="focus-ring group mt-9 inline-flex min-h-12 items-center gap-3 border-b border-[#16311c]/35 text-xs font-bold uppercase tracking-[.12em]">
            {en ? "Read the full story" : "Đọc trọn câu chuyện"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-5">
          {storyImages.map((image, index) => (
            <figure key={image.src} className={`laka-media-frame group relative overflow-hidden bg-[#d8cdbd] ${image.className}`}>
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
