"use client";

import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { Lock, Plus, Copy, Check, Upload, Clock } from "lucide-react";
import clsx from "clsx";
import AdminAvailabilityManager from "@/components/AdminAvailabilityManager";
import AdminInquiries from "@/components/AdminInquiries";
import AdminAvailabilityManager from "@/components/AdminAvailabilityManager";
import AdminInquiries from "@/components/AdminInquiries";
import ChangePasswordForm from "@/components/ChangePasswordForm";
interface GalleryEvent {
  code: string;
  eventDate: string;
  clientName?: string;
  clientEmail?: string;
  createdAt: number;
  expiresAt: number;
  photos: string[];
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => setAuthed(res.ok))
      .catch(() => setAuthed(false));
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoggingIn(false);
    if (res.ok) {
      setAuthed(true);
    } else {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error || "Something went wrong.");
    }
  };

  if (authed === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink">
        <p className="text-muted">Loading...</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl border border-cream/10 bg-surface p-8"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-flash text-ink">
            <Lock size={18} />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold text-cream">
            Client &amp; admin access
          </h1>
          <p className="mt-2 text-sm text-muted">
            Enter your password to create event galleries and upload photos.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="mt-6 w-full rounded-xl border border-cream/12 bg-ink px-4 py-3 text-sm text-cream outline-none focus:border-flash"
          />
          {loginError && <p className="mt-2 text-sm text-blush">{loginError}</p>}
          <button
            type="submit"
            disabled={loggingIn}
            className="btn-primary mt-5 w-full disabled:opacity-50"
          >
            {loggingIn ? "Checking..." : "Log in"}
          </button>
        </form>
      </main>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventDate, setEventDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [creating, setCreating] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const loadEvents = async () => {
    setLoading(true);
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data.events || []);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventDate) return;
    setCreating(true);
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventDate, clientName, clientEmail }),
    });
    setEventDate("");
    setClientName("");
    setClientEmail("");
    setCreating(false);
    loadEvents();
  };

  const copyLink = (code: string) => {
    const url = `${window.location.origin}/gallery/${code}`;
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  return (
    <main className="min-h-screen bg-ink px-6 py-16">
      <div className="container-x">
        <h1 className="font-display text-3xl font-semibold text-cream">
          Admin dashboard
        </h1>

        <div className="mt-8">
          <AdminInquiries />
        </div>

        <div className="mt-8">
          <AdminAvailabilityManager />
        </div>

        <h2 className="mt-14 font-display text-2xl font-semibold text-cream">
          Event galleries
        </h2>
        <p className="mt-2 max-w-xl text-muted">
          Create a gallery for each event, then upload the photos. Guests can
          view and download them at{" "}
          <span className="text-cream">/gallery/[code]</span> for 90 days
          after the event date.
        </p>

        <form
          onSubmit={handleCreate}
          className="mt-10 grid grid-cols-1 gap-4 rounded-3xl border border-cream/10 bg-surface p-6 sm:grid-cols-[1fr_1fr_1fr_auto]"
        >
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Event date
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="w-full rounded-xl border border-cream/12 bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-flash [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Client name (optional)
            </label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded-xl border border-cream/12 bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-flash"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">
              Client email (optional)
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full rounded-xl border border-cream/12 bg-ink px-3 py-2.5 text-sm text-cream outline-none focus:border-flash"
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="btn-primary h-fit self-end disabled:opacity-50"
          >
            <Plus size={16} />
            Create
          </button>
        </form>

        <div className="mt-10 flex flex-col gap-4">
          {loading ? (
            <p className="text-muted">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-muted">
              No events yet — create your first one above.
            </p>
          ) : (
            events.map((event) => (
              <EventRow
                key={event.code}
                event={event}
                onUploaded={loadEvents}
                onCopy={() => copyLink(event.code)}
                copied={copiedCode === event.code}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function EventRow({
  event,
  onUploaded,
  onCopy,
  copied,
}: {
  event: GalleryEvent;
  onUploaded: () => void;
  onCopy: () => void;
  copied: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const expired = Date.now() > event.expiresAt;
  const daysLeft = Math.max(
    0,
    Math.ceil((event.expiresAt - Date.now()) / (24 * 60 * 60 * 1000))
  );

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));
    await fetch(`/api/events/${event.code}/photos`, {
      method: "POST",
      body: formData,
    });
    setUploading(false);
    onUploaded();
    e.target.value = "";
  };

  return (
    <div className="rounded-2xl border border-cream/10 bg-surface p-5 sm:flex sm:items-center sm:justify-between">
      <div>
        <p className="font-display text-lg font-semibold text-cream">
          {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          {event.clientName && (
            <span className="ml-2 text-sm font-normal text-muted">
              &middot; {event.clientName}
            </span>
          )}
        </p>
        <p className="mt-1 font-mono text-sm text-flash-soft">{event.code}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
          <Clock size={12} />
          {expired ? "Expired" : `${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining`}
          &middot; {event.photos.length} photo{event.photos.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2 sm:mt-0">
        <button onClick={onCopy} className="btn-secondary !px-4 !py-2 !text-xs">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy link"}
        </button>
        <label
          className={clsx(
            "btn-primary !px-4 !py-2 !text-xs cursor-pointer",
            uploading && "pointer-events-none opacity-50"
          )}
        >
          <Upload size={14} />
          {uploading ? "Uploading..." : "Upload photos"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}
