import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bath, Coffee, Leaf, MapPin, Sparkles, UtensilsCrossed } from "lucide-react";
import { AvailabilityBar } from "@/components/availability-bar";
import { SiteShell } from "@/components/site-shell";
import { StayCard } from "@/components/stay-card";
import { conceptImages, stays } from "@/lib/demo-data";

const experiences = [
  { icon: Coffee, title: "Bữa sáng chậm", text: "Món ăn theo mùa, được chuẩn bị vừa đủ và mang đến tận hiên nhà." },
  { icon: Leaf, title: "Một vòng quanh vườn", text: "Đi bộ giữa màu xanh, hái vài nhánh thảo mộc và nghe câu chuyện của khu vườn." },
  { icon: UtensilsCrossed, title: "Bữa tối bên nhau", text: "Bếp và sân BBQ sẵn sàng cho một buổi tối dài cùng người thân." }
];

export default function HomePage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "LodgingBusiness", name: "Lago Homestay", description: "Một khoảng xanh để mình thật sự nghỉ ngơi", telephone: "+84900000000" };
  return <SiteShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-lago-ink text-white grain">
      <Image src={conceptImages.hero} alt="Khung cảnh homestay giữa thiên nhiên - ảnh concept" fill priority sizes="100vw" className="object-cover opacity-75"/>
      <div className="absolute inset-0 bg-gradient-to-r from-lago-ink/85 via-lago-ink/35 to-transparent"/>
      <div className="container-lago relative z-10 flex min-h-[calc(100vh-76px)] flex-col justify-center py-20">
        <div className="max-w-3xl"><p className="eyebrow mb-5 text-white/75">Ở chậm giữa thiên nhiên</p><h1 className="display text-5xl font-medium leading-[.96] sm:text-7xl lg:text-[6.3rem]">Một khoảng xanh để mình thật sự nghỉ ngơi</h1><p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">Lago là nơi những ngày dài được đo bằng nắng sớm, bữa cơm ấm và thời gian dành trọn cho nhau.</p></div>
        <div className="mt-10 max-w-5xl"><AvailabilityBar/></div>
        <div className="absolute bottom-6 right-6 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-[.62rem] font-semibold uppercase tracking-wider backdrop-blur">Hình ảnh concept</div>
      </div>
    </section>

    <section className="section-pad bg-lago-cream"><div className="container-lago"><div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow text-lago-clay">Không gian của Lago</p><h2 className="display mt-3 max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl">Mỗi căn nhà, một nhịp nghỉ riêng</h2></div><Link href="/luu-tru" className="flex items-center gap-2 font-bold">Xem tất cả không gian <ArrowRight className="h-4 w-4"/></Link></div><div className="grid gap-7 md:grid-cols-3">{stays.map((stay) => <StayCard stay={stay} key={stay.id}/>)}</div></div></section>

    <section className="section-pad overflow-hidden"><div className="container-lago grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]"><div className="relative"><div className="relative aspect-[4/5] overflow-hidden rounded-[32px]"><Image src={conceptImages.experience} alt="Thiên nhiên quanh Lago - ảnh concept" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"/><span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1 text-[.62rem] font-bold uppercase tracking-wider">Ảnh concept</span></div><div className="absolute -bottom-8 -right-5 hidden w-52 rounded-[24px] bg-lago-sand p-6 shadow-soft sm:block"><Sparkles className="h-6 w-6"/><p className="display mt-4 text-2xl">Những điều nhỏ làm nên một kỳ nghỉ đáng nhớ.</p></div></div><div className="lg:pl-14"><p className="eyebrow text-lago-clay">Không chỉ là một căn phòng</p><h2 className="display mt-3 text-4xl font-semibold leading-tight sm:text-6xl">Để thiên nhiên dẫn nhịp cho ngày của bạn</h2><p className="mt-6 max-w-xl leading-7 text-lago-ink/65">Ở Lago, bạn không cần lấp đầy lịch trình. Một buổi sáng không báo thức, một chiều bên hồ hay bữa tối tự tay chuẩn bị đã là đủ.</p><div className="mt-9 space-y-7">{experiences.map(({icon: Icon,title,text}) => <div key={title} className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lago-mist"><Icon className="h-5 w-5"/></span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-lago-ink/60">{text}</p></div></div>)}</div><Link href="/trai-nghiem" className="btn-primary mt-10">Khám phá trải nghiệm <ArrowRight className="h-4 w-4"/></Link></div></div></section>

    <section className="section-pad bg-lago-ink text-white"><div className="container-lago text-center"><p className="eyebrow text-lago-sand">Tinh tế trong từng chi tiết</p><h2 className="display mx-auto mt-4 max-w-3xl text-4xl font-medium sm:text-6xl">Đủ tiện nghi để thoải mái. Đủ yên tĩnh để lắng nghe mình.</h2><div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">{[[Bath,"Không gian riêng tư"],[MapPin,"Gần với thiên nhiên"],[Coffee,"Chăm sóc vừa đủ"]].map(([Icon,title]) => { const C = Icon as typeof Bath; return <div key={String(title)} className="rounded-3xl border border-white/15 p-7"><C className="mx-auto h-6 w-6 text-lago-sand"/><p className="mt-4 font-semibold">{String(title)}</p></div>})}</div></div></section>

    <section className="section-pad bg-lago-sand"><div className="container-lago text-center"><p className="eyebrow text-lago-clay">Kỳ nghỉ của bạn</p><h2 className="display mx-auto mt-3 max-w-2xl text-4xl font-semibold sm:text-6xl">Chọn một ngày để trở về với nhịp sống chậm</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-lago-ink/65">Kiểm tra lịch trống theo thời gian thực. Yêu cầu của bạn sẽ được giữ trong 2 giờ để đội ngũ Lago liên hệ xác nhận.</p><Link href="/dat-phong" className="btn-primary mt-8">Xem lịch và đặt phòng <ArrowRight className="h-4 w-4"/></Link></div></section>
  </SiteShell>;
}
