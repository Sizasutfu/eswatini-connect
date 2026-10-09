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

export const metadata: Metadata = {
  title: "Eswatini Connect — Discover Local. Connect Easily.",
  description:
    "A modern directory for discovering local businesses, service providers, and entrepreneurs across Eswatini.",
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