"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Business, SubmissionDraft } from "@/lib/types";
import { CATEGORIES } from "@/lib/data";
import { getTownCenter } from "@/lib/data";
import { slugify } from "@/lib/slugify";
import { createClient } from "@/lib/supabase/client";

interface Ctx {
  businesses: Business[];
  filtered: Business[];
  categoryCounts: Record<string, number>;
  isLoading: boolean;

  keyword: string;
  category: string;
  location: string;
  setKeyword: (v: string) => void;
  setCategory: (v: string) => void;
  setLocation: (v: string) => void;
  clearFilters: () => void;
  selectCategory: (c: string) => void;

  isListModalOpen: boolean;
  openListModal: () => void;
  closeListModal: () => void;

  addSubmission: (draft: SubmissionDraft) => Promise<void>;
}

const BusinessCtx = createContext<Ctx | null>(null);

interface DbRow {
  id: number;
  slug: string;
  name: string;
  category: string;
  location: string;
  lat: number | null;
  lng: number | null;
  short_desc: string | null;
  description: string | null;
  image: string | null;
  gallery: string[] | null;
  featured: boolean;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  hours: string | null;
  services: string | null;
  is_local: boolean;
}

function rowToBusiness(r: DbRow): Business {
  return {
    id: String(r.id),
    slug: r.slug,
    name: r.name,
    category: r.category,
    location: r.location,
    lat: r.lat ?? -26.5225,
    lng: r.lng ?? 31.4659,
    shortDesc: r.short_desc ?? "",
    description: r.description ?? "",
    image: r.image ?? "",
    gallery: r.gallery ?? [],
    featured: r.featured,
    phone: r.phone ?? "",
    whatsapp: r.whatsapp ?? "",
    email: r.email ?? "",
    address: r.address ?? "—",
    hours: r.hours ?? "Contact business for hours",
    services: r.services ?? "General services",
    isLocal: r.is_local,
  };
}

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [isListModalOpen, setListModalOpen] = useState(false);

  /* ---- Load businesses from Supabase on mount ---- */
  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) {
        console.error("Failed to load businesses:", error);
        setBusinesses([]);
      } else {
        setBusinesses((data as DbRow[]).map(rowToBusiness));
      }
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---- Filtering (unchanged from before) ---- */
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

  const clearFilters = useCallback(() => {
    setKeyword("");
    setCategory("all");
    setLocation("all");
  }, []);

  const selectCategory = useCallback((c: string) => {
    setCategory(c);
    if (typeof window !== "undefined") {
      document
        .getElementById("businesses")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const openListModal = useCallback(() => setListModalOpen(true), []);
  const closeListModal = useCallback(() => setListModalOpen(false), []);

  /* ---- Submissions: write to Supabase ---- */
  const addSubmission = useCallback(async (draft: SubmissionDraft) => {
    const fallback = getTownCenter(draft.location);
    const supabase = createClient();

    const payload = {
      slug: slugify(draft.name),
      name: draft.name,
      category: draft.category,
      location: draft.location,
      lat: fallback.lat,
      lng: fallback.lng,
      short_desc: draft.description.slice(0, 110),
      description: draft.description,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      gallery: [],
      featured: false,
      phone: draft.phone,
      whatsapp: draft.whatsapp,
      email: draft.email,
      address: draft.address || "—",
      hours: "Contact business for hours",
      services: "General services",
      is_local: true,
    };

    const { data, error } = await supabase
      .from("businesses")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Submission failed:", error);
      throw error;
    }

    setBusinesses((prev) => [rowToBusiness(data as DbRow), ...prev]);
  }, []);

  const value: Ctx = {
    businesses,
    filtered,
    categoryCounts,
    isLoading,
    keyword,
    category,
    location,
    setKeyword,
    setCategory,
    setLocation,
    clearFilters,
    selectCategory,
    isListModalOpen,
    openListModal,
    closeListModal,
    addSubmission,
  };

  return <BusinessCtx.Provider value={value}>{children}</BusinessCtx.Provider>;
}

export function useBusiness() {
  const ctx = useContext(BusinessCtx);
  if (!ctx) throw new Error("useBusiness must be used inside <BusinessProvider>");
  return ctx;
}