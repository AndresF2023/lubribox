import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { saveServiciosStore } from "@/lib/servicios-store";
import { Servicio } from "@/data/servicios";

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isAdmin) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Almacenamiento no configurado" }, { status: 503 });
    }
    const data: Servicio[] = await req.json();
    await saveServiciosStore(data);
    revalidatePath("/servicios");
    revalidatePath("/turnos");
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/servicios PUT]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
