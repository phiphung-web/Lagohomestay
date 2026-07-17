"use client";

import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRangePicker } from "@/features/booking/components/date-range-picker";
import { GuestStepper } from "@/features/booking/components/guest-stepper";

export function AvailabilityBar({ compact = false, bookingPath = "/dat-phong" }: { compact?: boolean; bookingPath?: string }) {
  const router = useRouter();
  const today = new Date();
  const [checkIn, setCheckIn] = useState(format(addDays(today, 1), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(format(addDays(today, 3), "yyyy-MM-dd"));
  const [guests, setGuests] = useState(2);
  const nights = differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`${bookingPath}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return <form onSubmit={submit} className={`grid items-stretch gap-3 ${compact ? "lg:grid-cols-[1.5fr_210px_auto]" : "rounded-[24px] bg-white p-3 shadow-soft md:grid-cols-[1.5fr_210px_auto]"}`}>
    <DateRangePicker checkIn={checkIn} checkOut={checkOut} onChange={(range) => { setCheckIn(range.checkIn); setCheckOut(range.checkOut); }} tone={compact ? "glass" : "light"} />
    <GuestStepper value={guests} onChange={setGuests} tone={compact ? "glass" : "light"} />
    <button className="btn-primary min-w-[178px]" type="submit"><Search className="h-4 w-4" /><span>Tìm căn</span><small className="font-medium text-white/60">· {nights} đêm</small></button>
  </form>;
}
