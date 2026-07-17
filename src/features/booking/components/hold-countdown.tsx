"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function getRemaining(expiresAt: string) {
  return Math.max(0, new Date(expiresAt).getTime() - Date.now());
}

export function HoldCountdown({ expiresAt }: { expiresAt: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    setRemaining(getRemaining(expiresAt));
    const timer = window.setInterval(() => setRemaining(getRemaining(expiresAt)), 1000);
    return () => window.clearInterval(timer);
  }, [expiresAt]);

  const label = useMemo(() => {
    if (remaining === null) return "--:--:--";
    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
  }, [remaining]);

  if (remaining === null) return <div className="mt-7 flex items-center justify-center gap-3 rounded-2xl border border-lago-forest/12 bg-lago-mist/55 px-5 py-4 text-sm font-bold text-lago-ink"><span className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm"><Clock3 className="h-4 w-4" /></span>Đang tính thời gian giữ chỗ…</div>;

  return <div role="timer" aria-label={remaining > 0 ? `Thời gian giữ chỗ còn lại ${label}` : "Thời gian giữ chỗ đã kết thúc"} className={`mt-7 flex items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-sm font-bold ${remaining > 0 ? "border-lago-forest/12 bg-lago-mist/55 text-lago-ink" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
    <span className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm"><Clock3 className="h-4 w-4" /></span>
    {remaining > 0 ? <span>Thời gian giữ dự kiến còn <strong className="ml-1 tabular-nums">{label}</strong></span> : <span>Thời gian giữ dự kiến đã kết thúc</span>}
  </div>;
}
