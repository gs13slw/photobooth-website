import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export interface Inquiry {
  id: string;
  eventType: string;
  packageTier: string;
  addOns: string[];
  guestCount: string;
  estimate: number;
  name: string;
  email: string;
  eventDate: string;
  createdAt: number;
  contacted: boolean;
  contractSentAt?: number;
  depositPaidAt?: number;
}

export async function createInquiry(
  data: Omit<Inquiry, "id" | "createdAt" | "contacted">
): Promise<Inquiry> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const inquiry: Inquiry = {
    ...data,
    id,
    createdAt: Date.now(),
    contacted: false,
  };

  await redis.set(`inquiry:${id}`, inquiry);
  await redis.zadd("inquiries:index", { score: inquiry.createdAt, member: id });

  return inquiry;
}

export async function listInquiries(limit = 100): Promise<Inquiry[]> {
  const ids = (await redis.zrange("inquiries:index", 0, limit - 1, {
    rev: true,
  })) as string[];

  const inquiries = await Promise.all(
    ids.map((id) => redis.get<Inquiry>(`inquiry:${id}`))
  );

  return inquiries.filter((i): i is Inquiry => i !== null);
}

export async function getInquiry(id: string): Promise<Inquiry | null> {
  return redis.get<Inquiry>(`inquiry:${id}`);
}

export async function markContractSent(id: string): Promise<Inquiry | null> {
  const inquiry = await redis.get<Inquiry>(`inquiry:${id}`);
  if (!inquiry) return null;
  inquiry.contractSentAt = Date.now();
  await redis.set(`inquiry:${id}`, inquiry);
  return inquiry;
}

export async function markDepositPaid(id: string): Promise<Inquiry | null> {
  const inquiry = await redis.get<Inquiry>(`inquiry:${id}`);
  if (!inquiry) return null;
  inquiry.depositPaidAt = Date.now();
  await redis.set(`inquiry:${id}`, inquiry);
  return inquiry;
}

export async function markContacted(
  id: string,
  contacted: boolean
): Promise<Inquiry | null> {
  const inquiry = await redis.get<Inquiry>(`inquiry:${id}`);
  if (!inquiry) return null;
  inquiry.contacted = contacted;
  await redis.set(`inquiry:${id}`, inquiry);
  return inquiry;
}

export async function deleteInquiry(id: string): Promise<void> {
  await redis.del(`inquiry:${id}`);
  await redis.zrem("inquiries:index", id);
}
