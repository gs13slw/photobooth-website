import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminRequest } from "@/lib/auth";
import { getInquiry, markContractSent } from "@/lib/inquiries";
import { generateContractPreviewPdfBuffer } from "@/lib/contract-pdf";

const resend = new Resend(process.env.RESEND_API_KEY);
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

  try {
    const pdfBuffer = await generateContractPreviewPdfBuffer(inquiry);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: inquiry.email,
      subject: `Your Booking Confirmation & Agreement — Lasting Moments Booth`,
      html: `<p>Hi ${inquiry.name},</p><p>Thank you for booking with Lasting Moments Booth! Your booking contract is attached as a PDF, including your deposit amount, balance due date, and a secure link to pay your deposit and confirm your date.</p>`,
      attachments: [
        {
          filename: "Lasting-Moments-Booking-Contract.pdf",
          content: pdfBuffer,
        },
      ],
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

