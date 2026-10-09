"use client";

import Link from "next/link";
import { useBusiness } from "@/context/BusinessContext";
import BusinessCard from "./BusinessCard";

export default function FeaturedBusinesses() {
  const { businesses } = useBusiness();

  // Featured first, then the most recent additions — capped at 6
  const featured = businesses.filter((b) => b.featured);
  const others = businesses.filter((b) => !b.featured);
  const shown = [...featured, ...others].slice(0, 6);

  return (
    <section
      id="businesses"
      className="py-24 bg-brand-soft"
      aria-labelledby="biz-heading"
    >
      <div className="container">
        <div className="max-w-[640px] mx-auto mb-12 text-center">
          <h2
            id="biz-heading"
            className="text-[1.55rem] sm:text-[1.8rem] lg:text-[2.1rem] font-bold"
          >
            Discover Local Businesses
          </h2>
          <p className="text-brand-muted text-[1.08rem]">
            A selection of featured businesses from across Eswatini.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/explore" className="btn btn-outline">
            View All Businesses
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="ml-2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}