"use client";

import Script from "next/script";
import { CalendarClock } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/lastingmomentsbooth-info/30min";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function ScheduleCallButton() {
  const openScheduler = () => {
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <>
      {/* Calendly's widget script, loaded once, lazily */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <button onClick={openScheduler} className="btn-secondary">
        <CalendarClock size={16} />
        Schedule a free 30-min call
      </button>
    </>
  );
}
