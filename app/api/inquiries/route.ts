import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isAdminRequest } from "@/lib/auth";
import { createInquiry, listInquiries } from "@/lib/inquiries";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.CONTRACT_FROM_EMAIL || "onboarding@resend.dev";
const NOTIFY_EMAIL = "info@lastingmomentsboothllc.com";

// Public — anyone submitting the booking form hits this, no login needed.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  if (!body.name || !body.email || !body.eventDate) {
    return NextResponse.json(
      { error: "name, email, and eventDate are required." },
      { status: 400 }
    );
  }

  const inquiry = await createInquiry({
    eventType: body.eventType || "",
    packageTier: body.packageTier || "",
    addOns: body.addOns || [],
    guestCount: body.guestCount || "",
    estimate: body.estimate || 0,
    name: body.name,
    email: body.email,
    eventDate: body.eventDate,
  });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New Booking Inquiry — ${inquiry.name} (${inquiry.eventDate})`,
      html: `
        <p>A new booking inquiry was just submitted:</p>
        <ul>
          <li><strong>Name:</strong> ${inquiry.name}</li>
          <li><strong>Email:</strong> ${inquiry.email}</li>
          <li><strong>Event Date:</strong> ${inquiry.eventDate}</li>
          <li><strong>Event Type:</strong> ${inquiry.eventType || "—"}</li>
          <li><strong>Package:</strong> ${inquiry.packageTier || "—"}</li>
          <li><strong>Guest Count:</strong> ${inquiry.guestCount || "—"}</li>
          <li><strong>Estimate:</strong> $${inquiry.estimate.toLocaleString()}</li>
        </ul>
        <p>View it in the admin panel to follow up.</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send inquiry notification email:", err);
  }

  return NextResponse.json({ inquiry });
}

// Admin only — powers the "Booking Inquiries" list in /admin.
export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const inquiries = await listInquiries();
  return NextResponse.json({ inquiries });
}
