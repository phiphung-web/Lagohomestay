export type StayMood = "couple" | "family" | "friends" | "retreat";

export type StayZone = {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  eyebrow: string;
  eyebrowEn: string;
  description: string;
  descriptionEn: string;
  experience: string;
  experienceEn: string;
  image: string;
  accent: string;
};

export type StayUnit = {
  id: string;
  stayId: string;
  zoneId: string;
  code: string;
  name: string;
  nameEn: string;
  position: string;
  positionEn: string;
  character: string;
  characterEn: string;
};

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
  idealFor: string[];
  included: string[];
  stayNotes: string[];
  mood: StayMood;
  location: string;
  badge?: string;
  accent: string;
  zoneId: string;
};

// Temporary visual references. Every public surface labels these as concept images
// until LAKA's own photo and video library is delivered.
export const conceptImages = {
  hero: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=2200&q=88",
  experience: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=86",
  detail1: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=86",
  detail2: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=86",
  detail3: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=86",
  forest: "https://images.unsplash.com/photo-1775547081703-1472317fe554?auto=format&fit=crop&w=1800&q=88",
  cloud: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1800&q=88",
  hill: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1800&q=88",
  dining: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=88",
  breakfast: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1800&q=86",
  table: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=86"
};

export const stayZones: StayZone[] = [
  {
    id: "zone-lake",
    slug: "ven-ho",
    name: "Ven hồ",
    nameEn: "By the lake",
    eyebrow: "Mặt nước · núi xa · khoảng mở",
    eyebrowEn: "Water · distant mountains · open space",
    description: "Những căn nằm sát hoặc hướng thẳng ra hồ, dành cho buổi sáng chậm, khoảnh khắc riêng tư và các cuộc sum vầy.",
    descriptionEn: "Homes beside or directly facing the lake, made for slow mornings, private pauses and time together.",
    experience: "Ngắm hồ · Chèo kayak · Bữa tối bên nhau",
    experienceEn: "Lake views · Kayaking · Shared dinners",
    image: conceptImages.hero,
    accent: "#9a7550"
  },
  {
    id: "zone-valley",
    slug: "thung-lung",
    name: "Trong thung lũng",
    nameEn: "In the valley",
    eyebrow: "Rừng · hồ · bầu trời",
    eyebrowEn: "Forest · lake · open sky",
    description: "Các cabin mở rộng tầm nhìn bằng những mảng kính lớn, để mỗi căn trở thành một khung ngắm cảnh riêng.",
    descriptionEn: "Cabins use generous glazing to turn each home into its own frame for the landscape.",
    experience: "Săn mây · Ngắm rừng và hồ · Chậm lại",
    experienceEn: "Cloud watching · Forest and lake views · Slower time",
    image: conceptImages.cloud,
    accent: "#667b63"
  },
  {
    id: "zone-hill",
    slug: "doi-thong",
    name: "Đồi & rừng thông",
    nameEn: "Hill and pine forest",
    eyebrow: "Trên cao · riêng biệt · toàn cảnh",
    eyebrowEn: "Elevated · secluded · panoramic",
    description: "Từ bungalow thấp dưới rừng thông đến căn nhà biệt lập trên đỉnh đồi, đây là khoảng ở gần thiên nhiên nhất của LAKA.",
    descriptionEn: "From low timber bungalows beneath the pines to a secluded hilltop home, these are LAKA's closest stays to nature.",
    experience: "Thông reo · Toàn cảnh thung lũng · Săn mây",
    experienceEn: "Pine sounds · Valley panorama · Cloud watching",
    image: conceptImages.forest,
    accent: "#a7674d"
  }
];

const sharedIncluded = ["Tư vấn chọn căn theo quy mô đoàn", "Hỗ trợ trực tiếp qua điện thoại và Zalo"];

