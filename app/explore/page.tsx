import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";
import ExploreResults from "@/components/ExploreResults";
import FiltersUrlSync from "@/components/FiltersUrlSync";

export const metadata: Metadata = {
  title: "Explore Businesses",
  description:
    "Browse and filter local businesses across Eswatini by category, town, and keyword.",
};

export default function ExplorePage() {
  return (
    <section
      id="explore"
      className="py-12 md:py-16 min-h-[calc(100vh-72px)]
        bg-brand-soft dark:bg-night-bg"
    >
      {/* Syncs filter state ↔ URL. Renders nothing. */}
      <Suspense fallback={null}>
        <FiltersUrlSync />
      </Suspense>

      <div className="container">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-brand-muted dark:text-night-muted"
        >
          <Link
            href="/"
            className="hover:text-brand-green transition-colors
              dark:hover:text-brand-gold"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink font-medium dark:text-night-heading">
            Explore Businesses
          </span>
        </nav>

        {/* Page header */}
        <div className="max-w-[720px] mb-8">
          <h1
            className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem]
              font-bold tracking-tight text-brand-ink mb-3
              dark:text-night-heading"
          >
            Explore Businesses
          </h1>
          <p className="text-[1.08rem] text-brand-muted dark:text-night-muted">
            Browse every listing on Eswatini Connect. Filter by category, town,
            or keyword to narrow the results.
          </p>
        </div>

        {/* Filters + results */}
        <FilterBar />
        <ExploreResults />
      </div>
    </section>
  );
}