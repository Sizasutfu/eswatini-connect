# Eswatini Connect 🇸🇿

> **Discover Local. Connect Easily.**

A modern, full-stack business directory for discovering local businesses, service providers, and entrepreneurs across Eswatini.

**Live:** [https://eswatini-connect.circlenet.social](https://eswatini-connect.circlenet.social)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Messaging](#messaging)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [SEO](#seo)
- [Accessibility](#accessibility)
- [Demo Data](#demo-data)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

Eswatini Connect is a directory platform where visitors can:

- **Discover** local businesses across Manzini, Mbabane, Ezulwini, and Nhlangano
- **Search** by keyword, category, or town — with shareable, bookmarkable URLs
- **Explore** detailed business pages with contact info, services, hours, and photos
- **Save** favourites for later
- **Message** businesses directly through a frontend contact form
- **List** and manage their own business (requires a free account)

The platform is fully deployed and functional:

- **Backend:** Supabase (Postgres + Auth + RLS)
- **Frontend:** Next.js 14 App Router on Vercel
- **Design:** Deep green + warm gold, rounded cards, dark mode

---

## Features

### Public pages

- **`/` — Homepage**
  - Hero with keyword + location search
  - 8 popular category tiles with live counts
  - Swipeable carousel of featured businesses
  - "Why Eswatini Connect" value section
  - **Live statistics** pulled from Supabase (real counts, not placeholders)
  - "List Your Business" CTA

- **`/explore` — Full directory**
  - Debounced live keyword search
  - Category filter (8 categories)
  - Town filter (4 towns)
  - Combined filtering (keyword + category + town)
  - **URL-synced filters** — every state is shareable
  - **Keyword highlighting** in results
  - "Copy link" button for the current filtered view
  - Empty state with clear-filters action

- **`/business/[slug]` — Business detail page**
  - Server-rendered from Supabase
  - Cover photo + photo gallery with lightbox
  - Category, town, description
  - Available services (rendered as chips)
  - Operating hours
  - Contact card: phone, email, address
  - Working **Call** (`tel:`) and **WhatsApp** (`wa.me`) buttons
  - Frontend contact form (messages stored in Supabase)
  - Save / favourited state
  - Related businesses in the same category
  - Per-page metadata + JSON-LD structured data
  - Dedicated not-found page for invalid slugs

- **`/categories` — Category index**
  - Grid of all 8 categories with counts

- **`/category/[slug]` — Individual category page**
  - All businesses in one category
  - Links to related categories
  - Per-page metadata

- **`/map` — Interactive map**
  - Leaflet with OpenStreetMap tiles
  - Dark-mode tile inversion via CSS filter
  - One marker per business
  - Click a marker for a popup with details + link

- **`/saved` — Favourites**
  - Heart icon on every business card
  - Saved businesses persist across sessions
  - "Clear all" action

- **`/messages` — Sent messages**
  - Messages you've sent to businesses
  - Delete individual messages

- **`/privacy` — Privacy Policy**
  - Full policy covering data collection, third parties, user rights

- **`/terms` — Terms of Service**
  - Full terms covering acceptable use, liability, governing law

### Authenticated features

- **`/auth/sign-up`** — Create an account (email + password, requires terms acceptance)
- **`/auth/sign-in`** — Sign in
- **`/auth/callback`** — Email confirmation handler
- **`/my-businesses`** — Manage your submissions with two tabs:
  - **My Listings** — view, edit, delete your businesses
  - **Inbox** — read messages customers have sent to your businesses
- **Protected submission flow** — Only signed-in users can list a business
- **User menu** — Avatar with dropdown: My Businesses, Saved, Your Messages, Sign out

### Cross-cutting features

- **Dark mode** — Toggle in header, respects `prefers-color-scheme`, persists in localStorage
- **Responsive** — Mobile-first layout, hamburger nav, swipeable carousel
- **SEO** — Sitemap, robots.txt, canonical URLs, Open Graph, Twitter Cards, JSON-LD
- **Accessibility** — Semantic HTML, keyboard navigation, ARIA labels, focus management, reduced-motion support
- **Favicon** — Custom SVG logo served automatically via Next.js App Router

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (custom brand tokens) |
| Icons | Inline SVG (no icon library) |
| Fonts | Inter (via `next/font`) |
| Database | [Supabase](https://supabase.com/) (Postgres) |
| Auth | Supabase Auth (email + password) |
| Messaging | Supabase `messages` table with RLS |
| Maps | [Leaflet](https://leafletjs.com/) + OpenStreetMap tiles |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) |
| State | React Context (Auth, Business, Favourites) |
| Deployment | [Vercel](https://vercel.com/) |

No third-party UI kit. No CSS-in-JS. No state library.

---

## Getting Started

### Prerequisites

- **Node.js 18.17+** — check with `node -v`
- A **Supabase account** (free tier is fine)
- **npm** (or `pnpm` / `yarn`)

### 1. Clone and install

```bash
git clone <your-repo-url> eswatini-connect
cd eswatini-connect
npm install
```

### 2. Set up Supabase

1. Create a new project at [database.new](https://database.new)
2. Go to **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Publishable (anon) key** → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - **Service role key** → `SUPABASE_SERVICE_ROLE_KEY` (only for the seed script)

### 3. Create the database schema

In the Supabase **SQL Editor**, run the schema from the [Database Schema](#database-schema) section below.

### 4. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

See [Environment Variables](#environment-variables) for the full list.

### 5. Seed the demo businesses

```bash
npx tsx scripts/seed-businesses.ts
```

Expected output:

```
◇ injected env (4) from .env.local
Inserting 8 businesses...
✅ Seed complete.
```

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

> The dev script runs on **port 3001**. Change it in `package.json` if you prefer 3000.

---

## Environment Variables

Create `.env.local` at the project root:

```env
# ---------- Site ----------
# Base URL used for sitemap, robots.txt, canonical links, OG tags.
NEXT_PUBLIC_SITE_URL=https://eswatini-connect.circlenet.social

# ---------- Supabase ----------
# Project URL (from Supabase → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

# Publishable (anon) key — safe for the browser, protected by RLS
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxx

# Service role key — bypasses RLS, used ONLY by the seed script.
# Never expose this to the browser or commit it to git.
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

**Important:**
- `.env.local` is gitignored by default
- On Vercel, set `NEXT_PUBLIC_SITE_URL` and both Supabase variables (all **Config** visibility, not Secret)
- `SUPABASE_SERVICE_ROLE_KEY` should **not** be added to Vercel — it's only for local seeding

---

## Database Schema

Run this in the Supabase **SQL Editor**:

```sql
-- ============================================================
-- businesses table
-- ============================================================
create table public.businesses (
  id            bigint primary key generated always as identity,
  slug          text unique not null,
  name          text not null,
  category      text not null,
  location      text not null,
  lat           double precision,
  lng           double precision,
  short_desc    text,
  description   text,
  image         text,
  gallery       text[] default '{}',
  featured      boolean default false,
  phone         text,
  whatsapp      text,
  email         text,
  address       text,
  hours         text,
  services      text,
  is_local      boolean default false,
  user_id       uuid references auth.users(id) on delete set null,
  created_at    timestamptz default timezone('utc'::text, now()) not null
);

create index businesses_category_idx on public.businesses (category);
create index businesses_location_idx on public.businesses (location);
create index businesses_featured_idx on public.businesses (featured) where featured = true;
create index businesses_user_id_idx  on public.businesses (user_id);

alter table public.businesses enable row level security;

create policy "Public can read businesses"
  on public.businesses for select
  to anon, authenticated using ( true );

create policy "Authenticated users can insert businesses"
  on public.businesses for insert
  to authenticated with check ( auth.uid() = user_id );

create policy "Users can update their own businesses"
  on public.businesses for update
  to authenticated
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

create policy "Users can delete their own businesses"
  on public.businesses for delete
  to authenticated using ( auth.uid() = user_id );

-- ============================================================
-- messages table
-- ============================================================
create table public.messages (
  id           bigint primary key generated always as identity,
  business_id  bigint references public.businesses(id) on delete cascade,
  sender_id    uuid references auth.users(id) on delete set null,
  sender_name  text not null,
  sender_email text not null,
  sender_phone text,
  body         text not null,
  read_at      timestamptz,
  created_at   timestamptz default timezone('utc'::text, now()) not null
);

create index messages_business_id_idx on public.messages (business_id);
create index messages_sender_id_idx   on public.messages (sender_id);
create index messages_created_at_idx  on public.messages (created_at desc);

alter table public.messages enable row level security;

create policy "Senders can read their sent messages"
  on public.messages for select
  to authenticated using ( auth.uid() = sender_id );

create policy "Owners can read messages for their businesses"
  on public.messages for select
  to authenticated
  using (
    exists (
      select 1 from public.businesses b
      where b.id = messages.business_id
        and b.user_id = auth.uid()
    )
  );

create policy "Authenticated users can send messages"
  on public.messages for insert
  to authenticated with check ( auth.uid() = sender_id );

create policy "Owners can mark messages as read"
  on public.messages for update
  to authenticated
  using (
    exists (
      select 1 from public.businesses b
      where b.id = messages.business_id
        and b.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.businesses b
      where b.id = messages.business_id
        and b.user_id = auth.uid()
    )
  );

create policy "Senders can delete their sent messages"
  on public.messages for delete
  to authenticated using ( auth.uid() = sender_id );

create policy "Owners can delete messages for their businesses"
  on public.messages for delete
  to authenticated
  using (
    exists (
      select 1 from public.businesses b
      where b.id = messages.business_id
        and b.user_id = auth.uid()
    )
  );

notify pgrst, 'reload schema';
```

---

## Authentication

Authentication uses **Supabase Auth** with email + password.

### Flow

1. User visits `/auth/sign-up`, enters email + password, and accepts the Terms of Service and Privacy Policy
2. Supabase creates a user record with `terms_accepted_at` and version metadata
3. If email confirmation is **off** (recommended for dev), user is signed in immediately
4. If email confirmation is **on**, a confirmation link is sent and the user is redirected to `/auth/callback`
5. On sign-in, Supabase sets secure cookies
6. `middleware.ts` refreshes the session on every request
7. `AuthProvider` (React context) exposes `user`, `isLoading`, and `signOut` to the app

### Protecting submissions

The `ListBusinessModal` shows a sign-in prompt when no user is signed in. The `addSubmission` handler attaches the current user's `user_id`, and RLS enforces that `auth.uid() = user_id`.

### Supabase Auth URL configuration

In Supabase → **Authentication → URL Configuration**, set:

**Site URL:**
```
https://eswatini-connect.circlenet.social
```

**Redirect URLs:**
```
https://eswatini-connect.circlenet.social/auth/callback
https://eswatini-connect.circlenet.social/**
http://localhost:3001/auth/callback
http://localhost:3001/**
```

---

## Messaging

Messages flow through Supabase with row-level security enforcing access:

- **Senders** see messages they've sent (via `/messages`)
- **Business owners** see messages received for their listings (via `/my-businesses` → **Inbox** tab)
- Neither party can see the other's inbox — enforced at the database level

### Owner inbox features

- Unread count with **gold dot** indicator
- **Mark read** action per message
- **All / Unread** filter toggle
- **Delete** messages
- Direct reply via `mailto:` and `call:` links

---

## Project Structure

```
eswatini-connect/
├── app/
│   ├── layout.tsx                     # Root: providers, header, footer
│   ├── page.tsx                       # Homepage
│   ├── globals.css                    # Tailwind + brand styles + Leaflet overrides
│   ├── sitemap.ts                     # Auto /sitemap.xml (reads from Supabase)
│   ├── robots.ts                      # Auto /robots.txt
│   ├── icon.svg                       # Favicon (auto-served by Next.js)
│   ├── favicon.ico                    # Legacy favicon fallback
│   ├── auth/
│   │   ├── sign-in/page.tsx
│   │   ├── sign-up/page.tsx
│   │   └── callback/route.ts          # Email confirmation handler
│   ├── explore/page.tsx
│   ├── map/page.tsx
│   ├── categories/page.tsx
│   ├── category/[slug]/
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── business/
│   │   ├── page.tsx                   # Redirects /business/ → /explore
│   │   └── [slug]/
│   │       ├── page.tsx               # Server-rendered from Supabase
│   │       └── not-found.tsx
│   ├── saved/page.tsx
│   ├── messages/page.tsx
│   ├── my-businesses/page.tsx         # Tabs: Listings + Inbox
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── Header.tsx
│   ├── UserMenu.tsx
│   ├── ThemeToggle.tsx
│   ├── Hero.tsx
│   ├── Categories.tsx
│   ├── CategoryGrid.tsx
│   ├── CategoryBusinesses.tsx
│   ├── FeaturedBusinesses.tsx          # Swipeable carousel
│   ├── FilterBar.tsx                   # Debounced search + filters
│   ├── FiltersUrlSync.tsx              # URL ↔ state sync
│   ├── ExploreResults.tsx
│   ├── BusinessCard.tsx
│   ├── BusinessDetail.tsx
│   ├── BusinessFormFields.tsx          # Shared create/edit form fields
│   ├── BusinessImage.tsx               # next/image wrapper with fallback
│   ├── BusinessGallery.tsx             # Photo grid + lightbox
│   ├── FavouriteButton.tsx
│   ├── SavedBusinesses.tsx
│   ├── MessagesList.tsx
│   ├── OwnerInbox.tsx                  # Received messages
│   ├── MyBusinessesTabs.tsx            # Listings / Inbox tab switcher
│   ├── MyBusinesses.tsx                # My listings with edit/delete
│   ├── EditBusinessModal.tsx
│   ├── DeleteBusinessModal.tsx
│   ├── ContactForm.tsx
│   ├── Highlight.tsx                   # <mark> wrapper for search terms
│   ├── AuthForm.tsx
│   ├── BusinessMap.tsx                 # Leaflet map (client-only)
│   ├── BusinessMapDynamic.tsx          # next/dynamic wrapper with ssr:false
│   ├── MapView.tsx
│   ├── ListBusinessModal.tsx
│   ├── ListCTA.tsx
│   ├── WhySection.tsx
│   ├── StatsSection.tsx                # Server component (fetches live stats)
│   ├── StatsCounter.tsx                # Client-side animated counter
│   └── Footer.tsx
├── context/
│   ├── AuthContext.tsx
│   ├── BusinessContext.tsx
│   └── FavouritesContext.tsx
├── lib/
│   ├── businesses.ts                   # Demo business data (pure TS, no JSX)
│   ├── categories.tsx                  # Category definitions with JSX icons
│   ├── data.ts                         # Barrel re-export for backward compat
│   ├── categoryUtils.ts                # Slug helpers for categories
│   ├── slugify.ts
│   ├── types.ts
│   ├── useDebounce.ts
│   ├── validateBusiness.ts             # Shared draft validation
│   ├── legal.ts                        # Terms/Privacy version tracking
│   └── supabase/
│       ├── client.ts                   # Browser client
│       ├── server.ts                   # Server client (cookies)
│       ├── queries.ts                  # Business queries
│       ├── messages.ts                 # Message helpers
│       └── stats.ts                    # Platform stats
├── scripts/
│   └── seed-businesses.ts              # One-off seed utility
├── types/
│   └── react-overrides.d.ts            # TS shim for 71007 warning
├── middleware.ts                       # Session refresh for Supabase
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── .env.local.example
└── package.json
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at `http://localhost:3001` |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx tsx scripts/seed-businesses.ts` | Seed demo businesses into Supabase |

---

## Deployment

Deployed on **Vercel** with **Supabase** as the backend.

### Steps

1. Push your repo to GitHub
2. Import the repo into Vercel
3. Add environment variables in Vercel → **Settings → Environment Variables**:

| Key | Value | Visibility | Environments |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Config | All 3 |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Config | All 3 |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` | Config | All 3 |

> `NEXT_PUBLIC_*` vars must use **Config** visibility, not **Secret** — Vercel enforces this rule.

4. Attach the custom domain in Vercel → **Settings → Domains**
5. In Supabase → **Authentication → URL Configuration**, add the production URL and `/auth/callback`
6. Redeploy (any change to `NEXT_PUBLIC_*` vars requires a fresh build)

### Post-deploy verification

```bash
# Sitemap points to your domain
curl.exe -s https://your-domain.com/sitemap.xml | Select-String "<loc>"

# Robots.txt points to sitemap
curl.exe -s https://your-domain.com/robots.txt

# Business page has canonical + OG tags
curl.exe -s https://your-domain.com/business/royal-auto-care | Select-String "canonical|og:title"
```

---

## SEO

- **`/sitemap.xml`** — generated dynamically; includes all static routes, category pages, and every business from Supabase. Revalidates hourly.
- **`/robots.txt`** — allows all crawlers, points to the sitemap.
- **Per-page metadata** — every business, category, and content page emits:
  - `<title>`, `<meta name="description">`, `<meta name="keywords">`
  - `<link rel="canonical">`
  - Open Graph tags (title, description, url, image, site name, locale)
  - Twitter Card tags
- **JSON-LD structured data** — `LocalBusiness` schema on every business detail page, ready for Google rich results.

### Google Search Console

Submitted for indexing — sitemap live at [search.google.com/search-console](https://search.google.com/search-console). Google will crawl within 24–48 hours.

To verify indexing progress:

```
site:eswatini-connect.circlenet.social
```

Paste into Google search — the number of results shows how many pages are indexed.

---

## Accessibility

The project targets WCAG AA conformance on core flows:

- Semantic landmarks (`header`, `main`, `footer`, `nav`, `article`, `aside`)
- Every interactive element is keyboard-reachable
- Visible focus rings on all buttons, links, and inputs
- `aria-label` on icon-only buttons and navigation regions
- `aria-live` regions on result counts and form status messages
- Modals: `role="dialog"`, `aria-modal="true"`, `Escape` to close, focus returns to trigger
- Alt text on business images
- `prefers-reduced-motion` respected — animations disabled for users who request it
- Colour contrast tested against WCAG AA

---

## Demo Data

The `scripts/seed-businesses.ts` script inserts **8 fictional businesses** into Supabase — one per category:

| Name | Category | Town |
|---|---|---|
| Green Valley Garden Supplies | Agriculture & Farming | Manzini |
| Royal Auto Care | Automotive | Mbabane |
| BrightSpark Electrical Services | Home Services | Ezulwini |
| Fresh Harvest Market | Shopping & Retail | Nhlangano |
| TechPoint Solutions | Technology & Electronics | Manzini |
| Golden Plate Kitchen | Restaurants & Food | Mbabane |
| Bloom Beauty Studio | Beauty & Wellness | Ezulwini |
| ProEdge Consulting | Professional Services | Manzini |

**All demo businesses are fictional.** Names, phone numbers, emails, and addresses are placeholders and do not represent real businesses. They're flagged `is_local = false` in the database.

User-submitted businesses are flagged `is_local = true` and their contact details hide the "demo listing" disclaimer on the detail page.

---

## Roadmap

Ideas queued for future iterations:

- [ ] **File uploads** — Supabase Storage for real business photos
- [ ] **Moderation queue** — admin approval before submissions go live
- [ ] **Reviews and ratings** — signed-in users can leave feedback
- [ ] **Business claims** — verified owners can claim admin-added listings
- [ ] **Admin dashboard** — CRUD for all businesses
- [ ] **Email notifications** — Supabase Edge Functions + Resend for new messages
- [ ] **Multi-language support** — English / siSwati
- [ ] **Advanced analytics** — view counts, popular searches
- [ ] **Custom SMTP** — for higher-volume confirmation emails
- [ ] **ISR / caching** — speed up business detail pages with `revalidate`

---

## License

MIT — see [LICENSE](./LICENSE).

The demo business data is fictional. Do not deploy this as-is with the demo data — replace it with real listings, seed only your own content, and configure Supabase Auth email settings before going live.

---

## Acknowledgements

- Business photography from [Unsplash](https://unsplash.com/)
- Icons hand-drawn as inline SVG
- Typeface: [Inter](https://rsms.me/inter/) by Rasmus Andersson
- Maps: [OpenStreetMap](https://www.openstreetmap.org/) contributors
- Inspiration: the Eswatini flag — deep green, warm gold, and community spirit

---

**Built with ❤️ for Eswatini's entrepreneurs.**