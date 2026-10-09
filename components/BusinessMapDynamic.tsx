"use client";

import dynamic from "next/dynamic";
import type { Business } from "@/lib/types";

/**
 * BusinessMap is a Leaflet-based component that requires `window`.
 * We load it with next/dynamic and ssr: false so it never runs
 * on the server. Without this, Next.js throws:
 *   ReferenceError: window is not defined
 */
const BusinessMap = dynamic(() => import("./BusinessMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-brand-lg border border-brand-line dark:border-night-line
        bg-brand-soft dark:bg-night-elevated flex items-center justify-center"
      style={{ height: "min(70vh, 620px)", minHeight: 380 }}
    >
      <div className="text-center text-brand-muted dark:text-night-muted">
        <svg
          className="mx-auto mb-3 animate-pulse"
          width="32" height="32" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" aria-hidden="true"
        >
          <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <p className="text-sm font-medium">Loading map…</p>
      </div>
    </div>
  ),
});

interface Props {
  businesses: Business[];
}

export default function BusinessMapDynamic({ businesses }: Props) {
  return <BusinessMap businesses={businesses} />;
}