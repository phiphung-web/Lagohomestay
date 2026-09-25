import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cafeMenuPage } from "@/features/showcase/data/dining-menu";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function CafeMenu({ locale }: { locale: ShowcaseLocale }) {
  const en = locale === "en";
  const imageAlt = en
    ? "LAKA Coffee menu with drinks, snacks and prices; text in Vietnamese"
    : "Thực đơn LAKA Coffee với đồ uống, đồ ăn nhẹ và giá";

  return (
    <section
      id="thuc-don-ca-phe"
      aria-labelledby="cafe-menu-heading"
      className="scroll-mt-24 border-t border-[#16311c]/15 pt-12 sm:pt-16"
    >
      <header className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="laka-eyebrow text-[#80613f]">LAKA Coffee</p>
          <h2 id="cafe-menu-heading" className="laka-heading-section mt-3">
            {cafeMenuPage.title[locale]}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[#16311c]/65">
          {en
            ? "Menu text and prices are in Vietnamese. Open the original image to read more closely."
            : "Mở ảnh gốc để xem rõ tên món và giá."}
        </p>
      </header>

      <a
        href={cafeMenuPage.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={en ? "Open LAKA Coffee menu image" : "Mở ảnh thực đơn LAKA Coffee"}
        className="focus-ring block overflow-hidden rounded-2xl border border-[#16311c]/15 bg-[#eae1d2]"
      >
        <Image
          src={cafeMenuPage.src}
          alt={imageAlt}
          width={cafeMenuPage.width}
          height={cafeMenuPage.height}
          sizes="(max-width: 1280px) 100vw, 1280px"
          unoptimized
          className="h-auto w-full"
        />
      </a>
      <a
        href={cafeMenuPage.src}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#80613f] hover:text-[#16311c]"
      >
        {en ? "Open original image" : "Mở ảnh gốc"}
        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
      </a>
    </section>
  );
}
