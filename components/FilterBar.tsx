"use client";

import { useState } from "react";
import { CATEGORIES, TOWNS } from "@/lib/data";
import { useBusiness } from "@/context/BusinessContext";

export default function FilterBar() {
  const {
    keyword,
    category,
    location,
    setKeyword,
    setCategory,
    setLocation,
    clearFilters,
    filtered,
    businesses,
  } = useBusiness();

  const [copied, setCopied] = useState(false);

  const hasFilters =
    keyword.trim().length > 0 || category !== "all" || location !== "all";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can fail on http:// or in some browsers
      // Fall back to a prompt so the user can copy manually.
      window.prompt("Copy this link:", window.location.href);
    }
  };

  return (
    <>
      <div
        role="region"
        aria-label="Filter businesses"
        className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto] gap-3 bg-white border border-brand-line rounded-brand-lg p-3 shadow-soft mb-5"
      >
        <div className="field">
          <label htmlFor="filterKeyword" className="sr-only">
            Keyword
          </label>
          <svg
            className="text-brand-muted shrink-0"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            id="filterKeyword"
            type="text"
            placeholder="Search by name or service…"
            autoComplete="off"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="filterCategory" className="sr-only">
            Category
          </label>
          <select
            id="filterCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="filterLocation" className="sr-only">
            Location
          </label>
          <select
            id="filterLocation"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="all">All Locations</option>
            {TOWNS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-outline btn-sm w-full lg:w-auto"
          onClick={clearFilters}
          disabled={!hasFilters}
          title={hasFilters ? "Clear all filters" : "No filters applied"}
        >
          Clear Filters
        </button>
      </div>

      {/* Results meta + share */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 min-h-[22px]">
        <div
          className="text-sm text-brand-muted font-medium"
          aria-live="polite"
        >
          {filtered.length > 0 && (
            <>
              Showing <strong className="text-brand-ink">{filtered.length}</strong>{" "}
              of <strong className="text-brand-ink">{businesses.length}</strong>{" "}
              businesses
            </>
          )}
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-greenDark transition-colors"
          >
            {copied ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Link copied
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                Copy link
              </>
            )}
          </button>
        )}
      </div>
    </>
  );
}