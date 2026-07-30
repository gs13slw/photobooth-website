import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { deleteEvent, isExpired, listEvents } from "@/lib/gallery";

// Runs daily via the schedule in vercel.json. Vercel automatically sends
// `Authorization: Bearer <CRON_SECRET>` when it triggers this route, as
// long as CRON_SECRET is set in your project's environment variables.
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await listEvents(500);
  let cleaned = 0;

  for (const event of events) {
    if (!isExpired(event)) continue;

    for (const url of event.photos) {
      try {
        await del(url);
      } catch {
        // Already deleted or an invalid URL — safe to skip.
      }
    }

    await deleteEvent(event.code);
    cleaned++;
  }

  return NextResponse.json({ ok: true, cleaned });
}
