import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingExperience } from "@/features/booking/components/booking-experience";
import { SiteShell } from "@/shared/components/layout/site-shell";

export const metadata: Metadata = { title: "Chọn căn và đặt chỗ", description: "Kiểm tra lịch trống, so sánh các căn phù hợp và gửi yêu cầu giữ chỗ tại LAKA Homestay." };
export default function BookingPage() { return <SiteShell><Suspense fallback={<div className="container-lago py-24">Đang chuẩn bị lịch căn nhà…</div>}><BookingExperience/></Suspense></SiteShell>; }
