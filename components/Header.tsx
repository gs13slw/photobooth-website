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
    <div id="top">
      {/* Banner — full-bleed, edge to edge, scrolls away naturally with the page */}
      <div className="relative h-32 w-full overflow-hidden border-b border-cream/10 bg-ink md:h-48">
        <Image
          src="/images/logo-banner.png"
          alt="Lasting Moments Booth, LLC"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      {/* Sticky nav — stays pinned once you scroll past the banner */}
      <div
        className={clsx(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-4"
        )}
      >
        <div className="container-x">
          <div
            className={clsx(
              "flex items-center justify-between rounded-full border px-5 py-3 transition-all duration-500",
              scrolled
                ? "border-cream/10 bg-ink/80 shadow-strip backdrop-blur-xl"
                : "border-cream/10 bg-ink/50 backdrop-blur-md"
            )}
          >
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
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream md:hidden md:ml-0"
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
      </div>
    </div>
  );
}
