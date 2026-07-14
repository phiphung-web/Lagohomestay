import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bath, BedDouble, Check, House, Users } from "lucide-react";
import { SiteShell } from "@/shared/components/layout/site-shell";
import { stays } from "@/features/stays/data/demo-data";
import { formatCurrency } from "@/shared/lib/format";

export const metadata: Metadata = {
  title: "Lago House — Nhà nguyên căn",
  description: "Khám phá Lago House, căn nhà riêng tư dành trọn cho gia đình và nhóm bạn."
};

export default function StaysPage() {
  const stay = stays[0];
  return <SiteShell>
    <section className="bg-lago-cream pb-16 pt-16 sm:pb-24 sm:pt-24">
      <div className="container-lago">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_.7fr]">
          <div><p className="eyebrow text-lago-clay">Một căn nhà duy nhất</p><h1 className="display mt-4 text-5xl font-semibold leading-[1.05] sm:text-7xl">Lago House.<br /><em className="font-medium text-lago-moss">Cả nhà là của bạn.</em></h1></div>
          <p className="max-w-xl leading-7 text-lago-ink/65">Lago bắt đầu với một căn nhà nguyên căn. Không gian không bị chia nhỏ thành nhiều phòng bán riêng, để mỗi cuộc gặp gỡ có được sự riêng tư và liền mạch trọn vẹn.</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[36px] bg-white shadow-soft">
          <div className="grid lg:grid-cols-[1.25fr_.75fr]">
            <div className="image-zoom relative min-h-[430px] overflow-hidden lg:min-h-[650px]"><Image src={stay.image} alt="Lago House - ảnh concept" fill priority sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" /><span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[.62rem] font-bold uppercase tracking-wider">Ảnh concept</span></div>
            <div className="flex flex-col justify-between p-7 sm:p-10">
              <div><p className="eyebrow text-lago-moss">{stay.subtitle}</p><h2 className="display mt-3 text-4xl font-semibold">{stay.name}</h2><p className="mt-5 text-sm leading-7 text-lago-ink/60">{stay.longDescription}</p><div className="mt-8 grid grid-cols-2 gap-3">{[[Users, `${stay.maxGuests} khách`], [BedDouble, `${stay.bedrooms} phòng ngủ`], [Bath, `${stay.bathrooms} phòng tắm`], [House, `${stay.area} m² nguyên căn`]].map(([Icon, label]) => { const C = Icon as typeof Users; return <span key={String(label)} className="flex items-center gap-2 rounded-xl bg-lago-cream p-3 text-xs font-semibold"><C className="h-4 w-4 text-lago-clay" />{String(label)}</span>; })}</div><div className="mt-8 space-y-3">{stay.amenities.slice(0, 5).map((item) => <span key={item} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-lago-moss" />{item}</span>)}</div></div>
              <div className="mt-10 border-t border-lago-ink/10 pt-7"><span className="text-xs text-lago-ink/50">Giá tham khảo từ</span><p className="mt-1"><strong className="display text-3xl">{formatCurrency(stay.basePrice)}</strong> <span className="text-sm text-lago-ink/50">/ đêm</span></p><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><Link href={`/luu-tru/${stay.slug}`} className="btn-light border border-lago-ink/15">Xem toàn bộ căn nhà</Link><Link href={`/dat-phong?stay=${stay.slug}`} className="btn-primary">Kiểm tra lịch <ArrowRight className="h-4 w-4" /></Link></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </SiteShell>;
}
