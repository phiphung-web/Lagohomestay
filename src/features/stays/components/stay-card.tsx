import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, Users } from "lucide-react";
import type { Stay } from "@/features/stays/data/demo-data";
import { formatCurrency } from "@/shared/lib/format";

export function StayCard({ stay }: { stay: Stay }) {
  return <article className="group image-zoom overflow-hidden rounded-[28px] bg-white shadow-soft">
    <Link href={`/luu-tru/${stay.slug}`} className="focus-ring block rounded-[28px]">
      <div className="relative aspect-[4/3] overflow-hidden"><Image src={stay.image} alt={`Ảnh concept ${stay.name}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover"/><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[.65rem] font-bold uppercase tracking-wider backdrop-blur">Ảnh concept</span></div>
      <div className="p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-lago-moss">{stay.subtitle}</p><h3 className="display mt-1 text-3xl font-semibold">{stay.name}</h3></div><span className="grid h-11 w-11 place-items-center rounded-full border border-lago-ink/15 transition group-hover:bg-lago-ink group-hover:text-white"><ArrowUpRight className="h-5 w-5"/></span></div>
      <p className="mt-4 line-clamp-2 text-sm leading-6 text-lago-ink/65">{stay.description}</p><div className="mt-5 flex items-center gap-5 border-t border-lago-ink/10 pt-5 text-xs font-semibold text-lago-ink/65"><span className="flex items-center gap-1.5"><Users className="h-4 w-4"/>Tối đa {stay.maxGuests}</span><span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4"/>{stay.bedrooms} phòng ngủ</span></div><p className="mt-4 text-sm"><strong className="text-lg">{formatCurrency(stay.basePrice)}</strong> / đêm</p></div>
    </Link>
  </article>;
}
