"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

type GuestStory = {
  quote: Record<ShowcaseLocale, string>;
  source: Record<ShowcaseLocale, string>;
  detail?: Record<ShowcaseLocale, string>;
};

const guestStories: GuestStory[] = [];

export function HomeGuestStories({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  const en = locale === "en";
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track || guestStories.length === 0) return;

    const nextIndex = Math.max(0, Math.min(index, guestStories.length - 1));
    const target = track.children.item(nextIndex) as HTMLElement | null;
    if (!target) return;

    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActiveSlide(nextIndex);
  };

  const syncActiveSlide = () => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length === 0) return;
    const closestIndex = slides.reduce((bestIndex, slide, index) => {
      const best = slides[bestIndex];
      const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
      const bestDistance = Math.abs(best.offsetLeft - track.scrollLeft);
      return distance < bestDistance ? index : bestIndex;
    }, 0);

    setActiveSlide(closestIndex);
  };

  if (guestStories.length === 0) return null;

  return (
    <section
      id="feedback"
      className="laka-section-normal scroll-mt-20 overflow-hidden bg-[#f2ece2] px-5 text-[#16311c] sm:px-8"
      aria-labelledby="feedback-heading"
    >
      <div className="mx-auto w-[min(1380px,100%)]">
        <header className="grid gap-8 border-b border-[#16311c]/14 pb-10 lg:grid-cols-[.38fr_1fr] lg:items-start lg:pb-12">
          <h2 id="feedback-heading" className="laka-home-section-title text-[#16311c]">
            {en ? "Guest impressions" : "Cảm nhận khách nghỉ"}
          </h2>
          <p className="laka-home-section-lead max-w-5xl">
            {en ? <>Stories that stay<br /><i>after the journey.</i></> : <>Những cảm nhận còn lại<br /><i>sau mỗi chuyến đi.</i></>}
          </p>
        </header>

        <div className="mt-8 flex justify-end">
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
              disabled={activeSlide === guestStories.length - 1}
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
          aria-label={en ? "Guest feedback" : "Cảm nhận của khách nghỉ"}
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
          {guestStories.map((story, index) => (
            <article
              key={story.quote.vi}
              className="laka-feedback-card flex min-h-[310px] flex-col justify-between border border-[#16311c]/14 bg-[#eae1d2] p-7 sm:min-h-[350px] sm:p-9"
              role="group"
              aria-roledescription="slide"
              aria-label={`${en ? "Guest feedback" : "Cảm nhận khách nghỉ"} ${index + 1}`}
            >
              <div>
                <div className="flex items-start justify-between gap-6">
                  <span className="text-[.6rem] font-bold tracking-[.18em] text-[#80613f]">{String(index + 1).padStart(2, "0")}</span>
                  <Quote className="h-8 w-8 text-[#80613f]/48" aria-hidden="true" />
                </div>
                <p className="mt-10 max-w-lg font-serif text-[1.45rem] font-medium leading-[1.38] tracking-[-.02em] sm:text-[1.75rem]">
                  “{story.quote[locale]}”
                </p>
              </div>
              <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#16311c]/13 pt-5">
                <span className="text-[.58rem] font-bold uppercase tracking-[.14em] text-[#16311c]/66">
                  {story.source[locale]}
                </span>
                {story.detail && <span className="text-[.58rem] font-bold uppercase tracking-[.14em] text-[#80613f]">{story.detail[locale]}</span>}
              </footer>
            </article>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {en ? "Feedback" : "Cảm nhận"} {activeSlide + 1} / {guestStories.length}
        </p>
      </div>
    </section>
  );
}
