import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import { PolicySection } from "@/features/showcase/components/info-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { conceptImages } from "@/features/stays/data/stay-catalog";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { policies } from "@/features/showcase/data/stay-policies";

export function PolicyPage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  const localizedPolicies =
    locale === "en"
      ? ([
          [
            "Reservation and confirmation",
            "Requests made on the website are held for two hours. A reservation is confirmed only after the LAKA team contacts you by phone or Zalo.",
          ],
          [
            "Changes and cancellation",
            "Date changes, cancellations and deposit refunds are explained clearly during confirmation. Final terms must be approved before bookings open.",
          ],
          [
            "Arrival and departure",
            "Official times are not yet published. LAKA confirms them with unit, availability and arrival guidance before the stay.",
          ],
          [
            "Guests and children",
            "Guest numbers may not exceed each home's stated capacity. Extra guest, child and additional bed terms are confirmed when booking.",
          ],
          [
            "Shared quiet",
            "LAKA is designed for restful stays. Please keep noise considerate after 10 pm and discuss group activities with the team in advance.",
          ],
          [
            "Pets",
            "Pet stays depend on the selected home and current operating conditions. Please check with LAKA before booking.",
          ],
          [
            "Your privacy",
            "Contact information is used only to process your stay, support your experience and meet essential operating obligations.",
          ],
          [
            "Concept content",
            "Concept images, prices and selected policies do not yet constitute a commercial commitment. The address and twenty-unit structure are sourced from LAKA's project material.",
          ],
        ] as const)
      : policies;
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.detail3}
        pill={isEn ? "Stay Policies" : "Chính Sách Lưu Trú"}
        title={isEn ? "LaKa - Policies" : "LaKa - Chính Sách"}
        subtitle={
          isEn ? "Clarity before the journey begins" : "Rõ ràng trước khi bắt đầu chuyến đi"
        }
        description={
          isEn
            ? "Simple principles that create a transparent, restful and considerate experience for guests and the LAKA team."
            : "Các nguyên tắc giúp LAKA và khách lưu trú cùng có trải nghiệm minh bạch, nhẹ nhàng và an tâm trọn vẹn."
        }
        cardImage={conceptImages.detail3}
        cardBadge="LAKA · Policy"
        cardAlt={isEn ? "Quiet corner at LAKA" : "Khoảng lặng tại LAKA"}
        brandTagTop="Principles &"
        brandTagBottom="Care."
        dateStamp={
          isEn ? "Reservation · Check-in · Quiet Hours" : "Đặt Căn · Nhận Nhà · Giờ Yên Tĩnh"
        }
        subTag={isEn ? "Considerate & Restful Stays" : "Trải Nghiệm Tinh Tế & An Tâm"}
        actionText={isEn ? "View policies" : "Xem chính sách"}
        actionHref="#chinh-sach"
        locale={locale}
      />
      <PolicySection
        mood={config.mood}
        policies={localizedPolicies}
        intro={
          locale === "en" ? "Small details that help everyone enjoy a calmer stay." : undefined
        }
      />
    </>
  );
}
