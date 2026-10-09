"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Business } from "@/lib/types";
import { DEMO_BUSINESSES, LS_KEY } from "@/lib/data";
import { slugify } from "@/lib/slugify";
import BusinessDetail from "./BusinessDetail";

type State =
  | { status: "loading" }
  | { status: "found"; business: Business; related: Business[] }
  | { status: "notfound" };

interface Props {
  slug: string;
}

export default function LocalBusinessFallback({ slug }: Props) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    // Reject empty or whitespace-only slugs early
    if (!slug || slug.trim() === "") {
      setState({ status: "notfound" });
      return;
    }

    try {
      const raw = localStorage.getItem(LS_KEY);
      const stored: Business[] = raw ? JSON.parse(raw) : [];

      // Normalise stored data — ensure every entry has a slug and defaults
      const normalised = stored.map((b) => ({
        ...b,
        slug: b.slug || slugify(b.name),
        hours: b.hours || "Contact business for hours",
        services: b.services || "General services",
        image:
          b.image ||
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      }));

      const found = normalised.find((b) => b.slug === slug);

      if (found) {
        const related = [...normalised, ...DEMO_BUSINESSES]
          .filter((b) => b.category === found.category && b.slug !== found.slug)
          .slice(0, 3);

        setState({
          status: "found",
          business: { ...found, isLocal: true },
          related,
        });
      } else {
        setState({ status: "notfound" });
      }
    } catch {
      setState({ status: "notfound" });
    }
  }, [slug]);

  if (state.status === "loading") {
    return (
      <div className="container max-w-[1100px] py-24 text-center text-brand-muted dark:text-night-muted">
        Loading…
      </div>
    );
  }

  if (state.status === "notfound") {
    return (
      <div className="container max-w-[600px] py-24 text-center">
        <div className="text-5xl mb-6">🔍</div>
        <h1 className="text-[1.8rem] font-bold text-brand-ink mb-3 dark:text-night-heading">
          Business not found
        </h1>
        <p className="text-brand-muted mb-8 dark:text-night-muted">
          We couldn&apos;t find a business at{" "}
          <code className="px-1.5 py-0.5 bg-brand-soft dark:bg-night-elevated rounded text-sm">
            /business/{slug}
          </code>
          . It may have been removed, or the link may be incorrect.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/explore" className="btn btn-primary">
            Explore Businesses
          </Link>
          <Link href="/" className="btn btn-outline">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <BusinessDetail
      business={state.business}
      related={state.related}
      isLocal
    />
  );
}