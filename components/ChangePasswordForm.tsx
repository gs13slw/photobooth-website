"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation don't match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-cream/10 bg-surface p-6">
      <h2 className="font-display text-2xl font-semibold text-cream">
        Change admin password
      </h2>
      <p className="mt-2 max-w-xl text-muted">
        Update the password used to log into this admin dashboard.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            Current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-cream/12 bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-flash"
          />
        </div>
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

        <div className="sm:col-span-3">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary h-fit disabled:opacity-50"
          >
            {submitting ? "Updating..." : "Update password"}
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
          Password updated successfully.
        </p>
      )}
    </div>
  );
}