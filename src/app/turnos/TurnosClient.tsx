"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { autos } from "@/data/autos";
import { Servicio } from "@/data/servicios";
import { getProximosDias, getHorariosDisponibles, formatearFecha } from "@/data/disponibilidad";
import { CheckCircle, ChevronDown, Calendar, Clock, Car, Truck, MessageCircle, CalendarPlus } from "lucide-react";

type Paso = 1 | 2 | 3 | 4;

const WHATSAPP_NUMERO = "5493512052196"; // +54 9 351 205-2196
const UBICACION = "Emilio Petorutti 2576, Córdoba";

function fmtCalendar(date: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    date.getFullYear() +
    p(date.getMonth() + 1) +
    p(date.getDate()) +
    "T" +
    p(date.getHours()) +
    p(date.getMinutes()) +
    "00"
  );
}

function buildCalendarUrl(
  fecha: Date,
  hora: string,
  servicio: string,
  vehiculo: string,
  clienteNombre: string,
  detalles: string
): string {
  const [h, m] = hora.split(":").map(Number);
  const start = new Date(fecha);
  start.setHours(h, m, 0, 0);
  const end = new Date(start);
  end.setHours(h + 1, m, 0, 0);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${servicio} — ${clienteNombre} (${vehiculo})`,
    dates: `${fmtCalendar(start)}/${fmtCalendar(end)}`,
    details: detalles,
    location: UBICACION,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildWhatsAppUrl(
  fecha: Date,
  hora: string,
  servicio: string,
  vehiculo: string,
  tipoVehiculo: string,
  clienteNombre: string,
  clienteTelefono: string,
  clienteEmail: string,
  clienteComentario: string,
  calendarUrl: string
): string {
  const fechaStr = fecha.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const lines = [
    `*NUEVA SOLICITUD DE TURNO — LubriBox*`,
    ``,
    `*Cliente:* ${clienteNombre}`,
    `*Teléfono:* ${clienteTelefono}`,
    `*Email:* ${clienteEmail}`,
    `*Vehículo:* ${vehiculo} (${tipoVehiculo})`,
    `*Servicio:* ${servicio}`,
    `*Día:* ${fechaStr}`,
    `*Horario:* ${hora} hs`,
    clienteComentario ? `*Comentarios:* ${clienteComentario}` : "",
    ``,
    `Agregar al calendario:`,
    calendarUrl,
  ].filter((l) => l !== undefined);

  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(lines.join("\n"))}`;
}

const inputClass =
  "w-full bg-neutral-800 border border-neutral-600 text-white rounded-none px-4 py-3 text-sm focus:outline-none focus:border-red-500 placeholder:text-neutral-500";

const selectClass =
  "w-full appearance-none bg-neutral-800 border border-neutral-600 text-white rounded-none px-4 py-3 pr-10 text-sm focus:outline-none focus:border-red-500 disabled:opacity-40 disabled:cursor-not-allowed";

