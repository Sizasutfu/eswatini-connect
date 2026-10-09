/**
 * Turns a business name into a URL-safe slug.
 * "Green Valley Garden Supplies" → "green-valley-garden-supplies"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")   // strip accents
    .replace(/[^a-z0-9\s-]/g, "")      // keep letters, digits, spaces, dashes
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}