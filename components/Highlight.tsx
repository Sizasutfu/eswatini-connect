"use client";

import { Fragment } from "react";

interface Props {
  /** The full text to search within */
  text: string;
  /** The query string to highlight (case-insensitive) */
  query: string;
  /** Optional className applied to the wrapping <mark> */
  className?: string;
}

/**
 * Highlights every occurrence of `query` inside `text` by wrapping it in a
 * <mark> tag. Case-insensitive. Safe — no dangerouslySetInnerHTML.
 * Renders the original text untouched when the query is empty.
 */
export default function Highlight({ text, query, className }: Props) {
  const q = query.trim();
  if (!q) return <>{text}</>;

  // Escape regex metacharacters so the query is treated literally
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");

  const parts = text.split(regex);
  const lowerQ = q.toLowerCase();

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === lowerQ ? (
          <mark
            key={i}
            className={
              "bg-brand-gold/35 text-brand-ink rounded-[3px] px-0.5 " +
              "dark:bg-brand-gold/40 dark:text-night-heading " +
              (className ?? "")
            }
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}