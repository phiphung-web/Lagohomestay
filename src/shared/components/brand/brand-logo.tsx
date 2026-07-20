import type { CSSProperties } from "react";

type BrandLogoVariant = "wordmark" | "homestay" | "established" | "icon";

const assets: Record<BrandLogoVariant, { src: string; aspectRatio: string; label: string }> = {
  wordmark: { src: "/brand/laka-wordmark.png", aspectRatio: "2765 / 583", label: "LAKA" },
  homestay: { src: "/brand/laka-homestay.png", aspectRatio: "2776 / 886", label: "LAKA Homestay" },
  established: { src: "/brand/laka-homestay-est-2026.png", aspectRatio: "2776 / 1169", label: "LAKA Homestay, thành lập năm 2026" },
  icon: { src: "/brand/laka-icon.png", aspectRatio: "1 / 1", label: "Biểu tượng LAKA" }
};

export function BrandLogo({ variant = "wordmark", className = "", decorative = false }: { variant?: BrandLogoVariant; className?: string; decorative?: boolean }) {
  const asset = assets[variant];
  const style = {
    aspectRatio: asset.aspectRatio,
    WebkitMaskImage: `url("${asset.src}")`,
    maskImage: `url("${asset.src}")`
  } as CSSProperties;

  return <span
    role={decorative ? undefined : "img"}
    aria-hidden={decorative || undefined}
    aria-label={decorative ? undefined : asset.label}
    className={`brand-logo inline-block shrink-0 bg-current ${className}`}
    style={style}
  />;
}
