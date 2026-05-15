import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo / descripción */}
        <div>
          <div className="flex items-center gap-2 font-bold text-xl mb-3">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded font-black">LUBRI</span>
            <span>BOX</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Tu lubricentro de confianza. Servicio profesional, precios claros y atención personalizada.
          </p>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="font-semibold text-red-500 mb-3 uppercase tracking-wide text-sm">Contacto</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-red-500 shrink-0" />
              +54 11 1234-5678
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-red-500 shrink-0" />
              Av. Ejemplo 1234, Buenos Aires
            </li>
          </ul>
        </div>

        {/* Horarios */}
        <div>
          <h3 className="font-semibold text-red-500 mb-3 uppercase tracking-wide text-sm">Horarios</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Clock size={15} className="text-red-500 shrink-0" />
              Lun–Vie: 08:00 a 18:00
            </li>
            <li className="flex items-center gap-2">
              <Clock size={15} className="text-red-500 shrink-0" />
              Sáb: 08:00 a 13:00
            </li>
            <li className="flex items-center gap-2">
              <Clock size={15} className="text-red-500 shrink-0" />
              Dom: Cerrado
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-gray-600 text-xs py-4">
        © {new Date().getFullYear()} LubriBox. Todos los derechos reservados.
      </div>
    </footer>
  );
}
