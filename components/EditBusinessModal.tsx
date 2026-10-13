"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useBusiness } from "@/context/BusinessContext";
import { businessToDraft, validateBusinessDraft } from "@/lib/validateBusiness";
import type { Business, SubmissionDraft } from "@/lib/types";
import BusinessFormFields from "./BusinessFormFields";

interface Props {
  business: Business | null;
  onClose: () => void;
  onSaved?: (updated: Business) => void;
}

export default function EditBusinessModal({
  business,
  onClose,
  onSaved,
}: Props) {
  const { updateBusiness } = useBusiness();

  const [draft, setDraft] = useState<SubmissionDraft | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SubmissionDraft, boolean>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<Element | null>(null);

  // Pre-fill the form when a business is passed in
  useEffect(() => {
    if (business) {
      setDraft(businessToDraft(business));
      setErrors({});
      setErrorMessage(null);
      setSubmitting(false);
    }
  }, [business]);

  // Focus + scroll lock + Escape
  useEffect(() => {
    if (!business) return;
    lastFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      (lastFocused.current as HTMLElement | null)?.focus?.();
    };
  }, [business, submitting, onClose]);

  if (!business || !draft) return null;

  function update<K extends keyof SubmissionDraft>(
    key: K,
    value: SubmissionDraft[K]
  ) {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
    setErrors((e) => ({ ...e, [key]: false }));
    if (errorMessage) setErrorMessage(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!draft || !business) return;

    const v = validateBusinessDraft(draft);
    if (Object.keys(v).length) {
      setErrors(v);
      setErrorMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const updated = await updateBusiness(business.id, draft);
      onSaved?.(updated);
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Could not save changes. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="editModalTitle"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/55 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div className="relative w-full max-w-[720px] max-h-[92vh] overflow-y-auto rounded-brand-lg shadow-hero animate-slideUp
        bg-white dark:bg-night-surface dark:border dark:border-night-line">
        <button
          ref={closeRef}
          aria-label="Close"
          onClick={() => {
            if (!submitting) onClose();
          }}
          disabled={submitting}
          className="absolute top-3 right-3 z-10 w-10 h-10 inline-flex items-center justify-center rounded-full border transition
            bg-white/90 border-brand-line text-brand-ink
            hover:bg-brand-green hover:text-white
            disabled:opacity-40 disabled:cursor-not-allowed
            dark:bg-night-elevated/90 dark:border-night-line dark:text-night-heading
            dark:hover:bg-brand-gold dark:hover:text-night-bg"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <h3 id="editModalTitle" className="text-[1.3rem] font-bold mb-2 dark:text-night-heading">
            Edit Listing
          </h3>
          <p className="text-xs text-brand-muted italic mb-5 dark:text-night-muted">
            Updating &ldquo;{business.name}&rdquo;. Changes appear immediately
            on your public listing.
          </p>

          <form onSubmit={onSubmit} noValidate>
            <BusinessFormFields
              draft={draft}
              errors={errors}
              onUpdate={update}
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="btn btn-outline disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Saving…" : "Save Changes"}
              </button>
            </div>

            {errorMessage && (
              <p
                role="alert"
                className="mt-4 px-4 py-3 rounded-brand-sm text-sm border
                  bg-red-50 text-red-700 border-red-200
                  dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/40"
              >
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}