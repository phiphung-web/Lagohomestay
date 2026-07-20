"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Heart, Leaf, Mountain, Sparkles, Users, Waves } from "lucide-react";
import { useMemo, useState } from "react";
import type { Stay, StayMood } from "@/features/stays/data/demo-data";
import { formatCurrency } from "@/shared/lib/format";

type Vibe = "water" | "private" | "forest" | "view";

const journeys: Array<{ value: StayMood; label: string; note: string }> = [
  { value: "couple", label: "Hai người", note: "Một khoảng riêng thật yên" },
  { value: "family", label: "Gia đình", note: "Đủ gần gũi, đủ tiện nghi" },
  { value: "friends", label: "Nhóm bạn", note: "Rộng mở cho những cuộc vui" },
  { value: "retreat", label: "Nghỉ dài ngày", note: "Chậm lại và tái tạo" }
];

const vibes: Array<{ value: Vibe; label: string; icon: typeof Waves }> = [
  { value: "water", label: "Gần mặt nước", icon: Waves },
  { value: "private", label: "Riêng tư", icon: Heart },
  { value: "forest", label: "Nhiều cây xanh", icon: Leaf },
  { value: "view", label: "Tầm nhìn rộng", icon: Mountain }
];

const vibeStay: Record<Vibe, string[]> = {
  water: ["lago-house"],
  private: ["nha-may", "nha-rung"],
  forest: ["nha-rung", "nha-may"],
  view: ["nha-doi", "lago-house"]
};

export function StayFinder({ stays }: { stays: Stay[] }) {
  const [journey, setJourney] = useState<StayMood>("couple");
  const [vibe, setVibe] = useState<Vibe>("private");
  const [guests, setGuests] = useState(2);

  const recommended = useMemo(() => {
    return [...stays].filter((stay) => stay.maxGuests >= guests).sort((a, b) => {
      const score = (stay: Stay) => (stay.mood === journey ? 5 : 0) + (vibeStay[vibe].includes(stay.slug) ? 3 : 0) - Math.abs(stay.maxGuests - guests) * .25;
      return score(b) - score(a);
    })[0] ?? stays[0];
  }, [guests, journey, stays, vibe]);

  const journeyLabel = journeys.find((item) => item.value === journey)?.label.toLowerCase();

  return <section className="finder-shell overflow-hidden rounded-[34px] bg-lago-ink text-white shadow-soft">
    <div className="grid lg:grid-cols-[.92fr_1.08fr]">
      <div className="p-6 sm:p-9 lg:p-11">
        <p className="eyebrow flex items-center gap-2 text-lago-sand"><Sparkles className="h-4 w-4" /> LAKA Finder</p>
        <h3 className="display mt-4 text-4xl font-medium leading-tight sm:text-5xl">Tìm căn hợp với nhịp nghỉ của bạn.</h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/58">Ba lựa chọn ngắn để LAKA hiểu chuyến đi và đề xuất không gian phù hợp nhất.</p>

        <div className="mt-8 space-y-7">
          <fieldset><legend className="mb-3 text-xs font-bold uppercase tracking-wider text-white/45">1 · Bạn đi cùng ai?</legend><div className="grid grid-cols-2 gap-2">{journeys.map((item) => <button type="button" key={item.value} onClick={() => { setJourney(item.value); if (item.value === "couple") setGuests(2); if (item.value === "family") setGuests(4); if (item.value === "friends") setGuests(6); }} className={`focus-ring rounded-2xl border p-3 text-left transition ${journey === item.value ? "border-lago-sand bg-white text-lago-ink" : "border-white/12 bg-white/[.05] hover:bg-white/[.1]"}`}><strong className="block text-sm">{item.label}</strong><span className={`mt-1 block text-[.65rem] ${journey === item.value ? "text-lago-ink/48" : "text-white/40"}`}>{item.note}</span></button>)}</div></fieldset>
          <fieldset><legend className="mb-3 text-xs font-bold uppercase tracking-wider text-white/45">2 · Điều bạn muốn nhất?</legend><div className="flex gap-2 overflow-x-auto pb-1">{vibes.map(({ value, label, icon: Icon }) => <button type="button" key={value} onClick={() => setVibe(value)} className={`focus-ring flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition ${vibe === value ? "border-lago-sand bg-lago-sand text-lago-ink" : "border-white/15 text-white/65 hover:border-white/30"}`}><Icon className="h-4 w-4" />{label}</button>)}</div></fieldset>
          <fieldset><legend className="mb-3 text-xs font-bold uppercase tracking-wider text-white/45">3 · Có bao nhiêu khách?</legend><div className="flex w-fit items-center rounded-full border border-white/15 bg-white/[.06] p-1"><button type="button" onClick={() => setGuests((value) => Math.max(1, value - 1))} aria-label="Giảm số khách" className="focus-ring grid h-10 w-10 place-items-center rounded-full text-xl">−</button><span className="min-w-28 text-center text-sm font-bold">{guests} khách</span><button type="button" onClick={() => setGuests((value) => Math.min(12, value + 1))} aria-label="Tăng số khách" className="focus-ring grid h-10 w-10 place-items-center rounded-full text-xl">+</button></div></fieldset>
        </div>
      </div>

      <div key={`${recommended.slug}-${journey}-${vibe}-${guests}`} className="finder-result relative min-h-[580px] overflow-hidden lg:min-h-full">
        <Image src={recommended.image} alt={`${recommended.name} - gợi ý từ LAKA Finder`} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-lago-ink via-lago-ink/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-11">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[.62rem] font-bold uppercase tracking-wider text-lago-ink"><Check className="h-3.5 w-3.5" /> Phù hợp nhất</span>
          <p className="mt-5 text-xs font-semibold text-lago-sand">Cho {journeyLabel} · {recommended.location}</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4"><h4 className="display text-5xl font-semibold sm:text-6xl">{recommended.name}</h4><p className="text-sm text-white/65">Từ <strong className="text-lg text-white">{formatCurrency(recommended.basePrice)}</strong></p></div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/68">{recommended.description}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href={`/luu-tru/${recommended.slug}`} className="btn-light">Khám phá căn này <ArrowRight className="h-4 w-4" /></Link><Link href={`/dat-phong?stay=${recommended.slug}&guests=${guests}`} className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-bold backdrop-blur transition hover:bg-white/10"><Users className="mr-2 h-4 w-4" /> Xem lịch cho {guests} khách</Link></div>
        </div>
      </div>
    </div>
  </section>;
}
