"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Menu, Phone, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { TemplateMood } from "@/features/showcase/site/complete-template-site";

type MenuItem = { label: string; href: string; exact?: boolean };

export function TemplateMobileMenu({ name, mood, items, bookingHref, lookupHref, contactHref }: { name: string; mood: TemplateMood; items: MenuItem[]; bookingHref: string; lookupHref: string; contactHref: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const controls = panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); triggerRef.current?.focus(); };
  }, [open]);

  const cinematic = mood === "cinematic";
  const organic = mood === "organic";
  const close = () => setOpen(false);

  return <>
    <button ref={triggerRef} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} aria-label="Mở menu" className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-current/15 lg:hidden"><Menu className="h-5 w-5" /></button>
    {open && typeof document !== "undefined" && createPortal(<div className="fixed inset-0 z-[105] bg-[#06120e]/58 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <section ref={panelRef} role="dialog" aria-modal="true" aria-label={`Menu website mẫu ${name}`} className={`template-menu-enter absolute overflow-y-auto overscroll-contain p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl ${cinematic ? "inset-0 bg-[#07130f] text-white sm:left-auto sm:w-[430px]" : organic ? "inset-x-2 bottom-2 max-h-[calc(100svh-16px)] rounded-[34px] bg-[#eef3df] text-[#21483d] sm:left-auto sm:right-4 sm:w-[430px]" : "bottom-0 right-0 top-0 w-[min(430px,100%)] bg-[#f3eee5] text-[#19322c]"}`}>
        <header className="flex items-center justify-between border-b border-current/12 pb-5"><div><p className="text-[.58rem] font-bold uppercase tracking-[.18em] opacity-45">Lago Homestay</p><p className={`mt-2 ${organic ? "text-2xl font-extrabold" : cinematic ? "text-sm font-extrabold uppercase tracking-[.2em]" : "font-serif text-3xl font-semibold"}`}>Mẫu {name}</p></div><button ref={closeRef} type="button" onClick={close} aria-label="Đóng menu" className={`focus-ring grid h-12 w-12 place-items-center rounded-full ${cinematic ? "border border-white/15" : "bg-white shadow-sm"}`}><X className="h-5 w-5" /></button></header>
        <nav aria-label="Điều hướng mobile" className="mt-6">{items.map((item, index) => { const active = pathname === item.href || (!item.exact && pathname.startsWith(`${item.href}/`)); return <Link key={item.href} href={item.href} onClick={close} aria-current={active ? "page" : undefined} className={`group flex min-h-16 items-center gap-4 border-b border-current/10 px-1 transition ${active ? "opacity-100" : "opacity-58 hover:opacity-100"}`}><span className={`grid h-9 w-9 place-items-center rounded-full text-[.62rem] font-bold ${active ? cinematic ? "bg-[#e5c59c] text-[#07130f]" : organic ? "bg-[#f18b68]" : "bg-[#19322c] text-white" : "border border-current/15"}`}>0{index + 1}</span><span className={`flex-1 ${organic ? "text-lg font-extrabold" : "font-serif text-xl font-medium"}`}>{item.label}</span><ArrowRight className="h-4 w-4 opacity-35 transition group-hover:translate-x-1" /></Link>; })}</nav>
        <div className="mt-7 grid gap-3"><Link href={bookingHref} onClick={close} className={`flex min-h-14 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold ${cinematic ? "bg-[#e5c59c] text-[#07130f]" : organic ? "bg-[#f18b68]" : "bg-[#19322c] text-white"}`}><CalendarDays className="h-4 w-4" />Kiểm tra lịch trống</Link><div className="grid grid-cols-2 gap-3"><Link href={lookupHref} onClick={close} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-current/15 text-xs font-bold"><Search className="h-4 w-4" />Tra cứu</Link><Link href={contactHref} onClick={close} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-current/15 text-xs font-bold"><Phone className="h-4 w-4" />Liên hệ</Link></div></div>
      </section>
    </div>, document.body)}
  </>;
}
