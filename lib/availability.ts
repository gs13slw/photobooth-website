import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const BOOKED_DATES_KEY = "booked-dates";

/** Returns all booked dates as "YYYY-MM-DD" strings. */
export async function getBookedDates(): Promise<string[]> {
  const dates = await redis.smembers(BOOKED_DATES_KEY);
  return (dates as string[]) || [];
}

export async function isDateBooked(date: string): Promise<boolean> {
  const result = await redis.sismember(BOOKED_DATES_KEY, date);
  return result === 1;
}

export async function blockDate(date: string): Promise<void> {
  await redis.sadd(BOOKED_DATES_KEY, date);
}

export async function unblockDate(date: string): Promise<void> {
  await redis.srem(BOOKED_DATES_KEY, date);
}
