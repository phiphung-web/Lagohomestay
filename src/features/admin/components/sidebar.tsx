"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BedDouble, CalendarDays, CircleDollarSign, FileText, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { signOut } from "next-auth/react";
import { Logo } from "@/shared/components/layout/logo";

const navigation = [
  ["/admin/tong-quan", "Tổng quan", LayoutDashboard],
  ["/admin/lich", "Lịch căn", CalendarDays],
  ["/admin/booking", "Booking", BedDouble],
  ["/admin/khach-hang", "Khách hàng", Users],
  ["/admin/thu-chi", "Khoản thu", CircleDollarSign],
  ["/admin/bao-cao", "Báo cáo", BarChart3],
  ["/admin/noi-dung", "Nội dung", FileText],
  ["/admin/cau-hinh", "Cấu hình", Settings]
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-lago-ink/10 bg-white p-5 lg:flex"><Logo/><nav className="mt-10 flex-1 space-y-1">{navigation.map(([href,label,Icon]) => <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${pathname.startsWith(href) ? "bg-lago-ink text-white" : "text-lago-ink/65 hover:bg-lago-cream hover:text-lago-ink"}`}><Icon className="h-[18px] w-[18px]"/>{label}</Link>)}</nav><button onClick={() => signOut({callbackUrl:"/admin/dang-nhap"})} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-lago-ink/60 hover:bg-lago-cream"><LogOut className="h-[18px] w-[18px]"/>Đăng xuất</button></aside>;
}
