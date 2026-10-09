"use client";

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
        >
          Clear Filters
        </button>
      </div>

      <div
        className="text-sm text-brand-muted font-medium mb-4 min-h-[22px]"
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
    </>
  );
}
