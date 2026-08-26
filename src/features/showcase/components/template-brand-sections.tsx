"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Instagram, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { ZaloIcon } from "@/shared/components/ui/zalo-icon";
import { publicContact } from "@/shared/lib/public-contact";

type Mood = "editorial" | "cinematic" | "organic";

type ContactChannel = {
  id: string;
  icon: typeof Phone | null;
  svg?: (className?: string) => React.ReactNode;
  label: { vi: string; en: string };
  value: string;
  subText: { vi: string; en: string };
  href: string;
};

const contactChannels: readonly ContactChannel[] = [
  {
    id: "fb",
    icon: null,
    svg: (className = "h-6 w-6") => (
      <svg className={`${className} fill-current`} viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    label: { vi: "Facebook", en: "Facebook" },
    value: publicContact.facebookDisplay,
    subText: { vi: "Fanpage chính thức", en: "Official Fanpage" },
    href: publicContact.facebookHref
  },
  {
    id: "mess",
    icon: null,
    svg: (className = "h-6 w-6") => (
      <svg className={`${className} fill-current`} viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.09.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.96 3.127 3.26 5.89-3.26-6.558 6.96z"/>
      </svg>
    ),
    label: { vi: "Messenger", en: "Messenger" },
    value: publicContact.messengerDisplay,
    subText: { vi: "Nhắn tin hỗ trợ", en: "Direct Messenger" },
    href: publicContact.messengerHref
  },
  {
    id: "insta",
    icon: Instagram,
    label: { vi: "Instagram", en: "Instagram" },
    value: publicContact.instagramDisplay,
    subText: { vi: "Nhật ký hình ảnh", en: "Visual Journal" },
    href: publicContact.instagramHref
  },
  {
    id: "zalo",
    icon: null,
    svg: (className = "h-6 w-6") => <ZaloIcon className={className} />,
    label: { vi: "Zalo", en: "Zalo" },
    value: publicContact.phoneDisplay,
    subText: { vi: "Tư vấn & Đặt phòng", en: "Support & Booking" },
    href: publicContact.zaloHref
  },
  {
    id: "tiktok",
    icon: null,
    svg: (className = "h-6 w-6") => (
      <svg className={`${className} fill-current`} viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    label: { vi: "TikTok", en: "TikTok" },
    value: publicContact.tiktokDisplay,
    subText: { vi: "Thước phim thung lũng", en: "Valley Stories" },
    href: publicContact.tiktokHref
  },
  {
    id: "phone",
    icon: Phone,
    label: { vi: "Điện thoại", en: "Hotline" },
    value: publicContact.phoneDisplay,
    subText: { vi: "Gọi trực tiếp 24/7", en: "24/7 Support Call" },
    href: publicContact.phoneHref
  },
  {
    id: "ggmaps",
    icon: MapPin,
    label: { vi: "Google Maps", en: "Google Maps" },
    value: "Dốc Dây Diều, Hà Nội",
    subText: { vi: "Chỉ đường tới LAKA", en: "Get Directions" },
    href: publicContact.googleMapsHref
  }
] as const;

const quote = "Một kỳ nghỉ tốt không cần quá nhiều thứ để làm. Chỉ cần đúng người, đúng không gian và đủ thời gian.";

const brandValues = {
  vi: [
    ["Tôn trọng Tự nhiên", "Trân trọng vẻ nguyên sơ của thung lũng, LAKA chọn cách hiện diện thật nhẹ nhàng giữa thiên nhiên. Từ thiết kế, vật liệu đến từng hoạt động, mọi lựa chọn đều được cân nhắc để giảm tác động lên môi trường và gìn giữ cảnh quan nơi đây bền vững theo thời gian."],
    ["Chữa lành Nguyên bản", "Một chốn an trú giữa thiên nhiên, nơi từng mảng xanh và mỗi khung kính đều mở ra khoảng lặng vừa đủ để những ngổn ngang dần lắng xuống, tâm trí được thảnh thơi và trở về với vẻ tinh khôi vốn có."],
    ["Kết nối Chân thật", "Kiến tạo những trải nghiệm đa dạng giữa thiên nhiên để thung lũng trở thành nơi kết nối mọi người, gọi về tiếng cười và lưu giữ những kỷ niệm đáng nhớ."],
    ["Chăm sóc Tận tâm", "Mỗi hành trình đều bắt đầu từ một mong muốn khác nhau. LAKA luôn lắng nghe để chuẩn bị những tiện ích, chương trình và cách đón tiếp vừa vặn, giúp mỗi người đều cảm thấy được thấu hiểu và chăm sóc."]
  ],
  en: [
    ["Respect for Nature", "LAKA values the valley's untouched beauty and chooses to exist gently within nature. Every decision, from design and materials to activities, is considered to reduce environmental impact and preserve the landscape over time."],
    ["Restoration to Self", "A refuge in nature where every patch of green and framed view creates enough stillness for a busy mind to settle, breathe and return to its clearest state."],
    ["Genuine Connection", "Experiences in nature are created to bring people closer, call laughter back and hold space for memories worth keeping."],
    ["Attentive Care", "Every journey begins with a different wish. LAKA listens, then prepares the right amenities, programme and welcome so each guest feels understood and cared for."]
  ]
} as const;

export function TemplateAboutStory({ mood, locale = "vi" }: { mood: Mood; locale?: ShowcaseLocale }) {
  if (mood === "cinematic") return <section className="reveal-section mx-auto w-[min(1500px,calc(100%-40px))] py-20 sm:py-28"><div className="grid gap-0 border-y border-white/12 lg:grid-cols-[1.08fr_.92fr]"><div className="relative min-h-[620px] overflow-hidden"><Image src={conceptImages.detail2} alt="Câu chuyện LAKA - ảnh minh họa" fill sizes="(max-width:1024px) 100vw, 58vw" className="object-cover opacity-72 transition duration-1000 hover:scale-[1.02] hover:opacity-100" /><div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" /><span className="absolute bottom-5 left-5 bg-black/55 px-3 py-1.5 text-[.58rem] font-bold uppercase tracking-wider text-white backdrop-blur">Frame 01 · minh họa</span></div><div className="flex flex-col justify-center border-t border-white/12 px-7 py-14 lg:border-l lg:border-t-0 lg:px-12"><p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#c7a882]">Manifesto · LAKA</p><blockquote className="mt-8 font-serif text-4xl font-medium leading-[1.14] tracking-[-.035em] sm:text-5xl">“{quote}”</blockquote><div className="mt-10 space-y-5 border-t border-white/12 pt-8 text-sm leading-7 text-white/52"><p>Mỗi căn được hình dung như một ngôi nhà thực sự: có bếp để nấu, hiên để ngồi và những khoảng trống vừa đủ để tâm trí được thảnh thơi.</p><p>LAKA ưu tiên sự riêng tư, vật liệu gần gũi và dịch vụ vừa đủ. Đội ngũ xuất hiện khi khách cần, rồi trả lại không gian cho kỳ nghỉ.</p></div></div></div><div className="grid border-b border-white/12 sm:grid-cols-3">{["Nhà nguyên căn", "Thiên nhiên thật gần", "Chăm sóc vừa đủ"].map((item, index) => <div key={item} className="border-b border-white/12 px-6 py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><span className="text-[.58rem] font-bold text-[#c7a882]">0{index + 1}</span><p className="mt-6 font-serif text-xl">{item}</p></div>)}</div></section>;

  if (mood === "organic") return <section className="reveal-section mx-auto w-[min(1380px,calc(100%-28px))] py-20 sm:py-28"><div className="grid gap-4 lg:grid-cols-12"><div className="relative min-h-[600px] overflow-hidden rounded-[44px] lg:col-span-7"><Image src={conceptImages.detail2} alt="Câu chuyện LAKA - ảnh minh họa" fill sizes="(max-width:1024px) 100vw, 58vw" className="object-cover transition duration-1000 hover:scale-[1.025]" /><span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-[.6rem] font-extrabold uppercase tracking-wider">Câu chuyện bằng hình · minh họa</span></div><div className="flex min-h-[360px] flex-col justify-between rounded-[44px] bg-[#f7cf58] p-8 lg:col-span-5"><Sparkles className="h-8 w-8" /><blockquote className="mt-16 text-3xl font-extrabold leading-[1.16] tracking-[-.035em] sm:text-4xl">“{quote}”</blockquote></div><article className="rounded-[38px] bg-white p-8 shadow-[0_18px_55px_rgba(33,72,61,.07)] lg:col-span-5"><p className="text-[.6rem] font-extrabold uppercase tracking-[.14em] text-[#e66e4c]">Một ngôi nhà thực sự</p><p className="mt-6 text-sm font-medium leading-7 text-[#16311c]/78">Có bếp để nấu, hiên để ngồi và những khoảng trống vừa đủ để mọi người sống cùng nhau mà không thấy chật.</p></article><article className="rounded-[38px] bg-[#16311c] p-8 text-white lg:col-span-7"><p className="text-[.6rem] font-extrabold uppercase tracking-[.14em] text-[#f7cf58]">Dịch vụ vừa đủ tinh tế</p><p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-white/58">Đội ngũ LAKA xuất hiện khi khách cần, rồi trả lại không gian cho cây, gió và những người đang ở cạnh nhau.</p></article></div></section>;

  const localizedQuote = locale === "en" ? "Choose a cabin. Hold the whole valley." : "“Chọn” Cabin, “Trọn” Thung Lũng";
  const chapters = locale === "en" ? [
    {
      kicker: "01 · The LAKA mark",
      title: "A symbol drawn from what appears beyond the window.",
      text: ["The LAKA logo is inspired by mountains, pine forest, cabins and a window frame.", "It is not an abstract symbol. It reflects the landscape guests will meet when they wake, draw the curtain and open the door: mountain ridges in cloud, pine trees moving in the wind and simple cabins reflected on the lake."],
      image: conceptImages.detail2
    },
    {
      kicker: "02 · The colours of the valley",
      title: "A palette gathered directly from nature.",
      text: ["LAKA's colours come from pine forest, tree-covered mountains and the natural lake.", "They carry a promise of sustainable, nature-aligned tourism and a lasting connection between people and the landscape."],
      image: conceptImages.forest
    },
    {
      kicker: "03 · Mission",
      title: "Preserve untouched beauty through every frame.",
      text: ["LAKA seeks to become a place where the truest connections can begin.", "Choose an open space. Hold every moment of connection."],
      image: conceptImages.table
    }
  ] : [
    {
      kicker: "01 · Dấu ấn LAKA",
      title: "Một biểu tượng được nhìn thấy qua khung cửa.",
      text: ["Logo của LAKA được lấy cảm hứng từ ngọn núi, rừng thông, cabin và khung cửa.", "Đó không chỉ là một biểu tượng được vẽ ra. Đó là khung cảnh bạn sẽ nhìn thấy khi thức dậy và mở cánh cửa: xa xa là những triền núi nối nhau trong mây, trước mắt là hàng thông xanh reo trong gió, bên dưới là những cabin mộc mạc phản chiếu trên mặt hồ."],
      image: conceptImages.detail2
    },
    {
      kicker: "02 · Màu của thung lũng",
      title: "Gam màu được gom nhặt từ chính thiên nhiên.",
      text: ["Là màu của rừng thông, của những dãy núi phủ kín cây và của hồ nước tự nhiên — món quà của tạo hóa.", "Hơn hết, đó là lời hứa về sự phát triển du lịch bền vững, thuận tự nhiên; về sự gắn kết bền chặt của con người và thiên nhiên."],
      image: conceptImages.forest
    },
    {
      kicker: "03 · Sứ mệnh",
      title: "Lưu giữ vẻ đẹp nguyên sơ qua từng khung kính.",
      text: ["Nơi khởi nguồn cho những kết nối chân thật nhất.", "LAKA — Chọn một không gian mở, Trọn phút giây gắn kết."],
      image: conceptImages.table
    }
  ];
  const localizedValues = brandValues[locale];

  const journalImages = [conceptImages.hero, conceptImages.hill, conceptImages.breakfast, conceptImages.cloud] as const;

  return (
    <section id="cau-chuyen" className="reveal-section scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto grid w-[min(1260px,calc(100%-40px))] gap-12 border-b border-[#16311c]/15 pb-20 lg:grid-cols-[.4fr_1fr] lg:items-start">
        <h2 className="laka-heading-section">{locale === "en" ? "Preface" : "Lời tựa"}</h2>
        <blockquote className="laka-section-lead">{localizedQuote}</blockquote>
      </div>

      <div className="mx-auto w-[min(1380px,calc(100%-40px))]">
        {chapters.map((chapter, index) => (
          <article key={chapter.kicker} className="grid border-b border-[#16311c]/15 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
            <div className={`group relative min-h-[58svh] overflow-hidden bg-[#d8cdbd] lg:min-h-[700px] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <Image src={chapter.image} alt={`${chapter.title} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition duration-1000 ease-out group-hover:scale-[1.025]" />
              <span className="absolute bottom-4 left-4 bg-[#16311c]/72 px-3 py-1.5 text-[.52rem] font-bold uppercase tracking-wider text-white backdrop-blur">{locale === "en" ? "Concept image" : "Hình ảnh minh họa"}</span>
            </div>
            <div className={`py-10 lg:px-16 lg:py-12 xl:px-24 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{chapter.kicker}</p>
              <h2 className="laka-heading-section mt-6">{chapter.title}</h2>
              <div className="mt-8 space-y-5 border-l border-[#80613f]/45 pl-6 text-sm leading-7 text-[#16311c]/68">
                {chapter.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-24 w-[min(1260px,calc(100%-40px))] border-y border-[#16311c]/15 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[.42fr_1fr] lg:items-start">
          <h2 className="laka-heading-section">{locale === "en" ? "Core values" : "Giá trị cốt lõi"}</h2>
          <p className="laka-section-lead">{locale === "en" ? "Four promises that shape how LAKA grows." : "Bốn lời hứa định hình cách LAKA lớn lên."}</p>
        </div>
        <div className="mt-14 grid border-t border-[#16311c]/15 md:grid-cols-2">
          {localizedValues.map(([title, text], index) => (
            <article key={title} className="border-b border-[#16311c]/15 py-9 md:px-8 md:[&:nth-child(odd)]:border-r lg:px-10">
              <span className="text-[.6rem] font-bold text-[#80613f]">0{index + 1}</span>
              <h3 className="laka-heading-card mt-6">{title}</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#16311c]/68">{text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 grid w-[min(1420px,calc(100%-40px))] grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {journalImages.map((image, index) => (
          <figure key={image} className={`relative overflow-hidden bg-[#d8cdbd] ${index % 2 === 0 ? "aspect-[3/4]" : "aspect-[3/4] lg:mt-20"}`}>
            <Image src={image} alt={`${locale === "en" ? "LAKA visual journal" : "Ký sự hình ảnh LAKA"} ${index + 1} — ${locale === "en" ? "concept" : "minh họa"}`} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover" />
          </figure>
        ))}
      </div>
    </section>
  );
}

export function TemplateContactChannels({ mood, locale = "vi" }: { mood: Mood; locale?: ShowcaseLocale }) {
  const localizedChannels = contactChannels.map((channel) => ({
    ...channel,
    label: channel.label[locale],
    subText: channel.subText[locale]
  }));

  return (
    <section className="reveal-section py-16 sm:py-24">
      {/* Desktop Layout: 7 artistic balanced columns on horizontal row */}
      <div className="hidden mx-auto w-[min(1440px,calc(100%-40px))] lg:block">
        <div className="grid grid-cols-7 border-y border-[#16311c]/15 divide-x divide-[#16311c]/15 bg-[#eae1d2]/40">
          {localizedChannels.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex min-h-[280px] flex-col justify-between p-6 transition duration-300 hover:bg-[#16311c] hover:text-white"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[.55rem] font-bold text-[#80613f] group-hover:text-[#c7a882]">0{index + 1}</span>
                    {IconComponent ? (
                      <IconComponent className="h-5 w-5 text-[#80613f] group-hover:text-[#c7a882]" />
                    ) : (
                      item.svg?.("h-5 w-5 text-[#80613f] group-hover:text-[#c7a882]")
                    )}
                  </div>
                  <p className="mt-8 text-[.55rem] font-bold uppercase tracking-[.18em] opacity-75">{item.label}</p>
                  <p className="mt-1.5 break-words font-sans text-sm font-bold leading-snug">{item.value}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-current/15 pt-3">
                  <span className="text-[.55rem] opacity-60">{item.subText}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Mobile Layout: Horizontal Scroll Deck */}
      <div className="lg:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 scrollbar-hide">
          {localizedChannels.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="group relative flex min-h-[240px] w-[85vw] max-w-[320px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-md border border-[#16311c]/20 bg-[#16311c] p-7 text-white shadow-xl transition active:scale-[0.98]"
              >
                <div className="relative z-10">
                  <span className="text-[.75rem] font-bold uppercase tracking-[.2em] text-[#c7a882]">
                    0{index + 1} · {item.label}
                  </span>
                  <strong className="mt-4 block break-words font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                    {item.value}
                  </strong>
                  <p className="mt-3 text-[13px] opacity-80">{item.subText}</p>
                </div>
                
                <div className="relative z-10 mt-12 flex items-end justify-between">
                  <span className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold transition">
                    {locale === "en" ? "Connect" : "Kết nối"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* Platform Icon at bottom right */}
                <div className="absolute -bottom-4 -right-4 z-0 opacity-15">
                  {IconComponent ? (
                    <IconComponent className="h-36 w-36" />
                  ) : (
                    item.svg?.("h-36 w-36")
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
