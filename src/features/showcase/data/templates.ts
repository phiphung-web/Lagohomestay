export const showcaseTemplates = [
  {
    slug: "tinh-lang",
    number: "01",
    name: "Tĩnh lặng",
    style: "Tạp chí nghỉ dưỡng",
    description: "Tinh tế, nhiều khoảng thở và cảm giác nghỉ dưỡng riêng tư.",
    audience: "Cặp đôi · khách hàng cao cấp",
    signature: "Bố cục bất đối xứng · chữ thanh lịch · khoảng thở rộng",
    interaction: "Chuyển động chậm, ảnh mở nhẹ và nhịp cuộn như một cuốn tạp chí",
    colors: ["#f3eee5", "#17312b", "#b86f52"]
  },
  {
    slug: "dien-anh",
    number: "02",
    name: "Điện ảnh",
    style: "Điện ảnh thiên nhiên",
    description: "Hình ảnh toàn màn hình, tương phản sâu và nhịp kể chuyện mạnh.",
    audience: "Nhóm bạn · người yêu trải nghiệm",
    signature: "Khung hình lớn · nền tối sâu · nội dung chia theo chương",
    interaction: "Chuyển cảnh có chiều sâu, dải chữ chuyển động và phản hồi giàu cảm xúc",
    colors: ["#081612", "#e6c99f", "#ffffff"]
  },
  {
    slug: "song-dong",
    number: "03",
    name: "Sống động",
    style: "Kỳ nghỉ hữu cơ",
    description: "Ấm áp, gần gũi và vui tươi với bố cục bento giàu tương tác.",
    audience: "Gia đình · nhóm trẻ",
    signature: "Hình khối hữu cơ · bento nhiều màu · thông tin thân thiện",
    interaction: "Thẻ nổi, chi tiết vui và phản hồi rõ ràng trên cả cảm ứng lẫn chuột",
    colors: ["#dfe8cf", "#f18b68", "#234f43"]
  }
] as const;

export type ShowcaseTemplateSlug = typeof showcaseTemplates[number]["slug"];
