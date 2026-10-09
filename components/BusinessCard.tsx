"use client";

import Link from "next/link";
import type { Business } from "@/lib/types";
import BusinessImage from "./BusinessImage";
import FavouriteButton from "./FavouriteButton";

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <article
      className="bg-white border border-brand-line rounded-brand-lg overflow-hidden flex flex-col
        transition hover:-translate-y-1 hover:shadow-hero hover:border-transparent group
        dark:bg-night-surface dark:border-night-line dark:hover:shadow-card dark:hover:border-transparent"
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-soft dark:bg-night-elevated">
        <Link
          href={`/business/${business.slug}`}
          className="block absolute inset-0"
          aria-label={`View details for ${business.name}`}
        >
          <BusinessImage
            src={business.image}
            alt={business.name}
            sizes="(max-width:560px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {business.featured && (
          <span className="absolute top-3 left-3 bg-brand-gold text-brand-ink text-xs font-bold px-3 py-1 rounded-full z-10 pointer-events-none">
            Featured
          </span>
        )}

        <div className="absolute top-3 right-3 z-10">
          <FavouriteButton
            slug={business.slug}
            businessName={business.name}
            size="sm"
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 gap-2">
        <span className="text-xs font-semibold text-brand-green uppercase tracking-wide dark:text-brand-gold">
          {business.category}
        </span>
        <h3 className="text-[1.08rem] font-bold text-brand-ink dark:text-night-heading">
          <Link
            href={`/business/${business.slug}`}
            className="hover:text-brand-green transition-colors dark:hover:text-brand-gold"
          >
            {business.name}
          </Link>
        </h3>

        <p className="flex items-center gap-1.5 text-xs text-brand-muted mb-2 dark:text-night-muted">
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" aria-hidden="true"
            className="shrink-0"
          >
            <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {business.location}
        </p>

        <p className="text-sm text-brand-body mb-4 line-clamp-2 flex-1 dark:text-night-text">
          {business.shortDesc}
        </p>

        <div className="flex gap-2 mt-auto">
          <Link
            href={`/business/${business.slug}`}
            className="btn btn-primary btn-sm flex-1"
          >
            View Details
          </Link>
          <a
            className="btn btn-outline btn-sm flex-1"
            href={`tel:${business.phone.replace(/\s+/g, "")}`}
          >
            Call
          </a>
        </div>
      </div>
    </article>
  );
}