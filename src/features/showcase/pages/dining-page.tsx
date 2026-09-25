import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import { DiningAndOccasions } from "@/features/showcase/components/destination-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { lakaImages } from "@/features/showcase/data/laka-images";
import { type SiteConfig } from "@/features/showcase/site/site-types";

export function DiningPage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={lakaImages.home.dining.restaurant}
        pill={isEn ? "Dining & Occasions" : "Ẩm Thực & Bàn Tiệc"}
        title={isEn ? "LaKa - Dining" : "LaKa - Ẩm Thực"}
        subtitle={
          isEn ? "Flavours that keep the good times going." : "Những hương vị nối dài cuộc vui."
        }
        description={
          isEn
            ? "From lakeside barbecue grills and warm hot pots to cloud-viewing coffee and serene breakfast amidst nature — dining at LAKA is shaped around unforgettable shared time."
            : "Từ món nướng, lẩu quây quần bên hồ đến cà phê ngắm mây và bữa sáng thanh lành giữa thiên nhiên — ẩm thực tại LAKA nối dài những khoảnh khắc sum vầy."
        }
        cardImage={lakaImages.home.dining.coffee}
        cardBadge="LAKA · Dining"
        cardAlt={isEn ? "Dining at LAKA" : "Ẩm thực tại LAKA"}
        brandTagTop="Taste &"
        brandTagBottom="Culinary."
        dateStamp={isEn ? "Lakeside Grill · Local Flavors" : "Bếp Nướng Hồ · Hương Vị Bản Địa"}
        subTag={isEn ? "Slow Dining & Shared Moments" : "Bàn Ăn Chậm & Khoảnh Khắc Sum Vầy"}
        actionText={isEn ? "View restaurant menu" : "Xem thực đơn"}
        actionHref="#thuc-don"
        locale={locale}
      />
      <DiningAndOccasions locale={locale} />
    </>
  );
}
