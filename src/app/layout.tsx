import type { Metadata, Viewport } from "next";
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
  applicationName: "Lago Homestay",
  manifest: "/manifest.webmanifest",
  title: { default: "Lago Homestay — Bộ sưu tập nhà giữa thiên nhiên", template: "%s | Lago Homestay" },
  description: "Những căn nhà nghỉ dưỡng riêng tư cho cặp đôi, gia đình và nhóm bạn. Chọn căn phù hợp, kiểm tra lịch và đặt trực tiếp tại Lago.",
  openGraph: { title: "Lago Homestay", description: "Mỗi căn nhà, một cách để trở về", type: "website", locale: "vi_VN" }
};

export const viewport: Viewport = { themeColor: "#17312b", colorScheme: "light", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
