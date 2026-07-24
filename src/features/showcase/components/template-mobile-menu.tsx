"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Menu, Phone, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { TemplateMood } from "@/features/showcase/site/complete-template-site";
import { BrandLogo } from "@/shared/components/brand/brand-logo";
import { languageHref, type ShowcaseLocale } from "@/features/showcase/i18n/locale";

type MenuItem = { label: string; href: string; exact?: boolean };

export function TemplateMobileMenu({ name, mood, items, bookingHref, lookupHref, contactHref, locale = "vi", wideHeader = false }: { name: string; mood: TemplateMood; items: MenuItem[]; bookingHref: string; lookupHref: string; contactHref: string; locale?: ShowcaseLocale; wideHeader?: boolean }) {
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
    <button ref={triggerRef} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} aria-label={locale === "en" ? "Open menu" : "Mở menu"} className={`focus-ring grid h-11 w-11 place-items-center rounded-full border border-current/15 ${wideHeader ? "xl:hidden" : "lg:hidden"}`}><Menu className="h-5 w-5" /></button>
    {open && typeof document !== "undefined" && createPortal(<div className="fixed inset-0 z-[105] bg-[#06120e]/58 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <section ref={panelRef} role="dialog" aria-modal="true" aria-label={locale === "en" ? `${name} website menu` : `Menu website mẫu ${name}`} className={`template-menu-enter absolute overflow-y-auto overscroll-contain p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl ${cinematic ? "inset-0 bg-[#0b190f] text-white sm:left-auto sm:w-[430px]" : organic ? "inset-x-2 bottom-2 max-h-[calc(100svh-16px)] rounded-[34px] bg-[#eef3df] text-[#16311c] sm:left-auto sm:right-4 sm:w-[430px]" : "bottom-0 right-0 top-0 w-[min(430px,100%)] bg-[#eae1d2] text-[#16311c]"}`}>
        <header className="flex items-center justify-between border-b border-current/12 pb-5"><div><BrandLogo variant="wordmark" className="w-[112px]" /><p className={`mt-3 ${organic ? "text-lg font-extrabold" : cinematic ? "text-xs font-extrabold uppercase tracking-[.18em]" : "font-serif text-xl font-semibold"}`}>{locale === "en" ? "Concept" : "Mẫu"} {name}</p></div><button ref={closeRef} type="button" onClick={close} aria-label={locale === "en" ? "Close menu" : "Đóng menu"} className={`focus-ring grid h-12 w-12 place-items-center rounded-full ${cinematic ? "border border-white/15" : "bg-white shadow-sm"}`}><X className="h-5 w-5" /></button></header>
        {mood === "editorial" && <div className="mt-5 flex items-center justify-between rounded-full border border-current/12 p-1 pl-4 text-xs font-bold"><span className="opacity-55">{locale === "en" ? "Language" : "Ngôn ngữ"}</span><div className="flex gap-1">{(["vi", "en"] as const).map((item) => <Link key={item} href={languageHref(pathname, item)} onClick={close} hrefLang={item} className={`grid h-10 min-w-12 place-items-center rounded-full uppercase ${locale === item ? "bg-[#16311c] text-white" : "opacity-55"}`}>{item}</Link>)}</div></div>}
        <nav aria-label={locale === "en" ? "Mobile navigation" : "Điều hướng mobile"} className="mt-6">{items.map((item, index) => { const active = pathname === item.href || (!item.exact && pathname.startsWith(`${item.href}/`)); return <Link key={item.href} href={item.href} onClick={close} aria-current={active ? "page" : undefined} className={`group flex min-h-16 items-center gap-4 border-b border-current/10 px-1 transition ${active ? "opacity-100" : "opacity-80 hover:opacity-100"}`}><span className={`grid h-9 w-9 place-items-center rounded-full text-[.62rem] font-bold ${active ? cinematic ? "bg-[#c7a882] text-[#0b190f]" : organic ? "bg-[#f18b68] text-[#16311c]" : "bg-[#16311c] text-white" : "border border-current/15"}`}>0{index + 1}</span><span className={`flex-1 ${organic ? "text-lg font-extrabold" : "font-serif text-xl font-medium"}`}>{item.label}</span><ArrowRight aria-hidden="true" className="h-4 w-4 opacity-35 transition group-hover:translate-x-1" /></Link>; })}</nav>
        <div className="mt-7 grid gap-3"><Link href={bookingHref} onClick={close} className={`flex min-h-14 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold ${cinematic ? "bg-[#c7a882] text-[#0b190f]" : organic ? "bg-[#f18b68]" : "bg-[#16311c] text-white"}`}><CalendarDays className="h-4 w-4" />{locale === "en" ? "Check availability" : "Kiểm tra lịch trống"}</Link><div className="grid grid-cols-2 gap-3"><Link href={lookupHref} onClick={close} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-current/15 text-xs font-bold"><Search className="h-4 w-4" />{locale === "en" ? "Find booking" : "Tra cứu"}</Link><Link href={contactHref} onClick={close} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-current/15 text-xs font-bold"><Phone className="h-4 w-4" />{locale === "en" ? "Contact" : "Liên hệ"}</Link></div></div>
      </section>
    </div>, document.body)}
  </>;
}
