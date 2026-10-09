"use client";

import {
  createContext, useContext, useCallback, useEffect, useMemo, useState,
  type ReactNode
} from "react";
import type { Business, SubmissionDraft } from "@/lib/types";
import { CATEGORIES, DEMO_BUSINESSES, LS_KEY } from "@/lib/data";

interface Ctx {
  /* Data */
  businesses: Business[];
  filtered: Business[];
  categoryCounts: Record<string, number>;

  /* Filters */
  keyword: string;
  category: string;
  location: string;
  setKeyword: (v: string) => void;
  setCategory: (v: string) => void;
  setLocation: (v: string) => void;
  clearFilters: () => void;
  selectCategory: (c: string) => void;

  /* Business modal */
  activeBusiness: Business | null;
  openBusiness: (id: string) => void;
  closeBusiness: () => void;

  /* List modal */
  isListModalOpen: boolean;
  openListModal: () => void;
  closeListModal: () => void;

  /* Submissions */
  addSubmission: (draft: SubmissionDraft) => void;
}

const BusinessCtx = createContext<Ctx | null>(null);

/* Merge demo businesses with locally stored submissions */
function mergeBusinesses(): Business[] {
  let stored: Business[] = [];
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(LS_KEY);
      stored = raw ? JSON.parse(raw) : [];
    } catch {
      stored = [];
    }
  }

  const normalised: Business[] = stored.map((b) => ({
    ...b,
    id: b.id || `local-${Math.random().toString(36).slice(2, 9)}`,
    isLocal: true,
    featured: false,
    image: b.image || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    hours: b.hours || "Contact business for hours",
    services: b.services || "General services",
    shortDesc: b.shortDesc || (b.description ? b.description.slice(0, 110) : "")
  }));

  return [...normalised, ...DEMO_BUSINESSES];
}

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [businesses, setBusinesses] = useState<Business[]>(DEMO_BUSINESSES);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");

  const [activeBusiness, setActiveBusiness] = useState<Business | null>(null);
  const [isListModalOpen, setListModalOpen] = useState(false);

  /* Hydrate from localStorage after mount (SSR-safe) */
  useEffect(() => {
    setBusinesses(mergeBusinesses());
  }, []);

  /* ---------- Filtering ---------- */
  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return businesses.filter((b) => {
      const matchKw =
        !kw ||
        b.name.toLowerCase().includes(kw) ||
        (b.shortDesc || "").toLowerCase().includes(kw) ||
        (b.description || "").toLowerCase().includes(kw) ||
        (b.category || "").toLowerCase().includes(kw) ||
        (b.services || "").toLowerCase().includes(kw);
      const matchCat = category === "all" || b.category === category;
      const matchLoc = location === "all" || b.location === location;
      return matchKw && matchCat && matchLoc;
    });
  }, [businesses, keyword, category, location]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of CATEGORIES) counts[c.name] = 0;
    for (const b of businesses) counts[b.category] = (counts[b.category] || 0) + 1;
    return counts;
  }, [businesses]);

  /* ---------- Actions ---------- */
  const clearFilters = useCallback(() => {
    setKeyword("");
    setCategory("all");
    setLocation("all");
  }, []);

  const selectCategory = useCallback((c: string) => {
    setCategory(c);
    if (typeof window !== "undefined") {
      document.getElementById("businesses")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const openBusiness = useCallback(
    (id: string) => {
      const biz = businesses.find((b) => b.id === id);
      if (biz) setActiveBusiness(biz);
    },
    [businesses]
  );

  const closeBusiness = useCallback(() => setActiveBusiness(null), []);
  const openListModal = useCallback(() => setListModalOpen(true), []);
  const closeListModal = useCallback(() => setListModalOpen(false), []);

  const addSubmission = useCallback((draft: SubmissionDraft) => {
    const entry: Business = {
      id: `local-${Date.now().toString(36)}`,
      name: draft.name,
      category: draft.category,
      location: draft.location,
      description: draft.description,
      shortDesc: draft.description.slice(0, 110),
      phone: draft.phone,
      whatsapp: draft.whatsapp,
      email: draft.email,
      address: draft.address || "—",
      hours: "Contact business for hours",
      services: "General services",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      featured: false,
      isLocal: true
    };

    /* Persist */
    try {
      const existing = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      localStorage.setItem(LS_KEY, JSON.stringify([entry, ...existing]));
    } catch {
      /* storage may be unavailable */
    }

    setBusinesses((prev) => [entry, ...prev]);
  }, []);

  const value: Ctx = {
    businesses,
    filtered,
    categoryCounts,
    keyword,
    category,
    location,
    setKeyword,
    setCategory,
    setLocation,
    clearFilters,
    selectCategory,
    activeBusiness,
    openBusiness,
    closeBusiness,
    isListModalOpen,
    openListModal,
    closeListModal,
    addSubmission
  };

  return <BusinessCtx.Provider value={value}>{children}</BusinessCtx.Provider>;
}

export function useBusiness() {
  const ctx = useContext(BusinessCtx);
  if (!ctx) throw new Error("useBusiness must be used inside <BusinessProvider>");
  return ctx;
}