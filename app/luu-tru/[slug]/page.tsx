import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bath, BedDouble, Check, Expand, Users } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { stays } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/format";

export function generateStaticParams() { return stays.map((stay) => ({ slug: stay.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const stay = stays.find((s) => s.slug === slug);
  return { title: stay?.name ?? "Không gian lưu trú", description: stay?.description };
}

export default async function StayDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const stay = stays.find((s) => s.slug === slug); if (!stay) notFound();
  return <SiteShell><section className="relative h-[72vh] min-h-[560px] text-white"><Image src={stay.image} alt={`${stay.name} - ảnh concept`} fill priority sizes="100vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-lago-ink/85 via-transparent to-black/15"/><div className="container-lago absolute inset-x-0 bottom-12"><span className="rounded-full bg-white/90 px-3 py-1 text-[.62rem] font-bold uppercase tracking-wider text-lago-ink">Ảnh concept</span><p className="eyebrow mt-5 text-white/70">{stay.subtitle}</p><h1 className="display mt-2 text-6xl font-semibold sm:text-8xl">{stay.name}</h1></div></section>
    <section className="section-pad"><div className="container-lago grid gap-14 lg:grid-cols-[1fr_380px]"><div><p className="display text-3xl leading-snug sm:text-4xl">{stay.longDescription}</p><div className="mt-10 flex flex-wrap gap-6 border-y border-lago-ink/10 py-6 text-sm font-semibold"><span className="flex items-center gap-2"><Users className="h-5 w-5"/>Tối đa {stay.maxGuests} khách</span><span className="flex items-center gap-2"><BedDouble className="h-5 w-5"/>{stay.bedrooms} phòng ngủ</span><span className="flex items-center gap-2"><Bath className="h-5 w-5"/>{stay.bathrooms} phòng tắm</span><span className="flex items-center gap-2"><Expand className="h-5 w-5"/>{stay.area} m²</span></div><h2 className="display mt-12 text-4xl font-semibold">Tiện nghi trong căn</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{stay.amenities.map((item) => <span key={item} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-lago-moss"/>{item}</span>)}</div></div><aside className="h-fit rounded-[28px] border border-lago-ink/10 bg-white p-7 shadow-soft lg:sticky lg:top-28"><p className="text-sm text-lago-ink/60">Giá từ</p><p className="mt-1"><strong className="display text-4xl">{formatCurrency(stay.basePrice)}</strong> / đêm</p><p className="mt-3 text-xs leading-5 text-lago-ink/55">Giá chính xác phụ thuộc ngày lưu trú và số khách.</p><Link href={`/dat-phong?stay=${stay.slug}`} className="btn-primary mt-6 w-full">Kiểm tra lịch trống <ArrowRight className="h-4 w-4"/></Link><p className="mt-4 text-center text-xs text-lago-ink/50">Giữ chỗ 2 giờ · Chưa cần thanh toán</p></aside></div></section>
    <section className="pb-24"><div className="container-lago grid gap-4 sm:grid-cols-3">{stay.gallery.map((image, index) => <div key={image} className={`relative overflow-hidden rounded-[24px] ${index === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[4/3]" : "aspect-[4/3]"}`}><Image src={image} alt={`Không gian ${stay.name} ${index + 1} - ảnh concept`} fill sizes="50vw" className="object-cover"/></div>)}</div></section></SiteShell>;
}
