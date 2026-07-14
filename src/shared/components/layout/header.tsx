"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

const links = [
  ["/luu-tru", "Căn nhà"], ["/trai-nghiem", "Trải nghiệm"], ["/thu-vien", "Thư viện"],
  ["/ve-lago", "Về Lago"], ["/thong-tin", "Thông tin"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-lago-ink/10 bg-[#fbfaf6]/90 backdrop-blur-xl">
      <div className="container-lago flex h-[76px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Điều hướng chính">
          {links.map(([href, label]) => <Link className="focus-ring rounded text-sm font-semibold hover:text-lago-clay" key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <Link href="/tra-cuu" className="focus-ring rounded-full px-4 py-2 text-sm font-semibold">Tra cứu đơn</Link>
          <Link href="/dat-phong" className="btn-primary">Kiểm tra lịch</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="focus-ring rounded-lg p-2 sm:hidden" aria-label={open ? "Đóng menu" : "Mở menu"}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-lago-ink/10 bg-[#fbfaf6] px-5 py-5 sm:hidden">
        <nav className="flex flex-col gap-1">{links.map(([href, label]) => <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold" key={href} href={href}>{label}</Link>)}<Link href="/tra-cuu" className="rounded-lg px-3 py-3 font-semibold">Tra cứu đơn</Link><Link href="/dat-phong" className="btn-primary mt-3">Kiểm tra lịch</Link></nav>
      </div>}
    </header>
  );
}
