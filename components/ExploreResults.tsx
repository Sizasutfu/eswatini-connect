"use client";

import { useBusiness } from "@/context/BusinessContext";
import BusinessCard from "./BusinessCard";

export default function ExploreResults() {
  const { filtered, clearFilters } = useBusiness();

  if (filtered.length === 0) {
    return (
      <div className="text-center px-5 py-16 bg-white border border-dashed rounded-brand-lg
        border-brand-line dark:bg-night-surface dark:border-night-line">
        <svg className="mx-auto mb-4 text-brand-muted dark:text-night-muted" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <h3 className="text-[1.3rem] font-semibold mb-2 dark:text-night-heading">
          No businesses found.
        </h3>
        <p className="text-brand-muted mb-5 dark:text-night-muted">
          Try changing your search or selecting another category.
        </p>
        <button className="btn btn-primary btn-sm" onClick={clearFilters}>Clear Filters</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((b) => (
        <BusinessCard key={b.id} business={b} />
      ))}
    </div>
  );
}