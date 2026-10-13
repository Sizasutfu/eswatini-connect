import type { Metadata } from "next";
import Link from "next/link";
import MyBusinessesTabs from "@/components/MyBusinessesTabs";

export const metadata: Metadata = {
  title: "My Businesses",
  description:
    "Businesses you've submitted to Eswatini Connect and messages received.",
  robots: { index: false, follow: true },
};

export default function MyBusinessesPage() {
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
          <span className="text-brand-ink font-medium dark:text-night-heading">
            My Businesses
          </span>
        </nav>

        <div className="max-w-[720px] mb-8">
          <h1
            className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem]
              font-bold tracking-tight text-brand-ink mb-3
              dark:text-night-heading"
          >
            My Businesses
          </h1>
          <p className="text-[1.08rem] text-brand-muted dark:text-night-muted">
            Manage your listings and read messages customers have sent you.
          </p>
        </div>

        <MyBusinessesTabs />
      </div>
    </section>
  );
}