import type { Metadata } from "next";
import Link from "next/link";
import MessagesList from "@/components/MessagesList";

export const metadata: Metadata = {
  title: "Your Messages",
  description:
    "Messages you've sent to businesses on Eswatini Connect. Stored locally in this browser.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function MessagesPage() {
  return (
    <section
      id="messages"
      className="py-12 md:py-16 min-h-[calc(100vh-72px)]
        bg-brand-soft dark:bg-night-bg"
    >
      <div className="container">
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
            Messages
          </span>
        </nav>

        <div className="max-w-[720px] mb-8">
          <h1
            className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem]
              font-bold tracking-tight text-brand-ink mb-3
              dark:text-night-heading"
          >
            Your Messages
          </h1>
          <p className="text-[1.08rem] text-brand-muted dark:text-night-muted">
            Messages you&apos;ve sent from business pages. Delivered to the
            business and stored securely on your account.
          </p>
        </div>

        <MessagesList />
      </div>
    </section>
  );
}
