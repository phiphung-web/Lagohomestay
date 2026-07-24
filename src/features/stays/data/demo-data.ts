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

export const conceptImages = {
  hero: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=2200&q=88",
  experience: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=86",
  detail1: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=86",
  detail2: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=86",
  detail3: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=86",
  forest: "https://images.unsplash.com/photo-1775547081703-1472317fe554?auto=format&fit=crop&w=1800&q=88",
  cloud: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1800&q=88",
  hill: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1800&q=88"
};

export const stayZones: StayZone[] = [
  {
    id: "zone-lake",
    slug: "he-ho",
    name: "Hệ Hồ",
    nameEn: "Lake Collection",
    eyebrow: "Ven mặt nước · rộng mở",
    eyebrowEn: "By the water · open horizons",
    description: "Những căn nhà hướng về mặt hồ, có không gian sinh hoạt lớn và khoảng hiên dành cho các cuộc hội ngộ.",
    descriptionEn: "Homes facing the water, with generous shared spaces and verandas made for meaningful gatherings.",
    experience: "Bình minh trên mặt nước · Bữa tối bên hiên · Hội ngộ nhóm",
    experienceEn: "Lakeside sunrise · Veranda dinners · Group gatherings",
    image: conceptImages.hero,
    accent: "#9a7550"
  },
  {
    id: "zone-forest",
    slug: "he-rung",
    name: "Hệ Rừng",
    nameEn: "Forest Collection",
    eyebrow: "Dưới tán cây · riêng tư",
    eyebrowEn: "Beneath the canopy · private",
    description: "Các căn nép dưới tán cây, có vườn riêng và nhịp sống yên tĩnh phù hợp gia đình muốn ở gần thiên nhiên.",
    descriptionEn: "Homes sheltered beneath the canopy, with private gardens and a gentle rhythm for families close to nature.",
    experience: "Dạo rừng · Picnic · Khoảng vườn cho trẻ nhỏ",
    experienceEn: "Forest walks · Picnics · A garden for children",
    image: conceptImages.forest,
    accent: "#667b63"
  },
  {
    id: "zone-hill",
    slug: "he-doi",
    name: "Hệ Đồi",
    nameEn: "Hill Collection",
    eyebrow: "Trên cao · nhiều ánh sáng",
    eyebrowEn: "Elevated · filled with light",
    description: "Những căn ở cao hơn, đón mây, thung lũng và hoàng hôn; phù hợp cặp đôi hoặc kỳ nghỉ dài ngày.",
    descriptionEn: "Elevated homes opening to clouds, valley views and sunset, suited to couples and longer stays.",
    experience: "Đón mây · Ngắm hoàng hôn · Workation",
    experienceEn: "Cloud watching · Sunset views · Workations",
    image: conceptImages.hill,
    accent: "#a7674d"
  }
];

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
    idealFor: ["Nhóm bạn 6–8 người", "Gia đình nhiều thế hệ", "Sinh nhật và hội ngộ nhỏ"],
    included: ["Nước uống chào mừng", "Bếp và dụng cụ nấu cơ bản", "Khăn tắm, đồ dùng cá nhân cơ bản", "Hỗ trợ qua điện thoại/Zalo"],
    stayNotes: ["Ba phòng ngủ, bốn giường", "Khu BBQ cần đăng ký trước", "Giữ yên tĩnh sau 22:00"],
    mood: "friends",
    location: "Ven hồ",
    badge: "Được yêu thích",
    accent: "#d6a878",
    zoneId: "zone-lake"
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
    idealFor: ["Cặp đôi", "Kỷ niệm riêng tư", "Kỳ nghỉ một mình"],
    included: ["Nước uống chào mừng", "Bếp nhỏ và dụng cụ cơ bản", "Khăn tắm, đồ dùng cá nhân cơ bản", "Hỗ trợ qua điện thoại/Zalo"],
    stayNotes: ["Một phòng ngủ, một giường", "Không phù hợp nhóm đông", "Bữa sáng là lựa chọn thêm"],
    mood: "couple",
    location: "Lưng đồi",
    badge: "Lãng mạn nhất",
    accent: "#c4a6a0",
    zoneId: "zone-hill"
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
    idealFor: ["Gia đình có trẻ nhỏ", "Nhóm 4–5 người", "Kỳ nghỉ nhiều thế hệ"],
    included: ["Nước uống chào mừng", "Bếp gia đình và dụng cụ cơ bản", "Bộ đồ dùng trẻ em theo yêu cầu", "Hỗ trợ qua điện thoại/Zalo"],
    stayNotes: ["Hai phòng ngủ, ba giường", "Sân vườn riêng có hàng rào", "Vui lòng báo trước nhu cầu cho trẻ"],
    mood: "family",
    location: "Vườn rừng",
    badge: "Hợp gia đình",
    accent: "#839878",
    zoneId: "zone-forest"
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
    idealFor: ["Kỳ nghỉ 3–7 đêm", "Workation", "Nhóm nhỏ cần không gian riêng"],
    included: ["Nước uống chào mừng", "Bếp và dụng cụ nấu cơ bản", "Bàn làm việc và Wi-Fi", "Hỗ trợ qua điện thoại/Zalo"],
    stayNotes: ["Hai phòng ngủ, ba giường", "Có khu làm việc tách biệt", "Phù hợp khách lưu trú dài ngày"],
    mood: "retreat",
    location: "Đỉnh đồi",
    badge: "Mới",
    accent: "#c88d68",
    zoneId: "zone-hill"
  },
  {
    id: "stay-wharf",
    unitId: "unit-wharf-01",
    slug: "nha-ben",
    name: "Nhà Bến",
    subtitle: "Chạm mặt nước · cho gia đình nhỏ",
    description: "Căn nhà thấp bên mép hồ, có cầu gỗ riêng và phòng khách mở để cả nhà nhìn thấy mặt nước từ lúc thức dậy.",
    longDescription: "Nhà Bến nằm ở khoảng hồ yên nhất của LAKA. Hai phòng ngủ hướng về hiên chung, bếp nối liền bàn ăn và một cầu gỗ nhỏ đưa cả nhà đến gần mặt nước mà không cần rời khỏi khoảng riêng.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=88",
    gallery: [conceptImages.detail1, "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=86", conceptImages.detail3],
    maxGuests: 5,
    baseGuests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    area: 92,
    basePrice: 3200000,
    amenities: ["Cầu gỗ riêng", "Hiên sát mặt nước", "Bếp gia đình", "Bàn ăn 6 chỗ", "Điều hòa", "Wi-Fi", "Bãi đỗ xe", "Áo phao theo yêu cầu"],
    highlights: ["Cầu gỗ bên hồ", "Hai phòng ngủ", "Bữa sáng trên hiên"],
    idealFor: ["Gia đình 3–5 người", "Nhóm bạn nhỏ", "Kỳ nghỉ có trẻ lớn"],
    included: ["Nước uống chào mừng", "Bếp và dụng cụ cơ bản", "Khăn tắm, đồ dùng cá nhân cơ bản", "Hỗ trợ qua điện thoại/Zalo"],
    stayNotes: ["Hai phòng ngủ, ba giường", "Trẻ nhỏ cần người lớn giám sát gần hồ", "Không tổ chức hoạt động âm thanh lớn"],
    mood: "family",
    location: "Bến hồ",
    badge: "Gần mặt nước",
    accent: "#789193",
    zoneId: "zone-lake"
  },
  {
    id: "stay-reed",
    unitId: "unit-reed-01",
    slug: "nha-say",
    name: "Nhà Sậy",
    subtitle: "Một mái hiên bên lau · cho hai người",
    description: "Căn studio riêng tư nép sau bờ lau, có cửa kính rộng, bồn tắm trong nhà và một góc đọc sách nhìn ra hồ.",
    longDescription: "Nhà Sậy được tạo cho hai người muốn nghe nước và gió nhiều hơn tiếng nói. Không gian studio gọn gàng, bồn tắm cạnh cửa kính và mái hiên kín đáo giúp một ngày ở đây diễn ra thật chậm.",
    image: "https://images.unsplash.com/photo-1767334573956-68fee24e876b?auto=format&fit=crop&w=1800&q=88",
    gallery: ["https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1600&q=86", conceptImages.detail2, conceptImages.hero],
    maxGuests: 2,
    baseGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: 38,
    basePrice: 1850000,
    amenities: ["Bồn tắm trong nhà", "Hiên riêng bên lau", "Góc đọc sách", "Bếp nhỏ", "Điều hòa", "Wi-Fi", "Tủ lạnh mini"],
    highlights: ["Riêng tư cho hai", "Bồn tắm nhìn hồ", "Không gian studio"],
    idealFor: ["Cặp đôi", "Kỷ niệm riêng", "Kỳ nghỉ một mình"],
    included: ["Nước uống chào mừng", "Trà và cà phê", "Khăn tắm, đồ dùng cá nhân cơ bản", "Hỗ trợ qua điện thoại/Zalo"],
    stayNotes: ["Một giường đôi", "Không kê thêm giường", "Lối đi qua vườn lau có đèn dẫn hướng"],
    mood: "couple",
    location: "Bờ lau",
    badge: "Chỉ dành cho hai",
    accent: "#b59b72",
    zoneId: "zone-lake"
  },
  {
    id: "stay-pine",
    unitId: "unit-pine-01",
    slug: "cabin-thong",
    name: "Cabin Thông",
    subtitle: "Cabin gỗ giữa rừng · cho hai người",
    description: "Cabin nhỏ có giường sát cửa kính, hiên treo giữa tán thông và bể ngâm ngoài trời dành riêng cho hai người.",
    longDescription: "Cabin Thông giữ mọi thứ ở mức vừa đủ: một chiếc giường hướng thẳng ra rừng, phòng tắm khép kín, hiên gỗ và bể ngâm riêng. Ba cabin cùng một thiết kế nhưng được đặt cách nhau để mỗi căn vẫn có khoảng yên riêng.",
    image: "https://images.unsplash.com/photo-1775547081703-1472317fe554?auto=format&fit=crop&w=1800&q=88",
    gallery: ["https://images.unsplash.com/photo-1775547081703-1472317fe554?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=86", conceptImages.forest],
    maxGuests: 2,
    baseGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    area: 32,
    basePrice: 1950000,
    amenities: ["Bể ngâm ngoài trời", "Hiên gỗ riêng", "Giường nhìn rừng", "Phòng tắm khép kín", "Điều hòa", "Tủ lạnh mini", "Wi-Fi"],
    highlights: ["Bể ngâm riêng", "Giường sát cửa kính", "Ba cabin biệt lập"],
    idealFor: ["Cặp đôi", "Chuyến nghỉ ngắn", "Khách yêu không gian cabin"],
    included: ["Nước uống chào mừng", "Trà và cà phê", "Khăn tắm, áo choàng", "Hỗ trợ qua điện thoại/Zalo"],
    stayNotes: ["Ba căn cùng dòng, vị trí khác nhau", "Đường dốc ngắn qua rừng", "Bể ngâm phụ thuộc điều kiện thời tiết"],
    mood: "couple",
    location: "Sườn rừng",
    badge: "Bể ngâm riêng",
    accent: "#7c8d73",
    zoneId: "zone-forest"
  },
  {
    id: "stay-nest",
    unitId: "unit-nest-01",
    slug: "nha-to",
    name: "Nhà Tổ",
    subtitle: "Hai tầng dưới tán cây · cho nhóm nhỏ",
    description: "Căn nhà hai tầng với phòng sinh hoạt chung, góc boardgame và khoảng sân đủ rộng cho một nhóm bạn hoặc gia đình.",
    longDescription: "Nhà Tổ dành tầng dưới cho những cuộc trò chuyện, bữa ăn và boardgame; tầng trên là hai phòng ngủ yên hơn nhìn qua tán cây. Khoảng sân riêng nối mọi người với rừng mà vẫn giữ sự tiện nghi của một ngôi nhà trọn vẹn.",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1800&q=88",
    gallery: [conceptImages.detail3, "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=86", conceptImages.forest],
    maxGuests: 6,
    baseGuests: 4,
    bedrooms: 2,
    beds: 4,
    bathrooms: 2,
    area: 104,
    basePrice: 3550000,
    amenities: ["Phòng sinh hoạt chung", "Boardgame", "Bếp đầy đủ", "Sân riêng", "Bàn ăn ngoài trời", "Điều hòa", "Wi-Fi", "Bãi đỗ xe"],
    highlights: ["Nhà hai tầng", "Góc boardgame", "Sân riêng dưới tán cây"],
    idealFor: ["Nhóm bạn 4–6 người", "Gia đình có trẻ lớn", "Kỳ nghỉ hai gia đình nhỏ"],
    included: ["Nước uống chào mừng", "Bếp và dụng cụ cơ bản", "Bộ boardgame chọn lọc", "Hỗ trợ qua điện thoại/Zalo"],
    stayNotes: ["Hai phòng ngủ, bốn giường", "Có cầu thang trong nhà", "Giữ yên tĩnh ngoài sân sau 22:00"],
    mood: "friends",
    location: "Lõi rừng",
    badge: "Hợp nhóm nhỏ",
    accent: "#8e725c",
    zoneId: "zone-forest"
  }
];

