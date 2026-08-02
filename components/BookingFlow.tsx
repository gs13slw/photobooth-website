"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Briefcase,
  PartyPopper,
  Sparkle,
  Aperture,
  Clapperboard,
  Palette,
  BookImage,
  Timer,
  Layers,
} from "lucide-react";
import clsx from "clsx";
import AvailabilityCalendar from "./AvailabilityCalendar";

type EventType = "Wedding" | "Corporate" | "Private Party" | "Other";
type PackageTier = "Gold" | "Silver" | "Platinum";

interface AddOn {
  id: string;
  label: string;
  price: number;
  icon: typeof Palette;
}

const EVENT_TYPES: { id: EventType; icon: typeof Heart; blurb: string }[] = [
  { id: "Wedding", icon: Heart, blurb: "Ceremonies & receptions" },
  { id: "Corporate", icon: Briefcase, blurb: "Launches & holiday parties" },
  { id: "Private Party", icon: PartyPopper, blurb: "Birthdays & milestones" },
  { id: "Other", icon: Sparkle, blurb: "Tell us what you're planning" },
];

const PACKAGES: {
  id: PackageTier;
  icon: typeof Aperture;
  price: number;
  hours: number;
  blurb: string;
}[] = [
  {
    id: "Gold",
    icon: Aperture,
    price: 465,
    hours: 2,
    blurb: "2 hours, unlimited sessions, custom photo strip, props & backdrop",
  },
  {
    id: "Silver",
    icon: Clapperboard,
    price: 690,
    hours: 3,
    blurb: "3 hours, unlimited sessions, custom photo strip, props & backdrop",
  },
  {
    id: "Platinum",
    icon: Sparkle,
    price: 795,
    hours: 4,
    blurb: "4 hours, premium backdrop design, VIP guest book service",
  },
];

const ADD_ONS: AddOn[] = [
  { id: "extra-hour", label: "Extra hour of service", price: 100, icon: Timer },
  { id: "guestbook", label: "Guestbook", price: 100, icon: BookImage },
  { id: "backdrop", label: "Premium backdrop / custom design", price: 75, icon: Palette },
];

