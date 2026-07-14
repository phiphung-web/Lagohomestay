import Link from "next/link";
import { CalendarDays } from "lucide-react";

export function MobileBookingCta() {
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-lago-ink/10 bg-white/95 p-3 backdrop-blur md:hidden"><Link href="/dat-phong" className="btn-primary w-full"><CalendarDays className="h-5 w-5"/>Xem lịch trống</Link></div>;
}
