"use client";

import { useBusiness } from "@/context/BusinessContext";
import BusinessMapDynamic from "./BusinessMapDynamic";

export default function MapView() {
  const { businesses } = useBusiness();

  return (
    <div>
      <div className="mb-4 text-sm text-brand-muted dark:text-night-muted">
        Showing{" "}
        <strong className="text-brand-ink dark:text-night-heading">
          {businesses.length}
        </strong>{" "}
        business{businesses.length === 1 ? "" : "es"} on the map
      </div>

      <BusinessMapDynamic businesses={businesses} />
    </div>
  );
}