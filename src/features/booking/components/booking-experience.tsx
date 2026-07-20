"use client";

import { addDays, format, parseISO } from "date-fns";
import { ArrowLeft, ArrowRight, Check, Clock3, House, Loader2, MapPin, Phone, RefreshCw, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "@/features/booking/components/date-range-picker";
import { GuestStepper } from "@/features/booking/components/guest-stepper";
import { HoldCountdown } from "@/features/booking/components/hold-countdown";
import type { AvailabilityOption, AvailabilityResponse } from "@/features/booking/domain/availability";
import { validateBookingContact, type ContactErrors, type ContactField } from "@/features/booking/domain/contact-validation";
import { formatCurrency } from "@/shared/lib/format";
import { getVietnamDateString } from "@/shared/lib/vietnam-date";

type BookingResult = { holdExpiresAt: string; totalAmount: number };

const bookingSteps = ["Chọn căn", "Thông tin", "Hoàn tất"];

function BookingProgress({ step }: { step: number }) {
  return <ol aria-label="Tiến trình đặt chỗ" className="relative mb-10 grid grid-cols-3 before:absolute before:left-[16.67%] before:right-[16.67%] before:top-5 before:h-px before:bg-lago-ink/12 before:content-['']">
    {bookingSteps.map((label, index) => { const number = index + 1; const complete = number < step; const active = number === step; return <li key={label} aria-current={active ? "step" : undefined} className="relative z-10 flex flex-col items-center gap-2 text-center"><span className={`grid h-10 w-10 place-items-center rounded-full border text-xs font-bold transition ${complete ? "border-lago-forest bg-lago-forest text-white" : active ? "border-lago-clay bg-white text-lago-clay shadow-[0_0_0_6px_rgba(184,111,82,.1)]" : "border-lago-ink/12 bg-[#fbfaf6] text-lago-ink/35"}`}>{complete ? <Check className="h-4 w-4" /> : number}</span><span className={`text-[.62rem] font-bold uppercase tracking-[.08em] ${active ? "text-lago-ink" : "text-lago-ink/38"}`}>{label}</span></li>; })}
  </ol>;
}

export function BookingExperience({ lookupPath = "/tra-cuu" }: { lookupPath?: string }) {
  const search = useSearchParams();
  const today = parseISO(getVietnamDateString());
  const preferredSlug = search.get("stay");
  const [checkIn, setCheckIn] = useState(search.get("checkIn") ?? format(addDays(today, 1), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(search.get("checkOut") ?? format(addDays(today, 3), "yyyy-MM-dd"));
  const [guests, setGuests] = useState(Math.min(12, Math.max(1, Number(search.get("guests") ?? 2))));
  const [available, setAvailable] = useState<AvailabilityOption[]>([]);
  const [selected, setSelected] = useState<AvailabilityOption | null>(null);
  const [step, setStep] = useState(1);
  const [availabilityState, setAvailabilityState] = useState<"loading" | "ready" | "error">("loading");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [result, setResult] = useState<BookingResult | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const idempotencyKey = useRef(crypto.randomUUID());
  const preferredApplied = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const loadAvailability = async () => {
      setAvailabilityState("loading");
      setError("");
      try {
        const query = new URLSearchParams({ checkIn, checkOut, guests: String(guests) });
        const response = await fetch(`/api/availability?${query}`, { signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message ?? "Chưa thể kiểm tra lịch trống");
        const payload = data as AvailabilityResponse;
        setAvailable(payload.data);
        setAvailabilityState("ready");

        if (selected) {
          const refreshed = payload.data.find((option) => option.slug === selected.slug);
          if (refreshed) setSelected(refreshed);
          else {
            setSelected(null);
            setStep(1);
            setError("Căn bạn vừa chọn không còn trống trong khoảng ngày mới. LAKA đã cập nhật các lựa chọn khác bên dưới.");
          }
        } else if (preferredSlug && !preferredApplied.current) {
          preferredApplied.current = true;
          const preferred = payload.data.find((option) => option.slug === preferredSlug);
          if (preferred) { setSelected(preferred); setStep(2); }
          else setError("Căn bạn quan tâm chưa còn trống trong khoảng ngày này. LAKA đã hiển thị các lựa chọn phù hợp khác.");
        }
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") return;
        setAvailabilityState("error");
        setError(fetchError instanceof Error ? fetchError.message : "Có lỗi khi kiểm tra lịch");
      }
    };
    loadAvailability();
    return () => controller.abort();
  }, [checkIn, checkOut, guests, retryKey]);

  useEffect(() => { if (step !== 1) setError(""); }, [step]);

  const choose = (stay: AvailabilityOption) => {
    setSelected(stay);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    const contact = { fullName: String(form.get("fullName") ?? ""), phone: String(form.get("phone") ?? ""), email: String(form.get("email") ?? ""), consent: form.get("consent") === "on" };
    const nextFieldErrors = validateBookingContact(contact);
    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      const firstInvalid = Object.keys(nextFieldErrors)[0] as ContactField;
      (event.currentTarget.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    setFieldErrors({});
    setLoading(true);
    setError("");
    const payload = { unitId: selected.unitId, checkIn, checkOut, guests, ...contact, note: form.get("note") };

    try {
      const response = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey.current }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message ?? "Không thể tạo yêu cầu");
      setResult(data);
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const clearFieldError = (field: ContactField) => setFieldErrors((current) => {
    if (!current[field]) return current;
    const next = { ...current };
    delete next[field];
    return next;
  });

  if (step === 3 && result && selected) {
    return <div className="booking-step-enter container-lago py-12 sm:py-20"><BookingProgress step={3} /><div className="mx-auto max-w-2xl text-center"><span className="success-pulse mx-auto grid h-20 w-20 place-items-center rounded-full bg-lago-mist"><Check className="h-9 w-9" /></span><p className="eyebrow mt-8 text-lago-clay">Yêu cầu đã được ghi nhận</p><h1 className="display mt-3 text-5xl font-semibold">{selected.name} đang được giữ cho bạn.</h1><p className="mx-auto mt-5 max-w-lg leading-7 text-lago-ink/65">Đội ngũ LAKA sẽ liên hệ qua điện thoại hoặc Zalo để xác nhận. Bạn chưa cần thanh toán ở bước này.</p><HoldCountdown expiresAt={result.holdExpiresAt} /><div className="card mt-6 grid gap-4 p-7 text-left text-sm sm:grid-cols-2"><div><span className="text-lago-ink/50">Căn nhà</span><p className="mt-1 font-bold">{selected.name}</p></div><div><span className="text-lago-ink/50">Tạm tính</span><p className="mt-1 font-bold">{formatCurrency(result.totalAmount)}</p></div><div><span className="text-lago-ink/50">Thời gian</span><p className="mt-1 font-bold">{format(parseISO(checkIn), "dd/MM/yyyy")} → {format(parseISO(checkOut), "dd/MM/yyyy")}</p></div><div><span className="text-lago-ink/50">Giữ đến</span><p className="mt-1 font-bold">{new Date(result.holdExpiresAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</p></div></div><p className="mt-5 text-sm text-lago-ink/55">Bạn có thể xem lại yêu cầu bất cứ lúc nào bằng số điện thoại đã đặt.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><a className="btn-primary" href="tel:0900000000"><Phone className="h-4 w-4" /> Gọi LAKA</a><a className="btn-light border border-lago-ink/15" href="https://zalo.me/0900000000">Liên hệ Zalo</a></div><Link href={lookupPath} className="soft-link mt-7">Xem lại đặt chỗ <ArrowRight className="h-4 w-4" /></Link></div></div>;
  }

  return <div className="container-lago py-12 sm:py-20">
    <BookingProgress step={step} />

    {step === 1 && <div className="booking-step-enter">
      <div className="grid items-end gap-7 lg:grid-cols-[1fr_560px]"><div><p className="eyebrow text-lago-clay">Lịch trống theo thời gian thực</p><h1 className="display mt-3 max-w-3xl text-5xl font-semibold">Chọn không gian cho chuyến đi của bạn.</h1><p className="mt-4 text-lago-ink/58">Mỗi kết quả bên dưới đã được kiểm tra lịch trống và tính giá theo đúng ngày bạn chọn.</p></div><div className="grid gap-3 rounded-[24px] bg-lago-cream p-3 sm:grid-cols-[1fr_200px]"><DateRangePicker checkIn={checkIn} checkOut={checkOut} onChange={(range) => { setCheckIn(range.checkIn); setCheckOut(range.checkOut); }} /><GuestStepper value={guests} onChange={setGuests} /></div></div>

      {error && <p role="alert" className="mt-7 rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-800">{error}</p>}

      {availabilityState === "loading" && <div className="mt-10 space-y-4" aria-label="Đang kiểm tra lịch trống"><div className="availability-skeleton h-72 rounded-[28px]" /><div className="availability-skeleton h-72 rounded-[28px]" /></div>}

      {availabilityState === "error" && <div className="mt-10 rounded-[28px] bg-lago-cream p-10 text-center"><RefreshCw className="mx-auto h-8 w-8 text-lago-clay" /><h2 className="display mt-4 text-3xl font-semibold">Chưa thể tải lịch trống</h2><p className="mt-3 text-sm text-lago-ink/58">Lựa chọn ngày và số khách của bạn vẫn được giữ nguyên. Hãy thử kết nối lại hoặc gọi trực tiếp cho LAKA.</p><button type="button" onClick={() => setRetryKey((value) => value + 1)} className="btn-primary mt-6"><RefreshCw className="h-4 w-4" /> Kiểm tra lại</button></div>}

      {availabilityState === "ready" && available.length > 0 && <div className="mt-10 grid gap-5">{available.map((stay, index) => <article key={stay.id} className="result-enter group lift grid overflow-hidden rounded-[28px] border border-lago-ink/10 bg-white lg:grid-cols-[310px_1fr_auto]" style={{ animationDelay: `${index * 70}ms` }}>
        <div className="relative min-h-64 overflow-hidden lg:min-h-0"><Image src={stay.image} alt={`${stay.name} - ảnh minh họa`} fill sizes="(max-width:1024px) 100vw, 310px" className="object-cover transition duration-700 group-hover:scale-[1.035]" /><span className="absolute inset-0 bg-gradient-to-t from-[#0a221c]/60 via-transparent to-transparent" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[.6rem] font-bold uppercase tracking-wider">{stay.badge}</span><span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-semibold text-white"><MapPin className="h-4 w-4 text-lago-sand" />{stay.location}</span></div>
        <div className="p-6 sm:p-7"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /><p className="text-[.62rem] font-bold uppercase tracking-wider text-emerald-700">Còn trống · Đã kiểm tra</p></div><p className="eyebrow mt-4 text-lago-moss">{stay.subtitle}</p><h2 className="display mt-2 text-3xl font-semibold sm:text-4xl">{stay.name}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-lago-ink/58">{stay.description}</p><div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-lago-ink/58"><span className="flex items-center gap-2"><House className="h-4 w-4" />Căn riêng</span><span className="flex items-center gap-2"><Users className="h-4 w-4" />Tối đa {stay.maxGuests} khách</span><span className="text-lago-clay">{stay.highlights[0]}</span></div></div>
        <div className="flex items-center justify-between border-t border-lago-ink/10 p-6 lg:w-56 lg:flex-col lg:items-end lg:justify-center lg:border-l lg:border-t-0"><div className="lg:text-right"><span className="text-xs text-lago-ink/45">{stay.quote.nights} đêm · tổng dự kiến</span><p className="mt-1 text-xl font-bold">{formatCurrency(stay.quote.total)}</p><span className="mt-1 block text-[.65rem] text-lago-ink/38">Đã gồm phụ thu theo lựa chọn</span></div><button type="button" onClick={() => choose(stay)} className="btn-primary lg:mt-6">Chọn căn <ArrowRight className="h-4 w-4" /></button></div>
      </article>)}</div>}

      {availabilityState === "ready" && available.length === 0 && <div className="mt-10 rounded-[28px] bg-lago-cream p-10 text-center"><Users className="mx-auto h-8 w-8 text-lago-clay" /><h2 className="display mt-4 text-3xl font-semibold">Chưa có căn trống cho lựa chọn này</h2><p className="mt-3 text-sm text-lago-ink/58">Hãy thử đổi ngày, giảm số khách hoặc liên hệ LAKA để được tư vấn đặt nhiều căn.</p><a href="tel:0900000000" className="btn-primary mt-6">Gọi LAKA tư vấn</a></div>}
    </div>}

    {step === 2 && selected && <div className="booking-step-enter grid gap-10 lg:grid-cols-[1fr_390px]">
      <div><button type="button" onClick={() => setStep(1)} className="focus-ring mb-7 flex items-center gap-2 rounded-lg text-sm font-bold"><ArrowLeft className="h-4 w-4" /> Chọn lại căn</button><p className="eyebrow text-lago-clay">Thông tin liên hệ</p><h1 className="display mt-3 text-5xl font-semibold">LAKA sẽ liên hệ với ai?</h1><p className="mt-4 text-lago-ink/60">Chưa cần thanh toán. {selected.name} sẽ được giữ 2 giờ trong lúc đội ngũ LAKA xác nhận.</p>
        <form noValidate aria-busy={loading} onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold sm:col-span-2">Họ và tên *<input name="fullName" maxLength={100} autoComplete="name" onInput={() => clearFieldError("fullName")} aria-invalid={Boolean(fieldErrors.fullName)} aria-describedby={fieldErrors.fullName ? "booking-full-name-error" : undefined} className="input mt-2 aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50/40" placeholder="Nguyễn Minh Anh" />{fieldErrors.fullName && <span id="booking-full-name-error" className="mt-2 block text-xs font-semibold text-red-700">{fieldErrors.fullName}</span>}</label>
          <label className="text-sm font-bold">Số điện thoại / Zalo *<input name="phone" type="tel" inputMode="tel" maxLength={20} autoComplete="tel" onInput={() => clearFieldError("phone")} aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? "booking-phone-error" : undefined} className="input mt-2 aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50/40" placeholder="090 123 4567" />{fieldErrors.phone && <span id="booking-phone-error" className="mt-2 block text-xs font-semibold text-red-700">{fieldErrors.phone}</span>}</label>
          <label className="text-sm font-bold">Email (không bắt buộc)<input name="email" type="email" inputMode="email" autoComplete="email" onInput={() => clearFieldError("email")} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "booking-email-error" : undefined} className="input mt-2 aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50/40" placeholder="ban@email.com" />{fieldErrors.email && <span id="booking-email-error" className="mt-2 block text-xs font-semibold text-red-700">{fieldErrors.email}</span>}</label>
          <label className="text-sm font-bold sm:col-span-2">Lời nhắn<textarea name="note" maxLength={500} className="input mt-2 h-28 py-3" placeholder="Giờ đến dự kiến hoặc yêu cầu đặc biệt..." /></label>
          <div className="sm:col-span-2"><label className="flex items-start gap-3 text-sm leading-6"><input name="consent" type="checkbox" onChange={() => clearFieldError("consent")} aria-invalid={Boolean(fieldErrors.consent)} aria-describedby={fieldErrors.consent ? "booking-consent-error" : undefined} className="mt-1" />Tôi đồng ý để LAKA sử dụng thông tin này nhằm xử lý yêu cầu đặt căn.</label>{fieldErrors.consent && <p id="booking-consent-error" className="ml-8 mt-2 text-xs font-semibold text-red-700">{fieldErrors.consent}</p>}</div>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700 sm:col-span-2">{error}</p>}
          <button disabled={loading || availabilityState !== "ready"} className="btn-primary sm:col-span-2">{loading || availabilityState === "loading" ? <><Loader2 className="h-5 w-5 animate-spin" /> {loading ? "Đang gửi yêu cầu…" : "Đang cập nhật giá…"}</> : <><ShieldCheck className="h-5 w-5" /> Gửi yêu cầu giữ căn</>}</button>
        </form>
      </div>
      <aside className="card h-fit overflow-hidden lg:sticky lg:top-28"><div className="relative h-48 overflow-hidden"><Image src={selected.image} alt={`${selected.name} - ảnh minh họa`} fill sizes="(max-width:1024px) 100vw, 390px" className="object-cover" /></div><div className="p-6"><div className={`flex items-center gap-2 text-[.62rem] font-bold uppercase tracking-wider ${availabilityState === "ready" ? "text-emerald-700" : availabilityState === "error" ? "text-red-700" : "text-amber-700"}`}><span className={`h-2 w-2 rounded-full ${availabilityState === "ready" ? "bg-emerald-500" : availabilityState === "error" ? "bg-red-500" : "animate-pulse bg-amber-500"}`} /> {availabilityState === "ready" ? "Lịch trống đã xác nhận" : availabilityState === "error" ? "Chưa thể xác nhận lại lịch" : "Đang cập nhật lịch và giá"}</div><p className="eyebrow mt-4 text-lago-moss">{selected.location}</p><h2 className="display mt-1 text-3xl font-semibold">{selected.name}</h2><DateRangePicker className="mt-5" checkIn={checkIn} checkOut={checkOut} onChange={(range) => { setCheckIn(range.checkIn); setCheckOut(range.checkOut); }} />{availabilityState === "error" && <button type="button" onClick={() => setRetryKey((value) => value + 1)} className="mt-3 flex items-center gap-2 text-xs font-bold text-red-700"><RefreshCw className="h-3.5 w-3.5" />Kiểm tra lại lịch và giá</button>}<p className="mt-3 text-sm text-lago-ink/60">{guests} khách</p><div className={`mt-6 space-y-3 border-y border-lago-ink/10 py-5 text-sm transition ${availabilityState === "loading" ? "animate-pulse opacity-45" : ""}`}><div className="flex justify-between"><span>{selected.quote.nights} đêm</span><span>{formatCurrency(selected.quote.base)}</span></div>{selected.quote.weekend > 0 && <div className="flex justify-between"><span>Điều chỉnh theo ngày</span><span>{formatCurrency(selected.quote.weekend)}</span></div>}{selected.quote.extraGuest > 0 && <div className="flex justify-between"><span>Phụ thu khách</span><span>{formatCurrency(selected.quote.extraGuest)}</span></div>}</div><div className="mt-5 flex justify-between"><strong>Tổng dự kiến</strong><strong className="text-xl">{formatCurrency(selected.quote.total)}</strong></div><p className="mt-5 flex gap-2 rounded-xl bg-lago-cream p-3 text-xs leading-5"><Clock3 className="h-4 w-4 shrink-0" />Giá được lưu tại thời điểm gửi yêu cầu. LAKA sẽ xác nhận mức cuối cùng khi liên hệ.</p></div></aside>
    </div>}
  </div>;
}
