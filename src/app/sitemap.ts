import type { MetadataRoute } from "next";
import { stays } from "@/features/stays/data/demo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const root = "/mau/tinh-lang";
  const pages = ["", "/luu-tru", "/trai-nghiem", "/thu-vien", "/ve-lago", "/thong-tin", "/chinh-sach", "/lien-he", "/dat-phong", "/tra-cuu"];
  const vietnamese = [
    ...pages.map((path) => ({ path, priority: path === "" ? 1 : .72 })),
    ...stays.map((stay) => ({ path: `/luu-tru/${stay.slug}`, priority: .82 }))
  ];

  return [
    ...vietnamese.map(({ path, priority }) => ({
      url: `${base}${root}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority
    })),
    ...vietnamese.map(({ path, priority }) => ({
      url: `${base}${root}/en${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: Math.max(.5, priority - .08)
    }))
  ];
}
