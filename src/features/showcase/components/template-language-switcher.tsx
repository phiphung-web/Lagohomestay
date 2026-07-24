"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { languageHref, type ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function TemplateLanguageSwitcher({ locale, compact = false, alwaysVisible = false }: { locale: ShowcaseLocale; compact?: boolean; alwaysVisible?: boolean }) {
  const pathname = usePathname();

  return <div
    aria-label={locale === "en" ? "Choose language" : "Chọn ngôn ngữ"}
    className={`${alwaysVisible ? "flex" : "hidden sm:flex"} items-center gap-1 rounded-full border border-current/15 p-1`}
  >
    <Languages aria-hidden="true" className={`${compact ? "hidden" : "ml-2"} h-3.5 w-3.5 opacity-55`} />
    {(["vi", "en"] as const).map((item) => <Link
      key={item}
      href={languageHref(pathname, item)}
      hrefLang={item}
      lang={item}
      aria-current={locale === item ? "page" : undefined}
      className={`focus-ring grid min-h-8 place-items-center rounded-full text-[.6rem] font-extrabold uppercase tracking-wider transition ${compact ? "min-w-8" : "min-w-9"} ${locale === item ? "bg-[#16311c] text-[#eae1d2]" : "opacity-55 hover:opacity-100"}`}
    >
      <span>{item}</span>
    </Link>)}
  </div>;
}
