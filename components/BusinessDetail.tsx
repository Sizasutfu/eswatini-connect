import Link from "next/link";
import type { Business } from "@/lib/types";
import BusinessImage from "./BusinessImage";
import BusinessCard from "./BusinessCard";

interface Props {
  business: Business;
  related?: Business[];
  isLocal?: boolean;
}

export default function BusinessDetail({
  business: b, related = [], isLocal = false,
}: Props) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: b.name,
    description: b.description || b.shortDesc,
    image: b.image,
    telephone: b.phone,
    email: b.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address,
      addressLocality: b.location,
      addressCountry: "SZ",
    },
    openingHours: b.hours,
  };

  return (
    <article className="py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container max-w-[1100px]">
        <nav aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-brand-muted mb-6 dark:text-night-muted">
          <Link href="/" className="hover:text-brand-green transition-colors dark:hover:text-brand-gold">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/explore" className="hover:text-brand-green transition-colors dark:hover:text-brand-gold">Explore</Link>
          <span aria-hidden="true">/</span>
          <span className="text-brand-ink font-medium truncate dark:text-night-heading">{b.name}</span>
        </nav>

        <Link href="/explore"
          className="inline-flex items-center gap-2 text-sm font-medium mb-6
            text-brand-green hover:text-brand-greenDark transition-colors
            dark:text-brand-gold dark:hover:brightness-110">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Explore
        </Link>

        <div className="relative aspect-[16/8] md:aspect-[16/7] rounded-brand-lg overflow-hidden mb-8
          bg-brand-soft dark:bg-night-elevated">
          <BusinessImage src={b.image} alt={b.name} priority
            sizes="(max-width:1024px) 100vw, 1100px" className="object-cover" />
          {b.featured && (
            <span className="absolute top-4 left-4 bg-brand-gold text-brand-ink text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </span>
          )}
          {isLocal && (
            <span className="absolute top-4 right-4 bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full">
              Your submission
            </span>
          )}
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 mb-12">
          <div>
            <p className="text-xs font-semibold text-brand-green uppercase tracking-wide mb-2 dark:text-brand-gold">
              {b.category}
            </p>
            <h1 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.6rem] font-bold tracking-tight text-brand-ink mb-4 dark:text-night-heading">
              {b.name}
            </h1>

            <p className="flex items-center gap-2 text-sm text-brand-muted mb-6 dark:text-night-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="shrink-0">
                <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {b.location}, Eswatini
            </p>

            <div className="text-[1.02rem] leading-relaxed text-brand-body mb-8 dark:text-night-text">
              <p>{b.description || b.shortDesc}</p>
            </div>

            <section className="mb-8">
              <h2 className="text-base font-semibold text-brand-ink mb-3 dark:text-night-heading">
                Available Services
              </h2>
              <ul className="flex flex-wrap gap-2">
                {b.services.split(/[·,]/).map((s) => s.trim()).filter(Boolean).map((s) => (
                  <li key={s}
                    className="inline-block px-3 py-1.5 text-sm font-medium rounded-full
                      bg-brand-greenLight text-brand-greenDark
                      dark:bg-brand-green/15 dark:text-brand-gold">
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-brand-ink mb-3 dark:text-night-heading">
                Operating Hours
              </h2>
              <div className="flex items-center gap-3 px-4 py-3 rounded-brand-md
                bg-brand-soft dark:bg-night-elevated">
                <svg className="text-brand-green dark:text-brand-gold shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                <span className="text-sm text-brand-ink dark:text-night-text">{b.hours}</span>
              </div>
            </section>
          </div>

          <aside>
            <div className="bg-white border border-brand-line rounded-brand-lg p-6 shadow-soft lg:sticky lg:top-24
              dark:bg-night-surface dark:border-night-line dark:shadow-card">
              <h2 className="text-base font-semibold text-brand-ink mb-4 dark:text-night-heading">
                Contact Information
              </h2>

              <ul className="flex flex-col gap-4 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="text-brand-green dark:text-brand-gold shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <p className="text-xs text-brand-muted mb-0.5 dark:text-night-muted">Phone</p>
                    <p className="text-sm font-medium text-brand-ink dark:text-night-text">{b.phone}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="text-brand-green dark:text-brand-gold shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 6 10 7L22 6" />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-xs text-brand-muted mb-0.5 dark:text-night-muted">Email</p>
                    <p className="text-sm font-medium text-brand-ink break-all dark:text-night-text">{b.email}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="text-brand-green dark:text-brand-gold shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="text-xs text-brand-muted mb-0.5 dark:text-night-muted">Address</p>
                    <p className="text-sm font-medium text-brand-ink dark:text-night-text">{b.address}</p>
                  </div>
                </li>
              </ul>

              <div className="flex flex-col gap-3">
                <a className="btn btn-primary w-full" href={`tel:${b.phone.replace(/\s+/g, "")}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call Now
                </a>
                <a className="btn btn-gold w-full"
                  href={b.whatsapp ? `https://wa.me/${b.whatsapp.replace(/\D/g, "")}` : "#"}
                  target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.02 12.02 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45z" />
                  </svg>
                  WhatsApp
                </a>
              </div>

              <p className="text-xs text-brand-muted italic mt-4 pt-4 border-t border-brand-line dark:text-night-muted dark:border-night-line">
                Demo listing — contact details are fictional placeholders.
              </p>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="pt-12 border-t border-brand-line dark:border-night-line">
            <div className="mb-8">
              <h2 className="text-[1.4rem] sm:text-[1.6rem] font-bold text-brand-ink mb-2 dark:text-night-heading">
                More in {b.category}
              </h2>
              <p className="text-brand-muted text-sm dark:text-night-muted">
                Other businesses you might be interested in.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rb) => <BusinessCard key={rb.id} business={rb} />)}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}