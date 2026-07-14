export type Stay = {
  id: string; slug: string; name: string; subtitle: string; description: string;
  longDescription: string; image: string; gallery: string[]; maxGuests: number;
  baseGuests: number; bedrooms: number; beds: number; bathrooms: number;
  area: number; basePrice: number; amenities: string[]; unitId: string;
};

export const conceptImages = {
  hero: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=2200&q=88",
  experience: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=86",
  detail1: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=86",
  detail2: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=86",
  detail3: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=86"
};

export const stays: Stay[] = [
  {
    id: "stay-lago",
    unitId: "unit-lago-01",
    slug: "lago-house",
    name: "Lago House",
    subtitle: "Nhà nguyên căn · riêng tư trọn vẹn",
    description: "Một ngôi nhà rộng mở dành trọn cho gia đình và nhóm bạn, nơi mọi người ở gần nhau nhưng vẫn có khoảng riêng để nghỉ ngơi.",
    longDescription: "Lago House được tạo nên cho những cuộc hội ngộ. Cả căn nhà là của riêng bạn: phòng khách lớn nối liền gian bếp, sân BBQ cho bữa tối dài và ba phòng ngủ yên tĩnh để mỗi người đều có một khoảng nghỉ thật sự.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=88",
    gallery: [conceptImages.detail3, conceptImages.detail1, conceptImages.detail2],
    maxGuests: 8,
    baseGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    area: 140,
    basePrice: 4200000,
    amenities: ["Toàn bộ nhà riêng", "Bếp đầy đủ", "Sân BBQ", "Phòng khách lớn", "Hiên hướng thiên nhiên", "Máy giặt", "Điều hòa", "Wi-Fi tốc độ cao"]
  }
];
