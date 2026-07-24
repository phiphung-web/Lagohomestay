"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Clock3, MoonStar, Sparkles, Sun, Sunrise, Sunset } from "lucide-react";
import {
  getHourInTimeZone,
  LAKA_TIME_ZONE,
  resolveAtmosphere,
  type ActiveAtmosphere,
  type AtmosphereMode
} from "@/features/showcase/lib/atmosphere";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const STORAGE_KEY = "laka-atmosphere";

const options = [
  { mode: "auto", icon: Sparkles, vi: "Tự động", en: "Auto" },
  { mode: "dawn", icon: Sunrise, vi: "Bình minh", en: "Dawn" },
  { mode: "day", icon: Sun, vi: "Ban ngày", en: "Day" },
  { mode: "sunset", icon: Sunset, vi: "Hoàng hôn", en: "Sunset" },
  { mode: "night", icon: MoonStar, vi: "Ban đêm", en: "Night" }
] as const;

const atmosphereCopy: Record<ActiveAtmosphere, { vi: string; en: string }> = {
  dawn: { vi: "Ánh sớm đang mở ngày", en: "First light is opening the day" },
  day: { vi: "Thiên nhiên đang lên màu", en: "Nature is fully awake" },
  sunset: { vi: "Giờ vàng vừa chạm LAKA", en: "Golden hour has reached LAKA" },
  night: { vi: "LAKA đã dịu ánh đèn", en: "LAKA has softened the lights" }
};

function readStoredMode(): AtmosphereMode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return options.some((option) => option.mode === stored) ? stored as AtmosphereMode : "auto";
  } catch {
    return "auto";
  }
}

export function TemplateAtmosphereController({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  const [mode, setMode] = useState<AtmosphereMode>("auto");
  const [now, setNow] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMode(readStoredMode());
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const hour = now ? getHourInTimeZone(now) : 12;
  const active = resolveAtmosphere(mode, hour);
  const time = useMemo(() => now
    ? new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "vi-VN", {
      timeZone: LAKA_TIME_ZONE,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23"
    }).format(now)
    : "--:--:--", [locale, now]);

  useEffect(() => {
    document.documentElement.dataset.lakaAtmosphere = active;
    window.dispatchEvent(new CustomEvent("laka-atmosphere-change", { detail: { active, mode } }));
    return () => {
      delete document.documentElement.dataset.lakaAtmosphere;
    };
  }, [active, mode]);

  const selectMode = (next: AtmosphereMode) => {
    setMode(next);
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The visual control still works when storage is unavailable.
    }
  };

  const ActiveIcon = options.find((option) => option.mode === active)?.icon ?? Sun;

  return <>
    <aside className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-[65] w-[min(350px,calc(100%-24px))] text-[#eae1d2] sm:right-5" aria-label={locale === "en" ? "LAKA atmosphere" : "Bầu không khí LAKA"}>
      <div className={`overflow-hidden rounded-[26px] border border-white/16 bg-[#10251d]/88 shadow-[0_24px_80px_rgba(3,18,13,.32)] backdrop-blur-2xl transition-[max-height,opacity,transform] duration-500 ease-out ${open ? "mb-2 max-h-[440px] translate-y-0 opacity-100" : "pointer-events-none mb-0 max-h-0 translate-y-3 opacity-0"}`}>
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4 border-b border-white/12 pb-4">
            <div><p className="text-[.56rem] font-bold uppercase tracking-[.2em] text-[#dfc6a5]">{locale === "en" ? "See LAKA in another light" : "Ngắm LAKA trong ánh sáng khác"}</p><p className="mt-2 text-xs leading-5 text-white/52">{locale === "en" ? "Automatic by default. Choose a moment whenever curiosity calls." : "Mặc định tự động. Bạn có thể chủ động chọn một khoảnh khắc để khám phá."}</p></div>
            <button type="button" onClick={() => setOpen(false)} aria-label={locale === "en" ? "Close atmosphere menu" : "Đóng bảng bầu không khí"} className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12"><ChevronDown className="h-4 w-4" /></button>
          </div>
          <div role="radiogroup" aria-label={locale === "en" ? "Display atmosphere" : "Bầu không khí hiển thị"} className="mt-3 grid gap-1.5">
            {options.map((option) => {
              const Icon = option.icon;
              const selected = mode === option.mode;
              return <button
                key={option.mode}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => selectMode(option.mode)}
                className={`focus-ring flex min-h-11 items-center gap-3 rounded-2xl px-3 text-left text-xs font-bold transition duration-300 ${selected ? "bg-[#eae1d2] text-[#16311c]" : "text-white/66 hover:bg-white/8 hover:text-white"}`}
              >
                <span className={`grid h-8 w-8 place-items-center rounded-full ${selected ? "bg-[#16311c] text-[#eae1d2]" : "bg-white/8"}`}><Icon className="h-4 w-4" /></span>
                <span className="flex-1">{locale === "en" ? option.en : option.vi}</span>
                {option.mode === "auto" && <span className="text-[.52rem] font-bold uppercase tracking-wider opacity-55">{locale === "en" ? "LAKA time" : "Giờ LAKA"}</span>}
                {selected && <Check className="h-4 w-4" />}
              </button>;
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className="focus-ring ml-auto flex min-h-[58px] w-[225px] max-w-full items-center gap-3 rounded-full border border-white/18 bg-[#10251d]/88 py-2 pl-2 pr-4 text-left shadow-[0_18px_60px_rgba(3,18,13,.3)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-white/32 sm:w-auto"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#eae1d2] text-[#16311c]"><ActiveIcon className="h-[18px] w-[18px]" /></span>
        <span className="min-w-0 flex-1"><span className="flex items-center gap-1.5 text-[.52rem] font-bold uppercase tracking-[.16em] text-[#dfc6a5]"><Clock3 className="h-3 w-3" /> LAKA · GMT+7</span><span className="mt-0.5 block truncate text-xs font-bold">{time}<span className="hidden sm:inline"> · {atmosphereCopy[active][locale]}</span></span></span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-white/45 transition duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
    </aside>
  </>;
}
