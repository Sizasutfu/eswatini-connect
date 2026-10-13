"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBusiness } from "@/context/BusinessContext";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES, TOWNS } from "@/lib/data";
import { slugify } from "@/lib/slugify";

type Draft = {
  name: string;
  category: string;
  location: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  services: string;
  image: string;
};

const EMPTY: Draft = {
  name: "",
  category: "",
  location: "",
  description: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  hours: "",
  services: "",
  image: "",
};

export default function ListBusinessModal() {
  const router = useRouter();
  const { user } = useAuth();
  const { isListModalOpen, closeListModal, addSubmission } = useBusiness();

  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<
    Partial<Record<keyof Draft, boolean>>
  >({});
  const [message, setMessage] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (isListModalOpen) {
      setDraft(EMPTY);
      setErrors({});
      setMessage(null);
      setSubmitting(false);
    }
  }, [isListModalOpen]);

  useEffect(() => {
    if (!isListModalOpen) return;
    lastFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeListModal();
    };
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
    if (message) setMessage(null);
  }

  function validate(d: Draft): Partial<Record<keyof Draft, boolean>> {
    const next: Partial<Record<keyof Draft, boolean>> = {};
    const required: (keyof Draft)[] = [
      "name",
      "category",
      "location",
      "description",
      "phone",
      "email",
    ];
    for (const k of required) if (!d[k].trim()) next[k] = true;
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) {
      next.email = true;
    }
    return next;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);

    const v = validate(draft);
    if (Object.keys(v).length) {
      setErrors(v);
      setMessage({
        kind: "error",
        text: "Please correct the highlighted fields and try again.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await addSubmission(draft);
      const newSlug = slugify(draft.name);
      setMessage({
        kind: "success",
        text: "Your listing has been saved. Redirecting…",
      });
      setTimeout(() => {
        closeListModal();
        router.push(`/business/${newSlug}`);
      }, 1200);
    } catch (err) {
      console.error("Submission error:", err);
      const text =
        err instanceof Error
          ? err.message
          : "Could not save your listing. Please try again.";
      setMessage({ kind: "error", text });
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full px-3.5 py-2.5 border rounded-brand-sm text-sm outline-none transition " +
    "border-brand-line bg-white text-brand-ink " +
    "focus:border-brand-green focus:ring-[3px] focus:ring-brand-green/10 " +
    "dark:border-night-line dark:bg-night-elevated dark:text-night-heading " +
    "dark:focus:border-brand-gold dark:focus:ring-brand-gold/15";
  const invalid = "!border-red-500 !ring-[3px] !ring-red-500/15";
  const help = "text-[11px] text-brand-muted mt-0.5 dark:text-night-muted";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="listModalTitle"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/55 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeListModal();
      }}
    >
      <div
        className="relative w-full max-w-[720px] max-h-[92vh] overflow-y-auto rounded-brand-lg shadow-hero animate-slideUp
          bg-white dark:bg-night-surface dark:border dark:border-night-line"
      >
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
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <h3
            id="listModalTitle"
            className="text-[1.3rem] font-bold mb-2 dark:text-night-heading"
          >
            Add Your Business
          </h3>

          {/* ============ SIGNED OUT ============ */}
          {!user ? (
            <div className="mt-4">
              <p className="text-sm text-brand-muted mb-6 dark:text-night-muted">
                You need to be signed in to submit a business. It only takes a
                moment to create an account.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/auth/sign-in?next=/"
                  className="btn btn-primary flex-1"
                  onClick={closeListModal}
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/sign-up?next=/"
                  className="btn btn-outline flex-1"
                  onClick={closeListModal}
                >
                  Create account
                </Link>
              </div>
              <p className="text-xs text-brand-muted italic mt-6 dark:text-night-muted">
                Demo prototype — no real listing is published without sign-in.
              </p>
            </div>
          ) : (
            /* ============ SIGNED IN ============ */
            <>
              <p className="text-xs text-brand-muted italic mb-5 dark:text-night-muted">
                Submissions are saved to your account and appear in your
                &ldquo;My Businesses&rdquo; list.
              </p>

              <form onSubmit={onSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  {/* Business Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="bizName"
                      className="text-xs font-semibold text-brand-ink dark:text-night-heading"
                    >
                      Business Name *
                    </label>
                    <input
                      id="bizName"
                      type="text"
                      value={draft.name}
                      className={`${inputCls} ${errors.name ? invalid : ""}`}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </div>

                  {/* Category */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="bizCategory"
                      className="text-xs font-semibold text-brand-ink dark:text-night-heading"
                    >
                      Category *
                    </label>
                    <select
                      id="bizCategory"
                      value={draft.category}
                      className={`${inputCls} ${errors.category ? invalid : ""}`}
                      onChange={(e) => update("category", e.target.value)}
                    >
                      <option value="">Select category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Town */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="bizTown"
                      className="text-xs font-semibold text-brand-ink dark:text-night-heading"
                    >
                      Town *
                    </label>
                    <select
                      id="bizTown"
                      value={draft.location}
                      className={`${inputCls} ${errors.location ? invalid : ""}`}
                      onChange={(e) => update("location", e.target.value)}
                    >
                      <option value="">Select town</option>
                      {TOWNS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="bizHours"
                      className="text-xs font-semibold text-brand-ink dark:text-night-heading"
                    >
                      Operating Hours
                    </label>
                    <input
                      id="bizHours"
                      type="text"
                      placeholder="Mon–Sat · 8:00 – 17:00"
                      value={draft.hours}
                      className={inputCls}
                      onChange={(e) => update("hours", e.target.value)}
                    />
                    <span className={help}>
                      Leave blank for &ldquo;Contact business for hours&rdquo;
                    </span>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      htmlFor="bizDescription"
                      className="text-xs font-semibold text-brand-ink dark:text-night-heading"
                    >
                      Business Description *
                    </label>
                    <textarea
                      id="bizDescription"
                      rows={3}
                      value={draft.description}
                      className={`${inputCls} resize-y min-h-[90px] ${
                        errors.description ? invalid : ""
                      }`}
                      onChange={(e) => update("description", e.target.value)}
                    />
                  </div>

                  {/* Services */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      htmlFor="bizServices"
                      className="text-xs font-semibold text-brand-ink dark:text-night-heading"
                    >
                      Services Offered
                    </label>
                    <input
                      id="bizServices"
                      type="text"
                      placeholder="Screen repair, Battery replacement, Water damage"
                      value={draft.services}
                      className={inputCls}
                      onChange={(e) => update("services", e.target.value)}
                    />
                    <span className={help}>
                      Separate multiple services with commas — they&apos;ll
                      appear as chips on your page
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="bizPhone"
                      className="text-xs font-semibold text-brand-ink dark:text-night-heading"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="bizPhone"
                      type="tel"
                      value={draft.phone}
                      className={`${inputCls} ${errors.phone ? invalid : ""}`}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="bizWhatsapp"
                      className="text-xs font-semibold text-brand-ink dark:text-night-heading"
                    >
                      WhatsApp Number
                    </label>
                    <input
                      id="bizWhatsapp"
                      type="tel"
                      value={draft.whatsapp}
                      className={inputCls}
                      onChange={(e) => update("whatsapp", e.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="bizEmail"
                      className="text-xs font-semibold text-brand-ink dark:text-night-heading"
                    >
                      Email Address *
                    </label>
                    <input
                      id="bizEmail"
                      type="email"
                      value={draft.email}
                      className={`${inputCls} ${errors.email ? invalid : ""}`}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="bizAddress"
                      className="text-xs font-semibold text-brand-ink dark:text-night-heading"
                    >
                      Physical Address
                    </label>
                    <input
                      id="bizAddress"
                      type="text"
                      value={draft.address}
                      className={inputCls}
                      onChange={(e) => update("address", e.target.value)}
                    />
                  </div>

                  {/* Image URL */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      htmlFor="bizImage"
                      className="text-xs font-semibold text-brand-ink dark:text-night-heading"
                    >
                      Cover Image URL
                    </label>
                    <input
                      id="bizImage"
                      type="url"
                      placeholder="https://…"
                      value={draft.image}
                      className={inputCls}
                      onChange={(e) => update("image", e.target.value)}
                    />
                    <span className={help}>
                      Paste a link to a photo of your business — any image URL
                      works. Leave blank for a default placeholder.
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting…" : "Submit Listing"}
                  </button>
                </div>

                {message && (
                  <p
                    role="status"
                    className={`mt-4 px-4 py-3 rounded-brand-sm text-sm border ${
                      message.kind === "success"
                        ? "bg-brand-greenLight text-brand-greenDark border-[#b6dcc6] dark:bg-brand-green/15 dark:text-brand-gold dark:border-brand-green/40"
                        : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/40"
                    }`}
                  >
                    {message.text}
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}