import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { saveServiciosStore } from "@/lib/servicios-store";
import { Servicio } from "@/data/servicios";

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Almacenamiento no configurado" }, { status: 503 });
  }
  const data: Servicio[] = await req.json();
  await saveServiciosStore(data);
  return NextResponse.json({ ok: true });
}
