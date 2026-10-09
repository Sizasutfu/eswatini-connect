"use client";

import { CATEGORIES } from "@/lib/data";
import { useBusiness } from "@/context/BusinessContext";

export default function Categories() {
  const { category, selectCategory, categoryCounts } = useBusiness();

  return (
    <section id="categories" className="py-24 bg-white dark:bg-night-bg" aria-labelledby="cat-heading">
      <div className="container">
        <div className="max-w-[640px] mx-auto mb-12 text-center">
          <h2 id="cat-heading" className="text-[1.55rem] sm:text-[1.8rem] lg:text-[2.1rem] font-bold">
            Explore Popular Categories
          </h2>
          <p className="text-brand-muted text-[1.08rem] dark:text-night-muted">
            Find the services you need, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.name] ?? 0;
            const active = category === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => selectCategory(cat.name)}
                className={`text-left flex flex-col gap-3 p-6 rounded-brand-lg border transition
                  hover:-translate-y-0.5 hover:shadow-card
                  ${
                    active
                      ? "border-brand-green bg-brand-greenLight dark:border-brand-gold dark:bg-brand-green/10"
                      : "border-brand-line bg-white hover:border-brand-green dark:border-night-line dark:bg-night-surface dark:hover:border-brand-gold"
                  }`}
              >
                <span className="w-12 h-12 inline-flex items-center justify-center rounded-brand-md
                  bg-brand-greenLight text-brand-green
                  dark:bg-brand-green/20 dark:text-brand-gold">
                  {cat.icon}
                </span>
                <h3 className="text-base font-semibold text-brand-ink dark:text-night-heading">
                  {cat.name}
                </h3>
                <p className="text-xs text-brand-muted dark:text-night-muted">
                  {cat.desc} · {count} listing{count === 1 ? "" : "s"}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}