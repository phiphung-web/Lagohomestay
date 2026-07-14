"use client";

import Link from "next/link";
import { BedDouble, CalendarDays, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/shared/components/layout/logo";

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  return <div className="border-b border-lago-ink/10 bg-white lg:hidden">
    <div className="flex h-16 items-center justify-between px-4"><Logo /><button onClick={() => setOpen(!open)} className="rounded-lg p-2" aria-label="Mở điều hướng">{open ? <X /> : <Menu />}</button></div>
    {open && <nav className="grid gap-1 border-t p-4"><Link href="/admin/tong-quan" className="flex gap-2 rounded-lg p-3"><LayoutDashboard />Tổng quan</Link><Link href="/admin/lich" className="flex gap-2 rounded-lg p-3"><CalendarDays />Lịch căn</Link><Link href="/admin/booking" className="flex gap-2 rounded-lg p-3"><BedDouble />Booking</Link></nav>}
  </div>;
}
