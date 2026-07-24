import {
  Bike,
  CakeSlice,
  Coffee,
  FlameKindling,
  Footprints,
  Heart,
  MapPinned,
  MoonStar,
  ParkingCircle,
  Soup,
  Sparkles,
  Sunrise,
  TentTree,
  UtensilsCrossed
} from "lucide-react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

type LocalizedText = { vi: string; en: string };

export const demoNotice: LocalizedText = {
  vi: "Nội dung và hình ảnh đang dùng cho mục đích trình bày concept. Dịch vụ, giá và địa điểm cần được xác nhận trước khi mở bán.",
  en: "Content and imagery are presented as a concept. Services, prices and location must be confirmed before launch."
};

export const lakaExperiences = [
  {
    icon: Sunrise,
    title: { vi: "Đón sáng bên hồ", en: "Lakeside sunrise" },
    text: { vi: "Một bình trà ấm, chiếc ghế ngoài hiên và khoảng sáng đầu ngày dành riêng cho bạn.", en: "Warm tea, a veranda chair and the first light of day, entirely yours." },
    meta: { vi: "Tự do · mỗi sáng", en: "Self-guided · every morning" },
    image: conceptImages.hero
  },
  {
    icon: Footprints,
    title: { vi: "Dạo rừng thật chậm", en: "A slow forest walk" },
    text: { vi: "Tuyến đi bộ ngắn quanh khu nghỉ, có gợi ý điểm dừng để nghe cây, nhìn nắng và thở sâu.", en: "A short suggested trail with pauses for trees, shifting light and deeper breaths." },
    meta: { vi: "30–60 phút · mọi độ tuổi", en: "30–60 min · all ages" },
    image: conceptImages.forest
  },
  {
    icon: Bike,
    title: { vi: "Một vòng bằng xe đạp", en: "A ride beyond the gate" },
    text: { vi: "Khám phá đường làng và những khoảng xanh gần LAKA theo bản đồ hành trình gợi ý.", en: "Explore quiet lanes and nearby greenery with a suggested LAKA route map." },
    meta: { vi: "Theo thời tiết · cần đặt trước", en: "Weather permitting · reserve ahead" },
    image: conceptImages.hill
  },
  {
    icon: TentTree,
    title: { vi: "Picnic dưới tán cây", en: "Picnic beneath the trees" },
    text: { vi: "Giỏ đồ nhẹ, tấm trải và một góc riêng để cả nhóm có bữa trưa không cần nhìn đồng hồ.", en: "A light hamper, picnic mat and a quiet spot for lunch without watching the clock." },
    meta: { vi: "Gói tùy chọn · 2–6 khách", en: "Optional set · 2–6 guests" },
    image: conceptImages.experience
  },
  {
    icon: FlameKindling,
    title: { vi: "Bữa tối bên lửa", en: "Dinner by the fire" },
    text: { vi: "BBQ tại hiên riêng, ánh đèn ấm và playlist chậm cho một buổi tối kéo dài vừa đủ.", en: "A private-veranda barbecue, warm light and a slow playlist for a lingering evening." },
    meta: { vi: "Gọi trước 24 giờ", en: "Request 24 hours ahead" },
    image: conceptImages.detail2
  },
  {
    icon: MoonStar,
    title: { vi: "Ngắm trời đêm", en: "Under the night sky" },
    text: { vi: "Tắt bớt ánh sáng, trải ghế ngoài hiên và để đêm yên trở thành hoạt động cuối ngày.", en: "Dim the lights, settle onto the veranda and let the quiet sky close the day." },
    meta: { vi: "Tự do · tùy thời tiết", en: "Self-guided · weather permitting" },
    image: conceptImages.cloud
  }
] as const;

