"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import type { Business } from "@/lib/types";
import BusinessCard from "./BusinessCard";
import EditBusinessModal from "./EditBusinessModal";
import DeleteBusinessModal from "./DeleteBusinessModal";

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

export default function MyBusinesses() {
  const { user, isLoading: authLoading } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<Business | null>(null);
  const [deleting, setDeleting] = useState<Business | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const supabase = createClient();
    let cancelled = false;

    (async () => {
      const { data, error: fetchError } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        setError("Could not load your businesses.");
        setBusinesses([]);
      } else {
        setBusinesses((data as DbRow[]).map(rowToBusiness));
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="py-16 text-center text-brand-muted dark:text-night-muted">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center px-5 py-16 bg-white border border-dashed rounded-brand-lg
        border-brand-line dark:bg-night-surface dark:border-night-line">
        <h2 className="text-[1.4rem] font-semibold mb-2 dark:text-night-heading">
          Sign in to view your businesses
        </h2>
        <p className="text-brand-muted mb-6 dark:text-night-muted">
          You need an account to submit and manage listings.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/auth/sign-in?next=/my-businesses" className="btn btn-primary">
            Sign in
          </Link>
          <Link href="/auth/sign-up?next=/my-businesses" className="btn btn-outline">
            Create account
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center px-5 py-16 text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="text-center px-5 py-16 bg-white border border-dashed rounded-brand-lg
        border-brand-line dark:bg-night-surface dark:border-night-line">
        <svg
          className="mx-auto mb-4 text-brand-muted dark:text-night-muted"
          width="56" height="56" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" aria-hidden="true"
        >
          <path d="M3 9l1.5-5h15L21 9" />
          <path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
          <path d="M9 13h6" />
        </svg>
        <h2 className="text-[1.4rem] font-semibold mb-2 dark:text-night-heading">
          You haven&apos;t submitted a business yet.
        </h2>
        <p className="text-brand-muted mb-6 dark:text-night-muted">
          Add your business and it will appear in the directory.
        </p>
        <Link href="/#list-business" className="btn btn-primary">
          Add Your Business
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((b) => (
          <div key={b.id} className="flex flex-col">
            <BusinessCard business={b} />
            <div className="flex gap-2 mt-3">
              <button
                type="button"
                onClick={() => setEditing(b)}
                className="btn btn-outline btn-sm flex-1"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="mr-1"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                Edit
              </button>
              <button
                type="button"
                onClick={() => setDeleting(b)}
                className="btn btn-sm flex-1
                  text-red-600 border border-red-200 bg-white
                  hover:border-red-400 hover:bg-red-50
                  dark:text-red-400 dark:bg-transparent dark:border-red-900/40
                  dark:hover:border-red-700 dark:hover:bg-red-900/20"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="mr-1"
                >
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <EditBusinessModal
        business={editing}
        onClose={() => setEditing(null)}
        onSaved={(updated) =>
          setBusinesses((prev) =>
            prev.map((b) => (b.id === updated.id ? updated : b))
          )
        }
      />

      <DeleteBusinessModal
        business={deleting}
        onClose={() => setDeleting(null)}
        onDeleted={(id) =>
          setBusinesses((prev) => prev.filter((b) => b.id !== id))
        }
      />
    </>
  );
}