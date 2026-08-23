"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  House,
  MapPin,
  Users,
  X
} from "lucide-react";
import { getUnitsForStay, stays, stayZones } from "@/features/stays/data/demo-data";
import { localizeStay, localizeStayZone } from "@/features/showcase/i18n/showcase-copy";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";

type DetailSection = "overview" | "amenities" | "policies";

const sharedPolicies = {
  vi: [
    ["Nhận và trả căn", "Khung giờ chính thức chưa được công bố. LAKA xác nhận cùng thông tin căn và lịch trống trước chuyến đi."],
    ["Số khách", "Số khách không vượt quá sức chứa công bố. Thông tin dành cho trẻ em sẽ được hoàn thiện trước khi LAKA đón khách."],
    ["Không gian yên tĩnh", "Giữ âm lượng vừa phải sau 22:00 và trao đổi trước với LAKA nếu có hoạt động nhóm."],
    ["Thông tin vận hành", "Các điều kiện lưu trú chính thức sẽ được công bố rõ ràng trước khi LAKA mở cửa."]
  ],
  en: [
    ["Arrival and departure", "Official times are not yet published. LAKA confirms them with the unit and availability details before the stay."],
    ["Guest numbers", "Guest numbers may not exceed the stated capacity. Child information will be completed before LAKA welcomes guests."],
    ["A quiet setting", "Please keep noise considerate after 10 pm and discuss group activities with LAKA in advance."],
    ["Operating information", "Final stay terms will be published clearly before LAKA opens."]
  ]
} as const;

function localizedUnit(
  unit: ReturnType<typeof getUnitsForStay>[number],
  locale: ShowcaseLocale
) {
  return {
    ...unit,
    name: locale === "en" ? unit.nameEn : unit.name,
    position: locale === "en" ? unit.positionEn : unit.position,
    character: locale === "en" ? unit.characterEn : unit.character
  };
}

