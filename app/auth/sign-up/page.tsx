import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your free Eswatini Connect account.",
};

export default function SignUpPage() {
  return (
    <section
      className="py-16 md:py-24 min-h-[calc(100vh-72px)]
        bg-brand-soft dark:bg-night-bg"
    >
      <div className="container max-w-[440px]">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-brand-muted dark:text-night-muted"
        >
          <Link
            href="/"
            className="hover:text-brand-green transition-colors dark:hover:text-brand-gold"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-ink font-medium dark:text-night-heading">
            Sign Up
          </span>
        </nav>

        <div className="bg-white border border-brand-line rounded-brand-xl p-8 shadow-card dark:bg-night-surface dark:border-night-line">
          <h1 className="text-[1.6rem] sm:text-[1.9rem] font-bold text-brand-ink mb-2 dark:text-night-heading">
            Create your account
          </h1>
          <p className="text-sm text-brand-muted mb-6 dark:text-night-muted">
            Free, takes 20 seconds. Required to submit a business listing.
          </p>

          <Suspense fallback={null}>
            <AuthForm mode="sign-up" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}