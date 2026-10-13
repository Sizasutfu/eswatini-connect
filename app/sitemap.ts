import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { getAllCategorySlugs } from "@/lib/categoryUtils";

/**
 * Regenerate the sitemap at most once per hour.
 * New submissions appear within an hour without a redeploy.
 */
export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://eswatiniconnect.example");

interface SlugRow {
  slug: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/explore`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/map`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategorySlugs().map((slug) => ({
    url: `${SITE_URL}/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  /* ---- Fetch businesses from Supabase ----
     Uses a plain anon client (no cookies) so this works in a static
     context. The `Public can read businesses` RLS policy allows reads. */
  let businessRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data, error } = await supabase
      .from("businesses")
      .select("slug")
      .order("created_at", { ascending: false });

    if (!error && data) {
      businessRoutes = (data as SlugRow[]).map((b) => ({
        url: `${SITE_URL}/business/${b.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    } else if (error) {
      console.error("Sitemap: failed to fetch businesses", error);
    }
  } catch (err) {
    console.error("Sitemap: unexpected error", err);
  }

  return [...staticRoutes, ...categoryRoutes, ...businessRoutes];
}