"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "How far in advance should we book?",
    a: "Most couples and event planners book 3-6 months out, especially for weekend dates in peak season (May-October). Popular dates can go fast, so we'd recommend locking in your date as soon as your venue is confirmed.",
  },
  {
    q: "What's included in the base package?",
    a: "Every package includes delivery and setup, a friendly on-site attendant for the full booking window, your choice of one backdrop, unlimited double prints, and instant digital sharing via text or email.",
  },
  {
    q: "Do you travel outside your home area?",
    a: "Yes — we regularly travel for weddings and corporate events. Travel fees are calculated based on distance and are always disclosed up front in your quote, never as a surprise.",
  },
  {
    q: "Can we customize the photo strip design?",
    a: "Absolutely. Send us your colors, logo, or theme and we'll design a custom template for your photo strips at no extra charge, included with every booking.",
  },
  {
    q: "What happens if we need to reschedule?",
    a: "Life happens. We offer one free reschedule as long as we're notified at least 14 days before your original date, subject to availability on the new date.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">FAQ</span>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
            Questions, answered.
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-cream/10 rounded-3xl border border-cream/10 bg-surface">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="px-6 sm:px-8">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-medium text-cream">{item.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-flash-soft transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus size={15} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
