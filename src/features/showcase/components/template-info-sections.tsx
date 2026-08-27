import Link from "next/link";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone, Plus, ShieldCheck, Sparkles } from "lucide-react";
import { showcaseFaqs } from "@/features/showcase/data/showcase-content";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { englishFaqs } from "@/features/showcase/i18n/showcase-copy";
import { publicContact } from "@/shared/lib/public-contact";

type Mood = "editorial" | "cinematic" | "organic";
type Policy = readonly [string, string];

const faqCategories = {
  vi: [
    ["Không gian và các khu", 1],
    ["Trạng thái dự án", 2],
    ["Lưu trú và nhận căn", 3],
    ["Ẩm thực và dịch vụ", 6],
    ["Gia đình và di chuyển", 7],
    ["Lưu ý trước chuyến đi", 10]
  ],
  en: [
    ["Spaces and collections", 1],
    ["Project status", 2],
    ["Stays and arrival", 3],
    ["Dining and services", 6],
    ["Families and travel", 7],
    ["Before your journey", 10]
  ]
} as const;

function Answer({ text }: { text: string }) {
  return (
    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-open:grid-rows-[1fr]">
      <div className="overflow-hidden">
        <p className="max-w-2xl pb-1 pt-2.5 text-sm leading-6 opacity-80">{text}</p>
      </div>
    </div>
  );
}

