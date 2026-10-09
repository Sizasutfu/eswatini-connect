"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { useBusiness } from "@/context/BusinessContext";
import { getCategorySlug } from "@/lib/categoryUtils";

interface Props {
  /** Optional list of category names to render. Defaults to all. */
  categories?: string[];
  /** Pass a business count per category (server-side). If omitted, uses live counts. */
  counts?: Record<string, number>;
  /** Hide the "Browse →" arrow (useful for compact strips). */
  compact?: boolean;
}

export default function CategoryGrid({
  categories,
  counts,
  compact = false,
}: Props) {
  const { categoryCounts } = useBusiness();

  const items = categories
    ? CATEGORIES.filter((c) => categories.includes(c.name))
    : CATEGORIES;

  const countFor = (name: string) =>
    counts?.[name] ?? categoryCounts[name] ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((cat) => {
        const count = countFor(cat.name);
        const href = `/category/${getCategorySlug(cat.name)}`;
        return (
          <Link
            key={cat.name}
            href={href}
            className="group text-left flex flex-col gap-3 p-6 rounded-brand-lg border transition
              hover:-translate-y-0.5 hover:shadow-card
              border-brand-line bg-white hover:border-brand-green
              dark:border-night-line dark:bg-night-surface dark:hover:border-brand-gold"
          >
            <span
              className="w-12 h-12 inline-flex items-center justify-center rounded-brand-md
                bg-brand-greenLight text-brand-green
                dark:bg-brand-green/20 dark:text-brand-gold"
            >
              {cat.icon}
            </span>
            <h3 className="text-base font-semibold text-brand-ink dark:text-night-heading">
              {cat.name}
            </h3>
            <p className="text-xs text-brand-muted dark:text-night-muted">
              {cat.desc} · {count} listing{count === 1 ? "" : "s"}
            </p>

            {!compact && (
              <span
                className="inline-flex items-center gap-1 text-xs font-semibold mt-1
                  text-brand-green dark:text-brand-gold
                  group-hover:gap-2 transition-all"
              >
                Browse
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}