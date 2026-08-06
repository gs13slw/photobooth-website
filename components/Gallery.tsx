"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

// gallery-1 and gallery-2 are real event photos. Replace gallery-3 through
// gallery-6 with real photos as they come in — drop them into
// /public/images/ using these filenames and update the labels below.
//
// ⚠️ The reviews below (name + quote) are PLACEHOLDER TEXT, not real
// customer feedback. Swap these for genuine reviews as soon as you have
// them — using fabricated testimonials on a live business site can run
// into FTC/advertising-truthfulness issues in the US.
const GALLERY_ITEMS = [
  {
    src: "/images/gallery-1.jpg",
    label: "Celebration Night",
    name: "Jasmine R.",
    quote: "Everyone was still talking about the photo booth days later!",
  },
  {
    src: "/images/gallery-2.jpg",
    label: "Wedding Reception",
    name: "Marcus T.",
    quote: "Such a fun addition to our reception — worth every penny.",
  },
  {
    src: "/images/gallery-3.jpg",
    label: "Garden Celebration",
    name: "Elena V.",
    quote: "The prints came out beautifully, guests loved taking them home.",
  },
  {
    src: "/images/gallery-4.jpg",
    label: "Black & Gold Celebration",
    name: "Devon K.",
    quote: "Setup was seamless and the props were a huge hit with everyone.",
  },
  {
    src: "/images/gallery-5.jpg",
    label: "Corporate Celebration",
    name: "Priya S.",
    quote: "Professional, on time, and our team had a blast using it.",
  },
  {
    src: "/images/gallery-6.jpg",
    label: "Formal Celebration",
    name: "Andre L.",
    quote: "Elegant setup that matched our event perfectly. Highly recommend.",
  },
  {
    src: "/images/gallery-7.jpg",
    label: "Playful Moments",
    name: "Brittany H.",
    quote: "So many laughs! The kids couldn't get enough of the booth.",
  },
  {
    src: "/images/gallery-8.jpg",
    label: "Glamorous Night Out",
    name: "Sophia M.",
    quote: "Glam, fun, and easy to book. Already recommended to friends.",
  },
  {
    src: "/images/gallery-9.jpg",
    label: "Sweet Celebration",
    name: "Tyler B.",
    quote: "Made our celebration feel even more special. Thank you!",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-white py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <span className="eyebrow text-black">Gallery</span>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-black sm:text-5xl">
              Moments, freshly printed.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-black/80">
            A sample of the celebrations we've had the pleasure of
            documenting, one strip at a time.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex flex-col"
            >
              <div className="group relative aspect-square overflow-hidden rounded-2xl border border-cream/10 bg-surface transition-transform duration-500 hover:scale-[1.03]">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/90 to-transparent p-4 pt-8 transition-transform duration-300 group-hover:translate-y-0">
                  <p className="text-sm font-medium text-cream">{item.label}</p>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-black/15 bg-violet-100 p-3">
                <div className="flex gap-0.5 text-black">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star key={starIdx} size={12} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-1.5 text-xs leading-snug text-black">
                  "{item.quote}"
                </p>
                <p className="mt-1 text-xs font-medium text-black/70">
                  — {item.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
