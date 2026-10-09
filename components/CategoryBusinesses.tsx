"use client";

import Link from "next/link";
import { useBusiness } from "@/context/BusinessContext";
import BusinessCard from "./BusinessCard";

interface Props {
  categoryName: string;
}

export default function CategoryBusinesses({ categoryName }: Props) {
  const { businesses, categoryCounts } = useBusiness();

  const inCategory = businesses.filter((b) => b.category === categoryName);
  const liveCount = categoryCounts[categoryName] ?? inCategory.length;

  if (inCategory.length === 0) {
    return (
      <div className="text-center px-5 py-16 bg-white border border-dashed rounded-brand-lg
        border-brand-line dark:bg-night-surface dark:border-night-line">
        <svg
          className="mx-auto mb-4 text-brand-muted dark:text-night-muted"
          width="48" height="48" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <h3 className="text-[1.3rem] font-semibold mb-2 dark:text-night-heading">
          No businesses in this category yet.
        </h3>
        <p className="text-brand-muted mb-5 dark:text-night-muted">
          Check back soon, or explore another category.
        </p>
        <Link href="/categories" className="btn btn-primary btn-sm">
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-brand-muted font-medium mb-4 dark:text-night-muted">
        Showing{" "}
        <strong className="text-brand-ink dark:text-night-heading">
          {inCategory.length}
        </strong>{" "}
        of{" "}
        <strong className="text-brand-ink dark:text-night-heading">
          {liveCount}
        </strong>{" "}
        listing{liveCount === 1 ? "" : "s"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {inCategory.map((b) => (
          <BusinessCard key={b.id} business={b} />
        ))}
      </div>
    </>
  );
}