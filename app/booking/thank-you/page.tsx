"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

function ThankYouContent() {
  const params = useSearchParams();
  const status = params.get("status");
  const failed = status === "failed" || status === "error";

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
      <div className="max-w-sm">
        <span
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            failed ? "bg-blush/15 text-blush" : "bg-flash text-ink"
          }`}
        >
          {failed ? <XCircle size={28} /> : <CheckCircle2 size={28} />}
        </span>

        <h1 className="mt-6 font-display text-2xl font-semibold text-cream">
          {failed ? "Payment didn't go through" : "Thank you!"}
        </h1>

        <p className="mt-3 text-muted">
          {failed
            ? "Something went wrong with your payment, and no charge was made. Please try again, or reach out and we'll help you sort it out."
            : "Your deposit has been received and your date is officially secured. A confirmation email is on its way to you."}
        </p>

        <Link href="/" className="btn-secondary mt-7 inline-flex">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}
