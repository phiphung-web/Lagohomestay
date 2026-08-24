"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { localizeStay } from "@/features/showcase/i18n/showcase-copy";
import { stays } from "@/features/stays/data/demo-data";
import { publicContact } from "@/shared/lib/public-contact";

export function ContactInquiryForm({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  const [opened, setOpened] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [staySlug, setStaySlug] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const en = locale === "en";
  const selectedStay = stays.find((stay) => stay.slug === staySlug);
  const selectedStayName = selectedStay ? localizeStay(selectedStay, locale).name : "";

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setStaySlug(query.get("stay") ?? "");
    setCheckIn(query.get("checkIn") ?? "");
    setCheckOut(query.get("checkOut") ?? "");
    setGuests(query.get("guests") ?? "");
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    const data = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          phone: data.get("phone"),
          email: data.get("email"),
          topic: data.get("topic"),
          staySlug,
          stayName: selectedStayName,
          checkIn: data.get("checkIn"),
          checkOut: data.get("checkOut"),
          guests: data.get("guests"),
          message: data.get("message")
        })
      });
      const result = await res.json();
      if (!res.ok) {
        setErrorMessage(result.message || (en ? "Failed to send information." : "Gửi thông tin chưa thành công. Vui lòng thử lại."));
      } else {
        setOpened(true);
      }
    } catch {
      setErrorMessage(en ? "Network error. Please try again." : "Lỗi kết nối mạng. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="inquiry-form" aria-labelledby="inquiry-form-title" className="scroll-mt-24 border-t border-[#16311c]/12 bg-[#fbfaf6] py-20 text-[#16311c] sm:py-28">
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-12 lg:grid-cols-[.7fr_1fr] lg:items-start">
        <header className="lg:sticky lg:top-32">
          <p className="laka-eyebrow text-[#80613f]">{en ? "Send a request" : "Gửi lời nhắn"}</p>
          <h2 id="inquiry-form-title" className="laka-heading-section mt-5">{en ? "Tell LAKA what you need." : "Cho LAKA biết điều bạn đang cần."}</h2>
          <p className="laka-body-muted mt-6 max-w-md">
            {en
              ? "Stay advice and every other request are handled here. Your inquiry is sent directly to LAKA's support team."
              : "Tư vấn lưu trú và mọi nhu cầu khác đều được tiếp nhận tại đây. Thông tin của bạn sẽ được gửi trực tiếp tới đội ngũ LAKA."}
          </p>
        </header>

        <form onSubmit={submit} className="grid gap-5 border border-[#16311c]/12 bg-[#eae1d2] p-6 sm:grid-cols-2 sm:p-9">
          {selectedStayName && (
            <div className="border-l-2 border-[#80613f] bg-white/55 px-4 py-3 text-sm leading-6 sm:col-span-2">
              <span className="block text-[.58rem] font-bold uppercase tracking-[.16em] text-[#80613f]">{en ? "Stay selected" : "Căn đang quan tâm"}</span>
              <strong className="mt-1 block font-serif text-2xl font-medium">{selectedStayName}</strong>
            </div>
          )}
          <label className="text-sm font-bold sm:col-span-2">{en ? "Full name *" : "Họ và tên *"}<input required name="fullName" maxLength={100} autoComplete="name" className="input mt-2" placeholder={en ? "Alex Nguyen" : "Nguyễn Minh Anh"} /></label>
          <label className="text-sm font-bold">{en ? "Phone / Zalo *" : "Điện thoại / Zalo *"}<input required name="phone" type="tel" inputMode="tel" maxLength={20} autoComplete="tel" className="input mt-2" placeholder="090 123 4567" /></label>
          <label className="text-sm font-bold">Email<input name="email" type="email" inputMode="email" autoComplete="email" className="input mt-2" placeholder="you@email.com" /></label>
          <label className="text-sm font-bold sm:col-span-2">{en ? "What can we help with?" : "Bạn cần LAKA hỗ trợ gì?"}<select name="topic" className="input mt-2" defaultValue={en ? "Stay advice" : "Tư vấn lưu trú"}><option>{en ? "Stay advice" : "Tư vấn lưu trú"}</option><option>{en ? "Dining and experiences" : "Ẩm thực và trải nghiệm"}</option><option>{en ? "Groups and events" : "Đoàn và sự kiện"}</option><option>{en ? "Other" : "Nội dung khác"}</option></select></label>
          <label className="text-sm font-bold">{en ? "Expected arrival" : "Ngày đến dự kiến"}<input name="checkIn" type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="input mt-2" /></label>
          <label className="text-sm font-bold">{en ? "Expected departure" : "Ngày đi dự kiến"}<input name="checkOut" type="date" value={checkOut} min={checkIn || undefined} onChange={(event) => setCheckOut(event.target.value)} className="input mt-2" /></label>
          <label className="text-sm font-bold sm:col-span-2">{en ? "Number of guests" : "Số khách dự kiến"}<input name="guests" type="number" inputMode="numeric" min={1} max={100} value={guests} onChange={(event) => setGuests(event.target.value)} className="input mt-2" placeholder={en ? "For example: 6" : "Ví dụ: 6"} /></label>
          <label className="text-sm font-bold sm:col-span-2">{en ? "Message *" : "Lời nhắn *"}<textarea required name="message" maxLength={1000} className="input mt-2 min-h-36 py-3" placeholder={en ? "Expected dates, group size or anything LAKA should know…" : "Ngày dự kiến, số người hoặc điều LAKA cần biết…"} /></label>
          <label className="flex items-start gap-3 text-sm leading-6 sm:col-span-2"><input required name="consent" type="checkbox" className="mt-1 h-4 w-4 shrink-0" />{en ? "I agree that LAKA may use these details to respond to my request." : "Tôi đồng ý để LAKA sử dụng thông tin này nhằm phản hồi yêu cầu của tôi."}</label>

          {errorMessage && (
            <p className="rounded-xl bg-red-50 p-3.5 text-xs font-semibold text-red-700 sm:col-span-2">
              {errorMessage}
            </p>
          )}

          {opened && (
            <div role="status" className="space-y-3 border border-emerald-700/20 bg-emerald-50/90 p-4 text-sm sm:col-span-2">
              <p className="flex items-start gap-2 font-bold text-emerald-900">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                {en ? "Details sent successfully to LAKA! We will contact you shortly:" : "Đã gửi thông tin tới LAKA thành công! Chúng mình sẽ liên hệ lại với bạn sớm nhất:"}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-bold">
                <a href={publicContact.zaloHref} target="_blank" rel="noreferrer" className="focus-ring underline decoration-[#80613f]/45 underline-offset-4">Zalo · {publicContact.phoneDisplay}</a>
                <a href={publicContact.phoneHref} className="focus-ring underline decoration-[#80613f]/45 underline-offset-4">{en ? "Call" : "Gọi hotline"} · {publicContact.phoneDisplay}</a>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || opened}
            className="focus-ring flex min-h-14 items-center justify-between rounded-full bg-[#16311c] px-6 text-sm font-bold text-white transition hover:bg-[#23482b] disabled:opacity-50 sm:col-span-2"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {en ? "Sending..." : "Đang gửi..."}
              </span>
            ) : (
              <>
                {en ? "Send details to Laka" : "Gửi thông tin tới Laka"}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
