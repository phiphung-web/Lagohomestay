"use client";

import { useEffect, useState } from "react";
import { getTemplateTimeGreeting, type DayPeriod, type GreetingMood } from "@/features/showcase/lib/time-greeting";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const fallback: Record<GreetingMood, string> = {
  editorial: "LAKA · theo nhịp thật chậm",
  cinematic: "LAKA · một thước phim thiên nhiên",
  organic: "LAKA · kỳ nghỉ đang chờ"
};

const englishFallback: Record<GreetingMood, string> = {
  editorial: "LAKA · living at an unhurried pace",
  cinematic: "LAKA · a film made by nature",
  organic: "LAKA · your escape is waiting"
};

const englishGreeting: Record<DayPeriod, Record<GreetingMood, string>> = {
  morning: { editorial: "Good morning · let the day begin gently", cinematic: "Morning light has found LAKA", organic: "Good morning · a green day awaits" },
  day: { editorial: "Good afternoon · leave a little room to pause", cinematic: "The sun is moving across the lake", organic: "Good afternoon · come outside and play" },
  evening: { editorial: "Golden hour · time moves more slowly here", cinematic: "The lake is holding the last light", organic: "Sunset · dinner tastes better together" },
  night: { editorial: "Good evening · the world can wait", cinematic: "The moon has risen over LAKA", organic: "Good evening · a cosy night awaits" }
};

export function TemplateTimeGreeting({ mood, locale = "vi" }: { mood: GreetingMood; locale?: ShowcaseLocale }) {
  const [greeting, setGreeting] = useState<{ period: DayPeriod | "loading"; message: string }>({ period: "loading", message: locale === "en" ? englishFallback[mood] : fallback[mood] });

  useEffect(() => {
    const update = () => {
      const next = getTemplateTimeGreeting(mood, new Date().getHours());
      setGreeting(locale === "en" ? { ...next, message: englishGreeting[next.period][mood] } : next);
    };
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [locale, mood]);

  const theme = mood === "cinematic"
    ? "border-white/15 bg-black/20 text-white/72"
    : mood === "organic"
      ? "border-[#16311c]/8 bg-white text-[#16311c] shadow-sm"
      : "border-[#16311c]/15 bg-[#e7ded1] text-[#16311c]/72";
  const dot = mood === "cinematic" ? "bg-[#c7a882]" : mood === "organic" ? "bg-[#f18b68]" : "bg-[#80613f]";

  return <span data-period={greeting.period} className={`time-greeting-enter inline-flex min-h-8 max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-[.58rem] font-bold uppercase leading-4 tracking-[.12em] ${theme}`}><i aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />{greeting.message}</span>;
}
