"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordContent() {
  const params = useSearchParams();
  const token = params.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("This reset link is missing its token. Please request a new one.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
        <div className="max-w-sm">
          <h1 className="font-display text-2xl font-semibold text-cream">
            Password updated!
          </h1>
          <p className="mt-3 text-muted">
            You can now log in with your new password.
          </p>
          <Link href="/admin" className="btn-primary mt-7 inline-flex">
            Go to admin login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm rounded-3xl border border-cream/10 bg-surface p-8">
        <h1 className="font-display text-2xl font-semibold text-cream">
          Set a new password
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-xl border border-cream/12 bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-flash"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-xl border border-cream/12 bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-flash"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary disabled:opacity-50"
          >
            {submitting ? "Updating..." : "Update password"}
          </button>
        </form>
        {error && (
          <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
