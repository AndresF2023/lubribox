import { get, put } from "@vercel/blob";
import { servicios as serviciosDefault, categoriasDefault, Servicio, Categoria } from "@/data/servicios";

const BLOB_PATH = "servicios.json";

interface Store {
  servicios: Servicio[];
  categorias: Categoria[];
}

async function getStore(): Promise<Store> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { servicios: serviciosDefault, categorias: categoriasDefault };
  }
  try {
    const result = await get(BLOB_PATH, {
      access: "private",
      useCache: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!result || !result.stream) return { servicios: serviciosDefault, categorias: categoriasDefault };
    const data = await new Response(result.stream).json();
    // Compatibilidad con formato antiguo (array plano de servicios)
    if (Array.isArray(data)) {
      return { servicios: data, categorias: categoriasDefault };
    }
    return {
      servicios: data.servicios ?? serviciosDefault,
      categorias: data.categorias ?? categoriasDefault,
    };
  } catch {
    return { servicios: serviciosDefault, categorias: categoriasDefault };
  }
}

export async function getServiciosStore(): Promise<Servicio[]> {
  return (await getStore()).servicios;
}

export async function getCategoriasStore(): Promise<Categoria[]> {
  return (await getStore()).categorias;
}

export async function getFullStore(): Promise<Store> {
  return getStore();
}

export async function saveServiciosStore(servicios: Servicio[]): Promise<void> {
  const { categorias } = await getStore();
  await saveFullStore({ servicios, categorias });
}

export async function saveFullStore(data: Store): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
