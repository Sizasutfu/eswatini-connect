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
    return { title: "Business — Eswatini Connect" };
  }

  return {
    title: `${biz.name} — ${biz.category} in ${biz.location} | Eswatini Connect`,
    description: biz.shortDesc,
  };
}

export default function BusinessPage({ params }: PageProps) {
  const biz = getDemoBusinessBySlug(params.slug);

  if (biz) {
    const related = DEMO_BUSINESSES.filter(
      (b) => b.category === biz.category && b.slug !== biz.slug
    ).slice(0, 3);

    return <BusinessDetail business={biz} related={related} />;
  }

  return <LocalBusinessFallback slug={params.slug} />;
}