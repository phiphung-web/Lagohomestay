import Image from "next/image";
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
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function TemplateExperienceCatalog({ locale }: { locale: ShowcaseLocale }) {
  return <section className="border-y border-[#16311c]/12 bg-[#e3d8c9] py-20 sm:py-28">
    <div className="mx-auto w-[min(1380px,calc(100%-40px))]">
      <div className="grid gap-7 border-b border-[#16311c]/15 pb-9 lg:grid-cols-[1fr_.48fr] lg:items-end">
        <div><p className="laka-eyebrow text-[#80613f]">{locale === "en" ? "Choose your own rhythm" : "Chọn nhịp của riêng bạn"}</p><h2 className="laka-heading-section mt-5 max-w-4xl">{locale === "en" ? "Small experiences, deeply felt." : "Những trải nghiệm nhỏ, cảm nhận thật sâu."}</h2></div>
        <p className="laka-body-muted max-w-xl">{locale === "en" ? "Nothing is compulsory. Pick one activity, or leave the entire day open — LAKA is designed for both." : "Không có lịch trình bắt buộc. Bạn có thể chọn một hoạt động, hoặc để trống cả ngày — LAKA phù hợp với cả hai."}</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {lakaExperiences.map((item, index) => {
          const Icon = item.icon;
          return <article key={item.title.vi} className="group overflow-hidden border border-[#16311c]/12 bg-[#eae1d2]">
            <div className="relative aspect-[16/10] overflow-hidden"><Image src={item.image} alt={`${inLocale(item.title, locale)} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" /><span className="absolute left-3 top-3 bg-[#16311c]/75 px-2.5 py-1 text-[.52rem] font-bold uppercase tracking-wider text-white backdrop-blur">{locale === "en" ? "Concept" : "Minh họa"} · 0{index + 1}</span></div>
            <div className="p-6"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[#80613f]" /><span className="text-[.58rem] font-bold uppercase tracking-[.12em] text-[#16311c]/45">{inLocale(item.meta, locale)}</span></div><h3 className="mt-6 font-serif text-3xl font-medium">{inLocale(item.title, locale)}</h3><p className="mt-3 text-sm leading-7 text-[#16311c]/65">{inLocale(item.text, locale)}</p></div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}

export function TemplateDiningAndOccasions({ locale }: { locale: ShowcaseLocale }) {
  return (
    <>
      <section className="mx-auto w-[min(1380px,calc(100%-40px))] py-20 sm:py-28">
        <header className="grid gap-8 border-b border-[#16311c]/15 pb-10 lg:grid-cols-[.42fr_1fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Three ways to gather" : "Ba cách ngồi lại bên nhau"}</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#16311c]/65">{locale === "en" ? "Each dining moment has its own rhythm, but every one returns the focus to the people around the table." : "Mỗi bữa ăn có một nhịp riêng, nhưng đều đưa sự chú ý trở về những người đang ngồi quanh bàn."}</p>
          </div>
          <h2 className="laka-heading-section">{locale === "en" ? <>Breakfast, a shared meal<br /><i>or a table made just for you.</i></> : <>Bữa sáng, bữa nhà<br /><i>hay một bàn ăn dành riêng.</i></>}</h2>
        </header>

        <div>
          {diningStories.map((item, index) => {
            const Icon = item.icon;
            const reverse = index % 2 === 1;
            return (
              <article key={item.title.vi} className="grid border-b border-[#16311c]/15 py-12 lg:grid-cols-2 lg:items-stretch lg:py-20">
                <div className={`group relative min-h-[52svh] overflow-hidden bg-[#d8cdbd] lg:min-h-[640px] ${reverse ? "lg:order-2" : ""}`}>
                  <Image src={item.image} alt={`${inLocale(item.title, locale)} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition duration-1000 ease-out group-hover:scale-[1.025]" />
                  <span className="absolute bottom-4 left-4 bg-[#16311c]/72 px-3 py-1.5 text-[.52rem] font-bold uppercase tracking-wider text-white backdrop-blur">0{index + 1} · {locale === "en" ? "Concept" : "Minh họa"}</span>
                </div>
                <div className={`flex flex-col justify-center py-9 lg:px-14 lg:py-12 xl:px-20 ${reverse ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 text-[#80613f]">
                    <Icon className="h-5 w-5" />
                    <span className="text-[.58rem] font-bold uppercase tracking-[.18em]">{inLocale(item.kicker, locale)}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-4xl font-medium leading-[1.02] tracking-[-.04em] sm:text-5xl lg:text-6xl">{inLocale(item.title, locale)}</h3>
                  <p className="mt-7 max-w-lg text-base leading-8 text-[#16311c]/65">{inLocale(item.text, locale)}</p>
                  <p className="mt-9 border-y border-[#16311c]/15 py-5 text-xs font-bold uppercase tracking-[.12em] text-[#80613f]">
                    {index < 2
                      ? (locale === "en" ? "Explore the menu preview below" : "Xem trước danh mục món bên dưới")
                      : (locale === "en" ? "Details are being completed" : "Thông tin đang được hoàn thiện")}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-20 border-t border-[#16311c]/15 pt-14 sm:mt-28 sm:pt-20">
          <div className="grid gap-7 lg:grid-cols-[.42fr_1fr] lg:items-end">
            <div>
              <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Menu preview" : "Danh mục món dự kiến"}</p>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#16311c]/62">{locale === "en" ? "A content preview for exploring the dining experience. Availability and final details are confirmed directly by LAKA." : "Bản xem trước nội dung để hình dung trải nghiệm ẩm thực. Tình trạng phục vụ và thông tin chính thức được LAKA xác nhận trực tiếp."}</p>
            </div>
            <h2 className="laka-heading-section max-w-5xl">{locale === "en" ? <>From the lakeside kitchen<br /><i>to an afternoon coffee.</i></> : <>Từ bếp bên hồ<br /><i>đến một buổi cà phê.</i></>}</h2>
          </div>

          <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-24">
            {diningMenuVenues.map((venue, venueIndex) => <article key={venue.id} className="grid gap-9 border-t border-[#16311c]/15 pt-8 lg:grid-cols-[.36fr_1fr] lg:gap-14">
              <header className="lg:sticky lg:top-28 lg:self-start">
                <span className="text-[.58rem] font-bold tracking-[.16em] text-[#80613f]">0{venueIndex + 1}</span>
                <p className="mt-5 text-[.58rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{inLocale(venue.eyebrow, locale)}</p>
                <h3 className="mt-4 font-serif text-4xl font-medium leading-tight sm:text-5xl">{inLocale(venue.title, locale)}</h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-[#16311c]/62">{inLocale(venue.introduction, locale)}</p>
              </header>
              <div className="grid gap-x-7 gap-y-9 sm:grid-cols-2">
                {venue.groups.map((group) => <section key={group.title.vi} className="border-t border-[#16311c]/15 pt-5">
                  <h4 className="text-[.62rem] font-bold uppercase tracking-[.16em] text-[#80613f]">{inLocale(group.title, locale)}</h4>
                  <ul className="mt-5 divide-y divide-[#16311c]/10">
                    {group.items.map((menuItem) => <li key={menuItem.vi} className="flex min-h-12 items-center justify-between gap-4 py-3 text-sm leading-6 text-[#16311c]/76">
                      <span>{inLocale(menuItem, locale)}</span>
                      <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-[#80613f]/50" />
                    </li>)}
                  </ul>
                </section>)}
              </div>
            </article>)}
          </div>

          <p className="mt-14 max-w-2xl border-l border-[#80613f]/45 pl-4 text-[13px] leading-6 text-[#16311c]/62">{locale === "en" ? "This preview intentionally excludes prices and internal operating notes. LAKA will confirm the available selection directly." : "Bản xem trước chủ động không hiển thị giá và ghi chú vận hành nội bộ. LAKA sẽ xác nhận danh mục đang phục vụ qua kênh liên hệ trực tiếp."}</p>
        </section>
      </section>
    </>
  );
}

export function TemplateServicesCatalog({ locale }: { locale: ShowcaseLocale }) {
  return <>
    <section className="bg-[#16311c] py-20 text-[#eae1d2] sm:py-28">
      <div className="mx-auto w-[min(1380px,calc(100%-40px))]">
        <div className="grid gap-8 lg:grid-cols-[.42fr_1fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#dfc6a5]">{locale === "en" ? "Meaningful occasions" : "Những dịp nhiều ý nghĩa"}</p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/52">{locale === "en" ? "The setting supports the moment, then quietly steps back." : "Không gian nâng đỡ khoảnh khắc, rồi lặng lẽ lùi lại để câu chuyện vẫn là của bạn."}</p>
          </div>
          <h2 className="laka-heading-section">{locale === "en" ? <>A celebration<br /><i>that still feels personal.</i></> : <>Một dịp đặc biệt<br /><i>vẫn thật sự riêng tư.</i></>}</h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {specialMoments.slice(0, 3).map((item, index) => {
            const Icon = item.icon;
            const images = [conceptImages.dining, conceptImages.detail1, conceptImages.cloud] as const;
            return <article key={item.title.vi} className={`group ${index === 1 ? "lg:mt-20" : ""}`}>
              <div className="relative aspect-[2/3] overflow-hidden bg-[#0b1d16]">
                <Image src={images[index]} alt={`${inLocale(item.title, locale)} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover opacity-82 transition duration-1000 group-hover:scale-[1.025] group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07150f]/88 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex items-center justify-between"><span className="text-[.58rem] font-bold text-[#dfc6a5]">0{index + 1}</span><Icon className="h-5 w-5 text-[#dfc6a5]" /></div>
                  <h3 className="mt-6 font-serif text-3xl font-medium sm:text-4xl">{inLocale(item.title, locale)}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">{inLocale(item.text, locale)}</p>
                </div>
              </div>
            </article>;
          })}
        </div>
        <p className="mt-8 max-w-2xl text-[13px] leading-6 text-white/64">{locale === "en" ? "Occasion services remain concept proposals. Scope and pricing will be confirmed with the operating team." : "Dịch vụ cho dịp đặc biệt hiện là đề xuất concept; hạng mục và chi phí sẽ được xác nhận cùng đội ngũ vận hành."}</p>
      </div>
    </section>

    <section className="mx-auto w-[min(1320px,calc(100%-40px))] py-20 sm:py-28">
      <div className="grid gap-8 border-b border-[#16311c]/15 pb-9 lg:grid-cols-[.58fr_1fr] lg:items-end">
        <div>
          <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Care, when you need it" : "Chăm sóc vừa lúc"}</p>
          <h2 className="laka-heading-section mt-5">{locale === "en" ? "A private home, with thoughtful support." : "Một căn nhà riêng, cùng sự hỗ trợ tinh tế."}</h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[#16311c]/65">{locale === "en" ? "Services are designed to remove small worries without interrupting the privacy of your stay. Select what is useful and leave the rest." : "Dịch vụ được thiết kế để gỡ bớt những bận tâm nhỏ mà không làm gián đoạn khoảng riêng của kỳ nghỉ. Chọn điều hữu ích, bỏ qua những gì không cần."}</p>
      </div>
      <div className="mt-2 divide-y divide-[#16311c]/15 border-y border-[#16311c]/15">
        {guestServices.map((service, index) => {
          const Icon = service.icon;
          return <details key={service.title.vi} open={index === 0} className="group">
            <summary className="focus-ring grid min-h-[88px] cursor-pointer list-none grid-cols-[52px_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[72px_1fr_auto] sm:gap-7">
              <span className="text-[11px] font-bold tracking-[.14em] text-[#6b4f31]">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-serif text-2xl font-medium sm:text-3xl">{inLocale(service.title, locale)}</span>
              <span className="flex items-center gap-4">
                <Icon className="hidden h-5 w-5 text-[#6b4f31] sm:block" />
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#16311c]/16 text-xl font-light transition duration-300 group-open:rotate-45">+</span>
              </span>
            </summary>
            <div className="grid gap-4 pb-7 pl-[68px] sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8 sm:pl-[99px]">
              <p className="max-w-2xl text-sm leading-7 text-[#16311c]/68">{inLocale(service.text, locale)}</p>
              <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#6b4f31]">{inLocale(service.meta, locale)}</p>
            </div>
          </details>;
        })}
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
                <h3 className="mt-6 font-serif text-3xl font-medium">{inLocale(facility.title, locale)}</h3>
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
  return <section className="border-t border-[#16311c]/12 bg-[#e3d8c9] py-20 sm:py-28">
    <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
      <div className="grid gap-8 lg:grid-cols-[.55fr_1fr] lg:items-end"><div><p className="laka-eyebrow text-[#80613f]">{locale === "en" ? "Imagine the journey" : "Hình dung hành trình"}</p><h2 className="laka-heading-section mt-5">{locale === "en" ? "Know the place before you arrive." : "Hiểu về nơi này trước khi đến."}</h2></div><p className="laka-body-muted max-w-2xl">{locale === "en" ? "A few practical details help you picture a complete day at LAKA without interrupting the feeling of discovery." : "Một vài thông tin thực tế giúp bạn hình dung trọn vẹn một ngày tại LAKA mà không làm mất đi cảm giác khám phá."}</p></div>
      <div className="mt-12 grid border-y border-[#16311c]/15 md:grid-cols-2">
        {journeySteps.map((item, index) => { const Icon = item.icon; return <article key={item.title.vi} className={`border-b border-[#16311c]/15 py-7 md:px-7 ${index % 2 === 0 ? "md:border-r md:pl-0" : ""} ${index > 1 ? "md:border-b-0" : ""}`}><div className="flex items-center gap-3"><span className="text-[.58rem] font-bold text-[#80613f]">0{index + 1}</span><Icon className="h-5 w-5 text-[#80613f]" /></div><h3 className="mt-6 font-serif text-3xl font-medium">{inLocale(item.title, locale)}</h3><p className="mt-3 text-sm leading-7 text-[#16311c]/65">{inLocale(item.text, locale)}</p></article>; })}
      </div>
      <a href={contactHref} className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-[#16311c]/16 px-6 text-sm font-bold text-[#16311c]">{locale === "en" ? "Talk with LAKA" : "Trò chuyện cùng LAKA"} <ArrowRight className="h-4 w-4" /></a>
    </div>
  </section>;
}
