import { Redis } from "@upstash/redis";

// Redis.fromEnv() reads whichever env var names your Redis integration
// provides — works with both KV_REST_API_URL/TOKEN and
// UPSTASH_REDIS_REST_URL/TOKEN naming, so it works regardless of which
// Marketplace integration you installed.
const redis = Redis.fromEnv();

export interface GalleryEvent {
  code: string;
  eventDate: string; // ISO date, e.g. "2026-08-02"
  clientName?: string;
  clientEmail?: string;
  createdAt: number; // epoch ms
  expiresAt: number; // epoch ms — eventDate + 90 days
  photos: string[]; // public Vercel Blob URLs
}

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O or 1/I mixups

function randomSuffix(length = 4): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return out;
}

/** Event codes look like "080226-7F3K" — date-referenced but not guessable. */
export function generateEventCode(eventDate: string): string {
  const d = new Date(`${eventDate}T00:00:00`);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}${dd}${yy}-${randomSuffix()}`;
}

export async function createEvent(params: {
  eventDate: string;
  clientName?: string;
  clientEmail?: string;
}): Promise<GalleryEvent> {
  let code = generateEventCode(params.eventDate);

  // Guard against the rare random collision.
  for (let attempts = 0; attempts < 5; attempts++) {
    const exists = await redis.exists(`event:${code}`);
    if (!exists) break;
    code = generateEventCode(params.eventDate);
  }

  const createdAt = Date.now();
  const eventDateMs = new Date(`${params.eventDate}T00:00:00`).getTime();
  const expiresAt = eventDateMs + NINETY_DAYS_MS;

  const event: GalleryEvent = {
    code,
    eventDate: params.eventDate,
    clientName: params.clientName,
    clientEmail: params.clientEmail,
    createdAt,
    expiresAt,
    photos: [],
  };

  await redis.set(`event:${code}`, event);
  await redis.zadd("events:index", { score: createdAt, member: code });

  return event;
}

export async function getEvent(code: string): Promise<GalleryEvent | null> {
  const event = await redis.get<GalleryEvent>(`event:${code.toUpperCase()}`);
  return event ?? null;
}

export async function addPhotos(
  code: string,
  urls: string[]
): Promise<GalleryEvent | null> {
  const event = await getEvent(code);
  if (!event) return null;
  event.photos.push(...urls);
  await redis.set(`event:${event.code}`, event);
  return event;
}

export async function listEvents(limit = 100): Promise<GalleryEvent[]> {
  const codes = (await redis.zrange("events:index", 0, limit - 1, {
    rev: true,
  })) as string[];
  const events = await Promise.all(codes.map((c) => getEvent(c)));
  return events.filter((e): e is GalleryEvent => e !== null);
}

export async function deleteEvent(code: string): Promise<void> {
  await redis.del(`event:${code.toUpperCase()}`);
  await redis.zrem("events:index", code.toUpperCase());
}

export function isExpired(event: GalleryEvent): boolean {
  return Date.now() > event.expiresAt;
}

export function daysRemaining(event: GalleryEvent): number {
  const ms = event.expiresAt - Date.now();
  return Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
}
