import {
  Bike,
  Coffee,
  FlameKindling,
  Footprints,
  Heart,
  MapPinned,
  MoonStar,
  ParkingCircle,
  Sparkles,
  Sunrise,
  TentTree,
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
    title: { vi: "Săn mây trong thung lũng", en: "Cloud watching in the valley" },
    text: { vi: "Đón mây, núi và rừng thông trong cùng một khung cảnh tại Thung Lũng Săn Mây.", en: "Meet clouds, mountains and pine forest in one view at LAKA's cloud-watching valley." },
    meta: { vi: "Tự do · theo thời tiết", en: "Self-guided · weather dependent" },
    image: conceptImages.cloud
  },
  {
    icon: Waves,
    title: { vi: "Chèo kayak & đạp nước", en: "Kayaking and pedal boats" },
    text: { vi: "Những hoạt động trên mặt hồ giúp cặp đôi, gia đình và nhóm bạn cùng chuyển động trong một nhịp.", en: "Activities on the lake help couples, families and friends move together at one pace." },
    meta: { vi: "Kế hoạch tiện ích · chờ xác nhận vận hành", en: "Facility plan · operation pending" },
    image: conceptImages.hero
  },
  {
    icon: Bike,
    title: { vi: "Pickleball Đón Nắng", en: "Sunlit pickleball" },
    text: { vi: "Một khoảng vận động để thi đấu vui, kết nối nhóm và tạo thêm nhịp sống cho kỳ nghỉ.", en: "A social court for friendly games, group connection and a more active stay." },
    meta: { vi: "Sân dùng chung · chờ lịch vận hành", en: "Shared court · schedule pending" },
    image: conceptImages.hill
  },
  {
    icon: Waves,
    title: { vi: "Bể Bơi Bốn Mùa", en: "Four-season pool" },
    text: { vi: "Không gian bơi chung nằm trong hệ tiện ích của LAKA, dành cho những giờ nghỉ giữa ngày.", en: "A shared pool in LAKA's facility plan, made for an easy pause in the middle of the day." },
    meta: { vi: "Chờ xác nhận giờ mở cửa và quy định", en: "Hours and rules pending" },
    image: conceptImages.experience
  },
  {
    icon: UtensilsCrossed,
    title: { vi: "Ăn uống bên hồ", en: "Dining by the lake" },
    text: { vi: "Nhà Hàng Ven Hồ, Tiệm Cà Phê Tầng Mây và Quầy Bar Hiên Gió tạo thành ba nhịp ăn uống khác nhau trong ngày.", en: "The Lakeside Restaurant, Tang May Coffee Shop and Hien Gio Bar create three different dining rhythms through the day." },
    meta: { vi: "Thực đơn và giờ mở cửa đang hoàn thiện", en: "Menu and hours being finalised" },
    image: conceptImages.dining
  },
  {
    icon: MoonStar,
    title: { vi: "Hát & hoạt động nhóm", en: "Singing and group activities" },
    text: { vi: "LAKA định hướng phục vụ nhóm bạn và công ty với không gian kết nối, hát và team building theo phương án được duyệt.", en: "LAKA plans group-friendly spaces for singing and team building, subject to an approved programme." },
    meta: { vi: "Cần trao đổi trước với LAKA", en: "Discuss with LAKA in advance" },
    image: conceptImages.table
  }
] as const;

export const diningStories = [
  {
    icon: UtensilsCrossed,
    kicker: { vi: "Bên mặt nước", en: "By the water" },
    title: { vi: "Nhà Hàng Ven Hồ", en: "Lakeside Restaurant" },
    text: { vi: "Nhà hàng nhìn ra hồ và núi, với các nhóm món khai vị, đồ nướng, lẩu và món nhà để cả bàn cùng sẻ chia.", en: "The main dining venue overlooks the lake and mountains, with starters, grilled dishes, hot pots and familiar plates made for sharing." },
    image: conceptImages.dining
  },
  {
    icon: Coffee,
    kicker: { vi: "Núi, mây & thông", en: "Mountain, cloud and pine" },
    title: { vi: "Café LAKA", en: "LAKA Café" },
    text: { vi: "Một khoảng nghỉ với cà phê, cold brew, trà trái cây, matcha và món ăn nhẹ giữa cảnh hồ, núi và rừng thông.", en: "A pause for coffee, cold brew, fruit tea, matcha and light snacks among views of lake, mountains and pine forest." },
    image: conceptImages.breakfast
  },
  {
    icon: Sparkles,
    kicker: { vi: "Điểm gặp nhau", en: "A meeting point" },
    title: { vi: "Quầy Bar Hiên Gió", en: "Hien Gio Bar" },
    text: { vi: "Quầy bar tròn mở bốn phía, có chỗ ngồi bao quanh cho một cuộc gặp thoáng và tự nhiên.", en: "A circular open-sided bar with seating all around for an easy, open-air meeting." },
    image: conceptImages.detail2
  }
] as const;

export const specialMoments = [
  { icon: Heart, title: { vi: "Khoảng riêng cho hai người", en: "A private stay for two" }, text: { vi: "Cabin An Trú, Khoảng Trời và Vô Cực tạo ba cách khác nhau để cặp đôi nhìn ngắm hồ, rừng và mây.", en: "An Tru, Khoang Troi and Vo Cuc offer three distinct ways for couples to see lake, forest and clouds." } },
  { icon: TentTree, title: { vi: "Gia đình & nhóm bạn", en: "Families and friends" }, text: { vi: "Bungalow Bên Hồ, Nhà Bên Hồ và Cabin Sum Vầy phục vụ các quy mô từ 6 đến 20 khách theo sức chứa đã nêu.", en: "Lakeside Bungalows, Guest House and Sum Vay Cabins cover stated group sizes from 6 to 20 guests." } },
  { icon: FlameKindling, title: { vi: "Đoàn công ty & team building", en: "Company groups and team building" }, text: { vi: "Nhà Trên Đồi, Cabin Sum Vầy và hệ hoạt động chung tạo nền cho chuyến đi đoàn; chương trình cần được LAKA xác nhận trước.", en: "Top Hill Villa, Sum Vay Cabins and shared activities support group retreats; programmes require advance confirmation." } }
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
    meta: { vi: "Qua điện thoại hoặc Zalo", en: "By phone or Zalo" }
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
  { icon: Sparkles, title: { vi: "Quầy Bar Hiên Gió", en: "Hien Gio Bar" }, text: { vi: "Quầy bar tròn, mở bốn phía với chỗ ngồi bao quanh.", en: "A circular open-sided bar with seating all around." }, image: conceptImages.detail2 },
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
