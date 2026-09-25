export type ShowcaseLocale = "vi" | "en";

export function localizedBasePath(basePath: string, locale: ShowcaseLocale) {
  return locale === "en" ? `${basePath}/en` : basePath;
}

export function resolveLocalizedPath(path: string[] | undefined) {
  if (path?.[0] === "en") {
    return { locale: "en" as const, routePath: path.slice(1) };
  }
  return { locale: "vi" as const, routePath: path };
}

export function languageHref(pathname: string, locale: ShowcaseLocale) {
  if (locale === "en") {
    if (pathname === "/en" || pathname.startsWith("/en/")) return pathname;
    return pathname === "/" ? "/en" : `/en${pathname}`;
  }

  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}
