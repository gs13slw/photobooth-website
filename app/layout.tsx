import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {metadataBase: new URL("https://lastingmomentsbooth.com"),
  alternates: {
    canonical: "/",
  },
  title: "Lasting Moments Booth, LLC | Photo Booth Rentals in Atlanta, GA",
  description:
    "Lasting Moments, Captured Forever. Premium photo booth experiences for weddings, birthdays, family reunions, and corporate events. Serving Atlanta & surrounding areas.",
  keywords: [
    "photo booth rental Atlanta",
    "wedding photo booth Atlanta",
    "open air photo booth",
    "event photo booth Georgia",
  ],
  openGraph: {
    title: "Lasting Moments Booth, LLC",
    description:
      "Premium photo booth experiences for weddings, birthdays, family reunions, and corporate events. Serving Atlanta & surrounding areas.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lasting Moments Booth, LLC",
    description:
      "Premium photo booth experiences for weddings, birthdays, family reunions, and corporate events. Serving Atlanta & surrounding areas.",
  },
};
    

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
