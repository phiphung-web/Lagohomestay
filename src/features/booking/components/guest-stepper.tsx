"use client";

import { Minus, Plus, Users } from "lucide-react";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  tone?: "light" | "glass";
  locale?: ShowcaseLocale;
};

export function GuestStepper({ value, onChange, min = 1, max = 12, className = "", tone = "light", locale = "vi" }: Props) {
  const change = (next: number) => onChange(Math.min(max, Math.max(min, next)));
  return <div className={`rounded-2xl border px-3 py-2.5 text-lago-ink ${tone === "glass" ? "border-white/20 bg-white/95" : "border-lago-ink/10 bg-white"} ${className}`}>
    <span className="flex items-center gap-2 text-[.62rem] font-bold uppercase tracking-wider text-lago-ink/45"><Users className="h-3.5 w-3.5 text-lago-clay" />{locale === "en" ? "Guests" : "Số khách"}</span>
    <div className="mt-1 flex items-center justify-between gap-2">
      <button type="button" onClick={() => change(value - 1)} disabled={value <= min} aria-label={locale === "en" ? "Decrease guests" : "Giảm số khách"} className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full border border-lago-ink/12 bg-lago-cream transition hover:border-lago-forest/30 disabled:opacity-35"><Minus className="h-3.5 w-3.5" /></button>
      <output aria-live="polite" className="min-w-[72px] text-center text-sm font-bold">{value} {locale === "en" ? (value === 1 ? "guest" : "guests") : "khách"}</output>
      <button type="button" onClick={() => change(value + 1)} disabled={value >= max} aria-label={locale === "en" ? "Increase guests" : "Tăng số khách"} className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full border border-lago-ink/12 bg-lago-cream transition hover:border-lago-forest/30 disabled:opacity-35"><Plus className="h-3.5 w-3.5" /></button>
    </div>
  </div>;
}
