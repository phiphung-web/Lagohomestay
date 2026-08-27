export type LocalizedMenuText = { vi: string; en: string };

export type RestaurantMenuPage = {
  id: string;
  title: LocalizedMenuText;
  src: string;
  width: number;
  height: number;
};

const text = (vi: string, en: string): LocalizedMenuText => ({ vi, en });

// The provisional dish lists are retired. Cafe assets are still pending;
// restaurant drinks must not be presented as the cafe menu.
export const diningMenuVenues = [
  {
    id: "breakfast",
    title: text('Bữa sáng giữa "Thiên Nhiên"', 'Breakfast amidst "Nature"'),
    menuStatus: "included"
  },
  {
    id: "restaurant",
    title: text('Nhà Hàng "Ven Hồ"', 'Restaurant "By the Lake"'),
    menuStatus: "available"
  },
  {
    id: "cafe",
    title: text('Tiệm Cà Phê "Tầng Mây"', 'Coffee Shop "Among the Clouds"'),
    menuStatus: "pending"
  }
] as const;

// Owner-supplied restaurant menu, in printed order 01–10.
// Lossless WebP assets retain the original artwork, wording and prices.
export const restaurantMenuPages: readonly RestaurantMenuPage[] = [
  {
    id: "nuong-bbq",
    title: text("Mẹt nướng & set BBQ", "Grill platters & BBQ sets"),
    src: "/images/dining/restaurant/01-nuong-bbq.webp",
    width: 992,
    height: 1404
  },
  {
    id: "combo-theo-nhom",
    title: text("Combo theo nhóm", "Group combos"),
    src: "/images/dining/restaurant/02-combo-theo-nhom.webp",
    width: 992,
    height: 1404
  },
  {
    id: "lau-do-nhung",
    title: text("Lẩu & đồ nhúng", "Hot pots & extras"),
    src: "/images/dining/restaurant/03-lau-do-nhung.webp",
    width: 992,
    height: 1404
  },
  {
    id: "khai-vi-salad-mon-nhau",
    title: text("Khai vị, salad & món nhậu", "Starters, salads & sharing bites"),
    src: "/images/dining/restaurant/04-khai-vi-salad-mon-nhau.webp",
    width: 992,
    height: 1404
  },
  {
    id: "gia-cam-thit",
    title: text("Gia cầm & thịt", "Poultry & meat"),
    src: "/images/dining/restaurant/05-gia-cam-thit.webp",
    width: 992,
    height: 1404
  },
  {
    id: "ca-nuoc-ngot",
    title: text("Cá nước ngọt đặc sản", "Freshwater fish specialties"),
    src: "/images/dining/restaurant/06-ca-nuoc-ngot.webp",
    width: 992,
    height: 1404
  },
  {
    id: "hai-san-ca-cao-cap",
    title: text("Hải sản & cá cao cấp", "Seafood & premium fish"),
    src: "/images/dining/restaurant/07-hai-san-ca-cao-cap.webp",
    width: 992,
    height: 1404
  },
  {
    id: "dac-san-dat-truoc",
    title: text("Đặc sản đặt trước", "Pre-order specialties"),
    src: "/images/dining/restaurant/08-dac-san-dat-truoc.webp",
    width: 992,
    height: 1404
  },
  {
    id: "com-nha-mon-an-kem",
    title: text("Cơm nhà & món ăn kèm", "Home-style dishes & sides"),
    src: "/images/dining/restaurant/09-com-nha-mon-an-kem.webp",
    width: 992,
    height: 1404
  },
  {
    id: "do-uong",
    title: text("Đồ uống", "Drinks"),
    src: "/images/dining/restaurant/10-do-uong.webp",
    width: 992,
    height: 1404
  }
];
