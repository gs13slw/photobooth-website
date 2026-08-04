import type { Inquiry } from "./inquiries";
import { calculateDeposit, DEPOSIT_PERCENT } from "./pricing";

// ⚠️ EDIT THESE to match your client's real business policy before this
// goes out to real customers — these are reasonable placeholders, not
// vetted legal terms.
const BALANCE_DUE_DAYS_BEFORE = 7; // remaining balance due this many days before the event
const CANCELLATION_NOTICE_DAYS = 14; // free reschedule window before the event
const BUSINESS_NAME = "Lasting Moments Booth, LLC";
const BUSINESS_EMAIL = "info@lastingmomentsbooth.com";
const BUSINESS_PHONE = "(404) 436-6561";
const GOVERNING_STATE = "Georgia";
const SITE_URL =
  process.env.SITE_URL || "https://photobooth-website-rho.vercel.app";

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function generateContractHtml(inquiry: Inquiry): string {
  const { deposit, balance } = calculateDeposit(inquiry.estimate);

  return `
  <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1B1523; line-height: 1.6;">
    <div style="text-align: center; padding: 24px 0; border-bottom: 2px solid #F2B84B;">
      <h1 style="margin: 0; font-size: 22px;">${BUSINESS_NAME}</h1>
      <p style="margin: 4px 0 0; color: #666; font-size: 13px;">Booking Confirmation &amp; Service Agreement</p>
    </div>

    <div style="padding: 24px 0;">
      <p>Hi ${inquiry.name},</p>
      <p>
        Thank you for booking with ${BUSINESS_NAME}! This email confirms the
        details of your event and outlines the terms of our agreement.
        Please review everything below carefully.
      </p>

      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 6px;">Booking Details</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 0; color: #666; width: 40%;">Client name</td><td style="padding: 6px 0;"><strong>${inquiry.name}</strong></td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;">${inquiry.email}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Event date</td><td style="padding: 6px 0;"><strong>${formatDate(inquiry.eventDate)}</strong></td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Event type</td><td style="padding: 6px 0;">${inquiry.eventType || "—"}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Package</td><td style="padding: 6px 0;">${inquiry.packageTier || "—"}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Add-ons</td><td style="padding: 6px 0;">${inquiry.addOns.length ? inquiry.addOns.join(", ") : "None"}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Guest count</td><td style="padding: 6px 0;">${inquiry.guestCount || "—"}</td></tr>
        <tr><td style="padding: 10px 0 6px; color: #666; border-top: 1px solid #eee;">Total estimate</td><td style="padding: 10px 0 6px; border-top: 1px solid #eee;"><strong>$${inquiry.estimate.toLocaleString()}</strong></td></tr>
      </table>

      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 6px; margin-top: 28px;">Payment Terms</h3>
      <ul style="font-size: 14px; padding-left: 18px;">
        <li>A non-refundable deposit of <strong>$${deposit.toLocaleString()}</strong> (${DEPOSIT_PERCENT}% of the total) is due at the time of booking to confirm and secure your date.</li>
        <li>The remaining balance of <strong>$${balance.toLocaleString()}</strong> is due no later than ${BALANCE_DUE_DAYS_BEFORE} days before your event date.</li>
        <li>Travel fees, if applicable, are confirmed separately based on your venue location and are not included in the estimate above.</li>
      </ul>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${SITE_URL}/api/checkout/${inquiry.id}"
           style="display: inline-block; background: #F2B84B; color: #1B1523; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 999px; font-family: sans-serif; font-size: 14px;">
          Pay Deposit Now — $${deposit.toLocaleString()}
        </a>
        <p style="font-size: 12px; color: #999; margin-top: 10px;">
          Secure payment powered by Clover. You'll be redirected to a secure payment page.<br />
          <strong>Submitting your deposit payment confirms that you have read, understood, and agree to all terms in this contract.</strong>
        </p>
      </div>

      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 6px; margin-top: 28px;">Cancellation &amp; Rescheduling</h3>
      <ul style="font-size: 14px; padding-left: 18px;">
        <li>One free reschedule is available if requested at least ${CANCELLATION_NOTICE_DAYS} days before the original event date, subject to availability.</li>
        <li>Deposits are non-refundable in the event of cancellation.</li>
      </ul>

      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 6px; margin-top: 28px;">Service Terms</h3>
      <ul style="font-size: 14px; padding-left: 18px;">
        <li>Client agrees to provide adequate space, a level surface, and access to a standard power outlet for the booth setup at the venue.</li>
        <li>${BUSINESS_NAME} is not liable for delays or service interruptions caused by circumstances outside its reasonable control (e.g. venue power outages, extreme weather, acts of God).</li>
        <li>This agreement is governed by the laws of the State of ${GOVERNING_STATE}.</li>
      </ul>

      <p style="margin-top: 28px; font-size: 14px;">
        Please reply to this email or contact us at
        <a href="mailto:${BUSINESS_EMAIL}">${BUSINESS_EMAIL}</a> or
        ${BUSINESS_PHONE} with any questions before paying your deposit.
      </p>

      <p style="font-size: 14px;">We can't wait to celebrate with you!</p>
      <p style="font-size: 14px;">— The ${BUSINESS_NAME} Team</p>
    </div>

    <div style="text-align: center; padding: 16px 0; border-top: 1px solid #eee; font-size: 11px; color: #999;">
      This confirms your booking request as submitted online and is not
      final until your deposit is received.
    </div>
  </div>
  `;
}
