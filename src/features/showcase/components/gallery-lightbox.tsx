"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { SiteMood } from "@/features/showcase/site/site-types";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

export function GalleryLightbox({
  images,
  mood,
  locale = "vi",
}: {
  images: string[];
  mood: SiteMood;
  locale?: ShowcaseLocale;
}) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const dragStartRef = useRef<number | null>(null);
  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight")
        setActive((index) => (index === null ? 0 : (index + 1) % images.length));
      if (event.key === "ArrowLeft")
        setActive((index) => (index === null ? 0 : (index - 1 + images.length) % images.length));
      if (event.key === "Tab") {
        const controls =
          dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [images.length, isOpen]);

  const change = (direction: number) =>
    setActive((index) =>
      index === null ? 0 : (index + direction + images.length) % images.length,
    );

  return (
    <>
      <section
        className="mx-auto mt-6 sm:mt-8 md:mt-10 grid grid-cols-3 gap-2 sm:gap-3.5 md:gap-5 w-full"
        aria-label={locale === "en" ? "Memory gallery photos" : "Các hình ảnh thư viện ký ức"}
      >
        {images.map((src, index) => (
          <button
            type="button"
            onClick={(event) => {
              returnFocusRef.current = event.currentTarget;
              setActive(index);
            }}
            key={`${src}-${index}`}
            aria-label={
              locale === "en" ? `Open LAKA photo ${index + 1}` : `Mở ảnh LAKA ${index + 1}`
            }
            className="group focus-ring relative aspect-square sm:aspect-[4/5] md:aspect-[4/3] w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl bg-[#10251d] text-left shadow-sm transition-all duration-300 hover:shadow-xl block"
          >
            <Image
              src={src}
              alt={
                locale === "en"
                  ? `LAKA Homestay photo ${index + 1}`
                  : `Ảnh LAKA Homestay ${index + 1}`
              }
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Hover Expand Icon */}
            <span className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 grid h-6 w-6 sm:h-8 sm:w-8 place-items-center rounded-full bg-white/90 text-[#16311c] opacity-0 shadow-lg transition duration-200 group-hover:opacity-100">
              <Expand className="h-3 w-3 sm:h-4 sm:w-4" />
            </span>
          </button>
        ))}
      </section>

      {active !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={
              locale === "en"
                ? `Image ${active + 1} of ${images.length}`
                : `Ảnh ${active + 1} trên ${images.length}`
            }
            onPointerDown={(event) => {
              dragStartRef.current = event.clientX;
            }}
            onPointerUp={(event) => {
              if (dragStartRef.current === null) return;
              const distance = event.clientX - dragStartRef.current;
              if (Math.abs(distance) > 55) change(distance < 0 ? 1 : -1);
              dragStartRef.current = null;
            }}
            className={`gallery-dialog gallery-dialog-${mood} fixed inset-0 z-[110] grid touch-pan-y place-items-center bg-[#020806]/96 p-3 text-white backdrop-blur sm:p-8`}
          >
            <div className="relative h-full w-full max-w-[1500px]">
              <Image
                key={images[active]}
                src={images[active]}
                alt={
                  locale === "en"
                    ? `LAKA Homestay photo ${active + 1}`
                    : `Ảnh LAKA Homestay ${active + 1}`
                }
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
              <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent p-4 sm:p-6">
                <span className="rounded-full bg-black/35 px-4 py-2 text-xs font-bold backdrop-blur">
                  {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label={locale === "en" ? "Close gallery" : "Đóng thư viện ảnh"}
                  className="focus-ring grid h-12 w-12 place-items-center rounded-full bg-white text-[#16311c] shadow-xl"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>
              <button
                type="button"
                onClick={() => change(-1)}
                aria-label={locale === "en" ? "Previous image" : "Ảnh trước"}
                className="focus-ring absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 backdrop-blur transition hover:bg-white hover:text-[#16311c] sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => change(1)}
                aria-label={locale === "en" ? "Next image" : "Ảnh tiếp theo"}
                className="focus-ring absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 backdrop-blur transition hover:bg-white hover:text-[#16311c] sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </section>,
          document.body,
        )}
    </>
  );
}
