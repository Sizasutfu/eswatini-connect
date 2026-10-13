"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getSentMessages, deleteMessage, type Message } from "@/lib/supabase/messages";

type Loaded = Message & { businessName: string; businessSlug: string };

type State =
  | { status: "loading" }
  | { status: "loaded"; messages: Loaded[] }
  | { status: "error"; error: string };

export default function MessagesList() {
  const { user, isLoading: authLoading } = useAuth();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setState({ status: "loaded", messages: [] });
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const messages = await getSentMessages();
        if (cancelled) return;
        setState({ status: "loaded", messages });
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setState({ status: "error", error: "Could not load your messages." });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message? This can't be undone.")) return;
    try {
      await deleteMessage(id);
      setState((prev) =>
        prev.status === "loaded"
          ? { status: "loaded", messages: prev.messages.filter((m) => m.id !== id) }
          : prev
      );
    } catch (err) {
      console.error(err);
      alert("Could not delete the message. Please try again.");
    }
  };

  if (!user && !authLoading) {
    return (
      <div className="text-center px-5 py-16 bg-white border border-dashed rounded-brand-lg
        border-brand-line dark:bg-night-surface dark:border-night-line">
        <h2 className="text-[1.4rem] font-semibold mb-2 dark:text-night-heading">
          Sign in to view your messages
        </h2>
        <p className="text-brand-muted mb-6 dark:text-night-muted">
          Your sent messages are tied to your account.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/auth/sign-in?next=/messages" className="btn btn-primary">
            Sign in
          </Link>
          <Link href="/auth/sign-up?next=/messages" className="btn btn-outline">
            Create account
          </Link>
        </div>
      </div>
    );
  }

  if (state.status === "loading" || authLoading) {
    return (
      <div className="py-16 text-center text-brand-muted dark:text-night-muted">
        Loading your messages…
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="py-16 text-center text-red-600 dark:text-red-400">
        {state.error}
      </div>
    );
  }

  const messages = state.messages;

  if (messages.length === 0) {
    return (
      <div className="text-center px-5 py-16 bg-white border border-dashed rounded-brand-lg
        border-brand-line dark:bg-night-surface dark:border-night-line">
        <svg className="mx-auto mb-4 text-brand-muted dark:text-night-muted"
          width="56" height="56" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
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
      <p className="text-sm text-brand-muted font-medium mb-6 dark:text-night-muted">
        You have{" "}
        <strong className="text-brand-ink dark:text-night-heading">
          {messages.length}
        </strong>{" "}
        sent message{messages.length === 1 ? "" : "s"}
      </p>

      <ul className="flex flex-col gap-4">
        {messages.map((m) => (
          <li
            key={m.id}
            className="bg-white border border-brand-line rounded-brand-lg p-5 shadow-soft
              dark:bg-night-surface dark:border-night-line dark:shadow-card"
          >
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
                  {m.businessName}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(m.id)}
                aria-label={`Delete message to ${m.businessName}`}
                className="shrink-0 w-8 h-8 inline-flex items-center justify-center rounded-full
                  text-brand-muted hover:text-red-600 hover:bg-red-50 transition
                  dark:text-night-muted dark:hover:text-red-400 dark:hover:bg-red-900/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-brand-body leading-relaxed whitespace-pre-wrap mb-3 dark:text-night-text">
              {m.body}
            </p>

            <p className="text-xs text-brand-muted dark:text-night-muted">
              {formatTimestamp(m.createdAt)}
              {m.readAt && (
                <>
                  {" "}
                  · <span className="text-brand-green dark:text-brand-gold">Read</span>
                </>
              )}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

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