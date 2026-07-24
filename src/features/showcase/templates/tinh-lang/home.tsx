import Image from "next/image";
import { ShowcaseLink as Link } from "@/features/showcase/site/showcase-link";
import { ArrowDown, ArrowRight, BedDouble, Clock3, House, Plus, Quote, ShieldCheck, Users } from "lucide-react";
import { AvailabilityBar } from "@/features/booking/components/availability-bar";
import { TemplateExperienceLayer } from "@/features/showcase/components/template-experience-layer";
import { TemplateTimeGreeting } from "@/features/showcase/components/template-time-greeting";
import { TemplateDocumentLocale } from "@/features/showcase/components/template-document-locale";
import { TemplateAtmosphereController } from "@/features/showcase/components/template-atmosphere-controller";
import { experienceMoments, guestStories, showcaseFaqs } from "@/features/showcase/data/showcase-content";
import { conceptImages, getUnitsForStay, getZoneForStay, stays, stayZones } from "@/features/stays/data/demo-data";
import { formatCurrency } from "@/shared/lib/format";
import { TemplateFooter, TemplateHeader, type CompleteTemplateConfig } from "@/features/showcase/site/complete-template-site";
import { SkipLink } from "@/shared/components/ui/skip-link";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { englishExperienceMoments, englishFaqs, localizeStay, localizeStayZone } from "@/features/showcase/i18n/showcase-copy";
import { diningStories, inLocale } from "@/features/showcase/data/laka-demo-content";

const facts = [
  { icon: House, value: "03", vi: "hệ cảnh quan", en: "landscape collections" },
  { icon: ShieldCheck, value: "04", vi: "dòng nhà riêng", en: "private home types" },
  { icon: Users, value: "06", vi: "căn thực tế", en: "physical homes" },
  { icon: Clock3, value: "02h", vi: "giữ chỗ miễn phí", en: "complimentary hold" },
];

