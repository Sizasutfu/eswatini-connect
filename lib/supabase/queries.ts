import { createClient } from "./server";
import type { Business } from "@/lib/types";

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

/** Map a DB row to our app's Business shape */
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

/** Fetch every business (server-side, cached by Next.js) */
export async function getAllBusinesses(): Promise<Business[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllBusinesses failed:", error);
    return [];
  }
  return (data as DbRow[]).map(rowToBusiness);
}

/** Fetch a single business by slug (server-side) */
export async function getBusinessBySlug(
  slug: string
): Promise<Business | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return rowToBusiness(data as DbRow);
}