export function StayProductExplorer({
  basePath,
  locale = "vi"
}: {
  basePath: string;
  locale?: ShowcaseLocale;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const openedByInteractionRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [detailSection, setDetailSection] = useState<DetailSection>("overview");
  const [galleryIndex, setGalleryIndex] = useState(0);

  const localizedZones = useMemo(
    () => stayZones.map((zone) => localizeStayZone(zone, locale)),
    [locale]
  );
  const localizedStays = useMemo(
    () => stays.map((stay) => localizeStay(stay, locale)),
    [locale]
  );

  const zoneParam = searchParams.get("khu");
  const activeZoneSlug = localizedZones.some((zone) => zone.slug === zoneParam)
    ? zoneParam
    : null;
  const stayParam = searchParams.get("can");
  const activeStay = localizedStays.find((stay) => stay.slug === stayParam) ?? null;
  const activeZone = activeZoneSlug
    ? localizedZones.find((zone) => zone.slug === activeZoneSlug) ?? null
    : null;
  const visibleStays = activeZone
    ? localizedStays.filter((stay) => stay.zoneId === activeZone.id)
    : localizedStays;

  const setQuery = useCallback((changes: Record<string, string | null>, mode: "push" | "replace" = "push") => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    const href = next.size ? `${pathname}?${next.toString()}` : pathname;
    router[mode](href, { scroll: false });
  }, [pathname, router, searchParams]);

  const openStay = (slug: string, zoneSlug: string, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    openedByInteractionRef.current = true;
    setDetailSection("overview");
    setGalleryIndex(0);
    setQuery({ can: slug, khu: zoneSlug });
  };

  const closeStay = useCallback(() => {
    if (openedByInteractionRef.current) {
      openedByInteractionRef.current = false;
      router.back();
      return;
    }
    setQuery({ can: null }, "replace");
  }, [router, setQuery]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!activeStay) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeStay();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])"
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [activeStay, closeStay]);

  const tabs = [
    { slug: null, label: locale === "en" ? "All" : "Tất cả", count: localizedStays.length },
    ...localizedZones.map((zone) => ({
      slug: zone.slug,
      label: locale === "en" ? zone.name.replace(" Collection", "") : zone.name.replace(/^Hệ\s+/, ""),
      count: localizedStays.filter((stay) => stay.zoneId === zone.id).length
    }))
  ];

  const policies = sharedPolicies[locale];
  const selectedZone = activeStay
    ? localizedZones.find((zone) => zone.id === activeStay.zoneId)
    : null;
  const selectedUnits = activeStay
    ? getUnitsForStay(activeStay.id).map((unit) => localizedUnit(unit, locale))
    : [];
  const gallery = activeStay ? [activeStay.image, ...activeStay.gallery] : [];

  const modal = mounted && activeStay && selectedZone
    ? createPortal(
      <div className="fixed inset-0 z-[100] bg-[#07140f]/78 p-0 backdrop-blur-md lg:p-4" role="presentation">
        <button
          type="button"
          aria-label={locale === "en" ? "Close home details" : "Đóng chi tiết căn"}
          className="absolute inset-0 cursor-default"
          onClick={closeStay}
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="stay-dialog-title"
          className="relative mx-auto h-[100svh] max-w-[1500px] overflow-y-auto bg-[#f4efe7] text-[#16311c] shadow-[0_36px_120px_rgba(0,0,0,.38)] lg:grid lg:h-[calc(100svh-32px)] lg:grid-cols-[1.08fr_.92fr] lg:overflow-hidden lg:rounded-[32px]"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeStay}
            aria-label={locale === "en" ? "Close" : "Đóng"}
            className="absolute right-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-[#f4efe7] text-[#16311c] shadow-lg transition hover:rotate-90 lg:right-6 lg:top-6"
          >
            <X className="h-5 w-5" />
          </button>
          <section className="relative h-[30svh] min-h-[230px] overflow-hidden bg-[#10251d] sm:h-[38svh] sm:min-h-[300px] lg:h-full">
            <Image
              src={gallery[galleryIndex]}
              alt={`${activeStay.name} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 56vw"
              className="object-cover transition duration-700"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#07140f]/74 via-transparent to-black/20" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
              <div>
                <p className="text-[.58rem] font-bold uppercase tracking-[.18em] text-white/68">
                  {selectedZone.name} · {locale === "en" ? "Concept image" : "Hình ảnh minh họa"}
                </p>
                <p className="mt-2 font-serif text-3xl font-medium sm:text-4xl">{activeStay.name}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label={locale === "en" ? "Previous image" : "Ảnh trước"}
                  onClick={() => setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/28 bg-black/22 backdrop-blur transition hover:bg-white hover:text-[#16311c]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label={locale === "en" ? "Next image" : "Ảnh tiếp theo"}
                  onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/28 bg-black/22 backdrop-blur transition hover:bg-white hover:text-[#16311c]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <span className="absolute left-5 top-5 rounded-full border border-white/22 bg-black/20 px-3 py-1.5 text-[.58rem] font-bold tracking-[.14em] text-white backdrop-blur sm:left-7 sm:top-7">
              {String(galleryIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
            </span>
          </section>

          <section className="relative flex min-h-full min-w-0 flex-col overflow-x-hidden lg:h-full lg:overflow-y-auto">
            <div className="px-5 pb-5 pt-6 sm:px-9 sm:pb-6 sm:pt-8 lg:px-11 lg:pr-20">
              <p className="text-[.6rem] font-bold uppercase tracking-[.2em] text-[#80613f]">
                {selectedZone.name} · {activeStay.badge}
              </p>
              <h2 id="stay-dialog-title" className="mt-3 font-serif text-4xl font-medium leading-[.95] tracking-[-.045em] sm:mt-4 sm:text-5xl">
                {activeStay.name}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#16311c]/68">{activeStay.subtitle}</p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-y border-[#16311c]/12 py-5 text-xs font-bold">
                <span className="flex items-center gap-2"><Users className="h-4 w-4 text-[#80613f]" />{activeStay.maxGuests > 0 ? `${activeStay.maxGuests} ${locale === "en" ? "guests" : "khách"}` : (locale === "en" ? "Capacity pending" : "Đang xác nhận sức chứa")}</span>
                {activeStay.bedrooms > 0 && <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-[#80613f]" />{activeStay.bedrooms} {locale === "en" ? "bedrooms" : "phòng ngủ"}</span>}
                {activeStay.bathrooms > 0 && <span className="flex items-center gap-2"><Bath className="h-4 w-4 text-[#80613f]" />{activeStay.bathrooms} {locale === "en" ? "bathrooms" : "phòng tắm"}</span>}
                {activeStay.area > 0 && <span className="flex items-center gap-2"><House className="h-4 w-4 text-[#80613f]" />{activeStay.area} m²</span>}
              </div>
            </div>

            <nav aria-label={locale === "en" ? "Home details" : "Nội dung chi tiết căn"} className="z-[2] flex shrink-0 overflow-x-auto border-y border-[#16311c]/12 bg-[#f4efe7] px-5 sm:px-9 lg:px-11">
              {([
                ["overview", locale === "en" ? "Overview" : "Tổng quan"],
                ["amenities", locale === "en" ? "Amenities" : "Tiện nghi"],
                ["policies", locale === "en" ? "Policies" : "Quy định"]
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDetailSection(key)}
                  className={`relative min-h-14 shrink-0 px-4 text-xs font-bold transition first:pl-0 ${detailSection === key ? "text-[#16311c]" : "text-[#16311c]/42 hover:text-[#16311c]"}`}
                >
                  {label}
                  {detailSection === key && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#80613f] first:left-0" />}
                </button>
              ))}
            </nav>

            <div className="flex-1 px-5 py-8 sm:px-9 lg:px-11">
              {detailSection === "overview" && <div>
                <p className="font-serif text-2xl font-medium leading-[1.45] tracking-[-.02em]">{activeStay.longDescription}</p>
                <div className="mt-8">
                  <p className="text-[.6rem] font-bold uppercase tracking-[.17em] text-[#80613f]">{locale === "en" ? "Best for" : "Phù hợp nhất"}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{activeStay.idealFor.map((item) => <span key={item} className="rounded-full border border-[#16311c]/14 px-4 py-2 text-xs font-bold">{item}</span>)}</div>
                </div>
                <div className="mt-10">
                  <div className="flex items-end justify-between gap-5">
                    <div><p className="text-[.6rem] font-bold uppercase tracking-[.17em] text-[#80613f]">{locale === "en" ? "Physical homes" : "Các căn thực tế"}</p><h3 className="mt-2 font-serif text-3xl font-medium">{selectedUnits.length} {locale === "en" ? "positions in this type" : "vị trí thuộc dòng này"}</h3></div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {selectedUnits.map((unit) => <article key={unit.id} className="border border-[#16311c]/12 bg-white/45 p-4">
                      <div className="flex items-center justify-between gap-3"><span className="text-[.58rem] font-bold uppercase tracking-[.14em] text-[#80613f]">{unit.code}</span><MapPin className="h-3.5 w-3.5 opacity-35" /></div>
                      <h4 className="mt-4 font-serif text-xl font-medium">{unit.name}</h4>
                      <p className="mt-1 text-xs font-bold text-[#16311c]/52">{unit.position}</p>
                      <p className="mt-3 text-xs leading-5 text-[#16311c]/65">{unit.character}</p>
                    </article>)}
                  </div>
                </div>
              </div>}

              {detailSection === "amenities" && <div>
                <p className="text-[.6rem] font-bold uppercase tracking-[.17em] text-[#80613f]">{locale === "en" ? "Inside the home" : "Có sẵn trong căn"}</p>
                <div className="mt-5 grid gap-x-7 sm:grid-cols-2">
                  {activeStay.amenities.map((item) => <span key={item} className="flex items-center gap-3 border-b border-[#16311c]/10 py-4 text-sm"><Check className="h-4 w-4 text-[#80613f]" />{item}</span>)}
                </div>
                <p className="mt-10 text-[.6rem] font-bold uppercase tracking-[.17em] text-[#80613f]">{locale === "en" ? "Included" : "Đã bao gồm"}</p>
                <div className="mt-5 space-y-3">{activeStay.included.map((item) => <p key={item} className="flex gap-3 text-sm leading-6"><Check className="mt-1 h-4 w-4 shrink-0 text-[#80613f]" />{item}</p>)}</div>
                <p className="mt-8 text-xs leading-5 text-[#16311c]/48">{locale === "en" ? "Amenities and inclusions are illustrative and require approval before launch." : "Tiện nghi và hạng mục bao gồm đang là dữ liệu minh họa, cần được duyệt trước khi mở bán."}</p>
              </div>}

              {detailSection === "policies" && <div>
                <p className="text-[.6rem] font-bold uppercase tracking-[.17em] text-[#80613f]">{locale === "en" ? "Good to know about this home" : "Lưu ý riêng của căn"}</p>
                <div className="mt-5 space-y-3">{activeStay.stayNotes.map((item) => <p key={item} className="flex gap-3 text-sm leading-6"><Check className="mt-1 h-4 w-4 shrink-0 text-[#80613f]" />{item}</p>)}</div>
                <div className="mt-10 divide-y divide-[#16311c]/12 border-y border-[#16311c]/12">
                  {policies.map(([title, text], index) => <details key={title} open={index === 0} className="group py-1">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-3 text-sm font-bold">
                      {title}<span className="text-xl font-light transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="pb-5 pr-8 text-sm leading-7 text-[#16311c]/64">{text}</p>
                  </details>)}
                </div>
                <Link href={`${basePath}/chinh-sach`} className="mt-6 inline-flex items-center gap-2 text-xs font-bold underline decoration-[#80613f]/45 underline-offset-4">
                  {locale === "en" ? "Read all stay policies" : "Xem toàn bộ chính sách lưu trú"} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>}
            </div>

            <div className="sticky bottom-0 z-[3] mt-auto border-t border-[#16311c]/12 bg-[#f4efe7]/96 px-5 py-4 backdrop-blur sm:px-9 lg:px-11">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[.55rem] font-bold uppercase tracking-[.13em] text-[#80613f]">{locale === "en" ? "Continue the story" : "Tiếp tục câu chuyện"}</p>
                  <p className="mt-1 text-xs text-[#16311c]/55">{locale === "en" ? "See how a full day unfolds at LAKA." : "Cảm nhận cách một ngày trọn vẹn diễn ra tại LAKA."}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`${basePath}/trai-nghiem`} className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border border-[#16311c]/16 px-5 text-xs font-bold sm:px-6">
                    {locale === "en" ? "A day at LAKA" : "Một ngày tại LAKA"} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href={`${basePath}/dat-phong?stay=${activeStay.slug}`} className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-[#16311c] px-5 text-xs font-bold text-white sm:px-6">
                    {locale === "en" ? "Check this stay" : "Xem lịch căn này"} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>,
      document.body
    )
    : null;

  return <>
    <section id="bo-suu-tap-can" className="scroll-mt-[92px] bg-[#eae1d2] py-16 text-[#16311c] sm:py-24">
      <div className="mx-auto w-[min(1460px,calc(100%-28px))] sm:w-[min(1460px,calc(100%-48px))]">
        <div className="grid gap-7 border-b border-[#16311c]/14 pb-8 lg:grid-cols-[1fr_.42fr] lg:items-end">
          <h2 className="laka-heading-section max-w-4xl">
            {locale === "en" ? "Choose a landscape. Meet its homes." : "Chọn một hệ cảnh quan. Gặp những căn nhà."}
          </h2>
          <p className="max-w-md text-sm leading-7 text-[#16311c]/62 lg:justify-self-end">
            {locale === "en" ? "The card gives you just enough to feel. Open it only when you want the full story." : "Mỗi thẻ chỉ gợi vừa đủ để cảm nhận. Chạm vào khi bạn muốn xem toàn bộ câu chuyện của căn."}
          </p>
        </div>

        <nav aria-label={locale === "en" ? "Filter homes by landscape" : "Lọc căn theo hệ cảnh quan"} className="sticky top-[var(--laka-header-offset)] z-20 -mx-3 mt-6 overflow-x-auto border-y border-[#16311c]/10 bg-[#eae1d2]/94 px-3 backdrop-blur transition-[top] duration-300 motion-reduce:transition-none">
          <div className="grid w-full grid-cols-4">
            {tabs.map((tab) => {
              const selected = activeZoneSlug === tab.slug;
              return <button
                key={tab.slug ?? "all"}
                type="button"
                aria-pressed={selected}
                onClick={() => setQuery({ khu: tab.slug, can: null }, "replace")}
                className={`relative min-h-16 px-1 text-[11px] font-bold transition sm:px-4 sm:text-xs ${selected ? "text-[#16311c]" : "text-[#16311c]/48 hover:text-[#16311c]"}`}
              >
                {tab.label} <sup className="ml-1 text-[.55rem] opacity-55">{String(tab.count).padStart(2, "0")}</sup>
                {selected && <span className="absolute inset-x-2 bottom-0 h-0.5 bg-[#80613f] sm:inset-x-5" />}
              </button>;
            })}
          </div>
        </nav>

        <div className="mt-9 flex min-h-[72px] items-start justify-between gap-7">
          <div>
            <p className="text-[.58rem] font-bold uppercase tracking-[.18em] text-[#80613f]">
              {activeZone ? activeZone.eyebrow : locale === "en" ? "Eight accommodation types · twenty units" : "Tám dòng lưu trú · hai mươi căn thực tế"}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#16311c]/58">
              {activeZone ? activeZone.description : locale === "en" ? "Explore every LAKA stay, or narrow the view by lake, valley and pine-covered hill." : "Xem toàn bộ hệ sản phẩm LAKA, hoặc chọn riêng khu ven hồ, trong thung lũng và đồi thông."}
            </p>
          </div>
          <span aria-live="polite" className="hidden shrink-0 text-[.58rem] font-bold uppercase tracking-[.15em] text-[#16311c]/42 sm:block">
            {visibleStays.length} {locale === "en" ? "home types" : "dòng căn"}
          </span>
        </div>

        <div className="mt-8 grid gap-x-4 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-6 xl:gap-y-12">
          {visibleStays.map((stay, index) => {
            const zone = localizedZones.find((item) => item.id === stay.zoneId)!;
            return <button
              key={stay.id}
              type="button"
              aria-haspopup="dialog"
              aria-label={locale === "en" ? `View ${stay.name} details` : `Xem chi tiết ${stay.name}`}
              onClick={(event) => openStay(stay.slug, zone.slug, event.currentTarget)}
              className="group text-left"
            >
              <span className="relative block aspect-[4/5] overflow-hidden bg-[#10251d]">
                <Image
                  src={stay.image}
                  alt={`${stay.name} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 34vw"
                  className="object-cover transition duration-[900ms] ease-out group-hover:scale-[1.035]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#07140f]/66 via-transparent to-transparent opacity-65 transition group-hover:opacity-90" />
                <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-[#eae1d2] text-[#16311c] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <ArrowRight className="h-4 w-4 -rotate-45" />
                </span>
                <span className="absolute left-4 top-4 text-[.55rem] font-bold uppercase tracking-[.16em] text-white/75">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <span className="mt-4 flex items-start justify-between gap-4">
                <span>
                  <span className="block text-[.58rem] font-bold uppercase tracking-[.17em] text-[#80613f]">{zone.name}</span>
                  <span className="mt-1.5 block font-serif text-3xl font-medium tracking-[-.035em]">{stay.name}</span>
                </span>
              </span>
            </button>;
          })}
        </div>

        <section className="mt-20 border-t border-[#16311c]/14 pt-8 sm:mt-28">
          <div className="grid gap-7 lg:grid-cols-[.45fr_1fr]">
            <div>
              <p className="text-[.58rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{locale === "en" ? "Shared stay principles" : "Thông tin chung"}</p>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-tight">{locale === "en" ? "Clear before you arrive." : "Rõ ràng trước khi đến."}</h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-[#16311c]/58">{locale === "en" ? "Home-specific notes remain inside each detail panel." : "Lưu ý riêng của từng căn nằm ngay trong bảng chi tiết tương ứng."}</p>
            </div>
            <div className="divide-y divide-[#16311c]/12 border-y border-[#16311c]/12">
              {policies.map(([title, text], index) => <details key={title} open={index === 0} className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 text-sm font-bold">
                  <span>{String(index + 1).padStart(2, "0")} · {title}</span>
                  <span className="text-xl font-light transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-[#16311c]/62">{text}</p>
              </details>)}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-[#16311c]/12 pt-6">
            <p className="max-w-2xl font-serif text-xl leading-8 text-[#16311c]/72">{locale === "en" ? "Each home offers a different way to live closer to nature—and closer to one another." : "Mỗi căn là một cách khác để sống gần thiên nhiên và gần nhau hơn."}</p>
            <Link href={`${basePath}/ve-laka`} className="inline-flex items-center gap-2 text-xs font-bold">{locale === "en" ? "The LAKA story" : "Câu chuyện LAKA"} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </div>
    </section>
    {modal}
  </>;
}