export function TinhLangHome({ config, locale = "vi" }: { config: CompleteTemplateConfig; locale?: ShowcaseLocale }) {
  const en = locale === "en";
  const localizedStays = stays.map((stay) => localizeStay(stay, locale));
  const localizedZones = stayZones.map((zone) => localizeStayZone(zone, locale));
  const localizedMoments = en
    ? experienceMoments.map((moment, index) => ({ ...moment, ...englishExperienceMoments[index] }))
    : experienceMoments;
  const localizedFaqs = en ? englishFaqs : showcaseFaqs;
  const guestStory = en
    ? { quote: "For the first time in a long while, our whole family sat down for breakfast without anyone watching the clock.", name: "Illustrative scenario 01", stay: "A weekend at Forest House" }
    : guestStories[0];

  return <div className="showcase-root min-h-screen bg-[#eae1d2] text-[#16311c]">
    <TemplateDocumentLocale locale={locale} />
    <SkipLink />
    <TemplateExperienceLayer mood="editorial" />
    <TemplateAtmosphereController locale={locale} />
    <TemplateHeader config={config} locale={locale} overlay />

    <main id="noi-dung-chinh" tabIndex={-1}>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#10251d] text-white">
        <Image
          src={conceptImages.hero}
          alt={en ? "LAKA private home surrounded by nature — concept image" : "Căn nhà LAKA giữa thiên nhiên — hình ảnh minh họa"}
          fill
          priority
          sizes="100vw"
          className="showcase-atmosphere-media object-cover object-[58%_center] scale-[1.01]"
        />
        <span aria-hidden="true" className="showcase-natural-light absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,18,14,.28)_0%,rgba(5,18,14,.08)_32%,rgba(5,18,14,.78)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,18,14,.48)_0%,transparent_58%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1500px,calc(100%-32px))] flex-col justify-end pb-28 pt-32 sm:w-[min(1500px,calc(100%-56px))] sm:pb-12 lg:pb-14">
          <div className="mb-auto flex items-start justify-between pt-2">
            <TemplateTimeGreeting mood="editorial" locale={locale} />
            <p className="hidden max-w-[210px] text-right text-[.6rem] font-bold uppercase leading-5 tracking-[.2em] text-white/55 sm:block">
              {en ? "Three landscapes · six private homes · one slower rhythm" : "Ba hệ cảnh quan · sáu căn riêng · một nhịp sống thật chậm"}
            </p>
          </div>

          <p className="text-[.62rem] font-bold uppercase tracking-[.25em] text-[#dfc6a5]">{en ? "LAKA journal · A private retreat" : "LAKA ký sự · Kỳ nghỉ riêng tư"}</p>
          <h1 className="mt-5 max-w-[1320px] font-serif text-[clamp(3.75rem,15vw,13rem)] font-medium leading-[.8] tracking-[-.07em] sm:leading-[.76] sm:tracking-[-.075em]">
            {en ? <>Come back<br /><i className="font-normal text-[#dfc6a5]">to what<br className="sm:hidden" /> matters.</i></> : <>Trở về<br /><i className="font-normal text-[#dfc6a5]">với điều<br className="sm:hidden" /> quan trọng.</i></>}
          </h1>
          <div className="mt-8 grid gap-7 border-t border-white/22 pt-6 sm:grid-cols-[1fr_auto] sm:items-end lg:mt-10">
            <p className="max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              {en
                ? "Not simply a room for the night, but a home surrounded by nature — where mornings begin gently and time belongs to you again."
                : "Không chỉ là một căn phòng để ngủ, mà là một ngôi nhà giữa thiên nhiên — nơi buổi sáng bắt đầu thật khẽ và thời gian lại thuộc về bạn."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={`${config.basePath}/dat-phong`} className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#eae1d2] px-6 text-sm font-bold text-[#16311c] transition hover:-translate-y-0.5">
                {en ? "Find your home" : "Tìm căn dành cho bạn"} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#manifesto" className="hidden min-h-14 items-center gap-3 rounded-full border border-white/30 bg-black/10 px-5 text-sm font-bold backdrop-blur sm:inline-flex">
                {en ? "Enter LAKA" : "Bước vào LAKA"} <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <span className="absolute right-4 top-24 z-10 rounded-full border border-white/25 bg-black/12 px-3 py-1.5 text-[.55rem] font-bold uppercase tracking-widest text-white/72 backdrop-blur">{en ? "Concept image" : "Hình ảnh minh họa"}</span>
      </section>

      <section aria-label={en ? "Find an available home" : "Tìm căn còn trống"} className="relative z-20 mx-auto -mt-px w-full border-b border-[#16311c]/12 bg-[#16311c] px-4 py-5 text-white shadow-[0_30px_90px_rgba(12,34,27,.24)] sm:-mt-8 sm:w-[min(1420px,calc(100%-48px))] sm:px-7 sm:py-7">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-[.58rem] font-bold uppercase tracking-[.2em] text-[#dfc6a5]">{en ? "Begin with a date" : "Bắt đầu bằng một ngày"}</p><h2 className="mt-1 font-serif text-2xl font-medium sm:text-3xl">{en ? "LAKA will find the right place." : "LAKA sẽ tìm đúng căn dành cho bạn."}</h2></div>
          <p className="text-xs text-white/45">{en ? "Live availability · Transparent estimated prices" : "Lịch trống trực tiếp · Giá dự kiến rõ ràng"}</p>
        </div>
        <AvailabilityBar compact bookingPath={`${config.basePath}/dat-phong`} locale={locale} />
      </section>

      <section id="manifesto" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-36 lg:py-44">
        <div className="mx-auto grid w-[min(1380px,100%)] gap-14 lg:grid-cols-[.26fr_1fr]">
          <aside className="lg:pt-4">
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "The reason LAKA exists" : "Vì sao LAKA hiện diện"}</p>
            <p className="mt-5 max-w-[230px] text-sm leading-7 text-[#16311c]/55">{en ? "A place can be beautiful. A meaningful stay must make you feel more present." : "Một nơi có thể đẹp. Một kỳ nghỉ đáng nhớ phải khiến ta thực sự hiện diện."}</p>
          </aside>
          <div>
            <h2 className="max-w-6xl font-serif text-[clamp(3.5rem,8.7vw,8.4rem)] font-medium leading-[.93] tracking-[-.065em]">
              {en ? <>We did not begin<br />with a room.<br /><i className="text-[#9a7550]">We began with a feeling.</i></> : <>Không bắt đầu<br />từ một căn phòng.<br /><i className="text-[#9a7550]">Bắt đầu từ một cảm giác.</i></>}
            </h2>
            <div className="mt-12 grid gap-8 border-t border-[#16311c]/18 pt-8 sm:grid-cols-2 lg:mt-16">
              <p className="max-w-lg text-base leading-8 text-[#16311c]/68">{en ? "The feeling of opening a door and hearing the trees before your notifications. Of breakfast without an end time." : "Cảm giác khi mở cửa và nghe tiếng cây trước tiếng thông báo. Khi bữa sáng không có giờ kết thúc."}</p>
              <p className="max-w-lg text-base leading-8 text-[#16311c]/68">{en ? "A home beautiful enough to remember, yet quiet enough for everyone to notice one another." : "Một căn nhà đủ đẹp để nhớ, nhưng đủ yên để mọi người thực sự chú ý đến nhau."}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#16311c]/12 bg-[#e3d8c9]">
        <div className="mx-auto grid w-[min(1420px,100%)] grid-cols-2 lg:grid-cols-4">
          {facts.map(({ icon: Icon, value, vi, en: english }, index) => <article key={vi} className={`min-h-44 border-[#16311c]/12 px-5 py-7 sm:min-h-52 sm:px-7 sm:py-9 ${index % 2 === 0 ? "border-r" : ""} ${index < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:last:border-r-0`}>
            <div className="flex items-start justify-between"><span className="font-serif text-4xl font-medium sm:text-5xl">{value}</span><Icon className="h-5 w-5 text-[#80613f]" /></div>
            <p className="mt-12 text-[.62rem] font-bold uppercase leading-5 tracking-[.14em] text-[#16311c]/52">{en ? english : vi}</p>
          </article>)}
        </div>
      </section>

      <section id="collection" className="px-4 py-24 sm:px-7 sm:py-36">
        <div className="mx-auto w-[min(1420px,100%)]">
          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_.42fr] lg:items-end">
            <div><p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "The LAKA product map" : "Bản đồ sản phẩm LAKA"}</p><h2 className="mt-5 max-w-5xl font-serif text-[clamp(3.6rem,9vw,8rem)] font-medium leading-[.88] tracking-[-.065em]">{en ? <>Choose a landscape.<br /><i>Then choose your home.</i></> : <>Chọn một hệ cảnh quan.<br /><i>Rồi chọn căn thuộc về bạn.</i></>}</h2></div>
            <div><p className="text-sm leading-7 text-[#16311c]/58">{en ? "LAKA is organised into three distinct settings. Each setting contains one or more home types and real bookable units." : "LAKA được chia thành ba hệ cảnh quan. Trong mỗi hệ có một hoặc nhiều dòng nhà và các căn thực tế có thể đặt."}</p><Link href={`${config.basePath}/luu-tru`} className="mt-5 inline-flex items-center gap-2 border-b border-[#16311c] pb-2 text-xs font-bold uppercase tracking-[.12em]">{en ? "Explore the full product map" : "Xem toàn bộ bản đồ căn"} <ArrowRight className="h-4 w-4" /></Link></div>
          </div>

          <div className="mb-16 grid gap-4 md:grid-cols-3">
            {localizedZones.map((zone, index) => {
              const zoneStays = stays.filter((stay) => stay.zoneId === zone.id);
              const unitCount = zoneStays.reduce((sum, stay) => sum + getUnitsForStay(stay.id).length, 0);
              return <Link href={`${config.basePath}/luu-tru#${zone.slug}`} key={zone.id} className="group relative min-h-[300px] overflow-hidden rounded-[28px] bg-[#10251d] text-white">
                <Image src={zone.image} alt={`${zone.name} — ${en ? "concept image" : "hình ảnh minh họa"}`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover opacity-58 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-75" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#071b14]/92 via-transparent to-black/20" />
                <span className="relative flex min-h-[300px] flex-col justify-between p-6"><span className="flex items-center justify-between text-[.58rem] font-bold uppercase tracking-[.18em] text-white/62"><span>0{index + 1} · {zone.eyebrow}</span><ArrowRight className="h-4 w-4 -rotate-45 transition group-hover:rotate-0" /></span><span><strong className="font-serif text-4xl font-medium">{zone.name}</strong><span className="mt-3 block text-xs text-white/58">{zoneStays.length} {en ? "home types" : "dòng nhà"} · {unitCount} {en ? "physical homes" : "căn thực tế"}</span></span></span>
              </Link>;
            })}
          </div>

          <div className="space-y-8 sm:space-y-12">
            {localizedStays.map((stay, index) => <article key={stay.id} className="group sticky overflow-hidden rounded-[28px] bg-[#10251d] shadow-[0_36px_90px_rgba(15,39,31,.18)] sm:rounded-[42px]" style={{ top: `${92 + index * 12}px` }}>
              <Link href={`${config.basePath}/luu-tru/${stay.slug}`} className="relative block min-h-[70svh] sm:min-h-[76svh]">
                <Image src={stay.image} alt={`${stay.name} — ${en ? "concept image" : "hình ảnh minh họa"}`} fill sizes="100vw" className="object-cover transition duration-[1200ms] group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,22,17,.12),rgba(7,22,17,.8))]" />
                <div className="relative z-10 flex min-h-[70svh] flex-col justify-between p-5 text-white sm:min-h-[76svh] sm:p-9 lg:p-12">
                  <div className="flex items-start justify-between gap-6">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-black/12 text-xs font-bold backdrop-blur">0{index + 1}</span>
                    <div className="text-right"><p className="text-[.58rem] font-bold uppercase tracking-[.18em] text-white/55">{localizeStayZone(getZoneForStay(stay), locale).name} · {stay.badge}</p><p className="mt-2 text-xs text-white/72">{getUnitsForStay(stay.id).length} {en ? "bookable homes" : "căn có thể đặt"} · {stay.location}</p></div>
                  </div>
                  <div>
                    <p className="max-w-xl text-sm leading-7 text-white/66">{stay.subtitle}</p>
                    <div className="mt-4 flex items-end justify-between gap-6 border-b border-white/25 pb-6">
                      <h3 className="font-serif text-[clamp(3.6rem,10vw,9rem)] font-medium leading-[.84] tracking-[-.07em]">{stay.name}</h3>
                      <span className="mb-2 grid h-13 w-13 shrink-0 place-items-center rounded-full bg-[#eae1d2] text-[#16311c] transition group-hover:rotate-[-18deg] sm:h-16 sm:w-16"><ArrowRight className="h-5 w-5" /></span>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-white/68">
                      <span className="flex items-center gap-2"><Users className="h-4 w-4" />{en ? `Up to ${stay.maxGuests} guests` : `Tối đa ${stay.maxGuests} khách`}</span>
                      <span className="flex items-center gap-2"><BedDouble className="h-4 w-4" />{stay.bedrooms} {en ? "bedrooms" : "phòng ngủ"}</span>
                      <span className="sm:ml-auto">{en ? "From" : "Từ"} <strong className="text-white">{formatCurrency(stay.basePrice)}</strong> / {en ? "night" : "đêm"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-[#16311c]/12 bg-[#e3d8c9] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto w-[min(1320px,100%)]">
          <div className="grid gap-7 lg:grid-cols-[1fr_.45fr] lg:items-end">
            <div><p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "Food is part of the memory" : "Bữa ăn cũng là một phần ký ức"}</p><h2 className="mt-5 max-w-5xl font-serif text-[clamp(3.4rem,7vw,6.8rem)] font-medium leading-[.92] tracking-[-.055em]">{en ? <>Stay close.<br /><i>Eat at your own table.</i></> : <>Ở thật gần.<br /><i>Ăn tại bàn của riêng mình.</i></>}</h2></div>
            <div><p className="text-sm leading-7 text-[#16311c]/62">{en ? "A proposed dining concept built around the home: breakfast on the veranda, seasonal shared dishes and private evening tables." : "Concept ẩm thực xoay quanh căn nhà: giỏ sáng bên hiên, món theo mùa để chia sẻ và bàn tối riêng tư."}</p><Link href={`${config.basePath}/trai-nghiem`} className="mt-5 inline-flex items-center gap-2 border-b border-[#16311c] pb-2 text-xs font-bold uppercase tracking-[.12em]">{en ? "Explore food & experiences" : "Xem ẩm thực & trải nghiệm"} <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
          <div className="mt-12 grid border-y border-[#16311c]/15 md:grid-cols-3">
            {diningStories.map((item, index) => { const Icon = item.icon; return <article key={item.title.vi} className="border-b border-[#16311c]/15 px-6 py-8 last:border-b-0 md:border-b-0 md:border-r md:first:pl-0 md:last:border-r-0"><div className="flex items-center justify-between"><span className="text-[.58rem] font-bold text-[#80613f]">0{index + 1}</span><Icon className="h-5 w-5 text-[#80613f]" /></div><p className="mt-12 text-[.58rem] font-bold uppercase tracking-[.16em] text-[#16311c]/45">{inLocale(item.kicker, locale)}</p><h3 className="mt-3 font-serif text-3xl font-medium">{inLocale(item.title, locale)}</h3><p className="mt-4 text-sm leading-7 text-[#16311c]/62">{inLocale(item.text, locale)}</p></article>; })}
          </div>
          <p className="mt-5 text-xs leading-6 text-[#16311c]/48">{en ? "Illustrative service concept — menu, availability and pricing require approval before launch." : "Dịch vụ minh họa — thực đơn, khả năng phục vụ và giá cần được duyệt trước khi mở bán."}</p>
        </div>
      </section>

      <section className="overflow-hidden bg-[#10251d] px-5 py-24 text-white sm:px-8 sm:py-36">
        <div className="mx-auto grid w-[min(1380px,100%)] gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#dfc6a5]">{en ? "A day at LAKA" : "Một ngày tại LAKA"}</p>
            <h2 className="mt-6 font-serif text-[clamp(3.5rem,7vw,6.8rem)] font-medium leading-[.9] tracking-[-.06em]">{en ? <>Nothing planned.<br /><i>Everything felt.</i></> : <>Không cần kế hoạch.<br /><i>Chỉ cần cảm nhận.</i></>}</h2>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-t-[180px] sm:rounded-t-[260px]">
              <Image src={conceptImages.experience} alt={en ? "A slow day at LAKA — concept image" : "Một ngày chậm tại LAKA — hình ảnh minh họa"} fill sizes="(max-width:1024px) 100vw, 44vw" className="object-cover" />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#eae1d2] px-4 py-2 text-[.56rem] font-bold uppercase tracking-wider text-[#16311c]">{en ? "Concept image" : "Hình ảnh minh họa"}</span>
            </div>
          </div>
          <div className="border-t border-white/18">
            {localizedMoments.map(({ time, title, text }, index) => <article key={time} className="grid gap-5 border-b border-white/18 py-8 sm:grid-cols-[90px_1fr] sm:py-10">
              <div><span className="text-[.58rem] font-bold uppercase tracking-[.18em] text-[#dfc6a5]">0{index + 1}</span><p className="mt-2 font-serif text-2xl">{time}</p></div>
              <div><h3 className="font-serif text-3xl font-medium sm:text-4xl">{title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-white/52">{text}</p></div>
            </article>)}
            <Link href={`${config.basePath}/trai-nghiem`} className="mt-8 inline-flex min-h-13 items-center gap-3 rounded-full border border-white/25 px-6 text-sm font-bold">{en ? "Discover the LAKA rhythm" : "Khám phá nhịp sống LAKA"} <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="relative min-h-[80svh] overflow-hidden text-white">
        <Image src={conceptImages.detail2} alt={en ? "A shared breakfast at LAKA — concept image" : "Bữa sáng bên nhau tại LAKA — hình ảnh minh họa"} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#10251d]/68" />
        <div className="relative z-10 mx-auto flex min-h-[80svh] w-[min(1180px,calc(100%-40px))] flex-col justify-center py-24 text-center">
          <Quote className="mx-auto h-8 w-8 text-[#dfc6a5]" />
          <blockquote className="mt-8 font-serif text-[clamp(2.5rem,6vw,5.8rem)] font-medium leading-[1.08] tracking-[-.045em]">“{guestStory.quote}”</blockquote>
          <p className="mt-8 text-[.62rem] font-bold uppercase tracking-[.2em] text-white/58">{guestStory.name} · {guestStory.stay}</p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1280px,calc(100%-32px))] gap-12 py-24 sm:w-[min(1280px,calc(100%-48px))] sm:py-36 lg:grid-cols-[.52fr_1fr]">
        <div><p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#80613f]">{en ? "Before your stay" : "Trước kỳ nghỉ"}</p><h2 className="mt-5 font-serif text-5xl font-medium leading-[.95] tracking-[-.05em] sm:text-7xl">{en ? <>Clear answers.<br /><i>A lighter mind.</i></> : <>Rõ ràng trước.<br /><i>Nhẹ lòng sau.</i></>}</h2><Link href={`${config.basePath}/thong-tin`} className="mt-7 inline-flex items-center gap-2 border-b border-[#16311c] pb-2 text-xs font-bold uppercase tracking-[.12em]">{en ? "All information" : "Xem tất cả thông tin"} <ArrowRight className="h-4 w-4" /></Link></div>
        <div className="border-t border-[#16311c]/18">
          {localizedFaqs.map(([question, answer], index) => <details key={question} className="group border-b border-[#16311c]/18 py-6 sm:py-7">
            <summary className="flex min-h-10 cursor-pointer list-none items-center gap-5 font-bold"><span className="text-[.58rem] text-[#80613f]">0{index + 1}</span><span className="flex-1">{question}</span><Plus className="h-5 w-5 shrink-0 transition group-open:rotate-45" /></summary>
            <p className="ml-10 mt-4 max-w-3xl text-sm leading-7 text-[#16311c]/58">{answer}</p>
          </details>)}
        </div>
      </section>

      <section className="relative mx-auto min-h-[78svh] w-full overflow-hidden bg-[#10251d] text-white sm:w-[min(1500px,calc(100%-40px))]">
        <Image src={conceptImages.cloud} alt={en ? "LAKA home beneath the clouds — concept image" : "Căn nhà LAKA dưới tầng mây — hình ảnh minh họa"} fill sizes="100vw" className="object-cover opacity-58" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10251d] via-[#10251d]/65 to-transparent" />
        <div className="relative z-10 flex min-h-[78svh] max-w-5xl flex-col justify-center px-5 py-20 sm:px-12 lg:px-20">
          <p className="text-[.62rem] font-bold uppercase tracking-[.24em] text-[#dfc6a5]">{en ? "Your quiet place is waiting" : "Khoảng yên đang chờ"}</p>
          <h2 className="mt-6 font-serif text-[clamp(3.8rem,9vw,8.5rem)] font-medium leading-[.88] tracking-[-.065em]">{en ? <>Choose a date.<br /><i>Keep the feeling.</i></> : <>Chọn một ngày.<br /><i>Giữ lại cảm giác.</i></>}</h2>
          <p className="mt-7 max-w-xl text-sm leading-7 text-white/62 sm:text-base">{en ? "Check live availability and estimated prices. No account and no immediate payment required." : "Xem lịch trống và giá dự kiến trực tiếp. Không cần tài khoản, chưa cần thanh toán ngay."}</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href={`${config.basePath}/dat-phong`} className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#eae1d2] px-7 text-sm font-bold text-[#16311c]">{en ? "Choose your dates" : "Chọn ngày lưu trú"} <ArrowRight className="h-4 w-4" /></Link><Link href={`${config.basePath}/lien-he`} className="inline-flex min-h-14 items-center rounded-full border border-white/28 px-6 text-sm font-bold">{en ? "Ask LAKA" : "Nhờ LAKA tư vấn"}</Link></div>
        </div>
      </section>
    </main>

    <TemplateFooter config={config} locale={locale} />
  </div>;
}
