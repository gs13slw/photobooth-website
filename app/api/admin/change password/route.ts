import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, getAdminPassword, setAdminPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
	if (!isAdminRequest()) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json().catch(() => ({}));
	const { currentPassword, newPassword } = body;

	if (!newPassword || typeof newPassword !== "string" || newPassword.length < 8) {
		return NextResponse.json(
			{ error: "New password must be at least 8 characters." },
			{ status: 400 }
		);
	}

	const actualCurrent = await getAdminPassword();
	if (currentPassword !== actualCurrent) {
		return NextResponse.json(
			{ error: "Current password is incorrect." },
			{ status: 401 }
		);
	}

	await setAdminPassword(newPassword);
	return NextResponse.json({ ok: true });
}
