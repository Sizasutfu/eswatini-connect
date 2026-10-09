"use client";

import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value` that only updates after
 * `delay` ms have elapsed without further changes.
 *
 * Typical use: debounce a search input so filtering / URL updates
 * only happen after the user pauses typing.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}