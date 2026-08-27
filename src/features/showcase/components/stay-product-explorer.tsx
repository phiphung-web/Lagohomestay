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
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  House,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users,
  X
} from "lucide-react";
import { getUnitsForStay, stays, stayZones, type Stay } from "@/features/stays/data/demo-data";
import { localizeStay, localizeStayZone } from "@/features/showcase/i18n/showcase-copy";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { publicContact } from "@/shared/lib/public-contact";

type DetailSection = "overview" | "amenities" | "policies";

const sharedPolicies = {
  vi: [
    ["Nhận và trả căn", "Khung giờ chính thức nhận phòng từ 14:00 và trả phòng trước 12:00. LAKA xác nhận cụ thể cùng thông tin căn và lịch trống trước chuyến đi."],
    ["Số khách", "Số khách không vượt quá sức chứa công bố của từng dòng căn. Trẻ em dưới 6 tuổi được miễn phí theo tiêu chuẩn."],
    ["Không gian yên tĩnh", "LAKA hướng đến kỳ nghỉ yên bình, giữ âm lượng vừa phải sau 22:00 và trao đổi trước với ban quản lý nếu có hoạt động nhóm."],
    ["Thông tin vận hành", "Các dịch vụ tiện ích bao gồm bể bơi bốn mùa, xe đạp, bi-a và boardgame đã bao gồm trọn gói trong giá phòng."]
  ],
  en: [
    ["Arrival and departure", "Standard check-in from 14:00 and check-out before 12:00. LAKA confirms details with the unit and availability before the stay."],
    ["Guest numbers", "Guest numbers may not exceed the stated capacity. Children under 6 stay free of charge."],
    ["A quiet setting", "Please keep noise considerate after 10 pm and discuss group activities with LAKA in advance."],
    ["Operating information", "Amenities including four-season swimming pool, bicycles, billiards, and board games are fully included."]
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

  // Inquiry Popup State
  const [inquiryStay, setInquiryStay] = useState<Stay | null>(null);
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState("");

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

  const openInquiry = (stay: Stay) => {
    setInquiryStay(stay);
    setInquirySuccess(false);
    setInquiryError("");
  };

  const closeInquiry = () => {
    setInquiryStay(null);
    setInquirySuccess(false);
    setInquiryError("");
  };

  const handleInquirySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inquiryStay) return;
    setSubmittingInquiry(true);
    setInquiryError("");

    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          phone: formData.get("phone"),
          email: formData.get("email") || "",
          topic: `Tư vấn đặt căn: ${inquiryStay.name}`,
          staySlug: inquiryStay.slug,
          stayName: inquiryStay.name,
          checkIn: formData.get("checkIn") || "",
          checkOut: formData.get("checkOut") || "",
          guests: formData.get("guests") || "",
          message: formData.get("message") || ""
        })
      });

      const result = await res.json();
      if (!res.ok) {
        setInquiryError(result.message || (locale === "en" ? "Failed to send inquiry." : "Gửi thông tin chưa thành công. Vui lòng thử lại."));
      } else {
        setInquirySuccess(true);
      }
    } catch {
      setInquiryError(locale === "en" ? "Network error. Please try again." : "Lỗi kết nối mạng. Vui lòng thử lại.");
    } finally {
      setSubmittingInquiry(false);
    }
  };

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

  // Pure luxury minimal tabs (no avatars, no subtext)
  const tabs = [
    { slug: null, label: locale === "en" ? "All Stays" : "Tất cả" },
    { slug: "nha-ben-ho", label: locale === "en" ? "Lakeside Homes" : "Nhà Bên Hồ" },
    { slug: "nha-giua-rung", label: locale === "en" ? "Forest Homes" : "Nhà Giữa Rừng" },
    { slug: "nha-tren-doi", label: locale === "en" ? "Hilltop Homes" : "Nhà Trên Đồi" }
  ];

  const policies = sharedPolicies[locale];
  const selectedZone = activeStay
    ? localizedZones.find((zone) => zone.id === activeStay.zoneId)
    : null;
  const selectedUnits = activeStay
    ? getUnitsForStay(activeStay.id).map((unit) => localizedUnit(unit, locale))
    : [];
  const gallery = activeStay ? [activeStay.image, ...activeStay.gallery] : [];

  // =========================================================================
  // STAY DETAIL MODAL DIALOG
  // =========================================================================
  const modal = mounted && activeStay && selectedZone
    ? createPortal(
      <div className="fixed inset-0 z-[100] bg-[#07140f]/80 p-0 backdrop-blur-md lg:p-4" role="presentation">
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
          className="relative mx-auto h-[100svh] max-w-[1500px] overflow-y-auto bg-[#f4efe7] text-[#16311c] shadow-[0_36px_120px_rgba(0,0,0,.45)] lg:grid lg:h-[calc(100svh-32px)] lg:grid-cols-[1.08fr_.92fr] lg:overflow-hidden lg:rounded-2xl"
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeStay}
            aria-label={locale === "en" ? "Close" : "Đóng"}
            className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full bg-[#eae1d2] text-[#16311c] shadow-lg transition hover:scale-105 hover:bg-white lg:right-6 lg:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Gallery Section */}
          <section className="relative h-[32svh] min-h-[250px] overflow-hidden bg-[#10251d] sm:h-[40svh] sm:min-h-[320px] lg:h-full">
            <Image
              src={gallery[galleryIndex]}
              alt={`${activeStay.name} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 56vw"
              className="object-cover transition duration-700"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#07140f]/80 via-transparent to-black/25" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
              <div>
                <p className="text-[.6rem] font-bold uppercase tracking-[.2em] text-[#dfc6a5]">
                  {selectedZone.name} · {locale === "en" ? "Concept image" : "Hình ảnh minh họa"}
                </p>
                <p className="mt-1.5 font-serif text-2xl sm:text-4xl font-semibold tracking-tight">{activeStay.name}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label={locale === "en" ? "Previous image" : "Ảnh trước"}
                  onClick={() => setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length)}
                  className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-white/30 bg-black/30 backdrop-blur transition hover:bg-white hover:text-[#16311c]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label={locale === "en" ? "Next image" : "Ảnh tiếp theo"}
                  onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)}
                  className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-white/30 bg-black/30 backdrop-blur transition hover:bg-white hover:text-[#16311c]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[.58rem] font-bold tracking-[.14em] text-white backdrop-blur sm:left-7 sm:top-7">
              {String(galleryIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
            </span>
          </section>

          {/* Right Info Section */}
          <section className="relative flex min-h-full min-w-0 flex-col overflow-x-hidden lg:h-full lg:overflow-y-auto">
            <div className="px-5 pb-5 pt-6 sm:px-9 sm:pb-6 sm:pt-8 lg:px-11 lg:pr-20">
              <span className="inline-block rounded-full bg-[#16311c]/8 px-3 py-1 text-[.6rem] font-bold uppercase tracking-[.18em] text-[#80613f]">
                {selectedZone.name} · {activeStay.badge}
              </span>
              <h2 id="stay-dialog-title" className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#16311c] mt-3">
                {activeStay.name}
              </h2>
              <p className="mt-2 text-sm text-[#16311c]/70 font-serif italic">{activeStay.subtitle}</p>

              {/* Quick specs pill row */}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-[#16311c]/12 py-4 text-xs font-bold text-[#16311c]/85">
                {activeStay.maxGuests > 0 && (
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-[#80613f]" />Tối đa {activeStay.maxGuests} khách</span>
                )}
                {activeStay.beds > 0 && (
                  <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-[#80613f]" />{activeStay.beds} giường</span>
                )}
                {activeStay.area > 0 && (
                  <span className="flex items-center gap-1.5"><House className="h-4 w-4 text-[#80613f]" />{activeStay.area} m²</span>
                )}
                <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-[#80613f]" />WC khép kín</span>
              </div>
            </div>

            {/* Navigation Tabs in modal */}
            <nav aria-label={locale === "en" ? "Home details" : "Nội dung chi tiết căn"} className="z-[2] flex shrink-0 overflow-x-auto border-y border-[#16311c]/12 bg-[#eae1d2] px-5 sm:px-9 lg:px-11">
              {([
                ["overview", locale === "en" ? "Overview" : "Tổng quan"],
                ["amenities", locale === "en" ? "Amenities & Inclusions" : "Tiện nghi & Dịch vụ"],
                ["policies", locale === "en" ? "Policies" : "Quy định"]
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDetailSection(key)}
                  className={`relative min-h-14 shrink-0 px-4 text-xs font-bold transition first:pl-0 ${detailSection === key ? "text-[#16311c]" : "text-[#16311c]/45 hover:text-[#16311c]"}`}
                >
                  {label}
                  {detailSection === key && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#80613f] first:left-0" />}
                </button>
              ))}
            </nav>

            {/* Tab contents */}
            <div className="flex-1 px-5 py-7 sm:px-9 lg:px-11">
              {detailSection === "overview" && <div>
                <p className="text-sm sm:text-base leading-relaxed text-[#16311c]/85">{activeStay.longDescription}</p>

                <div className="mt-8 rounded-xl border border-[#16311c]/10 bg-white/50 p-5">
                  <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#80613f]">
                    {locale === "en" ? "Room Details" : "Chi tiết phòng"}
                  </p>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 text-xs sm:text-sm text-[#16311c]/85">
                    {activeStay.amenities.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-[#80613f]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{locale === "en" ? "Best for" : "Phù hợp nhất"}</p>
                  <div className="mt-3 flex flex-wrap gap-2">{activeStay.idealFor.map((item) => <span key={item} className="rounded-full border border-[#16311c]/15 bg-white/70 px-4 py-1.5 text-xs font-bold text-[#16311c]">{item}</span>)}</div>
                </div>

                {selectedUnits.length > 0 && (
                  <div className="mt-8">
                    <p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#80613f]">
                      {locale === "en" ? "Physical homes" : "Danh sách căn thuộc dòng này"} ({selectedUnits.length} căn)
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {selectedUnits.map((unit) => (
                        <article key={unit.id} className="rounded-xl border border-[#16311c]/10 bg-white/60 p-3.5">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[.6rem] font-extrabold uppercase tracking-wider text-[#80613f]">{unit.code}</span>
                            <MapPin className="h-3.5 w-3.5 opacity-40 text-[#16311c]" />
                          </div>
                          <h4 className="font-bold text-sm text-[#16311c] mt-1">{unit.name}</h4>
                          <p className="text-xs text-[#16311c]/60 mt-0.5">{unit.position}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </div>}

              {detailSection === "amenities" && <div>
                <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#80613f]">
                  {locale === "en" ? "Rate Inclusions" : "Giá Phòng Đã Bao Gồm"}
                </p>
                <div className="mt-4 space-y-3 rounded-xl border border-[#16311c]/10 bg-white/60 p-5">
                  {activeStay.included.map((item) => (
                    <p key={item} className="flex gap-3 text-xs sm:text-sm leading-relaxed text-[#16311c]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#80613f]" />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>

                <p className="mt-7 text-[.62rem] font-bold uppercase tracking-[.18em] text-[#80613f]">
                  {locale === "en" ? "In-room Amenities" : "Tiện ích có sẵn trong căn"}
                </p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {activeStay.amenities.map((item) => (
                    <span key={item} className="flex items-center gap-2.5 rounded-lg border border-[#16311c]/8 bg-white/40 px-3.5 py-2.5 text-xs font-medium text-[#16311c]">
                      <Check className="h-4 w-4 text-[#80613f]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>}

              {detailSection === "policies" && <div>
                <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#80613f]">
                  {locale === "en" ? "Stay Policies & Notes" : "Lưu ý & Quy định lưu trú"}
                </p>
                <div className="mt-3 divide-y divide-[#16311c]/10 border-y border-[#16311c]/10">
                  {policies.map(([title, text], index) => (
                    <details key={title} open={index === 0} className="group py-2">
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-5 py-2 text-sm font-bold text-[#16311c]">
                        {title}
                        <span className="text-xl font-light transition group-open:rotate-45">+</span>
                      </summary>
                      <p className="pb-4 pr-6 text-xs sm:text-sm leading-relaxed text-[#16311c]/70">{text}</p>
                    </details>
                  ))}
                </div>
              </div>}
            </div>

            {/* Sticky Action Footer */}
            <div className="sticky bottom-0 z-[3] mt-auto border-t border-[#16311c]/12 bg-[#eae1d2]/98 px-5 py-4 backdrop-blur sm:px-9 lg:px-11">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-[#16311c]">{activeStay.name}</p>
                  <p className="text-xs text-[#80613f] font-medium">{selectedZone.name} · {activeStay.badge}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={publicContact.phoneHref}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#16311c]/30 px-4 text-xs font-bold text-[#16311c] transition hover:bg-[#16311c] hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>{publicContact.phoneDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => openInquiry(activeStay)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#16311c] px-6 text-xs font-bold text-[#eae1d2] shadow-md transition hover:bg-[#204427] hover:scale-105 active:scale-95"
                  >
                    <span>{locale === "en" ? "Contact about this stay" : "Liên hệ về căn này"}</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>,
      document.body
    )
    : null;

  // =========================================================================
  // INSTANT INQUIRY POPUP MODAL
  // =========================================================================
  const inquiryModal = mounted && inquiryStay
    ? createPortal(
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#07140f]/85 backdrop-blur-md" role="presentation">
        <button
          type="button"
          aria-label={locale === "en" ? "Close inquiry form" : "Đóng bảng liên hệ"}
          className="absolute inset-0 cursor-default"
          onClick={closeInquiry}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-dialog-title"
          className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-[#eae1d2] text-[#16311c] shadow-[0_30px_90px_rgba(0,0,0,0.5)] border border-[#16311c]/15"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#16311c]/12 bg-[#ded2c0] px-6 py-4">
            <div>
              <span className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#80613f]">
                {locale === "en" ? "Direct Stay Inquiry" : "Liên Hệ Tư Vấn Trực Tiếp"}
              </span>
              <h3 id="inquiry-dialog-title" className="font-serif text-xl sm:text-2xl font-bold text-[#16311c]">
                {inquiryStay.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={closeInquiry}
              aria-label={locale === "en" ? "Close" : "Đóng"}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/60 text-[#16311c] transition hover:bg-[#16311c] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[82svh] overflow-y-auto p-6 sm:p-7">
            {/* Quick Contact Buttons Row */}
            <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <a
                href={publicContact.phoneHref}
                className="flex items-center justify-center gap-2 rounded-xl bg-white/80 border border-[#16311c]/15 px-3 py-2.5 text-xs font-bold text-[#16311c] shadow-sm transition hover:bg-[#16311c] hover:text-white"
              >
                <Phone className="h-4 w-4 text-[#80613f]" />
                <span>Gọi Hotline</span>
              </a>
              <a
                href={publicContact.zaloHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-white/80 border border-[#16311c]/15 px-3 py-2.5 text-xs font-bold text-[#16311c] shadow-sm transition hover:bg-[#0068ff] hover:text-white hover:border-[#0068ff]"
              >
                <MessageCircle className="h-4 w-4 text-[#0068ff]" />
                <span>Chat Zalo</span>
              </a>
              <a
                href={publicContact.messengerHref}
                target="_blank"
                rel="noreferrer"
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 rounded-xl bg-white/80 border border-[#16311c]/15 px-3 py-2.5 text-xs font-bold text-[#16311c] shadow-sm transition hover:bg-[#0084ff] hover:text-white hover:border-[#0084ff]"
              >
                <Send className="h-4 w-4 text-[#0084ff]" />
                <span>Messenger</span>
              </a>
            </div>

            {inquirySuccess ? (
              <div className="rounded-xl border border-[#16311c]/15 bg-white/80 p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#204427]" />
                <h4 className="font-serif text-2xl font-bold text-[#16311c] mt-4">
                  {locale === "en" ? "Inquiry Sent Successfully!" : "Gửi yêu cầu thành công!"}
                </h4>
                <p className="mt-2 text-sm text-[#16311c]/75">
                  {locale === "en"
                    ? "LAKA Homestay team will contact you via Phone / Zalo within 15-30 minutes."
                    : "Đội ngũ LAKA Homestay sẽ liên hệ tư vấn lịch trống và xác nhận cùng bạn qua Điện thoại / Zalo sớm nhất."}
                </p>
                <button
                  type="button"
                  onClick={closeInquiry}
                  className="mt-6 inline-flex rounded-full bg-[#16311c] px-6 py-2.5 text-xs font-bold text-white shadow transition hover:bg-[#204427]"
                >
                  {locale === "en" ? "Close" : "Đóng lại"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block text-xs font-bold text-[#16311c]">
                    Họ và tên *
                    <input
                      required
                      name="fullName"
                      maxLength={100}
                      className="input mt-1.5 h-11 bg-white text-sm"
                      placeholder="Nguyễn Minh Anh"
                    />
                  </label>
                  <label className="block text-xs font-bold text-[#16311c]">
                    Số điện thoại / Zalo *
                    <input
                      required
                      name="phone"
                      type="tel"
                      maxLength={20}
                      className="input mt-1.5 h-11 bg-white text-sm"
                      placeholder="090 123 4567"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="block text-xs font-bold text-[#16311c]">
                    Ngày đến
                    <input
                      name="checkIn"
                      type="date"
                      className="input mt-1.5 h-11 bg-white text-xs"
                    />
                  </label>
                  <label className="block text-xs font-bold text-[#16311c]">
                    Ngày đi
                    <input
                      name="checkOut"
                      type="date"
                      className="input mt-1.5 h-11 bg-white text-xs"
                    />
                  </label>
                  <label className="block text-xs font-bold text-[#16311c]">
                    Số khách dự kiến
                    <input
                      name="guests"
                      type="number"
                      min={1}
                      max={50}
                      className="input mt-1.5 h-11 bg-white text-sm"
                      placeholder="VD: 6"
                    />
                  </label>
                </div>

                <label className="block text-xs font-bold text-[#16311c]">
                  Lời nhắn / Nhu cầu riêng
                  <textarea
                    name="message"
                    rows={3}
                    maxLength={1000}
                    className="input mt-1.5 min-h-20 py-2 bg-white text-sm"
                    placeholder="Ghi chú về ngày nghỉ, tiệc BBQ, đặt ăn hoặc thắc mắc của bạn..."
                  />
                </label>

                {inquiryError && (
                  <p className="rounded-lg bg-red-100 p-3 text-xs font-semibold text-red-700">
                    {inquiryError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submittingInquiry}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#16311c] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#204427] active:scale-[0.99] disabled:opacity-50"
                >
                  {submittingInquiry ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Đang gửi thông tin...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Gửi yêu cầu tư vấn ngay</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>,
      document.body
    )
    : null;

  return (
    <>
      <section id="bo-suu-tap-can" className="scroll-mt-[92px] bg-[#eae1d2] py-10 sm:py-14 text-[#16311c]">
        <div className="mx-auto w-[min(1460px,calc(100%-28px))] sm:w-[min(1460px,calc(100%-48px))]">
          {/* ================================================================= */}
          {/* 1. MAIN MENU STYLE TAB NAVIGATION (NO BORDER, LUXURY UNDERLINE)   */}
          {/* ================================================================= */}
          <nav
            aria-label={locale === "en" ? "Filter stays by zone" : "Lọc căn theo khu lưu trú"}
            className="sticky top-[var(--laka-header-offset)] z-30 transition-[top] duration-300 -mx-3 sm:mx-0 px-3 sm:px-0 border-b border-[#16311c]/12 bg-[#eae1d2]/95 backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-full items-center justify-start sm:justify-center overflow-x-auto scrollbar-none gap-6 sm:gap-10 py-1">
              {tabs.map((tab) => {
                const selected = activeZoneSlug === tab.slug;
                return (
                  <button
                    key={tab.slug ?? "all"}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setQuery({ khu: tab.slug, can: null }, "replace")}
                    className={`focus-ring group relative shrink-0 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[.12em] transition-all duration-200 ${
                      selected
                        ? "text-[#16311c] opacity-100"
                        : "text-[#16311c]/55 hover:text-[#16311c] hover:opacity-100"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {/* Active Underline matching main menu style */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-0.5 bg-[#80613f] origin-left transition-transform duration-300 ${
                        selected ? "scale-x-100 opacity-100" : "scale-x-0 group-hover:scale-x-100 opacity-60"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </nav>

          {/* ================================================================= */}
          {/* 2. OVERHAULED STAY CARDS: TEXT DIRECTLY OVERLAID ON IMAGE        */}
          {/* ================================================================= */}
          <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {visibleStays.map((stay) => {
              const zone = localizedZones.find((item) => item.id === stay.zoneId)!;
              return (
                <article
                  key={stay.id}
                  onClick={(event) => openStay(stay.slug, zone.slug, event.currentTarget)}
                  className="group relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#10251d] shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer text-left focus-ring"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openStay(stay.slug, zone.slug, e.currentTarget);
                    }
                  }}
                  aria-label={locale === "en" ? `View ${stay.name} details` : `Xem chi tiết ${stay.name}`}
                >
                  {/* Background Photo with smooth zoom on hover */}
                  <Image
                    src={stay.image}
                    alt={`${stay.name} — ${locale === "en" ? "concept image" : "hình ảnh minh họa"}`}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 34vw"
                    className="object-cover transition duration-[900ms] ease-out group-hover:scale-105"
                  />

                  {/* Multi-stop Gradient Vignette for Maximum Contrast & Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06140d]/95 via-[#06140d]/40 to-black/25 opacity-90 transition duration-500 group-hover:opacity-95" />

                  {/* TOP OVERLAY: Zone Badge & Capacity/Area Pill */}
                  <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-black/45 px-3 py-1 text-[.6rem] font-bold uppercase tracking-[.16em] text-[#dfc6a5] backdrop-blur-md border border-white/15 shadow-sm">
                      {zone.name}
                    </span>
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[.6rem] font-bold text-white backdrop-blur-md border border-white/10">
                      {stay.area > 0 ? `${stay.area}m² · ` : ""}{stay.maxGuests > 0 ? `Tối đa ${stay.maxGuests} khách` : "Riêng tư"}
                    </span>
                  </div>

                  {/* BOTTOM OVERLAY: Subtitle, Title, Description, and CTA */}
                  <div className="absolute bottom-0 inset-x-0 z-10 p-5 sm:p-6 text-white flex flex-col justify-end">
                    {/* Subtitle / Tagline */}
                    <p className="font-serif italic text-xs sm:text-sm text-[#cce5d3] opacity-90 drop-shadow-sm">
                      {stay.subtitle}
                    </p>

                    {/* Room Name */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight mt-1 group-hover:text-[#eae1d2] transition">
                      {stay.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-xs sm:text-[0.82rem] leading-relaxed text-white/80 line-clamp-2 font-normal">
                      {stay.description}
                    </p>

                    {/* Bottom Action Row */}
                    <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3.5">
                      <div className="flex items-center gap-2">
                        {stay.beds > 0 && (
                          <span className="inline-flex items-center gap-1 text-[.68rem] font-medium text-white/75">
                            <BedDouble className="h-3.5 w-3.5 text-[#dfc6a5]" />
                            {stay.beds} giường
                          </span>
                        )}
                        <span className="text-white/30">·</span>
                        <span className="text-[.68rem] font-medium text-[#dfc6a5]">
                          {stay.badge || "Đầy đủ tiện nghi"}
                        </span>
                      </div>

                      {/* Animated View Details Button */}
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition duration-300 group-hover:bg-[#eae1d2] group-hover:text-[#16311c] group-hover:scale-105">
                        <span>{locale === "en" ? "Details" : "Xem chi tiết"}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ================================================================= */}
          {/* 3. FOOTER PRINCIPLES & BRAND STORY LINK                          */}
          {/* ================================================================= */}
          <section className="mt-16 border-t border-[#16311c]/15 pt-10 sm:mt-24">
            <div className="grid gap-7 lg:grid-cols-[.45fr_1fr]">
              <div>
                <p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#80613f]">
                  {locale === "en" ? "Shared stay principles" : "Thông tin chung"}
                </p>
                <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#16311c] mt-3">
                  {locale === "en" ? "Clear before you arrive." : "Rõ ràng trước khi đến."}
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#16311c]/65">
                  {locale === "en"
                    ? "Home-specific notes remain inside each detail panel."
                    : "Lưu ý riêng của từng căn nằm ngay trong bảng chi tiết tương ứng khi bạn bấm vào từng căn."}
                </p>
              </div>
              <div className="divide-y divide-[#16311c]/12 border-y border-[#16311c]/12">
                {policies.map(([title, text], index) => (
                  <details key={title} open={index === 0} className="group">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 text-sm font-bold text-[#16311c]">
                      <span>{String(index + 1).padStart(2, "0")} · {title}</span>
                      <span className="text-xl font-light transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-2xl pb-5 pr-8 text-xs sm:text-sm leading-relaxed text-[#16311c]/65">{text}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-[#16311c]/12 pt-6">
              <p className="max-w-2xl font-serif text-lg sm:text-xl leading-relaxed text-[#16311c]/75">
                {locale === "en"
                  ? "Each home offers a different way to live closer to nature—and closer to one another."
                  : "Mỗi khoảng xanh là một nhịp riêng để sống gần thiên nhiên và gần nhau hơn."}
              </p>
              <Link
                href={`${basePath}/ve-laka`}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#16311c] hover:underline"
              >
                {locale === "en" ? "The LAKA story" : "Câu chuyện LAKA"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </section>

      {/* Popups & Modals */}
      {modal}
      {inquiryModal}
    </>
  );
}
