import Image from "next/image";
import { ArrowRight, Info } from "lucide-react";
import {
  demoNotice,
  diningStories,
  guestServices,
  inLocale,
  journeySteps,
  lakaExperiences,
  sharedFacilities,
  specialMoments
} from "@/features/showcase/data/laka-demo-content";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function DemoContentNotice({ locale }: { locale: ShowcaseLocale }) {
  return <div className="mx-auto w-[min(1240px,calc(100%-40px))] pt-12">
    <div className="flex items-start gap-3 border border-[#80613f]/25 bg-[#e3d8c9] px-5 py-4 text-xs leading-6 text-[#16311c]/72">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#80613f]" />
      <p><strong className="text-[#16311c]">{locale === "en" ? "Presentation note." : "Lưu ý bản demo."}</strong> {inLocale(demoNotice, locale)}</p>
    </div>
  </div>;
}

export function TemplateExperienceCatalog({ locale }: { locale: ShowcaseLocale }) {
  return <section className="border-y border-[#16311c]/12 bg-[#e3d8c9] py-20 sm:py-28">
    <div className="mx-auto w-[min(1380px,calc(100%-40px))]">
      <div className="grid gap-7 border-b border-[#16311c]/15 pb-9 lg:grid-cols-[1fr_.48fr] lg:items-end">
        <div><p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Choose your own rhythm" : "Chọn nhịp của riêng bạn"}</p><h2 className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[.94] tracking-[-.05em] sm:text-7xl">{locale === "en" ? "Small experiences, deeply felt." : "Những trải nghiệm nhỏ, cảm nhận thật sâu."}</h2></div>
        <p className="max-w-xl text-sm leading-7 text-[#16311c]/65">{locale === "en" ? "Nothing is compulsory. Pick one activity, or leave the entire day open — LAKA is designed for both." : "Không có lịch trình bắt buộc. Bạn có thể chọn một hoạt động, hoặc để trống cả ngày — LAKA phù hợp với cả hai."}</p>
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
  return <>
    <section className="mx-auto w-[min(1280px,calc(100%-40px))] py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[.4fr_1fr]">
        <div><p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Eat at your own table" : "Ăn tại bàn của riêng mình"}</p><h2 className="mt-5 font-serif text-5xl font-medium leading-[.95] tracking-[-.05em]">{locale === "en" ? "Food that belongs to the stay." : "Bữa ăn thuộc về kỳ nghỉ."}</h2><p className="mt-6 text-sm leading-7 text-[#16311c]/65">{locale === "en" ? "The dining concept keeps guests close to their home, their view and one another." : "Concept ẩm thực đưa khách trở về gần căn nhà, khung cảnh và những người đồng hành."}</p></div>
        <div className="border-t border-[#16311c]/15">
          {diningStories.map((item, index) => { const Icon = item.icon; return <article key={item.title.vi} className="grid gap-6 border-b border-[#16311c]/15 py-7 sm:grid-cols-[60px_1fr_.8fr] sm:items-start"><span className="text-xs font-bold text-[#80613f]">0{index + 1}</span><div><Icon className="h-5 w-5 text-[#80613f]" /><p className="mt-5 text-[.58rem] font-bold uppercase tracking-[.16em] text-[#16311c]/48">{inLocale(item.kicker, locale)}</p><h3 className="mt-2 font-serif text-3xl font-medium">{inLocale(item.title, locale)}</h3></div><p className="text-sm leading-7 text-[#16311c]/65">{inLocale(item.text, locale)}</p></article>; })}
        </div>
      </div>
    </section>
    <section className="bg-[#16311c] py-20 text-[#eae1d2] sm:py-28">
      <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
        <div className="max-w-4xl"><p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#dfc6a5]">{locale === "en" ? "A reason to gather" : "Một lý do để gặp nhau"}</p><h2 className="mt-5 font-serif text-5xl font-medium leading-[.95] tracking-[-.05em] sm:text-7xl">{locale === "en" ? "Make an occasion feel like your own." : "Để dịp đặc biệt thật sự là của bạn."}</h2></div>
        <div className="mt-12 grid border-t border-white/15 md:grid-cols-2">
          {specialMoments.map((item, index) => { const Icon = item.icon; return <article key={item.title.vi} className={`border-b border-white/15 py-8 md:px-8 ${index % 2 === 0 ? "md:border-r md:pl-0" : ""}`}><div className="flex items-center justify-between"><span className="text-[.58rem] font-bold text-[#dfc6a5]">0{index + 1}</span><Icon className="h-5 w-5 text-[#dfc6a5]" /></div><h3 className="mt-10 font-serif text-3xl font-medium">{inLocale(item.title, locale)}</h3><p className="mt-4 max-w-lg text-sm leading-7 text-white/52">{inLocale(item.text, locale)}</p></article>; })}
        </div>
        <p className="mt-8 max-w-2xl text-xs leading-6 text-white/42">{locale === "en" ? "Occasion packages are concept proposals. Scope and pricing will be confirmed with the operating team." : "Các gói dịp đặc biệt là đề xuất cho bản demo; hạng mục và giá cần được xác nhận cùng đội ngũ vận hành."}</p>
      </div>
    </section>
  </>;
}

export function TemplateServicesCatalog({ locale }: { locale: ShowcaseLocale }) {
  return <>
    <section className="mx-auto w-[min(1320px,calc(100%-40px))] py-20 sm:py-28">
      <div className="grid gap-8 border-b border-[#16311c]/15 pb-9 lg:grid-cols-[.58fr_1fr] lg:items-end">
        <div>
          <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Care, when you need it" : "Chăm sóc vừa lúc"}</p>
          <h2 className="mt-5 font-serif text-5xl font-medium leading-[.94] tracking-[-.05em] sm:text-7xl">{locale === "en" ? "A private home, with thoughtful support." : "Một căn nhà riêng, cùng sự hỗ trợ tinh tế."}</h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[#16311c]/65">{locale === "en" ? "Services are designed to remove small worries without interrupting the privacy of your stay. Select what is useful and leave the rest." : "Dịch vụ được thiết kế để gỡ bớt những bận tâm nhỏ mà không làm gián đoạn khoảng riêng của kỳ nghỉ. Chọn điều hữu ích, bỏ qua những gì không cần."}</p>
      </div>
      <div className="grid border-b border-[#16311c]/15 md:grid-cols-2 lg:grid-cols-3">
        {guestServices.map((service, index) => {
          const Icon = service.icon;
          return <article key={service.title.vi} className={`border-b border-[#16311c]/15 py-8 md:px-7 lg:min-h-[300px] ${index % 3 !== 2 ? "lg:border-r" : ""}`}>
            <div className="flex items-center justify-between">
              <span className="text-[.58rem] font-bold text-[#80613f]">{String(index + 1).padStart(2, "0")}</span>
              <Icon className="h-5 w-5 text-[#80613f]" />
            </div>
            <h3 className="mt-12 font-serif text-3xl font-medium">{inLocale(service.title, locale)}</h3>
            <p className="mt-4 text-sm leading-7 text-[#16311c]/65">{inLocale(service.text, locale)}</p>
            <p className="mt-6 text-[.58rem] font-bold uppercase tracking-[.14em] text-[#80613f]">{inLocale(service.meta, locale)}</p>
          </article>;
        })}
      </div>
    </section>

    <section className="border-y border-[#16311c]/12 bg-[#e3d8c9] py-20 sm:py-28">
      <div className="mx-auto w-[min(1380px,calc(100%-40px))]">
        <div className="max-w-4xl">
          <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Shared spaces" : "Tiện ích dùng chung"}</p>
          <h2 className="mt-5 font-serif text-5xl font-medium leading-[.94] tracking-[-.05em] sm:text-7xl">{locale === "en" ? "Step outside your home. Stay close to nature." : "Bước ra khỏi căn. Vẫn ở thật gần thiên nhiên."}</h2>
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
      <div className="grid gap-8 lg:grid-cols-[.55fr_1fr] lg:items-end"><div><p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Plan the journey" : "Chuẩn bị hành trình"}</p><h2 className="mt-5 font-serif text-5xl font-medium leading-[.95] tracking-[-.05em] sm:text-6xl">{locale === "en" ? "Know before you go." : "Biết trước để đi thật nhẹ."}</h2></div><p className="max-w-2xl text-sm leading-7 text-[#16311c]/65">{locale === "en" ? "A compact journey guide reduces uncertainty from reservation to arrival." : "Một hướng dẫn hành trình ngắn gọn giúp giảm băn khoăn từ lúc đặt căn đến khi nhận nhà."}</p></div>
      <div className="mt-12 grid border-y border-[#16311c]/15 md:grid-cols-2">
        {journeySteps.map((item, index) => { const Icon = item.icon; return <article key={item.title.vi} className={`border-b border-[#16311c]/15 py-7 md:px-7 ${index % 2 === 0 ? "md:border-r md:pl-0" : ""} ${index > 1 ? "md:border-b-0" : ""}`}><div className="flex items-center gap-3"><span className="text-[.58rem] font-bold text-[#80613f]">0{index + 1}</span><Icon className="h-5 w-5 text-[#80613f]" /></div><h3 className="mt-6 font-serif text-3xl font-medium">{inLocale(item.title, locale)}</h3><p className="mt-3 text-sm leading-7 text-[#16311c]/65">{inLocale(item.text, locale)}</p></article>; })}
      </div>
      <a href={contactHref} className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#16311c] px-6 text-sm font-bold text-[#eae1d2]">{locale === "en" ? "Ask LAKA about your journey" : "Hỏi LAKA về hành trình"} <ArrowRight className="h-4 w-4" /></a>
    </div>
  </section>;
}
