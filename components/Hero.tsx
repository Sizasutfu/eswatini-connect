"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useBusiness } from "@/context/BusinessContext";
import BusinessImage from "./BusinessImage";
import { TOWNS } from "@/lib/data";

export default function Hero() {
  const router = useRouter();
  const { setKeyword, setLocation } = useBusiness();
  const [kw, setKw] = useState("");
  const [loc, setLoc] = useState("all");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setKeyword(kw);
    setLocation(loc);
    router.push("/explore");
  }

  return (
    <section className="hero relative py-24 md:py-20 pb-16 bg-brand-soft
      [background-image:radial-gradient(1100px_500px_at_80%_-10%,rgba(217,164,4,0.10),transparent_60%),radial-gradient(900px_500px_at_-10%_30%,rgba(11,93,59,0.07),transparent_55%)]">
      <div className="container grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
        <div>
          <span className="inline-block px-3.5 py-1.5 bg-white border border-brand-line rounded-full text-xs font-semibold text-brand-green mb-4">
            🇸🇿 Eswatini&apos;s local business directory
          </span>
          <h1 className="text-[2.1rem] sm:text-[2.7rem] lg:text-[3.4rem] font-bold tracking-tight text-brand-ink mb-4">
            Find the Right Services, Right Here in Eswatini.
          </h1>
          <p className="text-[1.08rem] text-brand-muted max-w-[540px] mb-6">
            Discover trusted local businesses, explore services near you, and
            connect with the people who make our communities thrive.
          </p>

          <form
            onSubmit={onSubmit}
            role="search"
            aria-label="Search businesses"
            className="bg-white border border-brand-line rounded-brand-lg p-3 shadow-hero mb-4"
          >
            <div className="grid sm:grid-cols-[1.4fr_1fr_auto] gap-2">
              <div className="field">
                <label htmlFor="heroKeyword" className="sr-only">
                  Search keyword
                </label>
                <svg
                  className="text-brand-muted shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  id="heroKeyword"
                  type="text"
                  placeholder="What service are you looking for?"
                  autoComplete="off"
                  value={kw}
                  onChange={(e) => setKw(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="heroLocation" className="sr-only">
                  Location
                </label>
                <svg
                  className="text-brand-muted shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <select
                  id="heroLocation"
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                >
                  <option value="all">All Locations</option>
                  {TOWNS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                Find Services
              </button>
            </div>
          </form>

          <p className="flex items-center gap-2 text-sm text-brand-muted">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-brand-green shrink-0"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Discover local businesses. Support local entrepreneurs.
          </p>
        </div>

        <div
          className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px]"
          aria-hidden="true"
        >
          <div className="relative w-full h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[440px]">
            <div className="absolute rounded-brand-lg shadow-hero border-2 sm:border-4 border-white overflow-hidden bg-brand-soft w-[72%] h-[78%] top-[8%] left-0">
              <BusinessImage
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
                alt=""
                priority
                sizes="(max-width:820px) 70vw, 40vw"
              />
            </div>
            <div className="absolute rounded-brand-lg shadow-hero border-2 sm:border-4 border-white overflow-hidden bg-brand-soft w-[44%] h-[40%] top-0 right-0">
              <BusinessImage
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80"
                alt=""
                priority
                sizes="(max-width:820px) 40vw, 22vw"
              />
            </div>
            <div className="absolute rounded-brand-lg shadow-hero border-2 sm:border-4 border-white overflow-hidden bg-brand-soft w-[46%] h-[44%] bottom-0 right-[4%]">
              <BusinessImage
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80"
                alt=""
                priority
                sizes="(max-width:820px) 40vw, 22vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}