import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/data";
import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getCategorySlug,
} from "@/lib/categoryUtils";
import CategoryGrid from "@/components/CategoryGrid";
import CategoryBusinesses from "@/components/CategoryBusinesses";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "Category" };

  const path = `/category/${getCategorySlug(category.name)}`;

  return {
    title: `${category.name} in Eswatini`,
    description: `Browse ${category.name.toLowerCase()} listings across Eswatini — ${category.desc}.`,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${category.name} in Eswatini`,
      description: `Browse ${category.name.toLowerCase()} listings across Eswatini.`,
      url: path,
      siteName: "Eswatini Connect",
      locale: "en_SZ",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} in Eswatini`,
      description: `Browse ${category.name.toLowerCase()} listings across Eswatini.`,
    },
  };
}

export default function CategoryPage({ params }: PageProps) {
  if (!params.slug || params.slug.trim() === "") notFound();

  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const otherCategories = CATEGORIES.filter((c) => c.name !== category.name)
    .slice(0, 4)
    .map((c) => c.name);

  return (
    <section
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
          <Link
            href="/categories"
            className="hover:text-brand-green transition-colors dark:hover:text-brand-gold"
          >
            Categories
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink font-medium dark:text-night-heading">
            {category.name}
          </span>
        </nav>

        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-sm font-medium mb-6
            text-brand-green hover:text-brand-greenDark transition-colors
            dark:text-brand-gold dark:hover:brightness-110"
        >
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Categories
        </Link>

        <div className="flex items-start gap-5 mb-8">
          <span
            className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 inline-flex items-center justify-center rounded-brand-lg
              bg-brand-greenLight text-brand-green
              dark:bg-brand-green/20 dark:text-brand-gold"
          >
            {category.icon}
          </span>
          <div>
            <h1
              className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem]
                font-bold tracking-tight text-brand-ink mb-2
                dark:text-night-heading"
            >
              {category.name}
            </h1>
            <p className="text-[1.08rem] text-brand-muted dark:text-night-muted">
              {category.desc} — browse all listings in this category.
            </p>
          </div>
        </div>

        <CategoryBusinesses categoryName={category.name} />

        <section className="pt-12 mt-16 border-t border-brand-line dark:border-night-line">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <h2 className="text-[1.3rem] sm:text-[1.5rem] font-bold text-brand-ink dark:text-night-heading">
              Other Categories
            </h2>
            <Link
              href="/categories"
              className="text-sm font-semibold text-brand-green hover:text-brand-greenDark transition-colors
                dark:text-brand-gold dark:hover:brightness-110"
            >
              View all →
            </Link>
          </div>
          <CategoryGrid categories={otherCategories} compact />
        </section>
      </div>
    </section>
  );
}