export const stays: Stay[] = [
  {
    id: "stay-guest-house",
    unitId: "unit-001",
    slug: "nha-ben-ho",
    name: "Nhà Bên Hồ",
    subtitle: "Guest House 001 · 15–20 khách",
    description: "Căn nhà lớn bên hồ dành cho gia đình, nhóm bạn hoặc đoàn muốn ở cùng nhau và nhìn trọn mặt nước.",
    longDescription: "Guest House 001 là căn nhà lớn có toàn cảnh hồ, được định hướng cho đoàn 15–20 khách. Đây là lựa chọn cho những chuyến đi cần một không gian chung đủ rộng để mọi người thực sự ở cạnh nhau.",
    image: conceptImages.hero,
    gallery: [conceptImages.detail3, conceptImages.detail1, conceptImages.table],
    maxGuests: 20, baseGuests: 15, bedrooms: 0, beds: 0, bathrooms: 0, area: 0, basePrice: 0,
    amenities: ["Toàn cảnh hồ", "Không gian dành cho đoàn đông", "Vị trí bên hồ"],
    highlights: ["15–20 khách", "Full view hồ", "Dành cho đoàn"],
    idealFor: ["Gia đình nhiều thế hệ", "Nhóm bạn đông", "Đoàn công ty"],
    included: sharedIncluded,
    stayNotes: ["Mã căn 001", "Sơ đồ phòng, tiện nghi và giá đang chờ LAKA xác nhận"],
    mood: "friends", location: "Bên hồ", badge: "Cho đoàn 15–20 khách", accent: "#9a7550", zoneId: "zone-lake"
  },
  {
    id: "stay-bungalow",
    unitId: "unit-002",
    slug: "bungalow-ben-ho",
    name: "Bungalow Bên Hồ",
    subtitle: "Bungalow 002–003 · 6–7 khách/căn",
    description: "Hai bungalow lớn có gác xép và hai khung cửa kính rộng, đưa hồ và cảnh quan vào trong căn.",
    longDescription: "Bungalow 002 và 003 là hai căn bungalow lớn có gác xép, sức chứa 6–7 khách mỗi căn. Hai cửa kính lớn tạo nên những khung nhìn rộng, phù hợp gia đình hoặc nhóm bạn nhỏ muốn ở gần hồ.",
    image: conceptImages.detail1,
    gallery: [conceptImages.detail1, conceptImages.detail2, conceptImages.hero],
    maxGuests: 7, baseGuests: 6, bedrooms: 0, beds: 0, bathrooms: 0, area: 0, basePrice: 0,
    amenities: ["Gác xép", "Hai cửa kính lớn", "Không gian bungalow rộng"],
    highlights: ["6–7 khách/căn", "Có gác xép", "Hai khung kính lớn"],
    idealFor: ["Gia đình", "Nhóm bạn 6–7 người", "Chuyến đi cuối tuần"],
    included: sharedIncluded,
    stayNotes: ["Hai căn: 002 và 003", "Tiện nghi chi tiết và giá đang chờ LAKA xác nhận"],
    mood: "family", location: "Bên hồ", badge: "Bungalow có gác xép", accent: "#b1845b", zoneId: "zone-lake"
  },
  {
    id: "stay-an-tru",
    unitId: "unit-004",
    slug: "cabin-an-tru",
    name: "Cabin An Trú",
    subtitle: "Lake Suite 004–005 · yên tĩnh & riêng tư",
    description: "Hai cabin giữ cảnh hồ trong một khung kính như bức tranh, dành cho khoảng nghỉ yên và kín đáo.",
    longDescription: "Cabin An Trú gồm Lake Suite 004 và 005. Mỗi căn có một khung cửa kính như một bức tranh hướng về cảnh quan, ưu tiên cảm giác an trú, yên tĩnh và riêng tư.",
    image: conceptImages.detail2,
    gallery: [conceptImages.detail2, conceptImages.detail3, conceptImages.hero],
    maxGuests: 0, baseGuests: 0, bedrooms: 0, beds: 0, bathrooms: 0, area: 0, basePrice: 0,
    amenities: ["Một khung kính ngắm cảnh", "Không gian yên tĩnh", "Vị trí riêng tư"],
    highlights: ["Hai Lake Suite", "Một khung kính", "Yên tĩnh, riêng tư"],
    idealFor: ["Cặp đôi", "Kỳ nghỉ riêng tư", "Người muốn chậm lại"],
    included: sharedIncluded,
    stayNotes: ["Hai căn: 004 và 005", "Sức chứa, tiện nghi và giá đang chờ LAKA xác nhận"],
    mood: "couple", location: "Hướng hồ", badge: "Khung cảnh an trú", accent: "#8b7563", zoneId: "zone-lake"
  },
  {
    id: "stay-khoang-troi",
    unitId: "unit-006",
    slug: "cabin-khoang-troi",
    name: "Cabin Khoảng Trời",
    subtitle: "Forest Lake Suite 006–011 · sáu căn",
    description: "Một mảng kính trọn tường mở cabin ra rừng, hồ và một khoảng trời tưởng như thuộc về riêng mình.",
    longDescription: "Cabin Khoảng Trời gồm sáu Forest Lake Suite, từ 006 đến 011. Mỗi căn có một mặt kính toàn phần để tạo cảm giác rộng, thoáng và giữ trọn khoảng trời trước mắt.",
    image: conceptImages.cloud,
    gallery: [conceptImages.cloud, conceptImages.forest, conceptImages.hero],
    maxGuests: 0, baseGuests: 0, bedrooms: 0, beds: 0, bathrooms: 0, area: 0, basePrice: 0,
    amenities: ["Một mặt kính toàn phần", "Tầm nhìn rừng và hồ", "Cảm giác rộng và thoáng"],
    highlights: ["Sáu Forest Lake Suite", "Một tường kính", "Khoảng trời riêng"],
    idealFor: ["Cặp đôi", "Người yêu kiến trúc cabin", "Kỳ nghỉ ngắm cảnh"],
    included: sharedIncluded,
    stayNotes: ["Sáu căn: 006–011", "Sức chứa, tiện nghi và giá đang chờ LAKA xác nhận"],
    mood: "couple", location: "Trong thung lũng", badge: "Một khoảng trời riêng", accent: "#73806b", zoneId: "zone-valley"
  },
  {
    id: "stay-sum-vay",
    unitId: "unit-012",
    slug: "cabin-sum-vay",
    name: "Cabin Sum Vầy",
    subtitle: "Cabin Group 012–013 · 14 khách/căn",
    description: "Hai cabin giường tầng cho nhóm đông, có bốn khung kính để không gian sum vầy vẫn luôn mở ra thiên nhiên.",
    longDescription: "Cabin Sum Vầy gồm Cabin Group 012 và 013, sức chứa 14 khách mỗi căn. Hệ giường tầng phục vụ đoàn đông, còn bốn cửa kính giữ căn phòng kết nối với cảnh quan bên ngoài.",
    image: conceptImages.table,
    gallery: [conceptImages.table, conceptImages.detail1, conceptImages.forest],
    maxGuests: 14, baseGuests: 14, bedrooms: 0, beds: 0, bathrooms: 0, area: 0, basePrice: 0,
    amenities: ["Hệ giường tầng", "Bốn cửa kính", "Không gian cho nhóm đông"],
    highlights: ["14 khách/căn", "Hai Cabin Group", "Bốn khung kính"],
    idealFor: ["Nhóm bạn đông", "Đoàn công ty", "Team building"],
    included: sharedIncluded,
    stayNotes: ["Hai căn: 012 và 013", "Số giường, tiện nghi và giá đang chờ LAKA xác nhận"],
    mood: "friends", location: "Trong thung lũng", badge: "Cho nhóm 14 khách", accent: "#9b6f50", zoneId: "zone-valley"
  },
  {
    id: "stay-vo-cuc",
    unitId: "unit-014",
    slug: "cabin-vo-cuc",
    name: "Cabin Vô Cực",
    subtitle: "Forest Lake Bathtub Suite 014–017 · bốn căn",
    description: "Hai mặt kính toàn phần mở góc nhìn 180° ra rừng và hồ, tạo cảm giác không gian kéo dài vô tận.",
    longDescription: "Cabin Vô Cực gồm bốn Forest Lake Bathtub Suite, từ 014 đến 017. Hai mặt kính toàn phần tạo góc nhìn 180° và cảm giác mở vô cực; đây cũng là dòng suite được định danh có bồn tắm trong tài liệu LAKA.",
    image: conceptImages.hill,
    gallery: [conceptImages.hill, conceptImages.detail2, conceptImages.cloud],
    maxGuests: 0, baseGuests: 0, bedrooms: 0, beds: 0, bathrooms: 0, area: 0, basePrice: 0,
    amenities: ["Hai mặt kính toàn phần", "Góc nhìn 180°", "Dòng suite có bồn tắm"],
    highlights: ["Bốn Bathtub Suite", "View 180°", "Hai tường kính"],
    idealFor: ["Cặp đôi", "Kỳ nghỉ kỷ niệm", "Người ưu tiên tầm nhìn"],
    included: sharedIncluded,
    stayNotes: ["Bốn căn: 014–017", "Sức chứa, loại bồn tắm và giá đang chờ LAKA xác nhận"],
    mood: "couple", location: "Rừng & hồ", badge: "Góc nhìn 180°", accent: "#7d8874", zoneId: "zone-valley"
  },
  {
    id: "stay-thong-reo",
    unitId: "unit-018",
    slug: "nha-thong-reo",
    name: "Nhà Thông Reo",
    subtitle: "Eco Camp 018–019 · 1–2 khách/căn",
    description: "Hai bungalow gỗ thấp nép trước rừng thông, nhỏ gọn và mộc mạc cho một hoặc hai người.",
    longDescription: "Nhà Thông Reo gồm Eco Camp 018 và 019. Đây là hai bungalow gỗ thấp cho 1–2 khách, không dùng mảng kính lớn; phía sau căn là rừng thông, tạo một trải nghiệm gần thiên nhiên và nguyên bản hơn.",
    image: conceptImages.forest,
    gallery: [conceptImages.forest, conceptImages.detail1, conceptImages.hill],
    maxGuests: 2, baseGuests: 1, bedrooms: 0, beds: 0, bathrooms: 0, area: 0, basePrice: 0,
    amenities: ["Bungalow gỗ thấp", "Phía sau là rừng thông", "Thiết kế không dùng mảng kính lớn"],
    highlights: ["1–2 khách/căn", "Hai Eco Camp", "Nép dưới rừng thông"],
    idealFor: ["Một người", "Cặp đôi", "Người thích trải nghiệm mộc"],
    included: sharedIncluded,
    stayNotes: ["Hai căn: 018 và 019", "Tiện nghi, khu vệ sinh và giá đang chờ LAKA xác nhận"],
    mood: "retreat", location: "Rừng thông", badge: "Ở gần rừng nhất", accent: "#667b63", zoneId: "zone-hill"
  },
  {
    id: "stay-tren-doi",
    unitId: "unit-020",
    slug: "nha-tren-doi",
    name: "Nhà Trên Đồi",
    subtitle: "Villa Top Hill 020 · 15–20 khách",
    description: "Căn nhà biệt lập trên đỉnh đồi nhìn toàn cảnh thung lũng, hồ và núi, dành cho một đoàn muốn có không gian riêng.",
    longDescription: "Villa Top Hill 020 là căn nhà biệt lập trên đỉnh đồi, sức chứa 15–20 khách. Từ đây mở ra toàn cảnh thung lũng, hồ và núi—một điểm ở dành cho đoàn đông nhưng vẫn cần sự riêng biệt.",
    image: conceptImages.hill,
    gallery: [conceptImages.hill, conceptImages.cloud, conceptImages.hero],
    maxGuests: 20, baseGuests: 15, bedrooms: 0, beds: 0, bathrooms: 0, area: 0, basePrice: 0,
    amenities: ["Vị trí biệt lập trên đỉnh đồi", "Toàn cảnh thung lũng, hồ và núi", "Không gian cho đoàn đông"],
    highlights: ["15–20 khách", "Villa Top Hill", "View toàn thung lũng"],
    idealFor: ["Đoàn công ty", "Gia đình lớn", "Nhóm bạn đông"],
    included: sharedIncluded,
    stayNotes: ["Một căn: 020", "Sơ đồ phòng, tiện nghi và giá đang chờ LAKA xác nhận"],
    mood: "friends", location: "Đỉnh đồi", badge: "Toàn cảnh LAKA", accent: "#a7674d", zoneId: "zone-hill"
  }
];

