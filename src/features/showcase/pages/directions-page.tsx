import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import { JourneySection } from "@/features/showcase/components/destination-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { conceptImages } from "@/features/stays/data/stay-catalog";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { scoped } from "@/features/showcase/site/navigation";

export function DirectionsPage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.cloud}
        pill={isEn ? "Getting to LAKA" : "Đường Đến LAKA"}
        title={isEn ? "LaKa - Directions" : "LaKa - Di Chuyển"}
        subtitle={
          isEn
            ? "The journey feels easy before it begins"
            : "Hành trình nhẹ nhàng từ trước khi khởi hành"
        }
        description={
          isEn
            ? "A dedicated place for routes, travel times, transfers and arrival notes. Map details and direct directions guide your way."
            : "Một nơi riêng cho cung đường, thời gian di chuyển, phương án đưa đón và lưu ý khi đến. Bản đồ và hỗ trợ đường đi thuận tiện nhất."
        }
        cardImage={conceptImages.cloud}
        cardBadge="LAKA · Route"
        cardAlt={isEn ? "Clouds over pine hills at LAKA" : "Mây trời và đồi thông tại LAKA"}
        brandTagTop="Map &"
        brandTagBottom="Routes."
        dateStamp={isEn ? "Doc Day Dieu, Trung Gia, Soc Son" : "Dốc Dây Diều, Trung Giã, Sóc Sơn"}
        subTag={isEn ? "45 Minutes From Central Hanoi" : "45 Phút Từ Trung Tâm Hà Nội"}
        actionText={isEn ? "View route guide" : "Xem chỉ đường"}
        actionHref="#chi-duong"
        locale={locale}
      />
      <JourneySection locale={locale} contactHref={scoped(config.basePath, "lien-he")} />
    </>
  );
}
