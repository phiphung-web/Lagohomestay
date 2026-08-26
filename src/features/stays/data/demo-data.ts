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
    slug: "nha-ben-ho",
    name: "Nhà Bên Hồ",
    nameEn: "Lakeside Homes",
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
    id: "zone-forest",
    slug: "nha-giua-rung",
    name: "Nhà Giữa Rừng",
    nameEn: "Forest Homes",
    eyebrow: "Rừng thông · đại ngàn · yên tĩnh",
    eyebrowEn: "Pine forest · vast nature · tranquility",
    description: "Các căn cabin và bungalow nép mình dưới bóng rừng xanh, tạo nên một không gian nghỉ ngơi thật gần gũi với thiên nhiên.",
    descriptionEn: "Cabins and bungalows nestled beneath pine trees, creating a restful space close to nature.",
    experience: "Ngắm rừng thông · Chill cùng nhóm · Thả lỏng",
    experienceEn: "Pine forest views · Group bonding · Pure relaxation",
    image: conceptImages.forest,
    accent: "#667b63"
  },
  {
    id: "zone-hill",
    slug: "nha-tren-doi",
    name: "Nhà Trên Đồi",
    nameEn: "Hilltop Homes",
    eyebrow: "Trên cao · riêng biệt · toàn cảnh",
    eyebrowEn: "Elevated · secluded · panoramic",
    description: "Căn villa biệt lập trên đỉnh đồi, bao quát trọn vẹn thung lũng, mặt hồ và những khoảng trời của riêng bạn.",
    descriptionEn: "A secluded hilltop villa with panoramic views of valley, lake and boundless skies.",
    experience: "View 360 độ · Riêng tư tuyệt đối · Sum vầy đại gia đình",
    experienceEn: "Panoramic view · Complete privacy · Great for big groups",
    image: conceptImages.hill,
    accent: "#a7674d"
  }
];

const sharedIncluded = [
  "Bể bơi Bốn Mùa công nghệ tự nhiên (Miễn phí)",
  "Trà, cà phê, đồ uống, nước suối theo tiêu chuẩn tại phòng (Miễn phí)",
  "Dịch vụ internet và truyền hình cáp (Miễn phí)",
  "Xe đạp tham quan làng quê (Miễn phí)",
  "Bi-a, bóng bàn, bi lắc (Miễn phí)",
  "Boardgame: Rút gỗ, Uno, Ma sói, Mèo nổ, Cờ cá ngựa (Miễn phí)",
  "Sân chơi team building ngoài trời rộng 100m² (Miễn phí)",
  "Sân khấu ngoài trời rộng 100m² (Đăng ký với lễ tân)"
];

const breakfastIncluded = ["1 Bữa sáng (Miễn phí)", ...sharedIncluded];

