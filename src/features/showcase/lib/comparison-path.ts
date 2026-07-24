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

const englishPageLabels: Record<string, string> = {
  "": "Home",
  "/luu-tru": "Homes",
  "/trai-nghiem": "Experiences",
  "/thu-vien": "Gallery",
  "/ve-lago": "About LAKA",
  "/thong-tin": "Good to know",
  "/chinh-sach": "Policies",
  "/lien-he": "Contact",
  "/dat-phong": "Booking",
  "/tra-cuu": "Find booking"
};

export function getShowcaseRouteSuffix(pathname: string) {
  const suffix = templateRootPattern.test(pathname) ? pathname.replace(templateRootPattern, "") : "";
  if (suffix === "/en") return "";
  return suffix.startsWith("/en/") ? suffix.slice(3) : suffix;
}

export function getShowcasePageLabel(pathname: string, locale: "vi" | "en" = "vi") {
  const suffix = getShowcaseRouteSuffix(pathname);
  if (suffix.startsWith("/luu-tru/")) return locale === "en" ? "Home details" : "Chi tiết căn";
  const labels = locale === "en" ? englishPageLabels : pageLabels;
  return labels[suffix] ?? (locale === "en" ? "Home" : "Trang chủ");
}

export function getShowcaseTemplateHref(template: ShowcaseTemplateSlug, pathname: string) {
  const keepEnglish = template === "tinh-lang" && /^\/mau\/tinh-lang\/en(?:\/|$)/.test(pathname);
  return `/mau/${template}${keepEnglish ? "/en" : ""}${getShowcaseRouteSuffix(pathname)}`;
}
