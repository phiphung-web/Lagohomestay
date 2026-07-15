"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, MapPin, SlidersHorizontal, Users } from "lucide-react";
import { useMemo, useState } from "react";
import type { Stay, StayMood } from "@/features/stays/data/demo-data";
import { formatCurrency } from "@/shared/lib/format";

const filters: Array<{ value: "all" | StayMood; label: string }> = [
  { value: "all", label: "Tất cả căn" },
  { value: "couple", label: "Cho hai người" },
  { value: "family", label: "Gia đình" },
  { value: "friends", label: "Nhóm bạn" },
  { value: "retreat", label: "Nghỉ dài ngày" }
];

export function StayExplorer({ stays, compact = false }: { stays: Stay[]; compact?: boolean }) {
  const [filter, setFilter] = useState<"all" | StayMood>("all");
  const visible = useMemo(() => filter === "all" ? stays : stays.filter((stay) => stay.mood === filter), [filter, stays]);

  return <div>
    <div className="flex flex-col gap-5 border-y border-lago-ink/10 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-lago-ink/45"><SlidersHorizontal className="h-4 w-4" /> Chọn theo chuyến đi</div>
      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-end">{filters.map((item) => <button key={item.value} onClick={() => setFilter(item.value)} className={`focus-ring shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${filter === item.value ? "bg-lago-ink text-white" : "bg-white text-lago-ink/60 hover:bg-lago-mist"}`}>{item.label}</button>)}</div>
    </div>

    <div className={`mt-7 grid gap-5 ${compact ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-12"}`}>
      {visible.map((stay, index) => <article key={stay.id} className={`group lift overflow-hidden rounded-[30px] border border-lago-ink/10 bg-white ${!compact && visible.length > 2 ? (index % 4 === 0 || index % 4 === 3 ? "xl:col-span-7" : "xl:col-span-5") : ""}`}>
        <Link href={`/luu-tru/${stay.slug}`} className="focus-ring block h-full rounded-[30px]">
          <div className={`image-zoom relative overflow-hidden ${compact ? "aspect-[4/3]" : index % 4 === 0 || index % 4 === 3 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
            <Image src={stay.image} alt={`${stay.name} - ảnh concept`} fill priority={index === 0} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-lago-ink/65 via-transparent to-transparent" />
            <div className="absolute left-4 right-4 top-4 flex items-start justify-between"><span className="rounded-full bg-white/92 px-3 py-1 text-[.62rem] font-bold uppercase tracking-wider backdrop-blur">{stay.badge}</span><span className="grid h-11 w-11 place-items-center rounded-full bg-white/92 text-lago-ink transition duration-300 group-hover:rotate-12 group-hover:bg-lago-ink group-hover:text-white"><ArrowUpRight className="h-5 w-5" /></span></div>
            <div className="absolute bottom-5 left-5 flex items-center gap-2 text-xs font-semibold text-white"><MapPin className="h-4 w-4 text-lago-sand" />{stay.location}</div>
          </div>
          <div className="p-6 sm:p-7">
            <p className="eyebrow text-lago-moss">{stay.subtitle}</p><div className="mt-2 flex items-start justify-between gap-5"><h3 className="display text-3xl font-semibold sm:text-4xl">{stay.name}</h3><p className="shrink-0 text-right text-xs text-lago-ink/45">Từ<br /><strong className="text-base text-lago-ink">{formatCurrency(stay.basePrice)}</strong></p></div>
            <p className="mt-4 line-clamp-2 text-sm leading-6 text-lago-ink/58">{stay.description}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-lago-ink/10 pt-5 text-xs font-semibold text-lago-ink/58"><span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{stay.maxGuests} khách</span><span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" />{stay.bedrooms} phòng ngủ</span>{stay.highlights.slice(0, 1).map((item) => <span key={item} className="text-lago-clay">· {item}</span>)}</div>
          </div>
        </Link>
      </article>)}
    </div>
    <p aria-live="polite" className="sr-only">Đang hiển thị {visible.length} căn nhà</p>
  </div>;
}
