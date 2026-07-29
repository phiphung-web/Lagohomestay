import Link from "next/link";
import { ArrowRight, Phone, Plus, ShieldCheck } from "lucide-react";
import { showcaseFaqs } from "@/features/showcase/data/showcase-content";
import type { ShowcaseLocale } from "@/features/showcase/i18n/locale";
import { englishFaqs } from "@/features/showcase/i18n/showcase-copy";

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
  return <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-open:grid-rows-[1fr]"><div className="overflow-hidden"><p className="max-w-2xl pb-1 pt-4 text-sm leading-7 opacity-80">{text}</p></div></div>;
}

export function TemplateFaqIndex({ locale = "vi" }: { locale?: ShowcaseLocale }) {
  return (
    <nav aria-label={locale === "en" ? "FAQ topics" : "Chủ đề câu hỏi"} className="border-y border-[#16311c]/12 bg-[#e3d8c9] py-16 sm:py-24">
      <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
        <div className="grid gap-6 lg:grid-cols-[.42fr_1fr] lg:items-end">
          <div>
            <p className="text-[.62rem] font-bold uppercase tracking-[.2em] text-[#80613f]">{locale === "en" ? "Find an answer quickly" : "Tìm câu trả lời nhanh"}</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#16311c]/62">{locale === "en" ? "Choose a topic to jump to the relevant part, then open only the answer you need." : "Chọn một chủ đề để đi đúng phần, sau đó chỉ mở câu trả lời bạn thực sự cần."}</p>
          </div>
          <h2 className="font-serif text-5xl font-medium leading-[.95] tracking-[-.05em] sm:text-7xl">{locale === "en" ? "Everything useful, grouped clearly." : "Mọi điều cần biết, được nhóm thật rõ."}</h2>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {faqCategories[locale].map(([label, target], index) => (
            <a key={label} href={`#faq-${target}`} className="focus-ring group flex min-h-32 items-end justify-between border border-[#80613f]/45 bg-[#eae1d2] p-5 transition hover:-translate-y-1 hover:bg-[#f2ece2]">
              <span>
                <span className="block text-[.58rem] font-bold tracking-[.16em] text-[#80613f]">0{index + 1}</span>
                <span className="mt-5 block font-serif text-2xl font-medium">{label}</span>
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
  if (mood === "cinematic") return <section className="mx-auto grid w-[min(1380px,calc(100%-40px))] gap-12 py-20 sm:py-28 lg:grid-cols-[.38fr_1fr]">
    <aside className="h-fit border-l border-[#c7a882]/35 pl-6 lg:sticky lg:top-28"><p className="text-[.62rem] font-bold uppercase tracking-[.22em] text-[#c7a882]">Hỗ trợ trực tiếp</p><p className="mt-6 max-w-xs font-serif text-3xl font-medium leading-tight">Một cuộc trò chuyện ngắn có thể giúp bạn chọn đúng căn.</p><a href="tel:0900000000" className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-[#c7a882]"><Phone className="h-4 w-4" />0900 000 000</a></aside>
    <div className="border-t border-white/12">{showcaseFaqs.map(([question, answer], index) => <details id={`faq-${index + 1}`} key={question} className="group scroll-mt-28 border-b border-white/12 py-7"><summary className="flex cursor-pointer list-none items-start gap-5"><span className="pt-1 text-[.62rem] font-bold text-[#c7a882]">0{index + 1}</span><span className="flex-1 font-serif text-2xl font-medium leading-tight sm:text-3xl">{question}</span><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 transition duration-300 group-open:rotate-45 group-open:border-[#c7a882] group-open:text-[#c7a882]"><Plus className="h-4 w-4" /></span></summary><div className="pl-11 text-white/72"><Answer text={answer} /></div></details>)}<Link href={policyHref} className="mt-9 inline-flex items-center gap-3 text-sm font-bold text-[#c7a882]">Đọc toàn bộ chính sách <ArrowRight className="h-4 w-4" /></Link></div>
  </section>;

  if (mood === "organic") return <section className="mx-auto w-[min(1280px,calc(100%-28px))] py-20 sm:py-28">
    <div className="mb-9 flex flex-col gap-6 rounded-[34px] bg-[#16311c] p-7 text-white sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[.6rem] font-extrabold uppercase tracking-[.14em] text-[#f7cf58]">Bạn cứ hỏi nhé</p><p className="mt-3 text-2xl font-extrabold">LAKA trả lời rõ trước khi bạn lên đường.</p></div><a href="tel:0900000000" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f7cf58] px-6 text-sm font-extrabold text-[#16311c]"><Phone className="h-4 w-4" />Gọi LAKA</a></div>
    <div className="grid gap-4 md:grid-cols-2">{showcaseFaqs.map(([question, answer], index) => <details id={`faq-${index + 1}`} key={question} className={`group h-fit scroll-mt-28 rounded-[30px] p-6 shadow-[0_16px_45px_rgba(33,72,61,.07)] ${index === 1 ? "bg-[#f7cf58]" : index === 2 ? "bg-[#dce9c6]" : "bg-white"}`}><summary className="flex cursor-pointer list-none items-start gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#16311c] text-[.62rem] font-extrabold text-white">0{index + 1}</span><span className="flex-1 text-lg font-extrabold leading-snug">{question}</span><Plus className="mt-2 h-5 w-5 shrink-0 transition duration-300 group-open:rotate-45" /></summary><div className="pl-[52px]"><Answer text={answer} /></div></details>)}</div><Link href={policyHref} className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[#16311c]/14 px-6 py-3 text-sm font-extrabold">Xem chính sách lưu trú <ArrowRight className="h-4 w-4" /></Link>
  </section>;

  return <section className="mx-auto grid w-[min(1120px,calc(100%-40px))] gap-12 py-20 sm:py-28 lg:grid-cols-[.55fr_1fr]">
    <aside className="h-fit lg:sticky lg:top-28"><p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#80613f]">{locale === "en" ? "Need more information?" : "Cần thêm thông tin?"}</p><p className="mt-6 max-w-sm font-serif text-3xl font-medium leading-tight">{locale === "en" ? "We are ready to listen before you decide." : "Chúng mình sẵn sàng lắng nghe trước khi bạn quyết định."}</p><p className="mt-4 max-w-sm text-sm leading-7 text-[#16311c]/72">{locale === "en" ? "Call or message us on Zalo and the LAKA team will advise you based on your group." : "Gọi hoặc nhắn Zalo, đội ngũ LAKA sẽ tư vấn theo nhu cầu của từng đoàn."}</p><a href="tel:0900000000" className="mt-7 inline-flex items-center gap-2 border-b border-[#16311c] pb-1 text-sm font-bold"><Phone className="h-4 w-4" />0900 000 000</a></aside>
    <div className="border-t border-[#16311c]/15">{localizedFaqs.map(([question, answer], index) => <details id={`faq-${index + 1}`} key={question} className="group scroll-mt-28 border-b border-[#16311c]/15 py-7"><summary className="flex cursor-pointer list-none items-start gap-5"><span className="pt-1 text-[.6rem] font-bold text-[#80613f]">0{index + 1}</span><span className="flex-1 font-serif text-2xl font-medium leading-tight">{question}</span><Plus className="mt-1 h-5 w-5 shrink-0 transition duration-300 group-open:rotate-45" /></summary><div className="pl-10"><Answer text={answer} /></div></details>)}<Link href={policyHref} className="mt-8 inline-flex items-center gap-2 text-sm font-bold">{locale === "en" ? "Read stay policies" : "Đọc chính sách lưu trú"} <ArrowRight className="h-4 w-4" /></Link></div>
  </section>;
}

export function TemplatePolicySection({ mood, policies, intro }: { mood: Mood; policies: readonly Policy[]; intro?: string }) {
  if (mood === "cinematic") return <section className="mx-auto w-[min(1320px,calc(100%-40px))] py-20 sm:py-28"><div className="grid gap-px overflow-hidden border border-white/12 bg-white/12 md:grid-cols-2">{policies.map(([title, text], index) => <article key={title} className="relative min-h-[300px] overflow-hidden bg-[#0b190f] p-8"><span className="absolute -right-2 -top-8 font-serif text-[9rem] leading-none text-white/[.025]">0{index + 1}</span><ShieldCheck className="h-6 w-6 text-[#c7a882]" /><p className="mt-12 text-[.58rem] font-bold uppercase tracking-[.2em] text-[#c7a882]">House rule · 0{index + 1}</p><h2 className="mt-4 font-serif text-3xl font-medium">{title}</h2><p className="mt-5 max-w-lg text-sm leading-7 text-white/48">{text}</p></article>)}</div></section>;

  if (mood === "organic") {
    const colors = ["bg-white", "bg-[#f7cf58]", "bg-[#dce9c6]", "bg-[#f18b68]"];
    return <section className="mx-auto w-[min(1280px,calc(100%-28px))] py-20 sm:py-28"><div className="grid gap-4 md:grid-cols-2">{policies.map(([title, text], index) => <article key={title} className={`min-h-[280px] rounded-[36px] p-7 shadow-[0_18px_55px_rgba(33,72,61,.08)] ${colors[index]} ${index === 3 ? "text-[#16311c]" : "text-[#16311c]"}`}><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#16311c] text-[.62rem] font-extrabold text-white">0{index + 1}</span><ShieldCheck className="h-6 w-6" /></div><h2 className="mt-12 text-2xl font-extrabold">{title}</h2><p className="mt-4 max-w-lg text-sm font-medium leading-7 opacity-80">{text}</p></article>)}</div></section>;
  }

  return <section className="mx-auto w-[min(900px,calc(100%-40px))] py-20 sm:py-28"><div className="mb-8 border-b border-[#16311c]/15 pb-8"><p className="font-serif text-3xl font-medium">{intro ?? "Những điều nhỏ giúp kỳ nghỉ nhẹ nhàng hơn cho tất cả mọi người."}</p></div>{policies.map(([title, text], index) => <article key={title} className="grid gap-5 border-b border-[#16311c]/15 py-9 sm:grid-cols-[70px_1fr]"><span className="text-xs font-bold text-[#80613f]">0{index + 1}</span><div><h2 className="font-serif text-3xl font-medium">{title}</h2><p className="mt-4 text-sm leading-7 text-[#16311c]/72">{text}</p></div></article>)}</section>;
}
