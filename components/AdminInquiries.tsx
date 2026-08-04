"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2, CheckCircle2, Circle, FileText } from "lucide-react";
import clsx from "clsx";

interface Inquiry {
  id: string;
  eventType: string;
  packageTier: string;
  addOns: string[];
  guestCount: string;
  estimate: number;
  name: string;
  email: string;
  eventDate: string;
  createdAt: number;
  contacted: boolean;
  contractSentAt?: number;
  depositPaidAt?: number;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  const load = () => {
    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((data) => setInquiries(data.inquiries || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const toggleContacted = async (inquiry: Inquiry) => {
    await fetch(`/api/inquiries/${inquiry.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contacted: !inquiry.contacted }),
    });
    load();
  };

  const sendContract = async (id: string) => {
    setSendingId(id);
    setSendError(null);
    const res = await fetch(`/api/inquiries/${id}/send-contract`, {
      method: "POST",
    });
    if (!res.ok) {
      setSendError(
        "Couldn't send the contract — check that RESEND_API_KEY is set up correctly."
      );
    }
    setSendingId(null);
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="rounded-3xl border border-cream/10 bg-surface p-6">
      <h2 className="font-display text-xl font-semibold text-cream">
        Booking inquiries
      </h2>
      <p className="mt-1.5 text-sm text-muted">
        Every quote request submitted on the site shows up here. Mark one as
        contacted once you've followed up, or delete it once it's handled.
      </p>
      {sendError && (
        <p className="mt-3 rounded-xl bg-blush/10 px-4 py-2.5 text-sm text-blush">
          {sendError}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {loading ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : inquiries.length === 0 ? (
          <p className="text-sm text-muted">
            No inquiries yet — they'll appear here as soon as someone submits
            the booking form.
          </p>
        ) : (
          inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className={clsx(
                "rounded-2xl border p-4 sm:flex sm:items-center sm:justify-between",
                inquiry.contacted
                  ? "border-cream/8 bg-ink/50 opacity-60"
                  : "border-cream/10 bg-ink"
              )}
            >
              <div>
                <p className="font-medium text-cream">
                  {inquiry.name}
                  <span className="ml-2 text-sm font-normal text-muted">
                    &middot; {inquiry.eventType || "—"} &middot;{" "}
                    {inquiry.packageTier || "—"} &middot; $
                    {inquiry.estimate.toLocaleString()}
                  </span>
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                  <Mail size={12} />
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="hover:text-flash-soft"
                  >
                    {inquiry.email}
                  </a>
                  <span>
                    &middot; Event date:{" "}
                    {inquiry.eventDate
                      ? new Date(
                          `${inquiry.eventDate}T00:00:00`
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                  <span>
                    &middot; Submitted{" "}
                    {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {inquiry.contractSentAt && (
                    <span className="text-flash-soft">
                      &middot; Contract sent{" "}
                      {new Date(inquiry.contractSentAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                    </span>
                  )}
                  {inquiry.depositPaidAt && (
                    <span className="font-semibold text-flash">
                      &middot; Deposit paid ✓
                    </span>
                  )}
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2 sm:mt-0">
                <button
                  onClick={() => sendContract(inquiry.id)}
                  disabled={sendingId === inquiry.id}
                  className="btn-secondary !px-4 !py-2 !text-xs disabled:opacity-50"
                >
                  <FileText size={14} />
                  {sendingId === inquiry.id
                    ? "Sending..."
                    : inquiry.contractSentAt
                    ? "Resend contract"
                    : "Send contract"}
                </button>
                <button
                  onClick={() => toggleContacted(inquiry)}
                  className="btn-secondary !px-4 !py-2 !text-xs"
                >
                  {inquiry.contacted ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <Circle size={14} />
                  )}
                  {inquiry.contacted ? "Contacted" : "Mark contacted"}
                </button>
                <button
                  onClick={() => remove(inquiry.id)}
                  aria-label="Delete inquiry"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/12 text-muted transition-colors hover:border-blush/40 hover:text-blush"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
