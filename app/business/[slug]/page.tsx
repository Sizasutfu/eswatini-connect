import type { Metadata } from "next";
import {
  DEMO_BUSINESSES,
  getDemoBusinessBySlug,
  getDemoSlugs,
} from "@/lib/data";
import BusinessDetail from "@/components/BusinessDetail";
import LocalBusinessFallback from "@/components/LocalBusinessFallback";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getDemoSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const biz = getDemoBusinessBySlug(params.slug);

  if (!biz) {
    return {
      title: "Business",
      description:
        "This business listing could not be found on Eswatini Connect.",
    };
  }

  // IMPORTANT: do NOT include "| Eswatini Connect" here.
  // The root layout's title.template appends it automatically.
  const title = `${biz.name} — ${biz.category} in ${biz.location}`;
  const path = `/business/${biz.slug}`;

  return {
    title,
    description: biz.shortDesc,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      title,
      description: biz.shortDesc,
      url: path,
      siteName: "Eswatini Connect",
      locale: "en_SZ",
      images: [
        {
          url: biz.image,
          width: 1200,
          height: 630,
          alt: biz.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: biz.shortDesc,
      images: [biz.image],
    },
    keywords: [
      biz.name,
      biz.category,
      biz.location,
      ...biz.services
        .split(/[·,]/)
        .map((s) => s.trim())
        .filter(Boolean),
    ],
  };
}

export default function BusinessPage({ params }: PageProps) {
  const biz = getDemoBusinessBySlug(params.slug);

  if (biz) {
    const related = DEMO_BUSINESSES.filter(
      (b) => b.category === biz.category && b.slug !== biz.slug
    ).slice(0, 3);

    // JSON-LD structured data for Google rich results
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: biz.name,
      description: biz.description || biz.shortDesc,
      image: biz.image,
      telephone: biz.phone,
      email: biz.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: biz.address,
        addressLocality: biz.location,
        addressCountry: "SZ",
      },
      openingHours: biz.hours,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <BusinessDetail business={biz} related={related} />
      </>
    );
  }

  return <LocalBusinessFallback slug={params.slug} />;
}