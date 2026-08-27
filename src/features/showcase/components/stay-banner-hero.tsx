import { PageBannerHero, DEFAULT_BANNER_IMAGES } from "@/features/showcase/components/page-banner-hero";
import type { CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function StayBannerHero({
  locale = "vi"
}: {
  config?: CompleteTemplateConfig;
  locale?: ShowcaseLocale;
}) {
  const isEn = locale === "en";

  return (
    <PageBannerHero
      bgImage={DEFAULT_BANNER_IMAGES.bokehBg}
      pill={isEn ? "Stay Collection" : "Bộ Sưu Tập Lưu Trú"}
      title={isEn ? "LaKa - Stays" : "LaKa - Lưu Trú"}
      subtitle={isEn ? "Each green corner, its own rhythm" : "Mỗi khoảng xanh 1 nhịp riêng"}
      description={
        isEn
          ? "Eight accommodation styles and twenty private homes between lake, valley and pine hills. Designed for slow days where every shade of green brings calm."
          : "Tám dòng lưu trú và hai mươi căn nhà nép mình giữa hồ nước, thung lũng và đồi thông. Nơi mỗi khoảng xanh là một nhịp thở tự nhiên vỗ về tâm hồn và đưa bạn trở về với sự an yên."
      }
      cardImage={DEFAULT_BANNER_IMAGES.cardLeaf}
      cardBadge="LAKA · Greenery"
      cardAlt={isEn ? "Fresh green leaves at LAKA" : "Lá xanh tươi mát tại LAKA"}
      brandTagTop={isEn ? "Stay" : "Bộ Sưu Tập"}
      brandTagBottom={isEn ? "Collection." : "Lưu Trú."}
      dateStamp={isEn ? "03, January 2026" : "03, Tháng Một 2026"}
      subTag={isEn ? "Lake · Valley · Pine Forest" : "Ven Hồ · Thung Lũng · Rừng Thông"}
      actionText={isEn ? "Explore 20 homes" : "Khám phá 20 căn"}
      actionHref="#bo-suu-tap-can"
      locale={locale}
    />
  );
}
