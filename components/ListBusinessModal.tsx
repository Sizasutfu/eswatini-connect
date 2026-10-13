"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBusiness } from "@/context/BusinessContext";
import { useAuth } from "@/context/AuthContext";
import { slugify } from "@/lib/slugify";
import { EMPTY_DRAFT, validateBusinessDraft } from "@/lib/validateBusiness";
import type { SubmissionDraft } from "@/lib/types";
import BusinessFormFields from "./BusinessFormFields";

export default function ListBusinessModal() {
  const router = useRouter();
  const { user } = useAuth();
  const { isListModalOpen, closeListModal, addSubmission } = useBusiness();

  const [draft, setDraft] = useState<SubmissionDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SubmissionDraft, boolean>>
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
      setDraft(EMPTY_DRAFT);
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

  function update<K extends keyof SubmissionDraft>(
    key: K,
    value: SubmissionDraft[K]
  ) {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: false }));
    if (message) setMessage(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);

    const v = validateBusinessDraft(draft);
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
      setMessage({
        kind: "error",
        text:
          err instanceof Error
            ? err.message
            : "Could not save your listing. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

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
            <>
              <p className="text-xs text-brand-muted italic mb-5 dark:text-night-muted">
                Submissions are saved to your account and appear in your
                &ldquo;My Businesses&rdquo; list.
              </p>

              <form onSubmit={onSubmit} noValidate>
                <BusinessFormFields
                  draft={draft}
                  errors={errors}
                  onUpdate={update}
                />

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