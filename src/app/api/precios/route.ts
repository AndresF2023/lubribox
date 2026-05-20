import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getPrecios, savePrecios, PreciosMap } from "@/lib/precios";

export async function GET() {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const precios = await getPrecios();
  return NextResponse.json(precios);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Almacenamiento no configurado" }, { status: 503 });
  }

  const data: PreciosMap = await req.json();
  await savePrecios(data);
  return NextResponse.json({ ok: true });
}
