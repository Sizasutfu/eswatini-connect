"use client";

import Link from "next/link";
import { useBusiness } from "@/context/BusinessContext";
import { useFavourites } from "@/context/FavouritesContext";
import BusinessCard from "./BusinessCard";

export default function SavedBusinesses() {
  const { businesses } = useBusiness();
  const { slugs, hydrated, count, clear } = useFavourites();

  /* Wait until localStorage has been read to avoid flashing "empty" */
  if (!hydrated) {
    return (
      <div className="py-16 text-center text-brand-muted dark:text-night-muted">
        Loading your saved businesses…
      </div>
    );
  }

  const saved = businesses.filter((b) => slugs.has(b.slug));

  if (saved.length === 0) {
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
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <h2 className="text-[1.4rem] font-semibold mb-2 dark:text-night-heading">
          No saved businesses yet.
        </h2>
        <p className="text-brand-muted mb-6 dark:text-night-muted">
          Tap the heart icon on any business to save it here for later.
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
            {saved.length}
          </strong>{" "}
          saved business{saved.length === 1 ? "" : "es"}
        </p>
        <button
          type="button"
          onClick={() => {
            if (confirm("Remove all saved businesses? This can't be undone.")) {
              clear();
            }
          }}
          className="text-sm font-medium text-brand-muted hover:text-red-600 transition-colors dark:text-night-muted dark:hover:text-red-400"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {saved.map((b) => (
          <BusinessCard key={b.id} business={b} />
        ))}
      </div>
    </>
  );
}