import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./logo";
import { publicContact } from "@/shared/lib/public-contact";

export function Footer() {
  return <footer className="bg-lago-ink text-white">
    <div className="container-lago grid gap-10 py-16 text-center md:grid-cols-2 md:text-left xl:grid-cols-[1.2fr_1.3fr_.9fr]">
      <div className="flex flex-col items-center md:items-start">
        <Logo inverse />
      </div>
      <div>
        <p className="eyebrow text-white/45">Thông tin</p>
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5 text-sm font-medium">
          <Link href="/di-chuyen">Hướng dẫn di chuyển</Link>
          <Link href="/dieu-khoan">Điều khoản</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/bao-mat">Bảo mật</Link>
          <Link href="/chinh-sach-luu-tru">Chính sách lưu trú</Link>
          <Link href="/lien-he" className="font-bold text-white">Liên hệ</Link>
        </div>
      </div>
      <div>
        <p className="eyebrow text-white/45">Kết nối</p>
        <div className="mt-5 flex flex-col items-center gap-3.5 text-sm md:items-start">
          <a href={publicContact.phoneHref} className="flex items-center gap-2.5 font-bold hover:underline"><Phone className="h-4 w-4 shrink-0 text-lago-clay" />{publicContact.phoneDisplay}</a>
          <a href={publicContact.zaloHref} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:underline"><MessageCircle className="h-4 w-4 shrink-0 text-lago-clay" />Trò chuyện qua Zalo</a>
          <a href={publicContact.emailHref} className="flex items-center gap-2.5 hover:underline"><Mail className="h-4 w-4 shrink-0 text-lago-clay" />{publicContact.email}</a>
          <span className="flex items-start justify-center gap-2.5 leading-6 text-white/65 md:justify-start"><MapPin className="mt-1 h-4 w-4 shrink-0 text-lago-clay" />{publicContact.address}</span>
        </div>
      </div>
    </div>
    <div className="container-lago flex flex-col items-center gap-5 border-t border-white/10 py-8 text-center">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4" aria-label="Các kênh liên hệ">
        <a href="https://facebook.com/lagohomestay" target="_blank" rel="noreferrer" aria-label="Facebook LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="https://m.me/lagohomestay" target="_blank" rel="noreferrer" aria-label="Messenger LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.09.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.96 3.127 3.26 5.89-3.26-6.558 6.96z"/></svg>
        </a>
        <a href="https://instagram.com/lagohomestay" target="_blank" rel="noreferrer" aria-label="Instagram LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
          <Instagram className="h-4 w-4" />
        </a>
        <a href={publicContact.zaloHref} target="_blank" rel="noreferrer" aria-label="Zalo LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.52 3.66 1.43 5.18L2 22l4.98-1.39C8.44 21.5 10.18 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1.8 13.6h-2.8v-1.6l2.3-3.4H7.4V9h4.4v1.6l-2.3 3.4h2.7v1.6zm2.8 0h-1.6V9h1.6v6.6zm3.4 0c-1.3 0-2.3-1-2.3-2.3V9h1.6v4.3c0 .4.3.7.7.7s.7-.3.7-.7V9h1.6v4.3c0 1.3-1 2.3-2.3 2.3z"/></svg>
        </a>
        <a href="https://tiktok.com/@lagohomestay" target="_blank" rel="noreferrer" aria-label="TikTok LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .57.04.84.12V9.34a6.34 6.34 0 00-1-.08 6.33 6.33 0 00-6.33 6.33 6.33 6.33 0 0010.82 4.48V11.8a8.31 8.31 0 005.23 1.83V10.1a4.84 4.84 0 01-2.45-3.41z"/></svg>
        </a>
        <a href={publicContact.phoneHref} aria-label="Hotline LAKA" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
          <Phone className="h-4 w-4" />
        </a>
      </div>
      <div className="text-xs leading-6 text-white/65">
        <p>@2026 Lakahomestay</p>
        <p className="mt-0.5">Dốc Dây Diều, Xóm 1, Thanh Hà, Trung Giã, Hà Nội</p>
        <p className="mt-0.5">{publicContact.phoneDisplay}</p>
      </div>
    </div>
  </footer>;
}
