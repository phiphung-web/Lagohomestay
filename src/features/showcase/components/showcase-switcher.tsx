import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { showcaseTemplates, type ShowcaseTemplateSlug } from "@/features/showcase/data/templates";

export function ShowcaseSwitcher({ current }: { current: ShowcaseTemplateSlug }) {
  return <aside aria-label="Chuyển nhanh giữa ba mẫu website" className="fixed bottom-4 left-1/2 z-[70] w-[calc(100%-24px)] max-w-2xl -translate-x-1/2 rounded-[22px] border border-white/20 bg-[#0b1c17]/92 p-2 text-white shadow-2xl backdrop-blur-xl sm:bottom-5 sm:flex sm:items-center sm:gap-2 sm:rounded-full" style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}>
    <Link href="/" className="focus-ring mb-2 flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-xs font-bold text-white/62 transition hover:bg-white/10 hover:text-white sm:mb-0"><ArrowLeft className="h-3.5 w-3.5" /> Chọn mẫu</Link>
    <div className="grid grid-cols-3 gap-1 sm:flex sm:flex-1">{showcaseTemplates.map((template) => <Link key={template.slug} href={`/mau/${template.slug}`} aria-current={current === template.slug ? "page" : undefined} className={`focus-ring flex min-h-10 items-center justify-center gap-1.5 rounded-full px-3 text-[.65rem] font-bold transition sm:flex-1 sm:text-xs ${current === template.slug ? "bg-white text-lago-ink" : "text-white/55 hover:bg-white/10 hover:text-white"}`}>{current === template.slug && <Check className="h-3.5 w-3.5" />} {template.number} · {template.name}</Link>)}</div>
  </aside>;
}
