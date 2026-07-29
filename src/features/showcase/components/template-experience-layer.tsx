"use client";

import { useEffect, useRef } from "react";
import type { TemplateMood } from "@/features/showcase/site/complete-template-site";

export function TemplateExperienceLayer({ mood }: { mood: TemplateMood }) {
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let scrollFrame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return <div aria-hidden="true" className={`template-atmosphere template-atmosphere-${mood}`}>
    <span ref={progressRef} className="template-scroll-progress" />
  </div>;
}
