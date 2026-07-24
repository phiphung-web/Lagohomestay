"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { guestStories } from "@/features/showcase/data/showcase-content";
import { stays } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const englishStories = [
  { quote: "For the first time in a long while, our whole family sat down for breakfast without anyone watching the clock.", name: "Illustrative guest story 01", stay: "A weekend at Forest House" },
  { quote: "We came for the beautiful home, but what stayed with us was the evening we spent talking on the veranda.", name: "Illustrative guest story 02", stay: "Two nights at Cloud House" },
  { quote: "Private enough to feel entirely ours, yet warm enough that nobody felt isolated. It was just right for meeting again.", name: "Illustrative guest story 03", stay: "A reunion at LAKA House" }
];

const storyImages = [
  stays.find((stay) => stay.slug === "nha-rung")!.image,
  stays.find((stay) => stay.slug === "nha-may")!.image,
  stays.find((stay) => stay.slug === "lago-house")!.image
];

export function HomeGuestStories({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  const [active, setActive] = useState(0);
  const stories = locale === "en" ? englishStories : guestStories;
  const story = stories[active];
  const change = (direction: number) => setActive((current) => (current + direction + stories.length) % stories.length);

  return <section id="cam-nhan" className="relative min-h-[92svh] scroll-mt-20 overflow-hidden bg-[#0b2119] text-white" aria-labelledby="guest-stories-title">
    {storyImages.map((image, index) => <Image
      key={image}
      src={image}
      alt=""
      fill
      sizes="100vw"
      aria-hidden="true"
      className={`object-cover transition duration-[1200ms] ease-out ${active === index ? "scale-100 opacity-55" : "scale-[1.035] opacity-0"}`}
    />)}
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,22,16,.92)_0%,rgba(5,22,16,.62)_48%,rgba(5,22,16,.2)_100%)]" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#06140f]/80 via-transparent to-[#06140f]/22" />

    <div className="relative z-10 mx-auto flex min-h-[92svh] w-[min(1360px,calc(100%-40px))] flex-col justify-between py-20 sm:py-28">
      <div className="flex items-center justify-between gap-6">
        <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">{locale === "en" ? "Stories guests take home" : "Điều khách mang về"}</p>
        <p className="hidden text-[.58rem] font-bold uppercase tracking-[.16em] text-white/40 sm:block">{locale === "en" ? "Illustrative stories · pending real reviews" : "Tình huống minh họa · chờ phản hồi thực tế"}</p>
      </div>

      <div key={active} className="template-page-enter max-w-5xl py-20">
        <Quote className="h-8 w-8 text-[#dfc6a5]" />
        <h2 id="guest-stories-title" className="mt-8 font-serif text-[clamp(2.8rem,6.8vw,6.8rem)] font-medium leading-[1.02] tracking-[-.055em]">“{story.quote}”</h2>
        <p className="mt-8 text-[.62rem] font-bold uppercase tracking-[.18em] text-white/58">{story.name} · {story.stay}</p>
      </div>

      <div className="flex flex-col gap-6 border-t border-white/18 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label={locale === "en" ? "Guest stories" : "Các câu chuyện của khách"} className="flex gap-2">
          {stories.map((item, index) => <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={`${locale === "en" ? "Story" : "Câu chuyện"} ${index + 1}`}
            onClick={() => setActive(index)}
            className={`focus-ring h-1.5 rounded-full transition-all duration-500 ${active === index ? "w-16 bg-[#dfc6a5]" : "w-8 bg-white/24 hover:bg-white/45"}`}
          />)}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => change(-1)} aria-label={locale === "en" ? "Previous story" : "Câu chuyện trước"} className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/22 transition hover:bg-white hover:text-[#16311c]"><ArrowLeft className="h-4 w-4" /></button>
          <button type="button" onClick={() => change(1)} aria-label={locale === "en" ? "Next story" : "Câu chuyện tiếp theo"} className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/22 transition hover:bg-white hover:text-[#16311c]"><ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  </section>;
}
