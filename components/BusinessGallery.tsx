"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BusinessImage from "./BusinessImage";

interface Props {
  images: string[];
  businessName: string;
}

/**
 * Thumbnail grid + full-screen lightbox.
 * - Click a thumbnail to open the lightbox at that image.
 * - Esc closes; ← / → navigate.
 * - Click the backdrop to close.
 * - Focus returns to the trigger on close.
 */
export default function BusinessGallery({ images, businessName }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* Lock scroll + keyboard nav while lightbox is open */
  useEffect(() => {
    if (openIndex === null) return;

    lastFocusedRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      else if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      else if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? i : (i - 1 + images.length) % images.length
        );
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      (lastFocusedRef.current as HTMLElement | null)?.focus?.();
    };
  }, [openIndex, images.length]);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  if (!images || images.length === 0) return null;

  const gridClass =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
      ? "grid-cols-2"
      : images.length === 3
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 md:grid-cols-4";

  return (
    <>
      {/* Thumbnails */}
      <section aria-label="Photo gallery" className="mb-10">
        <h2 className="text-base font-semibold text-brand-ink mb-3 dark:text-night-heading">
          Photo Gallery
        </h2>
        <div className={`grid ${gridClass} gap-3`}>
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open photo ${i + 1} of ${images.length}`}
              className="group relative aspect-square overflow-hidden rounded-brand-md
                bg-brand-soft dark:bg-night-elevated
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold
                focus-visible:ring-offset-2 dark:focus-visible:ring-offset-night-bg"
            >
              <BusinessImage
                src={src}
                alt={`${businessName} photo ${i + 1}`}
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <svg
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                  <path d="M11 8v6M8 11h6" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {mounted && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${openIndex + 1} of ${images.length}: ${businessName}`}
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center
            bg-slate-950/95 backdrop-blur-sm animate-fadeIn p-4 sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Close */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-4 right-4 z-10 w-11 h-11 inline-flex items-center justify-center
              rounded-full bg-white/10 text-white border border-white/20 backdrop-blur
              hover:bg-white/20 transition
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11
                inline-flex items-center justify-center rounded-full
                bg-white/10 text-white border border-white/20 backdrop-blur
                hover:bg-white/20 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11
                inline-flex items-center justify-center rounded-full
                bg-white/10 text-white border border-white/20 backdrop-blur
                hover:bg-white/20 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Main image */}
          <div className="relative w-full max-w-5xl h-[60vh] sm:h-[72vh] rounded-brand-lg overflow-hidden shadow-2xl">
            <BusinessImage
              src={images[openIndex]}
              alt={`${businessName} photo ${openIndex + 1}`}
              priority
              sizes="(max-width:1024px) 100vw, 1024px"
              className="object-contain"
            />
          </div>

          {/* Counter */}
          <div className="mt-4 text-white/80 text-sm font-medium" aria-hidden="true">
            {openIndex + 1} / {images.length}
          </div>

          {/* Thumbnails strip (desktop) */}
          {images.length > 1 && (
            <div className="hidden sm:flex items-center gap-2 mt-4">
              {images.map((src, i) => (
                <button
                  key={`thumb-${src}-${i}`}
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`relative w-14 h-14 rounded-md overflow-hidden transition
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold
                    ${
                      i === openIndex
                        ? "ring-2 ring-brand-gold ring-offset-2 ring-offset-slate-950"
                        : "opacity-60 hover:opacity-100"
                    }`}
                >
                  <BusinessImage src={src} alt="" sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}