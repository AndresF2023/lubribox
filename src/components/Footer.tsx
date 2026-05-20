import { MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white mt-auto border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo / descripción */}
        <div>
          <div className="mb-4">
            <Image src="/logo.png" alt="LubriBox Car Service" width={160} height={41} className="h-10 w-auto" />
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
              Emilio Petorutti 2576, Córdoba
            </li>
          </ul>
        </div>

        {/* Horarios */}
        <div>
          <h3 className="font-black text-red-500 mb-4 uppercase tracking-[0.15em] text-xs">Horarios</h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex items-center gap-3">
              <Clock size={14} className="text-red-500 shrink-0" />
              Lun–Vie: 08:30 a 19:00
            </li>
            <li className="flex items-center gap-3">
              <Clock size={14} className="text-red-500 shrink-0" />
              Sáb: 09:00 a 14:00
            </li>
            <li className="flex items-center gap-3">
              <Clock size={14} className="text-red-500 shrink-0" />
              Dom: Cerrado
            </li>
          </ul>
        </div>
      </div>

      {/* Mapa */}
      <div className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 bg-red-600" />
            <h3 className="font-black text-white uppercase tracking-[0.15em] text-xs">Cómo llegar</h3>
          </div>
          <div className="w-full h-64 border border-neutral-700 overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=Emilio+Petorutti+2576,+C%C3%B3rdoba,+Argentina&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(0.9)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación LubriBox"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800 text-center text-neutral-600 text-xs py-4">
        © 2022 LubriBox Car Service. Todos los derechos reservados.
      </div>
    </footer>
  );
}
