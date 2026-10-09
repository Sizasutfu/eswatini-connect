export default function WhySection() {
  const features = [
    {
      title: "Discover Local Businesses",
      body: "Find businesses and service providers across Eswatini.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg>,
    },
    {
      title: "Connect Directly",
      body: "Contact businesses without unnecessary intermediaries.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    },
    {
      title: "Support Local Entrepreneurs",
      body: "Help local businesses improve their visibility.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    },
    {
      title: "Explore With Ease",
      body: "Use categories and location filters to find relevant services.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-night-bg" aria-labelledby="why-heading">
      <div className="container">
        <div className="max-w-[640px] mx-auto mb-12 text-center">
          <h2 id="why-heading" className="text-[1.55rem] sm:text-[1.8rem] lg:text-[2.1rem] font-bold">
            Why Eswatini Connect?
          </h2>
          <p className="text-brand-muted text-[1.08rem] dark:text-night-muted">
            Built to make local discovery simple, direct, and community-focused.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((f) => (
            <article key={f.title}
              className="bg-brand-soft border border-transparent rounded-brand-lg p-8 transition
                hover:bg-white hover:border-brand-line hover:-translate-y-0.5
                dark:bg-night-surface dark:hover:bg-night-elevated dark:hover:border-night-line">
              <div className="w-[52px] h-[52px] inline-flex items-center justify-center rounded-brand-md bg-brand-green text-white mb-4">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-brand-ink mb-2 dark:text-night-heading">
                {f.title}
              </h3>
              <p className="text-sm text-brand-muted dark:text-night-muted">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}