import type { MetadataRoute } from "next";
import { DEMO_BUSINESSES } from "@/lib/data";
import { getAllCategorySlugs } from "@/lib/categoryUtils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://eswatiniconnect.example");

export default function sitemap(): MetadataRoute.Sitemap {
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

  const businessRoutes: MetadataRoute.Sitemap = DEMO_BUSINESSES.map((b) => ({
    url: `${SITE_URL}/business/${b.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...businessRoutes];
}