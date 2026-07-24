import type { Metadata } from "next";
import Image from "next/image";
import { House, Leaf, Sparkles } from "lucide-react";
import { StayExplorer } from "@/features/stays/components/stay-explorer";
import { conceptImages, stays } from "@/features/stays/data/demo-data";
import { SiteShell } from "@/shared/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Bộ sưu tập căn nhà",
  description: "Khám phá các căn nhà nghỉ dưỡng riêng tư tại LAKA Homestay, từ căn đôi đến nhà nguyên căn cho gia đình và nhóm bạn."
};

export default function StaysPage() {
  return <SiteShell>
    <section className="relative min-h-[68vh] overflow-hidden bg-lago-ink text-white">
      <Image src={conceptImages.detail1} alt="Bộ sưu tập nhà LAKA - ảnh concept" fill priority sizes="100vw" className="object-cover opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,39,32,.92),rgba(12,39,32,.38))]" />
      <div className="container-lago relative z-10 flex min-h-[68vh] flex-col justify-center py-20"><p className="eyebrow text-lago-sand">LAKA Collection · 08 dòng nhà</p><h1 className="display mt-5 max-w-4xl text-5xl font-semibold leading-[1.03] sm:text-7xl lg:text-8xl">Chọn một căn nhà.<br /><em className="font-medium text-lago-sand">Mở ra một nhịp sống khác.</em></h1><p className="mt-7 max-w-2xl text-base leading-8 text-white/70">Mỗi căn có một vị trí, một cá tính và một cách riêng để đưa bạn đến gần thiên nhiên hơn.</p><div className="mt-10 flex flex-wrap gap-3">{[[House, "15 căn thực tế"], [Leaf, "03 hệ cảnh quan"], [Sparkles, "Trải nghiệm chọn lọc"]].map(([Icon, text]) => { const C = Icon as typeof House; return <span key={String(text)} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur"><C className="h-4 w-4 text-lago-sand" />{String(text)}</span>; })}</div></div>
      <span className="absolute bottom-5 right-5 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[.58rem] font-semibold uppercase tracking-wider backdrop-blur">Hình ảnh concept</span>
    </section>

    <section className="section-pad bg-lago-cream"><div className="container-lago"><div className="mb-10 grid items-end gap-6 lg:grid-cols-[1fr_.7fr]"><div><p className="eyebrow text-lago-clay">Tìm căn hợp với bạn</p><h2 className="display mt-3 text-4xl font-semibold sm:text-6xl">Bạn muốn kỳ nghỉ này<br />cảm thấy như thế nào?</h2></div><p className="leading-7 text-lago-ink/60">Lọc theo người đồng hành và mục đích chuyến đi. Sau đó đi sâu vào từng căn để xem không gian, tiện nghi và lịch trống.</p></div><StayExplorer stays={stays} /></div></section>
  </SiteShell>;
}