export const stays: Stay[] = [
  // -------------------------------------------------------------
  // 1. NHÀ BÊN HỒ (4 dòng - 13 căn)
  // -------------------------------------------------------------
  {
    id: "stay-guest-house",
    unitId: "unit-001",
    slug: "nha-ben-ho",
    name: "Guest House",
    subtitle: "Guest House 001 · 5 giường (tối đa 10 khách)",
    description: "Guest House nằm ngay bên hồ lớn, nơi mỗi sớm mai mở mắt là thấy đồi núi và rừng thông trải dài trước mặt. Với 5 giường vừa cho tối đa 10 người, đây là chốn để cả nhóm quây quần, cùng ngắm hồ, nghe gió qua rừng và cất giữ những khoảnh khắc thật đẹp bên nhau.",
    longDescription: "Guest House nằm ngay bên hồ lớn, nơi mỗi sớm mai mở mắt là thấy đồi núi và rừng thông trải dài trước mặt. Với 5 giường vừa cho tối đa 10 người, đây là chốn để cả nhóm quây quần, cùng ngắm hồ, nghe gió qua rừng và cất giữ những khoảnh khắc thật đẹp bên nhau.",
    image: conceptImages.hero,
    gallery: [conceptImages.hero, conceptImages.detail3, conceptImages.table],
    maxGuests: 10,
    baseGuests: 10,
    bedrooms: 1,
    beds: 5,
    bathrooms: 1,
    area: 35,
    basePrice: 0,
    amenities: [
      "Diện tích: 35m²",
      "5 giường cỡ vừa",
      "Tủ quần áo",
      "Nhà vệ sinh khép kín",
      "Điều hòa, quạt, ấm siêu tốc, máy sấy tóc"
    ],
    highlights: ["Diện tích 35m²", "5 giường cỡ vừa", "Tối đa 10 khách", "Đối diện hồ lớn"],
    idealFor: ["Nhóm bạn đông", "Gia đình nhiều thế hệ", "Đoàn sum vầy"],
    included: sharedIncluded,
    stayNotes: [
      "Số lượng: 1 căn (Mã căn 001)",
      "Sức chứa tối đa 10 khách",
      "Nhận và trả căn theo hướng dẫn của LAKA"
    ],
    mood: "friends",
    location: "Nhà Bên Hồ",
    badge: "1 Căn · Tối đa 10 khách",
    accent: "#9a7550",
    zoneId: "zone-lake"
  },
  {
    id: "stay-forest-lake-suite",
    unitId: "unit-006",
    slug: "forest-lake-suite",
    name: "Forest Lake Suite",
    subtitle: "Forest Lake Suite 006–011 · 6 căn",
    description: "Một mặt kính lớn mở trọn thiên nhiên trước mắt, như màn hình riêng dành cho những khoảng trời bất tận. Ở đây, căn phòng không chỉ là nơi nghỉ, mà là một khoảng riêng thênh thang để ngắm, để thở và để tận hưởng bình yên theo cách của mình.",
    longDescription: "Một mặt kính lớn mở trọn thiên nhiên trước mắt, như màn hình riêng dành cho những khoảng trời bất tận. Ở đây, căn phòng không chỉ là nơi nghỉ, mà là một khoảng riêng thênh thang để ngắm, để thở và để tận hưởng bình yên theo cách của mình.",
    image: conceptImages.cloud,
    gallery: [conceptImages.cloud, conceptImages.forest, conceptImages.hero],
    maxGuests: 4,
    baseGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: 25,
    basePrice: 0,
    amenities: [
      "Diện tích: 25m²",
      "Giường ngủ lớn, bàn trang điểm, tủ quần áo",
      "Nhà vệ sinh khép kín",
      "Điều hòa, quạt, ấm siêu tốc, máy sấy tóc",
      "Bàn ghế ngoài trời"
    ],
    highlights: ["6 căn Forest Lake Suite", "Mặt kính lớn ôm trọn cảnh sắc", "Kèm 1 bữa sáng miễn phí"],
    idealFor: ["Cặp đôi", "Kỳ nghỉ thảnh thơi", "Người yêu thiên nhiên"],
    included: breakfastIncluded,
    stayNotes: [
      "Số lượng: 6 căn (Từ 006 đến 011)",
      "Kèm 1 bữa sáng miễn phí",
      "Bàn ghế ngoài trời ngắm cảnh hồ"
    ],
    mood: "couple",
    location: "Nhà Bên Hồ",
    badge: "6 Căn · Kèm bữa sáng",
    accent: "#73806b",
    zoneId: "zone-lake"
  },
  {
    id: "stay-bathtub-suite",
    unitId: "unit-014",
    slug: "forest-lake-bathtub-suite",
    name: "Forest Lake Bathtub Suite",
    subtitle: "Cabin Vô Cực 014–017 · 4 căn",
    description: "Cabin Vô Cực là góc ngắm “đỉnh” nhất tại LaKa, với hai mặt kính lớn mở ra tầm nhìn 180 độ ôm trọn mặt hồ, đồi núi và mây trời. Ranh giới giữa căn phòng và thiên nhiên gần như tan biến, để mỗi khoảnh khắc nghỉ ngơi đều có cảm giác rộng mở, thênh thang và thật gần với cảnh sắc bên ngoài.",
    longDescription: "Cabin Vô Cực là góc ngắm “đỉnh” nhất tại LaKa, với hai mặt kính lớn mở ra tầm nhìn 180 độ ôm trọn mặt hồ, đồi núi và mây trời. Ranh giới giữa căn phòng và thiên nhiên gần như tan biến, để mỗi khoảnh khắc nghỉ ngơi đều có cảm giác rộng mở, thênh thang và thật gần với cảnh sắc bên ngoài.",
    image: conceptImages.hill,
    gallery: [conceptImages.hill, conceptImages.detail2, conceptImages.cloud],
    maxGuests: 4,
    baseGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: 25,
    basePrice: 0,
    amenities: [
      "Diện tích: 25m²",
      "Giường ngủ lớn, bàn trang điểm, tủ quần áo",
      "Bồn tắm ngâm mình riêng tư",
      "Nhà vệ sinh khép kín",
      "Điều hòa, quạt, ấm siêu tốc, máy sấy tóc",
      "Bàn ghế ngoài trời"
    ],
    highlights: ["Bồn tắm ngâm riêng tư", "Kính góc 180° vô cực", "Kèm 1 bữa sáng miễn phí"],
    idealFor: ["Cặp đôi nghỉ dưỡng", "Kỳ nghỉ kỷ niệm", "Trải nghiệm ngắm cảnh"],
    included: breakfastIncluded,
    stayNotes: [
      "Số lượng: 4 căn (Từ 014 đến 017)",
      "Bồn tắm ngâm mình riêng tư view hồ",
      "Kèm 1 bữa sáng miễn phí"
    ],
    mood: "couple",
    location: "Nhà Bên Hồ",
    badge: "4 Căn · Có bồn tắm ngâm",
    accent: "#7d8874",
    zoneId: "zone-lake"
  },
  {
    id: "stay-lake-suite",
    unitId: "unit-004",
    slug: "lake-suite",
    name: "Lake Suite",
    subtitle: "Cabin An Trú 004–005 · 2 căn",
    description: "Cabin An Trú mở ra thiên nhiên qua một ô cửa kính vừa như khung hình, vừa như khoảng lặng dành riêng cho mình. Một góc nhìn đủ để thu trọn sắc xanh bên ngoài, và một không gian đủ yên tĩnh để chậm lại, nghỉ ngơi và tận hưởng sự riêng tư.",
    longDescription: "Cabin An Trú mở ra thiên nhiên qua một ô cửa kính vừa như khung hình, vừa như khoảng lặng dành riêng cho mình. Một góc nhìn đủ để thu trọn sắc xanh bên ngoài, và một không gian đủ yên tĩnh để chậm lại, nghỉ ngơi và tận hưởng sự riêng tư.",
    image: conceptImages.detail2,
    gallery: [conceptImages.detail2, conceptImages.detail3, conceptImages.hero],
    maxGuests: 2,
    baseGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: 25,
    basePrice: 0,
    amenities: [
      "Diện tích: 25m²",
      "Giường ngủ lớn, bàn trang điểm, tủ quần áo",
      "Nhà vệ sinh khép kín",
      "Điều hòa, quạt, ấm siêu tốc, máy sấy tóc",
      "Bàn ghế ngoài trời"
    ],
    highlights: ["2 căn Lake Suite", "Cửa sổ kính ngắm trọn sắc xanh", "Kèm 1 bữa sáng"],
    idealFor: ["Cặp đôi", "Kỳ nghỉ riêng tư", "Người muốn chậm lại"],
    included: breakfastIncluded,
    stayNotes: [
      "Số lượng: 2 căn (004 và 005)",
      "Kèm 1 bữa sáng miễn phí",
      "Không gian yên tĩnh, riêng tư"
    ],
    mood: "couple",
    location: "Nhà Bên Hồ",
    badge: "2 Căn · Kèm bữa sáng",
    accent: "#8b7563",
    zoneId: "zone-lake"
  },

  // -------------------------------------------------------------
  // 2. NHÀ GIỮA RỪNG (3 dòng - 6 căn)
  // -------------------------------------------------------------
  {
    id: "stay-bungalow",
    unitId: "unit-002",
    slug: "bungalow",
    name: "Bungalow",
    subtitle: "Bungalow 002–003 · 2 căn (5–7 khách)",
    description: "Căn bungalow ấm áp với nội thất gỗ sáng màu và gác xép xinh xắn, vừa vặn cho nhóm 5–7 người. Nằm ngay đối diện hồ lớn, nơi mở mắt ra là thấy đồi núi và rừng thông trải dài — đủ gần để chạm thiên nhiên, đủ rộng để cả nhóm cùng chill và tận hưởng những ngày thật thong thả.",
    longDescription: "Căn bungalow ấm áp với nội thất gỗ sáng màu và gác xép xinh xắn, vừa vặn cho nhóm 5–7 người. Nằm ngay đối diện hồ lớn, nơi mở mắt ra là thấy đồi núi và rừng thông trải dài — đủ gần để chạm thiên nhiên, đủ rộng để cả nhóm cùng chill và tận hưởng những ngày thật thong thả.",
    image: conceptImages.detail1,
    gallery: [conceptImages.detail1, conceptImages.detail2, conceptImages.hero],
    maxGuests: 7,
    baseGuests: 5,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    area: 15,
    basePrice: 0,
    amenities: [
      "Căn Bungalow với 2 tầng (1 gác xép)",
      "Diện tích: 15m²",
      "2 giường cỡ lớn, bàn trang điểm, giá treo quần áo",
      "Nhà vệ sinh khép kín",
      "Điều hòa, quạt, ấm siêu tốc, máy sấy tóc"
    ],
    highlights: ["2 tầng có gác xép", "2 giường lớn", "Cho nhóm 5–7 người"],
    idealFor: ["Gia đình", "Nhóm bạn 5–7 người", "Chuyến đi cuối tuần"],
    included: sharedIncluded,
    stayNotes: [
      "Số lượng: 2 căn (002 và 003)",
      "Thiết kế 2 tầng có gác xép gỗ",
      "Tối đa 7 khách mỗi căn"
    ],
    mood: "family",
    location: "Nhà Giữa Rừng",
    badge: "2 Căn · 2 tầng có gác xép",
    accent: "#b1845b",
    zoneId: "zone-forest"
  },
  {
    id: "stay-cabin-group",
    unitId: "unit-012",
    slug: "cabin-group",
    name: "Cabin Group",
    subtitle: "Cabin Group 012–013 · 2 căn (tối đa 14 khách)",
    description: "Cabin cộng đồng với 7 giường tầng dành cho tối đa 14 người, nép mình giữa rừng thông đại ngàn. Bốn ô cửa kính mở ra những mảng xanh khác nhau, để cả nhóm vừa có một không gian thật gần nhau, vừa luôn cảm nhận được thiên nhiên đang ở ngay bên cạnh.",
    longDescription: "Cabin cộng đồng với 7 giường tầng dành cho tối đa 14 người, nép mình giữa rừng thông đại ngàn. Bốn ô cửa kính mở ra những mảng xanh khác nhau, để cả nhóm vừa có một không gian thật gần nhau, vừa luôn cảm nhận được thiên nhiên đang ở ngay bên cạnh.",
    image: conceptImages.table,
    gallery: [conceptImages.table, conceptImages.detail1, conceptImages.forest],
    maxGuests: 14,
    baseGuests: 14,
    bedrooms: 1,
    beds: 7,
    bathrooms: 1,
    area: 30,
    basePrice: 0,
    amenities: [
      "Diện tích: 30m²",
      "7 giường tầng, tủ quần áo",
      "Nhà vệ sinh khép kín",
      "Điều hòa, quạt, ấm siêu tốc, máy sấy tóc"
    ],
    highlights: ["7 giường tầng", "4 khung kính view rừng thông", "Cho đoàn tối đa 14 khách"],
    idealFor: ["Nhóm bạn đông", "Đoàn công ty", "Team building"],
    included: sharedIncluded,
    stayNotes: [
      "Số lượng: 2 căn (012 và 013)",
      "Sức chứa tối đa 14 khách mỗi căn",
      "Hệ 7 giường tầng rộng rãi"
    ],
    mood: "friends",
    location: "Nhà Giữa Rừng",
    badge: "2 Căn · Tối đa 14 khách",
    accent: "#9b6f50",
    zoneId: "zone-forest"
  },
  {
    id: "stay-forest-lake-suite-2",
    unitId: "unit-018",
    slug: "lake-suite-giua-rung",
    name: "Lake Suite Giữa Rừng",
    subtitle: "Cabin An Trú Rừng Thông 018–019 · 2 căn",
    description: "Cabin An Trú mở ra thiên nhiên qua một ô cửa kính vừa như khung hình, vừa như khoảng lặng dành riêng cho mình. Một góc nhìn đủ để thu trọn sắc xanh bên ngoài, và một không gian đủ yên tĩnh để chậm lại, nghỉ ngơi và tận hưởng sự riêng tư.",
    longDescription: "Cabin An Trú mở ra thiên nhiên qua một ô cửa kính vừa như khung hình, vừa như khoảng lặng dành riêng cho mình. Một góc nhìn đủ để thu trọn sắc xanh bên ngoài, và một không gian đủ yên tĩnh để chậm lại, nghỉ ngơi và tận hưởng sự riêng tư.",
    image: conceptImages.forest,
    gallery: [conceptImages.forest, conceptImages.detail1, conceptImages.hill],
    maxGuests: 2,
    baseGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: 25,
    basePrice: 0,
    amenities: [
      "Diện tích: 25m²",
      "Giường ngủ lớn, bàn trang điểm, tủ quần áo",
      "Nhà vệ sinh khép kín",
      "Điều hòa, quạt, ấm siêu tốc, máy sấy tóc",
      "Bàn ghế ngoài trời"
    ],
    highlights: ["2 căn Lake Suite giữa rừng", "Ô cửa ngắm rừng xanh", "Kèm 1 bữa sáng"],
    idealFor: ["Cặp đôi", "Kỳ nghỉ riêng tư", "Người muốn tĩnh tâm"],
    included: breakfastIncluded,
    stayNotes: [
      "Số lượng: 2 căn (018 và 019)",
      "Kèm 1 bữa sáng miễn phí",
      "Nép mình giữa rừng thông yên bình"
    ],
    mood: "retreat",
    location: "Nhà Giữa Rừng",
    badge: "2 Căn · Kèm bữa sáng",
    accent: "#667b63",
    zoneId: "zone-forest"
  },

  // -------------------------------------------------------------
  // 3. NHÀ TRÊN ĐỒI (1 dòng - 1 căn)
  // -------------------------------------------------------------
  {
    id: "stay-top-hill",
    unitId: "unit-020",
    slug: "villa-top-hill",
    name: "Villa Top Hill",
    subtitle: "Villa Top Hill 020 · 15–20 khách",
    description: "Căn villa riêng biệt trên đồi, dành cho nhóm 15–20 người, mở ra tầm nhìn bao quát toàn bộ thung lũng từ trên cao. Từ đây, mặt hồ, đồi núi và những khoảng xanh như được gói trọn trong tầm mắt — đủ riêng tư để tận hưởng một khoảng trời của riêng mình, đủ rộng để cả nhóm cùng quây quần và tạo nên những phút giây đáng nhớ.",
    longDescription: "Căn villa riêng biệt trên đồi, dành cho nhóm 15–20 người, mở ra tầm nhìn bao quát toàn bộ thung lũng từ trên cao. Từ đây, mặt hồ, đồi núi và những khoảng xanh như được gói trọn trong tầm mắt — đủ riêng tư để tận hưởng một khoảng trời của riêng mình, đủ rộng để cả nhóm cùng quây quần và tạo nên những phút giây đáng nhớ.",
    image: conceptImages.hill,
    gallery: [conceptImages.hill, conceptImages.cloud, conceptImages.hero],
    maxGuests: 20,
    baseGuests: 15,
    bedrooms: 1,
    beds: 5,
    bathrooms: 1,
    area: 35,
    basePrice: 0,
    amenities: [
      "1 phòng ngủ và 1 phòng khách",
      "Diện tích: 35m²",
      "5 giường cỡ vừa, tủ quần áo, tivi, sofa",
      "Nhà vệ sinh khép kín",
      "Điều hòa, quạt, ấm siêu tốc, máy sấy tóc",
      "Sân lớn ngoài trời"
    ],
    highlights: ["Sức chứa 15–20 khách", "1 phòng ngủ + 1 phòng khách", "Sân lớn view toàn thung lũng"],
    idealFor: ["Đoàn công ty", "Gia đình lớn", "Nhóm bạn 15–20 người"],
    included: sharedIncluded,
    stayNotes: [
      "Số lượng: 1 căn (Villa Top Hill 020)",
      "Vị trí đỉnh đồi riêng biệt, view toàn cảnh",
      "Sức chứa 15–20 khách"
    ],
    mood: "friends",
    location: "Nhà Trên Đồi",
    badge: "1 Căn · 15–20 khách",
    accent: "#a7674d",
    zoneId: "zone-hill"
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
  unit("001", "stay-guest-house", "zone-lake", "001", "Guest House", "Guest House"),
  ...["006", "007", "008", "009", "010", "011"].map((code) => unit(code, "stay-forest-lake-suite", "zone-lake", code, "Forest Lake Suite", "Forest Lake Suite")),
  ...["014", "015", "016", "017"].map((code) => unit(code, "stay-bathtub-suite", "zone-lake", code, "Forest Lake Bathtub Suite", "Forest Lake Bathtub Suite")),
  ...["004", "005"].map((code) => unit(code, "stay-lake-suite", "zone-lake", code, "Lake Suite", "Lake Suite")),
  ...["002", "003"].map((code) => unit(code, "stay-bungalow", "zone-forest", code, "Bungalow", "Bungalow")),
  ...["012", "013"].map((code) => unit(code, "stay-cabin-group", "zone-forest", code, "Cabin Group", "Cabin Group")),
  ...["018", "019"].map((code) => unit(code, "stay-forest-lake-suite-2", "zone-forest", code, "Lake Suite Giữa Rừng", "Forest Lake Suite")),
  unit("020", "stay-top-hill", "zone-hill", "020", "Villa Top Hill", "Top Hill Villa")
];

export function getUnitsForStay(stayId: string) {
  return stayUnits.filter((item) => item.stayId === stayId);
}

export function getZoneForStay(stay: Stay) {
  return stayZones.find((zone) => zone.id === stay.zoneId)!;
}
