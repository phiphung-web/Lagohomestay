import Image from "next/image";
import { ArrowDown } from "lucide-react";
import type { CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const BANNER_IMAGES = {
  // Rich lush green foliage bokeh for the top moody backdrop
  bokehBg: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2200&q=86",
  // Sharp, vibrant green nature foliage for the floating card
  cardLeaf: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=86"
};

export function StayBannerHero({
  locale = "vi"
}: {
  config?: CompleteTemplateConfig;
  locale?: ShowcaseLocale;
}) {
  const isEn = locale === "en";

  return (
    <section className="relative w-full overflow-hidden bg-[#0d2215] text-white">
      {/* ========================================================================= */}
      {/* 1. TOP SECTION: Deep Lush Nature Bokeh Backdrop                           */}
      {/* ========================================================================= */}
      <div className="relative min-h-[500px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[660px] w-full overflow-hidden bg-[#0a1e12]">
        {/* Background photo with subtle blur & rich emerald grade */}
        <Image
          src={BANNER_IMAGES.bokehBg}
          alt={isEn ? "Lush green scenery at LAKA" : "Khoảng xanh tự nhiên tại LAKA"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter blur-[3.5px] brightness-75 contrast-110"
        />

        {/* Emerald vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07170d]/80 via-[#0a2114]/55 to-[#06140b]/95" />

        {/* Grain overlay */}
        <div className="grain absolute inset-0 pointer-events-none opacity-25" />

        {/* Top Content Area */}
        <div className="relative z-10 mx-auto flex h-full min-h-[500px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[660px] w-[min(1280px,calc(100%-32px))] sm:w-[min(1280px,calc(100%-48px))] flex-col justify-end pb-12 sm:pb-16 md:pb-20 pt-28 sm:pt-36">
          <div className="grid grid-cols-12 gap-3 sm:gap-6 items-end">
            {/* Left spacing for overlapping card (4 cols on mobile, 5 on tablet, 4 on desktop) */}
            <div className="col-span-4 sm:col-span-4 md:col-span-5 lg:col-span-4" aria-hidden="true" />

            {/* Right text container */}
            <div className="col-span-8 sm:col-span-8 md:col-span-7 lg:col-span-8 flex flex-col justify-end pl-2 sm:pl-4">
              {/* Category pill */}
              <div className="mb-2 sm:mb-3">
                <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[.55rem] sm:text-[.62rem] font-bold uppercase tracking-[.2em] text-[#eae1d2] backdrop-blur-md">
                  {isEn ? "Stay Collection" : "Bộ Sưu Tập Lưu Trú"}
                </span>
              </div>

              {/* Main Title: "LaKa - Lưu Trú" */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white uppercase leading-[1.05] drop-shadow-md">
                LaKa - Lưu Trú
              </h1>

              {/* Subtitle / Script Tagline: "Mỗi khoảng xanh 1 nhịp riêng" */}
              <p className="mt-1.5 sm:mt-2.5 font-serif italic text-base sm:text-2xl md:text-3xl lg:text-4xl text-[#cce5d3] tracking-wide drop-shadow-sm">
                {isEn ? "Each green corner, its own rhythm" : "Mỗi khoảng xanh 1 nhịp riêng"}
              </p>

              {/* Decorative Ellipsis `···` */}
              <div className="my-1.5 sm:my-3 text-white/50 text-base sm:text-xl font-mono select-none tracking-widest" aria-hidden="true">
                ···
              </div>

              {/* Description paragraph */}
              <p className="max-w-xl text-[0.72rem] sm:text-xs md:text-sm lg:text-[0.9375rem] leading-relaxed text-white/80 font-normal line-clamp-4 sm:line-clamp-none">
                {isEn
                  ? "Eight accommodation styles and twenty private homes between lake, valley and pine hills. Designed for slow days where every shade of green brings calm."
                  : "Tám dòng lưu trú và hai mươi căn nhà nép mình giữa hồ nước, thung lũng và đồi thông. Nơi mỗi khoảng xanh là một nhịp thở tự nhiên vỗ về tâm hồn và đưa bạn trở về với sự an yên."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BOTTOM SECTION: Clean Textured Light Paper Canvas                     */}
      {/* ========================================================================= */}
      <div className="relative w-full border-b border-[#16311c]/15 bg-[#eae1d2] py-8 sm:py-12 md:py-14 text-[#16311c]">
        {/* Subtle linen/paper dot texture */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#16311c_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 mx-auto w-[min(1280px,calc(100%-32px))] sm:w-[min(1280px,calc(100%-48px))]">
          <div className="grid grid-cols-12 gap-3 sm:gap-6 items-start">
            {/* Left spacing to align with card */}
            <div className="col-span-4 sm:col-span-4 md:col-span-5 lg:col-span-4">
              {/* Bottom left branding tag placed below the card */}
              <div className="pt-16 sm:pt-24 md:pt-28 text-[.65rem] sm:text-xs font-bold uppercase tracking-[.18em] leading-tight text-[#16311c]/75">
                Creative<br />
                <span className="text-[#16311c] font-black">Homestory.</span>
              </div>
            </div>

            {/* Right details */}
            <div className="col-span-8 sm:col-span-8 md:col-span-7 lg:col-span-8 pl-2 sm:pl-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  {/* Date Stamp */}
                  <p className="text-base sm:text-xl md:text-2xl font-extrabold tracking-tight text-[#16311c]">
                    {isEn ? "03, January 2026" : "03, Tháng Một 2026"}
                  </p>

                  {/* Elegant cursive sub-tag */}
                  <p className="mt-0.5 sm:mt-1 font-serif italic text-xs sm:text-base md:text-lg text-[#80613f]">
                    {isEn ? "Lake · Valley · Pine Forest" : "Ven Hồ · Thung Lũng · Rừng Thông"}
                  </p>

                  {/* Archive signature */}
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#16311c]/70 font-medium">
                    Archive by <strong className="font-bold text-[#16311c]">laka</strong>.
                  </p>
                </div>

                {/* Explore Action Button */}
                <div className="pt-2 sm:pt-0">
                  <a
                    href="#bo-suu-tap-can"
                    className="inline-flex items-center gap-2 rounded-full bg-[#16311c] px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold text-[#eae1d2] shadow-md transition hover:bg-[#224b2b] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>{isEn ? "Explore 20 homes" : "Khám phá 20 căn"}</span>
                    <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FLOATING OVERLAPPING PHOTO CARD                                        */}
      {/* ========================================================================= */}
      <div className="pointer-events-none absolute left-1/2 top-[500px] sm:top-[560px] md:top-[620px] lg:top-[660px] z-20 w-[min(1280px,calc(100%-32px))] sm:w-[min(1280px,calc(100%-48px))] -translate-x-1/2 -translate-y-1/2">
        <div className="grid grid-cols-12 gap-3 sm:gap-6">
          <div className="col-span-4 sm:col-span-4 md:col-span-5 lg:col-span-4">
            <div className="pointer-events-auto w-full max-w-[130px] sm:max-w-[185px] md:max-w-[240px] lg:max-w-[290px] xl:max-w-[320px]">
              <div className="group relative aspect-[3/4.4] sm:aspect-[4/5.2] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border-2 sm:border-[3px] border-white bg-[#16311c] shadow-[0_18px_45px_rgba(0,0,0,0.45)] transition duration-700 hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                {/* Sharp in-focus tropical leaves / nature photo */}
                <Image
                  src={BANNER_IMAGES.cardLeaf}
                  alt={isEn ? "Fresh green leaves at LAKA" : "Lá xanh tươi mát tại LAKA"}
                  fill
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 240px, 320px"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Fine inner ring */}
                <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl ring-1 ring-inset ring-black/10" />

                {/* Floating pill badge on card */}
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 rounded-full bg-black/45 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[.5rem] sm:text-[.58rem] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  LAKA · Greenery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
