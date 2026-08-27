import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  diningStories,
  guestServices,
  inLocale,
  journeySteps,
  lakaExperiences,
  sharedFacilities,
  specialMoments
} from "@/features/showcase/data/laka-demo-content";
import { diningMenuVenues } from "@/features/showcase/data/dining-menu";
import { RestaurantMenuGallery } from "@/features/showcase/components/restaurant-menu-gallery";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function TemplateExperienceCatalog({ locale }: { locale: ShowcaseLocale }) {
  return <section id="trai-nghiem" className="scroll-mt-24 border-y border-[#16311c]/12 bg-[#e3d8c9] py-20 sm:py-28">
    <div className="mx-auto w-[min(1380px,calc(100%-40px))]">
      <div className="grid gap-7 border-b border-[#16311c]/15 pb-9 lg:grid-cols-[1fr_.48fr] lg:items-start">
        <div><p className="laka-eyebrow text-[#80613f]">{locale === "en" ? "Choose your own rhythm" : "Chọn nhịp của riêng bạn"}</p><h2 className="laka-heading-section mt-5 max-w-4xl">{locale === "en" ? "Small experiences, deeply felt." : "Những trải nghiệm nhỏ, cảm nhận thật sâu."}</h2></div>
        <p className="laka-body-muted max-w-xl">{locale === "en" ? "Nothing is compulsory. Pick one activity, or leave the entire day open — LAKA is designed for both." : "Không có lịch trình bắt buộc. Bạn có thể chọn một hoạt động, hoặc để trống cả ngày — LAKA phù hợp với cả hai."}</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {lakaExperiences.map((item, index) => {
          const Icon = item.icon;
          return <article key={item.title.vi} className="group overflow-hidden border border-[#16311c]/12 bg-[#eae1d2]">
            <div className="relative aspect-[16/10] overflow-hidden"><Image src={item.image} alt={`${inLocale(item.title, locale)} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" /><span className="absolute left-3 top-3 bg-[#16311c]/75 px-2.5 py-1 text-[.52rem] font-bold uppercase tracking-wider text-white backdrop-blur">{locale === "en" ? "Concept" : "Minh họa"} · 0{index + 1}</span></div>
            <div className="p-6"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[#80613f]" /><span className="text-[.58rem] font-bold uppercase tracking-[.12em] text-[#16311c]/45">{inLocale(item.meta, locale)}</span></div><h3 className="laka-heading-card mt-6">{inLocale(item.title, locale)}</h3><p className="mt-3 text-sm leading-7 text-[#16311c]/65">{inLocale(item.text, locale)}</p></div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}

export function TemplateDiningAndOccasions({ locale }: { locale: ShowcaseLocale }) {
  const en = locale === "en";
  return <div className="mx-auto w-[min(1380px,calc(100%-40px))] py-12 sm:py-16">
    <section aria-labelledby="dining-spaces-heading" className="mb-12 sm:mb-16">
      <header className="mb-8 sm:mb-10">
        <p className="laka-eyebrow text-[#80613f]">{en ? "By the lake, among the clouds" : "Bên hồ, giữa tầng mây"}</p>
        <h2 id="dining-spaces-heading" className="laka-heading-section mt-3">{en ? "Three spaces to savour the moment." : "Ba trải nghiệm, trọn vẹn hương vị."}</h2>
      </header>
      <div className="laka-mobile-rail laka-mobile-rail-grid gap-6 pb-4 md:grid-cols-2 lg:grid-cols-3 md:pb-0">
        {diningStories.map((item, index) => {
          const Icon = item.icon;
          const venue = diningMenuVenues[index];
          return <article key={item.title.vi} className="laka-mobile-rail-item group flex flex-col overflow-hidden rounded-2xl border border-[#16311c]/12 bg-[#eae1d2] shadow-sm transition duration-300 hover:shadow-md hover:border-[#16311c]/25">
            {/* Image Container with Title inside */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#d8cdbd]">
              <Image
                src={item.image}
                alt={`${inLocale(item.title, locale)} — ${en ? "concept image" : "hình ảnh minh họa"}`}
                fill
                sizes="(max-width:768px) 85vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
              />
              {/* Vignette & Gradient for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07150f]/90 via-[#07150f]/30 to-transparent" />

              {/* Kicker badge */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-[#16311c]/80 px-2.5 py-1 text-[.6rem] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                <Icon className="h-3.5 w-3.5 text-[#dfc6a5]" />
                <span>{inLocale(item.kicker, locale)}</span>
              </div>

              <span className="absolute top-3.5 right-3.5 rounded-full bg-black/40 px-2.5 py-0.5 text-[.52rem] font-medium text-white/80 backdrop-blur-md">
                {en ? "Concept" : "Minh họa"} · 0{index + 1}
              </span>

              {/* Text tiêu đề vào trong ảnh */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                  {inLocale(item.title, locale)}
                </h3>
              </div>
            </div>

            {/* Text chú thích để phía dưới */}
            <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#16311c]/80 font-normal">
                {inLocale(item.text, locale)}
              </p>

              <div className="mt-5 pt-4 border-t border-[#16311c]/10">
                {venue?.menuStatus === "available" ? (
                  <a
                    href="#thuc-don"
                    className="focus-ring inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#80613f] hover:text-[#16311c] transition"
                  >
                    <span>{en ? "Explore the restaurant menu" : "Xem thực đơn nhà hàng"}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                ) : venue?.menuStatus === "pending" ? (
                  <p className="flex min-h-11 items-center text-xs text-[#16311c]/60 italic">
                    {en ? "The coffee shop menu will be updated soon." : "Thực đơn cà phê sẽ sớm được cập nhật."}
                  </p>
                ) : (
                  <p className="flex min-h-11 items-center text-xs font-semibold uppercase tracking-wider text-[#80613f]">
                    {en ? "Included with stay" : "Miễn phí theo phòng lưu trú"}
                  </p>
                )}
              </div>
            </div>
          </article>;
        })}
      </div>
    </section>
    <RestaurantMenuGallery locale={locale} />
  </div>;
}

export function TemplateServicesCatalog({ locale, contactHref = "/lien-he" }: { locale: ShowcaseLocale; contactHref?: string }) {
  return <>
    <section id="danh-muc-dich-vu" className="scroll-mt-24 bg-[#16311c] py-20 text-[#eae1d2] sm:py-28">
      <div className="mx-auto w-[min(1380px,calc(100%-40px))]">
        <div className="grid gap-8 lg:grid-cols-[.42fr_1fr] lg:items-start">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#dfc6a5]">{locale === "en" ? "Meaningful occasions" : "Những dịp nhiều ý nghĩa"}</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/52">{locale === "en" ? "The setting supports the moment, then quietly steps back." : "Không gian nâng đỡ khoảnh khắc, rồi lặng lẽ lùi lại để câu chuyện vẫn là của bạn."}</p>
          </div>
          <h2 className="laka-heading-section">{locale === "en" ? <>A celebration<br /><i>that still feels personal.</i></> : <>Một dịp đặc biệt<br /><i>vẫn thật sự riêng tư.</i></>}</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {specialMoments.slice(0, 3).map((item, index) => {
            const Icon = item.icon;
            return <article key={item.title.vi} className={`group ${index === 1 ? "lg:mt-16" : ""}`}>
              <div className="relative aspect-[3/4.8] sm:aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1d16] shadow-2xl">
                <Image src={item.image} alt={`${inLocale(item.title, locale)} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover opacity-75 transition duration-1000 group-hover:scale-[1.03] group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07150f] via-[#07150f]/75 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 sm:p-8">
                  <div className="flex items-center justify-between"><span className="text-[.62rem] font-bold tracking-wider text-[#dfc6a5]">0{index + 1}</span><Icon className="h-5 w-5 text-[#dfc6a5]" /></div>
                  <h3 className="laka-heading-card mt-5 text-xl sm:text-2xl text-white font-bold leading-tight">{inLocale(item.title, locale)}</h3>
                  <p className="mt-3.5 text-xs sm:text-sm leading-6 sm:leading-7 text-white/70">{inLocale(item.text, locale)}</p>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Link
                      href={contactHref}
                      className="inline-flex items-center gap-2 rounded-full border border-[#dfc6a5]/35 bg-[#dfc6a5]/10 px-4 py-2 text-xs font-bold uppercase tracking-[.1em] text-[#dfc6a5] backdrop-blur-sm transition duration-300 hover:border-[#dfc6a5] hover:bg-[#dfc6a5] hover:text-[#16311c]"
                    >
                      <span>{locale === "en" ? "Consultation" : "Tư Vấn"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>;
          })}
        </div>
        <p className="mt-10 max-w-2xl text-[13px] leading-6 text-white/64">{locale === "en" ? "Occasion services remain concept proposals. Scope and pricing will be confirmed with the operating team." : "Dịch vụ cho dịp đặc biệt hiện là đề xuất concept; hạng mục và chi phí sẽ được xác nhận cùng đội ngũ vận hành."}</p>
      </div>
    </section>

    <section className="border-y border-[#16311c]/12 bg-[#e3d8c9] py-20 sm:py-28">
      <div className="mx-auto w-[min(1380px,calc(100%-40px))]">
        <div className="max-w-4xl">
          <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Shared spaces" : "Tiện ích dùng chung"}</p>
          <h2 className="laka-heading-section mt-5">{locale === "en" ? "Step outside your home. Stay close to nature." : "Bước ra khỏi căn. Vẫn ở thật gần thiên nhiên."}</h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {sharedFacilities.map((facility, index) => {
            const Icon = facility.icon;
            return <article key={facility.title.vi} className="group overflow-hidden bg-[#eae1d2]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={facility.image} alt={`${inLocale(facility.title, locale)} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                <span className="absolute left-3 top-3 bg-[#16311c]/75 px-2.5 py-1 text-[.52rem] font-bold uppercase tracking-wider text-white backdrop-blur">0{index + 1} · {locale === "en" ? "Concept" : "Minh họa"}</span>
              </div>
              <div className="p-6">
                <Icon className="h-5 w-5 text-[#80613f]" />
                <h3 className="laka-heading-card mt-6">{inLocale(facility.title, locale)}</h3>
                <p className="mt-3 text-sm leading-7 text-[#16311c]/65">{inLocale(facility.text, locale)}</p>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>
  </>;
}

export function TemplateJourneySection({ locale, contactHref }: { locale: ShowcaseLocale; contactHref: string }) {
  return <section id="chi-duong" className="scroll-mt-24 border-t border-[#16311c]/12 bg-[#e3d8c9] py-10 sm:py-14 md:py-16">
    <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
      <div className="grid gap-6 lg:grid-cols-[.55fr_1fr] lg:items-start">
        <div>
          <p className="laka-eyebrow text-[#80613f]">{locale === "en" ? "Imagine the journey" : "Hình dung hành trình"}</p>
          <h2 className="laka-heading-section mt-3 sm:mt-4">{locale === "en" ? "Know the place before you arrive." : "Hiểu về nơi này trước khi đến."}</h2>
        </div>
        <p className="laka-body-muted max-w-2xl">{locale === "en" ? "A few practical details help you picture a complete day at LAKA without interrupting the feeling of discovery." : "Một vài thông tin thực tế giúp bạn hình dung trọn vẹn một ngày tại LAKA mà không làm mất đi cảm giác khám phá."}</p>
      </div>
      <div className="mt-8 sm:mt-10 grid border-y border-[#16311c]/15 md:grid-cols-2">
        {journeySteps.map((item, index) => {
          const Icon = item.icon;
          return <article key={item.title.vi} className={`border-b border-[#16311c]/15 py-5 sm:py-6 md:px-6 ${index % 2 === 0 ? "md:border-r md:pl-0" : ""} ${index > 1 ? "md:border-b-0" : ""}`}>
            <div className="flex items-center gap-2.5">
              <span className="text-[.58rem] font-bold text-[#80613f]">0{index + 1}</span>
              <Icon className="h-4 w-4 text-[#80613f]" />
            </div>
            <h3 className="laka-heading-card mt-6">{inLocale(item.title, locale)}</h3>
            <p className="mt-2 text-sm leading-6 text-[#16311c]/70">{inLocale(item.text, locale)}</p>
          </article>;
        })}
      </div>
      <a href={contactHref} className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-[#16311c]/16 px-5 text-sm font-bold text-[#16311c] transition hover:bg-[#16311c] hover:text-[#eae1d2]">{locale === "en" ? "Talk with LAKA" : "Trò chuyện cùng LAKA"} <ArrowRight className="h-4 w-4" /></a>
    </div>
  </section>;
}
