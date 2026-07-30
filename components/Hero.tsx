"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import AmbientGlow from "./AmbientGlow";

// Real event photos. Drop more into /public/images/ as hero-strip-3.jpg,
// hero-strip-4.jpg etc. and add them to this array.
const STRIP_SHOTS = [
  { src: "/images/hero-strip-1.jpg" },
  { src: "/images/hero-strip-2.jpg" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20"
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

          <h1 className="text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-6xl lg:text-[4.2rem]">
            Capture. Celebrate.
            <br />
            <span className="italic text-flash-soft">Cherish forever.</span>
          </h1>

          <p className="mt-7 max-w-lg text-balance text-lg leading-relaxed text-muted">
            Premium photo booth experiences designed to make every moment
            unforgettable — weddings, birthdays, family reunions, and
            corporate events. Serving Atlanta &amp; surrounding areas.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#booking" className="btn-primary">
              Get your quote
              <ArrowRight size={16} />
            </a>
            <a href="#gallery" className="btn-secondary">
              <PlayCircle size={16} />
              See it in action
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-muted">
            <div>
              <span className="font-display text-2xl font-semibold text-cream">
                Unlimited
              </span>{" "}
              sessions &amp; prints
            </div>
            <div className="hidden h-8 w-px bg-cream/10 sm:block" />
            <div>
              <span className="font-display text-2xl font-semibold text-cream">
                Custom
              </span>{" "}
              photo strip design
            </div>
            <div className="hidden h-8 w-px bg-cream/10 sm:block" />
            <div>
              <span className="font-display text-2xl font-semibold text-cream">
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
          className="relative mx-auto w-full max-w-[280px] animate-drift lg:mx-0 lg:ml-auto"
        >
          <div className="strip-edge rounded-2xl border border-cream/10 bg-surface p-3 shadow-strip">
            <div className="flex flex-col gap-2.5">
              {STRIP_SHOTS.map((shot, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] overflow-hidden rounded-lg bg-ink"
                >
                  <Image
                    src={shot.src}
                    alt="Guests captured at a Lasting Moments Booth event"
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 text-center font-display text-sm italic text-muted">
              Lasting Moments Booth, LLC
            </p>
          </div>

          {/* Second strip peeking behind for depth */}
          <div
            aria-hidden="true"
            className="absolute -right-6 top-8 -z-10 h-full w-full rotate-[8deg] rounded-2xl border border-cream/5 bg-surface-raised/60 blur-[1px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
