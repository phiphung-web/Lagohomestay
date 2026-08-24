"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, CheckCircle2, Loader2, X } from "lucide-react";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";
import { stays } from "@/features/stays/data/demo-data";
import { publicContact } from "@/shared/lib/public-contact";

export function BookingModal({
  open,
  onClose,
  locale = "vi",
  defaultStaySlug = ""
}: {
  open: boolean;
  onClose: () => void;
  locale?: ShowcaseLocale;
  defaultStaySlug?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [staySlug, setStaySlug] = useState(defaultStaySlug);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const en = locale === "en";

  useEffect(() => {
    setStaySlug(defaultStaySlug);
  }, [defaultStaySlug]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setSubmitting(false);
      setErrorMessage("");
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const controls = panelRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])"
        );
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    const data = new FormData(event.currentTarget);
    const selectedStay = stays.find((s) => s.slug === data.get("staySlug"));
    const selectedStayName = selectedStay ? localizeStay(selectedStay, locale).name : "";

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          phone: data.get("phone"),
          email: data.get("email"),
          staySlug: data.get("staySlug"),
          stayName: selectedStayName,
          checkIn: data.get("checkIn"),
          checkOut: data.get("checkOut"),
          guests: data.get("guests"),
          message: data.get("message")
        })
      });
      const result = await res.json();
      if (!res.ok) {
        setErrorMessage(result.message || (en ? "Failed to send details." : "Gửi thông tin chưa thành công. Vui lòng thử lại."));
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMessage(en ? "Network error. Please check your connection." : "Lỗi kết nối mạng. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[115] flex items-end justify-center bg-[#06120e]/65 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={en ? "Booking inquiry form" : "Form điền thông tin đặt phòng"}
        className="template-menu-enter relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl bg-[#eae1d2] text-[#16311c] shadow-2xl sm:rounded-3xl"
      >
        <header className="flex items-center justify-between border-b border-[#16311c]/12 px-6 py-4">
          <div>
            <span className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#80613f]">
              {en ? "LAKA Homestay · Direct Booking" : "LAKA Homestay · Đặt phòng nhanh"}
            </span>
            <h2 className="font-serif text-xl font-semibold sm:text-2xl">
              {en ? "Send your booking request" : "Form thông tin đặt chỗ"}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={en ? "Close" : "Đóng"}
            className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-white/70 hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-bold uppercase tracking-wider sm:col-span-2">
              {en ? "Full name *" : "Họ và tên *"}
              <input
                required
                name="fullName"
                maxLength={100}
                autoComplete="name"
                className="input mt-1.5 w-full rounded-xl border border-[#16311c]/15 bg-white px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#16311c]"
                placeholder={en ? "Alex Nguyen" : "Nguyễn Minh Anh"}
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider">
              {en ? "Phone / Zalo *" : "Điện thoại / Zalo *"}
              <input
                required
                name="phone"
                type="tel"
                inputMode="tel"
                maxLength={20}
                autoComplete="tel"
                className="input mt-1.5 w-full rounded-xl border border-[#16311c]/15 bg-white px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#16311c]"
                placeholder="090 123 4567"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider">
              Email
              <input
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className="input mt-1.5 w-full rounded-xl border border-[#16311c]/15 bg-white px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#16311c]"
                placeholder="you@email.com"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider sm:col-span-2">
              {en ? "Stay of interest" : "Căn quan tâm"}
              <select
                name="staySlug"
                value={staySlug}
                onChange={(e) => setStaySlug(e.target.value)}
                className="input mt-1.5 w-full rounded-xl border border-[#16311c]/15 bg-white px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#16311c]"
              >
                <option value="">{en ? "-- Select accommodation (optional) --" : "-- Chọn căn nghỉ dưỡng (tùy chọn) --"}</option>
                {stays.map((stay) => (
                  <option key={stay.slug} value={stay.slug}>
                    {localizeStay(stay, locale).name} ({stay.subtitle})
                  </option>
                ))}
              </select>
            </label>

            <label className="text-xs font-bold uppercase tracking-wider">
              {en ? "Expected arrival" : "Ngày đến dự kiến"}
              <input
                name="checkIn"
                type="date"
                className="input mt-1.5 w-full rounded-xl border border-[#16311c]/15 bg-white px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#16311c]"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider">
              {en ? "Expected departure" : "Ngày đi dự kiến"}
              <input
                name="checkOut"
                type="date"
                className="input mt-1.5 w-full rounded-xl border border-[#16311c]/15 bg-white px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#16311c]"
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider sm:col-span-2">
              {en ? "Number of guests" : "Số lượng khách dự kiến"}
              <input
                name="guests"
                type="number"
                inputMode="numeric"
                min={1}
                max={100}
                className="input mt-1.5 w-full rounded-xl border border-[#16311c]/15 bg-white px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#16311c]"
                placeholder={en ? "For example: 4" : "Ví dụ: 4 người"}
              />
            </label>

            <label className="text-xs font-bold uppercase tracking-wider sm:col-span-2">
              {en ? "Notes / Special requests" : "Ghi chú / Yêu cầu đặc biệt"}
              <textarea
                name="message"
                maxLength={1000}
                className="input mt-1.5 min-h-[90px] w-full rounded-xl border border-[#16311c]/15 bg-white px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#16311c]"
                placeholder={en ? "Check-in time, group needs..." : "Thời gian nhận căn, yêu cầu thêm giường hoặc hỗ trợ đặc biệt..."}
              />
            </label>

            {errorMessage && (
              <p className="rounded-xl bg-red-50 p-3.5 text-xs font-semibold text-red-700 sm:col-span-2">
                {errorMessage}
              </p>
            )}

            {submitted && (
              <div role="status" className="space-y-3 rounded-2xl border border-emerald-700/20 bg-emerald-50/90 p-4 text-sm sm:col-span-2">
                <p className="flex items-start gap-2 font-bold text-emerald-900">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                  {en
                    ? "Information sent directly to LAKA! We will contact you shortly via Zalo/Phone."
                    : "Đã gửi thông tin tới LAKA thành công! Đội ngũ LAKA sẽ liên hệ lại với bạn qua Zalo/Điện thoại trong thời gian sớm nhất."}
                </p>
                <div className="flex flex-wrap gap-3 pt-1 font-bold">
                  <a
                    href={publicContact.zaloHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#16311c] px-4 py-2 text-xs text-white shadow-sm hover:bg-[#23482b]"
                  >
                    Zalo: {publicContact.phoneDisplay}
                  </a>
                  <a
                    href={publicContact.phoneHref}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs text-[#16311c] shadow-sm hover:bg-black/5"
                  >
                    {en ? "Call" : "Gọi hotline"}: {publicContact.phoneDisplay}
                  </a>
                </div>
              </div>
            )}

            <div className="mt-2 flex items-center justify-end gap-3 sm:col-span-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-[#16311c]/20 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#16311c] hover:bg-black/5"
              >
                {en ? "Cancel" : "Hủy"}
              </button>
              <button
                type="submit"
                disabled={submitting || submitted}
                className="flex items-center gap-2 rounded-full bg-[#16311c] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#23482b] disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {en ? "Sending..." : "Đang gửi..."}
                  </>
                ) : (
                  <>
                    {en ? "Send details to Laka" : "Gửi thông tin tới Laka"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>,
    document.body
  );
}
