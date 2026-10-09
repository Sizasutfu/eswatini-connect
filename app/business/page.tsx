import { redirect } from "next/navigation";

/**
 * Visiting /business/ with no slug redirects to /explore.
 * Without this, Next.js matches the dynamic [slug] route with an empty
 * slug, which then renders a confusing "business not found" page.
 */
export default function BusinessIndexPage() {
  redirect("/explore");
}