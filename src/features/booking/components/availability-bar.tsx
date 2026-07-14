"use client";

import { addDays, format } from "date-fns";
import { CalendarDays, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AvailabilityBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const today = new Date();
  const [checkIn, setCheckIn] = useState(format(addDays(today, 1), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(format(addDays(today, 3), "yyyy-MM-dd"));
  const [guests, setGuests] = useState(2);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/dat-phong?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };
  return <form onSubmit={submit} className={`grid gap-3 ${compact ? "lg:grid-cols-[1fr_1fr_.75fr_auto]" : "rounded-[24px] bg-white p-4 shadow-soft md:grid-cols-[1fr_1fr_.75fr_auto]"}`}>
    <label className="group rounded-xl border border-lago-ink/10 bg-white px-4 py-2"><span className="flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-wider text-lago-ink/50"><CalendarDays className="h-3.5 w-3.5"/>Nhận phòng</span><input aria-label="Ngày nhận phòng" min={format(today, "yyyy-MM-dd")} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} type="date" className="mt-1 w-full bg-transparent font-semibold outline-none" required/></label>
    <label className="rounded-xl border border-lago-ink/10 bg-white px-4 py-2"><span className="flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-wider text-lago-ink/50"><CalendarDays className="h-3.5 w-3.5"/>Trả phòng</span><input aria-label="Ngày trả phòng" min={checkIn} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} type="date" className="mt-1 w-full bg-transparent font-semibold outline-none" required/></label>
    <label className="rounded-xl border border-lago-ink/10 bg-white px-4 py-2"><span className="flex items-center gap-2 text-[.65rem] font-bold uppercase tracking-wider text-lago-ink/50"><Users className="h-3.5 w-3.5"/>Số khách</span><select aria-label="Số khách" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="mt-1 w-full bg-transparent font-semibold outline-none">{Array.from({length: 12}, (_, i) => <option key={i+1} value={i+1}>{i+1} khách</option>)}</select></label>
    <button className="btn-primary min-w-[150px]" type="submit"><Search className="h-4 w-4"/>Tìm phòng</button>
  </form>;
}
