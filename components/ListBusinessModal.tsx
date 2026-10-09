"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import { CATEGORIES, TOWNS } from "@/lib/data";
import { slugify } from "@/lib/slugify";

type Draft = {
  name: string; category: string; location: string; description: string;
  phone: string; whatsapp: string; email: string; address: string;
};

const EMPTY: Draft = {
  name: "", category: "", location: "", description: "",
  phone: "", whatsapp: "", email: "", address: "",
};

export default function ListBusinessModal() {
  const router = useRouter();
  const { isListModalOpen, closeListModal, addSubmission } = useBusiness();
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, boolean>>>({});
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (isListModalOpen) { setDraft(EMPTY); setErrors({}); setMessage(null); }
  }, [isListModalOpen]);

  useEffect(() => {
    if (!isListModalOpen) return;
    lastFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeListModal(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      (lastFocused.current as HTMLElement | null)?.focus?.();
    };
  }, [isListModalOpen, closeListModal]);

  if (!isListModalOpen) return null;

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: false }));
  }

  function validate(d: Draft) {
    const next: Partial<Record<keyof Draft, boolean>> = {};
    const req: (keyof Draft)[] = ["name", "category", "location", "description", "phone", "email"];
    for (const k of req) if (!d[k].trim()) next[k] = true;
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) next.email = true;
    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = validate(draft);
    if (Object.keys(v).length) {
      setErrors(v);
      setMessage({ kind: "error", text: "Please correct the highlighted fields and try again." });
      return;
    }
    addSubmission(draft);
    const newSlug = slugify(draft.name);
    setMessage({
      kind: "success",
      text: "Thank you! Your demonstration listing has been saved locally. Redirecting to its page…",
    });
    setTimeout(() => {
      closeListModal();
      router.push(`/business/${newSlug}`);
    }, 1400);
  }

  const inputCls =
    "w-full px-3.5 py-2.5 border rounded-brand-sm text-sm outline-none transition " +
    "border-brand-line bg-white text-brand-ink " +
    "focus:border-brand-green focus:ring-[3px] focus:ring-brand-green/10 " +
    "dark:border-night-line dark:bg-night-elevated dark:text-night-heading " +
    "dark:focus:border-brand-gold dark:focus:ring-brand-gold/15";
  const invalid = "!border-red-500 !ring-[3px] !ring-red-500/15";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="listModalTitle"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/55 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => { if (e.target === e.currentTarget) closeListModal(); }}
    >
      <div className="relative w-full max-w-[720px] max-h-[92vh] overflow-y-auto rounded-brand-lg shadow-hero animate-slideUp
        bg-white dark:bg-night-surface dark:border dark:border-night-line">
        <button
          ref={closeRef}
          aria-label="Close form"
          onClick={closeListModal}
          className="absolute top-3 right-3 z-10 w-10 h-10 inline-flex items-center justify-center rounded-full border transition
            bg-white/90 border-brand-line text-brand-ink
            hover:bg-brand-green hover:text-white
            dark:bg-night-elevated/90 dark:border-night-line dark:text-night-heading
            dark:hover:bg-brand-gold dark:hover:text-night-bg"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <h3 id="listModalTitle" className="text-[1.3rem] font-bold mb-2 dark:text-night-heading">
            Add Your Business
          </h3>
          <p className="text-xs text-brand-muted italic mb-5 dark:text-night-muted">
            Prototype form — submissions are stored locally in your browser only.
          </p>

          <form onSubmit={onSubmit} noValidate>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bizName" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  Business Name *
                </label>
                <input id="bizName" type="text" value={draft.name}
                  className={`${inputCls} ${errors.name ? invalid : ""}`}
                  onChange={(e) => update("name", e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bizCategory" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  Category *
                </label>
                <select id="bizCategory" value={draft.category}
                  className={`${inputCls} ${errors.category ? invalid : ""}`}
                  onChange={(e) => update("category", e.target.value)}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bizTown" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  Town *
                </label>
                <select id="bizTown" value={draft.location}
                  className={`${inputCls} ${errors.location ? invalid : ""}`}
                  onChange={(e) => update("location", e.target.value)}>
                  <option value="">Select town</option>
                  {TOWNS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="bizDescription" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  Business Description *
                </label>
                <textarea id="bizDescription" rows={3} value={draft.description}
                  className={`${inputCls} resize-y min-h-[90px] ${errors.description ? invalid : ""}`}
                  onChange={(e) => update("description", e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bizPhone" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  Phone Number *
                </label>
                <input id="bizPhone" type="tel" value={draft.phone}
                  className={`${inputCls} ${errors.phone ? invalid : ""}`}
                  onChange={(e) => update("phone", e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bizWhatsapp" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  WhatsApp Number
                </label>
                <input id="bizWhatsapp" type="tel" value={draft.whatsapp}
                  className={inputCls}
                  onChange={(e) => update("whatsapp", e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bizEmail" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  Email Address *
                </label>
                <input id="bizEmail" type="email" value={draft.email}
                  className={`${inputCls} ${errors.email ? invalid : ""}`}
                  onChange={(e) => update("email", e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="bizAddress" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  Physical Address
                </label>
                <input id="bizAddress" type="text" value={draft.address}
                  className={inputCls}
                  onChange={(e) => update("address", e.target.value)} />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">Submit Listing</button>
            </div>

            {message && (
              <p role="status"
                className={`mt-4 px-4 py-3 rounded-brand-sm text-sm border ${
                  message.kind === "success"
                    ? "bg-brand-greenLight text-brand-greenDark border-[#b6dcc6] dark:bg-brand-green/15 dark:text-brand-gold dark:border-brand-green/40"
                    : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/40"
                }`}>
                {message.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}