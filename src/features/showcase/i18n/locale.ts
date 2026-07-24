export type ShowcaseLocale = "vi" | "en";

export function localizedTemplateBasePath(basePath: string, locale: ShowcaseLocale) {
  return locale === "en" ? `${basePath}/en` : basePath;
}

export function resolveLocalizedTemplatePath(path: string[] | undefined) {
  if (path?.[0] === "en") {
    return { locale: "en" as const, routePath: path.slice(1) };
  }
  return { locale: "vi" as const, routePath: path };
}

export function languageHref(pathname: string, locale: ShowcaseLocale) {
  const root = "/mau/tinh-lang";
  if (!pathname.startsWith(root)) return locale === "en" ? `${root}/en` : root;
  const suffix = pathname.slice(root.length);

  if (locale === "en") {
    return suffix === "/en" || suffix.startsWith("/en/") ? pathname : `${root}/en${suffix}`;
  }

  if (suffix === "/en") return root;
  if (suffix.startsWith("/en/")) return `${root}${suffix.slice(3)}`;
  return pathname;
}
