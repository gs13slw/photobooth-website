import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export interface Expense {
  id: string;
  date: string; // "YYYY-MM-DD"
  category: string;
  amount: number; // dollars
  note?: string;
  createdAt: number;
}

export async function createExpense(
  data: Omit<Expense, "id" | "createdAt">
): Promise<Expense> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const expense: Expense = {
    ...data,
    id,
    createdAt: Date.now(),
  };

  await redis.set(`expense:${id}`, expense);
  await redis.zadd("expenses:index", { score: expense.createdAt, member: id });

  return expense;
}

export async function listExpenses(limit = 500): Promise<Expense[]> {
  const ids = (await redis.zrange("expenses:index", 0, limit - 1, {
    rev: true,
  })) as string[];

  const expenses = await Promise.all(
    ids.map((id) => redis.get<Expense>(`expense:${id}`))
  );

  return expenses.filter((e): e is Expense => e !== null);
}

export async function deleteExpense(id: string): Promise<void> {
  await redis.del(`expense:${id}`);
  await redis.zrem("expenses:index", id);
}