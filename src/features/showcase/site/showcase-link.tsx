"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

const scopedRoots = [
  "/luu-tru",
  "/trai-nghiem",
  "/thu-vien",
  "/ve-lago",
  "/thong-tin",
  "/chinh-sach",
  "/lien-he",
  "/dat-phong",
  "/tra-cuu"
];

export function ShowcaseLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const pathname = usePathname();
  const match = pathname.match(/^\/mau\/(tinh-lang|dien-anh|song-dong)(?:\/|$)/);
  const shouldScope = typeof href === "string" && scopedRoots.some((root) => href === root || href.startsWith(`${root}/`));
  const scopedHref = shouldScope && match ? `/mau/${match[1]}${href}` : href;
  return <NextLink href={scopedHref} {...props} />;
}
