export const dynamic = "force-dynamic";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiciosClient from "./ServiciosClient";
import { getFullStore } from "@/lib/servicios-store";

export default async function ServiciosPage() {
  const { servicios, categorias } = await getFullStore();
  return (
    <>
      <Header />
      <main className="flex-1 bg-neutral-950">
        {/* Hero */}
        <div className="relative bg-neutral-950 text-white py-16 overflow-hidden border-b border-neutral-800">
          <div className="absolute inset-0 pointer-events-none">
            <div className="slash-red-wide" />
            <div className="slash-red" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -55deg,
                  #dc2626 0px,
                  #dc2626 1px,
                  transparent 1px,
                  transparent 35px
                )`,
              }}
            />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 z-10">
            <span className="text-red-500 text-xs font-black uppercase tracking-[0.2em] block mb-2">Catálogo</span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-3">
              Servicios y <span className="text-red-500">Precios</span>
            </h1>
            <div className="w-12 h-1 bg-red-600 mb-4" />
            <p className="text-neutral-400 max-w-lg">
              Seleccioná tu vehículo para ver el precio exacto de cada servicio.
            </p>
          </div>
        </div>
        <ServiciosClient servicios={servicios} categorias={categorias} />
      </main>
      <Footer />
    </>
  );
}
