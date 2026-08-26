
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { createExpense, listExpenses } from "@/lib/expenses";

export async function GET() {
	if (!isAdminRequest()) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const expenses = await listExpenses();
	return NextResponse.json({ expenses });
}

export async function POST(req: NextRequest) {
	if (!isAdminRequest()) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json().catch(() => ({}));

	if (!body.date || !body.category || typeof body.amount !== "number") {
		return NextResponse.json(
			{ error: "date, category, and amount are required." },
			{ status: 400 }
		);
	}

	const expense = await createExpense({
		date: body.date,
		category: body.category,
		amount: body.amount,
		note: body.note || "",
	});

	return NextResponse.json({ expense });
}
