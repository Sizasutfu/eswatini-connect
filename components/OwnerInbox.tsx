"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  getReceivedMessages,
  markMessageRead,
  deleteMessage,
  type InboxMessage,
} from "@/lib/supabase/messages";

type State =
  | { status: "loading" }
  | { status: "loaded"; messages: InboxMessage[] }
  | { status: "error"; error: string };

export default function OwnerInbox() {
  const { user, isLoading: authLoading } = useAuth();
  const [state, setState] = useState<State>({ status: "loading" });
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const load = useCallback(async () => {
    try {
      const messages = await getReceivedMessages();
      setState({ status: "loaded", messages });
    } catch (err) {
      console.error(err);
      setState({ status: "error", error: "Could not load your inbox." });
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setState({ status: "loaded", messages: [] });
      return;
    }
    load();
  }, [user, authLoading, load]);

  const handleMarkRead = async (id: string) => {
    try {
      await markMessageRead(id);
      setState((prev) =>
        prev.status === "loaded"
          ? {
              status: "loaded",
              messages: prev.messages.map((m) =>
                m.id === id ? { ...m, readAt: new Date().toISOString() } : m
              ),
            }
          : prev
      );
    } catch (err) {
      console.error(err);
      alert("Could not mark as read. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message? This can't be undone.")) return;
    try {
      await deleteMessage(id);
      setState((prev) =>
        prev.status === "loaded"
          ? {
              status: "loaded",
              messages: prev.messages.filter((m) => m.id !== id),
            }
          : prev
      );
    } catch (err) {
      console.error(err);
      alert("Could not delete the message. Please try again.");
    }
  };

  /* ---- Signed out ---- */
  if (!authLoading && !user) {
    return (
      <div className="text-center px-5 py-16 bg-white border border-dashed rounded-brand-lg
        border-brand-line dark:bg-night-surface dark:border-night-line">
        <h2 className="text-[1.4rem] font-semibold mb-2 dark:text-night-heading">
          Sign in to view your inbox
        </h2>
        <p className="text-brand-muted mb-6 dark:text-night-muted">
          Messages sent to your businesses live on your account.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/auth/sign-in?next=/my-businesses"
            className="btn btn-primary"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up?next=/my-businesses"
            className="btn btn-outline"
          >
            Create account
          </Link>
        </div>
      </div>
    );
  }

  if (authLoading || state.status === "loading") {
    return (
      <div className="py-16 text-center text-brand-muted dark:text-night-muted">
        Loading your inbox…
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
  const unreadCount = messages.filter((m) => !m.readAt).length;
  const shown = filter === "unread" ? messages.filter((m) => !m.readAt) : messages;

  /* ---- Empty inbox ---- */
  if (messages.length === 0) {
    return (
      <div className="text-center px-5 py-16 bg-white border border-dashed rounded-brand-lg
        border-brand-line dark:bg-night-surface dark:border-night-line">
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
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
        <h2 className="text-[1.4rem] font-semibold mb-2 dark:text-night-heading">
          No messages yet.
        </h2>
        <p className="text-brand-muted dark:text-night-muted max-w-[420px] mx-auto">
          When customers send a message to one of your businesses, it will
          appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <p className="text-sm text-brand-muted dark:text-night-muted">
          <strong className="text-brand-ink dark:text-night-heading">
            {messages.length}
          </strong>{" "}
          message{messages.length === 1 ? "" : "s"}
          {unreadCount > 0 && (
            <>
              {" · "}
              <strong className="text-brand-gold">{unreadCount}</strong> unread
            </>
          )}
        </p>

        <div
          role="tablist"
          aria-label="Filter messages"
          className="flex items-center gap-1 p-1 bg-brand-soft dark:bg-night-elevated rounded-full"
        >
          <button
            type="button"
            role="tab"
            aria-selected={filter === "all"}
            onClick={() => setFilter("all")}
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition ${
              filter === "all"
                ? "bg-white text-brand-ink shadow-soft dark:bg-night-surface dark:text-night-heading"
                : "text-brand-muted hover:text-brand-ink dark:text-night-muted dark:hover:text-night-heading"
            }`}
          >
            All
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === "unread"}
            onClick={() => setFilter("unread")}
            disabled={unreadCount === 0}
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed ${
              filter === "unread"
                ? "bg-white text-brand-ink shadow-soft dark:bg-night-surface dark:text-night-heading"
                : "text-brand-muted hover:text-brand-ink dark:text-night-muted dark:hover:text-night-heading"
            }`}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </div>

      {/* Filtered empty */}
      {shown.length === 0 ? (
        <div className="text-center px-5 py-16 bg-white border border-dashed rounded-brand-lg
          border-brand-line dark:bg-night-surface dark:border-night-line">
          <p className="text-brand-muted dark:text-night-muted">
            No unread messages. You&apos;re all caught up.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {shown.map((m) => (
            <InboxItem
              key={m.id}
              message={m}
              onMarkRead={handleMarkRead}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
}

/* ---------- Inbox message card ---------- */

function InboxItem({
  message: m,
  onMarkRead,
  onDelete,
}: {
  message: InboxMessage;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const isUnread = !m.readAt;

  return (
    <li
      className={`rounded-brand-lg p-5 shadow-soft border transition ${
        isUnread
          ? "bg-brand-greenLight/40 border-brand-green/30 dark:bg-brand-green/10 dark:border-brand-green/30"
          : "bg-white border-brand-line dark:bg-night-surface dark:border-night-line"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isUnread && (
              <span
                className="w-2 h-2 rounded-full bg-brand-gold shrink-0"
                aria-label="Unread"
              />
            )}
            <p className="text-sm font-bold text-brand-ink dark:text-night-heading truncate">
              {m.senderName}
            </p>
          </div>
          <p className="text-xs text-brand-muted dark:text-night-muted">
            To{" "}
            <Link
              href={`/business/${m.businessSlug}`}
              className="font-medium text-brand-green hover:text-brand-greenDark dark:text-brand-gold dark:hover:brightness-110"
            >
              {m.businessName}
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isUnread && (
            <button
              type="button"
              onClick={() => onMarkRead(m.id)}
              className="text-xs font-medium px-2.5 py-1 rounded-full
                text-brand-green hover:bg-brand-greenLight transition
                dark:text-brand-gold dark:hover:bg-brand-green/15"
            >
              Mark read
            </button>
          )}
          <button
            type="button"
            onClick={() => onDelete(m.id)}
            aria-label="Delete message"
            className="w-8 h-8 inline-flex items-center justify-center rounded-full
              text-brand-muted hover:text-red-600 hover:bg-red-50 transition
              dark:text-night-muted dark:hover:text-red-400 dark:hover:bg-red-900/20"
          >
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true"
            >
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <p className="text-sm leading-relaxed text-brand-body whitespace-pre-wrap mb-3 dark:text-night-text">
        {m.body}
      </p>

      {/* Footer: contact + timestamp */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-muted dark:text-night-muted">
        <a
          href={`mailto:${m.senderEmail}`}
          className="hover:text-brand-green dark:hover:text-brand-gold transition-colors"
        >
          {m.senderEmail}
        </a>
        {m.senderPhone && (
          <a
            href={`tel:${m.senderPhone.replace(/\s+/g, "")}`}
            className="hover:text-brand-green dark:hover:text-brand-gold transition-colors"
          >
            {m.senderPhone}
          </a>
        )}
        <span>{formatTimestamp(m.createdAt)}</span>
      </div>
    </li>
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