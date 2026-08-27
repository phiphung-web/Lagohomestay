import Image from "next/image";
import { experienceMoments } from "@/features/showcase/data/showcase-content";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { englishExperienceMoments } from "@/features/showcase/i18n/showcase-copy";

type Mood = "editorial" | "cinematic" | "organic";

const momentImages = [conceptImages.detail1, conceptImages.experience, conceptImages.detail2, conceptImages.forest];

export function TemplateExperienceStory({ mood, locale = "vi" }: { mood: Mood; locale?: ShowcaseLocale }) {
  const localizedMoments = locale === "en"
    ? experienceMoments.map((moment, index) => ({ ...moment, ...englishExperienceMoments[index] }))
    : experienceMoments;

  if (mood === "cinematic") return <>
    <section id="nhip-song" className="scroll-mt-24 mx-auto w-[min(1500px,calc(100%-40px))] py-20 sm:py-28">
      <div className="mb-8 flex items-end justify-between border-b border-white/12 pb-7"><div><p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#c7a882]">{locale === "en" ? "A day · Four chapters" : "Một ngày · Bốn chương"}</p><p className="mt-3 text-sm text-white/48">{locale === "en" ? "From light touching the curtains to evening lights." : "Từ lúc ánh sáng chạm rèm cửa đến khi căn nhà lên đèn."}</p></div><span className="font-serif text-4xl text-white/18">24H</span></div>
      <div>{experienceMoments.map(({ icon: Icon, time, title, text }, index) => <article key={time} className="grid gap-7 border-b border-white/12 py-8 lg:grid-cols-[90px_1fr_1fr] lg:items-center"><div><span className="text-[.58rem] font-bold uppercase tracking-[.18em] text-white/48">{locale === "en" ? `Chapter 0${index + 1}` : `Chương 0${index + 1}`}</span><p className="mt-2 text-sm font-bold text-[#c7a882]">{time}</p></div><div className={index % 2 ? "lg:order-3 lg:pl-10" : "lg:pr-10"}><Icon className="h-6 w-6 text-[#c7a882]" /><h2 className="mt-6 font-serif text-4xl font-medium leading-[1.02] tracking-[-.04em] sm:text-5xl">{title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/48">{text}</p></div><div className={`relative aspect-[16/10] overflow-hidden ${index % 2 ? "lg:order-2" : ""}`}><Image src={momentImages[index]} alt={`${title} - ảnh minh họa`} fill sizes="(max-width:1024px) 100vw, 42vw" className="object-cover opacity-72 transition duration-1000 hover:scale-[1.025] hover:opacity-100" /><span className="absolute inset-0 border border-white/10" /><span className="absolute bottom-3 left-3 bg-black/55 px-3 py-1.5 text-[.56rem] font-bold uppercase tracking-wider text-white backdrop-blur">Khung {String(index + 1).padStart(2, "0")} · minh họa</span></div></article>)}</div>
    </section>
  </>;

  if (mood === "organic") {
    const cardStyles = ["bg-white lg:col-span-7", "bg-[#f7cf58] lg:col-span-5", "bg-[#f18b68] lg:col-span-5", "bg-[#dce9c6] lg:col-span-7"];
    return <>
      <section id="nhip-song" className="scroll-mt-24 mx-auto w-[min(1380px,calc(100%-28px))] py-20 sm:py-28"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">{experienceMoments.map(({ icon: Icon, time, title, text }, index) => <article key={time} className={`group relative min-h-[310px] overflow-hidden rounded-[38px] p-7 shadow-[0_20px_60px_rgba(33,72,61,.08)] transition duration-500 hover:-translate-y-2 ${cardStyles[index]} text-[#16311c]`}><span aria-hidden="true" className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[24px] border-[#16311c]/5 transition duration-500 group-hover:scale-110" /><div className="relative flex h-full flex-col"><div className="flex items-center justify-between"><span className="rounded-full bg-[#16311c] px-4 py-2 text-[.62rem] font-extrabold text-white">{time}</span><Icon className="h-7 w-7" /></div><div className="mt-auto pt-16"><p className="text-[.58rem] font-extrabold uppercase tracking-[.14em] opacity-80">{locale === "en" ? `Moment 0${index + 1}` : `Khoảnh khắc 0${index + 1}`}</p><h2 className="mt-3 text-3xl font-extrabold tracking-[-.04em] sm:text-4xl">{title}</h2><p className="mt-3 max-w-xl text-sm font-medium leading-6 opacity-80">{text}</p></div></div></article>)}</div></section>
    </>;
  }

  return <>
    <section id="nhip-song" className="scroll-mt-24 mx-auto w-[min(1120px,calc(100%-40px))] py-20 sm:py-28">
      <div className="mb-12 grid gap-6 border-b border-[#16311c]/15 pb-8 sm:grid-cols-[.55fr_1fr] sm:items-start">
        <h2 className="laka-heading-section">{locale === "en" ? "A day in four moments" : "Nhật ký một ngày"}</h2>
        <p className="laka-section-lead">{locale === "en" ? "Time at LAKA is measured in light, meals and conversations." : "Thời gian ở LAKA được đếm bằng ánh sáng, bữa ăn và những cuộc trò chuyện."}</p>
      </div>
      <div>
        {localizedMoments.map(({ icon: Icon, time, title, text }, index) => (
          <article key={time} className="grid gap-5 border-b border-[#16311c]/15 py-9 sm:grid-cols-[70px_90px_1fr] sm:items-start">
            <span className="text-xs font-bold text-[#80613f]">0{index + 1}</span>
            <span className="text-xs font-bold text-[#16311c]/72">{time}</span>
            <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
              <div>
                <Icon className="mb-5 h-6 w-6 text-[#80613f]" />
                <h3 className="laka-heading-card">{title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#16311c]/72">{text}</p>
              </div>
              <span className="hidden font-serif text-5xl italic text-[#16311c]/18 sm:block">{time.slice(0, 2)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  </>;
}
