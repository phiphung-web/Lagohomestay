import Image from "next/image";
import { ShowcaseLink as Link } from "@/features/showcase/site/showcase-link";
import {
  ArrowDownRight,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Clock3,
  House,
  Plus,
  Quote,
  ShieldCheck,
  Users
} from "lucide-react";
import { AvailabilityBar } from "@/features/booking/components/availability-bar";
import { ShowcaseSwitcher } from "@/features/showcase/components/showcase-switcher";
import { TemplateExperienceLayer } from "@/features/showcase/components/template-experience-layer";
import { TemplateTimeGreeting } from "@/features/showcase/components/template-time-greeting";
import { TemplateDocumentLocale } from "@/features/showcase/components/template-document-locale";
import { experienceMoments, guestStories, showcaseFaqs } from "@/features/showcase/data/showcase-content";
import { conceptImages, stays } from "@/features/stays/data/demo-data";
import { formatCurrency } from "@/shared/lib/format";
import { TemplateFooter, TemplateHeader, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import { SkipLink } from "@/shared/components/ui/skip-link";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { englishExperienceMoments, englishFaqs, localizeStay } from "@/features/showcase/i18n/showcase-copy";

const stayFacts = [
  { icon: House, value: "04", label: "căn nhà riêng" },
  { icon: ShieldCheck, value: "100%", label: "không gian riêng tư" },
  { icon: Clock3, value: "02 giờ", label: "giữ chỗ miễn phí" },
  { icon: CalendarDays, value: "1 phút", label: "để xem lịch và giá" }
];

const storyNotes = [
  "Không gian mở về phía cây, hồ và thung lũng",
  "Mỗi căn có bếp, hiên và nhịp sống riêng",
  "Đội ngũ xuất hiện khi cần, trả lại sự riêng tư khi đủ"
];

export function TinhLangHome({ config, locale = "vi" }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale }) {
  const en = locale === "en";
  const localizedFacts = en ? [
    { icon: House, value: "04", label: "private homes" },
    { icon: ShieldCheck, value: "100%", label: "private spaces" },
    { icon: Clock3, value: "02 hrs", label: "complimentary hold" },
    { icon: CalendarDays, value: "1 min", label: "to see dates and prices" }
  ] : stayFacts;
  const localizedStoryNotes = en ? [
    "Every space opens towards trees, water or the valley",
    "Every home has its own kitchen, terrace and rhythm",
    "Our team is present when needed, then gives your privacy back"
  ] : storyNotes;
  const localizedStays = stays.map((stay) => localizeStay(stay, locale));
  const localizedMoments = en
    ? experienceMoments.map((moment, index) => ({ ...moment, ...englishExperienceMoments[index] }))
    : experienceMoments;
  const localizedFaqs = en ? englishFaqs : showcaseFaqs;
  const guestStory = en
    ? { quote: "For the first time in a long while, our whole family sat down for breakfast without anyone watching the clock.", name: "Minh Anh", stay: "A weekend at Forest House" }
    : guestStories[0];

  return <div className="showcase-root min-h-screen bg-[#faf3ea] text-[#17321d]">
    <TemplateDocumentLocale locale={locale} />
    <SkipLink />
    <TemplateExperienceLayer mood="editorial" />
    <ShowcaseSwitcher current="tinh-lang" locale={locale} />
    <TemplateHeader config={config} locale={locale} />
    <main id="noi-dung-chinh" tabIndex={-1}>

      <section className="relative overflow-hidden border-b border-[#17321d]/12">
        <div aria-hidden="true" className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#c7a882]/10 blur-3xl" />
        <div className="mx-auto grid min-h-[calc(92svh-76px)] w-[min(1420px,calc(100%-32px))] items-center gap-10 py-9 sm:w-[min(1420px,calc(100%-40px))] sm:py-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
          <div className="relative z-10 py-4 lg:pr-4">
            <TemplateTimeGreeting mood="editorial" locale={locale} />
            <p className="mt-6 text-[.64rem] font-bold uppercase tracking-[.24em] text-[#80613f]">{en ? "LAKA journal · Issue 01" : "LAKA ký sự · Số 01"}</p>
            <h1 className="mt-7 max-w-3xl font-serif text-[clamp(3.7rem,15vw,6.5rem)] font-medium leading-[.86] tracking-[-.065em] lg:text-[7.8rem]">
              {en ? <>A place<br /><i className="font-normal">to come home to.</i></> : <>Một khoảng<br /><i className="font-normal">để trở về.</i></>}
            </h1>
            <p className="mt-7 max-w-lg text-[.92rem] leading-7 text-[#17321d]/65 sm:mt-9 sm:text-base sm:leading-8">
              {en
                ? "LAKA is more than a place to spend the night. It is a home surrounded by nature, where you can slow down, reconnect and remember why you took the journey."
                : "LAKA không chỉ là nơi để ngủ qua đêm. Đó là một căn nhà giữa thiên nhiên, nơi mọi người có thể chậm lại, ở gần nhau và nhớ vì sao mình bắt đầu chuyến đi."}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              <Link href={`${config.basePath}/dat-phong`} className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#17321d] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#21483d]">
                {en ? "Check dates & prices" : "Xem lịch và giá"} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#cau-chuyen" className="inline-flex min-h-14 items-center gap-3 rounded-full border border-[#17321d]/18 px-5 text-sm font-bold transition hover:bg-white/70">
                {en ? "Feel LAKA" : "Cảm nhận LAKA"} <ArrowDownRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs leading-5 text-[#17321d]/52">
              <ShieldCheck className="h-4 w-4 text-[#80613f]" />
              {en ? "No payment required · Complimentary 2-hour hold while LAKA confirms" : "Chưa cần thanh toán · Giữ căn 2 giờ để LAKA xác nhận"}
            </p>
          </div>

          <div className="relative min-h-[500px] sm:min-h-[620px] lg:min-h-[720px]">
            <div className="absolute inset-y-0 right-0 w-[92%] overflow-hidden rounded-t-[160px] bg-[#ded5c8] sm:rounded-t-[240px]">
              <Image
                src={conceptImages.detail1}
                alt={en ? "A LAKA living room opening to nature - concept image" : "Phòng khách LAKA mở ra thiên nhiên - hình ảnh minh họa"}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 58vw"
                className="object-cover transition duration-[1400ms] hover:scale-[1.015]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10251d]/30 via-transparent to-white/5" />
            </div>
            <div className="absolute bottom-5 left-0 max-w-[245px] border border-[#17321d]/15 bg-[#faf3ea]/95 p-5 shadow-[0_24px_60px_rgba(23,50,29,.12)] backdrop-blur sm:bottom-10 sm:p-6">
              <Quote className="h-5 w-5 text-[#80613f]" />
              <p className="mt-4 font-serif text-2xl leading-tight">“{en ? "The greatest luxury is time for one another." : "Sang trọng nhất là có thời gian cho nhau."}”</p>
              <p className="mt-5 text-[.56rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{en ? "The LAKA philosophy" : "Triết lý LAKA"}</p>
            </div>
            <span className="absolute right-4 top-5 rounded-full border border-white/45 bg-white/20 px-3 py-1.5 text-[.55rem] font-bold uppercase tracking-widest text-white backdrop-blur">{en ? "Concept image" : "Ảnh concept"}</span>
          </div>
        </div>
      </section>

      <section aria-label={en ? "Find an available home" : "Tìm căn còn trống"} className="relative z-20 mx-auto -mt-px w-[min(1280px,calc(100%-24px))] translate-y-0 bg-[#e7ded1] p-4 shadow-[0_28px_80px_rgba(23,50,29,.12)] sm:-mt-11 sm:w-[min(1280px,calc(100%-40px))] sm:p-6 lg:p-7">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{en ? "Start your stay" : "Bắt đầu chuyến đi"}</p>
            <h2 className="mt-1 font-serif text-2xl font-medium sm:text-3xl">{en ? "Choose your dates. LAKA finds your home." : "Chọn ngày, LAKA tìm căn phù hợp."}</h2>
          </div>
          <p className="text-xs text-[#17321d]/52">{en ? "Availability and estimated prices update with your choices." : "Lịch trống và giá dự kiến được cập nhật theo lựa chọn của bạn."}</p>
        </div>
        <AvailabilityBar bookingPath={`${config.basePath}/dat-phong`} locale={locale} />
      </section>

      <section className="border-b border-[#17321d]/12 bg-[#faf3ea] pb-10 pt-10 sm:pb-14 sm:pt-20">
        <div className="mx-auto grid w-[min(1280px,calc(100%-32px))] grid-cols-2 border-y border-[#17321d]/12 sm:w-[min(1280px,calc(100%-40px))] lg:grid-cols-4">
          {localizedFacts.map(({ icon: Icon, value, label }, index) => <article key={label} className={`px-4 py-6 sm:px-6 sm:py-8 ${index % 2 === 0 ? "border-r border-[#17321d]/12" : ""} ${index < 2 ? "border-b border-[#17321d]/12 lg:border-b-0" : ""} lg:border-r lg:last:border-r-0`}>
            <Icon className="h-5 w-5 text-[#80613f]" />
            <p className="mt-6 font-serif text-3xl font-medium">{value}</p>
            <p className="mt-1 text-xs leading-5 text-[#17321d]/52">{label}</p>
          </article>)}
        </div>
      </section>

      <section id="cau-chuyen" className="reveal-section mx-auto grid w-[min(1320px,calc(100%-32px))] gap-12 py-20 sm:w-[min(1320px,calc(100%-40px))] sm:py-32 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
        <div className="relative min-h-[520px] sm:min-h-[680px]">
          <div className="absolute bottom-0 left-0 top-0 w-[82%] overflow-hidden rounded-t-[190px]">
            <Image src={conceptImages.forest} alt={en ? "A LAKA home tucked beneath the trees - concept image" : "Căn nhà LAKA nép dưới tán cây - hình ảnh minh họa"} fill sizes="(max-width:1024px) 85vw, 45vw" className="object-cover" />
          </div>
          <div className="absolute bottom-6 right-0 h-[42%] w-[45%] overflow-hidden border-[8px] border-[#faf3ea] bg-[#ded5c8] shadow-xl sm:border-[12px]">
            <Image src={conceptImages.detail2} alt={en ? "A slow breakfast inside a LAKA home - concept image" : "Bữa sáng chậm trong căn nhà LAKA - hình ảnh minh họa"} fill sizes="(max-width:1024px) 45vw, 22vw" className="object-cover" />
          </div>
          <span className="absolute left-5 top-8 bg-[#faf3ea]/92 px-3 py-2 text-[.56rem] font-bold uppercase tracking-[.14em]">{en ? "A visual journal · concept" : "Ký sự bằng hình · minh họa"}</span>
        </div>
        <div className="lg:pl-12">
          <p className="text-[.64rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{en ? "The LAKA story" : "Câu chuyện về LAKA"}</p>
          <h2 className="mt-6 max-w-2xl font-serif text-5xl font-medium leading-[1.04] tracking-[-.045em] sm:text-7xl">
            {en ? <>It did not begin with a room.<br /><i>It began with a feeling.</i></> : <>Không bắt đầu từ một căn phòng.<br /><i>Bắt đầu từ một cảm giác.</i></>}
          </h2>
          <p className="mt-8 max-w-xl text-sm leading-7 text-[#17321d]/64 sm:text-base sm:leading-8">
            {en
              ? "The feeling of opening a door and hearing the trees before your notifications. Of a breakfast without an end time. Of a home beautiful enough to remember, yet quiet enough to notice one another."
              : "Cảm giác khi mở cửa và nghe tiếng cây trước tiếng thông báo. Khi bữa sáng không có giờ kết thúc. Khi một căn nhà đủ đẹp để nhớ, nhưng đủ yên để mọi người chú ý đến nhau."}
          </p>
          <div className="mt-9 border-t border-[#17321d]/15">
            {localizedStoryNotes.map((note, index) => <p key={note} className="flex gap-4 border-b border-[#17321d]/15 py-5 text-sm font-semibold leading-6">
              <span className="font-serif text-lg text-[#80613f]">0{index + 1}</span>{note}
            </p>)}
          </div>
          <Link href={`${config.basePath}/ve-lago`} className="mt-8 inline-flex items-center gap-3 border-b border-[#17321d] pb-2 text-sm font-bold">
            {en ? "Read the LAKA story" : "Đọc câu chuyện LAKA"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section id="collection" className="border-y border-[#17321d]/12 bg-[#e7ded1] py-20 sm:py-32">
        <div className="mx-auto w-[min(1420px,calc(100%-32px))] sm:w-[min(1420px,calc(100%-40px))]">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_.55fr]">
            <div>
              <p className="text-[.65rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{en ? "The private home collection" : "Bộ sưu tập căn riêng"}</p>
              <h2 className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[1.05] tracking-[-.04em] sm:text-7xl">{en ? <>Every home,<br /><i>a reason to go.</i></> : <>Mỗi căn nhà,<br /><i>một lý do để đi.</i></>}</h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-[#17321d]/60">{en ? "Choose by who you travel with, your preferred pace, and the first view you want to see in the morning." : "Chọn theo người đồng hành, nhịp nghỉ và khung cảnh bạn muốn thấy đầu tiên vào buổi sáng."}</p>
              <Link href={`${config.basePath}/luu-tru`} className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em]">{en ? "Compare all homes" : "So sánh tất cả căn"} <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 sm:mt-16">
            {localizedStays.map((stay, index) => <Link href={`${config.basePath}/luu-tru/${stay.slug}`} key={stay.id} className={`group block ${index % 2 ? "md:mt-20" : ""}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[150px] bg-[#d8d0c5] sm:rounded-t-[220px]">
                <Image src={stay.image} alt={`${stay.name} - ${en ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition duration-1000 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10251d]/38 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-[#faf3ea]/92 text-[.6rem] font-bold">0{index + 1}</span>
                <span className="absolute bottom-4 left-4 rounded-full bg-[#17321d]/72 px-3 py-1.5 text-[.58rem] font-bold uppercase tracking-wider text-white backdrop-blur">{stay.badge}</span>
              </div>
              <div className="border-b border-[#17321d]/18 pb-6 pt-5">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[.6rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{stay.location}</p>
                    <h3 className="mt-2 font-serif text-4xl font-medium tracking-[-.045em] sm:text-5xl">{stay.name}</h3>
                  </div>
                  <ArrowRight className="mt-3 h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
                </div>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#17321d]/58">{stay.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-[#17321d]/55">
                  <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{en ? `Up to ${stay.maxGuests} guests` : `Tối đa ${stay.maxGuests} khách`}</span>
                  <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5" />{stay.bedrooms} {en ? "bedrooms" : "phòng ngủ"}</span>
                  <span className="ml-auto font-bold text-[#17321d]">{en ? "From" : "Từ"} {formatCurrency(stay.basePrice)} / {en ? "night" : "đêm"}</span>
                </div>
              </div>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="reveal-section mx-auto grid w-[min(1320px,calc(100%-32px))] gap-12 py-20 sm:w-[min(1320px,calc(100%-40px))] sm:py-32 lg:grid-cols-[.88fr_1.12fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[180px]">
          <Image src={conceptImages.experience} alt={en ? "A slow day at LAKA - concept image" : "Một ngày chậm tại LAKA - hình ảnh minh họa"} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#faf3ea] px-4 py-2 text-[.58rem] font-bold uppercase tracking-wider">{en ? "A day at LAKA" : "Một ngày tại LAKA"}</span>
        </div>
        <div className="lg:pl-12">
          <p className="text-[.64rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{en ? "A slower rhythm" : "Nhịp ngày thật chậm"}</p>
          <h2 className="mt-5 font-serif text-5xl font-medium leading-[1.05] tracking-[-.04em] sm:text-7xl">{en ? <>A day that needs<br /><i>very little planning.</i></> : <>Không cần lên<br /><i>kế hoạch quá nhiều.</i></>}</h2>
          <div className="mt-9 border-t border-[#17321d]/15">
            {localizedMoments.map(({ time, title, text }) => <article key={time} className="grid gap-3 border-b border-[#17321d]/15 py-5 sm:grid-cols-[72px_1fr] sm:py-6">
              <span className="text-xs font-bold text-[#80613f]">{time}</span>
              <div><h3 className="font-serif text-2xl font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-[#17321d]/58">{text}</p></div>
            </article>)}
          </div>
          <Link href={`${config.basePath}/trai-nghiem`} className="mt-8 inline-flex items-center gap-3 border-b border-[#17321d] pb-2 text-sm font-bold">{en ? "Discover a day at LAKA" : "Khám phá một ngày tại LAKA"} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="border-y border-[#17321d]/12 bg-[#17321d] py-20 text-white sm:py-28">
        <div className="mx-auto grid w-[min(1260px,calc(100%-32px))] gap-10 sm:w-[min(1260px,calc(100%-40px))] lg:grid-cols-[.42fr_1fr]">
          <div>
            <p className="text-[.64rem] font-bold uppercase tracking-[.18em] text-[#c7a882]">{en ? "Guest journal · 01" : "Nhật ký của khách · 01"}</p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/48">{en ? "What guests take home is rarely found on the amenities list." : "Điều khách mang về thường không nằm trong danh sách tiện nghi."}</p>
          </div>
          <blockquote>
            <Quote className="h-7 w-7 text-[#c7a882]" />
            <p className="mt-7 font-serif text-4xl font-medium leading-[1.16] tracking-[-.035em] sm:text-6xl">“{guestStory.quote}”</p>
            <footer className="mt-8 border-t border-white/15 pt-5 text-xs font-bold uppercase tracking-[.14em] text-white/45">{guestStory.name} · {guestStory.stay}</footer>
          </blockquote>
        </div>
      </section>

      <section className="mx-auto w-[min(1120px,calc(100%-32px))] py-20 sm:w-[min(1120px,calc(100%-40px))] sm:py-28">
        <div className="mb-9 grid gap-5 sm:grid-cols-2 sm:items-end">
          <div><p className="text-[.64rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{en ? "Before your stay" : "Trước kỳ nghỉ"}</p><h2 className="mt-4 font-serif text-5xl font-medium tracking-[-.04em]">{en ? "Clarity makes room for rest." : "Rõ ràng để thật sự thư giãn."}</h2></div>
          <Link href={`${config.basePath}/thong-tin`} className="justify-self-start border-b border-[#17321d] pb-1 text-xs font-bold sm:justify-self-end">{en ? "View all information" : "Xem tất cả thông tin"}</Link>
        </div>
        <div className="border-t border-[#17321d]/15">
          {localizedFaqs.map(([question, answer]) => <details key={question} className="group border-b border-[#17321d]/15 py-6">
            <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-5 font-bold"><span>{question}</span><Plus className="h-5 w-5 shrink-0 transition group-open:rotate-45" /></summary>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#17321d]/60">{answer}</p>
          </details>)}
        </div>
      </section>

      <section className="mx-auto w-[min(1420px,calc(100%-24px))] overflow-hidden bg-[#e7ded1] sm:w-[min(1420px,calc(100%-40px))]">
        <div className="grid lg:grid-cols-[1fr_.72fr]">
          <div className="px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
            <p className="text-[.64rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{en ? "Your quiet place is waiting" : "Khoảng yên đang chờ"}</p>
            <h2 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.06] tracking-[-.04em] sm:text-7xl">{en ? <>Choose your dates.<br /><i>LAKA takes care of the rest.</i></> : <>Chọn ngày.<br /><i>LAKA lo phần còn lại.</i></>}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#17321d]/60">{en ? "See available homes and estimated prices directly on the website. No payment and no account required." : "Xem căn còn trống và giá dự kiến ngay trên website. Chưa cần thanh toán, không cần tạo tài khoản."}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`${config.basePath}/dat-phong`} className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#17321d] px-7 text-sm font-bold text-white">{en ? "Choose your dates" : "Chọn ngày lưu trú"} <ArrowRight className="h-4 w-4" /></Link>
              <Link href={`${config.basePath}/lien-he`} className="inline-flex min-h-14 items-center rounded-full border border-[#17321d]/18 px-6 text-sm font-bold">{en ? "Ask LAKA" : "Nhờ LAKA tư vấn"}</Link>
            </div>
          </div>
          <div className="relative min-h-[360px] lg:min-h-0">
            <Image src={conceptImages.cloud} alt={en ? "A LAKA home in nature - concept image" : "Căn nhà LAKA giữa thiên nhiên - hình ảnh minh họa"} fill sizes="(max-width:1024px) 100vw, 42vw" className="object-cover" />
            <div className="absolute inset-0 bg-[#17321d]/8" />
          </div>
        </div>
      </section>

    </main>
    <TemplateFooter config={config} locale={locale} />
  </div>;
}
