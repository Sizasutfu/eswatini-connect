"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { useBusiness } from "@/context/BusinessContext";

export default function Footer() {
  const { selectCategory, openListModal } = useBusiness();
  const year = new Date().getFullYear();

  const linkCls = "text-sm text-white/70 hover:text-brand-gold transition-colors";
  const headingCls = "text-sm font-semibold text-white mb-4 tracking-wide";

  return (
    <footer className="bg-brand-deep text-white/75 pt-16 pb-5">
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 pb-12 border-b border-white/10">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-base text-white mb-4"
          >
            <svg
              viewBox="0 0 40 40"
              width="32"
              height="32"
              aria-hidden="true"
              className="rounded-[10px]"
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
              Eswatini <span className="text-brand-gold">Connect</span>
            </span>
          </Link>
          <p className="text-sm mb-5 max-w-[320px]">
            Discover local. Connect easily. A modern directory for Eswatini&apos;s
            businesses and service providers.
          </p>
          <div className="flex gap-2">
            {[
              {
                label: "Facebook",
                d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                fill: true,
              },
              {
                label: "Instagram",
                d: "M2 2h20v20H2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
                fill: false,
              },
              {
                label: "X",
                d: "M18.9 2H22l-7.2 8.2L23 22h-6.8l-5.3-7-6 7H2l7.7-8.8L1.5 2h6.9l4.8 6.4L18.9 2z",
                fill: true,
              },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={`${s.label} placeholder`}
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/[0.07] text-white hover:bg-brand-gold hover:text-brand-ink transition"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={s.fill ? "currentColor" : "none"}
                  stroke={s.fill ? "none" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className={headingCls}>Quick Links</h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/" className={linkCls}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/explore" className={linkCls}>
                Explore Businesses
              </Link>
            </li>
            <li>
              <Link href="/#categories" className={linkCls}>
                Categories
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={openListModal}
                className={`${linkCls} bg-transparent text-left`}
              >
                List Your Business
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={headingCls}>Popular Categories</h4>
          <ul className="flex flex-col gap-2">
            {CATEGORIES.slice(0, 5).map((c) => (
              <li key={c.name}>
                <Link
                  href="/explore"
                  onClick={() => selectCategory(c.name)}
                  className={linkCls}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={headingCls}>Contact (Placeholder)</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li>hello@eswatiniconnect.example</li>
            <li>+268 2400 0000</li>
            <li>Mbabane, Eswatini</li>
          </ul>
        </div>
      </div>

      <div className="container pt-5 text-center text-xs text-white/50">
        <p>
          © {year} Eswatini Connect. Demonstration prototype — sample data only.
        </p>
      </div>
    </footer>
  );
}