"use client";

import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import { Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRangePicker } from "@/features/booking/components/date-range-picker";

export function AvailabilityBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const today = new Date();
  const [checkIn, setCheckIn] = useState(format(addDays(today, 1), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(format(addDays(today, 3), "yyyy-MM-dd"));
  const [guests, setGuests] = useState(2);
  const nights = differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/dat-phong?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return <form onSubmit={submit} className={`grid items-stretch gap-3 ${compact ? "lg:grid-cols-[1.5fr_.65fr_auto]" : "rounded-[24px] bg-white p-3 shadow-soft md:grid-cols-[1.5fr_.65fr_auto]"}`}>
    <DateRangePicker checkIn={checkIn} checkOut={checkOut} onChange={(range) => { setCheckIn(range.checkIn); setCheckOut(range.checkOut); }} tone={compact ? "glass" : "light"} />
    <label className="rounded-2xl border border-lago-ink/10 bg-white px-4 py-3 text-lago-ink"><span className="flex items-center gap-2 text-[.62rem] font-bold uppercase tracking-wider text-lago-ink/45"><Users className="h-3.5 w-3.5 text-lago-clay" />Số khách</span><select aria-label="Số khách" value={guests} onChange={(event) => setGuests(Number(event.target.value))} className="mt-1 w-full bg-transparent text-sm font-bold outline-none">{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} khách</option>)}</select></label>
    <button className="btn-primary min-w-[178px]" type="submit"><Search className="h-4 w-4" /><span>Tìm căn</span><small className="font-medium text-white/60">· {nights} đêm</small></button>
  </form>;
}
