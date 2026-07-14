import type { Metadata } from "next";
import { LookupForm } from "@/features/booking/components/lookup-form";
import { SiteShell } from "@/shared/components/layout/site-shell";
export const metadata:Metadata={title:"Tra cứu booking"};
export default function LookupPage(){return <SiteShell><section className="bg-lago-cream py-20"><div className="container-lago grid gap-12 lg:grid-cols-[1fr_480px]"><div className="pt-5"><p className="eyebrow text-lago-clay">Booking của bạn</p><h1 className="display mt-4 text-5xl font-semibold sm:text-7xl">Tra cứu yêu cầu lưu trú</h1><p className="mt-6 max-w-xl leading-7 text-lago-ink/60">Nhập mã yêu cầu và số điện thoại bạn đã sử dụng. Nếu cần hỗ trợ ngay, hãy gọi Lago qua số 0900 000 000.</p></div><LookupForm/></div></section></SiteShell>}
