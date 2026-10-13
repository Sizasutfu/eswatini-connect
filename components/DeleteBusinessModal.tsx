"use client";

import { useEffect, useRef, useState } from "react";
import { useBusiness } from "@/context/BusinessContext";
import type { Business } from "@/lib/types";

interface Props {
  business: Business | null;
  onClose: () => void;
  onDeleted?: (id: string) => void;
}

export default function DeleteBusinessModal({
  business,
  onClose,
  onDeleted,
}: Props) {
  const { deleteBusiness } = useBusiness();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cancelRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!business) return;
    lastFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();
    setSubmitting(false);
    setErrorMessage(null);

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

  if (!business) return null;

  async function onConfirm() {
    if (!business) return;
    setSubmitting(true);
    try {
      await deleteBusiness(business.id);
      onDeleted?.(business.id);
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Could not delete this listing. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="deleteModalTitle"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/55 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div className="relative w-full max-w-[440px] rounded-brand-lg shadow-hero animate-slideUp
        bg-white dark:bg-night-surface dark:border dark:border-night-line p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/25 flex items-center justify-center mb-4">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-600 dark:text-red-400"
              aria-hidden="true"
            >
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
            </svg>
          </div>

          <h3 id="deleteModalTitle" className="text-[1.2rem] font-bold text-brand-ink mb-2 dark:text-night-heading">
            Delete this listing?
          </h3>
          <p className="text-sm text-brand-muted mb-6 dark:text-night-muted">
            &ldquo;{business.name}&rdquo; will be permanently removed from
            Eswatini Connect. This cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="btn btn-outline flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={submitting}
            className="btn flex-1 disabled:opacity-60 disabled:cursor-not-allowed
              bg-red-600 text-white hover:bg-red-700"
          >
            {submitting ? "Deleting…" : "Delete"}
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
      </div>
    </div>
  );
}