import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBusinesses, getBusinessBySlug } from "@/lib/supabase/queries";
import BusinessDetail from "@/components/BusinessDetail";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!params.slug || params.slug.trim() === "") {
    return { title: "Business" };
  }

  const biz = await getBusinessBySlug(params.slug);
  if (!biz) {
    return {
      title: "Business",
      description:
        "This business listing could not be found on Eswatini Connect.",
    };
  }

  const title = `${biz.name} — ${biz.category} in ${biz.location}`;
  const path = `/business/${biz.slug}`;

  return {
    title,
    description: biz.shortDesc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description: biz.shortDesc,
      url: path,
      siteName: "Eswatini Connect",
      locale: "en_SZ",
      images: [
        { url: biz.image, width: 1200, height: 630, alt: biz.name },
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
      ...biz.services.split(/[·,]/).map((s) => s.trim()).filter(Boolean),
    ],
  };
}

export default async function BusinessPage({ params }: PageProps) {
  if (!params.slug || params.slug.trim() === "") {
    notFound();
  }

  const biz = await getBusinessBySlug(params.slug);
  if (!biz) notFound();

  const all = await getAllBusinesses();
  const related = all
    .filter((b) => b.category === biz.category && b.slug !== biz.slug)
    .slice(0, 3);

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
      <BusinessDetail business={biz} related={related} isLocal={biz.isLocal} />
    </>
  );
}