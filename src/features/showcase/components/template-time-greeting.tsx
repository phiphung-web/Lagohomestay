import type { GreetingMood } from "@/features/showcase/lib/time-greeting";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const vietnameseCopy: Record<GreetingMood, string> = {
  editorial: "LAKA · theo nhịp thật chậm",
  cinematic: "LAKA · một thước phim thiên nhiên",
  organic: "LAKA · kỳ nghỉ đang chờ"
};

const englishCopy: Record<GreetingMood, string> = {
  editorial: "LAKA · living at an unhurried pace",
  cinematic: "LAKA · a film made by nature",
  organic: "LAKA · your escape is waiting"
};

export function TemplateTimeGreeting({ mood, locale = "vi" }: { mood: GreetingMood; locale?: ShowcaseLocale }) {
  const theme = mood === "cinematic"
    ? "border-white/15 bg-black/20 text-white/72"
    : mood === "organic"
      ? "border-[#16311c]/8 bg-white text-[#16311c] shadow-sm"
      : "border-[#16311c]/15 bg-[#e7ded1] text-[#16311c]/72";
  const dot = mood === "cinematic" ? "bg-[#c7a882]" : mood === "organic" ? "bg-[#f18b68]" : "bg-[#80613f]";
  const message = locale === "en" ? englishCopy[mood] : vietnameseCopy[mood];

  return <span className={`inline-flex min-h-8 max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-[.58rem] font-bold uppercase leading-4 tracking-[.12em] ${theme}`}><i aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />{message}</span>;
}
