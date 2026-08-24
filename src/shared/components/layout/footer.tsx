import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./logo";
import { publicContact } from "@/shared/lib/public-contact";

export function Footer() {
  return <footer className="bg-lago-ink text-white">
    <div className="container-lago grid gap-10 py-16 text-left md:grid-cols-2 xl:grid-cols-[1.2fr_1.3fr_.9fr]">
      <div className="flex flex-col items-start">
        <Logo inverse />
      </div>
      <div className="text-left">
        <p className="eyebrow text-white/45">Thông tin</p>
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5 text-[15px] font-medium text-white/80">
          <Link href="/di-chuyen">Hướng dẫn di chuyển</Link>
          <Link href="/dieu-khoan">Điều khoản</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/bao-mat">Bảo mật</Link>
          <Link href="/chinh-sach-luu-tru">Chính sách lưu trú</Link>
          <Link href="/lien-he" className="font-bold text-white">Liên hệ</Link>
        </div>
      </div>
      <div className="text-left">
        <p className="eyebrow text-white/45">Kết nối</p>
        <div className="mt-5 flex flex-wrap items-center justify-start gap-3 sm:gap-4" aria-label="Các kênh liên hệ">
          <a href="https://facebook.com/lagohomestay" target="_blank" rel="noreferrer" aria-label="Facebook LAKA" className="focus-ring grid h-12 w-12 place-items-center rounded-md border border-white/30 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://m.me/lagohomestay" target="_blank" rel="noreferrer" aria-label="Messenger LAKA" className="focus-ring grid h-12 w-12 place-items-center rounded-md border border-white/30 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.09.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.96 3.127 3.26 5.89-3.26-6.558 6.96z"/></svg>
          </a>
          <a href="https://instagram.com/lagohomestay" target="_blank" rel="noreferrer" aria-label="Instagram LAKA" className="focus-ring grid h-12 w-12 place-items-center rounded-md border border-white/30 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
            <Instagram className="h-5 w-5" />
          </a>
          <a href={publicContact.zaloHref} target="_blank" rel="noreferrer" aria-label="Zalo LAKA" className="focus-ring grid h-12 w-12 place-items-center rounded-md border border-white/30 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.52 3.66 1.43 5.18L2 22l4.98-1.39C8.44 21.5 10.18 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1.8 13.6h-2.8v-1.6l2.3-3.4H7.4V9h4.4v1.6l-2.3 3.4h2.7v1.6zm2.8 0h-1.6V9h1.6v6.6zm3.4 0c-1.3 0-2.3-1-2.3-2.3V9h1.6v4.3c0 .4.3.7.7.7s.7-.3.7-.7V9h1.6v4.3c0 1.3-1 2.3-2.3 2.3z" />
            </svg>
          </a>
          <a href="https://tiktok.com/@lagohomestay" target="_blank" rel="noreferrer" aria-label="TikTok LAKA" className="focus-ring grid h-12 w-12 place-items-center rounded-md border border-white/30 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
          </a>
          <a href={publicContact.phoneHref} aria-label="Hotline LAKA" className="focus-ring grid h-12 w-12 place-items-center rounded-md border border-white/30 transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
            <Phone className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
    <div className="container-lago border-t border-white/20 py-8">
      <div className="flex flex-col items-center">
        <div className="w-full text-left sm:w-auto text-sm leading-6 text-white/65">
          <p>@2026 Lakahomestay</p>
          <p className="mt-0.5">Dốc Dây Diều, Xóm 1, Thanh Hà, Trung Giã, Hà Nội</p>
          <p className="mt-0.5">{publicContact.email}</p>
          <p className="mt-0.5">{publicContact.phoneDisplay}</p>
        </div>
      </div>
    </div>
  </footer>;
}
