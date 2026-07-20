import type { Metadata } from "next";
import { LookupForm } from "@/features/booking/components/lookup-form";
import { SiteShell } from "@/shared/components/layout/site-shell";

export const metadata: Metadata = { title: "Xem thông tin đặt chỗ", description: "Xem lại yêu cầu đặt chỗ tại LAKA bằng số điện thoại đã sử dụng." };

export default function LookupPage() {
  return <SiteShell><section className="min-h-[calc(100svh-76px)] bg-lago-cream py-16 sm:py-24"><div className="container-lago grid gap-12 lg:grid-cols-[1fr_480px]"><div className="pt-5"><p className="eyebrow text-lago-clay">Thông tin chuyến đi</p><h1 className="display mt-4 text-5xl font-semibold sm:text-7xl">Xem lại đặt chỗ của bạn.</h1><p className="mt-6 max-w-xl leading-7 text-lago-ink/60">Chỉ cần nhập số điện thoại đã dùng khi đặt. LAKA sẽ hiển thị các yêu cầu gần nhất gắn với số này.</p><div className="mt-8 rounded-2xl border border-lago-ink/10 bg-white/60 p-5 text-sm leading-6 text-lago-ink/58">Không cần nhớ mã booking. Nếu cần hỗ trợ ngay, gọi LAKA qua <a href="tel:0900000000" className="font-bold text-lago-ink underline underline-offset-4">0900 000 000</a>.</div></div><LookupForm /></div></section></SiteShell>;
}
