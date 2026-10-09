import type { Metadata } from "next";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";
import ExploreResults from "@/components/ExploreResults";

export const metadata: Metadata = {
  title: "Explore Businesses — Eswatini Connect",
  description:
    "Browse and filter local businesses across Eswatini by category, town, and keyword.",
};

export default function ExplorePage() {
  return (
    <section
      id="explore"
      className="py-12 md:py-16 bg-brand-soft min-h-[calc(100vh-72px)]"
    >
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-brand-muted">
          <Link href="/" className="hover:text-brand-green transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink font-medium">Explore Businesses</span>
        </nav>

        {/* Header */}
        <div className="max-w-[720px] mb-8">
          <h1 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem] font-bold tracking-tight text-brand-ink mb-3">
            Explore Businesses
          </h1>
          <p className="text-[1.08rem] text-brand-muted">
            Browse every listing on Eswatini Connect. Filter by category, town, or keyword
            to narrow the results.
          </p>
        </div>

        <FilterBar />
        <ExploreResults />
      </div>
    </section>
  );
}