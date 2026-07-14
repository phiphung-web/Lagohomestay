"use client";

import { addDays, format } from "date-fns";
import { ArrowLeft, ArrowRight, Check, Clock3, House, Loader2, Phone, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { stays, type Stay } from "@/features/stays/data/demo-data";
import { calculatePrice } from "@/features/booking/domain/pricing";
import { formatCurrency } from "@/shared/lib/format";

type BookingResult = { code: string; holdExpiresAt: string; totalAmount: number };

const property = stays[0];

export function BookingExperience() {
  const search = useSearchParams();
  const today = new Date();
  const [checkIn, setCheckIn] = useState(search.get("checkIn") ?? format(addDays(today, 1), "yyyy-MM-dd"));
  const [checkOut, setCheckOut] = useState(search.get("checkOut") ?? format(addDays(today, 3), "yyyy-MM-dd"));
  const [guests, setGuests] = useState(Number(search.get("guests") ?? 2));
  const [selected, setSelected] = useState<Stay | null>(stays.find((item) => item.slug === search.get("stay")) ?? null);
  const [step, setStep] = useState(selected ? 2 : 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<BookingResult | null>(null);

  const isSuitable = guests <= property.maxGuests;
  const preview = useMemo(() => calculatePrice({
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut),
    guests,
    baseGuests: property.baseGuests,
    basePrice: property.basePrice
  }), [checkIn, checkOut, guests]);

  const quote = selected ? calculatePrice({
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut),
    guests,
    baseGuests: selected.baseGuests,
    basePrice: selected.basePrice,
    rules: [
      { type: "WEEKDAY", amount: 250000, priority: 10, weekdays: [5, 6] },
      { type: "EXTRA_GUEST", amount: 300000, priority: 20, minGuests: selected.baseGuests + 1 }
    ]
  }) : null;

  useEffect(() => { setError(""); }, [step]);

  const choose = () => {
    setSelected(property);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      unitId: selected.unitId,
      checkIn,
      checkOut,
      guests,
      fullName: form.get("fullName"),
      phone: form.get("phone"),
      email: form.get("email"),
      note: form.get("note"),
      consent: form.get("consent") === "on"
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message ?? "Không thể tạo yêu cầu");
      setResult(data);
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  if (step === 3 && result && selected) {
    return <div className="container-lago py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-lago-mist"><Check className="h-9 w-9" /></span>
        <p className="eyebrow mt-8 text-lago-clay">Yêu cầu đã được ghi nhận</p>
        <h1 className="display mt-3 text-5xl font-semibold">Lago House đang được giữ cho bạn.</h1>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-lago-ink/65">Đội ngũ Lago sẽ liên hệ qua điện thoại hoặc Zalo để xác nhận. Bạn chưa cần thanh toán ở bước này.</p>
        <div className="card mt-9 p-7 text-left">
          <div className="flex items-center justify-between border-b border-lago-ink/10 pb-5"><span className="text-sm text-lago-ink/60">Mã yêu cầu</span><strong className="text-xl tracking-wider">{result.code}</strong></div>
          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div><span className="text-lago-ink/50">Căn nhà</span><p className="mt-1 font-bold">{selected.name}</p></div>
            <div><span className="text-lago-ink/50">Tạm tính</span><p className="mt-1 font-bold">{formatCurrency(result.totalAmount)}</p></div>
            <div><span className="text-lago-ink/50">Thời gian</span><p className="mt-1 font-bold">{checkIn} → {checkOut}</p></div>
            <div><span className="text-lago-ink/50">Giữ đến</span><p className="mt-1 font-bold">{new Date(result.holdExpiresAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</p></div>
          </div>
        </div>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><a className="btn-primary" href="tel:0900000000"><Phone className="h-4 w-4" /> Gọi Lago</a><a className="btn-light border border-lago-ink/15" href="https://zalo.me/0900000000">Liên hệ Zalo</a></div>
        <Link href="/tra-cuu" className="mt-6 inline-block text-sm font-bold underline underline-offset-4">Tra cứu yêu cầu</Link>
      </div>
    </div>;
  }

  return <div className="container-lago py-12 sm:py-20">
    <div className="mb-10 flex items-center gap-3 text-[.68rem] font-bold uppercase tracking-wider text-lago-ink/40">
      <span className={step >= 1 ? "text-lago-ink" : ""}>1. Kiểm tra lịch</span><span>—</span><span className={step >= 2 ? "text-lago-ink" : ""}>2. Thông tin</span><span>—</span><span>3. Hoàn tất</span>
    </div>

    {step === 1 && <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="eyebrow text-lago-clay">Lịch Lago House</p><h1 className="display mt-3 max-w-2xl text-5xl font-semibold">Kỳ nghỉ của bạn bắt đầu ngày nào?</h1></div>
        <div className="grid gap-3 rounded-2xl bg-lago-cream p-4 sm:grid-cols-3">
          <label className="text-xs font-bold">Ngày đến<input className="input mt-2" type="date" min={format(today, "yyyy-MM-dd")} value={checkIn} onChange={(event) => setCheckIn(event.target.value)} /></label>
          <label className="text-xs font-bold">Ngày về<input className="input mt-2" type="date" min={checkIn} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} /></label>
          <label className="text-xs font-bold">Số khách<select className="input mt-2" value={guests} onChange={(event) => setGuests(Number(event.target.value))}>{Array.from({ length: property.maxGuests }, (_, index) => <option key={index + 1}>{index + 1}</option>)}</select></label>
        </div>
      </div>

      <article className="card mt-10 grid overflow-hidden lg:grid-cols-[minmax(300px,.85fr)_1fr]">
        <div className="relative min-h-[320px] bg-cover bg-center lg:min-h-[440px]" style={{ backgroundImage: `linear-gradient(to top, rgba(10,34,28,.5), transparent 55%), url(${property.image})` }}><span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[.62rem] font-bold uppercase tracking-wider">Ảnh concept</span></div>
        <div className="flex flex-col justify-between p-7 sm:p-10">
          <div><p className="eyebrow text-lago-moss">Nhà nguyên căn · không chia sẻ</p><h2 className="display mt-2 text-4xl font-semibold">{property.name}</h2><p className="mt-4 leading-7 text-lago-ink/60">{property.description}</p><div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold"><span className="flex items-center gap-2"><House className="h-4 w-4" /> Toàn bộ căn nhà</span><span className="flex items-center gap-2"><Users className="h-4 w-4" /> Tối đa {property.maxGuests} khách</span></div></div>
          <div className="mt-8 flex flex-col gap-5 border-t border-lago-ink/10 pt-7 sm:flex-row sm:items-end sm:justify-between"><div><span className="text-xs text-lago-ink/50">Tạm tính · {preview.nights} đêm</span><p className="mt-1 text-2xl font-bold">{formatCurrency(preview.total)}</p></div><button onClick={choose} disabled={!isSuitable} className="btn-primary">Tiếp tục giữ căn <ArrowRight className="h-4 w-4" /></button></div>
        </div>
      </article>
    </>}

    {step === 2 && selected && quote && <div className="grid gap-10 lg:grid-cols-[1fr_390px]">
      <div>
        <button onClick={() => setStep(1)} className="mb-7 flex items-center gap-2 text-sm font-bold"><ArrowLeft className="h-4 w-4" /> Chọn lại ngày</button>
        <p className="eyebrow text-lago-clay">Thông tin liên hệ</p><h1 className="display mt-3 text-5xl font-semibold">Lago sẽ liên hệ với ai?</h1><p className="mt-4 text-lago-ink/60">Chưa cần thanh toán. Căn nhà sẽ được giữ 2 giờ trong lúc đội ngũ Lago xác nhận.</p>
        <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold sm:col-span-2">Họ và tên *<input required name="fullName" className="input mt-2" placeholder="Nguyễn Minh Anh" /></label>
          <label className="text-sm font-bold">Số điện thoại / Zalo *<input required name="phone" className="input mt-2" placeholder="090 123 4567" /></label>
          <label className="text-sm font-bold">Email (không bắt buộc)<input name="email" type="email" className="input mt-2" placeholder="ban@email.com" /></label>
          <label className="text-sm font-bold sm:col-span-2">Lời nhắn<textarea name="note" className="input mt-2 h-28 py-3" placeholder="Giờ đến dự kiến hoặc yêu cầu đặc biệt..." /></label>
          <label className="flex items-start gap-3 text-sm leading-6 sm:col-span-2"><input required name="consent" type="checkbox" className="mt-1 h-4 w-4 accent-lago-forest" />Tôi đồng ý để Lago sử dụng thông tin này nhằm xử lý yêu cầu đặt căn.</label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700 sm:col-span-2">{error}</p>}
          <button disabled={loading} className="btn-primary sm:col-span-2">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><ShieldCheck className="h-5 w-5" /> Gửi yêu cầu giữ căn</>}</button>
        </form>
      </div>
      <aside className="card h-fit overflow-hidden lg:sticky lg:top-28">
        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${selected.image})` }} />
        <div className="p-6"><p className="eyebrow text-lago-moss">Nguyên căn</p><h2 className="display mt-1 text-3xl font-semibold">{selected.name}</h2><p className="mt-2 text-sm text-lago-ink/60">{checkIn} → {checkOut} · {guests} khách</p><div className="mt-6 space-y-3 border-y border-lago-ink/10 py-5 text-sm"><div className="flex justify-between"><span>{quote.nights} đêm</span><span>{formatCurrency(quote.base)}</span></div>{quote.extraGuest > 0 && <div className="flex justify-between"><span>Phụ thu khách</span><span>{formatCurrency(quote.extraGuest)}</span></div>}</div><div className="mt-5 flex justify-between"><strong>Tổng tạm tính</strong><strong className="text-xl">{formatCurrency(quote.total)}</strong></div><p className="mt-5 flex gap-2 rounded-xl bg-lago-cream p-3 text-xs leading-5"><Clock3 className="h-4 w-4 shrink-0" />Giá được lưu tại thời điểm gửi yêu cầu. Lago sẽ xác nhận mức cuối cùng khi liên hệ.</p></div>
      </aside>
    </div>}
  </div>;
}
