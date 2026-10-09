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

const RestaurantIcon = () => svg(
  <>
    <path d="M3 2v7a3 3 0 0 0 3 3v10" />
    <path d="M6 2v7" />
    <path d="M9 2v7a3 3 0 0 1-3 3" />
    <path d="M18 2c-1.5 0-3 2-3 5s1.5 4 3 4v11" />
  </>
);
const HomeIcon = () => svg(
  <>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M9 21v-6h6v6" />
  </>
);
const CarIcon = () => svg(
  <>
    <path d="M5 16l1.5-5A2 2 0 0 1 8.4 9.5h7.2A2 2 0 0 1 17.5 11L19 16" />
    <rect x="3" y="15" width="18" height="5" rx="1.5" />
    <circle cx="7" cy="20" r="1.4" />
    <circle cx="17" cy="20" r="1.4" />
  </>
);
const BeautyIcon = () => svg(
  <>
    <path d="M12 3c-1 2-2 3-2 5a2 2 0 0 0 4 0c0-2-1-3-2-5z" />
    <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
  </>
);
const TechIcon = () => svg(
  <>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </>
);
const ShopIcon = () => svg(
  <>
    <path d="M3 9l1.5-5h15L21 9" />
    <path d="M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <path d="M9 13h6" />
  </>
);
const BriefcaseIcon = () => svg(
  <>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 12h18" />
  </>
);
const LeafIcon = () => svg(
  <>
    <path d="M20 4S8 4 5 12c-2 5 0 8 0 8s3 2 8 0c8-3 7-16 7-16z" />
    <path d="M5 20c3-6 8-9 8-9" />
  </>
);

/* ---------- Categories ---------- */
export const CATEGORIES: Category[] = [
  { name: "Restaurants & Food",        desc: "Dining, takeaways & catering",      icon: <RestaurantIcon /> },
  { name: "Home Services",             desc: "Trades, repairs & maintenance",     icon: <HomeIcon /> },
  { name: "Automotive",                desc: "Car care, parts & repairs",         icon: <CarIcon /> },
  { name: "Beauty & Wellness",         desc: "Salons, spas & wellbeing",          icon: <BeautyIcon /> },
  { name: "Technology & Electronics",  desc: "IT, gadgets & repairs",             icon: <TechIcon /> },
  { name: "Shopping & Retail",         desc: "Shops, stores & markets",           icon: <ShopIcon /> },
  { name: "Professional Services",     desc: "Consulting, legal & finance",       icon: <BriefcaseIcon /> },
  { name: "Agriculture & Farming",     desc: "Farming supplies & services",       icon: <LeafIcon /> }
];

