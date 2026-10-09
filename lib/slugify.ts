/**
 * Turns a business name into a URL-safe slug.
 * "Green Valley Garden Supplies" → "green-valley-garden-supplies"
 *
 * Guarantees a non-empty result — falls back to a timestamp-based slug
 * if the input slugifies to "" (e.g. name was only special characters).
 */
export function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")   // strip accents
    .replace(/[^a-z0-9\s-]/g, "")      // keep letters, digits, spaces, dashes
    .replace(/\s+/g, "-")               // spaces → dashes
    .replace(/-+/g, "-")                // collapse multiple dashes
    .replace(/^-|-$/g, "");             // trim leading/trailing dashes

  return slug || `business-${Date.now().toString(36)}`;
}