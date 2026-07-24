"use client";

import { useEffect } from "react";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function TemplateDocumentLocale({ locale }: { locale: ShowcaseLocale }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [locale]);

  return null;
}
