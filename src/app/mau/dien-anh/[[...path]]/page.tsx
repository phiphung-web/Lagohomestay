import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { templateStaticPaths } from "@/features/showcase/site/template-route";

type Props = { params: Promise<{ path?: string[] }> };

export const metadata: Metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return templateStaticPaths();
}

export default async function Page({ params }: Props) {
  const path = (await params).path;
  redirect(`/mau/tinh-lang${path?.length ? `/${path.join("/")}` : ""}`);
}
