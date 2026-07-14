import { redirect } from "next/navigation";
import { auth } from "@/server/auth/auth";
import { AdminSidebar } from "@/features/admin/components/sidebar";
import { AdminMobileNav } from "@/features/admin/components/mobile-nav";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth(); if (!session?.user) redirect("/admin/dang-nhap");
  return <div className="min-h-screen bg-[#f5f5f1]"><AdminSidebar/><AdminMobileNav/><main className="lg:ml-64"><div className="mx-auto max-w-[1500px] p-4 sm:p-8">{children}</div></main></div>;
}
