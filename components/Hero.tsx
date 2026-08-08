"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import AmbientGlow from "./AmbientGlow";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[90svh] items-center overflow-hidden bg-paper py-20"
    >
      <AmbientGlow />

      <div className="container-x relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="eyebrow mb-6">
            <Sparkles size={13} />
            Lasting Moments, Captured Forever
          </span>

          <h1 className="text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink-text sm:text-6xl lg:text-[4.2rem]">
            Capture. Celebrate.
            <br />
            <span className="italic text-flash-soft">Cherish forever.</span>
          </h1>

          <p className="mt-7 max-w-lg text-balance text-lg leading-relaxed text-muted-dark">
            Premium photo booth experiences designed to make every moment
            unforgettable — weddings, birthdays, family reunions, and
            corporate events. Serving Atlanta &amp; surrounding areas.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#booking" className="btn-primary">
              Get your quote
              <ArrowRight size={16} />
            </a>
            <a href="#gallery" className="btn-secondary-light">
              <PlayCircle size={16} />
              See it in action
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-muted-dark">
            <div>
              <span className="font-display text-2xl font-semibold text-ink-text">
                Unlimited
              </span>{" "}
              sessions &amp; prints
            </div>
            <div className="hidden h-8 w-px bg-ink-text/10 sm:block" />
            <div>
              <span className="font-display text-2xl font-semibold text-ink-text">
                Custom
              </span>{" "}
              photo strip design
            </div>
            <div className="hidden h-8 w-px bg-ink-text/10 sm:block" />
            <div>
              <span className="font-display text-2xl font-semibold text-ink-text">
                Online
              </span>{" "}
              gallery access
            </div>
          </div>
        </motion.div>

        {/* Signature element: a tilted, floating photo strip of real event shots */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto w-full max-w-[420px] animate-drift lg:mx-0 lg:ml-auto"
        >
          <div className="rounded-2xl border border-ink-text/10 bg-paper-raised p-3 shadow-strip">
            <HeroVideo />
            <p className="mt-3 text-center font-display text-sm italic text-muted-dark">
              Lasting Moments Booth, LLC
            </p>
          </div>

          {/* Second strip peeking behind for depth */}
          <div
            aria-hidden="true"
            className="absolute -right-6 top-8 -z-10 h-full w-full rotate-[8deg] rounded-2xl border border-ink-text/5 bg-paper-raised/60 blur-[1px]"
          />
        </motion.div>
      </div>
    </section>  );
}
