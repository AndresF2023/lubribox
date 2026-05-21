import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Clock, DollarSign, Wrench, Star, ChevronRight, Shield, Zap } from "lucide-react";

const ventajas = [
  {
    icon: DollarSign,
    titulo: "Precios Transparentes",
    desc: "Sabés cuánto vas a pagar antes de venir. Sin sorpresas ni cargos ocultos.",
  },
  {
    icon: Clock,
    titulo: "Turnos Online",
    desc: "Reservá tu turno en minutos desde la web. Sin llamadas ni esperas.",
  },
  {
    icon: Wrench,
    titulo: "Técnicos Certificados",
    desc: "Personal capacitado en todas las marcas y modelos del mercado.",
  },
  {
    icon: Shield,
    titulo: "Productos de Calidad",
    desc: "Usamos aceites y repuestos de primeras marcas para proteger tu motor.",
  },
];

const serviciosDestacados = [
  { nombre: "Cambio de Aceite Mineral", desde: 14900 },
  { nombre: "Cambio de Aceite Semisintético", desde: 19600 },
  { nombre: "Cambio de Aceite Sintético", desde: 26700 },
  { nombre: "Cambio de Pastillas de Freno", desde: 18000 },
  { nombre: "Alineación y Balanceo", desde: 16000 },
  { nombre: "Filtros de Aire y Combustible", desde: 4500 },
];

const testimonios = [
  { nombre: "Martín G.", texto: "Excelente atención. Vine para el cambio de aceite y me explicaron todo antes de arrancar. Muy confiable.", stars: 5 },
  { nombre: "Sofía R.", texto: "Por fin un lubricentro donde podés ver el precio antes de ir. Muy cómodo sacar turno por la web.", stars: 5 },
  { nombre: "Carlos P.", texto: "Rápido, prolijo y sin vueltas. Mi Ranger quedó impecable. Ya tengo el próximo turno sacado.", stars: 5 },
];

const marcas = ["Toyota", "Ford", "Volkswagen", "Chevrolet", "Renault", "Peugeot", "Fiat", "Citroën", "Audi", "BMW", "Chery", "Dodge", "Honda", "Hyundai", "Jeep", "Mercedes Benz", "Nissan"];

