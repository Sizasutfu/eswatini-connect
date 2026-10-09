"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { openListModal } = useBusiness();

  const navLink =
    "block md:inline-block py-4 md:py-1.5 text-sm font-medium text-brand-body " +
    "border-b border-brand-line md:border-0 transition-colors " +
    "hover:text-brand-green " +
    "dark:text-night-text dark:border-night-line dark:hover:text-brand-gold " +
    "bg-transparent text-left w-full md:w-auto";

  const closeMenu = () => setOpen(false);

  const handleSearchClick = () => {
    closeMenu();
    if (pathname === "/") {
      document.getElementById("heroKeyword")?.focus();
      document.querySelector(".hero")?.scrollIntoView({ behavior: "smooth" });
    } else if (pathname === "/explore") {
      const input = document.getElementById("filterKeyword");
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      window.location.href = "/explore";
    }
  };

  const handleListBusiness = () => {
    closeMenu();
    openListModal();
  };

  return (
    <header
      className="sticky top-0 z-[100] bg-white/92 backdrop-blur border-b border-brand-line
        dark:bg-night-bg/85 dark:border-night-line"
    >
      <div className="container flex items-center justify-between gap-4 h-[72px]">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-base text-brand-ink shrink-0 dark:text-night-heading"
          onClick={closeMenu}
        >
          <svg
            viewBox="0 0 40 40"
            width="36"
            height="36"
            aria-hidden="true"
            className="rounded-[10px] shrink-0"
          >
            <rect width="40" height="40" rx="10" fill="#0b5d3b" />
            <path
              d="M12 26 L20 12 L28 26"
              stroke="#d9a404"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="20" cy="30" r="2.2" fill="#d9a404" />
          </svg>
          <span>
            Eswatini{" "}
            <span className="text-brand-green dark:text-brand-gold">
              Connect
            </span>
          </span>
        </Link>

        <nav
          id="navLinks"
          aria-label="Main navigation"
          className={`md:flex md:items-center md:gap-5
            fixed md:static left-0 right-0 top-[72px] md:top-auto
            bg-white md:bg-transparent dark:bg-night-surface md:dark:bg-transparent
            flex-col md:flex-row items-stretch md:items-center gap-0 md:gap-5
            px-6 md:px-0 pb-5 md:pb-0 pt-3 md:pt-0
            border-b md:border-0 border-brand-line dark:border-night-line
            shadow-card md:shadow-none dark:md:shadow-none
            transition-all duration-200
            ${
              open
                ? "flex translate-y-0 opacity-100 visible"
                : "hidden md:flex -translate-y-3 opacity-0 md:opacity-100 invisible md:visible"
            }`}
        >
          <Link href="/" className={navLink} onClick={closeMenu}>
            Home
          </Link>
          <Link href="/explore" className={navLink} onClick={closeMenu}>
            Explore Businesses
          </Link>
          <Link href="/map" className={navLink} onClick={closeMenu}>
            Map
          </Link>
          <Link href="/categories" className={navLink} onClick={closeMenu}>
            Categories
          </Link>
          <button
            type="button"
            className={`${navLink} border-b-0 md:border-0`}
            onClick={handleListBusiness}
          >
            List Your Business
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            aria-label="Jump to search"
            className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full border border-brand-line bg-white text-brand-ink transition
              hover:border-brand-green hover:text-brand-green
              dark:bg-night-surface dark:text-night-heading dark:border-night-line
              dark:hover:border-brand-gold dark:hover:text-brand-gold"
            onClick={handleSearchClick}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={handleListBusiness}
            className="btn btn-primary btn-sm hidden md:inline-flex"
          >
            List Your Business
          </button>

          <button
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-[42px] h-[42px] px-2.5
              bg-transparent border border-brand-line rounded-brand-sm
              dark:border-night-line"
          >
            <span
              className={`block h-0.5 bg-brand-ink dark:bg-night-heading rounded transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 bg-brand-ink dark:bg-night-heading rounded transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-brand-ink dark:bg-night-heading rounded transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
