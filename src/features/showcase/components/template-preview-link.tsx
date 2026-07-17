"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

export function TemplatePreviewLink({ href, children }: { href: string; children: ReactNode }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => { reducedMotionRef.current = media.matches; };
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  const reset = () => {
    if (!cardRef.current) return;
    cardRef.current.style.removeProperty("transform");
    cardRef.current.style.setProperty("--preview-glow", "0");
  };

  return <Link
    ref={cardRef}
    href={href}
    onPointerMove={(event) => {
      if (event.pointerType === "touch" || reducedMotionRef.current || !cardRef.current) return;
      const bounds = cardRef.current.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const rotateX = (0.5 - y) * 4;
      const rotateY = (x - 0.5) * 5;
      cardRef.current.style.setProperty("--preview-x", `${x * 100}%`);
      cardRef.current.style.setProperty("--preview-y", `${y * 100}%`);
      cardRef.current.style.setProperty("--preview-glow", "1");
      cardRef.current.style.transform = `perspective(1000px) translateY(-7px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }}
    onPointerLeave={reset}
    onPointerCancel={reset}
    onBlur={reset}
    className="template-preview-card group focus-ring relative overflow-hidden rounded-[30px] border border-white/12 bg-white/[.055] p-3"
  >
    <span aria-hidden="true" className="template-preview-glow" />
    <div className="relative z-[1]">{children}</div>
  </Link>;
}
