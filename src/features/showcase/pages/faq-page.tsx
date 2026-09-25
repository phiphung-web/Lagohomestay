import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import { FaqIndex, FaqSection } from "@/features/showcase/components/info-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { conceptImages } from "@/features/stays/data/stay-catalog";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { scoped } from "@/features/showcase/site/navigation";

export function FaqPage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.detail1}
        pill={isEn ? "FAQ & Answers" : "Câu Hỏi Thường Gặp"}
        title={isEn ? "LaKa - FAQ" : "LaKa - Hỏi & Đáp"}
        subtitle={
          isEn ? "The useful details, without the noise" : "Những điều cần biết, không vòng vo"
        }
        description={
          isEn
            ? "Short, practical answers about stays, families, dining, services and the current LAKA concept taking shape."
            : "Câu trả lời ngắn gọn về lưu trú, gia đình, ẩm thực, dịch vụ và concept LAKA đang hoàn thiện."
        }
        cardImage={conceptImages.detail1}
        cardBadge="LAKA · Q&A"
        cardAlt={isEn ? "Peaceful corner at LAKA" : "Góc yên bình tại LAKA"}
        brandTagTop="Answers &"
        brandTagBottom="Details."
        dateStamp={isEn ? "Quick Q&A · 24/7 Support" : "Hỏi Đáp Nhanh · Hỗ Trợ 24/7"}
        subTag={isEn ? "Clear & Transparent Answers" : "Giải Đáp Minh Bạch & Tận Tâm"}
        actionText={isEn ? "View FAQ list" : "Danh sách câu hỏi"}
        actionHref="#faq-1"
        locale={locale}
      />
      <FaqIndex locale={locale} />
      <FaqSection
        mood={config.mood}
        policyHref={scoped(config.basePath, "chinh-sach-luu-tru")}
        locale={locale}
      />
    </>
  );
}
