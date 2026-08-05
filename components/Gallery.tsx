"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// gallery-1 and gallery-2 are real event photos. Replace gallery-3 through
// gallery-6 with real photos as they come in — drop them into
// /public/images/ using these filenames and update the labels/captions below.
const GALLERY_ITEMS = [
  {
    src: "/images/gallery-1.jpg",
    label: "Celebration Night",
    caption: "Non-stop laughs and photo strips all night long.",
  },
  {
    src: "/images/gallery-2.jpg",
    label: "Wedding Reception",
    caption: "A favorite reception add-on, loved by guests of all ages.",
  },
  {
    src: "/images/gallery-3.jpg",
    label: "Garden Celebration",
    caption: "Soft outdoor light made every print feel extra special.",
  },
  {
    src: "/images/gallery-4.jpg",
    label: "Black & Gold Celebration",
    caption: "Sleek styling to match a bold, elegant color palette.",
  },
  {
    src: "/images/gallery-5.jpg",
    label: "Corporate Celebration",
    caption: "A polished, professional touch for team celebrations.",
  },
  {
    src: "/images/gallery-6.jpg",
    label: "Formal Celebration",
    caption: "Timeless prints for a black-tie evening to remember.",
  },
  {
    src: "/images/gallery-7.jpg",
    label: "Playful Moments",
    caption: "Props and poses that had everyone cracking up.",
  },
  {
    src: "/images/gallery-8.jpg",
    label: "Glamorous Night Out",
    caption: "Glitz, glam, and a photo strip to prove it.",
  },
  {
    src: "/images/gallery-9.jpg",
    label: "Sweet Celebration",
    caption: "Sweet moments captured, one flash at a time.",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <span className="eyebrow">Gallery</span>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
              Moments, freshly printed.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted">
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

              <div className="mt-3 rounded-xl border border-cream/10 bg-surface/60 p-3">
                <p className="text-xs leading-snug text-cream/80">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
