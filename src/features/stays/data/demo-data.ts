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
    id: "stay-cloud", unitId: "unit-cloud-01", slug: "nha-may", name: "Nhà Mây", subtitle: "Dành cho hai người",
    description: "Một căn nhỏ bên triền cỏ, nơi buổi sáng bắt đầu bằng ánh nắng và tiếng lá.",
    longDescription: "Nhà Mây được tạo nên cho những ngày thật chậm. Căn phòng mở ra một khoảng vườn riêng, bồn tắm cạnh cửa sổ và hiên nhỏ để cùng nhau uống trà khi nắng xuống.",
    image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1600&q=88",
    gallery: [conceptImages.detail1, conceptImages.detail2, conceptImages.detail3], maxGuests: 2, baseGuests: 2,
    bedrooms: 1, beds: 1, bathrooms: 1, area: 38, basePrice: 1450000,
    amenities: ["Bồn tắm nhìn vườn", "Bữa sáng tại phòng", "Máy chiếu", "Sân hiên riêng", "Điều hòa", "Wi-Fi"]
  },
  {
    id: "stay-forest", unitId: "unit-forest-01", slug: "nha-rung", name: "Nhà Rừng", subtitle: "Ấm cúng cho gia đình",
    description: "Không gian gỗ ấm, khu vườn riêng và những bữa tối quây quần dưới hiên.",
    longDescription: "Nhà Rừng ôm lấy khoảng sân xanh và một gian bếp đầy đủ. Mỗi góc nhỏ đều được sắp đặt để gia đình có thể ở bên nhau mà vẫn giữ được khoảng riêng cần thiết.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=88",
    gallery: [conceptImages.detail2, conceptImages.detail3, conceptImages.detail1], maxGuests: 4, baseGuests: 2,
    bedrooms: 2, beds: 2, bathrooms: 1, area: 62, basePrice: 2250000,
    amenities: ["Bếp riêng", "Vườn kín", "Bàn ăn ngoài trời", "Bồn tắm", "Điều hòa", "Wi-Fi"]
  },
  {
    id: "stay-lago", unitId: "unit-lago-01", slug: "lago-house", name: "Lago House", subtitle: "Nguyên căn cho nhóm bạn",
    description: "Ngôi nhà rộng mở hướng mặt hồ, đủ riêng tư cho một kỳ nghỉ dài cùng người thân.",
    longDescription: "Lago House dành cho những cuộc hội ngộ. Phòng khách lớn nối liền khu bếp và sân BBQ, ba phòng ngủ yên tĩnh cùng hiên dài hướng ra mặt nước.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=88",
    gallery: [conceptImages.detail3, conceptImages.detail1, conceptImages.detail2], maxGuests: 8, baseGuests: 6,
    bedrooms: 3, beds: 4, bathrooms: 2, area: 140, basePrice: 4200000,
    amenities: ["Bếp đầy đủ", "Sân BBQ", "Phòng khách lớn", "View mặt hồ", "Máy giặt", "Wi-Fi"]
  }
];
