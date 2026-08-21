import { NextRequest, NextResponse } from "next/server";
import {
	ADMIN_COOKIE_NAME,
	createSessionToken,
	getAdminPassword,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
	const adminPassword = await getAdminPassword();

	if (!adminPassword) {
		return NextResponse.json(
			{
				error:
					"Server is missing ADMIN_PASSWORD. Add it in your Vercel project's Environment Variables.",
			},
			{ status: 500 }
		);
	}

	const body = await req.json().catch(() => ({}));

	if (body.password !== adminPassword) {
		return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
	}

	const res = NextResponse.json({ ok: true });
	res.cookies.set(ADMIN_COOKIE_NAME, createSessionToken(), {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24,
	});

	return res;
}
