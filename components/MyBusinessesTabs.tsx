"use client";

import { useState } from "react";
import MyBusinesses from "./MyBusinesses";
import OwnerInbox from "./OwnerInbox";

type Tab = "listings" | "inbox";

export default function MyBusinessesTabs() {
  const [tab, setTab] = useState<Tab>("listings");

  const tabCls = (active: boolean) =>
    "px-4 sm:px-5 py-3 text-sm font-medium border-b-2 -mb-px transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold " +
    "focus-visible:ring-offset-2 dark:focus-visible:ring-offset-night-bg " +
    (active
      ? "border-brand-green text-brand-green dark:border-brand-gold dark:text-brand-gold"
      : "border-transparent text-brand-muted hover:text-brand-ink dark:text-night-muted dark:hover:text-night-heading");

  return (
    <>
      <div
        role="tablist"
        aria-label="My businesses tabs"
        className="flex border-b border-brand-line dark:border-night-line mb-8"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "listings"}
          aria-controls="tab-listings"
          onClick={() => setTab("listings")}
          className={tabCls(tab === "listings")}
        >
          My Listings
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "inbox"}
          aria-controls="tab-inbox"
          onClick={() => setTab("inbox")}
          className={tabCls(tab === "inbox")}
        >
          Inbox
        </button>
      </div>

      <div
        role="tabpanel"
        id="tab-listings"
        hidden={tab !== "listings"}
      >
        {tab === "listings" && <MyBusinesses />}
      </div>

      <div
        role="tabpanel"
        id="tab-inbox"
        hidden={tab !== "inbox"}
      >
        {tab === "inbox" && <OwnerInbox />}
      </div>
    </>
  );
}