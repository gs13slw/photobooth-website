"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Cycles through your real event photos — swap or reorder freely.
const PHOTOS = [
  "/images/gallery-2.jpg",
  "/images/gallery-1.jpg",
  "/images/gallery-7.jpg",
  "/images/gallery-9.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-8.jpg",
];

const SLIDE_DURATION_MS = 3200;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 180);
      setTimeout(() => setIndex((i) => (i + 1) % PHOTOS.length), 150);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-paper-raised">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.09 }}
            transition={{ duration: SLIDE_DURATION_MS / 1000, ease: "linear" }}
          >
            <Image
              src={PHOTOS[index]}
              alt="Guests captured at a Lasting Moments Booth event"
              fill
              sizes="280px"
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Camera-flash pulse on each transition */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white"
        animate={{ opacity: flash ? 0.75 : 0 }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
}
