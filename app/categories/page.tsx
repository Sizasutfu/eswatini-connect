import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import CategoryGrid from "@/components/CategoryGrid";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse every category on Eswatini Connect — from restaurants and home services to automotive, beauty, tech, and more.",
};

export default function CategoriesPage() {
  return (
    <section
      id="categories-index"
      className="py-12 md:py-16 min-h-[calc(100vh-72px)]
        bg-brand-soft dark:bg-night-bg"
    >
      <div className="container">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-brand-muted dark:text-night-muted"
        >
          <Link
            href="/"
            className="hover:text-brand-green transition-colors dark:hover:text-brand-gold"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink font-medium dark:text-night-heading">
            Categories
          </span>
        </nav>

        <div className="max-w-[720px] mb-8">
          <h1
            className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem]
              font-bold tracking-tight text-brand-ink mb-3
              dark:text-night-heading"
          >
            Browse Categories
          </h1>
          <p className="text-[1.08rem] text-brand-muted dark:text-night-muted">
            Every business on Eswatini Connect is organised into one of{" "}
            {CATEGORIES.length} categories. Pick one to explore.
          </p>
        </div>

        <CategoryGrid />

        <div className="text-center mt-12">
          <Link href="/explore" className="btn btn-outline">
            Or search all businesses
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true" className="ml-2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}