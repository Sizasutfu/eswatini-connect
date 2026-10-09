"use client";

import type { MouseEvent } from "react";
import { useFavourites } from "@/context/FavouritesContext";

interface Props {
  slug: string;
  businessName?: string;
  size?: "sm" | "md";
  variant?: "icon" | "text";
  className?: string;
}

export default function FavouriteButton({
  slug,
  businessName,
  size = "md",
  variant = "icon",
  className,
}: Props) {
  const { isFavourite, toggle, hydrated } = useFavourites();
  const active = hydrated && isFavourite(slug);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Prevent parent Links from navigating when the heart is inside them
    e.preventDefault();
    e.stopPropagation();
    toggle(slug);
  };

  const label = active
    ? `Remove ${businessName ?? "business"} from saved`
    : `Save ${businessName ?? "business"}`;

  /* ---------- Icon variant ---------- */
  if (variant === "icon") {
    const dim = size === "sm" ? "w-9 h-9" : "w-11 h-11";
    const iconSize = size === "sm" ? 16 : 20;

    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={label}
        aria-pressed={active}
        title={label}
        className={`${dim} inline-flex items-center justify-center rounded-full border transition
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
          dark:focus-visible:ring-offset-night-surface
          ${
            active
              ? "bg-brand-gold text-brand-ink border-brand-gold hover:brightness-95"
              : "bg-white/90 text-brand-ink border-brand-line hover:border-brand-gold hover:text-brand-gold dark:bg-night-elevated/90 dark:border-night-line dark:text-night-heading dark:hover:border-brand-gold dark:hover:text-brand-gold"
          }
          ${className ?? ""}`}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    );
  }

  /* ---------- Text variant ---------- */
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      className={`btn ${
        active ? "btn-gold" : "btn-outline"
      } ${className ?? ""}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {active ? "Saved" : "Save"}
    </button>
  );
}