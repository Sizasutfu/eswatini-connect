import type { Business, Category } from "./types";

/* ---------- Inline SVG icons ---------- */
const svg = (children: React.ReactNode) => (
  <svg
    width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true"
  >
    {children}
  </svg>
);

const RestaurantIcon = () =>
  svg(
    <>
      <path d="M3 2v7a3 3 0 0 0 3 3v10" />
      <path d="M6 2v7" />
      <path d="M9 2v7a3 3 0 0 1-3 3" />
      <path d="M18 2c-1.5 0-3 2-3 5s1.5 4 3 4v11" />
    </>
  );
const HomeIcon = () =>
  svg(
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </>
  );
const CarIcon = () =>
  svg(
    <>
      <path d="M5 16l1.5-5A2 2 0 0 1 8.4 9.5h7.2A2 2 0 0 1 17.5 11L19 16" />
      <rect x="3" y="15" width="18" height="5" rx="1.5" />
      <circle cx="7" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </>
  );
const BeautyIcon = () =>
  svg(
    <>
      <path d="M12 3c-1 2-2 3-2 5a2 2 0 0 0 4 0c0-2-1-3-2-5z" />
      <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
    </>
  );
const TechIcon = () =>
  svg(
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  );
const ShopIcon = () =>
  svg(
    <>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="M9 13h6" />
    </>
  );
const BriefcaseIcon = () =>
  svg(
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>
  );
const LeafIcon = () =>
  svg(
    <>
      <path d="M20 4S8 4 5 12c-2 5 0 8 0 8s3 2 8 0c8-3 7-16 7-16z" />
      <path d="M5 20c3-6 8-9 8-9" />
    </>
  );

/* ---------- Categories ---------- */
export const CATEGORIES: Category[] = [
  { name: "Restaurants & Food", desc: "Dining, takeaways & catering", icon: <RestaurantIcon /> },
  { name: "Home Services", desc: "Trades, repairs & maintenance", icon: <HomeIcon /> },
  { name: "Automotive", desc: "Car care, parts & repairs", icon: <CarIcon /> },
  { name: "Beauty & Wellness", desc: "Salons, spas & wellbeing", icon: <BeautyIcon /> },
  { name: "Technology & Electronics", desc: "IT, gadgets & repairs", icon: <TechIcon /> },
  { name: "Shopping & Retail", desc: "Shops, stores & markets", icon: <ShopIcon /> },
  { name: "Professional Services", desc: "Consulting, legal & finance", icon: <BriefcaseIcon /> },
  { name: "Agriculture & Farming", desc: "Farming supplies & services", icon: <LeafIcon /> },
];

/* ---------- Eswatini town centers (approximate) ---------- */
export const TOWNS = ["Manzini", "Mbabane", "Ezulwini", "Nhlangano"] as const;
export type Town = (typeof TOWNS)[number];

export const TOWN_CENTERS: Record<Town, { lat: number; lng: number }> = {
  Manzini:   { lat: -26.4833, lng: 31.3667 },
  Mbabane:   { lat: -26.3167, lng: 31.1333 },
  Ezulwini:  { lat: -26.4167, lng: 31.2000 },
  Nhlangano: { lat: -27.1167, lng: 31.2000 },
};

