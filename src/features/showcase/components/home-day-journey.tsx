"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { conceptImages } from "@/features/stays/data/demo-data";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const scenes = [
  {
    id: "binh-minh",
    time: { vi: "06:12", en: "06:12" },
    label: { vi: "Bình minh", en: "First light" },
    title: { vi: "Ngày bắt đầu trước khi mọi người vội.", en: "The day begins before anyone needs to rush." },
    text: {
      vi: "Mở cửa, để ánh sáng đi vào căn nhà trước. Một bình trà, mặt nước còn yên và khoảng thời gian chưa cần gọi tên.",
      en: "Open the door and let the light arrive first. Tea, still water and a stretch of time that needs no name yet."
    },
    image: conceptImages.hero,
    position: "object-[58%_center]"
  },
  {
    id: "buoi-trua",
    time: { vi: "11:40", en: "11:40" },
    label: { vi: "Bên bàn ăn", en: "Around the table" },
    title: { vi: "Bữa trưa chỉ kết thúc khi câu chuyện đã vơi.", en: "Lunch ends only when the conversation does." },
    text: {
      vi: "Món theo mùa được đặt giữa bàn để sẻ chia. Không cần cầu kỳ, chỉ cần mọi người thực sự có mặt.",
      en: "Seasonal dishes sit at the centre for everyone to share. Nothing elaborate, only everyone fully present."
    },
    image: conceptImages.table,
    position: "object-center"
  },
  {
    id: "buoi-chieu",
    time: { vi: "16:25", en: "16:25" },
    label: { vi: "Đi theo cảm hứng", en: "Follow curiosity" },
    title: { vi: "Có những buổi chiều không cần kế hoạch.", en: "Some afternoons need no plan." },
    text: {
      vi: "Đi bộ dưới tán cây, xuống hồ hay dừng lại ở một khoảng cỏ. Hành trình vừa đủ để cơ thể chuyển động và tâm trí chậm lại.",
      en: "Walk beneath the canopy, head towards the water or pause on the lawn. Enough movement for the mind to slow down."
    },
    image: conceptImages.experience,
    position: "object-center"
  },
  {
    id: "dem-xuong",
    time: { vi: "20:08", en: "20:08" },
    label: { vi: "Khi đêm xuống", en: "After dark" },
    title: { vi: "Đêm yên cũng là một trải nghiệm.", en: "Quiet can be the final experience of the day." },
    text: {
      vi: "Ánh đèn được hạ thấp, cuộc trò chuyện cũng nhỏ lại. Để tiếng cây, tiếng gió và những người bên cạnh trở thành điều còn nhớ.",
      en: "The lights soften and so do the voices. Trees, wind and the people beside you become what remains."
    },
    image: conceptImages.detail2,
    position: "object-center"
  }
] as const;

