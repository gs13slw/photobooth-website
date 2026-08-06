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
    <section
      id="services"
      className="relative overflow-hidden border-y border-black/10 bg-[#8A6D1E] py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-black/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/10 blur-3xl"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center text-black">
            <Sparkles size={13} />
            Experiences
          </span>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            Perfect for every memory.
          </h2>
          <p className="mt-5 text-balance text-lg text-black/80">
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
                  ? "border-black bg-black text-flash"
                  : "border-black/25 bg-transparent text-black hover:border-black/50 hover:bg-black/5"
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
                  className="group relative overflow-hidden rounded-3xl border border-black/15 bg-flash p-7 transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/10 text-black transition-colors duration-300 group-hover:bg-black group-hover:text-flash">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full border border-black/20 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-black/70">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="relative mt-6 font-display text-xl font-semibold text-black">
                    {service.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-black/80">
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
