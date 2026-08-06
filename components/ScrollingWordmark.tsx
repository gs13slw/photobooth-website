"use client";

import { motion } from "framer-motion";

function WordmarkItem() {
  return (
    <span className="mx-8 inline-flex shrink-0 items-baseline gap-3 whitespace-nowrap font-display text-3xl md:text-5xl">
      <span className="italic text-blush drop-shadow-[0_0_12px_rgba(232,135,158,0.55)]">
        Lasting
      </span>
      <span className="font-semibold text-flash drop-shadow-[0_0_12px_rgba(242,184,75,0.55)]">
        Moments
      </span>
      <span className="italic text-blush-soft drop-shadow-[0_0_12px_rgba(232,135,158,0.55)]">
        Booth, LLC
      </span>
    </span>
  );
}

// Render the same set of items twice back-to-back, then animate exactly
// -50% — that makes the loop seamless regardless of how many items there are.
const REPEAT_COUNT = 4;

export default function ScrollingWordmark() {
  const items = Array.from({ length: REPEAT_COUNT });

  return (
    <div className="absolute inset-0 flex items-center overflow-hidden">
      <motion.div
        className="flex shrink-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((_, i) => (
          <WordmarkItem key={i} />
        ))}
      </motion.div>
    </div>
  );
}
