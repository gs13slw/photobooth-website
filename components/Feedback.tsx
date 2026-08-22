import React from "react";
import { MessageCircleHeart } from "lucide-react";

export default function Feedback() {
  return (
    <section className="relative bg-white py-20">
      <div className="container-x">
        <div className="mx-auto max-w-2xl rounded-3xl border border-black/15 bg-violet-100 p-10 text-center">
          <span className="eyebrow justify-center text-black">
            <MessageCircleHeart size={13} />
            We'd love your feedback
          </span>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Thank you for visiting our website.
          </h2>
          <p className="mt-5 text-balance text-base leading-relaxed text-black/80">
            Did this site answer your questions? Was anything confusing, or
            missing? Whether it's a small suggestion or a bigger idea for how
            we can better serve you, we'd genuinely love to hear it.
          </p>
          <a
            href="mailto:info@lastingmomentsboothllc.com?subject=Website%20Feedback"
            className="btn-primary mt-8 inline-flex"
          >
            Share your feedback
          </a>
        </div>
      </div>
    </section>
  );
}