/* ---------- Demo businesses (fictional) ---------- */
export const DEMO_BUSINESSES: Business[] = [
  {
    id: "biz-01",
    slug: "green-valley-garden-supplies",
    name: "Green Valley Garden Supplies",
    category: "Agriculture & Farming",
    location: "Manzini",
    lat: -26.4810,
    lng: 31.3620,
    shortDesc:
      "Nursery, seeds, compost, and friendly advice for home and commercial gardens.",
    description:
      "Green Valley Garden Supplies is a community nursery offering seedlings, compost, tools, and expert gardening guidance. We help farmers, landscapers, and home gardeners get the right supplies for every season.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=80",
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1200&q=80",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80",
    ],
    featured: true,
    phone: "+268 2404 1234",
    whatsapp: "26824041234",
    email: "hello@greenvalley.example",
    address: "Plot 42, Industrial Road, Manzini",
    hours: "Mon–Sat · 8:00 – 17:00",
    services: "Seedlings · Compost · Tools · Garden advisory",
  },
  {
    id: "biz-02",
    slug: "royal-auto-care",
    name: "Royal Auto Care",
    category: "Automotive",
    location: "Mbabane",
    lat: -26.3130,
    lng: 31.1390,
    shortDesc:
      "Full-service automotive repair, diagnostics, and maintenance workshop.",
    description:
      "Royal Auto Care is a trusted workshop offering diagnostics, servicing, and repairs for all major vehicle makes. We pride ourselves on transparent pricing and reliable turnaround.",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200&q=80",
    ],
    featured: false,
    phone: "+268 2404 2200",
    whatsapp: "26824042200",
    email: "service@royalautocare.example",
    address: "15 Mbabane Main Road, Mbabane",
    hours: "Mon–Fri · 7:30 – 17:30 · Sat · 8:00 – 13:00",
    services: "Diagnostics · Servicing · Brakes · Tyres",
  },
  {
    id: "biz-03",
    slug: "brightspark-electrical-services",
    name: "BrightSpark Electrical Services",
    category: "Home Services",
    location: "Ezulwini",
    lat: -26.4190,
    lng: 31.2020,
    shortDesc:
      "Licensed electricians for installations, repairs, and safety inspections.",
    description:
      "BrightSpark handles residential and commercial electrical work — from wiring and lighting installs to fault-finding and safety certificates. Reliable, punctual, and safety-first.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80",
    ],
    featured: true,
    phone: "+268 2404 3311",
    whatsapp: "26824043311",
    email: "info@brightspark.example",
    address: "8 Ezulwini Valley Drive, Ezulwini",
    hours: "Mon–Sat · 7:00 – 18:00",
    services: "Wiring · Lighting · Inspections · Repairs",
  },
  {
    id: "biz-04",
    slug: "fresh-harvest-market",
    name: "Fresh Harvest Market",
    category: "Shopping & Retail",
    location: "Nhlangano",
    lat: -27.1150,
    lng: 31.1980,
    shortDesc:
      "Fresh produce, pantry staples, and locally sourced goods daily.",
    description:
      "Fresh Harvest Market stocks fruit, vegetables, grains, and household essentials. We source from local farmers wherever possible to keep quality high and prices fair.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80",
      "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=1200&q=80",
      "https://images.unsplash.com/photo-1543168256-418811576931?w=1200&q=80",
    ],
    featured: false,
    phone: "+268 2404 4411",
    whatsapp: "26824044411",
    email: "shop@freshharvest.example",
    address: "Market Square, Nhlangano",
    hours: "Mon–Sun · 7:00 – 19:00",
    services: "Fresh produce · Pantry · Household · Local goods",
  },
  {
    id: "biz-05",
    slug: "techpoint-solutions",
    name: "TechPoint Solutions",
    category: "Technology & Electronics",
    location: "Manzini",
    lat: -26.4880,
    lng: 31.3720,
    shortDesc:
      "Computer repairs, networking, and IT support for homes and small business.",
    description:
      "TechPoint Solutions offers laptop and desktop repairs, network setup, data recovery, and ongoing IT support for small businesses and households across the Manzini region.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    ],
    featured: true,
    phone: "+268 2404 5522",
    whatsapp: "26824045522",
    email: "support@techpoint.example",
    address: "Suite 3, Corner Plaza, Manzini",
    hours: "Mon–Fri · 8:00 – 17:00 · Sat · 9:00 – 13:00",
    services: "Repairs · Networking · Data recovery · IT support",
  },
  {
    id: "biz-06",
    slug: "golden-plate-kitchen",
    name: "Golden Plate Kitchen",
    category: "Restaurants & Food",
    location: "Mbabane",
    lat: -26.3210,
    lng: 31.1280,
    shortDesc:
      "Warm, home-style cooking with a rotating daily menu and catering.",
    description:
      "Golden Plate Kitchen serves generous, freshly prepared meals in a cosy setting. We also cater for events, offices, and family gatherings across Mbabane.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80",
    ],
    featured: false,
    phone: "+268 2404 6633",
    whatsapp: "26824046633",
    email: "orders@goldenplate.example",
    address: "12 High Street, Mbabane",
    hours: "Mon–Sat · 10:00 – 21:00",
    services: "Dine-in · Takeaway · Catering · Event menus",
  },
  {
    id: "biz-07",
    slug: "bloom-beauty-studio",
    name: "Bloom Beauty Studio",
    category: "Beauty & Wellness",
    location: "Ezulwini",
    lat: -26.4140,
    lng: 31.1960,
    shortDesc:
      "Salon and wellness studio offering hair, skin, and relaxation treatments.",
    description:
      "Bloom Beauty Studio is a calm, welcoming space offering hair styling, skincare treatments, and wellness services. Bookings welcome — walk-ins subject to availability.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=1200&q=80",
      "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=1200&q=80",
    ],
    featured: false,
    phone: "+268 2404 7744",
    whatsapp: "26824047744",
    email: "bookings@bloombeauty.example",
    address: "22 Valley Centre, Ezulwini",
    hours: "Tue–Sun · 9:00 – 18:00",
    services: "Hair · Skincare · Massage · Wellness",
  },
  {
    id: "biz-08",
    slug: "proedge-consulting",
    name: "ProEdge Consulting",
    category: "Professional Services",
    location: "Manzini",
    lat: -26.4790,
    lng: 31.3760,
    shortDesc:
      "Business advisory, bookkeeping, and compliance support for SMEs.",
    description:
      "ProEdge Consulting supports small and growing businesses with practical advice: bookkeeping, tax readiness, and operational consulting tailored to the local market.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    ],
    featured: true,
    phone: "+268 2404 8855",
    whatsapp: "26824048855",
    email: "hello@proedge.example",
    address: "Office 5, Business Park, Manzini",
    hours: "Mon–Fri · 8:00 – 17:00",
    services: "Advisory · Bookkeeping · Compliance · Strategy",
  },
];

export const LS_KEY = "eswatini_connect_submissions_v1";

/** Find a demo business by slug (server-safe) */
export function getDemoBusinessBySlug(slug: string): Business | undefined {
  return DEMO_BUSINESSES.find((b) => b.slug === slug);
}

/** All demo slugs — used for static generation */
export function getDemoSlugs(): string[] {
  return DEMO_BUSINESSES.map((b) => b.slug);
}

/** Fallback coordinates for a town — used when a local submission has no lat/lng */
export function getTownCenter(town: string): { lat: number; lng: number } {
  if (town in TOWN_CENTERS) {
    return TOWN_CENTERS[town as Town];
  }
  // Default to Eswatini center
  return { lat: -26.5225, lng: 31.4659 };
}