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
    [
      "Tôn trọng Tự nhiên",
      "Trân trọng vẻ nguyên sơ của thung lũng, LAKA chọn cách hiện diện thật nhẹ nhàng giữa thiên nhiên. Mọi lựa chọn đều được cân nhắc để giảm tác động lên môi trường và gìn giữ cảnh quan nơi đây bền vững theo thời gian."
    ],
    [
      "Chữa lành Nguyên bản",
      "Một chốn an trú giữa thiên nhiên. Nơi từng mảng xanh và mỗi khung kính đều mở ra khoảng lặng vừa đủ để những ngổn ngang dần lắng xuống, tâm trí được thảnh thơi và trở về với vẻ tinh khôi vốn có."
    ],
    [
      "Kết nối Chân thật",
      "Kiến tạo những trải nghiệm đa dạng giữa thiên nhiên, từ chèo kayak, chơi pickleball đến những bữa BBQ quây quần, để thung lũng trở thành nơi kết nối mọi người, gọi về tiếng cười và lưu giữ những kỷ niệm đáng nhớ."
    ],
    [
      "Chăm sóc Tận tâm",
      "Mỗi hành trình đều bắt đầu từ một mong muốn khác nhau. LAKA luôn lắng nghe để sẵn sàng đón tiếp vừa vặn, giúp mỗi khách hàng đều cảm thấy được thấu hiểu và chăm sóc."
    ]
  ],
  en: [
    [
      "Respect for Nature",
      "Cherishing the untouched beauty of the valley, LAKA chooses to exist gently within nature. Every choice is carefully considered to minimize environmental impact and preserve this landscape sustainably over time."
    ],
    [
      "Original Healing",
      "A sanctuary nestled in nature. Where every patch of greenery and each window frame opens up enough quiet space for daily chaos to settle, leaving the mind peaceful and restored to its natural purity."
    ],
    [
      "Genuine Connection",
      "Creating diverse experiences in nature — from kayaking and pickleball to cozy BBQ gatherings — making the valley a place that connects people, sparks laughter, and preserves cherished memories."
    ],
    [
      "Attentive Care",
      "Every journey begins with a different wish. LAKA always listens to welcome you with just the right touch, ensuring every guest feels truly understood and cared for."
    ]
  ]
} as const;

type PillarItem = {
  number: string;
  title: string;
  image: string;
  paragraphs?: readonly string[];
  intro?: string;
  bulletPoints?: readonly string[];
};

