/**
 * One-off seed script.
 * Run with:  npx tsx scripts/seed-businesses.ts
 */
import { createClient } from "@supabase/supabase-js";
import { DEMO_BUSINESSES } from "../lib/businesses";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

async function main() {
  const rows = DEMO_BUSINESSES.map((b) => ({
    slug: b.slug,
    name: b.name,
    category: b.category,
    location: b.location,
    lat: b.lat,
    lng: b.lng,
    short_desc: b.shortDesc,
    description: b.description,
    image: b.image,
    gallery: b.gallery ?? [],
    featured: b.featured,
    phone: b.phone,
    whatsapp: b.whatsapp,
    email: b.email,
    address: b.address,
    hours: b.hours,
    services: b.services,
    is_local: false,
  }));

  console.log(`Inserting ${rows.length} businesses...`);

  const { error } = await supabase
    .from("businesses")
    .upsert(rows, { onConflict: "slug" });

  if (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }

  console.log("✅ Seed complete.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });