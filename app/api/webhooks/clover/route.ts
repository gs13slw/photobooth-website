import { NextRequest, NextResponse } from "next/server";
import { calculateDeposit } from "@/lib/pricing";
import crypto from "crypto";
import { Redis } from "@upstash/redis";
import { markDepositPaid } from "@/lib/inquiries";
import { Resend } from "resend";
import { getInquiry } from "@/lib/inquiries";
import { generateContractPdfBuffer } from "@/lib/contract-pdf";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.CONTRACT_FROM_EMAIL || "onboarding@resend.dev";
const redis = Redis.fromEnv();

/**
 * ⚠️ IMPORTANT — read before relying on this in production:
 *
 * This is built from Clover's published documentation, but I have not
 * been able to test it against a real Clover sandbox (no network access
 * to Clover's servers from where this was built, and no test credentials
 * exist yet). Clover's docs describe the webhook payload as containing
 * fields like Type ("PAYMENT"), Status ("APPROVED"/"DECLINED"), and
 * Data (the Checkout Session UUID) — but the *exact* JSON key casing and
 * the *exact* signature header name aren't fully confirmed from the docs
 * alone.
 *
 * Before going live: set up the webhook URL + signing secret in the
 * Clover Merchant Dashboard (Ecommerce → Hosted Checkout → Webhook),
 * make one real test payment in Clover's sandbox, and use a tool like
 * webhook.site (or just check your Vercel function logs) to see the
 * actual payload shape. Adjust the field names below (payload.type,
 * payload.status, payload.data, and the signature header name) to match
 * exactly what Clover actually sends if they differ from what's here.
 */
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature =
    req.headers.get("x-clover-signature") ||
    req.headers.get("clover-signature") ||
    "";
  const secret = process.env.CLOVER_WEBHOOK_SECRET;

  if (secret) {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");
    if (expected !== signature) {
      console.error("Clover webhook signature mismatch — rejecting.");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  } else {
    console.warn(
      "CLOVER_WEBHOOK_SECRET not set — accepting webhook without verifying it came from Clover. Set this before going live."
    );
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log("Clover webhook received:", JSON.stringify(payload));

  const isApprovedPayment =
    payload?.type === "PAYMENT" && payload?.status === "APPROVED";

  if (isApprovedPayment) {
    const sessionId = payload?.data;

    if (sessionId) {
      const inquiryId = await redis.get<string>(
        `checkout-session:${sessionId}`
      );

      if (inquiryId) {
        const inquiryForAmount = await getInquiry(inquiryId);
        const amountPaid = inquiryForAmount
          ? calculateDeposit(inquiryForAmount.estimate).deposit
          : undefined;
        await markDepositPaid(inquiryId, amountPaid);

        const inquiry = await getInquiry(inquiryId);
        if (inquiry) {
          try {
            const pdfBuffer = await generateContractPdfBuffer(inquiry);
            await resend.emails.send({
              from: FROM_EMAIL,
              to: inquiry.email,
              subject: "Deposit Received — Your Booking is Confirmed!",
              html: `<p>Hi ${inquiry.name},</p><p>We've received your deposit and your booking for ${inquiry.eventDate} is officially confirmed.</p>`,
              attachments: [
                {
                  filename: "Lasting-Moments-Booking-Confirmation.pdf",
                  content: pdfBuffer,
                },
              ],
            });
          } catch (err) {
            console.error("Failed to send deposit confirmation email:", err);
          }
        }
      }
    } else {
      console.warn(
        `Clover webhook: no inquiry found for session ${sessionId}`
      );
    }
  }

  return NextResponse.json({ ok: true });
}