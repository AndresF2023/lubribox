import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Wrench, Shield, Users, Target } from "lucide-react";

const parrafos = [
  {
    icon: Wrench,
    texto:
      "Lubribox es un lubricentro y taller mecánico dedicado a brindar soluciones integrales para vehículos de clientes, concesionarias y empresas.",
  },
  {
    icon: Shield,
    texto:
      "Nos especializamos en el mantenimiento preventivo y correctivo, trabajando con compromiso, responsabilidad y atención personalizada en cada unidad que ingresa en nuestro taller.",
  },
  {
    icon: Users,
    texto:
      "En Lubribox entendemos la importancia de que cada vehículo esté en óptimas condiciones, por eso ofrecemos servicios de calidad, diagnósticos precisos y soluciones eficientes que garantizan seguridad, rendimiento y confianza.",
  },
  {
    icon: Target,
    texto:
      "Nuestro objetivo es acompañarlos, ayudando a mantener su vehículo siempre operativo, reduciendo tiempos de inactividad y asegurando un servicio profesional adaptado a cada necesidad.",
  },
];

export default function QuienesSomosPage() {
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
            <span className="text-red-500 text-xs font-black uppercase tracking-[0.2em] block mb-2">El equipo</span>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-3">
              Quiénes <span className="text-red-500">Somos</span>
            </h1>
            <div className="w-12 h-1 bg-red-600 mb-4" />
            <p className="text-neutral-400 max-w-lg">
              Conocé nuestra historia, valores y el compromiso que ponemos en cada servicio.
            </p>
          </div>
        </div>

        {/* Contenido */}
        <section className="py-20 bg-neutral-950">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-6">
              {parrafos.map(({ icon: Icon, texto }, i) => (
                <div
                  key={i}
                  className="bg-neutral-900 border border-neutral-700 hover:border-red-600/50 p-6 sm:p-7 flex flex-col sm:flex-row gap-4 sm:gap-6 transition-colors group"
                >
                  <div className="shrink-0 w-12 h-12 bg-red-600 flex items-center justify-center group-hover:bg-red-700 transition-colors">
                    <Icon size={22} className="text-white" />
                  </div>
                  <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
