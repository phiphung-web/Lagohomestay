import type { MetadataRoute } from "next";
import { stays } from "@/features/stays/data/stay-catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const pages = [
    { path: "", priority: 1 },
    { path: "/luu-tru", priority: 0.8 },
    { path: "/trai-nghiem", priority: 0.78 },
    { path: "/dich-vu", priority: 0.72 },
    { path: "/am-thuc", priority: 0.76 },
    { path: "/ve-laka", priority: 0.78 },
    { path: "/thong-tin", priority: 0.62 },
    { path: "/faq", priority: 0.58 },
    { path: "/di-chuyen", priority: 0.64 },
    { path: "/chinh-sach-luu-tru", priority: 0.5 },
    { path: "/dieu-khoan", priority: 0.32 },
    { path: "/bao-mat", priority: 0.32 },
    { path: "/lien-he", priority: 0.68 },
  ];
  const vietnamese = [
    ...pages,
    ...stays.map((stay) => ({ path: `/luu-tru/${stay.slug}`, priority: 0.82 })),
  ];

  return [
    ...vietnamese.map(({ path, priority }) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority,
    })),
    ...vietnamese.map(({ path, priority }) => ({
      url: `${base}/en${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: Math.max(0.5, priority - 0.08),
    })),
  ];
}
