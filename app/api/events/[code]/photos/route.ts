import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdminRequest } from "@/lib/auth";
import { addPhotos, getEvent } from "@/lib/gallery";

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const event = await getEvent(params.code);
  if (!event) {
    return NextResponse.json({ error: "Gallery not found." }, { status: 404 });
  }

  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files provided." }, { status: 400 });
  }

  const uploaded: string[] = [];
  for (const file of files) {
    const blob = await put(
      `events/${event.code}/${Date.now()}-${file.name}`,
      file,
      { access: "public" }
    );
    uploaded.push(blob.url);
  }

  const updated = await addPhotos(event.code, uploaded);
  return NextResponse.json({ event: updated });
}