const brandIdentityPillars: Record<ShowcaseLocale, readonly PillarItem[]> = {
  vi: [
    {
      number: "1",
      title: "Biểu Tượng Xanh",
      image: conceptImages.detail2,
      paragraphs: [
        "Logo của LaKa được lấy cảm hứng từ: ngọn núi, rừng thông, cabin và khung cửa.",
        "Đó là khung cảnh thật, là điều chúng ta sẽ nhìn thấy khi thức dậy, kéo nhẹ tấm rèm và mở cánh cửa của bất kỳ căn phòng nào tại LaKa.",
        "Xa xa là những triền núi nối nhau trong mây, ngay trước mắt là những hàng thông xanh reo trong gió, bên dưới là những cabin mộc mạc phản chiếu trên mặt hồ."
      ]
    },
    {
      number: "2",
      title: "Xanh Nguyên Bản",
      image: conceptImages.forest,
      intro: "Gam màu của LaKa cũng được gom nhặt từ chính thiên nhiên:",
      bulletPoints: [
        "Màu của rừng thông.",
        "Màu của những dãy núi phủ kín cây.",
        "Màu của hồ nước tự nhiên",
        "Màu món quà của tạo hóa."
      ]
    },
    {
      number: "3",
      title: "Gắn Kết Xanh",
      image: conceptImages.table,
      paragraphs: [
        "Hơn hết, đó là lời hứa về sự phát triển du lịch bền vững, thuận tự nhiên.",
        "Là lời hứa về sự gắn kết bền chặt của con người và thiên nhiên.",
        "Là màu của sự chữa lành, giúp những tâm trí ngổn ngang được quay trở về với trạng thái nguyên bản, tinh khôi và toàn vẹn nhất."
      ]
    }
  ],
  en: [
    {
      number: "1",
      title: "Green Symbol",
      image: conceptImages.detail2,
      paragraphs: [
        "The LAKA logo is inspired by: mountains, pine forest, cabins, and window frames.",
        "It is the real scenery we see when waking up, gently drawing back the curtains, and opening the door of any room at LAKA.",
        "In the distance are mountain ridges connecting in the clouds, right before our eyes are green pine trees swaying in the breeze, and below are rustic cabins reflected on the lake surface."
      ]
    },
    {
      number: "2",
      title: "Original Green",
      image: conceptImages.forest,
      intro: "LAKA's color palette is gathered directly from nature itself:",
      bulletPoints: [
        "The color of pine forests.",
        "The color of tree-covered mountain ridges.",
        "The color of natural lake water",
        "The color of gifts from Mother Nature."
      ]
    },
    {
      number: "3",
      title: "Green Connection",
      image: conceptImages.table,
      paragraphs: [
        "Above all, it is a promise of sustainable, nature-aligned tourism development.",
        "It is a promise of a lasting bond between humanity and nature.",
        "It is the color of healing, guiding overwhelmed minds back to their most original, pure, and complete state."
      ]
    }
  ]
};

const missionStatement = {
  vi: {
    kicker: "Sứ Mệnh",
    quote: "Lưu giữ vẻ đẹp nguyên sơ qua từng khung kính, nơi khởi nguồn cho những kết nối chân thật nhất",
    tagline: "LAKA — Chọn một không gian mở, Trọn phút giây gắn kết."
  },
  en: {
    kicker: "Our Mission",
    quote: "Preserving untouched beauty through every pane of glass — the wellspring of genuine connections",
    tagline: "LAKA — Choose an open space, embrace every moment of connection."
  }
} as const;

