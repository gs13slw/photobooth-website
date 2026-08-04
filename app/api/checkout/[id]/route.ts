import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getInquiry } from "@/lib/inquiries";
import { createCloverCheckout } from "@/lib/clover";
import { calculateDeposit } from "@/lib/pricing";

const redis = Redis.fromEnv();

// This is a GET route (not POST) on purpose — it's meant to be a plain
// link inside the contract email ("Pay Deposit Now"), not called via
// fetch. Visiting it creates a brand-new Clover session (they expire
// after 15 minutes, so we can't pre-generate one at email-send time)
// and immediately redirects to Clover's hosted payment page.
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const inquiry = await getInquiry(params.id);
  const siteUrl =
    process.env.SITE_URL || "https://photobooth-website-rho.vercel.app";

  if (!inquiry) {
    return NextResponse.redirect(`${siteUrl}/booking/thank-you?status=notfound`);
  }

  const { deposit } = calculateDeposit(inquiry.estimate);

  try {
    const checkout = await createCloverCheckout({
      amountCents: deposit * 100,
      customerEmail: inquiry.email,
      customerName: inquiry.name,
      description: `Deposit — ${inquiry.packageTier || "Booking"} Package (${inquiry.eventDate})`,
      successUrl: `${siteUrl}/booking/thank-you?inquiry=${inquiry.id}`,
      failureUrl: `${siteUrl}/booking/thank-you?inquiry=${inquiry.id}&status=failed`,
    });

    // Correlate this Clover session back to the inquiry, so the webhook
    // (which only gives us a session ID, not our own inquiry ID) can find
    // its way back to the right record. 1 hour is plenty since Clover
    // sessions themselves expire after 15 minutes.
    const sessionId =
      (checkout.checkoutSessionId as string | undefined) ||
      checkout.href.split("/").filter(Boolean).pop();

    if (sessionId) {
      await redis.set(`checkout-session:${sessionId}`, inquiry.id, {
        ex: 3600,
      });
    }

    return NextResponse.redirect(checkout.href);
  } catch (err) {
    console.error("Clover checkout creation failed:", err);
    return NextResponse.redirect(
      `${siteUrl}/booking/thank-you?inquiry=${inquiry.id}&status=error`
    );
  }
}
