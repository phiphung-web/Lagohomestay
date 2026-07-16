"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MapPin, Pause, Play, Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { Stay } from "@/features/stays/data/demo-data";
import { AvailabilityBar } from "@/features/booking/components/availability-bar";

export function HeroShowcase({ stays }: { stays: Stay[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const stay = stays[active];

  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setPlaying(false); return; }
    const timer = window.setInterval(() => { if (!document.hidden) setActive((current) => (current + 1) % stays.length); }, 6000);
    return () => window.clearInterval(timer);
  }, [playing, stays.length]);

  return <section className="grain relative min-h-[calc(100svh-76px)] overflow-hidden bg-lago-ink text-white">
    {stays.map((item, index) => <Image key={item.id} src={item.image} alt={`${item.name} - ảnh concept`} fill priority={index === 0} sizes="100vw" className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-out ${active === index ? "scale-100 opacity-80" : "scale-[1.04] opacity-0"}`} />)}
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,29,24,.92)_0%,rgba(8,29,24,.58)_48%,rgba(8,29,24,.12)_100%)]" />
    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-lago-ink/80 to-transparent" />

    <div className="container-lago relative z-10 flex min-h-[calc(100svh-76px)] flex-col justify-center pb-44 pt-16 sm:pb-48 sm:pt-20">
      <div key={stay.id} className="hero-enter max-w-4xl">
        <p className="eyebrow mb-5 flex items-center gap-3 text-white/72"><span className="h-px w-10 bg-lago-sand" /> Bộ sưu tập nhà giữa thiên nhiên</p>
        <h1 className="display max-w-4xl text-[3.2rem] font-medium leading-[.96] sm:text-7xl lg:text-[6.15rem]">Mỗi căn nhà,<br /><em className="font-medium text-lago-sand">một cách để trở về.</em></h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">Từ căn nhỏ cho hai người đến ngôi nhà dành cho cả nhóm. Chọn không gian hợp với nhịp nghỉ của riêng bạn.</p>
        <div className="mt-8 flex flex-wrap items-center gap-4"><Link href={`/luu-tru/${stay.slug}`} className="btn-light">Khám phá {stay.name} <ArrowRight className="h-4 w-4" /></Link><span className="flex items-center gap-2 text-sm text-white/65"><MapPin className="h-4 w-4 text-lago-sand" />{stay.location} · <Users className="ml-2 h-4 w-4 text-lago-sand" />{stay.maxGuests} khách</span></div>
        <div className="mt-7 hidden max-w-5xl md:block"><AvailabilityBar /></div>
      </div>

      <div className="absolute inset-x-0 bottom-5 sm:bottom-7">
        <div className="container-lago">
          <div className="mb-4 flex items-center justify-between text-[.65rem] font-bold uppercase tracking-[.18em] text-white/55"><span>Đang khám phá · {String(active + 1).padStart(2, "0")}/{String(stays.length).padStart(2, "0")}</span><button onClick={() => setPlaying((value) => !value)} className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/25" aria-label={playing ? "Tạm dừng trình chiếu" : "Tiếp tục trình chiếu"}>{playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}</button></div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{stays.map((item, index) => <button key={item.id} onClick={() => { setActive(index); setPlaying(false); }} aria-pressed={active === index} className={`group focus-ring rounded-2xl border px-4 py-3 text-left backdrop-blur-md transition ${active === index ? "border-white/55 bg-white text-lago-ink" : "border-white/15 bg-lago-ink/35 text-white hover:bg-lago-ink/55"}`}><span className={`block h-0.5 origin-left transition-transform duration-500 ${active === index ? "scale-x-100 bg-lago-clay" : "scale-x-0 bg-white group-hover:scale-x-50"}`} /><strong className="mt-2 block text-xs sm:text-sm">{item.name}</strong><span className={`mt-1 hidden text-[.65rem] sm:block ${active === index ? "text-lago-ink/50" : "text-white/45"}`}>{item.location} · {item.maxGuests} khách</span></button>)}</div>
        </div>
      </div>
    </div>
    <a href="#chon-can" aria-label="Đi đến bộ sưu tập căn nhà" className="scroll-cue absolute bottom-36 right-6 z-20 hidden flex-col items-center gap-1 text-[.58rem] font-bold uppercase tracking-[.18em] text-white/50 lg:flex">Cuộn <ArrowDown className="h-4 w-4" /></a>
    <span className="absolute right-5 top-5 z-20 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[.58rem] font-semibold uppercase tracking-wider backdrop-blur">Hình ảnh concept</span>
  </section>;
}
