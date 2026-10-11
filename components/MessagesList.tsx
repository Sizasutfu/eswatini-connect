"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Business } from "@/lib/types";

interface StoredMessage {
  businessSlug: string;
  businessName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}

const LS_MESSAGES_KEY = "eswatini_connect_messages_v1";

type State =
  | { status: "loading" }
  | { status: "loaded"; messages: StoredMessage[] };

export default function MessagesList() {
  const [state, setState] = useState<State>({ status: "loading" });

  const read = () => {
    try {
      const raw = localStorage.getItem(LS_MESSAGES_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const safe = Array.isArray(parsed)
        ? parsed.filter(
            (m) =>
              m &&
              typeof m === "object" &&
              typeof m.businessSlug === "string" &&
              typeof m.message === "string"
          )
        : [];
      setState({ status: "loaded", messages: safe });
    } catch {
      setState({ status: "loaded", messages: [] });
    }
  };

  useEffect(() => {
    read();
  }, []);

  const deleteOne = (index: number) => {
    setState((prev) => {
      if (prev.status !== "loaded") return prev;
      const next = prev.messages.filter((_, i) => i !== index);
      try {
        localStorage.setItem(LS_MESSAGES_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return { status: "loaded", messages: next };
    });
  };

  const clearAll = () => {
    if (!confirm("Delete all saved messages? This can't be undone.")) return;
    try {
      localStorage.removeItem(LS_MESSAGES_KEY);
    } catch {
      /* ignore */
    }
    setState({ status: "loaded", messages: [] });
  };

  if (state.status === "loading") {
    return (
      <div className="py-16 text-center text-brand-muted dark:text-night-muted">
        Loading your messages…
      </div>
    );
  }

  const messages = state.messages;

  if (messages.length === 0) {
    return (
      <div
        className="text-center px-5 py-16 bg-white border border-dashed rounded-brand-lg
          border-brand-line dark:bg-night-surface dark:border-night-line"
      >
        <svg
          className="mx-auto mb-4 text-brand-muted dark:text-night-muted"
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 6 10 7L22 6" />
        </svg>
        <h2 className="text-[1.4rem] font-semibold mb-2 dark:text-night-heading">
          No messages yet.
        </h2>
        <p className="text-brand-muted mb-6 dark:text-night-muted">
          When you send a message from a business page, it will show up here.
        </p>
        <Link href="/explore" className="btn btn-primary">
          Explore Businesses
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="text-sm text-brand-muted font-medium dark:text-night-muted">
          You have{" "}
          <strong className="text-brand-ink dark:text-night-heading">
            {messages.length}
          </strong>{" "}
          saved message{messages.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={clearAll}
          className="text-sm font-medium text-brand-muted hover:text-red-600 transition-colors
            dark:text-night-muted dark:hover:text-red-400"
        >
          Delete all
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {messages.map((m, i) => (
          <li
            key={`${m.businessSlug}-${m.timestamp}-${i}`}
            className="bg-white border border-brand-line rounded-brand-lg p-5 shadow-soft
              dark:bg-night-surface dark:border-night-line dark:shadow-card"
          >
            {/* Top row: business link + delete */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="min-w-0">
                <p className="text-xs text-brand-muted dark:text-night-muted mb-1">
                  To
                </p>
                <Link
                  href={`/business/${m.businessSlug}`}
                  className="text-sm font-semibold text-brand-green hover:text-brand-greenDark transition-colors
                    dark:text-brand-gold dark:hover:brightness-110 inline-flex items-center gap-1.5"
                >
                  {m.businessName || m.businessSlug}
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <button
                type="button"
                onClick={() => deleteOne(i)}
                aria-label={`Delete message to ${m.businessName}`}
                className="shrink-0 w-8 h-8 inline-flex items-center justify-center rounded-full
                  text-brand-muted hover:text-red-600 hover:bg-red-50 transition
                  dark:text-night-muted dark:hover:text-red-400 dark:hover:bg-red-900/20"
              >
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"
                >
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
                </svg>
              </button>
            </div>

            {/* Sender info */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-muted mb-3 dark:text-night-muted">
              <span>
                <strong className="text-brand-ink dark:text-night-heading">
                  {m.name}
                </strong>
              </span>
              <span className="truncate">
                <a
                  href={`mailto:${m.email}`}
                  className="hover:text-brand-green dark:hover:text-brand-gold transition-colors"
                >
                  {m.email}
                </a>
              </span>
              {m.phone && (
                <span>
                  <a
                    href={`tel:${m.phone.replace(/\s+/g, "")}`}
                    className="hover:text-brand-green dark:hover:text-brand-gold transition-colors"
                  >
                    {m.phone}
                  </a>
                </span>
              )}
            </div>

            {/* Message body */}
            <p className="text-sm text-brand-body leading-relaxed whitespace-pre-wrap mb-3 dark:text-night-text">
              {m.message}
            </p>

            {/* Timestamp */}
            <p className="text-xs text-brand-muted dark:text-night-muted">
              {formatTimestamp(m.timestamp)}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Format an ISO string as "9 Oct 2026, 16:22" */
function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

// `Business` import is unused here — kept minimal
void ({} as Business | undefined);