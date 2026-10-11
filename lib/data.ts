/**
 * Barrel file — re-exports from the split modules so existing imports
 * across the app (`@/lib/data`) keep working without changes.
 *
 * - lib/businesses.ts — pure data (no JSX, safe for Node scripts)
 * - lib/categories.tsx — category definitions with JSX icons
 */

export {
  TOWNS,
  TOWN_CENTERS,
  LS_KEY,
  DEMO_BUSINESSES,
  getDemoBusinessBySlug,
  getDemoSlugs,
  getTownCenter,
} from "./businesses";

export type { Town } from "./businesses";

export { CATEGORIES } from "./categories";