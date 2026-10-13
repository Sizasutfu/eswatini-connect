import { createClient } from "./server";

export interface PlatformStats {
  businesses: number;
  categories: number;
  towns: number;
  featured: number;
}

/**
 * Fetch live platform statistics from Supabase.
 * One query, minimal columns, computed server-side.
 *
 * Falls back to zeros if the query fails — never throws.
 */
export async function getPlatformStats(): Promise<PlatformStats> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("businesses")
      .select("category, location, featured");

    if (error || !data) {
      console.error("getPlatformStats failed:", error);
      return { businesses: 0, categories: 0, towns: 0, featured: 0 };
    }

    const categories = new Set<string>();
    const towns = new Set<string>();
    let featured = 0;

    for (const row of data as { category: string; location: string; featured: boolean }[]) {
      if (row.category) categories.add(row.category);
      if (row.location) towns.add(row.location);
      if (row.featured) featured++;
    }

    return {
      businesses: data.length,
      categories: categories.size,
      towns: towns.size,
      featured,
    };
  } catch (err) {
    console.error("getPlatformStats unexpected error:", err);
    return { businesses: 0, categories: 0, towns: 0, featured: 0 };
  }
}