import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ChefHat, Coffee, Leaf, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { HeroShowcase } from "@/features/stays/components/hero-showcase";
import { StayFinder } from "@/features/stays/components/stay-finder";
import { conceptImages, stays } from "@/features/stays/data/demo-data";
import { SiteShell } from "@/shared/components/layout/site-shell";

const experiences = [
  { icon: Coffee, title: "Buổi sáng không vội", text: "Mở cửa đón nắng, pha một ấm trà và để ngày mới bắt đầu theo nhịp của riêng bạn." },
  { icon: ChefHat, title: "Bữa tối bên nhau", text: "Mỗi căn đều có gian bếp và khoảng ăn uống riêng để những câu chuyện kéo dài thêm một chút." },
  { icon: Leaf, title: "Khoảng xanh của mình", text: "Mỗi căn là một không gian riêng biệt, không chia sẻ với khách lạ trong suốt kỳ nghỉ." }
];

const bookingSteps = [
  { number: "01", icon: CalendarCheck, title: "Chọn ngày & số khách", text: "Hệ thống gợi ý những căn phù hợp và mức giá dự kiến." },
  { number: "02", icon: ShieldCheck, title: "Chọn căn mình thích", text: "Xem cá tính, tiện nghi và gửi yêu cầu giữ căn trong 2 giờ." },
  { number: "03", icon: MessageCircle, title: "Lago xác nhận", text: "Đội ngũ Lago liên hệ qua điện thoại hoặc Zalo để hoàn tất." }
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Lago Homestay",
    description: "Bộ sưu tập nhà nghỉ dưỡng riêng tư giữa thiên nhiên.",
    containsPlace: stays.map((stay) => ({ "@type": "Accommodation", name: stay.name, occupancy: { "@type": "QuantitativeValue", maxValue: stay.maxGuests } })),
    telephone: "+84900000000"
  };

  return <SiteShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <HeroShowcase stays={stays} />

    <section id="chon-can" className="reveal-section section-pad overflow-hidden bg-lago-cream">
      <div className="container-lago">
        <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_.65fr]">
          <div><p className="eyebrow text-lago-clay">Bộ sưu tập của Lago</p><h2 className="display mt-4 max-w-4xl text-4xl font-semibold leading-[1.06] sm:text-6xl">Không tìm một căn đẹp nhất.<br /><em className="font-medium text-lago-moss">Tìm căn hợp với mình nhất.</em></h2></div>
          <div><p className="text-sm leading-7 text-lago-ink/62 sm:text-base">Bốn căn nhà, bốn nhịp nghỉ khác nhau. Dành cho một cuộc trốn đi của hai người, cuối tuần gia đình hay kỳ hội ngộ cùng nhóm bạn.</p><Link href="/luu-tru" className="soft-link mt-5">Xem toàn bộ bộ sưu tập <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
        <div className="mt-11"><StayFinder stays={stays} /></div>
      </div>
    </section>

    <section className="reveal-section relative overflow-hidden bg-lago-ink py-20 text-white sm:py-28">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap text-white/8"><span className="display text-[7rem] sm:text-[11rem]">Stay curious · Stay close · Stay Lago ·</span><span className="display text-[7rem] sm:text-[11rem]">Stay curious · Stay close · Stay Lago ·</span></div>
      <div className="container-lago absolute inset-0 flex items-center"><div className="grid w-full items-center gap-10 lg:grid-cols-[.8fr_1.2fr]"><p className="eyebrow text-lago-sand">Một nơi · nhiều cách ở</p><p className="display max-w-4xl text-4xl font-medium leading-tight sm:text-6xl">Dù chọn căn nào, bạn vẫn có được điều quan trọng nhất: <em className="text-lago-sand">một khoảng riêng thật sự.</em></p></div></div>
    </section>

    <section className="reveal-section section-pad bg-[#fbfaf6]">
      <div className="container-lago grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[36px]"><Image src={conceptImages.experience} alt="Khoảng xanh quanh Lago - ảnh concept" fill sizes="(max-width: 1024px) 100vw, 43vw" className="object-cover" /></div>
          <div className="glass-panel absolute bottom-6 left-6 right-6 rounded-2xl p-5 text-white sm:left-auto sm:w-64"><Sparkles className="h-5 w-5 text-lago-sand" /><p className="display mt-3 text-xl leading-snug">Những điều đáng nhớ thường bắt đầu từ một nhịp sống chậm hơn.</p></div>
        </div>
        <div className="lg:pl-8"><p className="eyebrow text-lago-clay">Một ngày ở Lago</p><h2 className="display mt-4 text-4xl font-semibold leading-tight sm:text-6xl">Ở bên nhau,<br />theo cách thật tự nhiên.</h2><div className="mt-9 space-y-3">{experiences.map(({ icon: Icon, title, text }) => <div key={title} className="lift flex gap-5 rounded-2xl border border-transparent p-4 hover:border-lago-ink/10 hover:bg-white"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lago-mist"><Icon className="h-5 w-5" /></span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-lago-ink/60">{text}</p></div></div>)}</div><Link href="/trai-nghiem" className="soft-link mt-8">Khám phá trải nghiệm <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>

    <section className="reveal-section section-pad bg-lago-ink text-white">
      <div className="container-lago"><div className="max-w-3xl"><p className="eyebrow text-lago-sand">Đặt căn thật nhẹ nhàng</p><h2 className="display mt-4 text-4xl font-medium sm:text-6xl">Từ dự định đến một kỳ nghỉ,<br className="hidden sm:block" /> chỉ trong ba bước.</h2></div><div className="mt-12 grid gap-4 md:grid-cols-3">{bookingSteps.map(({ number, icon: Icon, title, text }) => <article key={number} className="lift rounded-[28px] border border-white/15 p-7"><div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[.2em] text-white/35">{number}</span><Icon className="h-5 w-5 text-lago-sand" /></div><h3 className="display mt-12 text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/55">{text}</p></article>)}</div><div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[28px] bg-white/[.08] p-6 sm:flex-row sm:items-center sm:p-8"><div><strong className="text-lg">Bạn đã có ngày muốn đi?</strong><p className="mt-1 text-sm text-white/55">Nhập ngày và để Lago gợi ý căn phù hợp nhất.</p></div><Link href="/dat-phong" className="btn-light w-full sm:w-auto">Tìm căn còn trống <ArrowRight className="h-4 w-4" /></Link></div></div>
    </section>

    <section className="reveal-section section-pad relative overflow-hidden bg-lago-sand">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-lago-clay/15" /><div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-lago-clay/15" />
      <div className="container-lago relative text-center"><p className="eyebrow text-lago-clay">Kỳ nghỉ của bạn</p><h2 className="display mx-auto mt-4 max-w-3xl text-4xl font-semibold sm:text-6xl">Có một căn nhà đang chờ đúng câu chuyện của bạn.</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-lago-ink/60">Kiểm tra lịch trống theo thời gian thực. Yêu cầu được giữ 2 giờ để Lago liên hệ xác nhận qua điện thoại hoặc Zalo.</p><Link href="/dat-phong" className="btn-primary mt-8">Khám phá căn còn trống <ArrowRight className="h-4 w-4" /></Link></div>
    </section>
  </SiteShell>;
}
