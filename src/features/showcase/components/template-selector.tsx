import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye, Sparkles } from "lucide-react";
import { conceptImages, stays } from "@/features/stays/data/demo-data";
import { showcaseTemplates } from "@/features/showcase/data/templates";

const images = [conceptImages.detail1, stays[0].image, conceptImages.forest];

function Preview({ index }: { index: number }) {
  if (index === 0) return <div className="absolute inset-0 grid grid-cols-[.88fr_1.12fr] bg-[#eee7dc] p-5 text-[#17312b]">
    <div className="flex flex-col justify-between border-r border-[#17312b]/15 pr-4"><span className="text-[7px] font-bold uppercase tracking-[.22em]">Lago journal</span><div><span className="block font-serif text-[1.65rem] leading-[.85]">Quiet<br /><i>living.</i></span><span className="mt-3 block h-px w-12 bg-[#b86f52]" /></div><span className="text-[7px]">Issue No. 01</span></div>
    <div className="relative ml-4 overflow-hidden"><Image src={images[index]} alt="Xem trước mẫu Tĩnh lặng" fill sizes="320px" className="object-cover" /></div>
  </div>;

  if (index === 1) return <div className="absolute inset-0 bg-[#07130f] text-white"><Image src={images[index]} alt="Xem trước mẫu Điện ảnh" fill sizes="320px" className="object-cover opacity-58" /><div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" /><span className="absolute left-5 top-5 text-[7px] font-bold uppercase tracking-[.22em]">Lago / a nature film</span><span className="absolute bottom-5 left-5 font-serif text-[1.8rem] leading-[.86]">Come<br />back to <i>life.</i></span><span className="absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-full border border-white/35 text-xs">↗</span></div>;

  return <div className="absolute inset-0 overflow-hidden bg-[#dfe8cf] p-5 text-[#234f43]"><span className="absolute -right-7 -top-10 h-32 w-32 rounded-full bg-[#f18b68]" /><span className="relative text-[8px] font-extrabold uppercase tracking-[.18em]">Lago happy place</span><div className="absolute bottom-4 left-4 right-4 grid grid-cols-[1.2fr_.8fr] gap-2"><div className="relative aspect-[1.2] overflow-hidden rounded-[28px]"><Image src={images[index]} alt="Xem trước mẫu Sống động" fill sizes="220px" className="object-cover" /></div><div className="flex flex-col gap-2"><span className="flex flex-1 items-end rounded-[20px] bg-white p-3 text-sm font-extrabold leading-none">Stay<br />wild.</span><span className="grid aspect-square place-items-center rounded-full bg-[#f18b68] text-xl">☀</span></div></div></div>;
}

export function TemplateSelector() {
  return <main className="showcase-root min-h-screen bg-[#0b1c17] px-4 py-6 text-white sm:px-7 sm:py-8 lg:px-10">
    <div className="mx-auto max-w-[1500px]">
      <header className="flex items-center justify-between border-b border-white/12 pb-5"><Link href="/" className="font-serif text-2xl font-semibold tracking-[-.04em]">Lago<span className="ml-1 font-sans text-[.58rem] font-bold uppercase tracking-[.18em] text-white/42">Homestay</span></Link><span className="hidden items-center gap-2 text-[.65rem] font-bold uppercase tracking-[.18em] text-white/40 sm:flex"><Sparkles className="h-4 w-4 text-[#e5c59c]" /> Design presentation · 2026</span><span className="rounded-full border border-white/15 px-3 py-1.5 text-[.6rem] font-bold uppercase tracking-wider text-white/55">03 concepts</span></header>

      <section className="grid gap-8 pb-10 pt-12 lg:grid-cols-[1fr_.72fr] lg:items-end lg:pb-14 lg:pt-16"><div><p className="text-[.68rem] font-bold uppercase tracking-[.16em] text-[#e5c59c]">Bước đầu tiên</p><h1 className="mt-5 max-w-5xl font-serif text-[3.3rem] font-medium leading-[1.02] tracking-[-.04em] sm:text-7xl lg:text-[6.2rem]">Bạn muốn Lago<br />được <i className="text-[#e5c59c]">cảm nhận</i> thế nào?</h1></div><div className="lg:pb-2"><p className="max-w-xl text-sm leading-7 text-white/52 sm:text-base">Chọn một hướng thiết kế để xem bản trình bày hoàn chỉnh. Mỗi mẫu dùng cùng sản phẩm Lago nhưng kể một câu chuyện thương hiệu hoàn toàn khác.</p><div className="mt-6 flex items-center gap-3 text-xs font-semibold text-white/38"><Eye className="h-4 w-4" /> Có thể đổi mẫu bất kỳ lúc nào</div></div></section>

      <section className="grid gap-4 pb-12 lg:grid-cols-3">{showcaseTemplates.map((template, index) => <Link key={template.slug} href={`/mau/${template.slug}`} className="group focus-ring overflow-hidden rounded-[30px] border border-white/12 bg-white/[.055] p-3 transition duration-500 hover:-translate-y-2 hover:border-white/28 hover:bg-white/[.085]">
        <div className="relative aspect-[1.2] overflow-hidden rounded-[22px]"><Preview index={index} /><span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-lago-ink opacity-0 shadow-xl transition duration-300 group-hover:rotate-6 group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></span></div>
        <div className="px-2 pb-3 pt-5"><div className="flex items-center justify-between gap-4"><span className="text-[.62rem] font-bold uppercase tracking-[.18em] text-white/35">Mẫu {template.number} · {template.style}</span><div className="flex gap-1">{template.colors.map((color) => <i key={color} className="h-2.5 w-2.5 rounded-full border border-white/15" style={{ background: color }} />)}</div></div><h2 className="mt-3 font-serif text-4xl font-medium tracking-[-.04em]">{template.name}</h2><p className="mt-3 min-h-12 text-sm leading-6 text-white/48">{template.description}</p><div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-[.65rem] font-semibold text-white/35">{template.audience}</span><span className="text-xs font-bold text-[#e5c59c]">Xem mẫu →</span></div></div>
      </Link>)}</section>
    </div>
  </main>;
}
