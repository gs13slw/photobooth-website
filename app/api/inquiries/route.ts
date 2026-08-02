import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { createInquiry, listInquiries } from "@/lib/inquiries";

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
