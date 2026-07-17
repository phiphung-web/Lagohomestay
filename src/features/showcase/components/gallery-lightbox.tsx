"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { TemplateMood } from "@/features/showcase/site/complete-template-site";

export function GalleryLightbox({ images, mood }: { images: string[]; mood: TemplateMood }) {
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
      if (event.key === "ArrowRight") setActive((index) => index === null ? 0 : (index + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((index) => index === null ? 0 : (index - 1 + images.length) % images.length);
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener("keydown", onKeyDown); returnFocusRef.current?.focus(); };
  }, [images.length, isOpen]);

  const change = (direction: number) => setActive((index) => index === null ? 0 : (index + direction + images.length) % images.length);

  return <>
    <section className={`gallery-grid gallery-grid-${mood} mx-auto columns-1 gap-4 py-16 sm:w-[min(1420px,calc(100%-32px))] sm:columns-2 lg:columns-3`}>
      {images.map((src, index) => <button type="button" onClick={(event) => { returnFocusRef.current = event.currentTarget; setActive(index); }} key={`${src}-${index}`} aria-label={`Mở ảnh minh họa ${index + 1}`} className={`group focus-ring relative mb-4 block w-full break-inside-avoid overflow-hidden text-left ${index % 4 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}><Image src={src} alt={`Lago Homestay - ảnh minh họa ${index + 1}`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" /><span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" /><span className="absolute right-3 top-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white text-[#17312b] opacity-0 shadow-xl transition group-hover:translate-y-0 group-hover:opacity-100"><Expand className="h-4 w-4" /></span><span className="absolute bottom-3 left-3 rounded-full bg-black/52 px-3 py-1.5 text-[.58rem] font-bold uppercase tracking-wider text-white backdrop-blur">Minh họa · {String(index + 1).padStart(2, "0")}</span></button>)}
    </section>
    {active !== null && typeof document !== "undefined" && createPortal(<section ref={dialogRef} role="dialog" aria-modal="true" aria-label={`Ảnh ${active + 1} trên ${images.length}`} onPointerDown={(event) => { dragStartRef.current = event.clientX; }} onPointerUp={(event) => { if (dragStartRef.current === null) return; const distance = event.clientX - dragStartRef.current; if (Math.abs(distance) > 55) change(distance < 0 ? 1 : -1); dragStartRef.current = null; }} className={`gallery-dialog gallery-dialog-${mood} fixed inset-0 z-[110] grid touch-pan-y place-items-center bg-[#020806]/96 p-3 text-white backdrop-blur sm:p-8`}>
      <div className="relative h-full w-full max-w-[1500px]"><Image key={images[active]} src={images[active]} alt={`Lago Homestay - ảnh minh họa ${active + 1}`} fill priority sizes="100vw" className="object-contain" />
        <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent p-4 sm:p-6"><span className="rounded-full bg-black/35 px-4 py-2 text-xs font-bold backdrop-blur">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span><button ref={closeRef} type="button" onClick={() => setActive(null)} aria-label="Đóng thư viện ảnh" className="focus-ring grid h-12 w-12 place-items-center rounded-full bg-white text-[#17312b] shadow-xl"><X className="h-5 w-5" /></button></header>
        <button type="button" onClick={() => change(-1)} aria-label="Ảnh trước" className="focus-ring absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 backdrop-blur transition hover:bg-white hover:text-[#17312b] sm:left-6"><ChevronLeft className="h-5 w-5" /></button>
        <button type="button" onClick={() => change(1)} aria-label="Ảnh tiếp theo" className="focus-ring absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 backdrop-blur transition hover:bg-white hover:text-[#17312b] sm:right-6"><ChevronRight className="h-5 w-5" /></button>
      </div>
    </section>, document.body)}
  </>;
}
