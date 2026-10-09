import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="container max-w-[600px] py-24 text-center">
      <div className="text-5xl mb-6">🔍</div>
      <h1 className="text-[1.8rem] font-bold text-brand-ink mb-3 dark:text-night-heading">
        Category not found
      </h1>
      <p className="text-brand-muted mb-8 dark:text-night-muted">
        We couldn&apos;t find that category. It may have been renamed, or the
        link may be incorrect.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link href="/categories" className="btn btn-primary">
          Browse Categories
        </Link>
        <Link href="/explore" className="btn btn-outline">
          Explore All Businesses
        </Link>
      </div>
    </div>
  );
}