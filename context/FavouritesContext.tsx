"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const LS_KEY = "eswatini_connect_favourites_v1";

interface Ctx {
  /** Set of saved business slugs */
  slugs: Set<string>;
  /** True once localStorage has been read (first client render) */
  hydrated: boolean;
  /** Number of saved businesses */
  count: number;
  /** Check whether a business is saved */
  isFavourite: (slug: string) => boolean;
  /** Toggle a business between saved / unsaved */
  toggle: (slug: string) => void;
  /** Clear all saved businesses */
  clear: () => void;
}

const FavouritesCtx = createContext<Ctx | null>(null);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  /* ---- Load once from localStorage ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setSlugs(new Set(parsed.filter((s) => typeof s === "string")));
      }
    } catch {
      /* corrupt or unavailable storage — start empty */
    }
    setHydrated(true);
  }, []);

  /* ---- Persist on every change (after hydration) ---- */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(Array.from(slugs)));
    } catch {
      /* storage may be full or blocked — nothing we can do */
    }
  }, [slugs, hydrated]);

  /* ---- Cross-tab sync ---- */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== LS_KEY) return;
      try {
        const parsed = e.newValue ? JSON.parse(e.newValue) : [];
        if (Array.isArray(parsed)) {
          setSlugs(new Set(parsed.filter((s) => typeof s === "string")));
        }
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((slug: string) => {
    setSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  const clear = useCallback(() => setSlugs(new Set()), []);

  const isFavourite = useCallback((slug: string) => slugs.has(slug), [slugs]);

  const value: Ctx = useMemo(
    () => ({
      slugs,
      hydrated,
      count: slugs.size,
      isFavourite,
      toggle,
      clear,
    }),
    [slugs, hydrated, isFavourite, toggle, clear]
  );

  return (
    <FavouritesCtx.Provider value={value}>{children}</FavouritesCtx.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesCtx);
  if (!ctx) {
    throw new Error("useFavourites must be used inside <FavouritesProvider>");
  }
  return ctx;
}