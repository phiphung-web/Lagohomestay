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
  conceptImages.breakfast,
  conceptImages.forest,
  conceptImages.dining,
  conceptImages.hill,
  conceptImages.detail3
];

export function MainHome({ config, locale = "vi" }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale }) {
  const en = locale === "en";

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
          <h1 className="laka-display-hero max-w-6xl">
            {en ? "Choose a cabin - Hold the whole valley" : '"Chọn" Cabin - "Trọn" Thung Lũng'}
          </h1>
          <p className="laka-section-lead mt-6 max-w-2xl text-white/78">
            {en ? "LaKa - A home in the green" : "LaKa - Nhà giữa khoảng xanh"}
          </p>
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

      <section id="ky-uc" className="laka-section-top-normal scroll-mt-20 bg-[#f2ece2] px-5 sm:px-8">
        <div className="mx-auto grid w-[min(1380px,100%)] gap-8 lg:grid-cols-[.38fr_1fr] lg:items-start">
          <h2 className="laka-home-section-title text-[#16311c]">{en ? "Memory gallery" : "Thư viện ký ức"}</h2>
          <p className="laka-home-section-lead max-w-5xl">
            {en ? <>Frames to keep<br /><i>the days worth remembering.</i></> : <>Những khung hình lưu lại<br /><i>một ngày thật đáng nhớ.</i></>}
          </p>
        </div>
        <GalleryLightbox images={memoryImages} mood="editorial" locale={locale} />
      </section>

      <HomeGuestStories locale={locale} />
    </main>

    <TemplateFooter config={config} locale={locale} homeMode />
  </div>;
}
