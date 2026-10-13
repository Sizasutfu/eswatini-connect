import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth / email-confirmation callback.
 * Supabase redirects here after the user clicks the confirmation link
 * in their email. We exchange the code for a session and then redirect.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next") ?? "/";

  // Only allow relative paths — reject anything that tries to escape
  // to another origin (defensive; the string-concat form below is
  // already safe, but this makes the intent explicit).
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    console.error("[auth/callback] exchangeCodeForSession failed:", error);
  }

  return NextResponse.redirect(
    `${origin}/auth/sign-in?error=Could+not+verify+email`
  );
}