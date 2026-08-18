import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminRequest } from "@/lib/auth";
import { getInquiry, markContractSent } from "@/lib/inquiries";
import { generateContractHtml } from "@/lib/contract";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use Resend's test domain until lastingmomentsphotobooth.com + Zoho Mail are live.
const FROM_EMAIL = process.env.CONTRACT_FROM_EMAIL || "onboarding@resend.dev";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inquiry = await getInquiry(params.id);
  if (!inquiry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const html = generateContractHtml(inquiry);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: inquiry.email,
      subject: `Your Booking Confirmation & Agreement — Lasting Moments Booth`,
      html,
    });
  } catch (err) {
    console.error("Failed to send contract email:", err);
    return NextResponse.json(
      { error: "Failed to send contract email" },
      { status: 500 }
    );
  }

  const updated = await markContractSent(params.id);

  return NextResponse.json({ ok: true, inquiry: updated });
}
