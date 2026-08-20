import { NextResponse } from "next/server";
import { generateContractPdfBuffer } from "@/lib/contract-pdf";
import type { Inquiry } from "@/lib/inquiries";

const fakeInquiry: Inquiry = {
  id: "test-123",
  eventType: "Wedding",
  packageTier: "Gold",
  addOns: ["Backdrop", "Props Box"],
  guestCount: "150",
  estimate: 1080,
  name: "Jane Doe",
  email: "test@example.com",
  eventDate: "2026-10-15",
  createdAt: Date.now(),
  contacted: true,
  contractSentAt: Date.now(),
  depositPaidAt: Date.now(),
};

export async function GET() {
  const buffer = await generateContractPdfBuffer(fakeInquiry);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=test-contract.pdf",
    },
  });
}