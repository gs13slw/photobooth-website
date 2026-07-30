import Image from "next/image";
import Link from "next/link";
import { AlertCircle, Clock, Download } from "lucide-react";
import { getEvent, isExpired, daysRemaining } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export default async function EventGalleryPage({
  params,
}: {
  params: { code: string };
}) {
  const event = await getEvent(params.code);
  const expired = event ? isExpired(event) : false;

  if (!event || expired) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
        <div className="max-w-sm">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface text-flash-soft">
            <AlertCircle size={26} />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold text-cream">
            {event ? "This gallery has expired" : "Gallery not found"}
          </h1>
          <p className="mt-3 text-sm text-muted">
            {event
              ? "Event galleries are available for 90 days after the event date. Reach out to us if you need copies of your photos."
              : "Double-check your event code — it should look like 080226-7F3K."}
          </p>
          <Link href="/gallery" className="btn-secondary mt-7 inline-flex">
            Try another code
          </Link>
        </div>
      </main>
    );
  }

  const remaining = daysRemaining(event);
  const formattedDate = new Date(`${event.eventDate}T00:00:00`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <main className="min-h-screen bg-ink px-6 py-16">
      <div className="container-x">
        <div className="text-center">
          <p className="eyebrow justify-center">Event Gallery</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-cream">
            {formattedDate}
          </h1>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted">
            <Clock size={14} />
            {remaining > 0
              ? `Available for ${remaining} more day${remaining === 1 ? "" : "s"}`
              : "Expiring today"}
          </p>
        </div>

        {event.photos.length === 0 ? (
          <p className="mt-16 text-center text-muted">
            Photos haven&apos;t been uploaded yet — check back soon!
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {event.photos.map((url, i) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl border border-cream/10 bg-surface"
              >
                <Image
                  src={url}
                  alt={`Event photo ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-opacity group-hover:bg-ink/40 group-hover:opacity-100">
                  <Download className="text-cream" size={22} />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
