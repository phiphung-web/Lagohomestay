import type { MetadataRoute } from "next";
import { showcaseTemplates } from "@/features/showcase/data/templates";
import { stays } from "@/features/stays/data/demo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const paths = ["", "/luu-tru", "/trai-nghiem", "/thu-vien", "/ve-lago", "/thong-tin", "/chinh-sach", "/lien-he", "/dat-phong", "/tra-cuu"];
  const showcasePaths = ["", "/luu-tru", "/trai-nghiem", "/thu-vien", "/ve-lago", "/thong-tin", "/chinh-sach", "/lien-he", "/dat-phong", "/tra-cuu"];
  return [
    ...paths.map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .7 })),
    ...stays.map((stay) => ({ url: `${base}/luu-tru/${stay.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: .8 })),
    ...showcaseTemplates.flatMap((template) => [
      ...showcasePaths.map((path) => ({ url: `${base}/mau/${template.slug}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? .75 : .55 })),
      ...stays.map((stay) => ({ url: `${base}/mau/${template.slug}/luu-tru/${stay.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: .6 }))
    ])
  ];
}
