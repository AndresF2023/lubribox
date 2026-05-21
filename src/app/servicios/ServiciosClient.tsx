"use client";

import { useState } from "react";
import Link from "next/link";
import { autos } from "@/data/autos";
import { Servicio, Categoria, TipoVehiculo, calcularPrecio, formatearPrecio, getPrecioPorLitro } from "@/data/servicios";
import { Clock, CheckCircle, ChevronDown, Zap, Truck, Car } from "lucide-react";

const selectClass =
  "w-full appearance-none bg-neutral-800 border border-neutral-600 text-white rounded-none px-4 py-3 pr-10 text-sm focus:outline-none focus:border-red-500 disabled:opacity-40 disabled:cursor-not-allowed";

export default function ServiciosClient({ servicios, categorias }: { servicios: Servicio[]; categorias: Categoria[] }) {
  const [marca, setMarca] = useState("");
  const [modeloNombre, setModeloNombre] = useState("");
  const [año, setAño] = useState("");
  const [categoria, setCategoria] = useState<string>("todos");

  const categoriasMap = Object.fromEntries(categorias.map((c) => [c.id, c.nombre]));
  const [expandido, setExpandido] = useState<string | null>(null);
  const [tipoVehiculo, setTipoVehiculo] = useState<TipoVehiculo>("auto");

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
      <div className="bg-neutral-900 border border-neutral-700 p-6 mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-6 bg-red-600" />
          <h2 className="font-black text-white uppercase tracking-wide text-base">Seleccioná tu vehículo</h2>
        </div>
        <p className="text-neutral-500 text-sm mb-5 pl-4">
          El precio del aceite varía según la capacidad del motor de tu vehículo.
        </p>

        {/* Toggle tipo de vehículo */}
        <div className="flex mb-5 border border-neutral-700 w-fit">
          <button
            onClick={() => setTipoVehiculo("auto")}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-colors ${
              tipoVehiculo === "auto" ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            <Car size={13} /> Auto
          </button>
          <button
            onClick={() => setTipoVehiculo("camioneta")}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-colors border-l border-neutral-700 ${
              tipoVehiculo === "camioneta" ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            <Truck size={13} /> Camioneta
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Marca */}
          <div>
            <label className="block text-xs font-black text-neutral-400 uppercase tracking-[0.15em] mb-1.5">
              Marca
            </label>
            <div className="relative">
              <select value={marca} onChange={(e) => handleMarca(e.target.value)} className={selectClass}>
                <option value="">-- Seleccioná una marca --</option>
                {autos.map((a) => (
                  <option key={a.marca} value={a.marca}>{a.marca}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-xs font-black text-neutral-400 uppercase tracking-[0.15em] mb-1.5">
              Modelo
            </label>
            <div className="relative">
              <select
                value={modeloNombre}
                onChange={(e) => handleModelo(e.target.value)}
                disabled={!marca}
                className={selectClass}
              >
                <option value="">-- Seleccioná un modelo --</option>
                {marcaData?.modelos.map((m) => (
                  <option key={m.nombre} value={m.nombre}>{m.nombre}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          {/* Año */}
          <div>
            <label className="block text-xs font-black text-neutral-400 uppercase tracking-[0.15em] mb-1.5">
              Año
            </label>
            <div className="relative">
              <select
                value={año}
                onChange={(e) => setAño(e.target.value)}
                disabled={!modeloNombre}
                className={selectClass}
              >
                <option value="">-- Seleccioná el año --</option>
                {modeloData?.años.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Info del auto seleccionado */}
        {autoSeleccionado && modeloData && (
          <div className="mt-5 flex flex-wrap gap-6 p-4 bg-neutral-800 border border-neutral-700 animate-fadeIn">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-500 uppercase text-xs tracking-widest">Motor:</span>
              <span className="font-black text-white">{modeloData.motor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-500 uppercase text-xs tracking-widest">Aceite:</span>
              <span className="font-black text-white">{modeloData.litrosAceite} litros</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-400 bg-green-900/30 px-3 py-1 border border-green-800">
              <CheckCircle size={14} />
              Precios calculados para tu {tipoVehiculo}
            </div>
          </div>
        )}

        {!autoSeleccionado && (
          <div className="mt-4 flex items-start gap-2 text-sm text-red-400 bg-red-900/20 p-3 border border-red-900">
            <Zap size={16} className="shrink-0 mt-0.5" />
            Seleccioná tu auto para ver el precio exacto. Sin selección se muestran los precios base.
          </div>
        )}
        <p className="mt-2 text-xs text-gray-400">
          Precios estimados, el valor puede cambiar de acuerdo a cada vehículo.
        </p>
      </div>

      {/* Filtro por categoría */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setCategoria("todos")}
          className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-colors ${
            categoria === "todos"
              ? "bg-red-600 text-white"
              : "bg-neutral-800 border border-neutral-700 text-neutral-400 hover:border-red-600 hover:text-white"
          }`}
        >
          Todos
        </button>
        {categorias.map(({ id, nombre }) => (
          <button
            key={id}
            onClick={() => setCategoria(id)}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-colors ${
              categoria === id
                ? "bg-red-600 text-white"
                : "bg-neutral-800 border border-neutral-700 text-neutral-400 hover:border-red-600 hover:text-white"
            }`}
          >
            {nombre}
          </button>
        ))}
      </div>

      {/* Lista de servicios */}
      <div className="space-y-3">
        {serviciosFiltrados.map((s) => {
          const precio = calcularPrecio(s, modeloData?.litrosAceite, tipoVehiculo);
          const precioPorLitroActual = getPrecioPorLitro(s, tipoVehiculo);
          const abierto = expandido === s.id;

          return (
            <div
              key={s.id}
              className="bg-neutral-900 border border-neutral-700 hover:border-neutral-600 transition-colors overflow-hidden"
            >
              <button
                onClick={() => setExpandido(abierto ? null : s.id)}
                className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-black text-white text-sm sm:text-base uppercase tracking-wide">{s.nombre}</span>
                    <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 uppercase tracking-widest border border-red-900/50 whitespace-nowrap">
                      {categoriasMap[s.categoria] ?? s.categoria}
                    </span>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed hidden sm:block">{s.descripcion}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl sm:text-2xl font-black text-red-500">{formatearPrecio(precio)}</div>
                  {autoSeleccionado && precioPorLitroActual && (
                    <div className="text-xs text-neutral-500 hidden sm:block">
                      base + {modeloData?.litrosAceite}L × {formatearPrecio(precioPorLitroActual)}
                    </div>
                  )}
                  <div className="flex items-center justify-end gap-1 text-xs text-neutral-500 mt-1">
                    <Clock size={11} />
                    {s.duracionMin < 60
                      ? `${s.duracionMin} min`
                      : `${Math.floor(s.duracionMin / 60)}h ${s.duracionMin % 60 > 0 ? `${s.duracionMin % 60}min` : ""}`}
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-neutral-500 shrink-0 transition-transform ${abierto ? "rotate-180" : ""}`}
                />
              </button>

              {abierto && (
                <div className="px-4 sm:px-6 pb-6 pt-0 border-t border-neutral-800 animate-fadeIn">
                  <p className="text-neutral-500 text-sm leading-relaxed mt-4 mb-3 sm:hidden">{s.descripcion}</p>
                  <h4 className="text-xs font-black text-neutral-400 uppercase tracking-[0.15em] mb-3 mt-4 sm:mt-4">¿Qué incluye?</h4>
                  <ul className="space-y-2">
                    {s.incluye.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-neutral-400">
                        <CheckCircle size={14} className="text-red-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <Link
                      href={`/turnos?servicio=${s.id}${marca ? `&marca=${marca}` : ""}${modeloNombre ? `&modelo=${modeloNombre}` : ""}${año ? `&año=${año}` : ""}`}
                      className="inline-block bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 uppercase tracking-widest text-xs transition-colors"
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
