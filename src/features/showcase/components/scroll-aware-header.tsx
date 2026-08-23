"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollAwareHeader({ children, className }: { children: React.ReactNode; className: string }) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const update = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY < 80) setHidden(false);
      else if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);

      if (Math.abs(delta) > 8) lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--laka-header-offset", hidden ? "0px" : "92px");
    return () => {
      document.documentElement.style.removeProperty("--laka-header-offset");
    };
  }, [hidden]);

  return <header
    className={`${className} transform-gpu transition-transform duration-300 ease-out motion-reduce:transition-none ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    onFocusCapture={() => setHidden(false)}
  >
    {children}
  </header>;
}
