import type { MetadataRoute } from "next";
import { DEMO_BUSINESSES } from "@/lib/data";

/**
 * Base URL used for all absolute links in the sitemap.
 * Falls back to a placeholder so builds don't fail if the env var
 * isn't set yet.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://eswatiniconnect.example";

/**
 * Auto-generated /sitemap.xml
 * Includes home, /explore, and every demo business detail page.
 *
 * Note: local submissions (from localStorage) are per-browser and
 * cannot be listed here — that's expected for a prototype.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/explore`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const businessRoutes: MetadataRoute.Sitemap = DEMO_BUSINESSES.map((b) => ({
    url: `${SITE_URL}/business/${b.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...businessRoutes];
}