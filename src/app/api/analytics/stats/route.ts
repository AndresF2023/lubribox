import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getStats } from "@/lib/analytics-store";

export async function GET() {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const stats = await getStats(30);
  return NextResponse.json(stats);
}
