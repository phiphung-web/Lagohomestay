"use client";

import { useEffect, useState } from "react";
import { getTemplateTimeGreeting, type DayPeriod, type GreetingMood } from "@/features/showcase/lib/time-greeting";

const fallback: Record<GreetingMood, string> = {
  editorial: "LAKA · theo nhịp thật chậm",
  cinematic: "LAKA · một thước phim thiên nhiên",
  organic: "LAKA · kỳ nghỉ đang chờ"
};

export function TemplateTimeGreeting({ mood }: { mood: GreetingMood }) {
  const [greeting, setGreeting] = useState<{ period: DayPeriod | "loading"; message: string }>({ period: "loading", message: fallback[mood] });

  useEffect(() => {
    const update = () => setGreeting(getTemplateTimeGreeting(mood, new Date().getHours()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [mood]);

  const theme = mood === "cinematic"
    ? "border-white/15 bg-black/20 text-white/72"
    : mood === "organic"
      ? "border-[#17321d]/8 bg-white text-[#17321d] shadow-sm"
      : "border-[#17321d]/15 bg-[#e7ded1] text-[#17321d]/72";
  const dot = mood === "cinematic" ? "bg-[#c7a882]" : mood === "organic" ? "bg-[#f18b68]" : "bg-[#80613f]";

  return <span data-period={greeting.period} className={`time-greeting-enter inline-flex min-h-8 max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-[.58rem] font-bold uppercase leading-4 tracking-[.12em] ${theme}`}><i aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />{greeting.message}</span>;
}
