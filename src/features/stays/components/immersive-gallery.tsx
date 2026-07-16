"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useState } from "react";

export function ImmersiveGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState<number | null>(null);
  const previous = () => setActive((index) => index === null ? 0 : (index - 1 + images.length) % images.length);
  const next = () => setActive((index) => index === null ? 0 : (index + 1) % images.length);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active]);

  return <>
    <div className="grid gap-4 sm:grid-cols-12">{images.map((image, index) => <button type="button" onClick={() => setActive(index)} key={image} aria-label={`Mở ảnh ${index + 1} của ${name}`} className={`group image-zoom focus-ring relative overflow-hidden rounded-[26px] ${index === 0 ? "aspect-[16/10] sm:col-span-8" : index === 1 ? "aspect-square sm:col-span-4" : "aspect-[16/8] sm:col-span-12"}`}><Image src={image} alt={`Không gian ${name} ${index + 1} - ảnh concept`} fill sizes={index === 2 ? "100vw" : "60vw"} className="object-cover" /><span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white/92 opacity-100 shadow-lg transition sm:opacity-0 sm:group-hover:opacity-100"><Expand className="h-4 w-4" /></span></button>)}</div>
    {active !== null && <div className="fixed inset-0 z-[90] bg-[#071510]/96 p-4 text-white backdrop-blur-xl sm:p-8" role="dialog" aria-modal="true" aria-label={`Thư viện ảnh ${name}`}>
      <header className="absolute inset-x-4 top-4 z-10 flex items-center justify-between sm:inset-x-8 sm:top-7"><span className="text-xs font-bold uppercase tracking-[.16em] text-white/55">{name} · {String(active + 1).padStart(2, "0")}/{String(images.length).padStart(2, "0")}</span><button type="button" onClick={() => setActive(null)} aria-label="Đóng thư viện" className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10"><X className="h-5 w-5" /></button></header>
      <div className="relative mx-auto h-full max-w-7xl"><Image src={images[active]} alt={`${name} - ảnh ${active + 1}`} fill priority sizes="100vw" className="object-contain" /></div>
      <button type="button" onClick={previous} aria-label="Ảnh trước" className="focus-ring absolute bottom-5 left-5 z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-lago-ink sm:bottom-auto sm:top-1/2"><ChevronLeft className="h-5 w-5" /></button>
      <button type="button" onClick={next} aria-label="Ảnh tiếp theo" className="focus-ring absolute bottom-5 right-5 z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-lago-ink sm:bottom-auto sm:top-1/2"><ChevronRight className="h-5 w-5" /></button>
    </div>}
  </>;
}
