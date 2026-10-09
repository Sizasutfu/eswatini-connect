"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { target: 250,  label: "Businesses Listed" },
  { target: 8,    label: "Service Categories" },
  { target: 10,   label: "Towns Covered" },
  { target: 1000, label: "Easy Connections" },
];

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [values, setValues] = useState(STATS.map(() => 0));

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      setValues(STATS.map((s) => s.target));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValues(STATS.map((s) => Math.round(s.target * eased)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      });
    }, { threshold: 0.4 });
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="Illustrative statistics" className="py-16 bg-brand-green text-white">
      <div className="container">
        <p className="text-center text-xs uppercase tracking-[0.08em] text-white/65 mb-6">
          Illustrative prototype figures — not real platform statistics.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex flex-col gap-2">
              <span className="text-[1.8rem] sm:text-[2.1rem] lg:text-[2.75rem] font-bold text-brand-gold leading-none tracking-tight">
                {values[i]}+
              </span>
              <span className="text-sm text-white/85 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}