import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Bath,
  BedDouble,
  CalendarCheck,
  ChefHat,
  Coffee,
  House,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { AvailabilityBar } from "@/features/booking/components/availability-bar";
import { SiteShell } from "@/shared/components/layout/site-shell";
import { conceptImages, stays } from "@/features/stays/data/demo-data";
import { formatCurrency } from "@/shared/lib/format";

const stay = stays[0];

const experiences = [
  { icon: Coffee, title: "Buổi sáng không vội", text: "Mở cửa đón nắng, pha một ấm trà và để ngày mới bắt đầu theo nhịp của riêng bạn." },
  { icon: ChefHat, title: "Bữa tối bên nhau", text: "Một gian bếp đầy đủ và sân BBQ sẵn sàng cho bữa tối dài cùng những người thân thuộc." },
  { icon: Leaf, title: "Khoảng xanh riêng", text: "Không chia sẻ không gian với khách lạ. Cả căn nhà và khoảng vườn là của riêng nhóm bạn." }
];

const bookingSteps = [
  { number: "01", icon: CalendarCheck, title: "Chọn ngày", text: "Xem lịch và mức giá dự kiến theo ngày ở, số lượng khách." },
  { number: "02", icon: ShieldCheck, title: "Giữ căn 2 giờ", text: "Gửi thông tin, chưa cần thanh toán. Căn nhà được giữ tạm cho bạn." },
  { number: "03", icon: MessageCircle, title: "Lago xác nhận", text: "Đội ngũ Lago liên hệ qua điện thoại hoặc Zalo để hoàn tất." }
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: "Lago House",
    description: "Nhà nguyên căn riêng tư giữa thiên nhiên cho gia đình và nhóm bạn.",
    occupancy: { "@type": "QuantitativeValue", maxValue: stay.maxGuests },
    telephone: "+84900000000"
  };

  return <SiteShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

    <section className="grain relative min-h-[calc(100svh-76px)] overflow-hidden bg-lago-ink text-white">
      <Image src={conceptImages.hero} alt="Lago House giữa thiên nhiên - ảnh concept" fill priority sizes="100vw" className="object-cover opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,34,28,.9)_0%,rgba(10,34,28,.5)_48%,rgba(10,34,28,.12)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-lago-ink/65 to-transparent" />
      <div className="container-lago relative z-10 flex min-h-[calc(100svh-76px)] flex-col justify-center py-16 sm:py-20">
        <div className="hero-enter max-w-4xl">
          <p className="eyebrow mb-5 flex items-center gap-3 text-white/75"><span className="h-px w-10 bg-lago-sand" /> Nhà nguyên căn giữa thiên nhiên</p>
          <h1 className="display max-w-4xl text-[3.25rem] font-medium leading-[.98] sm:text-7xl lg:text-[6.2rem]">Một căn nhà,<br /><em className="font-medium text-lago-sand">trọn một khoảng riêng.</em></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">Lago House dành trọn cho gia đình và nhóm bạn—đủ gần để kết nối, đủ riêng để mỗi người thật sự được nghỉ ngơi.</p>
        </div>
        <div className="hero-enter-delayed mt-9 max-w-5xl"><AvailabilityBar /></div>
        <div className="hero-enter-delayed mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/75 sm:text-sm">
          <span className="flex items-center gap-2"><House className="h-4 w-4 text-lago-sand" /> Nguyên căn riêng tư</span>
          <span className="flex items-center gap-2"><Users className="h-4 w-4 text-lago-sand" /> Tối đa {stay.maxGuests} khách</span>
          <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-lago-sand" /> {stay.bedrooms} phòng ngủ</span>
        </div>
        <a href="#can-nha" aria-label="Khám phá căn nhà" className="scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[.62rem] font-bold uppercase tracking-[.2em] text-white/65 lg:flex">Khám phá <ArrowDown className="h-4 w-4" /></a>
        <div className="absolute bottom-5 right-5 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-[.6rem] font-semibold uppercase tracking-wider backdrop-blur">Hình ảnh concept</div>
      </div>
    </section>

    <section id="can-nha" className="section-pad overflow-hidden bg-lago-cream">
      <div className="container-lago">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_.65fr]">
          <div><p className="eyebrow text-lago-clay">Chỉ một căn nhà · Dành trọn cho bạn</p><h2 className="display mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-6xl">Không phải một căn phòng.<br />Là cả một kỳ nghỉ của riêng mình.</h2></div>
          <p className="max-w-xl text-sm leading-7 text-lago-ink/65 sm:text-base">Không hành lang đông người, không chia sẻ tiện ích với khách lạ. Từ gian bếp, phòng khách đến khoảng hiên, mọi không gian đều dành riêng cho những người bạn mang theo.</p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.55fr_.75fr]">
          <Link href="/luu-tru/lago-house" className="group image-zoom relative min-h-[520px] overflow-hidden rounded-[32px] text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-lago-clay/50">
            <Image src={stay.image} alt="Toàn cảnh Lago House - ảnh concept" fill sizes="(max-width: 1024px) 100vw, 68vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-lago-ink/90 via-lago-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 sm:p-10">
              <div><p className="eyebrow text-white/65">{stay.subtitle}</p><h3 className="display mt-2 text-4xl font-semibold sm:text-6xl">{stay.name}</h3><p className="mt-3 max-w-lg text-sm leading-6 text-white/75">{stay.description}</p></div>
              <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-lago-ink transition-transform group-hover:rotate-[-12deg] sm:grid"><ArrowRight className="h-5 w-5" /></span>
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            {stay.gallery.slice(0, 2).map((image, index) => <div key={image} className="image-zoom relative min-h-44 overflow-hidden rounded-[28px] lg:min-h-0"><Image src={image} alt={`Không gian Lago House ${index + 1} - ảnh concept`} fill sizes="(max-width: 1024px) 50vw, 28vw" className="object-cover" /><span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[.6rem] font-bold uppercase tracking-wider">Ảnh concept</span></div>)}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-[28px] border border-lago-ink/10 bg-white p-4 sm:grid-cols-5 sm:p-6">
          {[
            [Users, `${stay.maxGuests} khách`, "Sức chứa tối đa"],
            [BedDouble, `${stay.bedrooms} phòng ngủ`, `${stay.beds} giường`],
            [Bath, `${stay.bathrooms} phòng tắm`, "Tiện nghi riêng"],
            [House, `${stay.area} m²`, "Toàn bộ căn nhà"]
          ].map(([Icon, title, text]) => { const C = Icon as typeof Users; return <div key={String(title)} className="rounded-2xl p-3 sm:border-r sm:border-lago-ink/10 sm:p-4"><C className="h-5 w-5 text-lago-clay" /><strong className="mt-3 block text-sm">{String(title)}</strong><span className="mt-1 block text-xs text-lago-ink/50">{String(text)}</span></div>; })}
          <div className="col-span-2 rounded-2xl bg-lago-ink p-4 text-white sm:col-span-1"><span className="text-[.65rem] uppercase tracking-wider text-white/55">Giá tham khảo</span><strong className="mt-2 block text-lg">{formatCurrency(stay.basePrice)}</strong><span className="text-xs text-white/55">/ đêm · 6 khách</span></div>
        </div>
      </div>
    </section>

    <section className="section-pad bg-[#fbfaf6]">
      <div className="container-lago grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[36px]"><Image src={conceptImages.experience} alt="Khoảng xanh quanh Lago - ảnh concept" fill sizes="(max-width: 1024px) 100vw, 43vw" className="object-cover" /></div>
          <div className="glass-panel absolute bottom-6 left-6 right-6 rounded-2xl p-5 text-white sm:left-auto sm:w-64"><Sparkles className="h-5 w-5 text-lago-sand" /><p className="display mt-3 text-xl leading-snug">Những điều đáng nhớ thường bắt đầu từ một nhịp sống chậm hơn.</p></div>
        </div>
        <div className="lg:pl-8"><p className="eyebrow text-lago-clay">Một ngày ở Lago</p><h2 className="display mt-4 text-4xl font-semibold leading-tight sm:text-6xl">Ở bên nhau,<br />theo cách thật tự nhiên.</h2><div className="mt-9 space-y-3">{experiences.map(({ icon: Icon, title, text }) => <div key={title} className="lift flex gap-5 rounded-2xl border border-transparent p-4 hover:border-lago-ink/10 hover:bg-white"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lago-mist"><Icon className="h-5 w-5" /></span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-lago-ink/60">{text}</p></div></div>)}</div><Link href="/trai-nghiem" className="soft-link mt-8">Khám phá trải nghiệm <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>

    <section className="section-pad bg-lago-ink text-white">
      <div className="container-lago"><div className="max-w-3xl"><p className="eyebrow text-lago-sand">Đặt căn thật nhẹ nhàng</p><h2 className="display mt-4 text-4xl font-medium sm:text-6xl">Từ dự định đến một kỳ nghỉ,<br className="hidden sm:block" /> chỉ trong ba bước.</h2></div><div className="mt-12 grid gap-4 md:grid-cols-3">{bookingSteps.map(({ number, icon: Icon, title, text }) => <article key={number} className="lift rounded-[28px] border border-white/15 p-7"><div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[.2em] text-white/35">{number}</span><Icon className="h-5 w-5 text-lago-sand" /></div><h3 className="display mt-12 text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/55">{text}</p></article>)}</div><div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[28px] bg-white/8 p-6 sm:flex-row sm:items-center sm:p-8"><div><strong className="text-lg">Bạn đã có ngày muốn đi?</strong><p className="mt-1 text-sm text-white/55">Kiểm tra lịch trống và nhận báo giá dự kiến ngay.</p></div><Link href="/dat-phong" className="btn-light w-full sm:w-auto">Kiểm tra lịch Lago House <ArrowRight className="h-4 w-4" /></Link></div></div>
    </section>

    <section className="section-pad relative overflow-hidden bg-lago-sand">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-lago-clay/15" /><div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-lago-clay/15" />
      <div className="container-lago relative text-center"><p className="eyebrow text-lago-clay">Kỳ nghỉ của bạn</p><h2 className="display mx-auto mt-4 max-w-3xl text-4xl font-semibold sm:text-6xl">Chọn một ngày để cả nhà được gần nhau hơn.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-lago-ink/60">Yêu cầu được giữ trong 2 giờ để đội ngũ Lago liên hệ xác nhận qua điện thoại hoặc Zalo. Chưa cần thanh toán ngay.</p><Link href="/dat-phong" className="btn-primary mt-8">Xem lịch căn nhà <ArrowRight className="h-4 w-4" /></Link></div>
    </section>
  </SiteShell>;
}
