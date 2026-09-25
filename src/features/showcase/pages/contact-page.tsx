import { PageBannerHero } from "@/features/showcase/components/page-banner-hero";
import { ContactInquiryForm } from "@/features/showcase/components/contact-inquiry-form";
import { ContactChannels } from "@/features/showcase/components/brand-sections";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { conceptImages } from "@/features/stays/data/stay-catalog";
import { publicContact } from "@/shared/lib/public-contact";
import { type SiteConfig } from "@/features/showcase/site/site-types";

export function ContactPage({ config, locale }: { config: SiteConfig; locale: ShowcaseLocale }) {
  const isEn = locale === "en";
  return (
    <>
      <PageBannerHero
        bgImage={conceptImages.cloud}
        pill={isEn ? "Talk to LAKA" : "Trò Chuyện Cùng LAKA"}
        title={isEn ? "LaKa - Contact" : "LaKa - Liên Hệ"}
        subtitle={isEn ? "We are always ready to listen" : "Chúng mình luôn sẵn sàng lắng nghe"}
        description={
          isEn
            ? "Get in touch to learn more about the place, follow its journey or share what you hope to find at LAKA."
            : "Kết nối để hiểu thêm về nơi này, theo dõi hành trình hoàn thiện hoặc chia sẻ điều bạn mong được tìm thấy tại LAKA."
        }
        cardImage={conceptImages.cloud}
        cardBadge="LAKA · Contact"
        cardAlt={isEn ? "Contact LAKA" : "Liên hệ LAKA"}
        brandTagTop="Connect &"
        brandTagBottom="Inquiry."
        dateStamp={
          isEn
            ? `Hotline: ${publicContact.phoneDisplay} · Zalo · Messenger`
            : `Hotline: ${publicContact.phoneDisplay} · Zalo · Messenger`
        }
        subTag={isEn ? "Prompt & Thoughtful Response" : "Phản Hồi Nhanh Chóng & Tận Tâm"}
        actionText={isEn ? "Send a message" : "Gửi lời nhắn"}
        actionHref="#inquiry-form"
        locale={locale}
      />
      <ContactChannels mood={config.mood} locale={locale} />
      <ContactInquiryForm locale={locale} />
    </>
  );
}
