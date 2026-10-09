"use client";

import { CATEGORIES, TOWNS } from "@/lib/data";
import { useBusiness } from "@/context/BusinessContext";
import BusinessCard from "./BusinessCard";

export default function BusinessesSection() {
  const {
    filtered, businesses, keyword, category, location,
    setKeyword, setCategory, setLocation, clearFilters,
  } = useBusiness();

  const isEmpty = filtered.length === 0;

  return (
    <section id="businesses" className="py-24 bg-brand-soft" aria-labelledby="biz-heading">
      <div className="container">
        <div className="max-w-[640px] mx-auto mb-12 text-center">
          <h2 id="biz-heading" className="text-[1.55rem] sm:text-[1.8rem] lg:text-[2.1rem] font-bold">Discover Local Businesses</h2>
          <p className="text-brand-muted text-[1.08rem]">Explore businesses and services in your community.</p>
        </div>

        {/* Filter Bar */}
        <div role="region" aria-label="Filter businesses"
          className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto] gap-3 bg-white border border-brand-line rounded-brand-lg p-3 shadow-soft mb-5">
          <div className="field">
            <label htmlFor="filterKeyword" className="sr-only">Keyword</label>
            <input id="filterKeyword" type="text" placeholder="Search by name or service…"
              autoComplete="off" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="filterCategory" className="sr-only">Category</label>
            <select id="filterCategory" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="filterLocation" className="sr-only">Location</label>
            <select id="filterLocation" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="all">All Locations</option>
              {TOWNS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button className="btn btn-outline btn-sm w-full lg:w-auto" onClick={clearFilters}>Clear Filters</button>
        </div>

        <div className="text-sm text-brand-muted font-medium mb-4 min-h-[22px]" aria-live="polite">
          {filtered.length > 0 && (
            <>Showing <strong className="text-brand-ink">{filtered.length}</strong> of <strong className="text-brand-ink">{businesses.length}</strong> businesses</>
          )}
        </div>

        {!isEmpty ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((b) => <BusinessCard key={b.id} business={b} />)}
          </div>
        ) : (
          <div className="text-center px-5 py-16 bg-white border border-dashed border-brand-line rounded-brand-lg">
            <svg className="mx-auto mb-4 text-brand-muted" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <h3 className="text-[1.3rem] font-semibold mb-2">No businesses found.</h3>
            <p className="text-brand-muted mb-5">Try changing your search or selecting another category.</p>
            <button className="btn btn-primary btn-sm" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}

        <div className="text-center mt-12">
          <button className="btn btn-outline" onClick={clearFilters}>View All Businesses</button>
        </div>
      </div>
    </section>
  );
}