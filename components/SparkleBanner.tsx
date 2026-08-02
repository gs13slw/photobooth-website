"use client";

import { motion } from "framer-motion";

// Handcrafted sparkle field — drifting magenta/gold glows plus twinkling
// dots, meant to echo the glitter in the logo artwork without relying on
// a static image (so it can actually move, and can stretch full width).
const SPARKS = [
  { top: "20%", left: "6%", size: 2, delay: 0 },
  { top: "65%", left: "12%", size: 3, delay: 0.8 },
  { top: "35%", left: "22%", size: 2, delay: 1.6 },
  { top: "15%", left: "34%", size: 2, delay: 0.4 },
  { top: "70%", left: "40%", size: 3, delay: 2.1 },
  { top: "30%", left: "50%", size: 2, delay: 1.1 },
  { top: "60%", left: "58%", size: 2, delay: 0.6 },
  { top: "20%", left: "66%", size: 3, delay: 1.8 },
  { top: "75%", left: "72%", size: 2, delay: 0.2 },
  { top: "40%", left: "80%", size: 2, delay: 1.4 },
  { top: "18%", left: "88%", size: 3, delay: 2.4 },
  { top: "68%", left: "94%", size: 2, delay: 0.9 },
];

export default function SparkleBanner() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base plum wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a1030] via-[#2a0f24] to-ink" />

      {/* Drifting color blooms */}
      <motion.div
        className="absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(196,58,150,0.45)_0%,rgba(196,58,150,0)_70%)]"
        animate={{ x: [0, 60, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[-20%] h-80 w-80 bg-flash-glow"
        animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 bottom-[-30%] h-64 w-64 bg-blush-glow opacity-70"
        animate={{ x: [0, 30, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Twinkling sparks */}
      {SPARKS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-flash-soft"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 6px 1px rgba(242,184,75,0.85)",
          }}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
