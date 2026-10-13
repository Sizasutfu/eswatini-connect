"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  target: number;
  label: string;
}

interface Props {
  stats: Stat[];
}

/**
 * Animated counting numbers. Values come in from the server as plain
 * integers — this component just plays the count-up animation when the
 * section scrolls into view.
 */
export default function StatsCounter({ stats }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    // Respect reduced motion — show final values immediately
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValues(stats.map((s) => s.target));
      setHasAnimated(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setValues(stats.map((s) => s.target));
      setHasAnimated(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const start = performance.now();
          const duration = 1400;

          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValues(stats.map((s) => Math.round(s.target * eased)));
            if (p < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          setHasAnimated(true);
          obs.disconnect();
        });
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [stats, hasAnimated]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
    >
      {stats.map((s, i) => (
        <div key={s.label} className="flex flex-col gap-2">
          <span
            className="text-[1.8rem] sm:text-[2.1rem] lg:text-[2.75rem] font-bold text-brand-gold leading-none tracking-tight tabular-nums"
            aria-label={`${s.target} ${s.label}`}
          >
            {values[i]}
          </span>
          <span className="text-sm text-white/85 font-medium">{s.label}</span>
        </div>
      ))}
    </div>
  );
}