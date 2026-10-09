import { CATEGORIES, DEMO_BUSINESSES } from "./data";
import type { Category } from "./types";
import { slugify } from "./slugify";

/** "Restaurants & Food" → "restaurants-food" */
export function getCategorySlug(name: string): string {
  return slugify(name);
}

/** Look up a category by its slug (server-safe) */
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => getCategorySlug(c.name) === slug);
}

/** All category slugs — used for static generation */
export function getAllCategorySlugs(): string[] {
  return CATEGORIES.map((c) => getCategorySlug(c.name));
}

/** Static count of demo businesses per category */
export function getDemoBusinessCount(categoryName: string): number {
  return DEMO_BUSINESSES.filter((b) => b.category === categoryName).length;
}