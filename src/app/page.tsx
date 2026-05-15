import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Clock, DollarSign, Wrench, Star, ChevronRight } from "lucide-react";

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
    icon: CheckCircle,
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

function formatPrecio(n: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-black text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                #dc2626 0px,
                #dc2626 1px,
                transparent 1px,
                transparent 40px
              )`,
            }}
          />
          <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-36">
            <div className="max-w-2xl">
              <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                Lubricentro profesional
              </span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                El service de tu auto,{" "}
                <span className="text-red-500">sin sorpresas</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                Seleccioná tu vehículo, consultá el precio del service al instante y sacá tu turno en minutos. Simple, transparente y profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/servicios"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg text-center transition-colors text-lg"
                >
                  Ver precios de service
                </Link>
                <Link
                  href="/turnos"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg text-center transition-colors border border-white/20 text-lg"
                >
                  Sacar turno
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-black mb-3">¿Por qué elegir LubriBox?</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Nos diferenciamos por la transparencia, la calidad y la comodidad para nuestros clientes.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ventajas.map(({ icon: Icon, titulo, desc }) => (
                <div key={titulo} className="border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                    <Icon size={24} className="text-red-600" />
                  </div>
                  <h3 className="font-bold text-black mb-2">{titulo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios destacados */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-black text-black mb-2">Servicios más solicitados</h2>
                <p className="text-gray-500">Precios base. El precio final depende del modelo y litros de aceite.</p>
              </div>
              <Link
                href="/servicios"
                className="flex items-center gap-1 text-red-600 font-semibold hover:text-red-700 transition-colors whitespace-nowrap"
              >
                Ver todos los servicios <ChevronRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviciosDestacados.map(({ nombre, desde }) => (
                <div
                  key={nombre}
                  className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:border-red-300 hover:shadow-md transition-all"
                >
                  <span className="font-medium text-black text-sm">{nombre}</span>
                  <div className="text-right shrink-0 ml-4">
                    <span className="text-xs text-gray-400 block">desde</span>
                    <span className="text-red-600 font-black text-lg">{formatPrecio(desde)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/servicios"
                className="inline-block bg-black hover:bg-gray-900 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Calculá el precio para tu auto
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16 bg-black text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black mb-3">Lo que dicen nuestros clientes</h2>
              <p className="text-gray-400">Más de 500 clientes satisfechos nos avalan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonios.map(({ nombre, texto, stars }) => (
                <div key={nombre} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} size={16} className="text-red-500 fill-red-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">&quot;{texto}&quot;</p>
                  <span className="text-white font-bold text-sm">— {nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 bg-red-600 text-white text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              ¿Listo para darle a tu auto el cuidado que merece?
            </h2>
            <p className="text-red-100 mb-8 text-lg">
              Sacá tu turno hoy y viví la experiencia LubriBox.
            </p>
            <Link
              href="/turnos"
              className="inline-block bg-white text-red-600 hover:bg-red-50 font-black px-10 py-4 rounded-lg text-lg transition-colors"
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
