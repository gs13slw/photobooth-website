import { NextRequest, NextResponse } from "next/server";
import { verifyResetToken, setAdminPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { token, newPassword } = body;

  if (!verifyResetToken(token)) {
    return NextResponse.json(
      { error: "This reset link is invalid or has expired. Please request a new one." },
      { status: 401 }
    );
  }

  if (!newPassword || typeof newPassword !== "string" || newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters." },
      { status: 400 }
    );
  }

  await setAdminPassword(newPassword);
  return NextResponse.json({ ok: true });
}
