import type { Metadata } from "next";
import { stays } from "@/features/stays/data/demo-data";

export type TemplateRoute =
  | { kind: "home" }
  | { kind: "stays" }
  | { kind: "stay"; slug: string }
  | { kind: "experience" }
  | { kind: "services" }
  | { kind: "dining" }
  | { kind: "about" }
  | { kind: "info" }
  | { kind: "faq" }
  | { kind: "policy" }
  | { kind: "directions" }
  | { kind: "terms" }
  | { kind: "privacy" }
  | { kind: "contact" };

const singlePages = {
  "luu-tru": "stays",
  "trai-nghiem": "experience",
  "dich-vu": "services",
  "am-thuc": "dining",
  "ve-laka": "about",
  "thong-tin": "info",
  "faq": "faq",
  "di-chuyen": "directions",
  "chinh-sach-luu-tru": "policy",
  "dieu-khoan": "terms",
  "bao-mat": "privacy",
  "lien-he": "contact"
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
  dining: "Ẩm thực",
  about: "Về LAKA",
  info: "Thông tin cần biết",
  faq: "Thông tin cần biết",
  policy: "Chính sách lưu trú",
  directions: "Hướng dẫn di chuyển",
  terms: "Điều khoản và điều kiện",
  privacy: "Chính sách bảo mật",
  contact: "Liên hệ"
};

export function getTemplateMetadata(route: TemplateRoute): Metadata {
  if (route.kind === "stay") {
    const stay = stays.find((item) => item.slug === route.slug)!;
    return { title: stay.name, description: stay.description };
  }
  return {
    title: titles[route.kind],
    description: "Khám phá các căn nhà, trải nghiệm và dịch vụ nghỉ dưỡng giữa thiên nhiên tại LAKA Homestay."
  };
}

export function templateStaticPaths() {
  return [
    [],
    ...Object.keys(singlePages).map((segment) => [segment]),
    ...stays.map((stay) => ["luu-tru", stay.slug])
  ].map((path) => ({ path }));
}
