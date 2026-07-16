import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DienAnhSite } from "@/features/showcase/templates/dien-anh/site";
import { getTemplateMetadata, resolveTemplateRoute, templateStaticPaths } from "@/features/showcase/site/template-route";

type Props = { params: Promise<{ path?: string[] }> };

export function generateStaticParams() { return templateStaticPaths(); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = resolveTemplateRoute((await params).path);
  return route ? getTemplateMetadata(route, "Điện ảnh") : {};
}

export default async function Page({ params }: Props) {
  const route = resolveTemplateRoute((await params).path);
  if (!route) notFound();
  return <DienAnhSite route={route} />;
}
