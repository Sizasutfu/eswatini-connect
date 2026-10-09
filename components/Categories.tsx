"use client";

import Link from "next/link";
import { useBusiness } from "@/context/BusinessContext";
import CategoryGrid from "./CategoryGrid";

export default function Categories() {
  // We still subscribe to the context here so the section re-renders
  // when a local business is submitted (updating the count labels).
  const { categoryCounts } = useBusiness();

  return (
    <section
      id="categories"
      className="py-24 bg-white dark:bg-night-bg"
      aria-labelledby="cat-heading"
    >
      <div className="container">
        <div className="max-w-[640px] mx-auto mb-12 text-center">
          <h2
            id="cat-heading"
            className="text-[1.55rem] sm:text-[1.8rem] lg:text-[2.1rem] font-bold"
          >
            Explore Popular Categories
          </h2>
          <p className="text-brand-muted text-[1.08rem] dark:text-night-muted">
            Find the services you need, all in one place.
          </p>
        </div>

        <CategoryGrid counts={categoryCounts} />

        <div className="text-center mt-10">
          <Link href="/categories" className="btn btn-outline">
            View All Categories
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true" className="ml-2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}