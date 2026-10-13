"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  PRIVACY_PATH,
  PRIVACY_VERSION,
  TERMS_PATH,
  TERMS_VERSION,
} from "@/lib/legal";

type Mode = "sign-in" | "sign-up";

interface Props {
  mode: Mode;
}

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSignUp = mode === "sign-up";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (isSignUp && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (isSignUp && !accepted) {
      setError(
        "Please accept the Terms of Service and Privacy Policy to continue."
      );
      return;
    }

    setSubmitting(true);
    const supabase = createClient();

    if (isSignUp) {
      const acceptedAt = new Date().toISOString();

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
            next
          )}`,
          // Record legal consent in user metadata for compliance audits.
          data: {
            terms_accepted_at: acceptedAt,
            terms_version: TERMS_VERSION,
            privacy_version: PRIVACY_VERSION,
          },
        },
      });

      setSubmitting(false);

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session) {
        // Email confirmation disabled — user is signed in immediately.
        router.push(next);
        router.refresh();
        return;
      }

      setMessage(
        "Check your email to confirm your account, then sign in."
      );
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      setSubmitting(false);

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push(next);
      router.refresh();
    }
  }

  const inputCls =
    "w-full px-3.5 py-2.5 border rounded-brand-sm text-sm outline-none transition " +
    "border-brand-line bg-white text-brand-ink " +
    "focus:border-brand-green focus:ring-[3px] focus:ring-brand-green/10 " +
    "dark:border-night-line dark:bg-night-elevated dark:text-night-heading " +
    "dark:focus:border-brand-gold dark:focus:ring-brand-gold/15";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-xs font-semibold text-brand-ink dark:text-night-heading"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-xs font-semibold text-brand-ink dark:text-night-heading"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputCls}
          required
          minLength={6}
        />
      </div>

      {/* Confirm password — sign-up only */}
      {isSignUp && (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirm"
            className="text-xs font-semibold text-brand-ink dark:text-night-heading"
          >
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={inputCls}
            required
            minLength={6}
          />
        </div>
      )}

      {/* Terms acceptance — sign-up only */}
      {isSignUp && (
        <label className="flex items-start gap-3 cursor-pointer select-none mt-1">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => {
              setAccepted(e.target.checked);
              if (error) setError(null);
            }}
            className="mt-0.5 shrink-0 w-4 h-4 rounded border-brand-line text-brand-green
              focus:ring-2 focus:ring-brand-gold focus:ring-offset-2
              dark:border-night-line dark:bg-night-elevated dark:ring-offset-night-surface"
          />
          <span className="text-xs leading-relaxed text-brand-body dark:text-night-text">
            I have read and agree to the{" "}
            <Link
              href={TERMS_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-green hover:text-brand-greenDark dark:text-brand-gold dark:hover:brightness-110 underline underline-offset-2"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={PRIVACY_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-green hover:text-brand-greenDark dark:text-brand-gold dark:hover:brightness-110 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting || (isSignUp && !accepted)}
        className="btn btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting
          ? "Please wait…"
          : isSignUp
          ? "Create account"
          : "Sign in"}
      </button>

      {/* Error banner */}
      {error && (
        <p
          role="alert"
          className="px-4 py-3 rounded-brand-sm text-sm border
            bg-red-50 text-red-700 border-red-200
            dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/40"
        >
          {error}
        </p>
      )}

      {/* Success banner */}
      {message && (
        <p
          role="status"
          className="px-4 py-3 rounded-brand-sm text-sm border
            bg-brand-greenLight text-brand-greenDark border-[#b6dcc6]
            dark:bg-brand-green/15 dark:text-brand-gold dark:border-brand-green/40"
        >
          {message}
        </p>
      )}

      <p className="text-sm text-brand-muted text-center mt-2 dark:text-night-muted">
        {isSignUp ? (
          <>
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="font-medium text-brand-green hover:text-brand-greenDark dark:text-brand-gold dark:hover:brightness-110"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-medium text-brand-green hover:text-brand-greenDark dark:text-brand-gold dark:hover:brightness-110"
            >
              Create one
            </Link>
          </>
        )}
      </p>
    </form>
  );
}