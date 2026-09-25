import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import { ExperienceStory } from "@/features/showcase/components/experience-story";
import { ExperienceCatalog } from "@/features/showcase/components/destination-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { lakaImages } from "@/features/showcase/data/laka-images";
import { type SiteConfig } from "@/features/showcase/site/site-types";

export function ExperiencePage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={lakaImages.experiences.banner}
        pill={isEn ? "Experiences at LAKA" : "Trải Nghiệm Tại LAKA"}
        title={isEn ? "LaKa - Experience" : "LaKa - Trải nghiệm"}
        subtitle={
          isEn
            ? "Every moment opens a new experience"
            : "Để mỗi khoảnh khắc tại LaKa mở ra một trải nghiệm mới."
        }
        description={
          isEn
            ? "From energetic pickleball matches and lake kayaking to calm swims in the blue pool, cycling and lively board games — every moment at LAKA unfolds a new experience."
            : "Từ những trận pickleball sôi nổi, lướt kayak rẽ sóng mặt hồ đến những phút thả mình trong làn nước xanh, đạp xe rong ruổi hay cùng nhau nhập cuộc ván board game rộn rã — để mỗi khoảnh khắc tại LaKa đều mở ra một trải nghiệm mới."
        }
        cardImage={lakaImages.experiences.bannerCard}
        cardBadge="LAKA · Experience"
        cardAlt={isEn ? "Experience at LAKA" : "Trải nghiệm tại LAKA"}
        brandTagTop="Moments &"
        brandTagBottom="Discovery."
        dateStamp={
          isEn ? "Pickleball · Kayak · Pool · Games" : "Pickleball · Kayak · Hồ Xanh · Trò Chơi"
        }
        subTag={isEn ? "Lake · Valley · Active Living" : "Mặt Hồ · Thung Lũng · Trải Nghiệm"}
        actionText={isEn ? "Explore experiences" : "Khám phá trải nghiệm"}
        actionHref="#trai-nghiem"
        locale={locale}
      />
      <ExperienceCatalog locale={locale} />
      <ExperienceStory mood={config.mood} locale={locale} />
    </>
  );
}
