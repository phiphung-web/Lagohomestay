"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { restaurantMenuPages } from "@/features/showcase/data/dining-menu";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import styles from "./restaurant-menu-gallery.module.css";

export function RestaurantMenuGallery({ locale }: { locale: ShowcaseLocale }) {
  const en = locale === "en";
  const id = useId();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const page = restaurantMenuPages[active];
  const count = restaurantMenuPages.length;
  const pageNumber = String(active + 1).padStart(2, "0");
  const title = page.title[locale];
  const alt = en
    ? `LAKA restaurant menu — ${title}. Original menu in Vietnamese.`
    : `Thực đơn nhà hàng LAKA — ${title}`;

  function selectPage(index: number) {
    setActive((index + count) % count);
    setZoomed(false);
    touchStartRef.current = null;
    viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  function openMenu(trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    setZoomed(false);
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  function renderPagePicker(pickerId: string) {
    return <>
      <label htmlFor={pickerId} className="sr-only">{en ? "Choose a menu category" : "Chọn nhóm món"}</label>
      <select id={pickerId} value={active} onChange={(event) => selectPage(Number(event.target.value))} className={`focus-ring ${styles.select}`}>
        {restaurantMenuPages.map((item, index) => <option key={item.id} value={index}>
          {String(index + 1).padStart(2, "0")} · {item.title[locale]}
        </option>)}
      </select>
    </>;
  }

  function renderPagination() {
    return <div className={styles.pagination}>
      <button type="button" onClick={() => selectPage(active - 1)} aria-label={en ? "Previous menu page" : "Trang menu trước"} className={`focus-ring ${styles.iconButton}`}>
        <ChevronLeft aria-hidden="true" size={19} />
      </button>
      <span aria-live="polite" aria-atomic="true" className={styles.pageCount}>
        <span className="sr-only">{title} · </span>{pageNumber} <span className="opacity-40">/ {count}</span>
      </span>
      <button type="button" onClick={() => selectPage(active + 1)} aria-label={en ? "Next menu page" : "Trang menu tiếp theo"} className={`focus-ring ${styles.iconButton}`}>
        <ChevronRight aria-hidden="true" size={19} />
      </button>
    </div>;
  }

  return <section id="thuc-don" aria-labelledby={`${id}-heading`} className="scroll-mt-24 border-t border-[#16311c]/15 pt-12 sm:pt-16">
    <header className="mb-7 flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="laka-eyebrow text-[#80613f]">{en ? "Lakeside Restaurant" : "Nhà Hàng Ven Hồ"}</p>
        <h2 id={`${id}-heading`} className="laka-heading-section mt-3">{en ? "Restaurant menu" : "Thực đơn nhà hàng"}</h2>
      </div>
      <p className="max-w-sm text-sm leading-6 text-[#16311c]/65">
        {en ? "Choose a category and enlarge the menu to explore each dish. Menu images are in Vietnamese." : "Chọn nhóm món, mở ảnh để xem rõ món ăn và giá."}
      </p>
    </header>

    <div className={styles.browser}>
      <nav aria-label={en ? "Restaurant menu categories" : "Các nhóm món nhà hàng"} className={styles.categories}>
        <p className="laka-eyebrow mb-4 px-3 text-[#80613f]">{en ? "Explore the menu" : "Chọn món theo nhóm"}</p>
        {restaurantMenuPages.map((item, index) => <button
          key={item.id}
          type="button"
          aria-current={active === index ? "true" : undefined}
          aria-controls={`${id}-preview`}
          onClick={() => selectPage(index)}
          className={`focus-ring ${styles.category} ${active === index ? styles.activeCategory : ""}`}
        >
          <span className={styles.categoryNumber}>{String(index + 1).padStart(2, "0")}</span>
          <span>{item.title[locale]}</span>
          {active === index && <ChevronRight aria-hidden="true" size={16} className="ml-auto shrink-0" />}
        </button>)}
        <p className="mt-5 px-3 text-xs leading-6 text-[#16311c]/60">{en ? "All 10 pages belong to the restaurant, including drinks." : "10 trang thực đơn nhà hàng, bao gồm cả đồ uống."}</p>
      </nav>

      <div id={`${id}-preview`} className={styles.viewer}>
        <div className={styles.toolbar}>
          <div className={styles.mobilePicker}>{renderPagePicker(`${id}-category`)}</div>
          <h3 className={styles.currentTitle}>{title}</h3>
          <button type="button" onClick={(event) => openMenu(event.currentTarget)} aria-haspopup="dialog" className={`focus-ring ${styles.textButton}`}>
            <Expand aria-hidden="true" size={16} />{en ? "Enlarge" : "Phóng to"}
          </button>
        </div>
        <button
          type="button"
          onClick={(event) => openMenu(event.currentTarget)}
          aria-label={en ? `Enlarge menu: ${title}` : `Phóng to menu: ${title}`}
          aria-haspopup="dialog"
          className={`focus-ring ${styles.preview}`}
        >
          <Image key={page.src} src={page.src} alt={alt} width={page.width} height={page.height} unoptimized className={styles.previewImage} />
        </button>
        <div className={styles.toolbar}>
          <span className="hidden text-xs text-[#16311c]/60 sm:block">{en ? "Click the image for a closer look" : "Bấm vào ảnh để xem rõ hơn"}</span>
          {renderPagination()}
        </div>
      </div>
    </div>

    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-dialog-title`}
      onCancel={(event) => { event.preventDefault(); setOpen(false); }}
      onClose={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          setOpen(false);
          return;
        }
        if (zoomed || event.target instanceof HTMLSelectElement || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          selectPage(active + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
      className={styles.dialog}
    >
      {open && <div className={styles.dialogLayout}>
        <header className={styles.dialogHeader}>
          <div className="min-w-0 flex-1">
            <p id={`${id}-dialog-title`} className="mb-1 text-xs font-semibold text-[#16311c]/60">{en ? "LAKA · Restaurant menu" : "LAKA · Thực đơn nhà hàng"}</p>
            {renderPagePicker(`${id}-dialog-category`)}
          </div>
          <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label={en ? "Close menu" : "Đóng thực đơn"} className={`focus-ring ${styles.iconButton}`}><X aria-hidden="true" size={22} /></button>
        </header>
        <div
          ref={viewportRef}
          className={`${styles.dialogViewport} ${zoomed ? styles.zoomed : ""}`}
          onTouchStart={(event) => {
            touchStartRef.current = !zoomed && event.touches.length === 1
              ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
              : null;
          }}
          onTouchCancel={() => { touchStartRef.current = null; }}
          onTouchEnd={(event) => {
            const start = touchStartRef.current;
            touchStartRef.current = null;
            if (zoomed || !start || event.touches.length || !event.changedTouches.length) return;
            const dx = event.changedTouches[0].clientX - start.x;
            const dy = event.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) selectPage(active + (dx < 0 ? 1 : -1));
          }}
        >
          <Image key={page.src} src={page.src} alt={alt} width={page.width} height={page.height} unoptimized loading="eager" draggable={false} className={styles.dialogImage} />
        </div>
        <footer className={styles.dialogFooter}>
          {renderPagination()}
          <button type="button" aria-pressed={zoomed} onClick={() => { setZoomed(!zoomed); viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" }); }} className={`focus-ring ${styles.textButton}`}>
            {zoomed ? <ZoomOut aria-hidden="true" size={18} /> : <ZoomIn aria-hidden="true" size={18} />}
            {zoomed ? (en ? "Fit page" : "Vừa màn hình") : (en ? "Zoom in" : "Đọc rõ hơn")}
          </button>
          <a href={page.src} target="_blank" rel="noopener noreferrer" className={`focus-ring ${styles.originalLink}`}>
            {en ? "Open image" : "Mở ảnh"}<ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </footer>
      </div>}
    </dialog>
  </section>;
}
