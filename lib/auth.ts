import crypto from "crypto";
import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";

export const ADMIN_COOKIE_NAME = "lmb_admin_session";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    // Falls back so local dev doesn't hard-crash, but this should always
    // be set to a long random string in production (see .env.example).
    return "dev-only-insecure-secret";
  }
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

/** A signed "expiry.signature" token — no external session store needed. */
export function createSessionToken(): string {
  const expiry = String(Date.now() + SESSION_TTL_MS);
  return `${expiry}.${sign(expiry)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;
  if (sign(expiry) !== signature) return false;
  return Date.now() < Number(expiry);
}

/** Call from Route Handlers (Node runtime) to check the current request. */
export function isAdminRequest(): boolean {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

const redis = Redis.fromEnv();
const ADMIN_PASSWORD_KEY = "admin:password";

/** Returns the current admin password: Redis value if set, otherwise the env var fallback. */
export async function getAdminPassword(): Promise<string | null> {
  const stored = await redis.get<string>(ADMIN_PASSWORD_KEY);
  if (stored) return stored;
  return process.env.ADMIN_PASSWORD || null;
}

export async function setAdminPassword(newPassword: string): Promise<void> {
  await redis.set(ADMIN_PASSWORD_KEY, newPassword);
}