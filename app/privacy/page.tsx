import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Eswatini Connect collects, uses, and protects your personal information.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "13 October 2026";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </span>
        </nav>

        <div className="bg-white border border-brand-line rounded-brand-xl p-6 sm:p-10 shadow-card dark:bg-night-surface dark:border-night-line">
          <h1 className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.5rem] font-bold tracking-tight text-brand-ink mb-3 dark:text-night-heading">
            Privacy Policy
          </h1>
          <p className="text-sm text-brand-muted mb-8 dark:text-night-muted">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose-brand text-[1.02rem] leading-relaxed text-brand-body dark:text-night-text space-y-6">
            <p>
              Eswatini Connect (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;) operates a business directory at{" "}
              <strong>eswatini-connect.circlenet.social</strong>. This Privacy
              Policy explains what personal information we collect, why we
              collect it, how we use it, and the choices you have.
            </p>

            <p>
              <strong>Prototype notice.</strong> Eswatini Connect is currently
              a demonstration project. Some data practices described here apply
              only in a limited way until the platform launches publicly with
              real users.
            </p>

            <Section title="1. Information we collect">
              <p>We collect the following categories of information:</p>
              <ul>
                <li>
                  <strong>Account information</strong> — when you sign up, we
                  collect your email address and a securely hashed password.
                  We never see your plain-text password.
                </li>
                <li>
                  <strong>Business listings</strong> — when you submit a
                  business, we collect the information you provide: business
                  name, category, town, description, phone, WhatsApp number,
                  email, address, operating hours, services, and any image URL
                  you supply.
                </li>
                <li>
                  <strong>Usage data</strong> — like most websites, our
                  infrastructure providers log technical details such as IP
                  address, browser type, and pages viewed, for security and
                  operational purposes.
                </li>
                <li>
                  <strong>Favourites and messages</strong> — businesses you
                  save and messages you send through the contact form are
                  stored in your browser&apos;s local storage on your own
                  device.
                </li>
              </ul>
            </Section>

            <Section title="2. How we use your information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Create and maintain your account</li>
                <li>Publish and display your business listings</li>
                <li>Let you edit, update, or delete your listings</li>
                <li>Respond to questions and provide support</li>
                <li>Detect and prevent abuse, spam, or security threats</li>
                <li>Improve the platform and understand how it is used</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p>
                We do not sell your personal information, and we do not use
                it for advertising networks or profiling.
              </p>
            </Section>

            <Section title="3. Third parties we share data with">
              <p>
                We rely on a small set of trusted service providers to run the
                platform:
              </p>
              <ul>
                <li>
                  <strong>Supabase</strong> — hosts our database and
                  authentication. Your account and listing data are stored on
                  Supabase servers. See{" "}
                  <ExternalLink href="https://supabase.com/privacy">
                    Supabase&apos;s privacy policy
                  </ExternalLink>
                  .
                </li>
                <li>
                  <strong>Vercel</strong> — hosts the frontend and API routes.
                  Vercel logs standard HTTP request data. See{" "}
                  <ExternalLink href="https://vercel.com/legal/privacy-policy">
                    Vercel&apos;s privacy policy
                  </ExternalLink>
                  .
                </li>
                <li>
                  <strong>Unsplash</strong> — provides some demonstration
                  photography. Images are served directly from Unsplash&apos;s
                  CDN when loaded. See{" "}
                  <ExternalLink href="https://unsplash.com/privacy">
                    Unsplash&apos;s privacy policy
                  </ExternalLink>
                  .
                </li>
                <li>
                  <strong>OpenStreetMap</strong> — provides map tiles for the
                  map view. See{" "}
                  <ExternalLink href="https://wiki.osmfoundation.org/wiki/Privacy_Policy">
                    OpenStreetMap&apos;s privacy policy
                  </ExternalLink>
                  .
                </li>
              </ul>
              <p>
                We do not share your information with any other third parties
                except where required by law.
              </p>
            </Section>

            <Section title="4. Cookies and local storage">
              <p>We use the following browser storage mechanisms:</p>
              <ul>
                <li>
                  <strong>Session cookies</strong> — set by Supabase Auth to
                  keep you signed in. These are essential for account
                  functionality.
                </li>
                <li>
                  <strong>Local storage</strong> — used to remember your theme
                  preference (light / dark), your saved businesses, and your
                  locally stored messages. This data never leaves your
                  browser.
                </li>
              </ul>
              <p>
                We do not use advertising cookies, tracking pixels, or
                third-party analytics that fingerprint users.
              </p>
            </Section>

            <Section title="5. Your rights">
              <p>
                Depending on where you live, you may have the right to:
              </p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your account and associated data</li>
                <li>Export your data in a portable format</li>
                <li>Object to certain types of processing</li>
                <li>Lodge a complaint with a data protection authority</li>
              </ul>
              <p>
                You can exercise most of these rights directly from your
                account: edit your listings from{" "}
                <Link
                  href="/my-businesses"
                  className="text-brand-green hover:text-brand-greenDark dark:text-brand-gold font-medium"
                >
                  My Businesses
                </Link>
                , or clear saved favourites from{" "}
                <Link
                  href="/saved"
                  className="text-brand-green hover:text-brand-greenDark dark:text-brand-gold font-medium"
                >
                  Saved
                </Link>
                . For anything else, contact us using the details below.
              </p>
            </Section>

            <Section title="6. Data retention">
              <p>
                We retain your account information for as long as your account
                is active. If you delete your account, we remove your personal
                information within 30 days, except where we are legally
                required to retain it longer (for example, for tax or audit
                purposes).
              </p>
              <p>
                Business listings you have published may remain visible in
                cached search engine results for a short period after deletion
                while those systems refresh.
              </p>
            </Section>

            <Section title="7. Security">
              <p>
                We protect your information using industry-standard practices:
              </p>
              <ul>
                <li>Encrypted connections (HTTPS) for all traffic</li>
                <li>Passwords are hashed by Supabase Auth and never stored in plain text</li>
                <li>
                  Row-level security in our database ensures users can only
                  access data they own
                </li>
                <li>
                  Access to production systems is limited to the project
                  maintainers
                </li>
              </ul>
              <p>
                No system is perfectly secure. If you become aware of a
                vulnerability, please contact us so we can fix it.
              </p>
            </Section>

            <Section title="8. Children">
              <p>
                Eswatini Connect is not directed at children under the age of
                13. We do not knowingly collect personal information from
                children. If you believe a child has provided us with personal
                information, contact us and we will delete it.
              </p>
            </Section>

            <Section title="9. Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time. When we
                do, we will change the &ldquo;Last updated&rdquo; date at the
                top of this page. Continued use of the platform after changes
                constitutes acceptance of the updated policy.
              </p>
            </Section>

            <Section title="10. Contact">
              <p>
                For questions about this Privacy Policy or your personal
                information, contact:
              </p>
              <p className="not-prose mt-3 p-4 rounded-brand-md bg-brand-soft dark:bg-night-elevated">
                <strong>Eswatini Connect</strong>
                <br />
                Email:{" "}
                <span className="text-brand-green dark:text-brand-gold">
                  privacy@eswatiniconnect.example
                </span>
                <br />
                Mbabane, Eswatini
              </p>
            </Section>

            <div className="not-prose mt-10 pt-6 border-t border-brand-line dark:border-night-line">
              <p className="text-sm text-brand-muted dark:text-night-muted">
                See also:{" "}
                <Link
                  href="/terms"
                  className="text-brand-green hover:text-brand-greenDark dark:text-brand-gold font-medium"
                >
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Small presentational helpers ---------- */

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
      <div className="space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:underline-offset-2">
        {children}
      </div>
    </section>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand-green hover:text-brand-greenDark dark:text-brand-gold font-medium underline underline-offset-2"
    >
      {children}
    </a>
  );
}