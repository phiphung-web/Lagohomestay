"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteMood } from "@/features/showcase/site/site-types";

export function NavLink({
  href,
  label,
  mood,
  exact = false,
}: {
  href: string;
  label: string;
  mood: SiteMood;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href || (!exact && pathname.startsWith(`${href}/`));
  const accent =
    mood === "cinematic" ? "bg-[#c7a882]" : mood === "organic" ? "bg-[#f18b68]" : "bg-[#80613f]";
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`focus-ring group relative py-3 transition ${active ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
    >
      {label}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-1 h-px origin-left transition-transform duration-300 ${accent} ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
      />
    </Link>
  );
}
