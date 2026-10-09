import type { Metadata } from "next";
import Link from "next/link";
import MapView from "@/components/MapView";

export const metadata: Metadata = {
  title: "Map View",
  description:
    "Explore every Eswatini Connect business on an interactive map. Filter by category and town, then open a listing for details.",
};

export default function MapPage() {
  return (
    <section
      id="map"
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
            Map
          </span>
        </nav>

        <div className="max-w-[720px] mb-8">
          <h1
            className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem]
              font-bold tracking-tight text-brand-ink mb-3
              dark:text-night-heading"
          >
            Businesses on the Map
          </h1>
          <p className="text-[1.08rem] text-brand-muted dark:text-night-muted">
            Every listing on Eswatini Connect, plotted by town. Click a marker to
            see the business and open its page.
          </p>
        </div>

        <MapView />
      </div>
    </section>
  );
}