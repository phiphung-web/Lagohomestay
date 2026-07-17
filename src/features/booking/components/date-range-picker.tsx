"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek
} from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarDays, ChevronLeft, ChevronRight, Moon, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  checkIn: string;
  checkOut: string;
  onChange: (range: { checkIn: string; checkOut: string }) => void;
  className?: string;
  tone?: "light" | "glass";
};

const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function CalendarMonth({
  month,
  start,
  end,
  onSelect
}: {
  month: Date;
  start: Date | null;
  end: Date | null;
  onSelect: (date: Date) => void;
}) {
  const today = startOfDay(new Date());
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 })
  });

  return <div className="min-w-0">
    <p className="mb-5 text-center text-sm font-bold capitalize">{format(month, "MMMM yyyy", { locale: vi })}</p>
    <div className="grid grid-cols-7 text-center text-[.62rem] font-bold uppercase tracking-wider text-lago-ink/38">
      {weekDays.map((day) => <span className="pb-2" key={day}>{day}</span>)}
    </div>
    <div className="grid grid-cols-7 gap-y-1">
      {days.map((day) => {
        const disabled = isBefore(day, today) || !isSameMonth(day, month);
        const selectedStart = Boolean(start && isSameDay(day, start));
        const selectedEnd = Boolean(end && isSameDay(day, end));
        const inRange = Boolean(start && end && isWithinInterval(day, { start, end }));
        return <button
          type="button"
          key={day.toISOString()}
          disabled={disabled}
          aria-label={format(day, "EEEE, dd/MM/yyyy", { locale: vi })}
          aria-pressed={selectedStart || selectedEnd}
          onClick={() => onSelect(day)}
          className={`focus-ring relative grid aspect-square min-h-10 place-items-center rounded-xl text-xs font-semibold transition sm:min-h-11 ${
            selectedStart || selectedEnd
              ? "z-10 bg-lago-forest text-white shadow-lg"
              : inRange
                ? "rounded-none bg-lago-mist text-lago-ink"
                : disabled
                  ? "cursor-default text-lago-ink/18"
                  : "hover:bg-lago-cream"
          }`}
        >{format(day, "d")}</button>;
      })}
    </div>
  </div>;
}

export function DateRangePicker({ checkIn, checkOut, onChange, className = "", tone = "light" }: Props) {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(startOfMonth(parseISO(checkIn)));
  const [draftStart, setDraftStart] = useState<Date | null>(parseISO(checkIn));
  const [draftEnd, setDraftEnd] = useState<Date | null>(parseISO(checkOut));

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [open]);

  const nights = useMemo(() => {
    if (!draftStart || !draftEnd) return 0;
    return Math.round((draftEnd.getTime() - draftStart.getTime()) / 86_400_000);
  }, [draftEnd, draftStart]);
  const currentMonth = startOfMonth(new Date());
  const cannotGoBack = !isBefore(currentMonth, viewMonth);

  const selectDate = (date: Date) => {
    if (!draftStart || draftEnd || !isBefore(draftStart, date)) {
      setDraftStart(date);
      setDraftEnd(null);
      return;
    }
    setDraftEnd(date);
    onChange({ checkIn: format(draftStart, "yyyy-MM-dd"), checkOut: format(date, "yyyy-MM-dd") });
  };

  const openPicker = () => {
    setDraftStart(parseISO(checkIn));
    setDraftEnd(parseISO(checkOut));
    setViewMonth(startOfMonth(parseISO(checkIn)));
    setOpen(true);
  };

  return <div className={className}>
    <button
      type="button"
      onClick={openPicker}
      className={`focus-ring grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${tone === "glass" ? "border-white/20 bg-white/95 text-lago-ink hover:bg-white" : "border-lago-ink/10 bg-white hover:border-lago-forest/35"}`}
      aria-haspopup="dialog"
      aria-expanded={open}
    >
      <span><small className="block text-[.62rem] font-bold uppercase tracking-wider text-lago-ink/45">Ngày đến</small><strong className="mt-1 block text-sm">{format(parseISO(checkIn), "dd/MM/yyyy")}</strong></span>
      <CalendarDays className="h-5 w-5 text-lago-clay" />
      <span className="text-right"><small className="block text-[.62rem] font-bold uppercase tracking-wider text-lago-ink/45">Ngày về</small><strong className="mt-1 block text-sm">{format(parseISO(checkOut), "dd/MM/yyyy")}</strong></span>
    </button>

    {open && typeof document !== "undefined" && createPortal(<div className="fixed inset-0 z-[100] flex items-end bg-lago-ink/65 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-5" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section role="dialog" aria-modal="true" aria-label="Chọn ngày lưu trú" className="calendar-sheet max-h-[calc(100svh-12px)] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-[30px] bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-lago-ink shadow-2xl sm:max-h-[calc(100svh-40px)] sm:rounded-[30px] sm:p-7">
        <header className="flex items-start justify-between gap-4 border-b border-lago-ink/10 pb-5">
          <div><p className="eyebrow text-lago-clay">Lịch lưu trú</p><h2 className="display mt-1 text-2xl font-semibold">Bạn muốn nghỉ khi nào?</h2><p className="mt-2 text-xs text-lago-ink/50">{draftEnd ? `${nights} đêm đã chọn` : "Chọn ngày về để hoàn tất"}</p></div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Đóng lịch" className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lago-cream"><X className="h-5 w-5" /></button>
        </header>
        <div className="my-5 flex items-center justify-between">
          <button type="button" disabled={cannotGoBack} onClick={() => setViewMonth((month) => addMonths(month, -1))} aria-label="Tháng trước" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-lago-ink/10 disabled:opacity-25"><ChevronLeft className="h-4 w-4" /></button>
          <span className="flex items-center gap-2 text-xs font-semibold text-lago-ink/48"><Moon className="h-4 w-4" /> Chọn tối thiểu 1 đêm</span>
          <button type="button" onClick={() => setViewMonth((month) => addMonths(month, 1))} aria-label="Tháng sau" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-lago-ink/10"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <CalendarMonth month={viewMonth} start={draftStart} end={draftEnd} onSelect={selectDate} />
          <div className="hidden sm:block"><CalendarMonth month={addMonths(viewMonth, 1)} start={draftStart} end={draftEnd} onSelect={selectDate} /></div>
        </div>
        <footer className="sticky bottom-0 z-10 -mx-1 mt-6 flex items-center justify-between gap-4 border-t border-lago-ink/10 bg-white px-1 pb-1 pt-5">
          <p className="text-xs text-lago-ink/50"><strong className="text-lago-ink">{draftStart ? format(draftStart, "dd/MM") : "—"}</strong> → <strong className="text-lago-ink">{draftEnd ? format(draftEnd, "dd/MM") : "Chọn ngày về"}</strong></p>
          <button type="button" disabled={!draftEnd} onClick={() => setOpen(false)} className="btn-primary min-w-32">Xong</button>
        </footer>
      </section>
    </div>, document.body)}
  </div>;
}
