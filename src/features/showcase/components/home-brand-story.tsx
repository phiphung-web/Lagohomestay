import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const storyImages = [conceptImages.detail1, conceptImages.forest, conceptImages.table] as const;

export function HomeBrandStory({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const en = locale === "en";

  return (
    <section id="gioi-thieu" className="laka-section-normal scroll-mt-20 bg-[#eae1d2] px-5 sm:px-8">
      <div className="mx-auto w-[min(1380px,100%)]">
        <header className="grid gap-6 border-b border-[#16311c]/15 pb-10 lg:grid-cols-[.24fr_1fr] lg:gap-12 lg:pb-12">
          <p className="laka-eyebrow pt-1 text-[#80613f]">
            {en ? "Our mission" : "Sứ mệnh"}
          </p>
          <h2 className="max-w-5xl font-serif text-[clamp(1.95rem,3.6vw,3.75rem)] font-medium leading-[1.04] tracking-[-.035em]">
            {en
              ? "Preserving untouched beauty through every window, where the truest connections begin."
              : "Lưu giữ vẻ đẹp nguyên sơ qua từng khung kính, nơi khởi nguồn cho những kết nối chân thật nhất."}
          </h2>
        </header>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-16">
          <div className="laka-media-frame grid h-[min(58svh,440px)] grid-cols-[1.15fr_.85fr] grid-rows-2 gap-2.5 overflow-hidden sm:h-[min(64svh,560px)] sm:gap-4">
            {storyImages.map((src, index) => (
              <figure
                key={src}
                className={`group relative overflow-hidden bg-[#d8cdbd] ${index === 0 ? "row-span-2" : ""}`}
              >
                <Image
                  src={src}
                  alt={en ? `A fragment of life at LAKA — concept image ${index + 1}` : `Một lát cắt cuộc sống tại LAKA — ảnh minh họa ${index + 1}`}
                  fill
                  sizes={index === 0 ? "(max-width:1024px) 58vw, 42vw" : "(max-width:1024px) 42vw, 30vw"}
                  className="object-cover transition duration-1000 ease-out group-hover:scale-[1.025]"
                />
              </figure>
            ))}
          </div>

          <div className="lg:pl-2">
            <p className="laka-body-muted max-w-xl">
              {en
                ? "At LaKa, every cabin is a view that brings you closer to nature. Amid untouched beauty, every shared moment brings us closer."
                : "Tại LaKa, mỗi cabin là một góc nhìn để bạn chạm gần hơn vào thiên nhiên. Giữa vẻ đẹp nguyên sơ, từng khoảnh khắc đưa ta gần nhau hơn."}
            </p>
            <p className="mt-6 text-[.58rem] font-bold uppercase tracking-[.16em] text-[#80613f]">
              {en ? "Concept imagery · awaiting LAKA's official library" : "Hình ảnh minh họa · chờ bộ ảnh chính thức từ LAKA"}
            </p>
            <Link href={`${basePath}/ve-laka`} className="focus-ring group mt-8 inline-flex min-h-12 items-center gap-3 border-b border-[#16311c]/35 text-xs font-bold uppercase tracking-[.12em]">
              {en ? "Read the full story" : "Đọc trọn câu chuyện"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
