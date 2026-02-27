import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SIGNING_SECRET = process.env.RESEND_WEBHOOK_SECRET || "";

function verifySignature(payload: string, signature: string): boolean {
  if (!SIGNING_SECRET) return false;
  const expected = crypto
    .createHmac("sha256", SIGNING_SECRET)
    .update(payload)
    .digest("base64");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("resend-signature") || "";

  if (SIGNING_SECRET && !verifySignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  // Log for monitoring — extend as needed
  console.log(`[Resend Webhook] ${event.type}:`, event.data?.to, event.data?.subject);

  return NextResponse.json({ received: true });
}
