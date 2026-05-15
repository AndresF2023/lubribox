"use client";

import { useState } from "react";
import Link from "next/link";
import { autos } from "@/data/autos";
import { servicios, calcularPrecio, formatearPrecio } from "@/data/servicios";
import { Clock, CheckCircle, ChevronDown, Info } from "lucide-react";

type Categoria = "todos" | "mantenimiento" | "frenos" | "suspension" | "otros";

const categorias: { id: Categoria; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "mantenimiento", label: "Mantenimiento" },
  { id: "frenos", label: "Frenos" },
  { id: "suspension", label: "Suspensión" },
  { id: "otros", label: "Otros" },
];

export default function ServiciosClient() {
  const [marca, setMarca] = useState("");
  const [modeloNombre, setModeloNombre] = useState("");
  const [año, setAño] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("todos");
  const [expandido, setExpandido] = useState<string | null>(null);

  const marcaData = autos.find((a) => a.marca === marca);
  const modeloData = marcaData?.modelos.find((m) => m.nombre === modeloNombre);
  const autoSeleccionado = marca && modeloNombre && año;

  const serviciosFiltrados =
    categoria === "todos" ? servicios : servicios.filter((s) => s.categoria === categoria);

  function handleMarca(val: string) {
    setMarca(val);
    setModeloNombre("");
    setAño("");
  }

  function handleModelo(val: string) {
    setModeloNombre(val);
    setAño("");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Selector de auto */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="font-black text-lg text-black mb-1">Seleccioná tu vehículo</h2>
        <p className="text-gray-500 text-sm mb-5">
          El precio del aceite varía según la capacidad del motor de tu vehículo.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Marca */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
              Marca
            </label>
            <div className="relative">
              <select
                value={marca}
                onChange={(e) => handleMarca(e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
              >
                <option value="">-- Seleccioná una marca --</option>
                {autos.map((a) => (
                  <option key={a.marca} value={a.marca}>
                    {a.marca}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
              Modelo
            </label>
            <div className="relative">
              <select
                value={modeloNombre}
                onChange={(e) => handleModelo(e.target.value)}
                disabled={!marca}
                className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="">-- Seleccioná un modelo --</option>
                {marcaData?.modelos.map((m) => (
                  <option key={m.nombre} value={m.nombre}>
                    {m.nombre}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Año */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
              Año
            </label>
            <div className="relative">
              <select
                value={año}
                onChange={(e) => setAño(e.target.value)}
                disabled={!modeloNombre}
                className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="">-- Seleccioná el año --</option>
                {modeloData?.años.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Info del auto seleccionado */}
        {autoSeleccionado && modeloData && (
          <div className="mt-5 flex flex-wrap gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Motor:</span>
              <span className="font-semibold text-black">{modeloData.motor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Capacidad de aceite:</span>
              <span className="font-semibold text-black">{modeloData.litrosAceite} litros</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle size={14} />
              Precios calculados para tu auto
            </div>
          </div>
        )}

        {!autoSeleccionado && (
          <div className="mt-4 flex items-start gap-2 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
            <Info size={16} className="shrink-0 mt-0.5" />
            Seleccioná tu auto para ver el precio exacto del service. Sin auto seleccionado se muestran los precios base.
          </div>
        )}
      </div>

      {/* Filtro por categoría */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categorias.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setCategoria(id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              categoria === id
                ? "bg-red-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Lista de servicios */}
      <div className="space-y-4">
        {serviciosFiltrados.map((s) => {
          const precio = calcularPrecio(s, modeloData?.litrosAceite);
          const abierto = expandido === s.id;

          return (
            <div
              key={s.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setExpandido(abierto ? null : s.id)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-black text-lg">{s.nombre}</span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full capitalize">
                      {s.categoria}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.descripcion}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-black text-red-600">{formatearPrecio(precio)}</div>
                  {autoSeleccionado && s.precioPorLitro && (
                    <div className="text-xs text-gray-400">
                      base + {modeloData?.litrosAceite}L × {formatearPrecio(s.precioPorLitro)}
                    </div>
                  )}
                  <div className="flex items-center justify-end gap-1 text-xs text-gray-400 mt-1">
                    <Clock size={12} />
                    {s.duracionMin < 60
                      ? `${s.duracionMin} min`
                      : `${Math.floor(s.duracionMin / 60)}h ${s.duracionMin % 60 > 0 ? `${s.duracionMin % 60}min` : ""}`}
                  </div>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-gray-400 shrink-0 transition-transform ${abierto ? "rotate-180" : ""}`}
                />
              </button>

              {abierto && (
                <div className="px-6 pb-6 pt-0 border-t border-gray-100 animate-fadeIn">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 mt-4">¿Qué incluye?</h4>
                  <ul className="space-y-2">
                    {s.incluye.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={15} className="text-red-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <Link
                      href={`/turnos?servicio=${s.id}${marca ? `&marca=${marca}` : ""}${modeloNombre ? `&modelo=${modeloNombre}` : ""}${año ? `&año=${año}` : ""}`}
                      className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg text-sm transition-colors"
                    >
                      Sacar turno para este servicio
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
