"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Aperture,
  BookImage,
  Sparkles,
  Image as ImageIcon,
  Palette,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";

type Category =
  | "All"
  | "Weddings"
  | "Birthdays"
  | "Family Reunions"
  | "Corporate";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  categories: Category[];
  tag: string;
}

const CATEGORIES: Category[] = [
  "All",
  "Weddings",
  "Birthdays",
  "Family Reunions",
  "Corporate",
];

const SERVICES: Service[] = [
  {
    title: "Open-Air Photo Booth",
    description:
      "High-quality photos with unlimited sessions — big groups pile in together, no waiting in line between shots.",
    icon: Aperture,
    categories: ["Weddings", "Birthdays", "Family Reunions", "Corporate"],
    tag: "Most booked",
  },
  {
    title: "Custom Photo Strip Design",
    description:
      "Every package includes a photo strip designed around your event — your names, date, colors, or company logo.",
    icon: Palette,
    categories: ["Weddings", "Birthdays", "Corporate"],
    tag: "Included",
  },
  {
    title: "Premium Backdrops",
    description:
      "Choose from our backdrop collection or request a fully custom design built to match your theme.",
    icon: ImageIcon,
    categories: ["Weddings", "Birthdays", "Family Reunions", "Corporate"],
    tag: "Custom option",
  },
  {
    title: "Online Gallery Access",
    description:
      "Every photo from your event lands in a private online gallery your guests can revisit anytime.",
    icon: Sparkles,
    categories: ["Weddings", "Corporate", "Family Reunions"],
    tag: "Included",
  },
  {
    title: "VIP Guestbook Service",
    description:
      "A dedicated guestbook attendant helps guests add a printed photo and a personal note for the happy couple.",
    icon: BookImage,
    categories: ["Weddings", "Birthdays"],
    tag: "Platinum package",
  },
  {
    title: "Corporate Events",
    description:
      "Branded photo strips, on-brand backdrops, and a friendly attendant who keeps things moving at launches and holiday parties.",
    icon: Briefcase,
    categories: ["Corporate"],
    tag: "White-glove",
  },
];

export default function Services() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(() => {
    if (active === "All") return SERVICES;
    return SERVICES.filter((s) => s.categories.includes(active));
  }, [active]);

  return (
    <section id="services" className="relative py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <Sparkles size={13} />
            Experiences
          </span>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-ink-text sm:text-5xl">
            Perfect for every memory.
          </h2>
          <p className="mt-5 text-balance text-lg text-muted-dark">
            Premium photo booth experiences designed to make every moment
            unforgettable — weddings, birthdays, family reunions, corporate
            events, and more.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={clsx(
                "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300",
                active === cat
                  ? "border-flash bg-flash text-ink"
                  : "border-ink-text/15 bg-transparent text-muted-dark hover:border-ink-text/30 hover:text-ink-text"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-3xl border border-ink-text/10 bg-paper-raised p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-flash/30 hover:shadow-glow"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-flash-glow opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-inset text-flash-warm transition-colors duration-300 group-hover:bg-flash group-hover:text-ink">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full border border-ink-text/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-dark">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="relative mt-6 font-display text-xl font-semibold text-ink-text">
                    {service.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-muted-dark">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
