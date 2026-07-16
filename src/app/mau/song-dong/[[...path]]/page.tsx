import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SongDongSite } from "@/features/showcase/templates/song-dong/site";
import { getTemplateMetadata, resolveTemplateRoute, templateStaticPaths } from "@/features/showcase/site/template-route";

type Props = { params: Promise<{ path?: string[] }> };

export function generateStaticParams() { return templateStaticPaths(); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = resolveTemplateRoute((await params).path);
  return route ? getTemplateMetadata(route, "Sống động") : {};
}

export default async function Page({ params }: Props) {
  const route = resolveTemplateRoute((await params).path);
  if (!route) notFound();
  return <SongDongSite route={route} />;
}
