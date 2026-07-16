export const showcaseTemplates = [
  {
    slug: "tinh-lang",
    number: "01",
    name: "Tĩnh lặng",
    style: "Editorial Retreat",
    description: "Tinh tế, nhiều khoảng thở và cảm giác nghỉ dưỡng riêng tư.",
    audience: "Cặp đôi · khách hàng cao cấp",
    colors: ["#f3eee5", "#17312b", "#b86f52"]
  },
  {
    slug: "dien-anh",
    number: "02",
    name: "Điện ảnh",
    style: "Cinematic Nature",
    description: "Hình ảnh toàn màn hình, tương phản sâu và nhịp kể chuyện mạnh.",
    audience: "Nhóm bạn · người yêu trải nghiệm",
    colors: ["#081612", "#e6c99f", "#ffffff"]
  },
  {
    slug: "song-dong",
    number: "03",
    name: "Sống động",
    style: "Organic Escape",
    description: "Ấm áp, gần gũi và vui tươi với bố cục bento giàu tương tác.",
    audience: "Gia đình · nhóm trẻ",
    colors: ["#dfe8cf", "#f18b68", "#234f43"]
  }
] as const;

export type ShowcaseTemplateSlug = typeof showcaseTemplates[number]["slug"];
