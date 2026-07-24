"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { languageHref, type ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function TemplateLanguageSwitcher({ locale }: { locale: ShowcaseLocale }) {
  const pathname = usePathname();

  return <div aria-label={locale === "en" ? "Choose language" : "Chọn ngôn ngữ"} className="hidden items-center gap-1 rounded-full border border-current/15 p-1 sm:flex">
    <Languages aria-hidden="true" className="ml-2 h-3.5 w-3.5 opacity-55" />
    {(["vi", "en"] as const).map((item) => <Link
      key={item}
      href={languageHref(pathname, item)}
      hrefLang={item}
      lang={item}
      aria-current={locale === item ? "page" : undefined}
      className={`focus-ring grid min-h-8 min-w-9 place-items-center rounded-full text-[.62rem] font-extrabold uppercase tracking-wider transition ${locale === item ? "bg-[#17321d] text-white" : "opacity-55 hover:opacity-100"}`}
    >
      <span>{item}</span>
    </Link>)}
  </div>;
}
