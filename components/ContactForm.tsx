"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { sendMessage } from "@/lib/supabase/messages";
import Link from "next/link";

interface Props {
  businessId: string;
  businessName: string;
}

type Draft = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY: Draft = { name: "", email: "", phone: "", message: "" };

export default function ContactForm({ businessId, businessName }: Props) {
  const { user } = useAuth();
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: false }));
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function validate(d: Draft): Partial<Record<keyof Draft, boolean>> {
    const next: Partial<Record<keyof Draft, boolean>> = {};
    if (!d.name.trim()) next.name = true;
    if (!d.email.trim()) next.email = true;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim()))
      next.email = true;
    if (!d.message.trim() || d.message.trim().length < 5) next.message = true;
    return next;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;

    const v = validate(draft);
    if (Object.keys(v).length) {
      setErrors(v);
      setStatus("error");
      setStatusMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setSubmitting(true);
    try {
      await sendMessage({
        businessId,
        name: draft.name.trim(),
        email: draft.email.trim(),
        phone: draft.phone.trim(),
        body: draft.message.trim(),
      });

      const firstName = draft.name.trim().split(" ")[0];
      setDraft(EMPTY);
      setErrors({});
      setStatus("success");
      setStatusMessage(
        `Thank you, ${firstName}. Your message has been sent to ${businessName}. They may reply directly to your email.`
      );
    } catch (err) {
      console.error("Message send failed:", err);
      setStatus("error");
      setStatusMessage(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please try again."
      );
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
  const invalid =
    "!border-red-500 !ring-[3px] !ring-red-500/15 dark:!border-red-500";

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="pt-12 pb-4 border-t border-brand-line dark:border-night-line"
    >
      <div className="max-w-[720px]">
        <p className="text-xs font-semibold text-brand-green uppercase tracking-wide mb-2 dark:text-brand-gold">
          Get in touch
        </p>
        <h2
          id="contact-form-heading"
          className="text-[1.4rem] sm:text-[1.6rem] font-bold text-brand-ink mb-2 dark:text-night-heading"
        >
          Send a Message
        </h2>
        <p className="text-brand-muted text-sm mb-6 dark:text-night-muted">
          Have a question for {businessName}? Send a message below.
        </p>

        {/* ---- Signed out ---- */}
        {!user ? (
          <div className="px-4 py-5 rounded-brand-md border
            bg-brand-soft border-brand-line
            dark:bg-night-elevated dark:border-night-line">
            <p className="text-sm text-brand-body mb-4 dark:text-night-text">
              You need to be signed in to send a message. It only takes a
              moment to create an account.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/auth/sign-in?next=/business/${businessId}`}
                className="btn btn-primary flex-1"
              >
                Sign in
              </Link>
              <Link
                href={`/auth/sign-up?next=/business/${businessId}`}
                className="btn btn-outline flex-1"
              >
                Create account
              </Link>
            </div>
          </div>
        ) : (
          /* ---- Signed in ---- */
          <form onSubmit={onSubmit} noValidate>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={draft.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={`${inputCls} ${errors.name ? invalid : ""}`}
                  aria-invalid={errors.name || undefined}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  Your Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={draft.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={`${inputCls} ${errors.email ? invalid : ""}`}
                  aria-invalid={errors.email || undefined}
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="contact-phone" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  Phone Number{" "}
                  <span className="text-brand-muted dark:text-night-muted font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  value={draft.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputCls}
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="contact-message" className="text-xs font-semibold text-brand-ink dark:text-night-heading">
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={draft.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={`${inputCls} resize-y min-h-[120px] ${errors.message ? invalid : ""}`}
                  aria-invalid={errors.message || undefined}
                  placeholder="Tell them what you need…"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className="text-xs text-brand-muted dark:text-night-muted">
                * Required fields
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
                </svg>
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </div>

            {status !== "idle" && (
              <p
                role="status"
                aria-live="polite"
                className={`mt-4 px-4 py-3 rounded-brand-sm text-sm border ${
                  status === "success"
                    ? "bg-brand-greenLight text-brand-greenDark border-[#b6dcc6] dark:bg-brand-green/15 dark:text-brand-gold dark:border-brand-green/40"
                    : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/40"
                }`}
              >
                {statusMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}