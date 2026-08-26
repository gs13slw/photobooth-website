import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { listInquiries } from "@/lib/inquiries";
import { listExpenses } from "@/lib/expenses";

export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [inquiries, expenses] = await Promise.all([
    listInquiries(500),
    listExpenses(500),
  ]);

  const income = inquiries
    .filter((i) => i.depositPaidAt && typeof i.depositAmount === "number")
    .map((i) => ({
      id: i.id,
      date: i.depositPaidAt as number,
      amount: i.depositAmount as number,
      name: i.name,
      eventDate: i.eventDate,
    }));

  return NextResponse.json({ income, expenses });
}