function formatPrecio(n: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">

        {/* ─── HERO ─── */}
        <section className="relative bg-neutral-950 text-white overflow-hidden min-h-[580px] flex items-center">
          {/* Diagonal slash elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="slash-red-wide" />
            <div className="slash-red" />
            {/* Right side dark red glow */}
            <div
              className="absolute top-0 right-0 h-full w-2/5 opacity-20"
              style={{ background: "linear-gradient(135deg, transparent 0%, #7f1d1d 100%)" }}
            />
            {/* Subtle diagonal line pattern */}
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

          <div className="relative max-w-6xl mx-auto px-4 py-28 md:py-40 z-10">
            <div className="max-w-2xl">
              <span className="inline-block bg-red-600 text-white text-xs font-black px-4 py-1.5 uppercase tracking-[0.2em] mb-5">
                Car Service Profesional
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-none mb-3 uppercase tracking-tight">
                Si cuidás tu auto,<br />
                <span className="text-red-500">tu auto te cuida a vos</span>
              </h1>
              <div className="w-16 h-1 bg-red-600 mb-6" />
              <p className="text-neutral-400 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
                Seleccioná tu vehículo, consultá el precio del service al instante y sacá tu turno en minutos. Simple, transparente y profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/servicios"
                  className="bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 uppercase tracking-widest text-sm text-center transition-colors"
                >
                  Ver precios de service
                </Link>
                <Link
                  href="/turnos"
                  className="bg-transparent hover:bg-white/5 text-white font-black px-8 py-4 uppercase tracking-widest text-sm text-center transition-colors border border-neutral-600 hover:border-red-600"
                >
                  Sacar turno
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STRIP DE MARCAS ─── */}
        <section className="bg-red-600 py-3 overflow-hidden">
          <div className="flex items-center gap-8 justify-center flex-wrap px-4">
            {marcas.map((m) => (
              <span key={m} className="text-white font-black text-sm uppercase tracking-widest opacity-90 whitespace-nowrap">
                {m}
              </span>
            ))}
          </div>
        </section>

        {/* ─── VENTAJAS ─── */}
        <section className="py-20 bg-neutral-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-12">
              <span className="text-red-500 text-xs font-black uppercase tracking-[0.2em]">Por qué elegirnos</span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase mt-2">
                La diferencia <span className="text-red-500">LubriBox</span>
              </h2>
              <div className="w-12 h-1 bg-red-600 mt-3" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ventajas.map(({ icon: Icon, titulo, desc }) => (
                <div
                  key={titulo}
                  className="bg-neutral-800 border border-neutral-700 hover:border-red-600 p-6 transition-colors group"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 mb-5 group-hover:bg-red-700 transition-colors">
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-black text-white uppercase text-sm tracking-wide mb-2">{titulo}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SERVICIOS DESTACADOS ─── */}
        <section className="py-20 bg-neutral-950">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-red-500 text-xs font-black uppercase tracking-[0.2em]">Nuestros servicios</span>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase mt-2">
                  Servicios más <span className="text-red-500">solicitados</span>
                </h2>
                <div className="w-12 h-1 bg-red-600 mt-3" />
                <p className="text-neutral-500 text-sm mt-3">Precios base. El precio final depende del modelo y litros de aceite.</p>
              </div>
              <Link
                href="/servicios"
                className="flex items-center gap-1 text-red-500 font-black hover:text-red-400 transition-colors text-sm uppercase tracking-widest whitespace-nowrap"
              >
                Ver todos <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {serviciosDestacados.map(({ nombre, desde }) => (
                <div
                  key={nombre}
                  className="bg-neutral-800 border-l-4 border-l-red-600 border border-neutral-700 hover:border-neutral-600 p-5 flex items-center justify-between transition-colors group"
                >
                  <span className="font-bold text-neutral-200 text-sm group-hover:text-white transition-colors">{nombre}</span>
                  <div className="text-right shrink-0 ml-4">
                    <span className="text-xs text-neutral-500 block uppercase tracking-widest">desde</span>
                    <span className="text-red-500 font-black text-xl">{formatPrecio(desde)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/servicios"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-black px-10 py-4 uppercase tracking-widest text-sm transition-colors"
              >
                Calculá el precio para tu auto
              </Link>
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIOS ─── */}
        <section className="py-20 bg-neutral-900 relative overflow-hidden">
          {/* Subtle diagonal accent */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="slash-red" style={{ right: "15%" }} />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 z-10">
            <div className="text-center mb-12">
              <span className="text-red-500 text-xs font-black uppercase tracking-[0.2em]">Testimonios</span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase mt-2">
                Lo que dicen <span className="text-red-500">nuestros clientes</span>
              </h2>
              <div className="w-12 h-1 bg-red-600 mt-3 mx-auto" />
              <p className="text-neutral-500 mt-4 text-sm">Más de 500 clientes satisfechos nos avalan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonios.map(({ nombre, texto, stars }) => (
                <div key={nombre} className="bg-neutral-800 border border-neutral-700 p-6 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} size={14} className="text-red-500 fill-red-500" />
                    ))}
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-5">&quot;{texto}&quot;</p>
                  <span className="text-white font-black text-sm uppercase tracking-wide">— {nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section className="relative bg-red-700 text-white text-center overflow-hidden py-20">
          {/* Diagonal accents */}
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -55deg,
                #ffffff 0px,
                #ffffff 1px,
                transparent 1px,
                transparent 30px
              )`,
            }}
          />
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20" />
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-black/20" />
          <div className="relative max-w-2xl mx-auto px-4 z-10">
            <Zap size={36} className="text-white/60 mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              ¿Listo para cuidar tu auto?
            </h2>
            <div className="w-16 h-1 bg-white/40 mx-auto mb-6" />
            <p className="text-red-100 mb-8 text-lg">
              Sacá tu turno hoy y viví la experiencia LubriBox.
            </p>
            <Link
              href="/turnos"
              className="inline-block bg-white text-red-700 hover:bg-neutral-100 font-black px-12 py-4 uppercase tracking-widest text-sm transition-colors"
            >
              Sacar turno gratis
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
