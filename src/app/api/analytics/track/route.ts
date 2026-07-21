import { NextRequest, NextResponse } from "next/server";
import { recordPageview, recordEvent } from "@/lib/analytics-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.type === "pageview" && typeof body.path === "string") {
      await recordPageview(body.path);
    } else if (body.type === "event" && typeof body.event === "string") {
      await recordEvent(body.event);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
