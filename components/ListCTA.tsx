"use client";

import { useBusiness } from "@/context/BusinessContext";

export default function ListCTA() {
  const { openListModal } = useBusiness();

  return (
    <section id="list-business" className="py-24 bg-brand-soft dark:bg-night-bg" aria-labelledby="list-heading">
      <div className="container">
        <div className="max-w-[820px] mx-auto text-center border rounded-brand-xl px-6 py-16 shadow-card
          bg-gradient-to-br from-white to-[#f0f7f2] border-brand-line
          dark:from-night-surface dark:to-night-elevated dark:border-night-line">
          <h2 id="list-heading" className="text-[1.55rem] sm:text-[1.8rem] lg:text-[2.1rem] font-bold mb-3">
            Own a Business in Eswatini?
          </h2>
          <p className="text-[1.08rem] text-brand-muted max-w-[520px] mx-auto mb-6 dark:text-night-muted">
            Help more customers discover your business. Showcase your services and connect with your community.
          </p>
          <button className="btn btn-gold btn-lg" onClick={openListModal}>
            Add Your Business
          </button>
          <p className="text-xs text-brand-muted italic mt-4 dark:text-night-muted">
            Prototype only — no actual listing is published online.
          </p>
        </div>
      </div>
    </section>
  );
}