export function HomeDayJourney({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const nextIndex = Number((visible.target as HTMLElement).dataset.sceneIndex);
        if (!Number.isNaN(nextIndex)) setActiveIndex(nextIndex);
      },
      { rootMargin: "-22% 0px -48% 0px", threshold: [0.1, 0.3, 0.55] }
    );

    sceneRefs.current.forEach((scene) => scene && observer.observe(scene));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (index: number) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sceneRefs.current[index]?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  };

  return (
    <section id="mot-ngay" className="bg-[#0b1d16] text-white">
      <div className="border-b border-white/12 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid w-[min(1380px,100%)] gap-10 lg:grid-cols-[.36fr_1fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">
              {locale === "en" ? "The heart of the story" : "Chương chính của câu chuyện"}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/52">
              {locale === "en"
                ? "Four moments, connected by the freedom to let the day unfold naturally."
                : "Bốn khoảnh khắc, được nối với nhau bằng sự tự do để một ngày diễn ra thật tự nhiên."}
            </p>
          </div>
          <h2 className="max-w-5xl font-serif text-[clamp(3.6rem,8vw,7.8rem)] font-medium leading-[.9] tracking-[-.06em]">
            {locale === "en" ? <>Live one day<br /><i className="text-[#dfc6a5]">before choosing a home.</i></> : <>Thử sống một ngày<br /><i className="text-[#dfc6a5]">trước khi chọn một căn nhà.</i></>}
          </h2>
        </div>
      </div>

      <div className="mx-auto grid w-[min(1500px,100%)] lg:grid-cols-[300px_1fr]">
        <aside className="sticky top-[92px] z-20 self-start overflow-x-auto border-b border-white/12 bg-[#0b1d16]/94 px-5 py-4 backdrop-blur lg:flex lg:h-[calc(100svh-92px)] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:px-8 lg:py-12">
          <p className="hidden text-[.58rem] font-bold uppercase tracking-[.2em] text-white/35 lg:block">
            {locale === "en" ? "A day at LAKA" : "Một ngày tại LAKA"}
          </p>
          <div className="flex min-w-max gap-2 lg:mt-10 lg:min-w-0 lg:flex-col lg:gap-0">
            {scenes.map((scene, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => jumpTo(index)}
                  aria-current={active ? "step" : undefined}
                  className={`focus-ring group flex min-h-12 items-center gap-3 rounded-full border px-4 text-left transition lg:min-h-20 lg:rounded-none lg:border-x-0 lg:border-b-0 lg:border-t lg:px-0 ${
                    active
                      ? "border-[#dfc6a5]/60 bg-[#dfc6a5] text-[#10251d] lg:bg-transparent lg:text-white"
                      : "border-white/14 text-white/46 hover:text-white lg:border-white/12"
                  }`}
                >
                  <span className={`text-[.58rem] font-bold tracking-[.15em] ${active ? "lg:text-[#dfc6a5]" : ""}`}>{scene.time[locale]}</span>
                  <span className="font-serif text-base font-medium lg:text-xl">{scene.label[locale]}</span>
                  <span className={`ml-auto hidden h-px transition-all lg:block ${active ? "w-10 bg-[#dfc6a5]" : "w-0 bg-white/35 group-hover:w-5"}`} />
                </button>
              );
            })}
          </div>
          <p className="mt-auto hidden max-w-[210px] pt-10 text-xs leading-6 text-white/38 lg:block">
            {locale === "en" ? "Choose a moment or simply keep scrolling. The page never takes control away from you." : "Chọn một thời điểm hoặc cứ tiếp tục cuộn. Website không bao giờ lấy mất quyền điều khiển của bạn."}
          </p>
        </aside>

        <div>
          {scenes.map((scene, index) => (
            <article
              key={scene.id}
              id={scene.id}
              ref={(node) => { sceneRefs.current[index] = node; }}
              data-scene-index={index}
              aria-label={scene.title[locale]}
              className="border-b border-white/12"
            >
              <div className="relative min-h-[58svh] overflow-hidden bg-[#10251d] sm:min-h-[66svh] lg:min-h-[82svh]">
                <Image
                  src={scene.image}
                  alt={`${scene.label[locale]} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`}
                  fill
                  sizes="(max-width:1024px) 100vw, 78vw"
                  className={`object-cover transition duration-[1200ms] ${scene.position} ${activeIndex === index ? "scale-100" : "scale-[1.015]"}`}
                />
                <div className="absolute inset-0 hidden bg-gradient-to-t from-[#07150f]/92 via-[#07150f]/10 to-transparent lg:block" />
                <div className="absolute inset-x-0 bottom-0 hidden p-10 lg:block xl:p-14">
                  <div className="grid gap-8 border-t border-white/25 pt-7 xl:grid-cols-[1fr_420px] xl:items-end">
                    <div>
                      <p className="text-[.58rem] font-bold uppercase tracking-[.2em] text-[#dfc6a5]">{scene.time[locale]} · {scene.label[locale]}</p>
                      <h3 className="mt-4 max-w-4xl font-serif text-5xl font-medium leading-[.95] tracking-[-.045em] xl:text-6xl">{scene.title[locale]}</h3>
                    </div>
                    <p className="text-sm leading-7 text-white/66">{scene.text[locale]}</p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-8 lg:hidden">
                <p className="text-[.58rem] font-bold uppercase tracking-[.2em] text-[#dfc6a5]">{scene.time[locale]} · {scene.label[locale]}</p>
                <h3 className="mt-4 font-serif text-4xl font-medium leading-[.98] tracking-[-.04em]">{scene.title[locale]}</h3>
                <p className="mt-5 text-sm leading-7 text-white/62">{scene.text[locale]}</p>
              </div>
            </article>
          ))}

          <div className="px-5 py-16 sm:px-10 lg:px-14">
            <p className="max-w-xl font-serif text-3xl font-medium leading-tight text-white/86 sm:text-4xl">
              {locale === "en" ? "The best plan may be leaving enough room for the day to surprise you." : "Kế hoạch tốt nhất có thể là chừa đủ khoảng trống để một ngày khiến mình bất ngờ."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
