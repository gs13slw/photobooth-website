import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { deleteExpense } from "@/lib/expenses";

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	if (!isAdminRequest()) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	await deleteExpense(params.id);
	return NextResponse.json({ success: true });
}
