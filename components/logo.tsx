import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-md" aria-label="Lago Homestay - Trang chủ">
      <span className={`grid h-10 w-10 place-items-center rounded-full border ${inverse ? "border-white/40" : "border-lago-ink/25"}`}>
        <svg aria-hidden="true" viewBox="0 0 40 40" className="h-7 w-7" fill="none">
          <path d="M7 24c6-8 11-10 16-6 4 3 7 2 10-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M8 28c7-5 12-5 17-2 3 2 6 1 8-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".65"/>
          <circle cx="12" cy="11" r="2.5" fill="currentColor" opacity=".8"/>
        </svg>
      </span>
      <span><span className="display block text-[1.45rem] font-semibold leading-5">Lago</span><span className="text-[.58rem] font-semibold uppercase tracking-[.24em] opacity-70">Homestay</span></span>
    </Link>
  );
}
