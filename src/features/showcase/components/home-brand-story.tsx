"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Heart, Mountain, Sparkles, Trees, UtensilsCrossed } from "lucide-react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

interface MissionStory {
  id: string;
  image: string;
  imageAlt: Record<ShowcaseLocale, string>;
  title: Record<ShowcaseLocale, string>;
  description: Record<ShowcaseLocale, string>;
  icons: Array<{
    icon: typeof Mountain;
    label: Record<ShowcaseLocale, string>;
  }>;
}

const missionStories: MissionStory[] = [
  {
    id: "untouched-nature",
    image: conceptImages.detail1,
    imageAlt: {
      vi: "Khung kính nhìn ra thiên nhiên tại LAKA — ảnh minh họa",
      en: "A window looking out to nature at LAKA — concept image"
    },
    title: {
      vi: "LƯU GIỮ VẺ ĐẸP NGUYÊN SƠ",
      en: "PRESERVING UNTOUCHED BEAUTY"
    },
    description: {
      vi: "Lưu giữ vẻ đẹp nguyên sơ qua từng khung kính, nơi khởi nguồn cho những kết nối chân thật nhất. Tại LaKa, mỗi cabin là một góc nhìn để bạn chạm gần hơn vào thiên nhiên.",
      en: "Preserving untouched beauty through every window, where the truest connections begin. At LaKa, every cabin is a view that brings you closer to nature."
    },
    icons: [
      {
        icon: Mountain,
        label: { vi: "Thiên nhiên", en: "Nature" }
      },
      {
        icon: UtensilsCrossed,
        label: { vi: "Ẩm thực", en: "Dining" }
      },
      {
        icon: Sparkles,
        label: { vi: "An yên", en: "Serenity" }
      }
    ]
  },
  {
    id: "true-connection",
    image: conceptImages.forest,
    imageAlt: {
      vi: "Khoảnh khắc bình yên giữa rừng thông — ảnh minh họa",
      en: "Peaceful moments amidst the pine forest — concept image"
    },
    title: {
      vi: "KHỞI NGUỒN KẾT NỐI CHÂN THẬT",
      en: "WHERE TRUE CONNECTIONS BEGIN"
    },
    description: {
      vi: "Rời xa nhịp sống hối hả để trở về với sự tĩnh lặng. Cùng người thân sẻ chia những khoảnh khắc ấm áp bên hiên nhà hay bên tách trà chiều ngắm thung lũng.",
      en: "Step away from the rush to return to quietude. Share warm moments with loved ones on the porch or over afternoon tea overlooking the valley."
    },
    icons: [
      {
        icon: Trees,
        label: { vi: "Rừng thông", en: "Pine Forest" }
      },
      {
        icon: Coffee,
        label: { vi: "Trà chiều", en: "Teatime" }
      },
      {
        icon: Heart,
        label: { vi: "Gắn kết", en: "Connection" }
      }
    ]
  },
  {
    id: "private-haven",
    image: conceptImages.table,
    imageAlt: {
      vi: "Không gian mở chan hòa ánh sáng tại LAKA — ảnh minh họa",
      en: "Open sunlit space at LAKA — concept image"
    },
    title: {
      vi: "MỖI CABIN MỘT KHOẢNG TRỜI",
      en: "EVERY CABIN A WHOLE HORIZON"
    },
    description: {
      vi: "Không gian mở chan hòa ánh sáng và cây cỏ, mang lại trải nghiệm nghỉ dưỡng riêng tư trọn vẹn giữa lòng thung lũng Trung Giã, Sóc Sơn.",
      en: "Open spaces flooded with light and greenery, offering a truly private retreat in the heart of Trung Gia valley, Soc Son."
    },
    icons: [
      {
        icon: Mountain,
        label: { vi: "Thung lũng", en: "Valley" }
      },
      {
        icon: Coffee,
        label: { vi: "Thảnh thơi", en: "Relaxation" }
      },
      {
        icon: Sparkles,
        label: { vi: "Riêng tư", en: "Privacy" }
      }
    ]
  }
];

