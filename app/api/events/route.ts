import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { createEvent, listEvents } from "@/lib/gallery";

export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const events = await listEvents();
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  if (!body.eventDate) {
    return NextResponse.json(
      { error: "eventDate is required (format: YYYY-MM-DD)." },
      { status: 400 }
    );
  }

  const event = await createEvent({
    eventDate: body.eventDate,
    clientName: body.clientName || undefined,
    clientEmail: body.clientEmail || undefined,
  });

  return NextResponse.json({ event });
}