function TurnosForm({ servicios }: { servicios: Servicio[] }) {
  const params = useSearchParams();

  const [paso, setPaso] = useState<Paso>(1);
  const [tipoVehiculo, setTipoVehiculo] = useState<"auto" | "camioneta">("auto");
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
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const dias = getProximosDias(7);
  const horariosDisponibles = diaIndex !== null ? getHorariosDisponibles(dias[diaIndex]) : [];

  const marcaData = autos.find((a) => a.marca === marca);
  const modeloData = marcaData?.modelos.find((m) => m.nombre === modeloNombre);
  const servicioData = servicios.find((s) => s.id === servicioId);

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

  function paso1Completo() { return marca && modeloNombre && año && servicioId; }
  function paso2Completo() { return diaIndex !== null && horario; }
  function paso3Completo() { return nombre.trim() && telefono.trim() && email.trim(); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const vehiculo = `${marca} ${modeloNombre} ${año}`;
    const calendarDetalles = [
      `Cliente: ${nombre}`,
      `Tel: ${telefono}`,
      `Email: ${email}`,
      comentario ? `Comentarios: ${comentario}` : "",
    ].filter(Boolean).join("\n");

    const calUrl = buildCalendarUrl(
      dias[diaIndex!],
      horario,
      servicioData?.nombre ?? "",
      vehiculo,
      nombre,
      calendarDetalles
    );
    const waUrl = buildWhatsAppUrl(
      dias[diaIndex!],
      horario,
      servicioData?.nombre ?? "",
      vehiculo,
      tipoVehiculo,
      nombre,
      telefono,
      email,
      comentario,
      calUrl
    );
    setWhatsappUrl(waUrl);
    setEnviado(true);
    window.open(waUrl, "_blank");
  }

  /* ─── CONFIRMACIÓN ─── */
  if (enviado) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center animate-fadeIn">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-900/40 border border-green-700 mb-6">
          <CheckCircle size={36} className="text-green-400" />
        </div>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-3">¡Listo!</h2>
        <p className="text-neutral-400 mb-6">
          Tu solicitud fue enviada por WhatsApp al lubricentro. Te van a confirmar el turno a la brevedad.
        </p>

        {/* Resumen */}
        <div className="bg-neutral-800 border border-neutral-700 p-5 mb-6 text-left space-y-3 text-sm">
          {[
            { label: "Servicio", value: servicioData?.nombre },
            { label: "Vehículo", value: `${marca} ${modeloNombre} ${año} (${tipoVehiculo})` },
            { label: "Día", value: diaIndex !== null ? formatearFecha(dias[diaIndex]) : "" },
            { label: "Horario", value: `${horario} hs` },
            { label: "Cliente", value: nombre },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between border-b border-neutral-700 pb-2 last:border-0 last:pb-0">
              <span className="text-neutral-500 uppercase text-xs tracking-widest">{label}:</span>
              <span className="font-black text-white capitalize">{value}</span>
            </div>
          ))}
        </div>

        {/* Botones */}
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-black px-6 py-4 uppercase tracking-widest text-xs transition-colors"
          >
            <MessageCircle size={16} />
            Reenviar por WhatsApp
          </a>
        </div>

        <p className="text-xs text-neutral-600 mt-6">
          El mensaje incluye un link para que el lubricentro pueda agregar el turno a Google Calendar.
        </p>
        <p className="text-xs text-neutral-600 mt-2">
          Consultas: +54 351 205-2196
        </p>
      </div>
    );
  }

  const labelClass = "block text-xs font-black text-neutral-400 uppercase tracking-[0.15em] mb-1.5";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Indicador de pasos */}
      <div className="flex items-center gap-2 mb-10">
        {([1, 2, 3] as Paso[]).map((p) => (
          <div key={p} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 flex items-center justify-center text-xs font-black transition-colors ${
                paso > p
                  ? "bg-red-600 text-white"
                  : paso === p
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-neutral-500 border border-neutral-700"
              }`}
            >
              {paso > p ? <CheckCircle size={14} /> : p}
            </div>
            <span className={`text-xs font-black uppercase tracking-widest hidden sm:block ${paso >= p ? "text-white" : "text-neutral-600"}`}>
              {p === 1 ? "Vehículo" : p === 2 ? "Horario" : "Datos"}
            </span>
            {p < 3 && <div className={`h-px w-8 sm:w-16 ${paso > p ? "bg-red-600" : "bg-neutral-700"}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ─── PASO 1 ─── */}
        {paso === 1 && (
          <div className="bg-neutral-900 border border-neutral-700 p-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-red-600" />
              <h2 className="text-lg font-black text-white uppercase tracking-wide">Tu vehículo y servicio</h2>
            </div>

            {/* Toggle tipo de vehículo */}
            <div className="flex mb-5 border border-neutral-700 w-fit">
              <button
                type="button"
                onClick={() => { setTipoVehiculo("auto"); handleMarca(""); }}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-colors ${
                  tipoVehiculo === "auto" ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <Car size={13} /> Auto
              </button>
              <button
                type="button"
                onClick={() => { setTipoVehiculo("camioneta"); handleMarca(""); }}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-colors border-l border-neutral-700 ${
                  tipoVehiculo === "camioneta" ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <Truck size={13} /> Camioneta
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className={labelClass}>Marca</label>
                <div className="relative">
                  <select value={marca} onChange={(e) => handleMarca(e.target.value)} className={selectClass}>
                    <option value="">-- Marca --</option>
                    {autos.map((a) => <option key={a.marca} value={a.marca}>{a.marca}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Modelo</label>
                <div className="relative">
                  <select value={modeloNombre} onChange={(e) => handleModelo(e.target.value)} disabled={!marca} className={selectClass}>
                    <option value="">-- Modelo --</option>
                    {marcaData?.modelos.map((m) => <option key={m.nombre} value={m.nombre}>{m.nombre}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Año</label>
                <div className="relative">
                  <select value={año} onChange={(e) => setAño(e.target.value)} disabled={!modeloNombre} className={selectClass}>
                    <option value="">-- Año --</option>
                    {modeloData?.años.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Servicio</label>
              <div className="relative">
                <select value={servicioId} onChange={(e) => setServicioId(e.target.value)} className={selectClass}>
                  <option value="">-- Seleccioná el servicio --</option>
                  {servicios.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPaso(2)}
                disabled={!paso1Completo()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-600 disabled:border disabled:border-neutral-700 text-white font-black px-8 py-3 uppercase tracking-widest text-xs transition-colors"
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* ─── PASO 2 ─── */}
        {paso === 2 && (
          <div className="bg-neutral-900 border border-neutral-700 p-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-red-600" />
              <h2 className="text-lg font-black text-white uppercase tracking-wide">Elegí el día y horario</h2>
            </div>

            {/* Resumen paso 1 */}
            <div className="flex flex-wrap gap-3 mb-6 p-4 bg-neutral-800 border border-neutral-700 text-sm">
              <span className="font-black text-white">{marca} {modeloNombre} {año}</span>
              <span className="text-neutral-600">|</span>
              <span className="text-red-400 text-xs uppercase font-black tracking-widest">{tipoVehiculo}</span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-400">{servicioData?.nombre}</span>
              <button type="button" onClick={() => setPaso(1)} className="text-red-500 hover:text-red-400 ml-auto text-xs font-black uppercase tracking-widest">
                Modificar
              </button>
            </div>

            {/* Días */}
            <div className="mb-6">
              <label className={`${labelClass} flex items-center gap-2`}>
                <Calendar size={13} /> Día
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dias.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setDiaIndex(i); setHorario(""); }}
                    className={`p-3 border text-sm text-center transition-all ${
                      diaIndex === i
                        ? "border-red-600 bg-red-600/10 text-red-400"
                        : "border-neutral-700 bg-neutral-800 hover:border-red-600/50 hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    <span className="block capitalize text-xs font-black mb-1 uppercase tracking-widest">
                      {d.toLocaleDateString("es-AR", { weekday: "short" })}
                    </span>
                    <span className="block text-xl font-black">{d.getDate()}</span>
                    <span className="block text-xs text-neutral-500">
                      {d.toLocaleDateString("es-AR", { month: "short" })}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Horarios */}
            {diaIndex !== null && (
              <div className="animate-fadeIn">
                <label className={`${labelClass} flex items-center gap-2`}>
                  <Clock size={13} /> Horario disponible
                </label>
                {horariosDisponibles.length === 0 ? (
                  <p className="text-sm text-neutral-500 bg-neutral-800 border border-neutral-700 p-4">
                    No hay horarios disponibles para ese día. Elegí otro.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {horariosDisponibles.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHorario(h)}
                        className={`px-5 py-2.5 border text-sm font-black uppercase tracking-widest transition-all ${
                          horario === h
                            ? "border-red-600 bg-red-600 text-white"
                            : "border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-red-600/50 hover:text-white"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setPaso(1)} className="text-neutral-500 hover:text-white font-black text-xs uppercase tracking-widest transition-colors">
                ← Volver
              </button>
              <button
                type="button"
                onClick={() => setPaso(3)}
                disabled={!paso2Completo()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-600 disabled:border disabled:border-neutral-700 text-white font-black px-8 py-3 uppercase tracking-widest text-xs transition-colors"
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* ─── PASO 3 ─── */}
        {paso === 3 && (
          <div className="bg-neutral-900 border border-neutral-700 p-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-red-600" />
              <h2 className="text-lg font-black text-white uppercase tracking-wide">Tus datos de contacto</h2>
            </div>

            {/* Resumen */}
            <div className="flex flex-wrap gap-3 mb-6 p-4 bg-neutral-800 border border-neutral-700 text-sm">
              <span className="font-black text-white">{marca} {modeloNombre} {año}</span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-400">{servicioData?.nombre}</span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-400 capitalize">
                {diaIndex !== null ? formatearFecha(dias[diaIndex]) : ""} — {horario} hs
              </span>
              <button type="button" onClick={() => setPaso(2)} className="text-red-500 hover:text-red-400 ml-auto text-xs font-black uppercase tracking-widest">
                Modificar
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Nombre completo *</label>
                <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Juan Pérez" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Teléfono / WhatsApp *</label>
                  <input type="tel" required value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="351 205-2196" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="juan@email.com" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Comentario adicional (opcional)</label>
                <textarea
                  rows={3}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Contanos si hay algo que debamos saber sobre tu vehículo..."
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            <p className="text-xs text-neutral-600 mt-4">
              * Te vamos a contactar para confirmar el turno. Tus datos no serán compartidos con terceros.
            </p>

            <div className="mt-6 flex justify-between">
              <button type="button" onClick={() => setPaso(2)} className="text-neutral-500 hover:text-white font-black text-xs uppercase tracking-widest transition-colors">
                ← Volver
              </button>
              <button
                type="submit"
                disabled={!paso3Completo()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-600 disabled:border disabled:border-neutral-700 text-white font-black px-8 py-3 uppercase tracking-widest text-xs transition-colors"
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

export default function TurnosClient({ servicios }: { servicios: Servicio[] }) {
  return (
    <Suspense fallback={<div className="py-20 text-center text-neutral-500 uppercase tracking-widest text-xs">Cargando...</div>}>
      <TurnosForm servicios={servicios} />
    </Suspense>
  );
}
