import { getPlatformStats } from "@/lib/supabase/stats";
import StatsCounter from "./StatsCounter";

/**
 * Live platform statistics — fetched from Supabase on the server.
 * No placeholder numbers, no fake "+" suffixes.
 */
export default async function StatsSection() {
  const stats = await getPlatformStats();

  const items = [
    { target: stats.businesses, label: "Businesses Listed" },
    { target: stats.categories, label: "Service Categories" },
    { target: stats.towns, label: "Towns Covered" },
    { target: stats.featured, label: "Featured Listings" },
  ];

  return (
    <section
      aria-label="Platform statistics"
      className="py-16 bg-brand-green text-white dark:bg-brand-deep"
    >
      <div className="container">
        <p className="text-center text-xs uppercase tracking-[0.08em] text-white/65 mb-6">
          Live platform figures
        </p>

        <StatsCounter stats={items} />
      </div>
    </section>
  );
}