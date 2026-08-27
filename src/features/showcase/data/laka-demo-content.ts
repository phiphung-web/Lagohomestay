import {
  Bike,
  CircleDot,
  Coffee,
  Dices,
  FlameKindling,
  Footprints,
  Heart,
  MapPinned,
  MoonStar,
  Music,
  ParkingCircle,
  Sparkles,
  Sunrise,
  TentTree,
  Users,
  UtensilsCrossed,
  Waves
} from "lucide-react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

type LocalizedText = { vi: string; en: string };

export const demoNotice: LocalizedText = {
  vi: "Thông tin tên căn, mã căn, sức chứa đã nêu, địa chỉ, hệ tiện ích và nhóm món được cập nhật từ tài liệu LAKA. Hình ảnh và một số thông tin vận hành vẫn đang được hoàn thiện.",
  en: "Accommodation names, unit codes, stated capacities, address, facilities and menu categories come from LAKA's material. Imagery and selected operating details are still being completed."
};

export const lakaExperiences = [
  {
    icon: Sunrise,
    title: { vi: "PickleBall Bật Mood", en: "PickleBall Mood On" },
    text: { vi: "Bắt đầu cuộc vui bằng một trận đấu đầy năng lượng, tiếng cười và những pha bóng kết nối cả nhóm.", en: "Start the fun with an energetic match, plenty of laughter and rallies that bring everyone together." },
    meta: { vi: "Vận động · kết nối", en: "Active · social" },
    image: conceptImages.hill
  },
  {
    icon: Waves,
    title: { vi: "Lướt Hồ Cùng Kayak", en: "Kayak Across the Lake" },
    text: { vi: "Cùng nhau rẽ mặt nước, ngắm thung lũng từ một góc thật khác và để nhịp chèo đưa cả nhóm gần nhau hơn.", en: "Cut across the water together, see the valley from a new angle and let every paddle stroke bring the group closer." },
    meta: { vi: "Mặt hồ · khám phá", en: "On the lake · explore" },
    image: conceptImages.hero
  },
  {
    icon: Waves,
    title: { vi: "Thư giãn cùng Hồ Xanh", en: "Unwind by the Blue Pool" },
    text: { vi: "Thả lỏng giữa làn nước xanh, chậm lại dưới khoảng trời rộng và tận hưởng một phút nghỉ thật nhẹ tênh.", en: "Float in blue water, slow down beneath the open sky and enjoy a pause that feels completely effortless." },
    meta: { vi: "Thảnh thơi · hồ xanh", en: "Unhurried · poolside" },
    image: conceptImages.experience
  },
  {
    icon: Bike,
    title: { vi: "Đạp xe Rong Ruổi", en: "Roam by Bicycle" },
    text: { vi: "Đạp xe qua những khoảng xanh, thong thả tìm một góc cảnh mới và để hành trình tự dẫn lối.", en: "Ride through green spaces, take your time finding a new view and let the journey choose the way." },
    meta: { vi: "Tự do · rong ruổi", en: "Free · unhurried" },
    image: conceptImages.forest
  },
  {
    icon: Dices,
    title: { vi: "Board Game", en: "Board Games" },
    text: { vi: "Cùng nhau nhập cuộc với những ván board game đầy tiếng cười và bất ngờ.", en: "Join the game together for rounds of board games full of laughter and surprises." },
    meta: { vi: "Gắn kết · tiếng cười", en: "Bonding · fun" },
    image: conceptImages.detail1
  },
  {
    icon: CircleDot,
    title: { vi: "Bida", en: "Billiards" },
    text: { vi: "Cùng thử tài với những đường cơ chuẩn xác, những cú đánh đẹp và chút cạnh tranh đầy hứng khởi.", en: "Test your skill with precise cue shots, great plays and a spark of lively competition." },
    meta: { vi: "Thư giãn · thử tài", en: "Leisure · skill" },
    image: conceptImages.detail2
  }
] as const;

