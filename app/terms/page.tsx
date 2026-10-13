import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Eswatini Connect.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "13 October 2026";

export default function TermsPage() {
  return (
    <article className="py-12 md:py-16 bg-brand-soft dark:bg-night-bg">
      <div className="container max-w-[820px]">
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
            Terms of Service
          </span>
        </nav>

        <div className="bg-white border border-brand-line rounded-brand-xl p-6 sm:p-10 shadow-card dark:bg-night-surface dark:border-night-line">
          <h1 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem] font-bold tracking-tight text-brand-ink mb-3 dark:text-night-heading">
            Terms of Service
          </h1>
          <p className="text-sm text-brand-muted mb-8 dark:text-night-muted">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="text-[1.02rem] leading-relaxed text-brand-body dark:text-night-text space-y-6">
            <p>
              Welcome to Eswatini Connect. These Terms of Service
              (&ldquo;Terms&rdquo;) govern your access to and use of our
              website and services at{" "}
              <strong>eswatini-connect.circlenet.social</strong> (the
              &ldquo;Service&rdquo;). By using the Service, you agree to these
              Terms. If you do not agree, please do not use the Service.
            </p>

            <p>
              <strong>Prototype notice.</strong> Eswatini Connect is currently
              a demonstration project. Business listings shown in the platform
              are fictional placeholders used for demonstration purposes. You
              should not rely on this platform for real business decisions
              until a public launch is announced.
            </p>

            <Section title="1. Who may use the Service">
              <p>
                You must be at least 13 years old to use the Service. If you
                are under 18, you may only use the Service with the involvement
                of a parent or guardian. By using the Service, you represent
                that you meet these requirements.
              </p>
            </Section>

            <Section title="2. Your account">
              <p>
                To submit or manage a business listing, you must create an
                account. You are responsible for:
              </p>
              <ul>
                <li>Providing accurate account information</li>
                <li>Keeping your password confidential</li>
                <li>All activity that occurs under your account</li>
                <li>Notifying us immediately of any unauthorised access</li>
              </ul>
              <p>
                You may not create an account using another person&apos;s
                identity without their permission, or use the Service for
                impersonation.
              </p>
            </Section>

            <Section title="3. Business listings">
              <p>
                When you submit a business listing, you confirm that:
              </p>
              <ul>
                <li>
                  You own the business or are authorised to represent it
                </li>
                <li>
                  All information you provide is accurate and up to date
                </li>
                <li>
                  You have the right to use any images or content you upload
                </li>
                <li>
                  Your listing does not infringe anyone else&apos;s rights
                </li>
              </ul>
              <p>
                We may review, edit, or remove listings that violate these
                Terms, are misleading, or are reported as fraudulent. We may
                do so without prior notice.
              </p>
            </Section>

            <Section title="4. Acceptable use">
              <p>You agree not to:</p>
              <ul>
                <li>
                  Post false, misleading, or deceptive information
                </li>
                <li>
                  Impersonate another business, brand, or person
                </li>
                <li>
                  Upload content that is illegal, harmful, hateful, obscene, or
                  infringing
                </li>
                <li>
                  Attempt to gain unauthorised access to the Service or other
                  users&apos; accounts
                </li>
                <li>
                  Scrape, harvest, or bulk-collect data from the Service
                  without written permission
                </li>
                <li>
                  Interfere with the operation of the Service (for example, by
                  launching denial-of-service attacks)
                </li>
                <li>
                  Use the Service to send spam or unsolicited commercial
                  messages
                </li>
                <li>
                  Reverse-engineer, resell, or sublicense any part of the
                  Service
                </li>
              </ul>
            </Section>

            <Section title="5. Content and ownership">
              <p>
                <strong>Your content.</strong> You retain ownership of the
                content you submit (business descriptions, images, and so on).
                By submitting content, you grant us a non-exclusive,
                worldwide, royalty-free licence to display, reproduce, and
                distribute that content in connection with the Service.
              </p>
              <p>
                <strong>Our content.</strong> The Service itself — its design,
                code, branding, and original text — is owned by Eswatini
                Connect and protected by copyright and other laws. You may not
                copy or reuse it without permission.
              </p>
            </Section>

            <Section title="6. Third-party content">
              <p>
                The Service displays content from third parties, including
                business listings contributed by other users, photographs
                hosted by Unsplash, and map tiles provided by OpenStreetMap. We
                do not verify third-party content and are not responsible for
                its accuracy.
              </p>
            </Section>

            <Section title="7. Disclaimers">
              <p>
                The Service is provided <strong>&ldquo;as is&rdquo;</strong>{" "}
                and <strong>&ldquo;as available&rdquo;</strong>, without
                warranties of any kind, whether express or implied. We do not
                warrant that:
              </p>
              <ul>
                <li>The Service will be uninterrupted, secure, or error-free</li>
                <li>Information displayed on the Service is accurate or reliable</li>
                <li>Any listing represents a real, verified, or currently operating business</li>
                <li>Interactions with any business listed on the Service will meet your expectations</li>
              </ul>
              <p>
                You use the Service at your own risk.
              </p>
            </Section>

            <Section title="8. Limitation of liability">
              <p>
                To the maximum extent permitted by law, Eswatini Connect and
                its maintainers will not be liable for any indirect,
                incidental, special, consequential, or punitive damages
                arising out of or relating to your use of the Service.
              </p>
              <p>
                Our total liability to you for any claim arising out of or
                relating to the Service will not exceed the amount you have
                paid us in the twelve months preceding the claim (which, for
                the current free Service, is zero).
              </p>
            </Section>

            <Section title="9. Indemnity">
              <p>
                You agree to defend, indemnify, and hold harmless Eswatini
                Connect and its maintainers from any claims, damages, losses,
                liabilities, and expenses (including reasonable legal fees)
                arising out of your use of the Service, your content, or your
                breach of these Terms.
              </p>
            </Section>

            <Section title="10. Termination">
              <p>
                You may stop using the Service at any time. You can delete your
                account and listings by contacting us.
              </p>
              <p>
                We may suspend or terminate your access to the Service at any
                time, with or without notice, if we believe you have violated
                these Terms or if continuing to provide access would expose us
                to legal risk.
              </p>
            </Section>

            <Section title="11. Changes to these Terms">
              <p>
                We may update these Terms from time to time. When we do, we
                will change the &ldquo;Last updated&rdquo; date at the top of
                this page. Continued use of the Service after changes
                constitutes acceptance of the updated Terms.
              </p>
            </Section>

            <Section title="12. Governing law">
              <p>
                These Terms are governed by the laws of the Kingdom of
                Eswatini. Any disputes will be resolved in the courts of
                Eswatini.
              </p>
            </Section>

            <Section title="13. Contact">
              <p>For questions about these Terms, contact:</p>
              <p className="mt-3 p-4 rounded-brand-md bg-brand-soft dark:bg-night-elevated">
                <strong>Eswatini Connect</strong>
                <br />
                Email:{" "}
                <span className="text-brand-green dark:text-brand-gold">
                  legal@eswatiniconnect.example
                </span>
                <br />
                Mbabane, Eswatini
              </p>
            </Section>

            <div className="mt-10 pt-6 border-t border-brand-line dark:border-night-line">
              <p className="text-sm text-brand-muted dark:text-night-muted">
                See also:{" "}
                <Link
                  href="/privacy"
                  className="text-brand-green hover:text-brand-greenDark dark:text-brand-gold font-medium"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[1.15rem] sm:text-[1.3rem] font-semibold text-brand-ink mb-3 mt-8 dark:text-night-heading">
        {title}
      </h2>
      <div className="space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}