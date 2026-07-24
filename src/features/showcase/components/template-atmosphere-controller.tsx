"use client";

import { useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import {
  DEFAULT_APPEARANCE,
  normalizeAppearance,
  toggleAppearance,
  type AppearanceMode
} from "@/features/showcase/lib/atmosphere";

const STORAGE_KEY = "laka-appearance";

function readStoredMode(): AppearanceMode {
  try {
    return normalizeAppearance(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return DEFAULT_APPEARANCE;
  }
}

export function TemplateAtmosphereController({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  const [mode, setMode] = useState<AppearanceMode>(DEFAULT_APPEARANCE);

  useEffect(() => {
    setMode(readStoredMode());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.lakaAtmosphere = mode;
    document.documentElement.style.colorScheme = mode === "night" ? "dark" : "light";
    return () => {
      delete document.documentElement.dataset.lakaAtmosphere;
      document.documentElement.style.removeProperty("color-scheme");
    };
  }, [mode]);

  const changeMode = () => {
    const next = toggleAppearance(mode);
    setMode(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The switch still works when storage is unavailable.
    }
  };

  const night = mode === "night";
  const label = locale === "en"
    ? `Switch to ${night ? "light" : "dark"} appearance`
    : `Chuyển sang giao diện ${night ? "sáng" : "tối"}`;

  return <button
    type="button"
    onClick={changeMode}
    aria-label={label}
    aria-pressed={night}
    className="laka-appearance-switch focus-ring fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 z-[65] flex h-12 items-center rounded-full border p-1 shadow-[0_18px_60px_rgba(3,18,13,.25)] backdrop-blur-xl transition duration-500 sm:right-5"
  >
    <span className={`grid h-10 w-10 place-items-center rounded-full transition duration-500 ${night ? "bg-transparent text-current" : "bg-[#eae1d2] text-[#16311c] shadow-sm"}`}>
      <Sun className="h-[18px] w-[18px]" />
      <span className="sr-only">{locale === "en" ? "Light" : "Sáng"}</span>
    </span>
    <span className={`grid h-10 w-10 place-items-center rounded-full transition duration-500 ${night ? "bg-[#eae1d2] text-[#16311c] shadow-sm" : "bg-transparent text-current"}`}>
      <MoonStar className="h-[18px] w-[18px]" />
      <span className="sr-only">{locale === "en" ? "Dark" : "Tối"}</span>
    </span>
  </button>;
}
