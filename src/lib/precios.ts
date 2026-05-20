import { list, put } from "@vercel/blob";
import { servicios } from "@/data/servicios";

export type PreciosMap = Record<string, { precioBase: number; precioPorLitro?: number }>;

const BLOB_PATH = "precios.json";

export function getPreciosDefault(): PreciosMap {
  return Object.fromEntries(
    servicios.map((s) => [s.id, { precioBase: s.precioBase, precioPorLitro: s.precioPorLitro }])
  );
}

export async function getPrecios(): Promise<PreciosMap> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return getPreciosDefault();
  try {
    const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 });
    if (!blobs[0]) return getPreciosDefault();
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return getPreciosDefault();
    return res.json();
  } catch {
    return getPreciosDefault();
  }
}

export async function savePrecios(data: PreciosMap): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
