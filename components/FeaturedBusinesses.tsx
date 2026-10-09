"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useBusiness } from "@/context/BusinessContext";
import type { Business } from "@/lib/types";
import BusinessCard from "./BusinessCard";

const MAX_FEATURED = 4;

export default function FeaturedBusinesses() {
  const { businesses } = useBusiness();

  const featured = businesses.filter((b) => b.featured);
  const others = businesses.filter((b) => !b.featured);
  const shown: Business[] = [...featured, ...others].slice(0, MAX_FEATURED);

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    const scrollLeft = track.scrollLeft;

    let closestIndex = 0;
    let closestDistance = Infinity;
    children.forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft - track.offsetLeft - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    setActiveIndex(closestIndex);
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateState();
    track.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      track.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState, shown.length]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(Math.max(index, 0), shown.length - 1);
    const card = track.children[clamped] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  const prev = () => scrollToIndex(activeIndex - 1);
  const next = () => scrollToIndex(activeIndex + 1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  if (shown.length === 0) return null;

  const navBtn =
    "w-11 h-11 inline-flex items-center justify-center rounded-full border transition " +
    "border-brand-line bg-white text-brand-ink " +
    "hover:border-brand-green hover:text-brand-green " +
    "dark:border-night-line dark:bg-night-surface dark:text-night-heading " +
    "dark:hover:border-brand-gold dark:hover:text-brand-gold " +
    "disabled:opacity-40 disabled:cursor-not-allowed " +
    "disabled:hover:border-brand-line disabled:hover:text-brand-ink " +
    "dark:disabled:hover:border-night-line dark:disabled:hover:text-night-heading";

  return (
    <section id="businesses" className="py-24 bg-brand-soft dark:bg-night-bg" aria-labelledby="biz-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="max-w-[640px]">
            <h2 id="biz-heading" className="text-[1.55rem] sm:text-[1.8rem] lg:text-[2.1rem] font-bold mb-2">
              Discover Local Businesses
            </h2>
            <p className="text-brand-muted text-[1.08rem] dark:text-night-muted">
              Swipe or scroll through a selection of featured businesses from across Eswatini.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button type="button" onClick={prev} disabled={!canScrollLeft}
              aria-label="Previous business" className={navBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button type="button" onClick={next} disabled={!canScrollRight}
              aria-label="Next business" className={navBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured businesses"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory overscroll-x-contain
            rounded-brand-lg
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-soft dark:focus-visible:ring-offset-night-bg"
        >
          {shown.map((b, i) => (
            <div
              key={b.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Business ${i + 1} of ${shown.length}`}
              className="shrink-0 snap-start w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
            >
              <BusinessCard business={b} />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Slide navigation">
          {shown.map((b, i) => (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${i + 1}: ${b.name}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex
                  ? "w-8 bg-brand-green dark:bg-brand-gold"
                  : "w-2 bg-brand-line hover:bg-brand-green/50 dark:bg-night-line dark:hover:bg-brand-gold/50"
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/explore" className="btn btn-outline">
            View All Businesses
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ml-2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}