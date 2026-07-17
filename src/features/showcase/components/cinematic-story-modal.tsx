"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, CirclePause, CirclePlay, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

type StoryFrame = { image: string; eyebrow: string; title: string; text: string };

export function CinematicStoryModal({ frames }: { frames: StoryFrame[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const dragStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setActive((index) => (index + 1) % frames.length);
      if (event.key === "ArrowLeft") setActive((index) => (index - 1 + frames.length) % frames.length);
      if (event.key === " ") { event.preventDefault(); setPlaying((value) => !value); }
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
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener("keydown", onKeyDown); triggerRef.current?.focus(); };
  }, [frames.length, open]);

  useEffect(() => {
    if (!open || !playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % frames.length), 4300);
    return () => window.clearInterval(timer);
  }, [frames.length, open, playing]);

  const change = (direction: number) => setActive((index) => (index + direction + frames.length) % frames.length);
  const frame = frames[active];

  return <>
    <button ref={triggerRef} type="button" onClick={() => { setActive(0); setPlaying(true); setOpen(true); }} className="group flex items-center gap-4 text-left">
      <span className="grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition duration-500 group-hover:scale-105 group-hover:border-[#e5c59c] group-hover:bg-[#e5c59c] group-hover:text-[#07130f]"><CirclePlay className="h-6 w-6" /></span>
      <span><strong className="block text-sm">Xem cảm xúc Lago</strong><small className="mt-1 block text-white/42">04 cảnh · Thước phim ảnh</small></span>
    </button>
    {open && typeof document !== "undefined" && createPortal(<section ref={dialogRef} role="dialog" aria-modal="true" aria-label="Thước phim ảnh về Lago" onPointerDown={(event) => { dragStartRef.current = event.clientX; }} onPointerUp={(event) => { if (dragStartRef.current === null) return; const distance = event.clientX - dragStartRef.current; if (Math.abs(distance) > 55) change(distance < 0 ? 1 : -1); dragStartRef.current = null; }} className="fixed inset-0 z-[110] touch-pan-y overflow-hidden bg-[#020806] text-white">
      <Image key={frame.image} src={frame.image} alt={`${frame.title} - ảnh minh họa`} fill priority sizes="100vw" className="cinematic-frame object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,6,.88),rgba(2,8,6,.22)_60%,rgba(2,8,6,.52))]" />
      <div className="grain absolute inset-0" />
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 sm:p-8"><span className="text-[.62rem] font-bold uppercase tracking-[.25em] text-white/55">Lago · Thước phim thiên nhiên</span><button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Đóng thước phim" className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/15 backdrop-blur transition hover:bg-white hover:text-[#07130f]"><X className="h-5 w-5" /></button></header>
      <div className="absolute inset-x-0 top-24 z-10 mx-auto flex w-[min(1100px,calc(100%-40px))] gap-2">{frames.map((item, index) => <button key={item.title} type="button" onClick={() => setActive(index)} aria-label={`Xem cảnh ${index + 1}: ${item.title}`} className="group h-8 flex-1 py-3"><span className={`block h-px transition ${index === active ? "bg-[#e5c59c]" : "bg-white/25 group-hover:bg-white/55"}`} /></button>)}</div>
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto grid w-[min(1400px,calc(100%-40px))] gap-8 pb-24 sm:pb-14 lg:grid-cols-[1fr_320px] lg:items-end"><div><p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#e5c59c]">{frame.eyebrow} · 0{active + 1}</p><h2 className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[.92] tracking-[-.05em] sm:text-7xl lg:text-8xl">{frame.title}</h2></div><div className="lg:pb-2"><p className="text-sm leading-7 text-white/58">{frame.text}</p><div className="mt-7 flex items-center gap-3"><button type="button" onClick={() => change(-1)} aria-label="Cảnh trước" className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/20 transition hover:border-white/55"><ChevronLeft className="h-5 w-5" /></button><button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Tạm dừng" : "Tiếp tục phát"} className="focus-ring grid h-12 w-12 place-items-center rounded-full bg-[#e5c59c] text-[#07130f]">{playing ? <CirclePause className="h-5 w-5" /> : <CirclePlay className="h-5 w-5" />}</button><button type="button" onClick={() => change(1)} aria-label="Cảnh tiếp theo" className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-white/20 transition hover:border-white/55"><ChevronRight className="h-5 w-5" /></button></div></div></div>
    </section>, document.body)}
  </>;
}
