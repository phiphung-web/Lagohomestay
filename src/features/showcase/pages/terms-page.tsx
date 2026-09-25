import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import { PolicySection } from "@/features/showcase/components/info-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { conceptImages } from "@/features/stays/data/stay-catalog";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { policies } from "@/features/showcase/data/stay-policies";

export function TermsPage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  const items =
    locale === "en"
      ? ([
          [
            "Scope",
            "These terms describe the structure proposed for using the LAKA website and requesting a stay. Final legal wording must be reviewed before launch.",
          ],
          [
            "Stay requests",
            "A website request is not a confirmed reservation until LAKA contacts the guest and confirms the applicable home, dates and terms.",
          ],
          [
            "Prices and deposits",
            "Published prices, inclusions, deposits and payment schedules must be shown clearly before a guest confirms.",
          ],
          [
            "Changes and responsibility",
            "Change, cancellation, no-show and exceptional-event terms will be tied to the confirmed reservation conditions.",
          ],
          [
            "Concept status",
            "This page currently demonstrates content structure. It is not final legal advice or a commercial commitment.",
          ],
        ] as const)
      : ([
          [
            "Phạm vi áp dụng",
            "Điều khoản mô tả cấu trúc đề xuất khi sử dụng website LAKA và gửi yêu cầu lưu trú. Nội dung pháp lý cuối cùng cần được rà soát trước khi ra mắt.",
          ],
          [
            "Yêu cầu lưu trú",
            "Yêu cầu trên website chưa phải đặt chỗ đã xác nhận cho đến khi LAKA liên hệ và thống nhất căn, ngày cùng điều kiện áp dụng.",
          ],
          [
            "Giá và đặt cọc",
            "Giá công bố, quyền lợi đi kèm, khoản cọc và tiến độ thanh toán phải được trình bày rõ trước khi khách xác nhận.",
          ],
          [
            "Thay đổi và trách nhiệm",
            "Điều kiện đổi, hủy, không đến và các tình huống bất khả kháng sẽ gắn với điều kiện của yêu cầu đã được xác nhận.",
          ],
          [
            "Trạng thái concept",
            "Trang hiện minh họa cấu trúc nội dung, chưa phải tư vấn pháp lý hay cam kết thương mại cuối cùng.",
          ],
        ] as const);
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.forest}
        pill={isEn ? "Terms of Service" : "Điều Khoản Sử Dụng"}
        title={isEn ? "LaKa - Terms" : "LaKa - Điều Khoản"}
        subtitle={
          isEn ? "A clear agreement in plain language" : "Thỏa thuận rõ ràng, ngôn ngữ dễ hiểu"
        }
        description={
          isEn
            ? "A concise, transparent legal structure ready for final review before LAKA welcomes guests."
            : "Khung thông tin pháp lý gọn, rõ và sẵn sàng để rà soát chính thức trước ngày LAKA mở cửa."
        }
        cardImage={conceptImages.forest}
        cardBadge="LAKA · Terms"
        cardAlt={isEn ? "Nature at LAKA" : "Thiên nhiên tại LAKA"}
        brandTagTop="Agreement &"
        brandTagBottom="Trust."
        dateStamp={isEn ? "Transparent · Respect · Guarantee" : "Minh Bạch · Tôn Trọng · Bảo Đảm"}
        subTag={isEn ? "Clear Foundation For Your Stay" : "Nền Tảng Rõ Ràng Cho Kỳ Nghỉ"}
        actionText={isEn ? "View terms" : "Xem điều khoản"}
        actionHref="#chinh-sach"
        locale={locale}
      />
      <PolicySection
        mood={config.mood}
        policies={items}
        intro={
          locale === "en"
            ? "Concept structure — final legal review required before launch."
            : "Cấu trúc minh họa — cần được pháp lý duyệt trước khi phát hành."
        }
      />
    </>
  );
}
