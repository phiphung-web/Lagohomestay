import Link from "next/link";
import { Instagram, Phone } from "lucide-react";
import { Logo } from "./logo";
import { publicContact } from "@/shared/lib/public-contact";

export function Footer() {
  return <footer className="bg-lago-ink text-white">
    <div className="container-lago grid items-start gap-10 pt-14 pb-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-[1fr_1.1fr_auto]">
      {/* Col 1: Logo */}
      <div className="flex flex-col items-center md:items-start">
        <Logo inverse />
      </div>

      {/* Col 2: Thông tin - Mobile: 1 hàng; Desktop: 2 cột */}
      <div className="flex flex-col items-center md:items-start">
        <div className="w-full text-center md:text-left">
          <p className="eyebrow text-white/45">Thông tin</p>
          {/* Mobile view */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] font-medium text-white/85 md:hidden">
            <Link href="/di-chuyen" className="transition hover:text-white hover:underline">Hướng dẫn di chuyển</Link>
            <Link href="/dieu-khoan" className="transition hover:text-white hover:underline">Điều khoản</Link>
            <Link href="/faq" className="transition hover:text-white hover:underline">FAQ</Link>
            <Link href="/bao-mat" className="transition hover:text-white hover:underline">Bảo mật</Link>
            <Link href="/chinh-sach-luu-tru" className="transition hover:text-white hover:underline">Chính sách lưu trú</Link>
            <Link href="/lien-he" className="font-bold text-white transition hover:underline">Liên hệ</Link>
          </div>
          {/* Desktop view */}
          <div className="mt-5 hidden grid-cols-2 gap-x-8 gap-y-3.5 text-[15px] font-medium text-white/80 md:grid">
            <Link href="/di-chuyen" className="transition hover:text-white hover:underline">Hướng dẫn di chuyển</Link>
            <Link href="/dieu-khoan" className="transition hover:text-white hover:underline">Điều khoản</Link>
            <Link href="/faq" className="transition hover:text-white hover:underline">FAQ</Link>
            <Link href="/bao-mat" className="transition hover:text-white hover:underline">Bảo mật</Link>
            <Link href="/chinh-sach-luu-tru" className="transition hover:text-white hover:underline">Chính sách lưu trú</Link>
            <Link href="/lien-he" className="font-bold text-white transition hover:underline">Liên hệ</Link>
          </div>
        </div>
      </div>

      {/* Col 3: Kết nối */}
      <div className="flex flex-col items-center md:col-span-2 md:items-start lg:col-span-1">
        <p className="eyebrow text-white/45">Kết nối</p>
        <div className="mt-5 flex justify-center md:justify-start">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:flex-nowrap md:justify-start" aria-label="Các kênh liên hệ">
            <a href={publicContact.facebookHref} target="_blank" rel="noreferrer" aria-label="Facebook LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-white/45 bg-white/10 text-white shadow-sm transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={publicContact.messengerHref} target="_blank" rel="noreferrer" aria-label="Messenger LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-white/45 bg-white/10 text-white shadow-sm transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.09.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.96 3.127 3.26 5.89-3.26-6.558 6.96z"/></svg>
            </a>
            <a href={publicContact.instagramHref} target="_blank" rel="noreferrer" aria-label="Instagram LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-white/45 bg-white/10 text-white shadow-sm transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={publicContact.zaloHref} target="_blank" rel="noreferrer" aria-label="Zalo LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-white/45 bg-white/10 text-white shadow-sm transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <mask id="zalo-mask-footer-shared">
                  <rect width="24" height="24" fill="white" />
                  <text x="12" y="12.2" textAnchor="middle" dominantBaseline="middle" fill="black" fontSize="5.2" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.2px">zalo</text>
                </mask>
                <path mask="url(#zalo-mask-footer-shared)" d="M12 2.5C6.75 2.5 2.5 6.3 2.5 11c0 2.7 1.43 5.1 3.65 6.6L5.3 21.5l4.2-1.4c.8.2 1.65.4 2.5.4 5.25 0 9.5-3.8 9.5-8.5s-4.25-8.5-9.5-8.5z" />
              </svg>
            </a>
            <a href={publicContact.tiktokHref} target="_blank" rel="noreferrer" aria-label="TikTok LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-white/45 bg-white/10 text-white shadow-sm transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
            <a href={publicContact.phoneHref} aria-label="Hotline LAKA" className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-lg border-2 border-white/45 bg-white/10 text-white shadow-sm transition hover:scale-105 hover:border-lago-clay hover:bg-lago-clay hover:text-white">
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="container-lago border-t border-white/20 py-6 text-center">
      <div className="text-sm leading-6 text-white/65">
        <p>@2026 Lakahomestay</p>
        <p className="mt-0.5">Dốc Dây Diều, Xóm 1, Thanh Hà, Trung Giã, Hà Nội</p>
        <p className="mt-0.5">{publicContact.email}</p>
        <p className="mt-0.5">{publicContact.phoneDisplay}</p>
      </div>
    </div>
  </footer>;
}