const STEPS = ["Event", "Package", "Add-ons", "Details"] as const;

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [pkg, setPkg] = useState<PackageTier | null>(null);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState("50-100");
  const [contact, setContact] = useState({ name: "", email: "", date: "" });

  const selectedPackage = PACKAGES.find((p) => p.id === pkg);
  const selectedAddOns = ADD_ONS.filter((a) => addOns.includes(a.id));

  const estimate = useMemo(() => {
    const base = selectedPackage?.price ?? 0;
    const addOnTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    return base + addOnTotal;
  }, [selectedPackage, selectedAddOns]);

  const canAdvance =
    (step === 0 && eventType !== null) ||
    (step === 1 && pkg !== null) ||
    step === 2 ||
    (step === 3 && contact.name && contact.email && contact.date);

  const toggleAddOn = (id: string) =>
    setAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );

  const handleSubmit = async () => {
    if (!canAdvance || submitting) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType,
          packageTier: pkg,
          addOns,
          guestCount,
          estimate,
          name: contact.name,
          email: contact.email,
          eventDate: contact.date,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your request — please try again, or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="strip-edge mx-auto max-w-xl rounded-3xl border border-cream/10 bg-surface p-10 text-center shadow-strip">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-flash text-ink">
          <Check size={28} strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-cream">
          Got it, {contact.name.split(" ")[0]}!
        </h3>
        <p className="mt-3 text-muted">
          Your inquiry for a {eventType?.toLowerCase()} on{" "}
          <span className="text-cream">{contact.date}</span> is in. We'll
          follow up at <span className="text-cream">{contact.email}</span>{" "}
          within one business day with availability and a formal quote.
        </p>
        <div className="mt-6 rounded-2xl bg-ink px-6 py-4">
          <p className="text-xs uppercase tracking-wide text-muted">
            Estimated total
          </p>
          <p className="font-display text-3xl font-semibold text-flash-soft">
            ${estimate.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted">
            Plus travel fee if outside our standard service area (varies by
            location — confirmed in your formal quote).
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(0);
            setEventType(null);
            setPkg(null);
            setAddOns([]);
            setContact({ name: "", email: "", date: "" });
          }}
          className="btn-secondary mt-7"
        >
          Start a new inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
      {/* Wizard */}
      <div className="strip-edge rounded-3xl border border-cream/10 bg-surface p-6 shadow-strip sm:p-9">
        {/* Progress */}
        <div className="mb-9 flex items-center gap-3">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-3">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={clsx(
                      "font-medium",
                      i <= step ? "text-cream" : "text-muted/60"
                    )}
                  >
                    {label}
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-cream/10">
                  <motion.div
                    className="h-full bg-flash"
                    initial={false}
                    animate={{ width: i <= step ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {step === 0 && (
              <div>
                <h3 className="font-display text-2xl font-semibold text-cream">
                  What are we celebrating?
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  This helps us tailor package recommendations for you.
                </p>
                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {EVENT_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isActive = eventType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setEventType(type.id)}
                        className={clsx(
                          "flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200",
                          isActive
                            ? "border-flash bg-flash/10"
                            : "border-cream/10 bg-ink hover:border-cream/25"
                        )}
                      >
                        <span
                          className={clsx(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                            isActive
                              ? "bg-flash text-ink"
                              : "bg-surface-raised text-flash-soft"
                          )}
                        >
                          <Icon size={17} />
                        </span>
                        <span>
                          <span className="block font-medium text-cream">
                            {type.id}
                          </span>
                          <span className="text-xs text-muted">
                            {type.blurb}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="font-display text-2xl font-semibold text-cream">
                  Choose your package
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  Every package includes unlimited sessions, props &amp;
                  backdrops, and a friendly on-site attendant.
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  {PACKAGES.map((p) => {
                    const Icon = p.icon;
                    const isActive = pkg === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPkg(p.id)}
                        className={clsx(
                          "flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-200",
                          isActive
                            ? "border-flash bg-flash/10"
                            : "border-cream/10 bg-ink hover:border-cream/25"
                        )}
                      >
                        <span className="flex items-center gap-3.5">
                          <span
                            className={clsx(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                              isActive
                                ? "bg-flash text-ink"
                                : "bg-surface-raised text-flash-soft"
                            )}
                          >
                            <Icon size={17} />
                          </span>
                          <span>
                            <span className="block font-medium text-cream">
                              {p.id} &middot; {p.hours}{" "}
                              {p.hours === 1 ? "hour" : "hours"}
                            </span>
                            <span className="text-xs text-muted">
                              {p.blurb}
                            </span>
                          </span>
                        </span>
                        <span className="whitespace-nowrap font-display text-lg font-semibold text-flash-soft">
                          ${p.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-display text-2xl font-semibold text-cream">
                  Sweeten the package
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  Optional add-ons — select as many as you'd like.
                </p>
                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {ADD_ONS.map((addOn) => {
                    const Icon = addOn.icon;
                    const isActive = addOns.includes(addOn.id);
                    return (
                      <button
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn.id)}
                        className={clsx(
                          "flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-200",
                          isActive
                            ? "border-flash bg-flash/10"
                            : "border-cream/10 bg-ink hover:border-cream/25"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={clsx(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                              isActive
                                ? "bg-flash text-ink"
                                : "bg-surface-raised text-flash-soft"
                            )}
                          >
                            <Icon size={15} />
                          </span>
                          <span className="text-sm font-medium text-cream">
                            {addOn.label}
                          </span>
                        </span>
                        <span className="text-sm font-semibold text-muted">
                          +${addOn.price}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-cream">
                    Estimated guest count
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Under 50", "50-100", "100-200", "200+"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGuestCount(g)}
                        className={clsx(
                          "rounded-full border px-4 py-2 text-xs font-medium transition-all",
                          guestCount === g
                            ? "border-flash bg-flash text-ink"
                            : "border-cream/12 text-muted hover:border-cream/30"
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-display text-2xl font-semibold text-cream">
                  Almost there
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  Pick your date and share your details — no call needed.
                </p>
                <div className="mt-7 flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-cream">
                      Event date
                    </label>
                    <AvailabilityCalendar
                      selectedDate={contact.date}
                      onSelect={(date) => setContact({ ...contact, date })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-cream">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) =>
                        setContact({ ...contact, name: e.target.value })
                      }
                      placeholder="Jamie Rivera"
                      className="w-full rounded-xl border border-cream/12 bg-ink px-4 py-3 text-sm text-cream placeholder:text-muted/50 outline-none transition-colors focus:border-flash"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-cream">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      placeholder="jamie@email.com"
                      className="w-full rounded-xl border border-cream/12 bg-ink px-4 py-3 text-sm text-cream placeholder:text-muted/50 outline-none transition-colors focus:border-flash"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-9 flex items-center justify-between border-t border-cream/10 pt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={clsx(
              "flex items-center gap-1.5 text-sm font-medium text-muted transition-opacity",
              step === 0 ? "pointer-events-none opacity-0" : "hover:text-cream"
            )}
          >
            <ArrowLeft size={15} />
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => canAdvance && setStep((s) => s + 1)}
              disabled={!canAdvance}
              className="btn-primary !py-3 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          ) : (
            <div className="flex flex-col items-end gap-2">
              <button
                onClick={handleSubmit}
                disabled={!canAdvance || submitting}
                className="btn-primary !py-3 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? "Sending..." : "Submit inquiry"}
                <Check size={16} />
              </button>
              {submitError && (
                <p className="max-w-xs text-right text-xs text-blush">
                  {submitError}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Live summary */}
      <div className="h-fit rounded-3xl border border-cream/10 bg-ink p-7 lg:sticky lg:top-28">
        <p className="eyebrow">Your estimate</p>
        <p className="mt-3 font-display text-4xl font-semibold text-flash-soft">
          ${estimate.toLocaleString()}
          <span className="text-base font-normal text-muted"> / event</span>
        </p>

        <div className="mt-6 flex flex-col divide-y divide-cream/8">
          <SummaryRow label="Event type" value={eventType ?? "—"} />
          <SummaryRow
            label="Package"
            value={
              selectedPackage
                ? `${selectedPackage.id} · $${selectedPackage.price}`
                : "—"
            }
          />
          <SummaryRow label="Guests" value={guestCount} />
          <SummaryRow
            label="Add-ons"
            value={
              selectedAddOns.length
                ? `${selectedAddOns.length} selected · $${selectedAddOns.reduce(
                    (s, a) => s + a.price,
                    0
                  )}`
                : "None yet"
            }
          />
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          This is a starting estimate and doesn't include travel fees, which
          vary by location and are confirmed once we know your venue.
        </p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-cream">{value}</span>
    </div>
  );
}
