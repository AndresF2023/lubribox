import { list, put } from "@vercel/blob";
import { servicios as serviciosDefault, Servicio } from "@/data/servicios";

const BLOB_PATH = "servicios.json";

export async function getServiciosStore(): Promise<Servicio[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return serviciosDefault;
  try {
    const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 });
    if (!blobs[0]) return serviciosDefault;
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return serviciosDefault;
    return res.json();
  } catch {
    return serviciosDefault;
  }
}

export async function saveServiciosStore(data: Servicio[]): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
