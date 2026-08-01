"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function AdminAvailabilityManager() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewDate, setViewDate] = useState(() => new Date(today));
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<string | null>(null);

  const loadDates = () => {
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data) => setBookedDates(new Set(data.bookedDates || [])))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDates();
  }, []);

  const toggleDate = async (iso: string, currentlyBooked: boolean) => {
    setPending(iso);
    const res = await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: iso,
        action: currentlyBooked ? "unblock" : "block",
      }),
    });
    const data = await res.json();
    setBookedDates(new Set(data.bookedDates || []));
    setPending(null);
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstOfMonth.getDay();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const canGoBack =
    new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="rounded-3xl border border-cream/10 bg-surface p-6">
      <h2 className="font-display text-xl font-semibold text-cream">
        Manage availability
      </h2>
      <p className="mt-1.5 text-sm text-muted">
        Click a date to block or unblock it. Blocked dates won&apos;t show as
        available on the public booking calendar. Dates automatically block
        themselves when you create an event gallery for them.
      </p>

      <div className="mt-6 max-w-sm">
        <div className="flex items-center justify-between px-1 pb-3">
          <button
            type="button"
            onClick={() => canGoBack && setViewDate(new Date(year, month - 1, 1))}
            disabled={!canGoBack}
            className={clsx(
              "flex h-8 w-8 items-center justify-center rounded-full border border-cream/12 text-muted transition-colors",
              canGoBack ? "hover:border-flash/40 hover:text-flash-soft" : "opacity-30"
            )}
            aria-label="Previous month"
          >
            <ChevronLeft size={15} />
          </button>
          <p className="font-display text-sm font-semibold text-cream">
            {MONTH_NAMES[month]} {year}
          </p>
          <button
            type="button"
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/12 text-muted transition-colors hover:border-flash/40 hover:text-flash-soft"
            aria-label="Next month"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 px-1 pb-1 text-center text-[11px] font-medium text-muted/70">
          {WEEKDAY_LABELS.map((w, i) => (
            <div key={i}>{w}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 px-1">
          {cells.map((date, i) => {
            if (!date) return <div key={i} />;
            const iso = toISODate(date);
            const booked = bookedDates.has(iso);
            const isPending = pending === iso;

            return (
              <button
                key={i}
                type="button"
                disabled={loading || isPending}
                onClick={() => toggleDate(iso, booked)}
                title={booked ? "Click to unblock" : "Click to block"}
                className={clsx(
                  "flex aspect-square items-center justify-center rounded-lg text-xs transition-all",
                  booked
                    ? "bg-blush/20 text-blush-soft hover:bg-blush/30"
                    : "text-cream hover:bg-cream/10",
                  isPending && "opacity-40"
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-cream/10 px-1 pt-3 text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blush/40" /> Blocked
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-cream/30" />
            Open
          </span>
        </div>
      </div>
    </div>
  );
}
