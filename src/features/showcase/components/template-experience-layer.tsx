"use client";

import { useEffect, useRef } from "react";
import type { TemplateMood } from "@/features/showcase/site/complete-template-site";

export function TemplateExperienceLayer({ mood }: { mood: TemplateMood }) {
  const progressRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scrollFrame = 0;
    let pointerFrame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      });
    };

    const updateGlow = (event: PointerEvent) => {
      if (reducedMotion || event.pointerType === "touch" || !glowRef.current) return;
      const x = event.clientX;
      const y = event.clientY;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        if (!glowRef.current) return;
        glowRef.current.style.transform = `translate3d(${x - 210}px, ${y - 210}px, 0)`;
        glowRef.current.style.opacity = "1";
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    window.addEventListener("pointermove", updateGlow, { passive: true });
    return () => {
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("pointermove", updateGlow);
    };
  }, []);

  return <div aria-hidden="true" className={`template-atmosphere template-atmosphere-${mood}`}>
    <span ref={progressRef} className="template-scroll-progress" />
    <span ref={glowRef} className="template-pointer-glow" />
  </div>;
}
