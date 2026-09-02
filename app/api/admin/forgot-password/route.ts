import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createResetToken } from "@/lib/auth";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.CONTRACT_FROM_EMAIL || "onboarding@resend.dev";
const RESET_EMAIL =
  process.env.ADMIN_RESET_EMAIL || "info@lastingmomentsboothllc.com";

// Public — anyone can hit this (it's how "Forgot password?" works), but it
// always emails the fixed RESET_EMAIL address, never an address supplied
// by the request. This is intentional: there's only one shared admin
// account, so the "identity" being verified is "has access to this inbox."
export async function POST(req: NextRequest) {
  const siteUrl =
    process.env.SITE_URL || "https://photobooth-website-rho.vercel.app";
  const token = createResetToken();
  const resetLink = `${siteUrl}/admin/reset-password?token=${encodeURIComponent(
    token
  )}`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: RESET_EMAIL,
      subject: "Reset your Lasting Moments Booth admin password",
      html: `
        <p>Someone requested a password reset for the Lasting Moments Booth admin panel.</p>
        <p><a href="${resetLink}">Click here to set a new password</a></p>
        <p>This link expires in 30 minutes. If you didn't request this, you can safely ignore this email.</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send password reset email:", err);
    return NextResponse.json(
      { error: "Failed to send reset email" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
