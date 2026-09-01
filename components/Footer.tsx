import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { label: "Experiences", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Booking", href: "#booking" },
  { label: "FAQ", href: "#faq" },
  { label: "Find your event photos", href: "/gallery" },
];

// Add your real profile URLs here when ready.
const SOCIALS = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-cream/10 bg-surface">
      <div className="container-x py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-3">
      <div className="flex flex-col">
  <span className="font-display text-lg font-semibold text-cream">
    Lasting Moments
    <span className="text-flash-soft"> Booth</span>
  </span>
  <p className="text-xs text-muted mt-1">
        Presented by Williams Elite Enterprizes LLC dba WEEWebDesign
  </p>
</div>
             
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Premium photo booth experiences designed to make every moment
              unforgettable. Weddings, birthdays, family reunions, corporate
              events, and more.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/12 text-muted transition-all hover:border-flash/40 hover:text-flash-soft"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Quick links
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/80 transition-colors hover:text-flash-soft"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Get in touch
            </p>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-cream/80">
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-flash-soft" />
                <a
                  href="mailto:info@lastingmomentsboothllc.com"
                  className="transition-colors hover:text-flash-soft"
                >
                  info@lastingmomentsboothllc.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-flash-soft" />
                <a
                  href="tel:+14044366561"
                  className="transition-colors hover:text-flash-soft"
                >
                  (404) 436-6561
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="text-flash-soft" />
                <span>Serving Atlanta &amp; surrounding areas</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-muted sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Lasting Moments Booth, LLC. All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-cream"  >
              Privacy Notice
            </Link>
            <span className="hidden sm:block" aria-hidden="true">
              |
            </span>
            
           <Link href="/terms" className="transition-colors hover:text-cream">
  Terms of Service
</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
