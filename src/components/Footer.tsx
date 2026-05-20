import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white mt-auto border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo / descripción */}
        <div>
          <div className="flex items-center gap-0 font-black text-xl mb-4">
            <span className="bg-red-600 text-white px-2.5 py-1 font-black text-base uppercase tracking-widest">LUBRI</span>
            <span className="bg-neutral-800 text-white px-2.5 py-1 font-black text-base uppercase tracking-widest border-y border-r border-neutral-700">BOX</span>
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Tu lubricentro de confianza. Servicio profesional, precios claros y atención personalizada en autos nacionales.
          </p>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="font-black text-red-500 mb-4 uppercase tracking-[0.15em] text-xs">Contacto</h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-red-500 shrink-0" />
              +54 351 205-2196
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={14} className="text-red-500 shrink-0" />
              Córdoba, Argentina
            </li>
          </ul>
        </div>

        {/* Horarios */}
        <div>
          <h3 className="font-black text-red-500 mb-4 uppercase tracking-[0.15em] text-xs">Horarios</h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex items-center gap-3">
              <Clock size={14} className="text-red-500 shrink-0" />
              Lun–Vie: 08:00 a 18:00
            </li>
            <li className="flex items-center gap-3">
              <Clock size={14} className="text-red-500 shrink-0" />
              Sáb: 08:00 a 13:00
            </li>
            <li className="flex items-center gap-3">
              <Clock size={14} className="text-red-500 shrink-0" />
              Dom: Cerrado
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800 text-center text-neutral-600 text-xs py-4">
        © {new Date().getFullYear()} LubriBox Car Service. Todos los derechos reservados.
      </div>
    </footer>
  );
}
