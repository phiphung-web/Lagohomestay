import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Lago Homestay — Ở chậm giữa thiên nhiên", template: "%s | Lago Homestay" },
  description: "Một khoảng xanh để mình thật sự nghỉ ngơi. Xem phòng trống và gửi yêu cầu đặt chỗ trực tiếp tại Lago Homestay.",
  openGraph: { title: "Lago Homestay", description: "Ở chậm giữa thiên nhiên", type: "website", locale: "vi_VN" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
