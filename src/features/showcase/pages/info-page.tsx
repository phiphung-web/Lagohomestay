import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import {
  FaqSection,
  InfoHighlights,
  InfoRelatedLinks,
} from "@/features/showcase/components/info-sections";
import { JourneySection } from "@/features/showcase/components/destination-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { conceptImages } from "@/features/stays/data/stay-catalog";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { scoped } from "@/features/showcase/site/navigation";

export function InfoPage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        compact
        bgImage={conceptImages.hill}
        pill={isEn ? "Understanding LAKA" : "Hiểu Thêm Về LAKA"}
        title={isEn ? "LaKa - Information" : "LaKa - Thông Tin"}
        subtitle={
          isEn ? "Clear information, space for discovery" : "Thông tin rõ ràng, không gian khám phá"
        }
        description={
          isEn
            ? "A concise guide to the landscape, private homes, experiences and arrival notes to help you prepare before your stay."
            : "Những câu trả lời ngắn gọn và hướng dẫn chi tiết về cảnh quan, các căn nhà, trải nghiệm và lưu ý chuẩn bị trước chuyến đi."
        }
        cardImage={conceptImages.hill}
        cardBadge="LAKA · Handbook"
        cardAlt={isEn ? "Valley landscape at LAKA" : "Cảnh sắc thung lũng LAKA"}
        brandTagTop="Guide &"
        brandTagBottom="Handbook."
        dateStamp={isEn ? "Stays · Journey · FAQ" : "Lưu Trú · Hành Trình · FAQ"}
        subTag={isEn ? "All Essentials Before Arrival" : "Cẩm Nang Đầy Đủ Trước Khi Đến"}
        actionText={isEn ? "View FAQs" : "Xem câu hỏi"}
        actionHref="#faq-1"
        locale={locale}
      />
      <InfoHighlights locale={locale} />
      <JourneySection locale={locale} contactHref={scoped(config.basePath, "lien-he")} />
      <FaqSection
        mood={config.mood}
        policyHref={scoped(config.basePath, "chinh-sach-luu-tru")}
        locale={locale}
      />
      <InfoRelatedLinks basePath={config.basePath} locale={locale} />
    </>
  );
}
