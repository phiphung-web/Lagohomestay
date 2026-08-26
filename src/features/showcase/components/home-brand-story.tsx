import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mountain, Sparkles, UtensilsCrossed } from "lucide-react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const missionData = {
  title: {
    vi: "Sứ mệnh",
    en: "Our Mission"
  },
  content: {
    vi: "Lưu giữ vẻ đẹp nguyên sơ qua từng khung kính, nơi khởi nguồn cho những kết nối chân thật nhất.",
    en: "Preserving untouched beauty through every window, where the truest connections begin."
  },
  pillars: [
    {
      icon: Mountain,
      title: { vi: "Thiên nhiên", en: "Nature" }
    },
    {
      icon: UtensilsCrossed,
      title: { vi: "Ẩm thực", en: "Dining" }
    },
    {
      icon: Sparkles,
      title: { vi: "An yên", en: "Serenity" }
    }
  ]
} as const;

export function HomeBrandStory({ basePath, locale = "vi" }: { basePath: string; locale?: ShowcaseLocale }) {
  const en = locale === "en";

  return (
    <section id="gioi-thieu" className="laka-home-gradient-story relative scroll-mt-20 overflow-hidden">
      {/* ========================================================
          1. MOBILE LAYOUT
          ======================================================== */}
      <div className="block lg:hidden pb-12 pt-0">
        {/* Top Banner with Angled Bottom Cut in LAKA Deep Forest Green */}
        <div
          className="relative bg-[#10251d] pt-12 pb-24 text-white text-center px-4 overflow-hidden"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 82%, 0 100%)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f4838,transparent_70%)] opacity-50" />
          <div className="relative z-10 mx-auto max-w-md">
            <h2 className="text-2xl font-extrabold uppercase tracking-[0.2em] text-white">
              {missionData.title[locale]}
            </h2>
          </div>
        </div>

        {/* Floating Center Card */}
        <div className="relative z-10 -mt-16 mx-auto w-[min(540px,calc(100%-32px))]">
          <article className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(16,37,29,0.12)] border border-[#16311c]/10 overflow-hidden">
            {/* Top Photo */}
            <div className="relative h-56 w-full overflow-hidden bg-[#e0d6c7]">
              <Image
                src={conceptImages.detail1}
                alt={en ? "A window looking out to nature at LAKA — concept image" : "Khung kính nhìn ra thiên nhiên tại LAKA — ảnh minh họa"}
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                className="object-cover"
                priority
              />
            </div>

            {/* Card Content */}
            <div className="px-6 py-7 text-center">
              <p className="font-serif text-base sm:text-lg text-[#16311c] font-medium leading-relaxed max-w-md mx-auto">
                “{missionData.content[locale]}”
              </p>

              {/* Separator */}
              <div className="w-full h-px bg-[#16311c]/12 my-6" />

              {/* 3 Minimalist Icons */}
              <div className="flex items-center justify-center gap-10 text-[#16311c]">
                {missionData.pillars.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      <span className="p-2.5 rounded-full text-[#16311c] bg-[#16311c]/5">
                        <Icon className="h-5 w-5 stroke-[1.6]" />
                      </span>
                      <span className="text-xs font-bold text-[#16311c]/80 tracking-wider uppercase">
                        {item.title[locale]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          {/* Secondary editorial CTA, shared with the desktop homepage sections */}
          <div className="mt-7 flex justify-start">
            <Link
              href={`${basePath}/ve-laka`}
              className="focus-ring group inline-flex min-h-12 items-center gap-3 border-b-2 border-[#16311c] pb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#16311c] transition-all hover:border-[#80613f] hover:text-[#80613f]"
            >
              {en ? "Read the full story" : "Đọc trọn câu chuyện"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. DESKTOP LAYOUT (Creative Editorial Split)
          ======================================================== */}
      <div className="hidden lg:block laka-section-normal px-8 lg:px-12">
        <div className="mx-auto w-[min(1380px,100%)]">
          {/* Main 2-Column Creative Editorial Showcase */}
          <div className="grid grid-cols-[1.08fr_.92fr] gap-12 xl:gap-16 items-center">
            {/* Left Column: Layered Photography Frame */}
            <div className="relative">
              {/* Main Photo Frame with matching border-4 border-[#eae1d2] */}
              <div className="relative aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl bg-[#10251d] border-4 border-[#eae1d2] group">
                <Image
                  src={conceptImages.detail1}
                  alt={en ? "A window looking out to nature at LAKA — concept image" : "Khung kính nhìn ra thiên nhiên tại LAKA — ảnh minh họa"}
                  fill
                  sizes="50vw"
                  className="object-cover transition duration-1000 ease-out group-hover:scale-105"
                  priority
                />
              </div>

              {/* Overlapping Floating Inset Card */}
              <div className="absolute -bottom-6 -right-6 w-44 xl:w-52 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#eae1d2] bg-[#10251d]">
                <Image
                  src={conceptImages.forest}
                  alt={en ? "Pine forest at LAKA — concept image" : "Rừng thông tại LAKA — ảnh minh họa"}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 text-[0.6rem] font-bold uppercase tracking-wider text-white/90">
                  {en ? "Trung Gia · Hanoi" : "Trung Giã · Sóc Sơn"}
                </span>
              </div>
            </div>

            {/* Right Column: Title, Mission Content & Pillars */}
            <div className="xl:pl-4">
              <h2 className="laka-home-section-title text-[#16311c] mb-6 xl:mb-8">
                {missionData.title[locale]}
              </h2>

              <blockquote className="font-serif text-2xl xl:text-3xl font-medium text-[#16311c] leading-relaxed border-l-4 border-[#80613f] pl-6 my-6">
                “{missionData.content[locale]}”
              </blockquote>

              {/* 3 Pillars Grid */}
              <div className="grid grid-cols-3 gap-4 border-y border-[#16311c]/14 py-6 my-8">
                {missionData.pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={idx} className="flex flex-col items-start gap-2">
                      <span className="p-2.5 rounded-xl bg-[#16311c]/8 text-[#16311c]">
                        <Icon className="h-5 w-5 stroke-[1.6]" />
                      </span>
                      <h4 className="font-bold text-sm text-[#16311c]">
                        {pillar.title[locale]}
                      </h4>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <Link
                href={`${basePath}/ve-laka`}
                className="focus-ring group inline-flex min-h-12 items-center gap-3 border-b-2 border-[#16311c] pb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#16311c] hover:text-[#80613f] hover:border-[#80613f] transition-all"
              >
                {en ? "Read the full story" : "Đọc trọn câu chuyện"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
