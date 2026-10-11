import type { Category } from "./types";

/* ---------- Inline SVG icon helpers ---------- */
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

export const CATEGORIES: Category[] = [
  { name: "Restaurants & Food",       desc: "Dining, takeaways & catering", icon: <RestaurantIcon /> },
  { name: "Home Services",            desc: "Trades, repairs & maintenance", icon: <HomeIcon /> },
  { name: "Automotive",               desc: "Car care, parts & repairs",     icon: <CarIcon /> },
  { name: "Beauty & Wellness",        desc: "Salons, spas & wellbeing",      icon: <BeautyIcon /> },
  { name: "Technology & Electronics", desc: "IT, gadgets & repairs",         icon: <TechIcon /> },
  { name: "Shopping & Retail",        desc: "Shops, stores & markets",       icon: <ShopIcon /> },
  { name: "Professional Services",    desc: "Consulting, legal & finance",   icon: <BriefcaseIcon /> },
  { name: "Agriculture & Farming",    desc: "Farming supplies & services",   icon: <LeafIcon /> },
];