/* ---------- Demo businesses (fictional) ---------- */
export const DEMO_BUSINESSES: Business[] = [
  {
    id: "biz-01",
    name: "Green Valley Garden Supplies",
    category: "Agriculture & Farming",
    location: "Manzini",
    shortDesc: "Nursery, seeds, compost, and friendly advice for home and commercial gardens.",
    description:
      "Green Valley Garden Supplies is a community nursery offering seedlings, compost, tools, and expert gardening guidance. We help farmers, landscapers, and home gardeners get the right supplies for every season.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    featured: true,
    phone: "+268 2404 1234",
    whatsapp: "26824041234",
    email: "hello@greenvalley.example",
    address: "Plot 42, Industrial Road, Manzini",
    hours: "Mon–Sat · 8:00 – 17:00",
    services: "Seedlings · Compost · Tools · Garden advisory"
  },
  {
    id: "biz-02",
    name: "Royal Auto Care",
    category: "Automotive",
    location: "Mbabane",
    shortDesc: "Full-service automotive repair, diagnostics, and maintenance workshop.",
    description:
      "Royal Auto Care is a trusted workshop offering diagnostics, servicing, and repairs for all major vehicle makes. We pride ourselves on transparent pricing and reliable turnaround.",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
    featured: false,
    phone: "+268 2404 2200",
    whatsapp: "26824042200",
    email: "service@royalautocare.example",
    address: "15 Mbabane Main Road, Mbabane",
    hours: "Mon–Fri · 7:30 – 17:30 · Sat · 8:00 – 13:00",
    services: "Diagnostics · Servicing · Brakes · Tyres"
  },
  {
    id: "biz-03",
    name: "BrightSpark Electrical Services",
    category: "Home Services",
    location: "Ezulwini",
    shortDesc: "Licensed electricians for installations, repairs, and safety inspections.",
    description:
      "BrightSpark handles residential and commercial electrical work — from wiring and lighting installs to fault-finding and safety certificates. Reliable, punctual, and safety-first.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    featured: true,
    phone: "+268 2404 3311",
    whatsapp: "26824043311",
    email: "info@brightspark.example",
    address: "8 Ezulwini Valley Drive, Ezulwini",
    hours: "Mon–Sat · 7:00 – 18:00",
    services: "Wiring · Lighting · Inspections · Repairs"
  },
  {
    id: "biz-04",
    name: "Fresh Harvest Market",
    category: "Shopping & Retail",
    location: "Nhlangano",
    shortDesc: "Fresh produce, pantry staples, and locally sourced goods daily.",
    description:
      "Fresh Harvest Market stocks fruit, vegetables, grains, and household essentials. We source from local farmers wherever possible to keep quality high and prices fair.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    featured: false,
    phone: "+268 2404 4411",
    whatsapp: "26824044411",
    email: "shop@freshharvest.example",
    address: "Market Square, Nhlangano",
    hours: "Mon–Sun · 7:00 – 19:00",
    services: "Fresh produce · Pantry · Household · Local goods"
  },
  {
    id: "biz-05",
    name: "TechPoint Solutions",
    category: "Technology & Electronics",
    location: "Manzini",
    shortDesc: "Computer repairs, networking, and IT support for homes and small business.",
    description:
      "TechPoint Solutions offers laptop and desktop repairs, network setup, data recovery, and ongoing IT support for small businesses and households across the Manzini region.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    featured: true,
    phone: "+268 2404 5522",
    whatsapp: "26824045522",
    email: "support@techpoint.example",
    address: "Suite 3, Corner Plaza, Manzini",
    hours: "Mon–Fri · 8:00 – 17:00 · Sat · 9:00 – 13:00",
    services: "Repairs · Networking · Data recovery · IT support"
  },
  {
    id: "biz-06",
    name: "Golden Plate Kitchen",
    category: "Restaurants & Food",
    location: "Mbabane",
    shortDesc: "Warm, home-style cooking with a rotating daily menu and catering.",
    description:
      "Golden Plate Kitchen serves generous, freshly prepared meals in a cosy setting. We also cater for events, offices, and family gatherings across Mbabane.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    featured: false,
    phone: "+268 2404 6633",
    whatsapp: "26824046633",
    email: "orders@goldenplate.example",
    address: "12 High Street, Mbabane",
    hours: "Mon–Sat · 10:00 – 21:00",
    services: "Dine-in · Takeaway · Catering · Event menus"
  },
  {
    id: "biz-07",
    name: "Bloom Beauty Studio",
    category: "Beauty & Wellness",
    location: "Ezulwini",
    shortDesc: "Salon and wellness studio offering hair, skin, and relaxation treatments.",
    description:
      "Bloom Beauty Studio is a calm, welcoming space offering hair styling, skincare treatments, and wellness services. Bookings welcome — walk-ins subject to availability.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    featured: false,
    phone: "+268 2404 7744",
    whatsapp: "26824047744",
    email: "bookings@bloombeauty.example",
    address: "22 Valley Centre, Ezulwini",
    hours: "Tue–Sun · 9:00 – 18:00",
    services: "Hair · Skincare · Massage · Wellness"
  },
  {
    id: "biz-08",
    name: "ProEdge Consulting",
    category: "Professional Services",
    location: "Manzini",
    shortDesc: "Business advisory, bookkeeping, and compliance support for SMEs.",
    description:
      "ProEdge Consulting supports small and growing businesses with practical advice: bookkeeping, tax readiness, and operational consulting tailored to the local market.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: true,
    phone: "+268 2404 8855",
    whatsapp: "26824048855",
    email: "hello@proedge.example",
    address: "Office 5, Business Park, Manzini",
    hours: "Mon–Fri · 8:00 – 17:00",
    services: "Advisory · Bookkeeping · Compliance · Strategy"
  }
];

export const TOWNS = ["Manzini", "Mbabane", "Ezulwini", "Nhlangano"];
export const LS_KEY = "eswatini_connect_submissions_v1";