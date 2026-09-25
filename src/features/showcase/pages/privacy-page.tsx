import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import { PolicySection } from "@/features/showcase/components/info-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { conceptImages } from "@/features/stays/data/stay-catalog";
import { type SiteConfig } from "@/features/showcase/site/site-types";
import { policies } from "@/features/showcase/data/stay-policies";

export function PrivacyPage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  const items =
    locale === "en"
      ? ([
          [
            "Information collected",
            "The proposed flow collects only the contact and stay details needed to respond to a request.",
          ],
          [
            "Purpose",
            "Information is used to advise guests, process stay requests and provide essential pre-arrival support.",
          ],
          [
            "Retention and security",
            "Final retention periods, access controls and service providers must be documented before launch.",
          ],
          [
            "Your choices",
            "Guests will be able to request access, correction or deletion through LAKA's published contact channel.",
          ],
          [
            "Concept status",
            "This privacy page is a structural demonstration and requires formal data-protection review before publication.",
          ],
        ] as const)
      : ([
          [
            "Thông tin được thu thập",
            "Luồng đề xuất chỉ thu thập thông tin liên hệ và nhu cầu lưu trú cần thiết để phản hồi yêu cầu.",
          ],
          [
            "Mục đích sử dụng",
            "Thông tin được dùng để tư vấn, xử lý yêu cầu lưu trú và hỗ trợ những nội dung thiết yếu trước chuyến đi.",
          ],
          [
            "Lưu trữ và bảo vệ",
            "Thời hạn lưu trữ, quyền truy cập và các nhà cung cấp liên quan phải được công bố trước khi website vận hành thật.",
          ],
          [
            "Lựa chọn của khách",
            "Khách có thể yêu cầu xem, chỉnh sửa hoặc xóa dữ liệu qua kênh liên hệ chính thức của LAKA.",
          ],
          [
            "Trạng thái concept",
            "Trang bảo mật hiện minh họa cấu trúc và cần được rà soát chính thức về bảo vệ dữ liệu trước khi phát hành.",
          ],
        ] as const);
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.detail2}
        pill={isEn ? "Privacy Policy" : "Quyền Riêng Tư"}
        title={isEn ? "LaKa - Privacy" : "LaKa - Bảo Mật"}
        subtitle={
          isEn
            ? "Collect less, explain clearly, protect carefully"
            : "Thu thập vừa đủ, giải thích rõ ràng, bảo vệ cẩn trọng"
        }
        description={
          isEn
            ? "A transparent structure for how LAKA receives and securely handles guest information."
            : "Cấu trúc minh bạch về cách LAKA dự kiến tiếp nhận và xử lý thông tin của khách hàng một cách an toàn."
        }
        cardImage={conceptImages.detail2}
        cardBadge="LAKA · Privacy"
        cardAlt={isEn ? "Privacy at LAKA" : "Bảo mật tại LAKA"}
        brandTagTop="Security &"
        brandTagBottom="Privacy."
        dateStamp={isEn ? "Data Protection & Privacy" : "Bảo Vệ Dữ Liệu & Thông Tin Cá Nhân"}
        subTag={isEn ? "Your Trust Is Our Priority" : "Sự Tin Tưởng Của Bạn Là Ưu Tiên Hàng Đầu"}
        actionText={isEn ? "View privacy details" : "Xem bảo mật"}
        actionHref="#chinh-sach"
        locale={locale}
      />
      <PolicySection
        mood={config.mood}
        policies={items}
        intro={
          locale === "en"
            ? "Concept structure — formal privacy review required before launch."
            : "Cấu trúc minh họa — cần được duyệt chính thức trước khi phát hành."
        }
      />
    </>
  );
}
