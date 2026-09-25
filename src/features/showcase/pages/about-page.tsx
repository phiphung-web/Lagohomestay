import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import { AboutStory } from "@/features/showcase/components/brand-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { lakaImages } from "@/features/showcase/data/laka-images";
import { type SiteConfig } from "@/features/showcase/site/site-types";

export function AboutPage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={lakaImages.home.hero.desktop}
        pill={isEn ? "The LAKA Philosophy" : "Triết Lý LAKA"}
        title={isEn ? '"Choose" Cabin. "Hold" Valley.' : '"Chọn" Cabin. "Trọn" Thung Lũng.'}
        subtitle={
          isEn
            ? "Choose an open space, embrace every moment of connection."
            : "Chọn một không gian mở, Trọn phút giây gắn kết."
        }
        description={
          isEn
            ? "LAKA began with a wish to create homes where people can give their full attention to nature and to one another."
            : "LAKA bắt đầu từ mong muốn tạo ra những căn nhà nơi con người có thể dành trọn sự chú ý cho thiên nhiên và cho nhau."
        }
        cardImage={lakaImages.home.mission}
        cardBadge="LAKA · Story"
        cardAlt={isEn ? "Pine forest at LAKA" : "Rừng thông tại LAKA"}
        brandTagTop="Origin &"
        brandTagBottom="Essence."
        dateStamp={isEn ? "Trung Gia · Soc Son · Hanoi" : "Trung Giã · Sóc Sơn · Hà Nội"}
        subTag={isEn ? "Nature Refuge Since 2026" : "Chốn An Trú Tự Nhiên 2026"}
        actionText={isEn ? "Read the LAKA story" : "Đọc câu chuyện"}
        actionHref="#cau-chuyen"
        locale={locale}
      />
      <AboutStory mood={config.mood} locale={locale} />
    </>
  );
}