export function TemplateAboutStory({ mood = "editorial", locale = "vi" }: { mood?: Mood; locale?: ShowcaseLocale }) {
  const pillars = brandIdentityPillars[locale];
  const localizedValues = brandValues[locale];
  const mission = missionStatement[locale];

  return (
    <div id="cau-chuyen" className="scroll-mt-24">
      {/* ========================================================================= */}
      {/* 1. SECTION: Dấu ấn LaKa (3-Column Layout: Image -> 1. 2. 3 -> Content)    */}
      {/* ========================================================================= */}
      <section className="reveal-section py-16 sm:py-24">
        {/* Section Header */}
        <div className="mx-auto w-[min(1380px,calc(100%-40px))] border-b border-[#16311c]/15 pb-8 mb-12 sm:mb-16">
          <p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#80613f]">
            {locale === "en" ? "Brand Identity · The LAKA Mark" : "Bản Sắc & Biểu Tượng"}
          </p>
          <h2 className="laka-heading-section mt-3 text-3xl sm:text-4xl lg:text-5xl">
            {locale === "en" ? "The LAKA Mark" : "Dấu ấn LaKa"}
          </h2>
        </div>

        {/* 3 Columns: Image -> 1. 2. 3 -> Text */}
        <div className="mx-auto grid w-[min(1380px,calc(100%-40px))] gap-8 sm:gap-10 lg:grid-cols-3">
          {pillars.map((item) => (
            <article
              key={item.number}
              className="group flex flex-col justify-between border-b border-[#16311c]/15 pb-10 lg:border-b-0 lg:border-r lg:border-[#16311c]/15 lg:pb-0 lg:pr-8 lg:last:border-r-0 lg:last:pr-0"
            >
              <div>
                {/* 1. Image on top */}
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-[#d8cdbd] shadow-md transition duration-700 group-hover:shadow-xl">
                  <Image
                    src={item.image}
                    alt={`${item.number}. ${item.title} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-1000 ease-out group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-[#16311c]/75 px-3 py-1 text-[.52rem] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {locale === "en" ? `Pillar 0${item.number}` : `Dấu ấn 0${item.number}`}
                  </span>
                </div>

                {/* 2. Number & Title: 1. Biểu Tượng Xanh */}
                <div className="mt-8 flex items-baseline gap-3">
                  <span className="font-serif text-2xl sm:text-3xl font-light text-[#80613f]">
                    0{item.number}.
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#16311c]">
                    {item.title}
                  </h3>
                </div>

                {/* 3. Text content / Chú thích bên dưới */}
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#16311c]/75">
                  {item.paragraphs?.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}

                  {item.intro && (
                    <p className="font-medium text-[#16311c]/90">{item.intro}</p>
                  )}

                  {item.bulletPoints && (
                    <ul className="space-y-2.5 pl-1">
                      {item.bulletPoints.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2.5 font-medium text-[#16311c]/85">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#80613f]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION: Sứ Mệnh (Manifesto / Spotlight Block)                          */}
      {/* ========================================================================= */}
      <section id="su-menh" className="reveal-section scroll-mt-24 py-10 sm:py-16">
        <div className="mx-auto w-[min(1380px,calc(100%-40px))]">
          <div className="relative overflow-hidden rounded-3xl bg-[#16311c] px-8 py-14 sm:px-14 sm:py-20 text-white shadow-2xl">
            {/* Subtle decorative glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#224b2b,transparent_65%)] opacity-70 pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[.6rem] font-bold uppercase tracking-[.22em] text-[#c7a882] backdrop-blur-md">
                {mission.kicker}
              </span>
              <blockquote className="mt-8 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] font-medium leading-[1.35] tracking-[-.02em] text-[#f4efe8]">
                “{mission.quote}”
              </blockquote>
              <div className="mx-auto my-7 h-px w-24 bg-[#c7a882]/40" />
              <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#c7a882]">
                {mission.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION: Giá Trị Cốt Lõi (Core Values Grid)                            */}
      {/* ========================================================================= */}
      <section id="gia-tri-cot-loi" className="reveal-section scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto w-[min(1380px,calc(100%-40px))] border-t border-[#16311c]/15 pt-16">
          <div className="grid gap-6 lg:grid-cols-[.38fr_1fr] lg:items-start">
            <div>
              <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">
                {locale === "en" ? "Operating Philosophy" : "Triết Lý Hoạt Động"}
              </p>
              <h2 className="laka-heading-section mt-3 text-3xl sm:text-4xl">
                {locale === "en" ? "Core Values" : "Giá Trị Cốt Lõi"}
              </h2>
            </div>
            <p className="laka-section-lead text-[#16311c]/75">
              {locale === "en"
                ? "Four promises that guide every step of how LAKA nurtures space and welcomes people."
                : "Bốn lời hứa định hình cách LAKA hiện diện, giữ gìn thung lũng và đồng hành cùng mỗi kỳ nghỉ."}
            </p>
          </div>

          <div className="mt-12 grid border-t border-[#16311c]/15 sm:grid-cols-2 lg:grid-cols-2">
            {localizedValues.map(([title, text], index) => (
              <article
                key={title}
                className="group border-b border-[#16311c]/15 py-10 sm:px-8 sm:[&:nth-child(odd)]:border-r lg:px-12 transition hover:bg-[#16311c]/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif text-lg font-bold text-[#80613f]">0{index + 1}</span>
                  <div className="h-px flex-1 bg-[#16311c]/10" />
                </div>
                <h3 className="mt-6 text-xl sm:text-2xl font-bold tracking-tight text-[#16311c]">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#16311c]/72">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
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
