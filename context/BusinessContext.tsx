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
import { CATEGORIES, getTownCenter } from "@/lib/data";
import { slugify } from "@/lib/slugify";
import { createClient } from "@/lib/supabase/client";

interface Ctx {
  businesses: Business[];
  filtered: Business[];
  categoryCounts: Record<string, number>;
  isLoading: boolean;
  error: string | null;

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
  updateBusiness: (id: string, draft: SubmissionDraft) => Promise<Business>;
  deleteBusiness: (id: string) => Promise<void>;
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
  const [error, setError] = useState<string | null>(null);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [isListModalOpen, setListModalOpen] = useState(false);

  /* ---- Load businesses from Supabase on mount ---- */
  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    (async () => {
      const { data, error: fetchError } = await supabase
        .from("businesses")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        console.error("Failed to load businesses:", fetchError);
        setError("Could not load businesses.");
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

  /* ---- Filtering ---- */
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

  /* ---- Create ---- */
  const addSubmission = useCallback(async (draft: SubmissionDraft) => {
    const fallback = getTownCenter(draft.location);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("You must be signed in to submit a business.");
    }

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
        draft.image.trim() ||
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      gallery: draft.image.trim() ? [draft.image.trim()] : [],
      featured: false,
      phone: draft.phone,
      whatsapp: draft.whatsapp,
      email: draft.email,
      address: draft.address || "—",
      hours: draft.hours.trim() || "Contact business for hours",
      services: draft.services.trim() || "General services",
      is_local: true,
      user_id: user.id,
    };

    const { data, error: insertError } = await supabase
      .from("businesses")
      .insert(payload)
      .select()
      .single();

    if (insertError) {
      console.error("Submission failed:", insertError);
      throw insertError;
    }

    setBusinesses((prev) => [rowToBusiness(data as DbRow), ...prev]);
  }, []);

  /* ---- Update ---- */
  const updateBusiness = useCallback(
    async (id: string, draft: SubmissionDraft): Promise<Business> => {
      const fallback = getTownCenter(draft.location);
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be signed in to edit a business.");
      }

      const payload = {
        // Deliberately not updating `slug` — keeps URLs stable.
        name: draft.name,
        category: draft.category,
        location: draft.location,
        lat: fallback.lat,
        lng: fallback.lng,
        short_desc: draft.description.slice(0, 110),
        description: draft.description,
        image:
          draft.image.trim() ||
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
        gallery: draft.image.trim() ? [draft.image.trim()] : [],
        phone: draft.phone,
        whatsapp: draft.whatsapp,
        email: draft.email,
        address: draft.address || "—",
        hours: draft.hours.trim() || "Contact business for hours",
        services: draft.services.trim() || "General services",
      };

      const { data, error: updateError } = await supabase
        .from("businesses")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        console.error("Update failed:", updateError);
        throw updateError;
      }

      const updated = rowToBusiness(data as DbRow);
      setBusinesses((prev) => prev.map((b) => (b.id === id ? updated : b)));
      return updated;
    },
    []
  );

  /* ---- Delete ---- */
  const deleteBusiness = useCallback(async (id: string): Promise<void> => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("You must be signed in to delete a business.");
    }

    const { error: deleteError } = await supabase
      .from("businesses")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Delete failed:", deleteError);
      throw deleteError;
    }

    setBusinesses((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const value: Ctx = {
    businesses,
    filtered,
    categoryCounts,
    isLoading,
    error,
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
    updateBusiness,
    deleteBusiness,
  };

  return <BusinessCtx.Provider value={value}>{children}</BusinessCtx.Provider>;
}

export function useBusiness() {
  const ctx = useContext(BusinessCtx);
  if (!ctx) throw new Error("useBusiness must be used inside <BusinessProvider>");
  return ctx;
}