export const stayUnits: StayUnit[] = [
  { id: "unit-lago-01", stayId: "stay-lago", zoneId: "zone-lake", code: "HO-01", name: "LAKA House · Hồ 01", nameEn: "LAKA House · Lake 01", position: "Trung tâm Hệ Hồ", positionEn: "Lake Collection centre", character: "Căn độc bản có sân BBQ lớn nhất khu.", characterEn: "A one-of-a-kind home with the collection's largest barbecue terrace." },
  { id: "unit-forest-01", stayId: "stay-forest", zoneId: "zone-forest", code: "RUNG-01", name: "Nhà Rừng 01", nameEn: "Forest House 01", position: "Gần lối dạo chính", positionEn: "Near the main trail", character: "Di chuyển thuận tiện, vườn đón nắng sáng.", characterEn: "Easy access with a garden that catches the morning sun." },
  { id: "unit-forest-02", stayId: "stay-forest", zoneId: "zone-forest", code: "RUNG-02", name: "Nhà Rừng 02", nameEn: "Forest House 02", position: "Sâu hơn dưới tán cây", positionEn: "Deeper beneath the canopy", character: "Yên hơn và có khoảng vườn kín đáo.", characterEn: "Quieter, with a more secluded garden." },
  { id: "unit-cloud-01", stayId: "stay-cloud", zoneId: "zone-hill", code: "MAY-01", name: "Nhà Mây 01", nameEn: "Cloud House 01", position: "Sườn đông", positionEn: "Eastern slope", character: "Đón bình minh sớm và nhìn qua tầng cây.", characterEn: "Early sunrise through the canopy." },
  { id: "unit-cloud-02", stayId: "stay-cloud", zoneId: "zone-hill", code: "MAY-02", name: "Nhà Mây 02", nameEn: "Cloud House 02", position: "Sườn tây", positionEn: "Western slope", character: "Ánh chiều ấm và khoảng hiên kín đáo hơn.", characterEn: "Warm afternoon light and a more secluded veranda." },
  { id: "unit-hill-01", stayId: "stay-hill", zoneId: "zone-hill", code: "DOI-01", name: "Nhà Đồi 01", nameEn: "Hill House 01", position: "Điểm cao nhất Hệ Đồi", positionEn: "Highest point of the Hill Collection", character: "Căn độc bản có tầm nhìn thung lũng rộng nhất.", characterEn: "A one-of-a-kind home with the widest valley view." },
  { id: "unit-wharf-01", stayId: "stay-wharf", zoneId: "zone-lake", code: "BEN-01", name: "Nhà Bến 01", nameEn: "Wharf House 01", position: "Bến hồ phía bắc", positionEn: "Northern lake wharf", character: "Cầu gỗ dài, đón ánh sáng đầu ngày.", characterEn: "A longer jetty with first light over the water." },
  { id: "unit-wharf-02", stayId: "stay-wharf", zoneId: "zone-lake", code: "BEN-02", name: "Nhà Bến 02", nameEn: "Wharf House 02", position: "Vịnh hồ phía nam", positionEn: "Southern lake cove", character: "Mặt nước kín gió và hiên riêng tư hơn.", characterEn: "Calmer water and a more private veranda." },
  { id: "unit-reed-01", stayId: "stay-reed", zoneId: "zone-lake", code: "SAY-01", name: "Nhà Sậy 01", nameEn: "Reed House 01", position: "Đầu vườn lau", positionEn: "Upper reed garden", character: "Gần đường dạo, nhìn hồ rộng hơn.", characterEn: "Closer to the trail with a broader lake view." },
  { id: "unit-reed-02", stayId: "stay-reed", zoneId: "zone-lake", code: "SAY-02", name: "Nhà Sậy 02", nameEn: "Reed House 02", position: "Cuối vườn lau", positionEn: "Lower reed garden", character: "Lối vào riêng và cảm giác ẩn mình hơn.", characterEn: "A private approach and a more hidden atmosphere." },
  { id: "unit-pine-01", stayId: "stay-pine", zoneId: "zone-forest", code: "THONG-01", name: "Cabin Thông 01", nameEn: "Pine Cabin 01", position: "Rìa rừng thấp", positionEn: "Lower forest edge", character: "Dễ tiếp cận nhất, hiên đón nắng sáng.", characterEn: "The easiest access and a morning-facing veranda." },
  { id: "unit-pine-02", stayId: "stay-pine", zoneId: "zone-forest", code: "THONG-02", name: "Cabin Thông 02", nameEn: "Pine Cabin 02", position: "Giữa sườn rừng", positionEn: "Mid forest slope", character: "Cân bằng giữa tầm nhìn và sự kín đáo.", characterEn: "A balance of open views and seclusion." },
  { id: "unit-pine-03", stayId: "stay-pine", zoneId: "zone-forest", code: "THONG-03", name: "Cabin Thông 03", nameEn: "Pine Cabin 03", position: "Cuối lối thông", positionEn: "End of the pine trail", character: "Xa nhất và yên tĩnh nhất trong ba cabin.", characterEn: "The furthest and quietest of the three cabins." },
  { id: "unit-nest-01", stayId: "stay-nest", zoneId: "zone-forest", code: "TO-01", name: "Nhà Tổ 01", nameEn: "Nest House 01", position: "Gần bãi cỏ chung", positionEn: "Near the shared lawn", character: "Thuận tiện cho gia đình và hoạt động ban ngày.", characterEn: "Convenient for families and daytime activities." },
  { id: "unit-nest-02", stayId: "stay-nest", zoneId: "zone-forest", code: "TO-02", name: "Nhà Tổ 02", nameEn: "Nest House 02", position: "Sau vạt cây bản địa", positionEn: "Behind the native grove", character: "Sân kín và ít người qua lại hơn.", characterEn: "A sheltered garden with less passing foot traffic." }
];

export function getUnitsForStay(stayId: string) {
  return stayUnits.filter((unit) => unit.stayId === stayId);
}

export function getZoneForStay(stay: Stay) {
  return stayZones.find((zone) => zone.id === stay.zoneId)!;
}
