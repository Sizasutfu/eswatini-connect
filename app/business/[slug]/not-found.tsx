import Link from "next/link";

export default function BusinessNotFound() {
  return (
    <div className="container max-w-[600px] py-24 text-center">
      <div className="text-5xl mb-6">🔍</div>
      <h1 className="text-[1.8rem] font-bold text-brand-ink mb-3">
        Business not found
      </h1>
      <p className="text-brand-muted mb-8">
        We couldn&apos;t find that business. It may have been removed, or the link
        may be incorrect.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link href="/explore" className="btn btn-primary">
          Explore Businesses
        </Link>
        <Link href="/" className="btn btn-outline">
          Go Home
        </Link>
      </div>
    </div>
  );
}