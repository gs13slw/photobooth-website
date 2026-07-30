# Lasting Moments Booth — Website Rebuild

A from-scratch rebuild of the Lasting Moments Booth marketing site, built with
Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Design direction

- **Signature motif:** a tilted, perforated film-strip card, used in the hero,
  the booking widget, and the mobile menu — a literal nod to the product
  (printed photo strips).
- **Palette:** deep plum/near-black (`#1B1523`) base with a warm camera-flash
  gold (`#F2B84B`) and a blush pink (`#E8879E`) accent — evokes a flash going
  off at a dark, festive venue rather than a generic "dark mode" theme.
- **Type:** [Fraunces](https://fonts.google.com/specimen/Fraunces) for display
  headlines (warm, slightly editorial serif), [Inter](https://fonts.google.com/specimen/Inter)
  for body and UI text.

## What's included

| Section | File | Notes |
|---|---|---|
| Sticky nav | `components/Header.tsx` | Glassmorphism header, scroll-aware, mobile hamburger menu |
| Hero | `components/Hero.tsx` | Ambient gradient glow, floating photo-strip visual, dual CTAs |
| Services | `components/Services.tsx` | Filterable grid (Weddings / Corporate / Parties / Add-ons) |
| Gallery | `components/Gallery.tsx` | Hover-reveal photo grid |
| Booking | `components/BookingFlow.tsx`, `BookingSection.tsx` | 4-step inquiry wizard with a live price estimate |
| FAQ | `components/FAQ.tsx` | Accordion |
| Footer | `components/Footer.tsx` | Quick links, socials, legal |

## Getting started locally

This environment doesn't have outbound network access, so dependencies
haven't been installed or build-verified here. To run it on your machine:

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:3000
```

To build for production:

```bash
npm run build
npm run start
```

## Content notes — please review before launch

All copy, pricing, service names, contact details, and social links are
**placeholder content** written to match the photo-booth-rental industry —
they are not pulled from the live site (it blocks automated access). Before
launch, swap in:

- Real package names & pricing in `components/BookingFlow.tsx` (`BOOTHS`,
  `ADD_ONS` arrays)
- Real service descriptions in `components/Services.tsx` (`SERVICES` array)
- Real photos in place of the emoji placeholders in `Hero.tsx` and
  `Gallery.tsx`
- Real contact info, social links, and legal pages in `Footer.tsx`
- The booking form's `handleSubmit` in `BookingFlow.tsx` currently just shows
  a confirmation screen — wire it up to your CRM, email service, or booking
  API of choice
- Metadata (title/description) in `app/layout.tsx`

## Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS with a custom design-token theme (`tailwind.config.ts`)
- **Animation:** Framer Motion
- **Icons:** lucide-react
