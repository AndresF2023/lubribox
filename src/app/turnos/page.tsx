import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TurnosClient from "./TurnosClient";
import { getServiciosStore } from "@/lib/servicios-store";

export default async function TurnosPage() {
  const servicios = await getServiciosStore();
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
            <span className="text-red-500 text-xs font-black uppercase tracking-[0.2em] block mb-2">Reservas</span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-3">
              Sacar <span className="text-red-500">Turno</span>
            </h1>
            <div className="w-12 h-1 bg-red-600 mb-4" />
            <p className="text-neutral-400 max-w-lg">
              Elegí el día y horario que mejor te quede. Te confirmamos por WhatsApp o email.
            </p>
          </div>
        </div>
        <TurnosClient servicios={servicios} />
      </main>
      <Footer />
    </>
  );
}
