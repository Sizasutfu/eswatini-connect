"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function UserMenu() {
  const { user, isLoading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-brand-soft dark:bg-night-elevated animate-pulse" />
    );
  }

  if (!user) {
    return (
      <Link
        href="/auth/sign-in"
        className="btn btn-outline btn-sm hidden sm:inline-flex"
      >
        Sign in
      </Link>
    );
  }

  const initial = (user.email ?? "?").trim()[0]?.toUpperCase() ?? "?";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="w-10 h-10 inline-flex items-center justify-center rounded-full font-bold text-sm
          bg-brand-green text-white hover:bg-brand-greenDark transition
          dark:bg-brand-gold dark:text-night-bg dark:hover:brightness-95"
      >
        {initial}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 bg-white border border-brand-line rounded-brand-md shadow-card overflow-hidden z-50
            dark:bg-night-surface dark:border-night-line"
        >
          <div className="px-4 py-3 border-b border-brand-line dark:border-night-line">
            <p className="text-xs text-brand-muted dark:text-night-muted">Signed in as</p>
            <p className="text-sm font-medium text-brand-ink truncate dark:text-night-heading">
              {user.email}
            </p>
          </div>

          <Link
            href="/my-businesses"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-brand-body hover:bg-brand-greenLight transition-colors
              dark:text-night-text dark:hover:bg-night-elevated"
          >
            My Businesses
          </Link>
          <Link
            href="/saved"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-brand-body hover:bg-brand-greenLight transition-colors
              dark:text-night-text dark:hover:bg-night-elevated"
          >
            Saved Businesses
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={async () => {
              setOpen(false);
              await signOut();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors
              dark:text-red-400 dark:hover:bg-red-900/20"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}