export const diningStories = [
  {
    icon: Sunrise,
    kicker: { vi: "Bên hồ trong veo", en: "By the clear lake" },
    title: { vi: 'Bữa sáng giữa "Thiên Nhiên"', en: 'Breakfast amidst "Nature"' },
    text: {
      vi: "Bên hồ trong veo, một bữa sáng giữa thiên nhiên cũng đủ khiến ngày mới trở nên dịu dàng.",
      en: "By the crystal-clear lake, a breakfast amidst nature is all it takes to make the new day gentle and serene."
    },
    image: conceptImages.breakfast
  },
  {
    icon: UtensilsCrossed,
    kicker: { vi: "Bên mặt nước", en: "By the water" },
    title: { vi: 'Nhà Hàng "Ven Hồ"', en: 'Restaurant "By the Lake"' },
    text: {
      vi: "Nép mình bên mặt hồ, mở ra khoảng trời ôm trọn núi đồi và mặt nước. Một nơi để thưởng thức món ngon, nhâm nhi chút chill và để những cuộc chuyện trò cứ thế dài thêm theo chiều hoàng hôn.",
      en: "Tucked beside the lake, opening to a sky embracing mountains and water. A place to enjoy great dishes, sip a chilled drink and let conversations stretch through the golden sunset."
    },
    image: conceptImages.dining
  },
  {
    icon: Coffee,
    kicker: { vi: "Núi, mây & thông", en: "Mountain, cloud & pine" },
    title: { vi: 'Tiệm Cà Phê "Tầng Mây"', en: 'Coffee Shop "Among the Clouds"' },
    text: {
      vi: "Nằm đối diện mặt hồ, mở ra từng tầng view độc bản ôm trọn mây núi và rừng thông. Một nơi để nhâm nhi cà phê, ngồi thật lâu và thả mình theo những tầng cảnh sắc.",
      en: "Facing the lake, opening into unique layered views embracing clouds, mountains and pine forests. A place to sip coffee, linger long and drift into the serene landscape."
    },
    image: conceptImages.cloud
  }
] as const;

export const specialMoments = [
  {
    icon: Users,
    title: { vi: "Team Building", en: "Team Building" },
    text: {
      vi: "Cùng vượt thử thách, bung hết năng lượng, bật lên tiếng cười và tạo nên những kỷ niệm thật đáng nhớ giữa thiên nhiên tại LaKa.",
      en: "Overcome challenges together, unleash your energy, spark laughter and create unforgettable memories surrounded by nature at LaKa."
    },
    cta: { vi: "Tư Vấn", en: "Tư Vấn" },
    image: conceptImages.experience
  },
  {
    icon: Music,
    title: {
      vi: "Tiệc ngoài trời (Thiết kế sân khấu, ca nhạc)",
      en: "Tiệc ngoài trời (Thiết kế sân khấu, ca nhạc)"
    },
    text: {
      vi: "Không gian được thiết kế chỉn chu với sân khấu, âm nhạc và ánh sáng, tạo nên những khoảnh khắc rực rỡ, cảm xúc và đáng nhớ bên nhau.",
      en: "A thoughtfully curated outdoor setting with stage, live music and ambient lighting, creating radiant, emotional and memorable moments together."
    },
    cta: { vi: "Tư Vấn", en: "Tư Vấn" },
    image: conceptImages.dining
  },
  {
    icon: FlameKindling,
    title: { vi: "Lửa trại", en: "Lửa trại" },
    text: {
      vi: "Quây quần bên ánh lửa ấm áp, cùng hát ca, sẻ chia và lưu giữ những khoảnh khắc gắn kết khó quên.",
      en: "Gather around the warm glow of the fire, sing together, share stories and cherish unforgettable bonding moments."
    },
    cta: { vi: "Tư Vấn", en: "Tư Vấn" },
    image: conceptImages.detail1
  }
] as const;

export const guestServices = [
  {
    icon: Waves,
    title: { vi: "Hoạt động mặt hồ", en: "Lake activities" },
    text: { vi: "Thuyền đạp nước và kayak nằm trong kế hoạch trải nghiệm; lịch, hướng dẫn an toàn và phí nếu có đang chờ xác nhận.", en: "Pedal boats and kayaks are in the experience plan; schedule, safety guidance and any fees await confirmation." },
    meta: { vi: "Kế hoạch đã nêu · vận hành chờ duyệt", en: "Planned · operation pending" }
  },
  {
    icon: Sunrise,
    title: { vi: "Bơi & pickleball", en: "Pool and pickleball" },
    text: { vi: "Bể Bơi Bốn Mùa và Sân Pickleball Đón Nắng là hai tiện ích vận động dùng chung của dự án.", en: "The Four-season Pool and Sunlit Pickleball Court are LAKA's two shared active facilities." },
    meta: { vi: "Giờ vận hành đang hoàn thiện", en: "Operating hours being finalised" }
  },
  {
    icon: Sparkles,
    title: { vi: "Tư vấn theo quy mô đoàn", en: "Advice for each group size" },
    text: { vi: "Đội ngũ LAKA tiếp nhận ngày đi, số khách và mong muốn để gợi ý đúng dòng căn trước khi báo giá.", en: "LAKA uses dates, guest count and priorities to recommend the right accommodation type before quoting." },
    meta: { vi: "Qua trang Liên hệ, điện thoại hoặc Zalo", en: "Via Contact, phone or Zalo" }
  },
  {
    icon: Footprints,
    title: { vi: "Chương trình đoàn", en: "Group programmes" },
    text: { vi: "Hát và team building được định hướng cho nhóm bạn, công ty; quy mô, âm thanh và lịch trình cần thống nhất trước.", en: "Singing and team building are planned for friends and company groups; scale, sound and schedule require agreement." },
    meta: { vi: "Thiết kế theo yêu cầu · chờ xác nhận", en: "Tailored · confirmation required" }
  }
] as const;

