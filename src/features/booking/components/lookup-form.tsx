"use client";

import { CalendarDays, Loader2, Phone, Search, Users } from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "@/features/booking/components/status-badge";
import { validateLookupPhone } from "@/features/booking/domain/contact-validation";
import { formatCurrency } from "@/shared/lib/format";

type Result = { status: string; stayName: string; checkIn: string; checkOut: string; guests: number; totalAmount: number; holdExpiresAt?: string | null };

export function LookupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [phoneError, setPhoneError] = useState("");
  const [searched, setSearched] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const phone = String(form.get("phone") ?? "");
    const validationError = validateLookupPhone(phone);
    if (validationError) { setPhoneError(validationError); return; }
    setPhoneError("");
    setLoading(true);
    setSearched(false);
    setError("");
    setResults([]);
    try {
      const response = await fetch("/api/bookings/lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone }) });
      const data = await response.json();
      if (response.status === 404) setSearched(true);
      else if (!response.ok) setError(data.message);
      else { setResults(data.bookings); setSearched(true); }
    } catch {
      setError("Chưa thể kiểm tra lúc này. Vui lòng thử lại hoặc gọi LAKA.");
    } finally {
      setLoading(false);
    }
  };

  return <div>
    <form noValidate aria-busy={loading} onSubmit={submit} className="card p-6 sm:p-8">
      <label className="block text-sm font-bold">Số điện thoại đã đặt
        <input name="phone" type="tel" inputMode="tel" maxLength={20} autoComplete="tel" onInput={() => setPhoneError("")} className="input mt-2 aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50/40" placeholder="090 123 4567" aria-invalid={Boolean(phoneError)} aria-describedby={phoneError ? "lookup-phone-error lookup-phone-hint" : "lookup-phone-hint"} />
      </label>
      <p id="lookup-phone-hint" className="mt-3 text-xs leading-5 text-lago-ink/50">Dùng đúng số điện thoại hoặc số Zalo đã nhập khi gửi yêu cầu.</p>
      {phoneError && <p id="lookup-phone-error" className="mt-2 text-xs font-semibold text-red-700">{phoneError}</p>}
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
      <button disabled={loading} className="btn-primary mt-6 w-full">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}Xem thông tin đặt chỗ</button>
    </form>

    {results.length > 0 && <div className="mt-6 space-y-4" aria-live="polite">
      <div className="flex items-center justify-between px-1"><h2 className="font-bold">Đặt chỗ của bạn</h2><span className="text-xs text-lago-ink/45">{results.length} yêu cầu</span></div>
      {results.map((result, index) => <article key={`${result.stayName}-${result.checkIn}-${index}`} className="card p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4"><div><p className="eyebrow text-lago-moss">Căn đã chọn</p><h3 className="display mt-1 text-2xl font-semibold">{result.stayName}</h3></div><StatusBadge status={result.status} /></div>
        <div className="mt-5 grid gap-4 border-t border-lago-ink/10 pt-5 text-sm sm:grid-cols-3"><div><p className="flex items-center gap-2 text-xs text-lago-ink/45"><CalendarDays className="h-3.5 w-3.5" />Ngày ở</p><p className="mt-1 font-bold">{new Date(result.checkIn).toLocaleDateString("vi-VN")} → {new Date(result.checkOut).toLocaleDateString("vi-VN")}</p></div><div><p className="flex items-center gap-2 text-xs text-lago-ink/45"><Users className="h-3.5 w-3.5" />Số khách</p><p className="mt-1 font-bold">{result.guests} khách</p></div><div><p className="text-xs text-lago-ink/45">Tạm tính</p><p className="mt-1 font-bold">{formatCurrency(result.totalAmount)}</p></div></div>
      </article>)}
    </div>}
    {searched && results.length === 0 && !error && <div className="result-enter mt-6 rounded-[24px] border border-lago-ink/10 bg-white/72 p-7 text-center" aria-live="polite"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-lago-cream"><Phone className="h-5 w-5 text-lago-clay" /></span><h2 className="display mt-4 text-2xl font-semibold">Chưa thấy yêu cầu đặt chỗ</h2><p className="mt-3 text-sm leading-6 text-lago-ink/55">Kiểm tra lại số điện thoại hoặc gọi LAKA nếu bạn đã gửi yêu cầu nhưng chưa thấy thông tin.</p><a href="tel:0900000000" className="soft-link mt-5">Gọi 0900 000 000</a></div>}
  </div>;
}
