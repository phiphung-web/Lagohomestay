import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TinhLangSite } from "@/features/showcase/templates/tinh-lang/site";
import { getTemplateMetadata, resolveTemplateRoute, templateStaticPaths } from "@/features/showcase/site/template-route";

type Props = { params: Promise<{ path?: string[] }> };

export function generateStaticParams() { return templateStaticPaths(); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = resolveTemplateRoute((await params).path);
  return route ? getTemplateMetadata(route, "Tĩnh lặng") : {};
}

export default async function Page({ params }: Props) {
  const route = resolveTemplateRoute((await params).path);
  if (!route) notFound();
  return <TinhLangSite route={route} />;
}
