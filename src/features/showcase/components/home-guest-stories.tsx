"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

type GuestStory = {
  quote: Record<ShowcaseLocale, string>;
  source: Record<ShowcaseLocale, string>;
  detail?: Record<ShowcaseLocale, string>;
};

const guestStories: GuestStory[] = [
  {
    quote: {
      vi: "Sáng thức dậy kéo rèm ra là cả một thung lũng xanh mướt trước mắt. Không gian tĩnh lặng, chỉ có tiếng gió và tiếng thông reo, cảm giác mọi âu lo đều tan biến.",
      en: "Waking up and opening the curtains to a lush green valley right in front of us. Such deep peace, with only the wind and whispering pines."
    },
    source: {
      vi: "Minh Anh & Hoàng Nam",
      en: "Minh Anh & Hoang Nam"
    },
    detail: {
      vi: "Kỳ nghỉ cặp đôi · Cabin Vô Cực",
      en: "Couple retreat · Vo Cuc Cabin"
    }
  },
  {
    quote: {
      vi: "Cả nhà mình có một cuối tuần trọn vẹn tại Villa Top Hill. Các bé thích mê hồ bơi và bãi cỏ rộng, còn người lớn thì có không gian BBQ ấm cúng bên nhau.",
      en: "Our whole family had a wonderful weekend at Villa Top Hill. The kids loved the pool and open grounds, while the adults enjoyed an intimate BBQ evening."
    },
    source: {
      vi: "Gia đình chị Thanh Hằng",
      en: "Thanh Hang family"
    },
    detail: {
      vi: "Kỳ nghỉ gia đình · Villa Top Hill",
      en: "Family getaway · Top Hill Villa"
    }
  },
  {
    quote: {
      vi: "Chuyến đi của nhóm bạn tuyệt vời hơn mong đợi. Cabin view hồ siêu chill, trà chiều ngắm hoàng hôn và bữa tối ven hồ được chuẩn bị rất chu đáo.",
      en: "Our friends' trip was better than expected. Super chill lakeside cabin views, with sunset tea and lakeside dinner prepared with great care."
    },
    source: {
      vi: "Nhóm bạn Ngọc Linh",
      en: "Ngoc Linh & friends"
    },
    detail: {
      vi: "Chuyến đi bạn bè · Cabin Khoảng Trời",
      en: "Friends' getaway · Khoang Troi Cabin"
    }
  },
  {
    quote: {
      vi: "Khung kính lớn ở phòng ngủ thật sự là điểm nhấn đắt giá. Nằm đọc sách ngắm mây trôi qua thung lũng là trải nghiệm mình nhớ nhất tại LaKa.",
      en: "The grand window in the bedroom is truly the highlight. Reading a book while watching the clouds drift over the valley is what I remember most about LaKa."
    },
    source: {
      vi: "Đức Huy & Bạn bè",
      en: "Duc Huy & friends"
    },
    detail: {
      vi: "Kỳ nghỉ cuối tuần · Cabin An Trú",
      en: "Weekend pause · An Tru Cabin"
    }
  }
];

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
      className="laka-section-normal scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#e8decb] via-[#e4dac8] to-[#ddcfba] px-5 text-[#16311c] sm:px-8"
      aria-labelledby="feedback-heading"
    >
      <div className="mx-auto w-[min(1380px,100%)]">
        {/* Balanced Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#16311c]/14 pb-8 sm:pb-10">
          <div>
            <h2 id="feedback-heading" className="laka-home-section-title text-[#16311c]">
              {en ? "Guest impressions" : "Cảm nhận khách nghỉ"}
            </h2>
          </div>
          <div className="flex items-end justify-between md:justify-end gap-6">
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#16311c] md:text-right shrink-0">
              {en ? (
                <>Stories that stay<br className="hidden md:inline" /> <i className="text-[#80613f]">after the journey.</i></>
              ) : (
                <>Những cảm nhận còn lại<br className="hidden md:inline" /> <i className="text-[#80613f]">sau mỗi chuyến đi.</i></>
              )}
            </p>
            {/* Arrows */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => goToSlide(activeSlide - 1)}
                disabled={activeSlide === 0}
                className="focus-ring grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border-2 border-[#16311c] text-[#16311c] bg-white/40 shadow-sm transition-all hover:bg-[#16311c] hover:text-white disabled:opacity-25 disabled:pointer-events-none"
                aria-label={en ? "Previous feedback" : "Xem phản hồi trước"}
              >
                <ArrowLeft className="h-4 w-4 stroke-[2.2]" />
              </button>
              <button
                type="button"
                onClick={() => goToSlide(activeSlide + 1)}
                disabled={activeSlide === guestStories.length - 1}
                className="focus-ring grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border-2 border-[#16311c] text-[#16311c] bg-white/40 shadow-sm transition-all hover:bg-[#16311c] hover:text-white disabled:opacity-25 disabled:pointer-events-none"
                aria-label={en ? "Next feedback" : "Xem phản hồi tiếp theo"}
              >
                <ArrowRight className="h-4 w-4 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </header>

        {/* Feedback Cards Track Slider */}
        <div
          ref={trackRef}
          className="laka-feedback-track mt-8 sm:mt-10"
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
              className="laka-feedback-card flex min-h-[290px] sm:min-h-[330px] flex-col justify-between rounded-2xl border border-[#16311c]/12 bg-[#f4ece0] p-7 sm:p-9 shadow-sm hover:shadow-md transition-all"
              role="group"
              aria-roledescription="slide"
              aria-label={`${en ? "Guest feedback" : "Cảm nhận khách nghỉ"} ${index + 1}`}
            >
              <div>
                <div className="flex items-start justify-start">
                  <Quote className="h-7 w-7 sm:h-8 sm:w-8 text-[#80613f]/50" aria-hidden="true" />
                </div>
                <p className="mt-6 sm:mt-7 max-w-lg font-serif text-[1.2rem] sm:text-[1.45rem] font-medium leading-[1.45] tracking-[-.015em] text-[#16311c]">
                  “{story.quote[locale]}”
                </p>
              </div>
              <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#16311c]/10 pt-5">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#16311c]/80">
                  {story.source[locale]}
                </span>
                {story.detail && (
                  <span className="text-[.65rem] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#80613f]">
                    {story.detail[locale]}
                  </span>
                )}
              </footer>
            </article>
          ))}
        </div>

        {/* Mobile controls & Dots */}
        <div className="mt-7 flex items-center justify-between sm:justify-center gap-4">
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => goToSlide(activeSlide - 1)}
              disabled={activeSlide === 0}
              className="focus-ring grid h-9 w-9 place-items-center rounded-full border-2 border-[#16311c] text-[#16311c] bg-white/40 shadow-sm transition-all hover:bg-[#16311c] hover:text-white disabled:opacity-25"
              aria-label={en ? "Previous feedback" : "Xem phản hồi trước"}
            >
              <ArrowLeft className="h-3.5 w-3.5 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={() => goToSlide(activeSlide + 1)}
              disabled={activeSlide === guestStories.length - 1}
              className="focus-ring grid h-9 w-9 place-items-center rounded-full border-2 border-[#16311c] text-[#16311c] bg-white/40 shadow-sm transition-all hover:bg-[#16311c] hover:text-white disabled:opacity-25"
              aria-label={en ? "Next feedback" : "Xem phản hồi tiếp theo"}
            >
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.2]" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {guestStories.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === idx
                    ? "w-2.5 h-2.5 bg-[#16311c] ring-2 ring-[#16311c]/25 scale-110"
                    : "w-1.5 h-1.5 bg-[#16311c]/30 hover:bg-[#16311c]/60"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {en ? "Feedback" : "Cảm nhận"} {activeSlide + 1} / {guestStories.length}
        </p>
      </div>
    </section>
  );
}
