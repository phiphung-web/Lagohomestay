"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { BookingModal } from "@/features/showcase/components/booking-modal";

const links = [
  ["/luu-tru", "Các căn nhà"], ["/trai-nghiem", "Trải nghiệm"], ["/am-thuc", "Ẩm thực"],
  ["/ve-laka", "Về LAKA"], ["/thong-tin", "Thông tin"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-lago-ink/10 bg-[#fbfaf6]/90 backdrop-blur-xl">
        <div className="container-lago flex h-[76px] items-center justify-between">
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setOpen(!open)} className="focus-ring rounded-lg p-2" aria-label={open ? "Đóng menu" : "Mở menu"}>{open ? <X /> : <Menu />}</button>
          </div>
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Điều hướng chính">
            {links.map(([href, label]) => <Link className="focus-ring rounded text-sm font-semibold hover:text-lago-clay" key={href} href={href}>{label}</Link>)}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setBookingOpen(true)} className="btn-primary rounded-full px-4 py-2 text-xs sm:text-sm">Đặt ngay</button>
          </div>
        </div>
        {open && <div className="border-t border-lago-ink/10 bg-[#fbfaf6] px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-1">{links.map(([href, label]) => <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold" key={href} href={href}>{label}</Link>)}<button onClick={() => { setOpen(false); setBookingOpen(true); }} className="btn-primary mt-3 w-full">Đặt ngay</button></nav>
        </div>}
      </header>
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
