"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes Somos" },
  { href: "/servicios", label: "Servicios y Precios" },
  { href: "/turnos", label: "Sacar Turno" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-neutral-950 text-white sticky top-0 z-50 border-b-2 border-red-600">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 font-black text-xl tracking-tight">
          <span className="bg-red-600 text-white px-2.5 py-1 font-black text-lg uppercase tracking-widest">LUBRI</span>
          <span className="bg-neutral-800 text-white px-2.5 py-1 font-black text-lg uppercase tracking-widest border-y border-r border-neutral-700">BOX</span>
          <span className="text-neutral-500 text-xs font-semibold uppercase tracking-widest ml-2 hidden sm:block">Car Service</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                pathname === href
                  ? "bg-red-600 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 hover:bg-neutral-800 transition"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-neutral-950 border-t border-neutral-800 px-4 pb-4">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-sm font-bold uppercase tracking-wide my-1 transition-colors ${
                pathname === href
                  ? "bg-red-600 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
