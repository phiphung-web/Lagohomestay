import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bath, BedDouble, Check, Expand, MapPin, Sparkles, Users } from "lucide-react";
import { ImmersiveGallery } from "@/features/stays/components/immersive-gallery";
import { stays } from "@/features/stays/data/demo-data";
import { formatCurrency } from "@/shared/lib/format";
import { SiteShell } from "@/shared/components/layout/site-shell";

export function generateStaticParams() { return stays.map((stay) => ({ slug: stay.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const stay = stays.find((item) => item.slug === slug);
  return { title: stay?.name ?? "Căn nhà tại LAKA", description: stay?.description };
}

export default async function StayDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stayIndex = stays.findIndex((item) => item.slug === slug);
  if (stayIndex < 0) notFound();
  const stay = stays[stayIndex];
  const nextStay = stays[(stayIndex + 1) % stays.length];

  return <SiteShell>
    <section className="relative h-[82svh] min-h-[620px] overflow-hidden bg-lago-ink text-white">
      <Image src={stay.image} alt={`${stay.name} - ảnh concept`} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-lago-ink/95 via-lago-ink/5 to-black/20" />
      <div className="container-lago absolute inset-x-0 bottom-10 z-10 sm:bottom-14"><div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-white/92 px-3 py-1 text-[.62rem] font-bold uppercase tracking-wider text-lago-ink">{stay.badge}</span><span className="flex items-center gap-1.5 text-xs font-semibold text-white/65"><MapPin className="h-4 w-4 text-lago-sand" />{stay.location}</span></div><p className="eyebrow mt-5 text-white/60">{stay.subtitle}</p><h1 className="display mt-2 text-6xl font-semibold leading-none sm:text-8xl lg:text-9xl">{stay.name}</h1></div><div className="grid grid-cols-2 gap-x-8 gap-y-4 border-l border-white/20 pl-6 text-sm sm:grid-cols-4 lg:grid-cols-2"><div><span className="text-white/45">Khách</span><strong className="mt-1 block">Tối đa {stay.maxGuests}</strong></div><div><span className="text-white/45">Diện tích</span><strong className="mt-1 block">{stay.area} m²</strong></div><div><span className="text-white/45">Phòng ngủ</span><strong className="mt-1 block">{stay.bedrooms} phòng</strong></div><div><span className="text-white/45">Giá từ</span><strong className="mt-1 block">{formatCurrency(stay.basePrice)}</strong></div></div></div></div>
      <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[.58rem] font-semibold uppercase tracking-wider backdrop-blur">Hình ảnh concept</span>
    </section>

    <section className="section-pad bg-[#fbfaf6]"><div className="container-lago grid gap-14 lg:grid-cols-[1fr_390px]"><div><p className="eyebrow text-lago-clay">Câu chuyện của căn nhà</p><p className="display mt-5 max-w-4xl text-3xl leading-snug sm:text-5xl">{stay.longDescription}</p><div className="mt-10 grid gap-3 sm:grid-cols-3">{stay.highlights.map((item, index) => <div key={item} className="lift rounded-2xl border border-lago-ink/10 bg-white p-5"><span className="text-xs font-bold text-lago-clay">0{index + 1}</span><p className="mt-8 font-bold">{item}</p></div>)}</div><div className="mt-12 flex flex-wrap gap-6 border-y border-lago-ink/10 py-6 text-sm font-semibold"><span className="flex items-center gap-2"><Users className="h-5 w-5" />Tối đa {stay.maxGuests} khách</span><span className="flex items-center gap-2"><BedDouble className="h-5 w-5" />{stay.bedrooms} phòng ngủ</span><span className="flex items-center gap-2"><Bath className="h-5 w-5" />{stay.bathrooms} phòng tắm</span><span className="flex items-center gap-2"><Expand className="h-5 w-5" />{stay.area} m²</span></div><h2 className="display mt-12 text-4xl font-semibold">Mọi thứ bạn cần,<br />đã sẵn sàng trong căn.</h2><div className="mt-7 grid gap-4 sm:grid-cols-2">{stay.amenities.map((item) => <span key={item} className="flex items-center gap-3 text-sm"><span className="grid h-7 w-7 place-items-center rounded-full bg-lago-mist"><Check className="h-3.5 w-3.5 text-lago-forest" /></span>{item}</span>)}</div></div><aside className="h-fit rounded-[28px] border border-lago-ink/10 bg-white p-7 shadow-soft lg:sticky lg:top-28"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lago-clay"><Sparkles className="h-4 w-4" />Chọn {stay.name}</div><p className="mt-5 text-sm text-lago-ink/50">Giá tham khảo từ</p><p className="mt-1"><strong className="display text-4xl">{formatCurrency(stay.basePrice)}</strong> <span className="text-sm text-lago-ink/50">/ đêm</span></p><p className="mt-3 text-xs leading-5 text-lago-ink/55">Giá chính xác phụ thuộc ngày lưu trú và số khách.</p><Link href={`/dat-phong?stay=${stay.slug}`} className="btn-primary mt-6 w-full">Kiểm tra lịch căn này <ArrowRight className="h-4 w-4" /></Link><p className="mt-4 text-center text-xs text-lago-ink/45">Giữ chỗ 2 giờ · Chưa cần thanh toán</p></aside></div></section>

    <section className="reveal-section pb-24"><div className="container-lago"><div className="mb-8 flex items-end justify-between"><div><p className="eyebrow text-lago-clay">Nhìn gần hơn</p><h2 className="display mt-2 text-4xl font-semibold sm:text-5xl">Không gian của {stay.name}</h2></div><span className="hidden text-xs font-bold uppercase tracking-wider text-lago-ink/40 sm:block">Chạm vào ảnh để khám phá</span></div><ImmersiveGallery images={stay.gallery} name={stay.name} /></div></section>

    <section className="bg-lago-ink py-16 text-white"><Link href={`/luu-tru/${nextStay.slug}`} className="group container-lago grid items-center gap-8 sm:grid-cols-[1fr_240px]"><div><p className="eyebrow text-white/45">Khám phá căn tiếp theo</p><h2 className="display mt-3 text-5xl font-semibold sm:text-7xl">{nextStay.name} <ArrowRight className="ml-3 inline h-8 w-8 transition-transform group-hover:translate-x-3" /></h2><p className="mt-3 text-white/55">{nextStay.subtitle}</p></div><div className="image-zoom relative aspect-[4/3] overflow-hidden rounded-2xl"><Image src={nextStay.image} alt={`${nextStay.name} - ảnh concept`} fill sizes="240px" className="object-cover" /></div></Link></section>
  </SiteShell>;
}
