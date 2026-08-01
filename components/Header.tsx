"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const NAV_LINKS = [
  { label: "Experiences", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Booking", href: "#booking" },
  { label: "FAQ", href: "#faq" },
  { label: "My Photos", href: "/gallery" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div className="container-x">
        <div
          className={clsx(
            "flex items-center justify-between rounded-full border px-5 py-3 transition-all duration-500",
            scrolled
              ? "border-cream/10 bg-ink/70 shadow-strip backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <a href="#top" className="flex items-center gap-3 group">
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-cream/15 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Lasting Moments Booth, LLC"
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-cream">
              Lasting Moments
              <span className="text-flash-soft"> Booth</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition-colors duration-200 hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="#booking" className="btn-primary !px-6 !py-2.5 !text-[13px]">
              Check your date
            </a>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="container-x mt-3 md:hidden"
          >
            <div className="strip-edge flex flex-col gap-1 rounded-3xl border border-cream/10 bg-ink/90 p-4 shadow-strip backdrop-blur-xl">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-cream/90 transition-colors hover:bg-cream/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 w-full"
              >
                Check your date
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
