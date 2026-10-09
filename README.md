# Eswatini Connect 🇸🇿

> **Discover Local. Connect Easily.**

A modern, responsive business directory for discovering local businesses, service
providers, and entrepreneurs across Eswatini.

This is a **frontend-only prototype** built to demonstrate the product experience
before backend development. All listings are fictional demonstration data.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Demo Data & Limitations](#demo-data--limitations)
- [How the Interactive Flows Work](#how-the-interactive-flows-work)
- [SEO](#seo)
- [Accessibility](#accessibility)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

Eswatini Connect is a directory platform where visitors can:

- **Discover** local businesses across Manzini, Mbabane, Ezulwini, and Nhlangano
- **Search** by keyword, category, or town — with shareable, bookmarkable URLs
- **Explore** detailed business pages with contact info, services, and hours
- **List** a business via a validated submission form (stored locally for the demo)

The interface follows a clean, modern visual language: deep green primary,
warm gold accents, rounded cards, subtle shadows, and generous spacing.

Everything runs **without a backend, database, or API**. Demo business data
lives in `lib/data.tsx`, and user submissions persist in the browser via
`localStorage`.

---

## Tech Stack

| Layer      | Choice                                            |
| ---------- | ------------------------------------------------- |
| Framework  | [Next.js 14](https://nextjs.org/) (App Router)    |
| Language   | TypeScript                                        |
| Styling    | Tailwind CSS (with custom brand tokens)           |
| Icons      | Inline SVG (no icon library)                      |
| Fonts      | Inter (via `next/font`)                           |
| State      | React Context (`BusinessProvider`)                |
| Persistence| Browser `localStorage`                            |
| Deployment | Any Node host (Vercel, Netlify, Cloudflare, etc.) |

No third-party UI kit. No CSS-in-JS. No state library. Just Next.js and Tailwind.

---

## Features

### Public pages

- **`/` — Homepage**
  - Hero with keyword + location search
  - 8 popular category tiles
  - Swipeable carousel of 4 featured businesses
  - "Why Eswatini Connect" value section
  - Illustrative statistics strip
  - "List Your Business" CTA

- **`/explore` — Full directory**
  - Live search by keyword
  - Category filter (8 categories)
  - Town filter (Manzini, Mbabane, Ezulwini, Nhlangano)
  - Combined filtering (keyword + category + town)
  - URL-synced filters — every state is shareable
  - "Copy link" button for the current filtered view
  - Empty state with clear-filters action
  - Result count

- **`/business/[slug]` — Business detail page**
  - Server-rendered cover image (SSG at build time for demo businesses)
  - Category, town, description
  - Available services as chips
  - Operating hours
  - Contact card: phone, email, address
  - Working **Call** (`tel:`) and **WhatsApp** (`wa.me`) buttons
  - Related businesses in the same category
  - Local submissions resolved client-side from `localStorage`
  - Dedicated not-found page for invalid slugs

### Interactive flows

- **List Your Business modal** — form with validation, submits to `localStorage`,
  then redirects to the newly created detail page. Clearly labelled as a
  demonstration — no data is published to a server.
- **Header search shortcut** — jumps to the search field on the current page
- **Mobile navigation** — collapses into a working hamburger menu
- **Keyboard accessibility** — `Escape` closes modals, `←`/`→` navigate the
  carousel, focus states on all interactive elements

---

## Getting Started

### Prerequisites

- **Node.js 18.17+** — check with `node -v`
- **npm** (or `pnpm` / `yarn`)

### Install & run

```bash
# 1. Clone the repository
git clone <your-repo-url> eswatini-connect
cd eswatini-connect

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

> The dev script runs on **port 3001** (configured in `package.json`).
> Change it there if you'd prefer 3000.

### Production build

```bash
npm run build
npm start
```

The output is a fully static + server-rendered hybrid:
- Homepage and `/explore` are static
- All `/business/[slug]` demo pages are pre-rendered via `generateStaticParams`

---

## Project Structure

```
eswatini-connect/
├── app/
│   ├── layout.tsx                     # Root layout: providers, header, footer, modals
│   ├── page.tsx                       # Homepage
│   ├── globals.css                    # Tailwind + brand base styles
│   ├── sitemap.ts                     # Auto-generates /sitemap.xml
│   ├── robots.ts                      # Auto-generates /robots.txt
│   ├── explore/
│   │   └── page.tsx                   # Full directory with filters
│   └── business/
│       └── [slug]/
│           ├── page.tsx               # Dynamic business detail route
│           └── not-found.tsx          # 404 for invalid slugs
├── components/
│   ├── Header.tsx                     # Responsive navigation
│   ├── Hero.tsx                       # Homepage hero with search
│   ├── Categories.tsx                 # Category tile grid
│   ├── FeaturedBusinesses.tsx         # Swipeable carousel (4 businesses)
│   ├── FilterBar.tsx                  # Filters + result count + copy link
│   ├── ExploreResults.tsx             # Results grid + empty state
│   ├── BusinessCard.tsx               # Card used everywhere
│   ├── BusinessDetail.tsx             # Full business page content
│   ├── BusinessImage.tsx              # next/image wrapper with fallback
│   ├── BusinessModal.tsx              # (removed in later versions)
│   ├── FiltersUrlSync.tsx             # Bidirectional URL ↔ state sync
│   ├── LocalBusinessFallback.tsx      # Client-side localStorage lookup
│   ├── ListBusinessModal.tsx          # Submission form
│   ├── ListCTA.tsx                    # "Own a Business?" section
│   ├── WhySection.tsx                 # Value props
│   ├── StatsSection.tsx               # Animated statistics
│   └── Footer.tsx                     # Site footer
├── context/
│   └── BusinessContext.tsx            # Global state: businesses, filters, modals
├── lib/
│   ├── data.tsx                       # Demo businesses + categories + helper fns
│   ├── types.ts                       # Shared TypeScript interfaces
│   └── slugify.ts                     # Name → URL-safe slug
├── public/
├── .vscode/
│   └── settings.json                  # Editor settings (lint rules for Tailwind)
├── next.config.mjs                    # Next config (image remote patterns)
├── tailwind.config.ts                 # Tailwind theme tokens
├── tsconfig.json                      # TS config with @/* path alias
├── package.json
└── README.md
```

---

## Environment Variables

Create a `.env.local` file at the project root (gitignored by default):

```env
# Base URL used for sitemap, robots.txt, canonical links, OG tags.
# In development, the code falls back to http://localhost:3001 automatically.
# Set this in production to your real domain.
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Set the same variable in your deployment host's environment settings
(Vercel → Settings → Environment Variables, Netlify → Site settings →
Environment, etc.). No other env vars are required.

---

## Available Scripts

| Command         | Description                                    |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Start the dev server at `http://localhost:3001`|
| `npm run build` | Production build                               |
| `npm start`     | Start the production server                    |
| `npm run lint`  | Run ESLint                                     |

---

## Demo Data & Limitations

### What's included

- **8 fictional demo businesses** in `lib/data.tsx` — one per category
- **8 categories** with icons and descriptions
- **4 towns** — Manzini, Mbabane, Ezulwini, Nhlangano

Every demo business is clearly marked. The detail page and the modal both
show a disclaimer:

> *Demo listing — contact details are fictional placeholders.*

### What's mocked / not real

- **No backend.** Submissions don't hit a server.
- **No database.** Locally submitted businesses are saved in the browser's
  `localStorage` under the key `eswatini_connect_submissions_v1`.
- **No authentication.** Anyone can submit.
- **No verification.** Listings are not independently verified.
- **No real businesses.** All names, phone numbers, emails, and addresses are
  fictional placeholders for the prototype.
- **Statistics are illustrative.** The numbers in the stats section (250+, 8+,
  10+, 1,000+) are demonstration figures, not real platform metrics.

### localStorage behaviour

- Data persists across page refreshes and browser restarts
- Data is **per-browser and per-device** — it won't appear on other machines
- Clearing browser storage deletes all local submissions
- Incognito mode starts fresh each session

To reset local submissions during testing, open DevTools → Application →
Local Storage → delete the `eswatini_connect_submissions_v1` key.

---

## How the Interactive Flows Work

### Search and filtering

Filter state lives in React Context (`BusinessContext`) and is kept in sync
with the URL query string via `FiltersUrlSync`:

- `/explore` — no filters
- `/explore?q=garden` — keyword filter
- `/explore?category=Automotive&location=Mbabane` — combined filters

All three URL params (`q`, `category`, `location`) are validated against known
values. Invalid params silently fall back to defaults. Using `router.replace`
means typing doesn't spam the browser history, but every state is still
shareable by copy-pasting the URL.

### Business detail pages

Two paths render `/business/[slug]`:

1. **Server-rendered** — demo businesses found in `lib/data.tsx` at build time
   (via `generateStaticParams`). Full SEO metadata and JSON-LD included.
2. **Client-side fallback** — locally submitted businesses are looked up in
   `localStorage` via `LocalBusinessFallback`. Rendered on the client.

Invalid slugs render a friendly not-found panel — no crash, no blank page.

### List Your Business form

The modal form:

1. Validates required fields (name, category, town, description, phone, email)
2. Validates email format
3. Saves to `localStorage`
4. Refreshes the in-memory business list
5. Redirects to the new detail page after a short delay

You can immediately revisit it — even after a full page reload.

---

## SEO

- **`/sitemap.xml`** — generated by `app/sitemap.ts`; includes home, `/explore`,
  and every demo business detail page. Local submissions are per-browser and
  are not listed.
- **`/robots.txt`** — generated by `app/robots.ts`; allows all crawlers and
  points to the sitemap.
- **Per-page metadata** — every business detail page emits:
  - `<title>`, `<meta name="description">`, `<meta name="keywords">`
  - `<link rel="canonical">`
  - Open Graph tags (title, description, url, image, site name, locale)
  - Twitter Card tags
- **Structured data** — every business detail page includes
  `application/ld+json` markup describing a `LocalBusiness`, ready for Google
  rich results.

**Verify locally:**

```bash
curl.exe -s http://localhost:3001/sitemap.xml
curl.exe -s http://localhost:3001/robots.txt
curl.exe -s http://localhost:3001/business/green-valley-garden-supplies
```

Then search the HTML for `<title>`, `<link rel="canonical">`, or `application/ld+json`.

Once deployed, validate with:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

---

## Accessibility

The project aims for WCAG AA conformance on the core flows:

- Semantic landmarks (`header`, `main`, `footer`, `nav`, `article`, `aside`)
- Every interactive element is keyboard-reachable
- Visible focus rings on all buttons, links, and inputs
- `aria-label` on icon-only buttons and navigation regions
- `aria-live` regions on result counts and form status messages
- Modals: `role="dialog"`, `aria-modal="true"`, `Escape` to close,
  focus returns to the trigger on close
- Alt text on business images
- `prefers-reduced-motion` respected — animations disabled for users who
  request it
- Colour contrast tested against WCAG AA on text and buttons

---

## Roadmap

Ideas queued for future iterations:

- [ ] Favourites / saved businesses with a `/saved` page
- [ ] Dark mode toggle (respects `prefers-color-scheme`)
- [ ] Search debounce + keyword highlighting
- [ ] Photo gallery on business detail pages
- [ ] Contact form on detail pages (frontend-only)
- [ ] Map view of businesses (Leaflet, no API key)
- [ ] Real backend with database and API
- [ ] Business owner accounts and listing management
- [ ] Reviews and ratings
- [ ] Multi-language support (English / siSwati)

---

## License

**Educational / demonstration prototype.**

The demo business names, phone numbers, emails, and addresses are fictional.
No real businesses are represented. Do not deploy this as-is with the demo
data — replace it with real listings, a backend, and a data source before
going live.

---

## Acknowledgements

- Business photography from [Unsplash](https://unsplash.com/)
- Icons hand-drawn as inline SVG (no icon library)
- Typeface: [Inter](https://rsms.me/inter/) by Rasmus Andersson
- Inspired by the Eswatini flag — deep green, warm gold, and community spirit

---

**Built with ❤️ for Eswatini's entrepreneurs.**