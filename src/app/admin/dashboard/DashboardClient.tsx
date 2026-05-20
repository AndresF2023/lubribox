"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, AlertCircle, LogOut, Save } from "lucide-react";
import { Servicio, formatearPrecio } from "@/data/servicios";
import { PreciosMap } from "@/lib/precios";

interface Props {
  servicios: Servicio[];
  preciosIniciales: PreciosMap;
}

const CATEGORIAS: Record<string, string> = {
  paquetes: "Paquetes",
  mantenimiento: "Mantenimiento",
  frenos: "Frenos",
  suspension: "Suspensión",
  otros: "Otros",
};

export default function DashboardClient({ servicios, preciosIniciales }: Props) {
  const router = useRouter();
  const [precios, setPrecios] = useState<PreciosMap>(preciosIniciales);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);

  function handlePrecioBase(id: string, valor: string) {
    const num = parseInt(valor.replace(/\D/g, ""), 10);
    setPrecios((prev) => ({
      ...prev,
      [id]: { ...prev[id], precioBase: isNaN(num) ? 0 : num },
    }));
  }

  function handlePrecioPorLitro(id: string, valor: string) {
    const num = parseInt(valor.replace(/\D/g, ""), 10);
    setPrecios((prev) => ({
      ...prev,
      [id]: { ...prev[id], precioPorLitro: isNaN(num) ? undefined : num },
    }));
  }

  async function guardar() {
    setGuardando(true);
    setMensaje(null);
    try {
      const res = await fetch("/api/precios", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(precios),
      });
      if (!res.ok) {
        const data = await res.json();
        setMensaje({ tipo: "error", texto: data.error ?? "Error al guardar" });
      } else {
        setMensaje({ tipo: "ok", texto: "Precios actualizados correctamente" });
      }
    } catch {
      setMensaje({ tipo: "error", texto: "Error de conexión" });
    } finally {
      setGuardando(false);
    }
  }

  async function cerrarSesion() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  const porCategoria = Object.entries(CATEGORIAS).map(([cat, label]) => ({
    cat,
    label,
    items: servicios.filter((s) => s.categoria === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="bg-neutral-950 border-b-2 border-red-600 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="LubriBox" width={140} height={36} className="h-8 w-auto" />
            <div className="hidden sm:flex items-center gap-2 text-xs font-black text-neutral-400 uppercase tracking-widest">
              <span className="text-neutral-700">|</span>
              Panel Administrativo
            </div>
          </div>
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-colors px-3 py-2 hover:bg-neutral-800"
          >
            <LogOut size={14} />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Título */}
        <div className="mb-8">
          <span className="text-red-500 text-xs font-black uppercase tracking-[0.2em] block mb-2">Administración</span>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Gestión de <span className="text-red-500">Precios</span>
          </h1>
          <div className="w-12 h-1 bg-red-600 mt-3" />
        </div>

        {/* Mensaje de estado */}
        {mensaje && (
          <div
            className={`flex items-center gap-2 text-sm p-4 mb-6 border ${
              mensaje.tipo === "ok"
                ? "bg-green-900/20 border-green-800 text-green-400"
                : "bg-red-900/20 border-red-900 text-red-400"
            }`}
          >
            {mensaje.tipo === "ok" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {mensaje.texto}
          </div>
        )}

        {/* Servicios por categoría */}
        <div className="space-y-8">
          {porCategoria.map(({ cat, label, items }) => (
            <div key={cat}>
              <h2 className="font-black text-red-500 uppercase tracking-[0.15em] text-xs mb-4 flex items-center gap-3">
                <span>{label}</span>
                <span className="flex-1 border-t border-neutral-800" />
              </h2>
              <div className="space-y-3">
                {items.map((s) => {
                  const p = precios[s.id] ?? { precioBase: s.precioBase, precioPorLitro: s.precioPorLitro };
                  return (
                    <div key={s.id} className="bg-neutral-900 border border-neutral-700 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-white text-sm uppercase tracking-wide mb-1">{s.nombre}</p>
                          <p className="text-neutral-500 text-xs leading-relaxed">{s.descripcion}</p>
                        </div>
                        <div className="flex flex-wrap gap-4 shrink-0">
                          <div>
                            <label className="block text-xs font-black text-neutral-400 uppercase tracking-[0.12em] mb-1.5">
                              Precio base
                            </label>
                            <div className="flex items-center gap-2">
                              <span className="text-neutral-500 text-sm">$</span>
                              <input
                                type="text"
                                inputMode="numeric"
                                value={p.precioBase.toLocaleString("es-AR")}
                                onChange={(e) => handlePrecioBase(s.id, e.target.value)}
                                className="w-32 bg-neutral-800 border border-neutral-600 text-white px-3 py-2 text-sm font-black text-right focus:outline-none focus:border-red-500 rounded-none"
                              />
                            </div>
                            <p className="text-neutral-600 text-xs mt-1 text-right">
                              = {formatearPrecio(p.precioBase)}
                            </p>
                          </div>
                          {s.precioPorLitro !== undefined && (
                            <div>
                              <label className="block text-xs font-black text-neutral-400 uppercase tracking-[0.12em] mb-1.5">
                                Precio / litro
                              </label>
                              <div className="flex items-center gap-2">
                                <span className="text-neutral-500 text-sm">$</span>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={(p.precioPorLitro ?? 0).toLocaleString("es-AR")}
                                  onChange={(e) => handlePrecioPorLitro(s.id, e.target.value)}
                                  className="w-32 bg-neutral-800 border border-neutral-600 text-white px-3 py-2 text-sm font-black text-right focus:outline-none focus:border-red-500 rounded-none"
                                />
                              </div>
                              <p className="text-neutral-600 text-xs mt-1 text-right">
                                = {formatearPrecio(p.precioPorLitro ?? 0)} / L
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Botón guardar */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={guardar}
            disabled={guardando}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black uppercase tracking-widest text-xs px-8 py-4 transition-colors"
          >
            <Save size={14} />
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </main>
    </div>
  );
}
