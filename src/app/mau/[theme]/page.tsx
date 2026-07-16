import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CinematicTemplate } from "@/features/showcase/components/templates/cinematic-template";
import { EditorialTemplate } from "@/features/showcase/components/templates/editorial-template";
import { OrganicTemplate } from "@/features/showcase/components/templates/organic-template";
import { showcaseTemplates, type ShowcaseTemplateSlug } from "@/features/showcase/data/templates";

const templateComponents = {
  "tinh-lang": EditorialTemplate,
  "dien-anh": CinematicTemplate,
  "song-dong": OrganicTemplate
} satisfies Record<ShowcaseTemplateSlug, React.ComponentType>;

export function generateStaticParams() {
  return showcaseTemplates.map((template) => ({ theme: template.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ theme: string }> }): Promise<Metadata> {
  const { theme } = await params;
  const template = showcaseTemplates.find((item) => item.slug === theme);
  if (!template) return { title: "Mẫu giao diện" };
  return { title: `Mẫu ${template.number} — ${template.name}`, description: template.description };
}

export default async function TemplatePage({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  if (!(theme in templateComponents)) notFound();
  const Template = templateComponents[theme as ShowcaseTemplateSlug];
  return <Template />;
}
