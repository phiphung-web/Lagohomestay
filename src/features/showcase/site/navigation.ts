export const navItems = [
  ["Lưu trú", "luu-tru"],
  ["Ẩm thực", "am-thuc"],
  ["Trải nghiệm", "trai-nghiem"],
  ["Dịch vụ", "dich-vu"],
  ["Về LAKA", "ve-laka"],
  ["Thông tin", "thong-tin"],
] as const;

export const englishNavItems = [
  ["Stays", "luu-tru"],
  ["Dining", "am-thuc"],
  ["Experiences", "trai-nghiem"],
  ["Services", "dich-vu"],
  ["About LAKA", "ve-laka"],
  ["Information", "thong-tin"],
] as const;

export function scoped(basePath: string, path = "") {
  return path ? `${basePath}/${path}` : basePath || "/";
}
