import type { Metadata } from "next";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/lora/500.css";
import "@fontsource/lora/600.css";
import "@fontsource/lora/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Lago Homestay — Nhà nguyên căn giữa thiên nhiên", template: "%s | Lago Homestay" },
  description: "Một căn nhà nguyên căn riêng tư để gia đình và bạn bè thật sự nghỉ ngơi. Kiểm tra lịch và gửi yêu cầu đặt Lago House trực tiếp.",
  openGraph: { title: "Lago Homestay", description: "Một căn nhà, trọn một khoảng riêng", type: "website", locale: "vi_VN" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
