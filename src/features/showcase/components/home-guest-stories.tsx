"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

const feedbackSlots = ["01", "02", "03", "04"] as const;

export function HomeGuestStories({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  const en = locale === "en";
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex = Math.max(0, Math.min(index, feedbackSlots.length - 1));
    const target = track.children.item(nextIndex) as HTMLElement | null;
    if (!target) return;

    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActiveSlide(nextIndex);
  };

  const syncActiveSlide = () => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const closestIndex = slides.reduce((bestIndex, slide, index) => {
      const best = slides[bestIndex];
      const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
      const bestDistance = Math.abs(best.offsetLeft - track.scrollLeft);
      return distance < bestDistance ? index : bestIndex;
    }, 0);

    setActiveSlide(closestIndex);
  };

  return (
    <section
      id="feedback"
      className="laka-section-normal scroll-mt-20 overflow-hidden bg-[#f2ece2] px-5 text-[#16311c] sm:px-8"
      aria-labelledby="feedback-heading"
    >
      <div className="mx-auto w-[min(1380px,100%)]">
        <header className="grid gap-8 border-b border-[#16311c]/14 pb-10 lg:grid-cols-[.38fr_1fr] lg:items-end lg:pb-12">
          <div>
            <p className="laka-eyebrow text-[#6b4f31]">{en ? "Guest impressions" : "Cảm nhận khách nghỉ"}</p>
            <p className="laka-body-muted mt-5 max-w-sm">
              {en
                ? "Every verified story belongs to the same shared stream, wherever the journey began."
                : "Mỗi cảm nhận đã xác minh đều được đặt trong một dòng câu chuyện chung, không phân tách hành trình."}
            </p>
          </div>
          <h2 id="feedback-heading" className="laka-heading-section max-w-5xl">
            {en ? <>Stories that stay<br /><i>after the journey.</i></> : <>Những cảm nhận còn lại<br /><i>sau mỗi chuyến đi.</i></>}
          </h2>
        </header>

        <div className="mt-8 flex items-center justify-between gap-5">
          <p className="text-[.6rem] font-bold uppercase tracking-[.16em] text-[#80613f]">
            {en ? "One combined feedback slider" : "Một slider phản hồi tổng hợp"}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goToSlide(activeSlide - 1)}
              disabled={activeSlide === 0}
              className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[#16311c]/24 transition hover:bg-[#16311c] hover:text-white"
              aria-label={en ? "Previous feedback" : "Xem phản hồi trước"}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goToSlide(activeSlide + 1)}
              disabled={activeSlide === feedbackSlots.length - 1}
              className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[#16311c]/24 transition hover:bg-[#16311c] hover:text-white"
              aria-label={en ? "Next feedback" : "Xem phản hồi tiếp theo"}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="laka-feedback-track mt-6"
          role="group"
          aria-roledescription="carousel"
          aria-label={en ? "Combined guest feedback" : "Slider phản hồi tổng hợp của khách"}
          tabIndex={0}
          onScroll={syncActiveSlide}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goToSlide(activeSlide - 1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goToSlide(activeSlide + 1);
            }
          }}
        >
          {feedbackSlots.map((slot, index) => (
            <article
              key={slot}
              className="laka-feedback-card flex min-h-[310px] flex-col justify-between border border-[#16311c]/14 bg-[#eae1d2] p-7 sm:min-h-[350px] sm:p-9"
              role="group"
              aria-roledescription="slide"
              aria-label={(en ? "Feedback placeholder " : "Khung phản hồi ") + slot}
            >
              <div>
                <div className="flex items-start justify-between gap-6">
                  <span className="text-[.6rem] font-bold tracking-[.18em] text-[#80613f]">{slot}</span>
                  <Quote className="h-8 w-8 text-[#80613f]/48" aria-hidden="true" />
                </div>
                <p className="mt-10 max-w-lg font-serif text-[1.45rem] font-medium leading-[1.38] tracking-[-.02em] sm:text-[1.75rem]">
                  {en
                    ? "A verified guest reflection will appear here once its content and usage permission are approved."
                    : "Phản hồi thực tế sẽ xuất hiện tại đây sau khi nội dung và quyền sử dụng được xác minh."}
                </p>
              </div>
              <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#16311c]/13 pt-5">
                <span className="text-[.58rem] font-bold uppercase tracking-[.14em] text-[#16311c]/66">
                  {en ? "Verified feedback slot" : "Vị trí phản hồi đã xác minh"}
                </span>
                <span className="text-[.58rem] font-bold uppercase tracking-[.14em] text-[#80613f]">
                  {index + 1} / {feedbackSlots.length}
                </span>
              </footer>
            </article>
          ))}
        </div>

        <p className="mt-5 text-sm leading-7 text-[#16311c]/58" aria-live="polite">
          {en ? "Showing feedback frame " : "Đang xem khung phản hồi "}
          {activeSlide + 1} / {feedbackSlots.length}
        </p>
      </div>
    </section>
  );
}
