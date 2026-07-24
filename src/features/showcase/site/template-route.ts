import type { Metadata } from "next";
import { stays } from "@/features/stays/data/demo-data";

export type TemplateRoute =
  | { kind: "home" }
  | { kind: "stays" }
  | { kind: "stay"; slug: string }
  | { kind: "experience" }
  | { kind: "services" }
  | { kind: "gallery" }
  | { kind: "about" }
  | { kind: "faq" }
  | { kind: "policy" }
  | { kind: "contact" }
  | { kind: "booking" }
  | { kind: "lookup" };

const singlePages = {
  "luu-tru": "stays",
  "trai-nghiem": "experience",
  "dich-vu": "services",
  "thu-vien": "gallery",
  "ve-lago": "about",
  "thong-tin": "faq",
  "chinh-sach": "policy",
  "lien-he": "contact",
  "dat-phong": "booking",
  "tra-cuu": "lookup"
} as const;

export function resolveTemplateRoute(path: string[] | undefined): TemplateRoute | null {
  if (!path?.length) return { kind: "home" };
  if (path.length === 1 && path[0] in singlePages) {
    return { kind: singlePages[path[0] as keyof typeof singlePages] } as TemplateRoute;
  }
  if (path.length === 2 && path[0] === "luu-tru" && stays.some((stay) => stay.slug === path[1])) {
    return { kind: "stay", slug: path[1] };
  }
  return null;
}

const titles: Record<Exclude<TemplateRoute["kind"], "stay">, string> = {
  home: "Trang chủ",
  stays: "Các căn nhà",
  experience: "Trải nghiệm",
  services: "Dịch vụ",
  gallery: "Thư viện",
  about: "Về LAKA",
  faq: "Thông tin cần biết",
  policy: "Chính sách lưu trú",
  contact: "Liên hệ",
  booking: "Chọn căn và đặt chỗ",
  lookup: "Xem thông tin đặt chỗ"
};

export function getTemplateMetadata(route: TemplateRoute, templateName: string): Metadata {
  if (route.kind === "stay") {
    const stay = stays.find((item) => item.slug === route.slug)!;
    return { title: `${stay.name} · Mẫu ${templateName}`, description: stay.description };
  }
  return {
    title: `${titles[route.kind]} · Mẫu ${templateName}`,
    description: `Khám phá LAKA Homestay qua hướng thiết kế ${templateName.toLowerCase()}.`
  };
}

export function templateStaticPaths() {
  return [
    [],
    ...Object.keys(singlePages).map((segment) => [segment]),
    ...stays.map((stay) => ["luu-tru", stay.slug])
  ].map((path) => ({ path }));
}
