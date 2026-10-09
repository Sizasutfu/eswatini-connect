"use client";

import { useEffect, useRef } from "react";
import { useBusiness } from "@/context/BusinessContext";
import BusinessImage from "./BusinessImage";

export default function BusinessModal() {
  const { activeBusiness, closeBusiness } = useBusiness();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!activeBusiness) return;
    lastFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeBusiness(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      (lastFocused.current as HTMLElement | null)?.focus?.();
    };
  }, [activeBusiness, closeBusiness]);

  if (!activeBusiness) return null;
  const b = activeBusiness;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalBizName"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/55 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => { if (e.target === e.currentTarget) closeBusiness(); }}
    >
      <div className="relative w-full max-w-[640px] max-h-[92vh] overflow-y-auto bg-white rounded-brand-lg shadow-hero animate-slideUp">
        <button
          ref={closeRef}
          aria-label="Close details"
          onClick={closeBusiness}
          className="absolute top-3 right-3 z-10 w-10 h-10 inline-flex items-center justify-center rounded-full bg-white/90 border border-brand-line text-brand-ink hover:bg-brand-green hover:text-white transition"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-[16/8] overflow-hidden rounded-t-brand-lg bg-brand-soft">
          <BusinessImage src={b.image} alt={b.name} sizes="(max-width:560px) 100vw, 640px" className="object-cover" />
          {b.featured && <span className="absolute top-4 left-4 bg-brand-gold text-brand-ink text-xs font-bold px-3 py-1 rounded-full">Featured</span>}
        </div>

        <div className="p-6">
          <h3 id="modalBizName" className="text-[1.3rem] sm:text-[1.6rem] font-bold mb-2">{b.name}</h3>
          <p className="text-sm text-brand-muted mb-4">{b.category} · {b.location}</p>
          <p className="text-sm leading-relaxed mb-5">{b.description || b.shortDesc}</p>

          <div className="grid sm:grid-cols-3 gap-5 p-5 bg-brand-soft rounded-brand-md mb-5">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-2">Contact</h4>
              <p className="text-sm text-brand-ink">{b.phone}</p>
              <p className="text-sm text-brand-ink">{b.email}</p>
              <p className="text-sm text-brand-ink">{b.address}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-2">Operating Hours</h4>
              <p className="text-sm text-brand-ink">{b.hours}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-2">Services</h4>
              <p className="text-sm text-brand-ink">{b.services}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a className="btn btn-primary flex-1 min-w-[140px]" href={`tel:${b.phone.replace(/\s+/g, "")}`}>Call Now</a>
            <a className="btn btn-gold flex-1 min-w-[140px]"
              href={b.whatsapp ? `https://wa.me/${b.whatsapp.replace(/\D/g, "")}` : "#"}
              target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>

          <p className="text-xs text-brand-muted italic mt-4">Demo listing — contact details are fictional placeholders.</p>
        </div>
      </div>
    </div>
  );
}