export const diningStories = [
  {
    icon: Coffee,
    kicker: { vi: "Buổi sáng", en: "Morning" },
    title: { vi: "Giỏ sáng bên hiên", en: "Breakfast on the veranda" },
    text: { vi: "Bánh mới, trái cây theo mùa, món nóng và cà phê được chuẩn bị để bạn dùng ngay tại căn.", en: "Fresh bread, seasonal fruit, a warm dish and coffee, prepared to enjoy at your home." }
  },
  {
    icon: Soup,
    kicker: { vi: "Bữa nhà", en: "Home table" },
    title: { vi: "Bếp Nhà LAKA", en: "The LAKA home kitchen" },
    text: { vi: "Thực đơn gợi ý theo mùa, ưu tiên nguyên liệu địa phương và những món dễ chia sẻ giữa bàn.", en: "A seasonal suggested menu centred on local ingredients and dishes made for sharing." }
  },
  {
    icon: UtensilsCrossed,
    kicker: { vi: "Buổi tối", en: "Evening" },
    title: { vi: "Bàn ăn riêng theo yêu cầu", en: "A private table, by request" },
    text: { vi: "Set-up tại hiên hoặc trong căn cho sinh nhật, kỷ niệm và những cuộc gặp không cần quá đông.", en: "A veranda or indoor set-up for birthdays, anniversaries and small, meaningful gatherings." }
  }
] as const;

export const specialMoments = [
  { icon: Heart, title: { vi: "Kỷ niệm của hai người", en: "An anniversary for two" }, text: { vi: "Hoa, bánh nhỏ, bữa tối và góc riêng được sắp đặt theo câu chuyện của bạn.", en: "Flowers, a small cake, dinner and a private setting shaped around your story." } },
  { icon: CakeSlice, title: { vi: "Sinh nhật thật gần", en: "An intimate birthday" }, text: { vi: "Một bàn tiệc ấm cho gia đình hoặc nhóm bạn, không gian vừa đủ để ai cũng hiện diện.", en: "A warm table for family or friends, intimate enough for everyone to be present." } },
  { icon: Sparkles, title: { vi: "Lời ngỏ giữa thiên nhiên", en: "A proposal in nature" }, text: { vi: "Gợi ý thời điểm, góc cảnh và set-up kín đáo để khoảnh khắc vẫn thuộc về hai người.", en: "Thoughtful timing, setting and discreet preparation so the moment remains yours." } },
  { icon: TentTree, title: { vi: "Kỳ nghỉ nhóm nhỏ", en: "A small-group retreat" }, text: { vi: "Không gian sinh hoạt chung, bữa ăn và nhịp hoạt động linh hoạt cho đội nhóm thân thiết.", en: "Shared spaces, meals and a flexible rhythm for close-knit groups." } }
] as const;

export const journeySteps = [
  { icon: MapPinned, title: { vi: "Vị trí", en: "Location" }, text: { vi: "Khu vực ngoại thành Hà Nội · địa chỉ chính thức sẽ hiển thị sau khi được xác nhận.", en: "Greater Hanoi area · the confirmed address will be shown once approved." } },
  { icon: ParkingCircle, title: { vi: "Di chuyển", en: "Getting here" }, text: { vi: "Có hướng dẫn đường đi và điểm đỗ xe riêng. Dịch vụ xe đưa đón đang ở mức đề xuất.", en: "Driving directions and private parking guidance are provided. Transfers remain a proposed service." } },
  { icon: Sunrise, title: { vi: "Nhận & trả căn", en: "Arrival & departure" }, text: { vi: "Khung giờ demo: nhận căn từ 14:00, trả căn trước 11:00. LAKA xác nhận lại trước chuyến đi.", en: "Concept hours: check-in from 2 pm and check-out by 11 am, reconfirmed before arrival." } },
  { icon: MoonStar, title: { vi: "Trước khi đến", en: "Before arrival" }, text: { vi: "Bạn nhận hướng dẫn đường, người hỗ trợ, thực đơn tùy chọn và checklist ngắn qua Zalo.", en: "Directions, a host contact, optional menus and a short checklist are shared via Zalo." } }
] as const;

export function inLocale(value: LocalizedText, locale: ShowcaseLocale) {
  return value[locale];
}
