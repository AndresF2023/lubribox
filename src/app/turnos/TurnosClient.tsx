"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { autos } from "@/data/autos";
import { servicios } from "@/data/servicios";
import { getProximosDias, getHorariosDisponibles, formatearFecha } from "@/data/disponibilidad";
import { CheckCircle, ChevronDown, Calendar, Clock } from "lucide-react";

type Paso = 1 | 2 | 3 | 4;

function TurnosForm() {
  const params = useSearchParams();

  // Estado del formulario
  const [paso, setPaso] = useState<Paso>(1);
  const [marca, setMarca] = useState(params.get("marca") ?? "");
  const [modeloNombre, setModeloNombre] = useState(params.get("modelo") ?? "");
  const [año, setAño] = useState(params.get("año") ?? "");
  const [servicioId, setServicioId] = useState(params.get("servicio") ?? "");
  const [diaIndex, setDiaIndex] = useState<number | null>(null);
  const [horario, setHorario] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  const dias = getProximosDias(7);
  const horariosDisponibles = diaIndex !== null ? getHorariosDisponibles(dias[diaIndex]) : [];

  const marcaData = autos.find((a) => a.marca === marca);
  const modeloData = marcaData?.modelos.find((m) => m.nombre === modeloNombre);
  const servicioData = servicios.find((s) => s.id === servicioId);

  // Avanzar auto si ya viene con datos de la página de servicios
  useEffect(() => {
    if (marca && modeloNombre && año && servicioId) {
      setPaso(2);
    }
  }, []);

  function handleMarca(val: string) {
    setMarca(val);
    setModeloNombre("");
    setAño("");
  }

  function handleModelo(val: string) {
    setModeloNombre(val);
    setAño("");
  }

  function paso1Completo() {
    return marca && modeloNombre && año && servicioId;
  }

  function paso2Completo() {
    return diaIndex !== null && horario;
  }

  function paso3Completo() {
    return nombre.trim() && telefono.trim() && email.trim();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center animate-fadeIn">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-black text-black mb-3">¡Turno solicitado!</h2>
        <p className="text-gray-500 mb-2">
          Recibimos tu solicitud. Te vamos a confirmar el turno por WhatsApp o email en las próximas horas.
        </p>
        <div className="bg-gray-50 rounded-xl p-5 my-6 text-left space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Servicio:</span>
            <span className="font-semibold text-black">{servicioData?.nombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Vehículo:</span>
            <span className="font-semibold text-black">{marca} {modeloNombre} {año}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Día:</span>
            <span className="font-semibold text-black capitalize">
              {diaIndex !== null ? formatearFecha(dias[diaIndex]) : ""}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Horario:</span>
            <span className="font-semibold text-black">{horario} hs</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">
          Ante cualquier consulta llamanos al +54 11 1234-5678
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Pasos */}
      <div className="flex items-center gap-2 mb-10">
        {([1, 2, 3] as Paso[]).map((p) => (
          <div key={p} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                paso > p
                  ? "bg-red-600 text-white"
                  : paso === p
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {paso > p ? <CheckCircle size={16} /> : p}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${paso >= p ? "text-black" : "text-gray-400"}`}>
              {p === 1 ? "Tu vehículo" : p === 2 ? "Día y horario" : "Tus datos"}
            </span>
            {p < 3 && <div className={`flex-1 h-px w-8 sm:w-16 ${paso > p ? "bg-red-600" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PASO 1 — Vehículo y servicio */}
        {paso === 1 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm animate-fadeIn">
            <h2 className="text-xl font-black text-black mb-5">Tu vehículo y servicio</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Marca</label>
                <div className="relative">
                  <select
                    value={marca}
                    onChange={(e) => handleMarca(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">-- Marca --</option>
                    {autos.map((a) => <option key={a.marca} value={a.marca}>{a.marca}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Modelo</label>
                <div className="relative">
                  <select
                    value={modeloNombre}
                    onChange={(e) => handleModelo(e.target.value)}
                    disabled={!marca}
                    className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">-- Modelo --</option>
                    {marcaData?.modelos.map((m) => <option key={m.nombre} value={m.nombre}>{m.nombre}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Año</label>
                <div className="relative">
                  <select
                    value={año}
                    onChange={(e) => setAño(e.target.value)}
                    disabled={!modeloNombre}
                    className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">-- Año --</option>
                    {modeloData?.años.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Servicio</label>
              <div className="relative">
                <select
                  value={servicioId}
                  onChange={(e) => setServicioId(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">-- Seleccioná el servicio --</option>
                  {servicios.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPaso(2)}
                disabled={!paso1Completo()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* PASO 2 — Día y horario */}
        {paso === 2 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm animate-fadeIn">
            <h2 className="text-xl font-black text-black mb-5">Elegí el día y horario</h2>

            {/* Resumen del paso 1 */}
            <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-xl text-sm">
              <span className="font-semibold text-black">{marca} {modeloNombre} {año}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{servicioData?.nombre}</span>
              <button type="button" onClick={() => setPaso(1)} className="text-red-600 hover:underline ml-auto text-xs">
                Modificar
              </button>
            </div>

            {/* Días disponibles */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Calendar size={14} /> Día
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dias.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setDiaIndex(i); setHorario(""); }}
                    className={`p-3 rounded-xl border text-sm text-center transition-all ${
                      diaIndex === i
                        ? "border-red-600 bg-red-50 text-red-700 font-bold"
                        : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                    }`}
                  >
                    <span className="block capitalize text-xs font-semibold mb-1">
                      {d.toLocaleDateString("es-AR", { weekday: "short" })}
                    </span>
                    <span className="block text-lg font-black">{d.getDate()}</span>
                    <span className="block text-xs text-gray-500">
                      {d.toLocaleDateString("es-AR", { month: "short" })}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Horarios */}
            {diaIndex !== null && (
              <div className="animate-fadeIn">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Clock size={14} /> Horario disponible
                </label>
                {horariosDisponibles.length === 0 ? (
                  <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                    No hay horarios disponibles para ese día. Elegí otro.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {horariosDisponibles.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHorario(h)}
                        className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                          horario === h
                            ? "border-red-600 bg-red-600 text-white"
                            : "border-gray-200 hover:border-red-400 hover:text-red-600"
                        }`}
                      >
                        {h} hs
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setPaso(1)} className="text-gray-500 hover:text-black font-medium text-sm">
                ← Volver
              </button>
              <button
                type="button"
                onClick={() => setPaso(3)}
                disabled={!paso2Completo()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* PASO 3 — Datos de contacto */}
        {paso === 3 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm animate-fadeIn">
            <h2 className="text-xl font-black text-black mb-5">Tus datos de contacto</h2>

            {/* Resumen */}
            <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-xl text-sm">
              <span className="font-semibold text-black">{marca} {modeloNombre} {año}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{servicioData?.nombre}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 capitalize">
                {diaIndex !== null ? formatearFecha(dias[diaIndex]) : ""} — {horario} hs
              </span>
              <button type="button" onClick={() => setPaso(2)} className="text-red-600 hover:underline ml-auto text-xs">
                Modificar
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Juan Pérez"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="11 1234-5678"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="juan@email.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                  Comentario adicional (opcional)
                </label>
                <textarea
                  rows={3}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Contanos si hay algo que debamos saber sobre tu vehículo..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              * Te vamos a contactar para confirmar el turno. Tus datos no serán compartidos con terceros.
            </p>

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setPaso(2)} className="text-gray-500 hover:text-black font-medium text-sm">
                ← Volver
              </button>
              <button
                type="submit"
                disabled={!paso3Completo()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Confirmar turno
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default function TurnosClient() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Cargando...</div>}>
      <TurnosForm />
    </Suspense>
  );
}
