import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { blockDate, getBookedDates, unblockDate } from "@/lib/availability";

// Public — the booking calendar needs this to gray out taken dates.
// Only returns a list of dates, no client details, so it's safe to expose.
export async function GET() {
  const bookedDates = await getBookedDates();
  return NextResponse.json({ bookedDates });
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  if (!body.date || !body.action) {
    return NextResponse.json(
      { error: "date and action ('block' | 'unblock') are required." },
      { status: 400 }
    );
  }

  if (body.action === "block") {
    await blockDate(body.date);
  } else if (body.action === "unblock") {
    await unblockDate(body.date);
  } else {
    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  }

  const bookedDates = await getBookedDates();
  return NextResponse.json({ bookedDates });
}