export const sharedFacilities = [
  { icon: UtensilsCrossed, title: { vi: "Nhà Hàng Ven Hồ", en: "Lakeside Restaurant" }, text: { vi: "Không gian nhà hàng bên hồ, nhìn ra mặt nước và dãy núi.", en: "A restaurant by the lake with water and mountain views." }, image: conceptImages.dining },
  { icon: Coffee, title: { vi: "Tiệm Cà Phê Tầng Mây", en: "Tang May Coffee Shop" }, text: { vi: "Tiệm cà phê nhiều tầng đối diện hồ, mở tầm nhìn về núi, mây và rừng thông.", en: "A terraced coffee shop facing the lake, mountains, clouds and pine forest." }, image: conceptImages.breakfast },
  { icon: Sunrise, title: { vi: "Sân Pickleball Đón Nắng", en: "Sunlit Pickleball Court" }, text: { vi: "Không gian vận động và kết nối dành cho cặp đấu, nhóm bạn và hoạt động đoàn.", en: "An active social space for pairs, friends and group programmes." }, image: conceptImages.hill },
  { icon: Waves, title: { vi: "Bể Bơi Bốn Mùa", en: "Four-season Pool" }, text: { vi: "Bể bơi chung trong hệ tiện ích LAKA; giờ và quy định sử dụng đang chờ xác nhận.", en: "A shared pool in LAKA's facility plan; hours and guest rules await confirmation." }, image: conceptImages.experience },
  { icon: TentTree, title: { vi: "Thung Lũng Săn Mây", en: "Cloud-watching Valley" }, text: { vi: "Khoảng check-in nhìn về thung lũng, nơi mây, núi và rừng thông tạo nên phông cảnh đặc trưng.", en: "A valley viewpoint where clouds, mountains and pines form LAKA's defining landscape." }, image: conceptImages.cloud }
] as const;

export const journeySteps = [
  { icon: MapPinned, title: { vi: "Địa chỉ LAKA", en: "LAKA address" }, text: { vi: "Dốc Dây Diều, Xóm 1, Thanh Hà, Trung Giã, Hà Nội.", en: "Doc Day Dieu, Hamlet 1, Thanh Ha, Trung Gia, Hanoi." } },
  { icon: ParkingCircle, title: { vi: "Trước khi khởi hành", en: "Before departure" }, text: { vi: "Liên hệ LAKA qua điện thoại hoặc Zalo để nhận tuyến đường và hướng dẫn đến nơi phù hợp nhất.", en: "Contact LAKA by phone or Zalo for the most suitable route and arrival guidance." } },
  { icon: Sunrise, title: { vi: "Nhận & trả căn", en: "Arrival & departure" }, text: { vi: "Khung giờ chính thức chưa được công bố. LAKA sẽ xác nhận cùng thông tin căn và lịch trống trước chuyến đi.", en: "Official times are not yet published. LAKA confirms them with unit and availability details before the stay." } },
  { icon: MoonStar, title: { vi: "Xác nhận trực tiếp", en: "Direct confirmation" }, text: { vi: "Căn, giá, đặt cọc và các yêu cầu của đoàn chỉ được chốt sau khi đội ngũ LAKA liên hệ trực tiếp.", en: "The unit, price, deposit and group requests are final only after direct confirmation from LAKA." } }
] as const;

export function inLocale(value: LocalizedText, locale: ShowcaseLocale) {
  return value[locale];
}
