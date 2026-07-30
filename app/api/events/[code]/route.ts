import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { deleteEvent, getEvent, isExpired, daysRemaining } from "@/lib/gallery";

export async function GET(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  const event = await getEvent(params.code);

  if (!event) {
    return NextResponse.json({ error: "Gallery not found." }, { status: 404 });
  }

  if (isExpired(event)) {
    return NextResponse.json(
      { error: "This gallery has expired.", expired: true },
      { status: 410 }
    );
  }

  return NextResponse.json({
    event: {
      code: event.code,
      eventDate: event.eventDate,
      photos: event.photos,
      daysRemaining: daysRemaining(event),
    },
  });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await deleteEvent(params.code);
  return NextResponse.json({ ok: true });
}
