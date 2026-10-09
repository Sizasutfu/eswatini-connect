"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import { CATEGORIES, TOWNS } from "@/lib/data";

/* Valid values — used to reject garbage from hand-edited URLs */
const VALID_CATEGORIES = new Set<string>(["all", ...CATEGORIES.map((c) => c.name)]);
const VALID_LOCATIONS = new Set<string>(["all", ...TOWNS]);

/**
 * Keeps the URL query string in sync with filter state.
 *
 * - URL → State: on mount (deep link) and on browser back/forward.
 * - State → URL: whenever the user changes a filter.
 *
 * Uses router.replace so that typing in the keyword field does not
 * spam the browser history — but the URL is still updated on every change.
 * The result: any filtered view is shareable and bookmarkable.
 *
 * Renders nothing.
 */
export default function FiltersUrlSync() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { keyword, category, location, setKeyword, setCategory, setLocation } =
    useBusiness();

  /* ---------- URL → State ---------- */
  useEffect(() => {
    const rawCategory = searchParams.get("category") ?? "all";
    const rawLocation = searchParams.get("location") ?? "all";
    const urlCategory = VALID_CATEGORIES.has(rawCategory) ? rawCategory : "all";
    const urlLocation = VALID_LOCATIONS.has(rawLocation) ? rawLocation : "all";
    const urlKeyword = searchParams.get("q") ?? "";

    if (urlKeyword !== keyword) setKeyword(urlKeyword);
    if (urlCategory !== category) setCategory(urlCategory);
    if (urlLocation !== location) setLocation(urlLocation);
    // Intentionally only depends on searchParams — we don't want
    // state changes to re-trigger this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  /* ---------- State → URL ---------- */
  useEffect(() => {
    const urlKeyword = searchParams.get("q") ?? "";
    const urlCategory = searchParams.get("category") ?? "all";
    const urlLocation = searchParams.get("location") ?? "all";

    if (
      urlKeyword === keyword &&
      urlCategory === category &&
      urlLocation === location
    ) {
      return; // Already in sync — nothing to update
    }

    const params = new URLSearchParams(searchParams.toString());

    if (keyword) params.set("q", keyword);
    else params.delete("q");

    if (category !== "all") params.set("category", category);
    else params.delete("category");

    if (location !== "all") params.set("location", location);
    else params.delete("location");

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // Intentionally only depends on state — the URL already matches
    // when this runs on deep-link mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, category, location]);

  return null;
}