function unit(id: string, stayId: string, zoneId: string, code: string, group: string, groupEn: string): StayUnit {
  return {
    id: `unit-${id}`,
    stayId,
    zoneId,
    code,
    name: `${group} ${code}`,
    nameEn: `${groupEn} ${code}`,
    position: `Thuộc ${group}`,
    positionEn: `Part of ${groupEn}`,
    character: "Căn cụ thể được LAKA xác nhận theo lịch trống và nhu cầu của đoàn.",
    characterEn: "The specific unit is confirmed by LAKA according to availability and group needs."
  };
}

export const stayUnits: StayUnit[] = [
  unit("001", "stay-guest-house", "zone-lake", "001", "Nhà Bên Hồ", "Lakeside Guest House"),
  ...["002", "003"].map((code) => unit(code, "stay-bungalow", "zone-lake", code, "Bungalow Bên Hồ", "Lakeside Bungalow")),
  ...["004", "005"].map((code) => unit(code, "stay-an-tru", "zone-lake", code, "Cabin An Trú", "An Tru Cabin")),
  ...["006", "007", "008", "009", "010", "011"].map((code) => unit(code, "stay-khoang-troi", "zone-valley", code, "Cabin Khoảng Trời", "Khoang Troi Cabin")),
  ...["012", "013"].map((code) => unit(code, "stay-sum-vay", "zone-valley", code, "Cabin Sum Vầy", "Sum Vay Group Cabin")),
  ...["014", "015", "016", "017"].map((code) => unit(code, "stay-vo-cuc", "zone-valley", code, "Cabin Vô Cực", "Vo Cuc Cabin")),
  ...["018", "019"].map((code) => unit(code, "stay-thong-reo", "zone-hill", code, "Nhà Thông Reo", "Thong Reo Eco Camp")),
  unit("020", "stay-tren-doi", "zone-hill", "020", "Nhà Trên Đồi", "Top Hill Villa")
];

export function getUnitsForStay(stayId: string) {
  return stayUnits.filter((item) => item.stayId === stayId);
}

export function getZoneForStay(stay: Stay) {
  return stayZones.find((zone) => zone.id === stay.zoneId)!;
}
