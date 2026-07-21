"use client";

import { useEffect, useState } from "react";
import { Users, MessageCircle, CalendarCheck, TrendingUp, RefreshCw } from "lucide-react";

interface Stats {
  totalVisitas: number;
  turnosConfirmados: number;
  whatsappClicks: number;
  visitasPorDia: { date: string; total: number }[];
  paginasTop: { path: string; views: number }[];
  eventosTop: { event: string; count: number }[];
}

const PAGE_LABELS: Record<string, string> = {
  "/": "Inicio",
  "/servicios": "Servicios",
  "/turnos": "Turnos",
  "/quienes-somos": "Quiénes somos",
};

const EVENT_LABELS: Record<string, string> = {
  turno_confirmado: "Turnos confirmados",
  whatsapp_flotante_click: "Clicks WhatsApp flotante",
  turno_paso2_inicio: "Paso 2 (eligieron horario)",
  turno_paso3_inicio: "Paso 3 (ingresaron datos)",
  turno_whatsapp_reenvio: "Reenvíos por WhatsApp",
  servicio_expandido: "Servicios expandidos",
  servicio_filtro_categoria: "Filtros por categoría",
  servicio_sacar_turno_click: "Clicks 'Sacar turno'",
};

function formatDate(dateStr: string): string {
  const [, m, d] = dateStr.split("-");
  return `${parseInt(d)}/${parseInt(m)}`;
}

function formatPage(path: string): string {
  return PAGE_LABELS[path] ?? path;
}

function formatEvent(event: string): string {
  return EVENT_LABELS[event] ?? event;
}

export default function AnalyticsPanel() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function cargarStats() {
    setLoading(true);
    setError(false);
    fetch("/api/analytics/stats")
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }

  useEffect(() => { cargarStats(); }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center gap-3 text-neutral-500">
        <div className="w-8 h-8 border-2 border-neutral-700 border-t-red-600 rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest font-black">Cargando estadísticas...</span>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="py-20 flex flex-col items-center gap-4 text-neutral-500">
        <p className="text-sm">No se pudieron cargar las estadísticas.</p>
        <button onClick={cargarStats} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors">
          <RefreshCw size={13} /> Reintentar
        </button>
      </div>
    );
  }

  const maxVisitas = Math.max(...stats.visitasPorDia.map((d) => d.total), 1);
  const maxPv = stats.paginasTop[0]?.views ?? 1;
  const maxEv = stats.eventosTop[0]?.count ?? 1;

  const sinDatos = stats.totalVisitas === 0 && stats.turnosConfirmados === 0;

  return (
    <div className="space-y-10">

      {/* Aviso si no hay datos todavía */}
      {sinDatos && (
        <div className="bg-neutral-900 border border-neutral-700 p-5 text-sm text-neutral-400">
          <p className="font-black text-white text-xs uppercase tracking-widest mb-1">Sin datos aún</p>
          <p>Los datos aparecerán aquí a medida que los visitantes usen la página. El sistema empezó a registrar desde el deploy actual.</p>
        </div>
      )}

      {/* ── Tarjetas resumen ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neutral-900 border border-neutral-700 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-neutral-800 flex items-center justify-center">
              <Users size={15} className="text-red-500" />
            </div>
            <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Visitas (30 días)</span>
          </div>
          <p className="text-4xl font-black text-white">{stats.totalVisitas.toLocaleString("es-AR")}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-neutral-800 flex items-center justify-center">
              <CalendarCheck size={15} className="text-red-500" />
            </div>
            <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Turnos pedidos</span>
          </div>
          <p className="text-4xl font-black text-white">{stats.turnosConfirmados.toLocaleString("es-AR")}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-700 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-neutral-800 flex items-center justify-center">
              <MessageCircle size={15} className="text-green-500" />
            </div>
            <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">Clicks WhatsApp</span>
          </div>
          <p className="text-4xl font-black text-white">{stats.whatsappClicks.toLocaleString("es-AR")}</p>
        </div>
      </div>

      {/* ── Gráfico de visitas por día ── */}
      <div>
        <h2 className="font-black text-white uppercase tracking-[0.15em] text-xs mb-5 flex items-center gap-3">
          <TrendingUp size={13} className="text-red-500" />
          <span>Visitas por día — últimos 30 días</span>
          <span className="flex-1 border-t border-neutral-800" />
        </h2>

        <div className="bg-neutral-900 border border-neutral-700 p-5">
          {/* Barras */}
          <div className="flex items-end gap-[3px] h-28">
            {stats.visitasPorDia.map((d) => {
              const pct = maxVisitas > 0 ? (d.total / maxVisitas) * 100 : 0;
              return (
                <div
                  key={d.date}
                  className="flex-1 group relative flex flex-col justify-end"
                  style={{ height: "100%" }}
                >
                  <div
                    className="bg-red-600 hover:bg-red-500 transition-colors w-full"
                    style={{ height: `${Math.max(pct, d.total > 0 ? 4 : 0)}%` }}
                  />
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-800 border border-neutral-700 px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <span className="text-neutral-400">{formatDate(d.date)}</span>
                    <span className="font-black text-white ml-2">{d.total}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Etiquetas del eje X — solo primera, mediados y última */}
          <div className="flex justify-between mt-2 text-xs text-neutral-600 font-black">
            <span>{formatDate(stats.visitasPorDia[0]?.date ?? "")}</span>
            <span>{formatDate(stats.visitasPorDia[14]?.date ?? "")}</span>
            <span>{formatDate(stats.visitasPorDia[29]?.date ?? "")}</span>
          </div>
        </div>
      </div>

      {/* ── Páginas y eventos ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

        {/* Páginas más visitadas */}
        <div>
          <h2 className="font-black text-white uppercase tracking-[0.15em] text-xs mb-5 flex items-center gap-3">
            <span>Páginas más visitadas</span>
            <span className="flex-1 border-t border-neutral-800" />
          </h2>
          <div className="space-y-3">
            {stats.paginasTop.length === 0 ? (
              <p className="text-neutral-600 text-sm">Sin datos todavía.</p>
            ) : (
              stats.paginasTop.map(({ path, views }) => (
                <div key={path}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300 font-black">{formatPage(path)}</span>
                    <span className="text-neutral-500">{views.toLocaleString("es-AR")}</span>
                  </div>
                  <div className="h-1.5 bg-neutral-800">
                    <div
                      className="h-full bg-red-600"
                      style={{ width: `${(views / maxPv) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Interacciones */}
        <div>
          <h2 className="font-black text-white uppercase tracking-[0.15em] text-xs mb-5 flex items-center gap-3">
            <span>Interacciones más frecuentes</span>
            <span className="flex-1 border-t border-neutral-800" />
          </h2>
          <div className="space-y-3">
            {stats.eventosTop.length === 0 ? (
              <p className="text-neutral-600 text-sm">Sin datos todavía.</p>
            ) : (
              stats.eventosTop.map(({ event, count }) => (
                <div key={event}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300 font-black">{formatEvent(event)}</span>
                    <span className="text-neutral-500">{count.toLocaleString("es-AR")}</span>
                  </div>
                  <div className="h-1.5 bg-neutral-800">
                    <div
                      className="h-full bg-neutral-500"
                      style={{ width: `${(count / maxEv) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Actualizar */}
      <div className="flex justify-end">
        <button
          onClick={cargarStats}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
        >
          <RefreshCw size={12} />
          Actualizar datos
        </button>
      </div>

    </div>
  );
}
