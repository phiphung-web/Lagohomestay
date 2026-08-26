import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { GalleryLightbox } from "@/features/showcase/components/gallery-lightbox";
import { HomeBrandStory } from "@/features/showcase/components/home-brand-story";
import { HomeDayJourney } from "@/features/showcase/components/home-day-journey";
import { HomeDiningPreview } from "@/features/showcase/components/home-dining-preview";
import { HomeGuestStories } from "@/features/showcase/components/home-guest-stories";
import { HomeLandscapeCollections } from "@/features/showcase/components/home-landscape-collections";
import { TemplateExperienceLayer } from "@/features/showcase/components/template-experience-layer";
import { TemplateDocumentLocale } from "@/features/showcase/components/template-document-locale";
import { conceptImages } from "@/features/stays/data/demo-data";
import { TemplateFooter, TemplateHeader, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import { SkipLink } from "@/shared/components/ui/skip-link";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const memoryImages = [
  conceptImages.detail1,
  conceptImages.forest,
  conceptImages.hill,
  conceptImages.hero,
  conceptImages.cloud,
  conceptImages.detail2,
  conceptImages.breakfast,
  conceptImages.dining,
  conceptImages.table
];

export function MainHome({ config, locale = "vi" }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale }) {
  const en = locale === "en";
  const heroHeadline = en ? "Choose a cabin - Hold the whole valley" : '"Chọn" Cabin - "Trọn" Thung Lũng';
  const [heroFirstLine, heroSecondLine] = heroHeadline.split(" - ");

  return <div className="showcase-root min-h-screen bg-[#eae1d2] text-[#16311c]">
    <TemplateDocumentLocale locale={locale} />
    <SkipLink label={en ? "Skip navigation" : "Bỏ qua điều hướng"} />
    <TemplateExperienceLayer mood="editorial" />
    <TemplateHeader config={config} locale={locale} overlay />

    <main id="noi-dung-chinh" tabIndex={-1}>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#10251d] text-white">
        <Image
          src={conceptImages.hero}
          alt={en ? "A quiet home surrounded by nature — concept image" : "Một ngôi nhà tĩnh lặng giữa thiên nhiên — hình ảnh minh họa"}
          fill
          priority
          sizes="100vw"
          className="showcase-visual-media object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,14,.24),rgba(5,18,14,.08)_38%,rgba(5,18,14,.8))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,18,14,.5),transparent_64%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1500px,calc(100%-32px))] flex-col justify-end pb-16 pt-36 sm:w-[min(1500px,calc(100%-56px))] sm:pb-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dfc6a5] sm:text-sm md:text-base mb-3 sm:mb-4 drop-shadow-sm">
            {en ? "LAKA - A home in the green" : "LAKA - Nhà giữa khoảng xanh"}
          </p>
          <h1 className="laka-display-hero max-w-6xl">
            <span className="block sm:inline">{heroFirstLine}<span className="sm:hidden"> -</span></span>
            <span className="hidden sm:inline"> - </span>
            <span className="block sm:inline">{heroSecondLine}</span>
          </h1>
          <div className="mt-8 flex items-end justify-between gap-8 border-t border-white/22 pt-6">
            <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-white/68">
              {en ? "Trung Gia · Hanoi" : "Trung Giã · Hà Nội"}
            </p>
            <a href="#gioi-thieu" className="focus-ring group hidden items-center gap-3 text-[.6rem] font-bold uppercase tracking-[.18em] text-white/65 sm:flex">
              {en ? "Discover LAKA" : "Khám phá LAKA"}
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 transition group-hover:translate-y-1 group-hover:bg-white group-hover:text-[#16311c]"><ArrowDown className="h-4 w-4" /></span>
            </a>
          </div>
        </div>
      </section>

      <HomeBrandStory basePath={config.basePath} locale={locale} />
      <HomeLandscapeCollections basePath={config.basePath} locale={locale} />
      <HomeDiningPreview basePath={config.basePath} locale={locale} />
      <HomeDayJourney basePath={config.basePath} locale={locale} />

      <section id="ky-uc" className="laka-section-normal scroll-mt-20 bg-gradient-to-b from-[#ebe3d6] via-[#f2ece2] to-[#e8decb] px-5 sm:px-8">
        <div className="mx-auto w-[min(1380px,100%)]">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#16311c]/15 pb-8 sm:pb-10">
            <div>
              <h2 className="laka-home-section-title text-[#16311c]">{en ? "Memory gallery" : "Thư viện ký ức"}</h2>
            </div>
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#16311c] md:text-right shrink-0">
              {en ? (
                <>Frames to keep<br className="hidden md:inline" /> <i className="text-[#80613f]">the days worth remembering.</i></>
              ) : (
                <>Những khung hình lưu lại<br className="hidden md:inline" /> <i className="text-[#80613f]">một ngày thật đáng nhớ.</i></>
              )}
            </p>
          </header>
          <GalleryLightbox images={memoryImages} mood="editorial" locale={locale} />
        </div>
      </section>

      <HomeGuestStories locale={locale} />
    </main>

    <TemplateFooter config={config} locale={locale} homeMode />
  </div>;
}
