"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { languageHref, type ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function TemplateLanguageSwitcher({ locale, compact = false, alwaysVisible = false }: { locale: ShowcaseLocale; compact?: boolean; alwaysVisible?: boolean }) {
  const pathname = usePathname();

  return <div
    aria-label={locale === "en" ? "Choose language" : "Chọn ngôn ngữ"}
    className={`${alwaysVisible ? "flex" : "hidden sm:flex"} items-center rounded-lg border border-current/25 bg-black/5 p-1 text-xs font-bold`}
  >
    {(["vi", "en"] as const).map((item) => <Link
      key={item}
      href={languageHref(pathname, item)}
      hrefLang={item}
      lang={item}
      aria-current={locale === item ? "page" : undefined}
      className={`focus-ring flex h-7 items-center justify-center rounded-md px-3 text-[11px] font-extrabold uppercase tracking-wider transition ${locale === item ? "bg-[#16311c] text-white shadow-sm" : "opacity-60 hover:opacity-100 hover:text-[#16311c]"}`}
    >
      <span>{item}</span>
    </Link>)}
  </div>;
}
