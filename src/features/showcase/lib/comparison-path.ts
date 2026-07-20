import type { ShowcaseTemplateSlug } from "@/features/showcase/data/templates";

const templateRootPattern = /^\/mau\/(?:tinh-lang|dien-anh|song-dong)(?=\/|$)/;

const pageLabels: Record<string, string> = {
  "": "Trang chủ",
  "/luu-tru": "Các căn",
  "/trai-nghiem": "Trải nghiệm",
  "/thu-vien": "Thư viện",
  "/ve-lago": "Về LAKA",
  "/thong-tin": "Cần biết",
  "/chinh-sach": "Chính sách",
  "/lien-he": "Liên hệ",
  "/dat-phong": "Đặt chỗ",
  "/tra-cuu": "Tra cứu"
};

export function getShowcaseRouteSuffix(pathname: string) {
  return templateRootPattern.test(pathname) ? pathname.replace(templateRootPattern, "") : "";
}

export function getShowcasePageLabel(pathname: string) {
  const suffix = getShowcaseRouteSuffix(pathname);
  if (suffix.startsWith("/luu-tru/")) return "Chi tiết căn";
  return pageLabels[suffix] ?? "Trang chủ";
}

export function getShowcaseTemplateHref(template: ShowcaseTemplateSlug, pathname: string) {
  return `/mau/${template}${getShowcaseRouteSuffix(pathname)}`;
}
