import type { MetadataRoute } from "next";
import { stays } from "@/features/stays/data/demo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const pages = [
    { path: "", priority: 1 },
    { path: "/luu-tru", priority: .8 },
    { path: "/trai-nghiem", priority: .78 },
    { path: "/dich-vu", priority: .72 },
    { path: "/am-thuc", priority: .76 },
    { path: "/ve-laka", priority: .78 },
    { path: "/thong-tin", priority: .62 },
    { path: "/faq", priority: .58 },
    { path: "/di-chuyen", priority: .64 },
    { path: "/chinh-sach", priority: .5 },
    { path: "/chinh-sach-luu-tru", priority: .5 },
    { path: "/dieu-khoan", priority: .32 },
    { path: "/bao-mat", priority: .32 },
    { path: "/lien-he", priority: .58 },
    { path: "/dat-phong", priority: .35 },
    { path: "/tra-cuu", priority: .3 }
  ];
  const vietnamese = [
    ...pages,
    ...stays.map((stay) => ({ path: `/luu-tru/${stay.slug}`, priority: .82 }))
  ];

  return [
    ...vietnamese.map(({ path, priority }) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority
    })),
    ...vietnamese.map(({ path, priority }) => ({
      url: `${base}/en${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: Math.max(.5, priority - .08)
    }))
  ];
}
