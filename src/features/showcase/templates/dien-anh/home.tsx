import Image from "next/image";
import { ShowcaseLink as Link } from "@/features/showcase/site/showcase-link";
import { ArrowRight, CirclePlay, MapPin, Pause, Users } from "lucide-react";
import { AvailabilityBar } from "@/features/booking/components/availability-bar";
import { ShowcaseSwitcher } from "@/features/showcase/components/showcase-switcher";
import { CinematicStoryModal } from "@/features/showcase/components/cinematic-story-modal";
import { TemplateExperienceLayer } from "@/features/showcase/components/template-experience-layer";
import { TemplateTimeGreeting } from "@/features/showcase/components/template-time-greeting";
import { experienceMoments, guestStories } from "@/features/showcase/data/showcase-content";
import { conceptImages, stays } from "@/features/stays/data/demo-data";
import { TemplateFooter, TemplateHeader, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import { SkipLink } from "@/shared/components/ui/skip-link";

const storyFrames = [
  { image: stays[0].image, eyebrow: "Buổi sớm", title: "Thức dậy bên mặt hồ.", text: "Ánh sáng đi qua rèm cửa, mặt nước còn yên và ngày mới chưa cần bắt đầu vội." },
  { image: conceptImages.detail2, eyebrow: "Bữa cơm", title: "Ở lại lâu hơn quanh bàn ăn.", text: "Một căn bếp đủ đầy để mọi người cùng chuẩn bị bữa tối và kể tiếp những câu chuyện còn dang dở." },
  { image: conceptImages.experience, eyebrow: "Buổi chiều", title: "Đi theo nơi nắng chạm xuống.", text: "Không lịch trình cố định. Chỉ có cây, gió và khoảng thời gian đủ rộng để tò mò trở lại." },
  { image: conceptImages.forest, eyebrow: "Khi đêm xuống", title: "Giữ lại sự tĩnh lặng.", text: "Khép lại một ngày bằng ánh đèn ấm, tiếng lá ngoài hiên và những người mình muốn ở cạnh." }
] as const;

export function DienAnhHome({ config }: { config: CompleteTemplateConfig }) {
  return <div className="showcase-root min-h-screen bg-[#0b190f] text-white">
    <SkipLink />
    <TemplateExperienceLayer mood="cinematic" />
    <ShowcaseSwitcher current="dien-anh" />
    <TemplateHeader config={config} />
    <main id="noi-dung-chinh" tabIndex={-1}>
    <section className="grain relative min-h-screen overflow-hidden"><Image src={stays[0].image} alt="Căn nhà LAKA bên hồ - ảnh minh họa" fill priority sizes="100vw" className="object-cover opacity-70" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,12,9,.92)_0%,rgba(3,12,9,.25)_65%,rgba(3,12,9,.5)_100%)]" /><div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0b190f] to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-76px)] w-[min(1500px,calc(100%-40px))] flex-col justify-end pb-10 pt-24 sm:pb-14"><div className="grid items-end gap-8 lg:grid-cols-[1fr_.38fr]"><div><TemplateTimeGreeting mood="cinematic" /><p className="mt-5 text-[.66rem] font-bold uppercase tracking-[.24em] text-[#c7a882]">Một thước phim thiên nhiên · Bộ sưu tập LAKA</p><h1 className="mt-5 max-w-6xl font-serif text-[clamp(3.4rem,17vw,7rem)] font-medium leading-[.84] tracking-[-.06em] lg:text-[9.5rem]">Trở về<br />với <i className="text-[#c7a882]">chính mình.</i></h1></div><div className="pb-4"><CinematicStoryModal frames={[...storyFrames]} /><p className="mt-7 max-w-sm text-sm leading-7 text-white/55">Không chỉ là nơi để ngủ. Đây là nơi những cuộc trò chuyện dài hơn và buổi sáng bắt đầu chậm hơn.</p></div></div><div className="mt-9 max-w-5xl"><AvailabilityBar compact bookingPath="/mau/dien-anh/dat-phong" /></div></div>
      <span className="absolute right-5 top-6 z-10 hidden items-center gap-2 text-[.58rem] font-bold uppercase tracking-[.18em] text-white/45 sm:flex"><Pause className="h-3 w-3" /> Chuyển động nền</span>
    </section>

    <section className="overflow-hidden border-y border-white/10 py-5"><div className="cinema-marquee flex w-max gap-12 whitespace-nowrap text-[.65rem] font-bold uppercase tracking-[.24em] text-white/35"><span>Ở gần nhau · Tò mò hơn · Ra ngoài nhiều hơn · Chạm vào LAKA ·</span><span>Ở gần nhau · Tò mò hơn · Ra ngoài nhiều hơn · Chạm vào LAKA ·</span><span>Ở gần nhau · Tò mò hơn · Ra ngoài nhiều hơn · Chạm vào LAKA ·</span></div></section>

    <section id="houses" className="mx-auto w-[min(1500px,calc(100%-40px))] py-24 sm:py-32"><div className="flex flex-col justify-between gap-7 border-b border-white/12 pb-9 md:flex-row md:items-end"><div><p className="text-[.64rem] font-bold uppercase tracking-[.22em] text-[#c7a882]">Chương hai · chọn khung cảnh</p><h2 className="mt-5 font-serif text-5xl font-medium leading-none tracking-[-.05em] sm:text-7xl">Bốn căn nhà.<br /><i>Bốn cách rung cảm.</i></h2></div><Link href={`${config.basePath}/luu-tru`} className="flex items-center gap-3 text-sm font-bold">Xem toàn bộ bộ sưu tập <ArrowRight className="h-4 w-4" /></Link></div>
      <div>{stays.map((stay, index) => <Link href={`${config.basePath}/luu-tru/${stay.slug}`} key={stay.id} className="group grid items-center gap-5 border-b border-white/12 py-6 sm:grid-cols-[60px_1fr_180px_auto]"><span className="text-xs font-bold text-white/28">0{index + 1}</span><div><h3 className="font-serif text-4xl font-medium tracking-[-.04em] transition group-hover:text-[#c7a882] sm:text-5xl">{stay.name}</h3><p className="mt-2 text-xs text-white/38">{stay.subtitle}</p></div><div className="flex gap-5 text-xs text-white/45"><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#c7a882]" />{stay.location}</span><span className="flex items-center gap-2"><Users className="h-4 w-4 text-[#c7a882]" />{stay.maxGuests}</span></div><div className="relative aspect-[16/10] overflow-hidden rounded-sm sm:w-48"><Image src={stay.image} alt={`${stay.name} - ảnh minh họa`} fill sizes="200px" className="object-cover opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-100" /></div></Link>)}</div>
    </section>

    <section className="bg-[#0b190f] py-24 sm:py-32"><div className="mx-auto w-[min(1500px,calc(100%-40px))]"><div className="grid gap-8 border-b border-white/12 pb-9 lg:grid-cols-[.7fr_1fr] lg:items-end"><div><p className="text-[.64rem] font-bold uppercase tracking-[.22em] text-[#c7a882]">Chương ba · nhịp của một ngày</p><h2 className="mt-5 font-serif text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-7xl">Từ ánh sáng đầu tiên<br /><i>đến đêm thật yên.</i></h2></div><p className="max-w-xl text-sm leading-7 text-white/45 lg:ml-auto">Không có lịch trình bắt buộc. Chỉ có những khoảnh khắc nhỏ để bạn chọn cách sống chậm theo ý mình.</p></div><div className="grid md:grid-cols-2 xl:grid-cols-4">{experienceMoments.map(({icon:Icon,time,title,text},index)=><article key={time} className="border-b border-white/12 py-7 md:border-r md:px-6 md:first:pl-0 xl:border-b-0 xl:last:border-r-0"><div className="flex items-center justify-between"><span className="text-xs font-bold text-[#c7a882]">{time}</span><span className="grid h-10 w-10 place-items-center rounded-full border border-white/12"><Icon className="h-4 w-4" /></span></div><p className="mt-16 text-[.58rem] font-bold uppercase tracking-[.16em] text-white/25">Cảnh 0{index+1}</p><h3 className="mt-3 font-serif text-2xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-white/42">{text}</p></article>)}</div></div></section>

    <section className="mx-auto grid w-[min(1500px,calc(100%-40px))] gap-12 py-24 sm:py-32 lg:grid-cols-[.42fr_1fr]"><div><p className="text-[.64rem] font-bold uppercase tracking-[.22em] text-[#c7a882]">Lời kể của khách · Chương 02</p><div className="relative mt-8 aspect-video overflow-hidden"><Image src={stays[1].image} alt="Trải nghiệm tại Nhà Mây - ảnh minh họa" fill sizes="420px" className="object-cover opacity-65" /><span className="absolute inset-0 grid place-items-center"><CirclePlay className="h-12 w-12" /></span></div></div><blockquote className="lg:border-l lg:border-white/12 lg:pl-12"><p className="font-serif text-4xl font-medium leading-[1.16] tracking-[-.025em] sm:text-6xl">“{guestStories[1].quote}”</p><footer className="mt-8 text-xs font-bold uppercase tracking-[.16em] text-white/35">{guestStories[1].name} · {guestStories[1].stay}</footer></blockquote></section>

    <section className="relative min-h-[78svh] overflow-hidden"><Image src={conceptImages.forest} alt="Một ngày giữa thiên nhiên LAKA - ảnh minh họa" fill sizes="100vw" className="object-cover opacity-65" /><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/15 to-black/45" /><div className="relative z-10 mx-auto flex min-h-[78svh] w-[min(1500px,calc(100%-40px))] items-center"><div className="max-w-4xl"><p className="text-[.64rem] font-bold uppercase tracking-[.22em] text-[#c7a882]">Chương cuối</p><h2 className="mt-6 font-serif text-6xl font-medium leading-[.88] tracking-[-.055em] sm:text-8xl">Rời xa ồn ào.<br /><i>Giữ lại cảm xúc.</i></h2><Link href={`${config.basePath}/dat-phong`} className="mt-9 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#c7a882] px-7 text-sm font-bold text-[#0b190f]">Bắt đầu chuyến đi <ArrowRight className="h-4 w-4" /></Link></div></div></section>

    </main>
    <TemplateFooter config={config} />
  </div>;
}