export function HomeBrandStory({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const en = locale === "en";
  const [activeSlide, setActiveSlide] = useState(0);
  const current = missionStories[activeSlide];

  return (
    <section id="gioi-thieu" className="scroll-mt-20 bg-[#eae1d2] pb-16 pt-0 relative overflow-hidden">
      {/* Top Banner with angled diagonal bottom cut */}
      <div
        className="relative bg-[#1d5761] pt-14 pb-24 sm:pt-16 sm:pb-32 text-white text-center px-4 overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 82%, 0 100%)"
        }}
      >
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2b7782,transparent_70%)] opacity-60" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="block font-serif italic text-xl sm:text-2xl text-[#a2ded7] tracking-wide mb-1">
            {en ? "Our Mission" : "Sứ mệnh"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-[0.22em] text-white">
            {en ? "LAKA MISSION" : "SỨ MỆNH LAKA"}
          </h2>
        </div>
      </div>

      {/* Main Mission Card - Floating Center */}
      <div className="relative z-10 -mt-16 sm:-mt-20 mx-auto w-[min(580px,calc(100%-32px))]">
        <article className="bg-white rounded-xl shadow-[0_15px_40px_rgba(29,87,97,0.12)] border border-[#1d5761]/10 overflow-hidden transition-all duration-300">
          {/* Top Landscape Image */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-[#e0d6c7]">
            <Image
              src={current.image}
              alt={current.imageAlt[locale]}
              fill
              sizes="(max-width: 640px) 100vw, 580px"
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority={activeSlide === 0}
            />
          </div>

          {/* Card Content */}
          <div className="px-6 py-7 sm:px-10 sm:py-9 text-center">
            <h3 className="text-[#1d5761] font-bold text-sm sm:text-base tracking-[0.14em] uppercase mb-3 sm:mb-4">
              {current.title[locale]}
            </h3>
            <p className="text-[#2b443c] text-sm sm:text-[0.9375rem] leading-relaxed max-w-md mx-auto min-h-[4.5rem]">
              {current.description[locale]}
            </p>

            {/* Separator Line */}
            <div className="w-full h-px bg-[#1d5761]/12 my-6 sm:my-7" />

            {/* 3 Line Icons */}
            <div className="flex items-center justify-center gap-10 sm:gap-14 text-[#1d5761]">
              {current.icons.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5 group">
                    <span className="p-2 rounded-full text-[#1d5761] bg-[#1d5761]/5 group-hover:bg-[#1d5761]/10 transition-colors">
                      <IconComponent className="h-6 w-6 stroke-[1.5]" />
                    </span>
                    <span className="text-[0.6875rem] font-semibold text-[#1d5761]/80 tracking-wider uppercase">
                      {item.label[locale]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </article>

        {/* Carousel Pagination Dots */}
        <div className="mt-8 flex items-center justify-center gap-2.5" role="tablist" aria-label={en ? "Mission slides" : "Các câu chuyện sứ mệnh"}>
          {missionStories.map((story, index) => {
            const isActive = activeSlide === index;
            return (
              <button
                key={story.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSlide(index)}
                aria-label={`${en ? "View slide" : "Xem slide"} ${index + 1}`}
                className={`transition-all duration-300 rounded-full focus-ring ${
                  isActive
                    ? "w-2.5 h-2.5 bg-[#1d5761] ring-4 ring-[#1d5761]/25 scale-110"
                    : "w-2 h-2 bg-[#1d5761]/35 hover:bg-[#1d5761]/70"
                }`}
              />
            );
          })}
        </div>

        {/* Call to Action Button */}
        <div className="mt-7 flex justify-center">
          <Link
            href={`${basePath}/ve-laka`}
            className="focus-ring inline-flex items-center justify-center border-2 border-[#1d5761] text-[#1d5761] hover:bg-[#1d5761] hover:text-white transition-all px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] rounded-sm shadow-sm"
          >
            {en ? "Read the full story" : "Đọc trọn câu chuyện"}
          </Link>
        </div>
      </div>

      {/* Bottom Mountain Line Silhouette Motif */}
      <div className="mt-12 flex justify-center opacity-25 pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 400 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-72 sm:w-96 h-10 stroke-[#1d5761]"
          strokeWidth="1.2"
        >
          <path d="M10 50 L60 20 L110 50 M90 50 L140 10 L190 50 M170 50 L220 25 L270 50 M250 50 L300 15 L350 50 M330 50 L370 28 L390 50" />
        </svg>
      </div>
    </section>
  );
}
