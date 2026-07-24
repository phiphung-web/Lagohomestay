import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  applicationName: "LAKA Homestay",
  manifest: "/manifest.webmanifest",
  title: { default: "LAKA Homestay — Bộ sưu tập nhà giữa thiên nhiên", template: "%s | LAKA Homestay" },
  description: "Những căn nhà nghỉ dưỡng riêng tư cho cặp đôi, gia đình và nhóm bạn. Chọn căn phù hợp, kiểm tra lịch và đặt trực tiếp tại LAKA.",
  openGraph: { title: "LAKA Homestay", description: "Mỗi căn nhà, một cách để trở về", type: "website", locale: "vi_VN" }
};

export const viewport: Viewport = { themeColor: "#16311c", colorScheme: "light", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
