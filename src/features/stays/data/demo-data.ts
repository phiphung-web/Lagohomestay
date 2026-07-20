export type StayMood = "couple" | "family" | "friends" | "retreat";

export type Stay = {
  id: string;
  unitId: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  maxGuests: number;
  baseGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  area: number;
  basePrice: number;
  amenities: string[];
  highlights: string[];
  mood: StayMood;
  location: string;
  badge?: string;
  accent: string;
};

export const conceptImages = {
  hero: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=2200&q=88",
  experience: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=86",
  detail1: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=86",
  detail2: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=86",
  detail3: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=86",
  forest: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1800&q=88",
  cloud: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1800&q=88",
  hill: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1800&q=88"
};

export const stays: Stay[] = [
  {
    id: "stay-lago",
    unitId: "unit-lago-01",
    slug: "lago-house",
    name: "LAKA House",
    subtitle: "Nhà bên hồ · cho nhóm bạn",
    description: "Căn nhà rộng mở hướng mặt nước, dành cho những cuộc hội ngộ nhiều tiếng cười và bữa tối thật dài.",
    longDescription: "LAKA House được tạo nên cho những cuộc hội ngộ. Phòng khách lớn nối liền gian bếp, sân BBQ cho bữa tối dài và ba phòng ngủ yên tĩnh để mỗi người đều có một khoảng nghỉ thật sự.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=88",
    gallery: [conceptImages.detail3, conceptImages.detail1, conceptImages.detail2],
    maxGuests: 8,
    baseGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    area: 140,
    basePrice: 4200000,
    amenities: ["Bếp đầy đủ", "Sân BBQ", "Phòng khách lớn", "Hiên hướng hồ", "Máy giặt", "Điều hòa", "Wi-Fi tốc độ cao", "Bãi đỗ xe"],
    highlights: ["View mặt hồ", "Sân BBQ riêng", "Không gian kết nối"],
    mood: "friends",
    location: "Ven hồ",
    badge: "Được yêu thích",
    accent: "#d6a878"
  },
  {
    id: "stay-cloud",
    unitId: "unit-cloud-01",
    slug: "nha-may",
    name: "Nhà Mây",
    subtitle: "Căn nhỏ trên cao · cho hai người",
    description: "Một căn nhà nhỏ đón mây qua khung cửa, nơi buổi sáng bắt đầu bằng ánh nắng và sự tĩnh lặng.",
    longDescription: "Nhà Mây dành cho hai người muốn biến mất khỏi nhịp sống thường ngày. Cửa kính lớn mở ra tầng cây, bồn tắm cạnh cửa sổ và hiên riêng vừa đủ cho hai tách trà khi chiều xuống.",
    image: conceptImages.cloud,
    gallery: ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=86", conceptImages.detail2, "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1600&q=86"],
    maxGuests: 2,
    baseGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: 42,
    basePrice: 1650000,
    amenities: ["Bồn tắm nhìn rừng", "Hiên riêng", "Máy chiếu", "Điều hòa", "Bếp nhỏ", "Wi-Fi", "Bữa sáng tùy chọn"],
    highlights: ["Riêng tư cho hai", "Bồn tắm view rừng", "Đón bình minh"],
    mood: "couple",
    location: "Lưng đồi",
    badge: "Lãng mạn nhất",
    accent: "#c4a6a0"
  },
  {
    id: "stay-forest",
    unitId: "unit-forest-01",
    slug: "nha-rung",
    name: "Nhà Rừng",
    subtitle: "Ẩn dưới tán cây · cho gia đình",
    description: "Không gian gỗ ấm ôm lấy khu vườn riêng, để cả nhà gần thiên nhiên mà vẫn đủ đầy tiện nghi.",
    longDescription: "Nhà Rừng nép dưới những tán cây lâu năm, với gian bếp đầy đủ, khoảng sân kín và hai phòng ngủ ấm áp. Trẻ nhỏ có chỗ khám phá, người lớn có hiên nhà để ngồi lại lâu hơn.",
    image: conceptImages.forest,
    gallery: ["https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=86", conceptImages.detail1, "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=86"],
    maxGuests: 5,
    baseGuests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    area: 86,
    basePrice: 2850000,
    amenities: ["Vườn riêng", "Bếp gia đình", "Bàn ăn ngoài trời", "Đồ dùng trẻ em", "Điều hòa", "Wi-Fi", "Bãi đỗ xe"],
    highlights: ["Vườn riêng", "Thân thiện gia đình", "Hai phòng ngủ"],
    mood: "family",
    location: "Vườn rừng",
    badge: "Hợp gia đình",
    accent: "#839878"
  },
  {
    id: "stay-hill",
    unitId: "unit-hill-01",
    slug: "nha-doi",
    name: "Nhà Đồi",
    subtitle: "Khoảng mở trên đồi · cho kỳ nghỉ dài",
    description: "Căn nhà nhiều ánh sáng với studio riêng, khoảng hiên rộng và tầm nhìn mở về phía thung lũng.",
    longDescription: "Nhà Đồi là nơi để ở lâu hơn một cuối tuần. Không gian làm việc nhìn ra thung lũng, gian bếp thoáng và hiên rộng giúp bạn vừa thay đổi nhịp sống, vừa giữ được sự tập trung khi cần.",
    image: conceptImages.hill,
    gallery: ["https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=86", conceptImages.detail3],
    maxGuests: 6,
    baseGuests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    area: 108,
    basePrice: 3400000,
    amenities: ["Studio làm việc", "Hiên ngắm hoàng hôn", "Bếp đầy đủ", "Máy giặt", "Điều hòa", "Wi-Fi tốc độ cao", "Bãi đỗ xe"],
    highlights: ["View thung lũng", "Workation", "Hiên hoàng hôn"],
    mood: "retreat",
    location: "Đỉnh đồi",
    badge: "Mới",
    accent: "#c88d68"
  }
];
