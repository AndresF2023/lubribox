"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, AlertCircle, LogOut, Save, Trash2, Plus, X, Tag } from "lucide-react";
import { Servicio, Categoria, formatearPrecio } from "@/data/servicios";

interface Props {
  serviciosIniciales: Servicio[];
  categoriasIniciales: Categoria[];
}

const inputClass =
  "w-full bg-neutral-800 border border-neutral-600 text-white px-3 py-2 text-sm focus:outline-none focus:border-red-500 rounded-none";

const labelClass = "block text-xs font-black text-neutral-400 uppercase tracking-[0.12em] mb-1.5";

function generarId(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

const SERVICIO_VACIO: Omit<Servicio, "id"> = {
  nombre: "",
  descripcion: "",
  categoria: "mantenimiento",
  duracionMin: 30,
  precioBase: 0,
  precioPorLitro: undefined,
  precioBaseCamioneta: undefined,
  precioPorLitroCamioneta: undefined,
  incluye: [],
};

export default function DashboardClient({ serviciosIniciales, categoriasIniciales }: Props) {
  const router = useRouter();
  const [servicios, setServicios] = useState<Servicio[]>(serviciosIniciales);
  const [categorias, setCategorias] = useState<Categoria[]>(categoriasIniciales);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState<Omit<Servicio, "id">>(SERVICIO_VACIO);
  const [nuevoItem, setNuevoItem] = useState("");
  const [tienePrecioPorLitro, setTienePrecioPorLitro] = useState(false);
  const [nuevaCategoriaNombre, setNuevaCategoriaNombre] = useState("");

  // ── Editar precios de servicio existente ─────────────────────────────
  function handleCampo(id: string, campo: keyof Servicio, valor: string) {
    const num = parseInt(valor.replace(/\D/g, ""), 10);
    setServicios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [campo]: isNaN(num) ? undefined : num } : s))
    );
  }

  // ── Eliminar servicio ────────────────────────────────────────────────
  function eliminar(id: string) {
    if (!confirm("¿Eliminar este servicio?")) return;
    setServicios((prev) => prev.filter((s) => s.id !== id));
  }

  // ── Agregar servicio ─────────────────────────────────────────────────
  function agregarItem() {
    if (!nuevoItem.trim()) return;
    setNuevoServicio((prev) => ({ ...prev, incluye: [...prev.incluye, nuevoItem.trim()] }));
    setNuevoItem("");
  }

  function quitarItem(idx: number) {
    setNuevoServicio((prev) => ({
      ...prev,
      incluye: prev.incluye.filter((_, i) => i !== idx),
    }));
  }

  function agregarServicio() {
    if (!nuevoServicio.nombre.trim() || !nuevoServicio.descripcion.trim()) {
      setMensaje({ tipo: "error", texto: "Completá nombre y descripción" });
      return;
    }
    const id = generarId(nuevoServicio.nombre);
    const s: Servicio = {
      ...nuevoServicio,
      id,
      precioPorLitro: tienePrecioPorLitro ? nuevoServicio.precioPorLitro : undefined,
    };
    setServicios((prev) => [...prev, s]);
    setNuevoServicio({ ...SERVICIO_VACIO, categoria: categorias[0]?.id ?? "otros" });
    setNuevoItem("");
    setTienePrecioPorLitro(false);
    setMostrarForm(false);
    setMensaje(null);
  }

  // ── Gestión de categorías ────────────────────────────────────────────
  function agregarCategoria() {
    const nombre = nuevaCategoriaNombre.trim();
    if (!nombre) return;
    const id = generarId(nombre);
    if (categorias.some((c) => c.id === id)) {
      setMensaje({ tipo: "error", texto: "Ya existe una categoría con ese nombre" });
      return;
    }
    setCategorias((prev) => [...prev, { id, nombre }]);
    setNuevaCategoriaNombre("");
    setMensaje(null);
  }

  function eliminarCategoria(id: string) {
    const enUso = servicios.some((s) => s.categoria === id);
    if (enUso) {
      setMensaje({ tipo: "error", texto: "No se puede eliminar: hay servicios usando esta categoría" });
      return;
    }
    if (!confirm("¿Eliminar esta categoría?")) return;
    setCategorias((prev) => prev.filter((c) => c.id !== id));
    setMensaje(null);
  }

  // ── Guardar en blob ──────────────────────────────────────────────────
  async function guardar() {
    setGuardando(true);
    setMensaje(null);
    try {
      const res = await fetch("/api/servicios", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ servicios, categorias }),
      });
      if (!res.ok) {
        const data = await res.json();
        setMensaje({ tipo: "error", texto: data.error ?? "Error al guardar" });
      } else {
        setMensaje({ tipo: "ok", texto: "Cambios guardados correctamente" });
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

  const porCategoria = categorias.map((cat) => ({
    cat: cat.id,
    label: cat.nombre,
    items: servicios.filter((s) => s.categoria === cat.id),
  })).filter((g) => g.items.length > 0);

  const defaultCategoria = categorias[0]?.id ?? "otros";

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
            Gestión de <span className="text-red-500">Servicios</span>
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

        {/* ── Gestión de categorías ── */}
        <div className="mb-10">
          <h2 className="font-black text-white uppercase tracking-[0.15em] text-xs mb-4 flex items-center gap-3">
            <Tag size={13} className="text-red-500" />
            <span>Categorías</span>
            <span className="flex-1 border-t border-neutral-800" />
          </h2>
          <div className="bg-neutral-900 border border-neutral-700 p-5">
            <div className="flex flex-wrap gap-2 mb-4">
              {categorias.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm"
                >
                  <span className="font-black text-white uppercase tracking-wide text-xs">{cat.nombre}</span>
                  <button
                    onClick={() => eliminarCategoria(cat.id)}
                    className="text-neutral-600 hover:text-red-500 transition-colors ml-1"
                    title="Eliminar categoría"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
              {categorias.length === 0 && (
                <p className="text-neutral-600 text-xs italic">Sin categorías. Agregá al menos una.</p>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={nuevaCategoriaNombre}
                onChange={(e) => setNuevaCategoriaNombre(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), agregarCategoria())}
                className={`${inputClass} flex-1`}
                placeholder="Nueva categoría (ej: Electricidad)"
              />
              <button
                type="button"
                onClick={agregarCategoria}
                className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors whitespace-nowrap"
              >
                <Plus size={13} />
                Agregar
              </button>
            </div>
          </div>
        </div>

        {/* Servicios por categoría */}
        <div className="space-y-8">
          {porCategoria.map(({ cat, label, items }) => (
            <div key={cat}>
              <h2 className="font-black text-red-500 uppercase tracking-[0.15em] text-xs mb-4 flex items-center gap-3">
                <span>{label}</span>
                <span className="flex-1 border-t border-neutral-800" />
              </h2>
              <div className="space-y-3">
                {items.map((s) => (
                  <div key={s.id} className="bg-neutral-900 border border-neutral-700 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-white text-sm uppercase tracking-wide mb-1">{s.nombre}</p>
                        <p className="text-neutral-500 text-xs leading-relaxed">{s.descripcion}</p>
                      </div>
                      <div className="flex flex-wrap items-start gap-6 shrink-0">
                        {/* Columna Auto */}
                        <div className="space-y-3">
                          <p className="text-xs font-black text-neutral-500 uppercase tracking-widest flex items-center gap-1">Auto</p>
                          <div>
                            <label className={labelClass}>Precio base</label>
                            <div className="flex items-center gap-1">
                              <span className="text-neutral-500 text-sm">$</span>
                              <input
                                type="text" inputMode="numeric"
                                value={s.precioBase.toLocaleString("es-AR")}
                                onChange={(e) => handleCampo(s.id, "precioBase", e.target.value)}
                                className="w-28 bg-neutral-800 border border-neutral-600 text-white px-3 py-2 text-sm font-black text-right focus:outline-none focus:border-red-500 rounded-none"
                              />
                            </div>
                          </div>
                          {s.precioPorLitro !== undefined && (
                            <div>
                              <label className={labelClass}>$ / litro</label>
                              <div className="flex items-center gap-1">
                                <span className="text-neutral-500 text-sm">$</span>
                                <input
                                  type="text" inputMode="numeric"
                                  value={(s.precioPorLitro ?? 0).toLocaleString("es-AR")}
                                  onChange={(e) => handleCampo(s.id, "precioPorLitro", e.target.value)}
                                  className="w-28 bg-neutral-800 border border-neutral-600 text-white px-3 py-2 text-sm font-black text-right focus:outline-none focus:border-red-500 rounded-none"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Columna Camioneta */}
                        <div className="space-y-3">
                          <p className="text-xs font-black text-red-600 uppercase tracking-widest">Camioneta</p>
                          <div>
                            <label className={labelClass}>Precio base</label>
                            <div className="flex items-center gap-1">
                              <span className="text-neutral-500 text-sm">$</span>
                              <input
                                type="text" inputMode="numeric"
                                value={(s.precioBaseCamioneta ?? "").toLocaleString?.() ?? ""}
                                placeholder={s.precioBase.toLocaleString("es-AR")}
                                onChange={(e) => handleCampo(s.id, "precioBaseCamioneta", e.target.value)}
                                className="w-28 bg-neutral-800 border border-red-900/50 text-white px-3 py-2 text-sm font-black text-right focus:outline-none focus:border-red-500 rounded-none placeholder:text-neutral-600"
                              />
                            </div>
                          </div>
                          {s.precioPorLitro !== undefined && (
                            <div>
                              <label className={labelClass}>$ / litro</label>
                              <div className="flex items-center gap-1">
                                <span className="text-neutral-500 text-sm">$</span>
                                <input
                                  type="text" inputMode="numeric"
                                  value={(s.precioPorLitroCamioneta ?? "").toLocaleString?.() ?? ""}
                                  placeholder={(s.precioPorLitro ?? 0).toLocaleString("es-AR")}
                                  onChange={(e) => handleCampo(s.id, "precioPorLitroCamioneta", e.target.value)}
                                  className="w-28 bg-neutral-800 border border-red-900/50 text-white px-3 py-2 text-sm font-black text-right focus:outline-none focus:border-red-500 rounded-none placeholder:text-neutral-600"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Eliminar */}
                        <div className="flex items-end pb-1">
                          <button
                            onClick={() => eliminar(s.id)}
                            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-red-500 transition-colors px-3 py-2 border border-neutral-700 hover:border-red-900"
                          >
                            <Trash2 size={13} />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Agregar nuevo servicio */}
        <div className="mt-10">
          {!mostrarForm ? (
            <button
              onClick={() => {
                setNuevoServicio({ ...SERVICIO_VACIO, categoria: defaultCategoria });
                setMostrarForm(true);
              }}
              className="flex items-center gap-2 border border-dashed border-neutral-600 hover:border-red-600 text-neutral-400 hover:text-white font-black uppercase tracking-widest text-xs px-6 py-4 w-full justify-center transition-colors"
            >
              <Plus size={14} />
              Agregar nuevo servicio
            </button>
          ) : (
            <div className="bg-neutral-900 border border-neutral-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-red-600" />
                  <h3 className="font-black text-white uppercase tracking-wide text-sm">Nuevo servicio</h3>
                </div>
                <button onClick={() => setMostrarForm(false)} className="text-neutral-500 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Nombre *</label>
                  <input
                    type="text"
                    value={nuevoServicio.nombre}
                    onChange={(e) => setNuevoServicio((p) => ({ ...p, nombre: e.target.value }))}
                    className={inputClass}
                    placeholder="Ej: Cambio de correa"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Descripción *</label>
                  <textarea
                    rows={2}
                    value={nuevoServicio.descripcion}
                    onChange={(e) => setNuevoServicio((p) => ({ ...p, descripcion: e.target.value }))}
                    className={`${inputClass} resize-none`}
                    placeholder="Breve descripción del servicio"
                  />
                </div>
                <div>
                  <label className={labelClass}>Categoría</label>
                  <select
                    value={nuevoServicio.categoria}
                    onChange={(e) => setNuevoServicio((p) => ({ ...p, categoria: e.target.value }))}
                    className={inputClass}
                  >
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Duración (minutos)</label>
                  <input
                    type="number"
                    min={5}
                    value={nuevoServicio.duracionMin}
                    onChange={(e) => setNuevoServicio((p) => ({ ...p, duracionMin: parseInt(e.target.value) || 30 }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Precio base — Auto ($)</label>
                  <input
                    type="text" inputMode="numeric"
                    value={nuevoServicio.precioBase || ""}
                    onChange={(e) => setNuevoServicio((p) => ({ ...p, precioBase: parseInt(e.target.value.replace(/\D/g, "")) || 0 }))}
                    className={inputClass}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className={labelClass}>Precio base — Camioneta ($)</label>
                  <input
                    type="text" inputMode="numeric"
                    value={nuevoServicio.precioBaseCamioneta || ""}
                    onChange={(e) => setNuevoServicio((p) => ({ ...p, precioBaseCamioneta: parseInt(e.target.value.replace(/\D/g, "")) || undefined }))}
                    className={inputClass}
                    placeholder="Dejar vacío = igual a auto"
                  />
                </div>
                {nuevoServicio.categoria !== "paquetes" && (
                <div>
                  <label className={labelClass}>
                    <input
                      type="checkbox"
                      checked={tienePrecioPorLitro}
                      onChange={(e) => setTienePrecioPorLitro(e.target.checked)}
                      className="mr-2 accent-red-600"
                    />
                    Precio por litro de aceite
                  </label>
                  {tienePrecioPorLitro && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input
                        type="text" inputMode="numeric"
                        value={nuevoServicio.precioPorLitro || ""}
                        onChange={(e) => setNuevoServicio((p) => ({ ...p, precioPorLitro: parseInt(e.target.value.replace(/\D/g, "")) || 0 }))}
                        className={inputClass}
                        placeholder="Auto ($/L)"
                      />
                      <input
                        type="text" inputMode="numeric"
                        value={nuevoServicio.precioPorLitroCamioneta || ""}
                        onChange={(e) => setNuevoServicio((p) => ({ ...p, precioPorLitroCamioneta: parseInt(e.target.value.replace(/\D/g, "")) || undefined }))}
                        className={inputClass}
                        placeholder="Camioneta (vacío=igual)"
                      />
                    </div>
                  )}
                </div>
                )}
              </div>

              {/* Items que incluye */}
              <div className="mb-5">
                <label className={labelClass}>¿Qué incluye?</label>
                <div className="space-y-2 mb-2">
                  {nuevoServicio.incluye.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 px-3 py-2">
                      <CheckCircle size={13} className="text-red-500 shrink-0" />
                      <span className="text-sm text-neutral-300 flex-1">{item}</span>
                      <button onClick={() => quitarItem(idx)} className="text-neutral-600 hover:text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nuevoItem}
                    onChange={(e) => setNuevoItem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), agregarItem())}
                    className={`${inputClass} flex-1`}
                    placeholder="Ej: Cambio de filtro de aceite"
                  />
                  <button
                    type="button"
                    onClick={agregarItem}
                    className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setMostrarForm(false)}
                  className="text-neutral-500 hover:text-white font-black text-xs uppercase tracking-widest px-4 py-2 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={agregarServicio}
                  className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white font-black uppercase tracking-widest text-xs px-6 py-3 transition-colors"
                >
                  <Plus size={13} />
                  Agregar a la lista
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Botón guardar */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={guardar}
            disabled={guardando}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black uppercase tracking-widest text-xs px-8 py-4 transition-colors"
          >
            <Save size={14} />
            {guardando ? "Guardando..." : "Guardar todos los cambios"}
          </button>
        </div>
      </main>
    </div>
  );
}
