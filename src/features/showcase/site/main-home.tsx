import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { GalleryLightbox } from "@/features/showcase/components/gallery-lightbox";
import { HomeBrandStory } from "@/features/showcase/components/home-brand-story";
import { HomeDayJourney } from "@/features/showcase/components/home-day-journey";
import { HomeDiningPreview } from "@/features/showcase/components/home-dining-preview";
import { HomeGuestStories } from "@/features/showcase/components/home-guest-stories";
import { HomeLandscapeCollections } from "@/features/showcase/components/home-landscape-collections";
import { HomeStaySpotlight } from "@/features/showcase/components/home-stay-spotlight";
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
          <p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#dfc6a5]">
            {en ? "LAKA · A home in the green" : "LAKA · Nhà giữa khoảng xanh"}
          </p>
          <h1 className="mt-5 max-w-6xl font-serif text-[clamp(3.6rem,11vw,9rem)] font-medium leading-[.85] tracking-[-.065em]">
            {en ? <>Choose a cabin.<br /><i className="font-normal text-[#dfc6a5]">Hold the whole valley.</i></> : <>“Chọn” Cabin.<br /><i className="font-normal text-[#dfc6a5]">“Trọn” Thung Lũng.</i></>}
          </h1>
          <div className="mt-8 flex items-end justify-between gap-8 border-t border-white/22 pt-6">
            <p className="max-w-xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
              {en ? "Untouched beauty held in every window frame, where the truest connections can begin." : "Lưu giữ vẻ đẹp nguyên sơ qua từng khung kính, nơi khởi nguồn cho những kết nối chân thật nhất."}
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
      <HomeStaySpotlight basePath={config.basePath} locale={locale} />
      <HomeDiningPreview basePath={config.basePath} locale={locale} />
      <HomeDayJourney basePath={config.basePath} locale={locale} />

      <section id="ky-uc" className="scroll-mt-20 bg-[#f2ece2] px-5 pt-24 sm:px-8 sm:pt-32">
        <div className="mx-auto grid w-[min(1380px,100%)] gap-8 lg:grid-cols-[1fr_.45fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "A short memory gallery" : "Một thư viện ký ức vừa đủ"}</p>
            <h2 className="mt-5 max-w-5xl font-serif text-[clamp(3.2rem,7vw,6.6rem)] font-medium leading-[.92] tracking-[-.055em]">
              {en ? <>Images do not prove the stay.<br /><i>They help you imagine it.</i></> : <>Hình ảnh không kể thay kỳ nghỉ.<br /><i>Chỉ mở ra một cách để hình dung.</i></>}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#16311c]/58">
            {en ? "A curated set of frames, intentionally shorter than an endless gallery." : "Một số khung hình được chọn lọc, vừa đủ để gợi cảm giác mà không biến trang thành một thư viện kéo dài bất tận."}
          </p>
        </div>
        <GalleryLightbox images={memoryImages} mood="editorial" locale={locale} />
      </section>

      <HomeGuestStories basePath={config.basePath} locale={locale} />

      <section className="relative min-h-[68svh] overflow-hidden bg-[#10251d] text-white">
        <Image src={conceptImages.cloud} alt={en ? "A quiet place beneath the clouds — concept image" : "Một nơi tĩnh lặng dưới tầng mây — hình ảnh minh họa"} fill sizes="100vw" className="object-cover opacity-58" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10251d]/92 via-[#10251d]/55 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[68svh] w-[min(1380px,calc(100%-40px))] items-center py-20">
          <div className="max-w-4xl">
            <p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#dfc6a5]">{en ? "A place to return" : "Một nơi để trở về"}</p>
            <h2 className="mt-6 font-serif text-[clamp(3.6rem,8vw,7.5rem)] font-medium leading-[.9] tracking-[-.06em]">
              {en ? <>Not to escape life.<br /><i>To return to it differently.</i></> : <>Không phải để trốn khỏi cuộc sống.<br /><i>Mà để trở lại theo một cách khác.</i></>}
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`${config.basePath}/luu-tru`} className="focus-ring group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#eae1d2] px-6 text-sm font-bold text-[#16311c]">
                {en ? "Explore the homes" : "Khám phá các căn nhà"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link href={`${config.basePath}/thong-tin`} className="focus-ring inline-flex min-h-12 items-center rounded-full border border-white/28 px-6 text-sm font-bold text-white/78 transition hover:bg-white/10 hover:text-white">
                {en ? "Good to know" : "Thông tin cần biết"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>

    <TemplateFooter config={config} locale={locale} homeMode />
  </div>;
}
