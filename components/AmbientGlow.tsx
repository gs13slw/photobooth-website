"use client";

import { motion } from "framer-motion";

// A handcrafted ambient background: soft drifting gold/blush light blooms
// plus a scattering of slow-twinkling sparks. Deliberately built from CSS
// gradients and motion, not a rendered video — reads as intentional set
// lighting rather than an obviously AI-generated clip.
const SPARKS = [
  { top: "12%", left: "18%", size: 3, delay: 0 },
  { top: "22%", left: "76%", size: 2, delay: 0.6 },
  { top: "38%", left: "8%", size: 2, delay: 1.2 },
  { top: "64%", left: "82%", size: 3, delay: 0.3 },
  { top: "74%", left: "22%", size: 2, delay: 1.8 },
  { top: "18%", left: "48%", size: 2, delay: 0.9 },
  { top: "52%", left: "60%", size: 3, delay: 1.5 },
  { top: "82%", left: "55%", size: 2, delay: 0.4 },
  { top: "30%", left: "90%", size: 2, delay: 2.1 },
  { top: "88%", left: "12%", size: 2, delay: 1.1 },
];

export default function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Slow-drifting light blooms */}
      <motion.div
        className="absolute left-1/2 top-[-15%] h-[650px] w-[900px] -translate-x-1/2 bg-flash-glow"
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-12%] bottom-[-15%] h-[550px] w-[550px] bg-blush-glow"
        animate={{ x: [0, -30, 15, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-10%] bottom-[10%] h-[400px] w-[400px] bg-flash-glow opacity-60"
        animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
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
            boxShadow: "0 0 6px 1px rgba(242,184,75,0.8)",
          }}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Vignette to ground everything in the base color */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,21,35,0.15)_0%,rgba(27,21,35,0.7)_55%,rgba(27,21,35,1)_100%)]" />
    </div>
  );
}
