"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, Camera } from "lucide-react";

export default function GalleryLookupPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    router.push(`/gallery/${encodeURIComponent(code.trim().toUpperCase())}`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm text-center">
        <a href="/" className="mx-auto mb-8 flex w-fit items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-flash text-ink">
            <Camera size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold text-cream">
            Lasting Moments<span className="text-flash-soft"> Booth</span>
          </span>
        </a>

        <p className="eyebrow justify-center">Event Gallery</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-cream">
          Find your photos
        </h1>
        <p className="mt-3 text-sm text-muted">
          Enter the event code from your photo strip, QR code, or
          confirmation email. Galleries are available for 90 days after your
          event date.
        </p>

        <div className="mt-8 flex items-center gap-2 rounded-full border border-cream/15 bg-surface p-1.5">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. 080226-7F3K"
            className="w-full bg-transparent px-4 py-2.5 text-sm text-cream placeholder:text-muted/50 outline-none"
          />
          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flash text-ink transition-transform hover:scale-105"
            aria-label="Find gallery"
          >
            <Search size={16} />
          </button>
        </div>
      </form>
    </main>
  );
}
