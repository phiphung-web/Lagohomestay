import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import { ServicesCatalog } from "@/features/showcase/components/destination-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { lakaImages } from "@/features/showcase/data/laka-images";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { scoped } from "@/features/showcase/site/navigation";

export function ServicesPage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={lakaImages.services.banner}
        pill={isEn ? "Services & Amenities" : "Dịch Vụ & Tiện Ích"}
        title={isEn ? "LaKa - Services" : "LaKa - Dịch Vụ"}
        subtitle={
          isEn ? "Everything useful, nothing intrusive" : "Đủ đầy khi cần, riêng tư khi muốn"
        }
        description={
          isEn
            ? "From family essentials and private transfers to shared nature spaces — choose only what makes your stay lighter."
            : "Từ tiện ích gia đình, xe đưa đón đến không gian thiên nhiên dùng chung — bạn chỉ cần chọn những gì khiến kỳ nghỉ nhẹ nhàng hơn."
        }
        cardImage={lakaImages.services.bannerCard}
        cardBadge="LAKA · Services"
        cardAlt={isEn ? "Services and amenities at LAKA" : "Dịch vụ và tiện ích tại LAKA"}
        brandTagTop="Comfort &"
        brandTagBottom="Care."
        dateStamp={
          isEn ? "Family Essentials · Transfers · Freedom" : "Tiện Ích Gia Đình · Di Chuyển · Tự Do"
        }
        subTag={isEn ? "Thoughtful & Discreet Support" : "Chăm Sóc Chu Đáo & Kín Đáo"}
        actionText={isEn ? "View services catalog" : "Danh mục dịch vụ"}
        actionHref="#danh-muc-dich-vu"
        locale={locale}
      />
      <ServicesCatalog locale={locale} contactHref={scoped(config.basePath, "lien-he")} />
    </>
  );
}
