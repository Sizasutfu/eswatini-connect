import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BusinessProvider } from "@/context/BusinessContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListBusinessModal from "@/components/ListBusinessModal";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* Used to build absolute URLs for canonical/OG tags. */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"   // ← was 3000
    : "https://eswatiniconnect.example");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Eswatini Connect — Discover Local. Connect Easily.",
    template: "%s | Eswatini Connect",
  },
  description:
    "A modern directory for discovering local businesses, service providers, and entrepreneurs across Eswatini.",
  applicationName: "Eswatini Connect",
  keywords: [
    "Eswatini",
    "Swaziland",
    "local businesses",
    "business directory",
    "services",
    "Manzini",
    "Mbabane",
    "Ezulwini",
    "Nhlangano",
  ],
  authors: [{ name: "Eswatini Connect" }],
  openGraph: {
    type: "website",
    siteName: "Eswatini Connect",
    title: "Eswatini Connect — Discover Local. Connect Easily.",
    description:
      "Discover trusted local businesses and service providers across Eswatini.",
    locale: "en_SZ",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Eswatini Connect",
    description:
      "Discover trusted local businesses and service providers across Eswatini.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <BusinessProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ListBusinessModal />
        </BusinessProvider>
      </body>
    </html>
  );
}