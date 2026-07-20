"use client";

import Link from "next/link";
import { ArrowLeft, Check, ChevronDown, Layers3, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { showcaseTemplates, type ShowcaseTemplateSlug } from "@/features/showcase/data/templates";
import { getShowcasePageLabel, getShowcaseTemplateHref } from "@/features/showcase/lib/comparison-path";

export function ShowcaseSwitcher({ current }: { current: ShowcaseTemplateSlug }) {
  const [open, setOpen] = useState(false);
  const selected = showcaseTemplates.find((template) => template.slug === current)!;
  const rootRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const pageLabel = getShowcasePageLabel(pathname);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => closeRef.current?.focus());
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const controls = menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    window.addEventListener("keydown", close);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      window.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", closeOutside);
      triggerRef.current?.focus();
    };
  }, [open]);

  return <aside ref={rootRef} aria-label="Chuyển nhanh giữa ba mẫu website" className="fixed left-1/2 z-[70] w-[calc(100%-24px)] max-w-2xl -translate-x-1/2 text-white" style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}>
    <div className="relative mx-auto max-w-[340px] sm:hidden">
      {open && <div ref={menuRef} id="mobile-showcase-options" role="dialog" aria-label={`So sánh ba mẫu tại trang ${pageLabel}`} className="switcher-menu-enter absolute inset-x-0 bottom-[calc(100%+8px)] rounded-[24px] border border-white/15 bg-[#0b190f]/96 p-2 shadow-2xl backdrop-blur-xl"><div className="flex items-center justify-between px-3 pb-2 pt-1"><span className="text-[.6rem] font-bold uppercase tracking-[.16em] text-white/42">So sánh cùng trang · {pageLabel}</span><button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Đóng danh sách mẫu" className="focus-ring grid h-9 w-9 place-items-center rounded-full text-white/55 hover:bg-white/10 hover:text-white"><X className="h-4 w-4" /></button></div><Link href="/" className="focus-ring flex min-h-11 items-center gap-3 rounded-2xl px-3 text-xs font-bold text-white/58 transition hover:bg-white/10 hover:text-white"><ArrowLeft className="h-4 w-4" />Quay lại trang chọn mẫu</Link>{showcaseTemplates.map((template) => <Link key={template.slug} onClick={() => setOpen(false)} href={getShowcaseTemplateHref(template.slug, pathname)} aria-label={`Mở mẫu ${template.name}, cùng trang ${pageLabel}`} aria-current={current === template.slug ? "page" : undefined} className={`focus-ring mt-1 flex min-h-[52px] items-center gap-3 rounded-2xl px-3 text-xs font-bold transition ${current === template.slug ? "bg-white text-lago-ink" : "text-white/58 hover:bg-white/10 hover:text-white"}`}><span className="flex gap-1">{template.colors.map((color) => <i key={color} className="h-2.5 w-2.5 rounded-full border border-current/10" style={{ backgroundColor: color }} />)}</span><span className="flex-1">{template.number} · {template.name}</span>{current === template.slug && <Check className="h-4 w-4" />}</Link>)}</div>}
      <button ref={triggerRef} type="button" onClick={() => setOpen((value) => !value)} aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-showcase-options" className="focus-ring flex min-h-[52px] w-full items-center gap-3 rounded-full border border-white/20 bg-[#0b190f]/94 px-4 text-xs font-bold shadow-2xl backdrop-blur-xl"><span className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><Layers3 className="h-4 w-4 text-[#c7a882]" /></span><span className="flex-1 text-left"><small className="block text-[.52rem] uppercase tracking-[.13em] text-white/38">{pageLabel} · đang xem</small><strong className="mt-0.5 block">{selected.number} · {selected.name}</strong></span><ChevronDown className={`h-4 w-4 text-white/45 transition ${open ? "rotate-180" : ""}`} /></button>
    </div>

    <div className="hidden items-center gap-2 rounded-full border border-white/20 bg-[#0b190f]/92 p-2 shadow-2xl backdrop-blur-xl sm:flex"><Link href="/" className="focus-ring flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-xs font-bold text-white/62 transition hover:bg-white/10 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Chọn mẫu</Link><div className="flex flex-1 gap-1">{showcaseTemplates.map((template) => <Link key={template.slug} href={getShowcaseTemplateHref(template.slug, pathname)} aria-label={`Mở mẫu ${template.name}, cùng trang ${pageLabel}`} aria-current={current === template.slug ? "page" : undefined} className={`focus-ring flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-bold transition ${current === template.slug ? "bg-white text-lago-ink" : "text-white/55 hover:bg-white/10 hover:text-white"}`}>{current === template.slug && <Check className="h-3.5 w-3.5" />} {template.number} · {template.name}</Link>)}</div></div>
  </aside>;
}
