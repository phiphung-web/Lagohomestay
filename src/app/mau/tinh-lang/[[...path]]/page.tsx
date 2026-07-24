import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stays } from "@/features/stays/data/demo-data";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";
import { languageHref, resolveLocalizedTemplatePath } from "@/features/showcase/i18n/locale";
import { TinhLangSite } from "@/features/showcase/templates/tinh-lang/site";
import { getTemplateMetadata, resolveTemplateRoute, templateStaticPaths, type TemplateRoute } from "@/features/showcase/site/template-route";

type Props = { params: Promise<{ path?: string[] }> };

const englishTitles: Record<Exclude<TemplateRoute["kind"], "stay">, string> = {
  home: "Home",
  stays: "Private homes",
  experience: "Experiences",
  services: "Services",
  gallery: "Gallery",
  about: "About LAKA",
  faq: "Good to know",
  policy: "Stay policies",
  contact: "Contact",
  booking: "Find a home",
  lookup: "Find your booking"
};

export function generateStaticParams() {
  const vietnamesePaths = templateStaticPaths();
  const englishPaths = vietnamesePaths.map(({ path }) => ({ path: ["en", ...path] }));
  return [...vietnamesePaths, ...englishPaths];
}

function routePath(path: string[] | undefined) {
  return `/mau/tinh-lang${path?.length ? `/${path.join("/")}` : ""}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rawPath = (await params).path;
  const localized = resolveLocalizedTemplatePath(rawPath);
  const route = resolveTemplateRoute(localized.routePath);
  if (!route) return {};

  const currentPath = routePath(rawPath);
  const alternates = {
    canonical: currentPath,
    languages: {
      "vi-VN": languageHref(currentPath, "vi"),
      "en-US": languageHref(currentPath, "en")
    }
  };

  if (localized.locale === "vi") {
    return {
      ...getTemplateMetadata(route, "Tĩnh lặng"),
      alternates,
      openGraph: { locale: "vi_VN", alternateLocale: ["en_US"] }
    };
  }

  const title = route.kind === "stay"
    ? localizeStay(stays.find((stay) => stay.slug === route.slug)!, "en").name
    : englishTitles[route.kind];

  return {
    title: `${title} · Quiet Living`,
    description: "Discover LAKA Homestay through the Quiet Living editorial concept.",
    alternates,
    openGraph: {
      title: `${title} · Quiet Living · LAKA Homestay`,
      description: "Eight home types and fifteen private homes surrounded by nature, designed for slower days and meaningful time together.",
      locale: "en_US",
      alternateLocale: ["vi_VN"],
      type: "website"
    }
  };
}

export default async function Page({ params }: Props) {
  const localized = resolveLocalizedTemplatePath((await params).path);
  const route = resolveTemplateRoute(localized.routePath);
  if (!route) notFound();
  return <TinhLangSite route={route} locale={localized.locale} />;
}