export function TemplateInfoHighlights({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  const isEn = locale === "en";
  const items = isEn
    ? [
        {
          icon: MapPin,
          label: "Location & Travel",
          value: "Doc Day Dieu, Soc Son",
          sub: "~45 mins from central Hanoi"
        },
        {
          icon: Clock,
          label: "Check-in & Check-out",
          value: "14:00 · 12:00",
          sub: "Early arrival on request"
        },
        {
          icon: Sparkles,
          label: "Included Facilities",
          value: "Pool, Kayak, Bikes, BBQ",
          sub: "All included in stay rates"
        },
        {
          icon: MessageCircle,
          label: "24/7 Support & Hold",
          value: "Direct Hotline & Zalo",
          sub: "2-hour booking hold"
        }
      ]
    : [
        {
          icon: MapPin,
          label: "Vị trí & Cung đường",
          value: "Dốc Dây Diều, Sóc Sơn",
          sub: "Cách trung tâm Hà Nội ~45 phút"
        },
        {
          icon: Clock,
          label: "Khung giờ lưu trú",
          value: "Check-in 14:00 · Check-out 12:00",
          sub: "Linh hoạt theo tình trạng căn"
        },
        {
          icon: Sparkles,
          label: "Tiện ích trọn gói",
          value: "Bể bơi, Kayak, Xe đạp, BBQ",
          sub: "Trọn gói trong giá phòng"
        },
        {
          icon: MessageCircle,
          label: "Tư vấn & Giữ chỗ",
          value: "Hotline & Zalo trực tiếp",
          sub: "Giữ chỗ 2 giờ sau đăng ký"
        }
      ];

  return (
    <section className="border-b border-[#16311c]/12 bg-[#e7ded1] py-5 sm:py-7">
      <div className="mx-auto w-[min(1280px,calc(100%-32px))] sm:w-[min(1280px,calc(100%-48px))]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3.5 rounded-xl border border-[#16311c]/10 bg-[#eae1d2]/80 p-3.5 sm:p-4 transition hover:bg-white/60"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#16311c]/8 text-[#80613f]">
                  <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[.58rem] font-bold uppercase tracking-wider text-[#80613f]">{item.label}</p>
                  <p className="truncate text-xs sm:text-sm font-bold text-[#16311c]">{item.value}</p>
                  <p className="truncate text-[.7rem] text-[#16311c]/65">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function TemplateInfoRelatedLinks({ basePath = "", locale = "vi" }: { basePath?: string; locale?: ShowcaseLocale }) {
  const isEn = locale === "en";
  const links = isEn
    ? [
        {
          href: `${basePath}/chinh-sach-luu-tru`,
          title: "Stay Policies",
          desc: "Check-in, cancellation and quiet hours"
        },
        {
          href: `${basePath}/di-chuyen`,
          title: "Directions & Map",
          desc: "Routes, transport and arrival guide"
        },
        {
          href: `${basePath}/dieu-khoan`,
          title: "Terms & Privacy",
          desc: "Terms of service and guest privacy"
        },
        {
          href: `${basePath}/lien-he`,
          title: "Contact & Advice",
          desc: "Get personalized consultation for your group"
        }
      ]
    : [
        {
          href: `${basePath}/chinh-sach-luu-tru`,
          title: "Chính sách lưu trú",
          desc: "Quy định nhận phòng, đổi hủy và giờ yên tĩnh"
        },
        {
          href: `${basePath}/di-chuyen`,
          title: "Hướng dẫn di chuyển",
          desc: "Cung đường, bản đồ và phương án đưa đón"
        },
        {
          href: `${basePath}/dieu-khoan`,
          title: "Điều khoản & Bảo mật",
          desc: "Quy định dịch vụ và bảo vệ thông tin khách"
        },
        {
          href: `${basePath}/lien-he`,
          title: "Liên hệ tư vấn",
          desc: "Hỗ trợ chọn căn và báo giá theo nhu cầu đoàn"
        }
      ];

  return (
    <section className="border-t border-[#16311c]/12 bg-[#e3d8c9] py-8 sm:py-12">
      <div className="mx-auto w-[min(1280px,calc(100%-32px))] sm:w-[min(1280px,calc(100%-48px))]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#80613f]">
              {isEn ? "Explore more" : "Khám phá thêm"}
            </p>
            <h2 className="laka-heading-card mt-1 text-lg sm:text-xl font-bold">
              {isEn ? "Related information" : "Thông tin liên quan"}
            </h2>
          </div>
          <p className="text-xs text-[#16311c]/60 max-w-md">
            {isEn ? "Quick shortcuts to all LAKA guidelines and policies." : "Lối tắt đến các trang chính sách, bản đồ và hỗ trợ của LAKA."}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col justify-between rounded-xl border border-[#16311c]/12 bg-[#eae1d2] p-4 sm:p-5 transition hover:-translate-y-0.5 hover:bg-[#f2ece2] hover:shadow-sm"
            >
              <div>
                <h3 className="text-sm font-bold text-[#16311c] group-hover:text-[#80613f] transition">
                  {link.title}
                </h3>
                <p className="mt-1 text-xs text-[#16311c]/65 leading-relaxed">
                  {link.desc}
                </p>
              </div>
              <span className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#80613f]">
                {isEn ? "View details" : "Xem chi tiết"}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TemplateFaqIndex({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  return (
    <nav aria-label={locale === "en" ? "FAQ topics" : "Chủ đề câu hỏi"} className="border-y border-[#16311c]/12 bg-[#e3d8c9] py-10 sm:py-14 md:py-16">
      <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
        <div className="grid gap-6 lg:grid-cols-[.42fr_1fr] lg:items-start">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Find an answer quickly" : "Tìm câu trả lời nhanh"}</p>
            <p className="mt-2.5 max-w-sm text-sm leading-6 text-[#16311c]/62">{locale === "en" ? "Choose a topic to jump to the relevant part, then open only the answer you need." : "Chọn một chủ đề để đi đúng phần, sau đó chỉ mở câu trả lời bạn thực sự cần."}</p>
          </div>
          <h2 className="laka-heading-section">{locale === "en" ? "Everything useful, grouped clearly." : "Mọi điều cần biết, được nhóm thật rõ."}</h2>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {faqCategories[locale].map(([label, target], index) => (
            <a key={label} href={`#faq-${target}`} className="focus-ring group flex min-h-24 sm:min-h-28 items-end justify-between border border-[#80613f]/45 bg-[#eae1d2] p-4 sm:p-5 transition hover:-translate-y-0.5 hover:bg-[#f2ece2]">
              <span>
                <span className="block text-[.58rem] font-bold tracking-[.16em] text-[#80613f]">0{index + 1}</span>
                <span className="laka-heading-card mt-3 sm:mt-4 block">{label}</span>
              </span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function TemplateFaqSection({ mood, policyHref, locale = "vi" }: { mood: Mood; policyHref: string; locale?: ShowcaseLocale }) {
  const localizedFaqs = locale === "en" ? englishFaqs : showcaseFaqs;
  if (mood === "cinematic") return <section className="mx-auto grid w-[min(1380px,calc(100%-40px))] gap-8 sm:gap-10 py-10 sm:py-14 md:py-16 lg:grid-cols-[.38fr_1fr]">
    <aside className="h-fit border-l border-[#c7a882]/35 pl-6 lg:sticky lg:top-28"><p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#c7a882]">Hỗ trợ trực tiếp</p><p className="mt-4 max-w-xs font-serif text-2xl sm:text-3xl font-medium leading-tight">Một cuộc trò chuyện ngắn có thể giúp bạn chọn đúng căn.</p><a href={publicContact.phoneHref} className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-[#c7a882]"><Phone className="h-4 w-4" />{publicContact.phoneDisplay}</a></aside>
    <div className="border-t border-white/12">{showcaseFaqs.map(([question, answer], index) => <details id={`faq-${index + 1}`} key={question} className="group scroll-mt-28 border-b border-white/12 py-4 sm:py-4.5"><summary className="flex cursor-pointer list-none items-start gap-4"><span className="pt-0.5 text-[.62rem] font-bold text-[#c7a882]">0{index + 1}</span><span className="flex-1 font-serif text-xl sm:text-2xl font-medium leading-tight">{question}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 transition duration-300 group-open:rotate-45 group-open:border-[#c7a882] group-open:text-[#c7a882]"><Plus className="h-3.5 w-3.5" /></span></summary><div className="pl-9 text-white/72"><Answer text={answer} /></div></details>)}<Link href={policyHref} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#c7a882]">Đọc toàn bộ chính sách <ArrowRight className="h-4 w-4" /></Link></div>
  </section>;

  if (mood === "organic") return <section className="mx-auto w-[min(1280px,calc(100%-28px))] py-10 sm:py-14 md:py-16">
    <div className="mb-7 flex flex-col gap-4 rounded-[28px] bg-[#16311c] p-6 text-white sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[.6rem] font-extrabold uppercase tracking-[.14em] text-[#f7cf58]">Bạn cứ hỏi nhé</p><p className="mt-2 text-xl font-extrabold">LAKA trả lời rõ trước khi bạn lên đường.</p></div><a href={publicContact.phoneHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f7cf58] px-5 text-sm font-extrabold text-[#16311c]"><Phone className="h-4 w-4" />Gọi LAKA</a></div>
    <div className="grid gap-3.5 md:grid-cols-2">{showcaseFaqs.map(([question, answer], index) => <details id={`faq-${index + 1}`} key={question} className={`group h-fit scroll-mt-28 rounded-[24px] p-5 shadow-[0_12px_36px_rgba(33,72,61,.06)] ${index === 1 ? "bg-[#f7cf58]" : index === 2 ? "bg-[#dce9c6]" : "bg-white"}`}><summary className="flex cursor-pointer list-none items-start gap-3.5"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#16311c] text-[.6rem] font-extrabold text-white">0{index + 1}</span><span className="flex-1 text-base font-extrabold leading-snug">{question}</span><Plus className="mt-1 h-4 w-4 shrink-0 transition duration-300 group-open:rotate-45" /></summary><div className="pl-11"><Answer text={answer} /></div></details>)}</div><Link href={policyHref} className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#16311c]/14 px-5 py-2.5 text-sm font-extrabold">Xem chính sách lưu trú <ArrowRight className="h-4 w-4" /></Link>
  </section>;

  return <section className="mx-auto grid w-[min(1120px,calc(100%-40px))] gap-8 sm:gap-10 py-10 sm:py-14 md:py-16 lg:grid-cols-[.55fr_1fr]">
    <aside className="h-fit lg:sticky lg:top-28">
      <p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{locale === "en" ? "Need more information?" : "Cần thêm thông tin?"}</p>
      <p className="laka-section-lead mt-3 sm:mt-4 max-w-sm">{locale === "en" ? "We are ready to listen before you decide." : "Chúng mình sẵn sàng lắng nghe trước khi bạn quyết định."}</p>
      <p className="mt-2.5 max-w-sm text-sm leading-6 text-[#16311c]/72">{locale === "en" ? "Call or message us on Zalo and the LAKA team will advise you based on your group." : "Gọi hoặc nhắn Zalo, đội ngũ LAKA sẽ tư vấn theo nhu cầu của từng đoàn."}</p>
      <a href={publicContact.phoneHref} className="mt-5 inline-flex items-center gap-2 border-b border-[#16311c] pb-1 text-sm font-bold"><Phone className="h-4 w-4" />{publicContact.phoneDisplay}</a>
    </aside>
    <div className="border-t border-[#16311c]/15">
      {localizedFaqs.map(([question, answer], index) => (
        <details id={`faq-${index + 1}`} key={question} className="group scroll-mt-28 border-b border-[#16311c]/15 py-4 sm:py-4.5">
          <summary className="flex cursor-pointer list-none items-start gap-4">
            <span className="pt-0.5 text-[.6rem] font-bold text-[#80613f]">0{index + 1}</span>
            <span className="laka-heading-card flex-1">{question}</span>
            <Plus className="mt-0.5 h-4 w-4 shrink-0 transition duration-300 group-open:rotate-45" />
          </summary>
          <div className="pl-9"><Answer text={answer} /></div>
        </details>
      ))}
      <Link href={policyHref} className="mt-6 inline-flex items-center gap-2 text-sm font-bold">{locale === "en" ? "Read stay policies" : "Đọc chính sách lưu trú"} <ArrowRight className="h-4 w-4" /></Link>
    </div>
  </section>;
}

export function TemplatePolicySection({ mood, policies, intro }: { mood: Mood; policies: readonly Policy[]; intro?: string }) {
  if (mood === "cinematic") return <section className="mx-auto w-[min(1320px,calc(100%-40px))] py-10 sm:py-14 md:py-16"><div className="grid gap-px overflow-hidden border border-white/12 bg-white/12 md:grid-cols-2">{policies.map(([title, text], index) => <article key={title} className="relative min-h-[260px] overflow-hidden bg-[#0b190f] p-6 sm:p-7"><span className="absolute -right-2 -top-8 font-serif text-[8rem] leading-none text-white/[.025]">0{index + 1}</span><ShieldCheck className="h-5 w-5 text-[#c7a882]" /><p className="mt-8 text-[.58rem] font-bold uppercase tracking-[.2em] text-[#c7a882]">House rule · 0{index + 1}</p><h2 className="mt-3 font-serif text-2xl sm:text-3xl font-medium">{title}</h2><p className="mt-3 max-w-lg text-sm leading-6 text-white/48">{text}</p></article>)}</div></section>;

  if (mood === "organic") {
    const colors = ["bg-white", "bg-[#f7cf58]", "bg-[#dce9c6]", "bg-[#f18b68]"];
    return <section className="mx-auto w-[min(1280px,calc(100%-28px))] py-10 sm:py-14 md:py-16"><div className="grid gap-3.5 md:grid-cols-2">{policies.map(([title, text], index) => <article key={title} className={`min-h-[240px] rounded-[30px] p-6 shadow-[0_14px_45px_rgba(33,72,61,.06)] ${colors[index]} ${index === 3 ? "text-[#16311c]" : "text-[#16311c]"}`}><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#16311c] text-[.62rem] font-extrabold text-white">0{index + 1}</span><ShieldCheck className="h-5 w-5" /></div><h2 className="mt-8 text-xl font-extrabold">{title}</h2><p className="mt-3 max-w-lg text-sm font-medium leading-6 opacity-80">{text}</p></article>)}</div></section>;
  }

  return <section id="chinh-sach" className="scroll-mt-24 mx-auto w-[min(900px,calc(100%-40px))] py-10 sm:py-14 md:py-16"><div className="mb-6 border-b border-[#16311c]/15 pb-6"><p className="laka-section-lead">{intro ?? "Những điều nhỏ giúp kỳ nghỉ nhẹ nhàng hơn cho tất cả mọi người."}</p></div>{policies.map(([title, text], index) => <article key={title} className="grid gap-4 border-b border-[#16311c]/15 py-5 sm:py-6 sm:grid-cols-[60px_1fr]"><span className="text-xs font-bold text-[#80613f]">0{index + 1}</span><div><h2 className="laka-heading-card">{title}</h2><p className="mt-2 text-sm leading-6 text-[#16311c]/72">{text}</p></div></article>)}</section>;
}
