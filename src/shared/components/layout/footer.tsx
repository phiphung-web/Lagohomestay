import Link from "next/link";
import { ArrowUpRight, Instagram, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  return <footer className="bg-lago-ink text-white">
    <div className="container-lago grid gap-12 py-16 md:grid-cols-[1.4fr_.8fr_.8fr]">
      <div><Logo inverse /><p className="mt-6 max-w-sm text-sm leading-7 text-white/65">Một nơi để thời gian chậm lại, thiên nhiên gần hơn và những cuộc trò chuyện dài thêm.</p><p className="mt-5 text-xs text-white/45">Hình ảnh trên website hiện là ảnh concept minh họa.</p></div>
      <div><p className="eyebrow text-white/45">Khám phá</p><div className="mt-5 flex flex-col gap-3 text-sm"><Link href="/luu-tru">Căn nhà Lago House</Link><Link href="/trai-nghiem">Trải nghiệm tại Lago</Link><Link href="/thong-tin">Câu hỏi thường gặp</Link><Link href="/chinh-sach">Chính sách lưu trú</Link></div></div>
      <div><p className="eyebrow text-white/45">Kết nối</p><div className="mt-5 flex flex-col gap-4 text-sm"><a href="tel:0900000000" className="flex gap-3"><Phone className="h-4 w-4"/>0900 000 000</a><a href="https://zalo.me/0900000000" className="flex gap-3">Zalo đặt phòng <ArrowUpRight className="h-4 w-4"/></a><span className="flex gap-3 text-white/65"><MapPin className="h-4 w-4 shrink-0"/>Địa chỉ sẽ được cập nhật</span><span className="flex gap-3"><Instagram className="h-4 w-4"/>@lagohomestay</span></div></div>
    </div>
    <div className="container-lago flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:justify-between"><span>© 2026 Lago Homestay</span><span>Ở chậm giữa thiên nhiên</span></div>
  </footer>;
}
