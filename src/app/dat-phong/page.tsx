import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingExperience } from "@/features/booking/components/booking-experience";
import { SiteShell } from "@/shared/components/layout/site-shell";

export const metadata: Metadata = { title: "Đặt phòng", description: "Kiểm tra lịch trống và gửi yêu cầu giữ chỗ tại Lago Homestay." };
export default function BookingPage() { return <SiteShell><Suspense fallback={<div className="container-lago py-24">Đang chuẩn bị lịch trống…</div>}><BookingExperience/></Suspense></SiteShell>; }
