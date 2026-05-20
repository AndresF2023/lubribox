export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  duracionMin: number;
  precioBase: number;
  precioPorLitro?: number; // para aceite: precio base + litros * precio/litro
  incluye: string[];
  categoria: "mantenimiento" | "frenos" | "suspension" | "otros" | "paquetes";
}

export const servicios: Servicio[] = [
  {
    id: "service-basico",
    nombre: "Service Básico",
    descripcion: "Paquete esencial de mantenimiento para mantener tu auto en óptimas condiciones.",
    duracionMin: 45,
    precioBase: 15000,
    precioPorLitro: 1800,
    incluye: [
      "Cambio de aceite",
      "Cambio de filtro de aire",
      "Cambio de filtro de aceite",
    ],
    categoria: "paquetes",
  },
  {
    id: "service-full",
    nombre: "Service Full",
    descripcion: "Servicio completo de mantenimiento con lavado incluido. La opción más popular.",
    duracionMin: 90,
    precioBase: 28000,
    precioPorLitro: 1800,
    incluye: [
      "Cambio de aceite",
      "Cambio de filtro de aire",
      "Cambio de filtro de aceite",
      "Cambio de filtro de combustible",
      "Rotación de cubiertas",
      "Chequeo mecánico",
      "Lavado gratis",
    ],
    categoria: "paquetes",
  },
  {
    id: "service-premium-gold",
    nombre: "Service Premium Gold",
    descripcion: "El servicio más completo. Chequeo computarizado, alineado, balanceo y lavado. Máxima protección para tu vehículo.",
    duracionMin: 150,
    precioBase: 45000,
    precioPorLitro: 1800,
    incluye: [
      "Cambio de aceite",
      "Cambio de filtro de aire",
      "Cambio de filtro de aceite",
      "Cambio de filtro de combustible",
      "Rotación de cubiertas",
      "Chequeo mecánico computarizado",
      "Alineado y balanceado de cubiertas",
      "Lavado gratis",
    ],
    categoria: "paquetes",
  },
  {
    id: "cambio-aceite-mineral",
    nombre: "Cambio de Aceite Mineral",
    descripcion: "Cambio de aceite mineral con filtro incluido. Ideal para vehículos de uso urbano con más de 100.000 km.",
    duracionMin: 30,
    precioBase: 8000,
    precioPorLitro: 1800,
    incluye: ["Aceite mineral 20W-50 o 15W-40", "Filtro de aceite", "Revisión de niveles", "Informe del estado del vehículo"],
    categoria: "mantenimiento",
  },
  {
    id: "cambio-aceite-semis",
    nombre: "Cambio de Aceite Semisintético",
    descripcion: "Cambio de aceite semisintético con filtro incluido. Mejor rendimiento y mayor intervalo de cambio.",
    duracionMin: 30,
    precioBase: 10000,
    precioPorLitro: 2800,
    incluye: ["Aceite semisintético 5W-40 o 10W-40", "Filtro de aceite", "Revisión de niveles", "Informe del estado del vehículo"],
    categoria: "mantenimiento",
  },
  {
    id: "cambio-aceite-sintetico",
    nombre: "Cambio de Aceite Sintético",
    descripcion: "Cambio de aceite 100% sintético. Máxima protección del motor, mayor duración y mejor eficiencia.",
    duracionMin: 30,
    precioBase: 12000,
    precioPorLitro: 4200,
    incluye: ["Aceite sintético 5W-30 o 0W-40", "Filtro de aceite premium", "Revisión de niveles", "Informe del estado del vehículo"],
    categoria: "mantenimiento",
  },
  {
    id: "filtro-aire",
    nombre: "Cambio de Filtro de Aire",
    descripcion: "Reemplazo del filtro de aire del motor para mantener una mezcla óptima aire-combustible.",
    duracionMin: 15,
    precioBase: 4500,
    incluye: ["Filtro de aire original o compatible", "Limpieza de caja de filtro", "Revisión de mangueras de admisión"],
    categoria: "mantenimiento",
  },
  {
    id: "filtro-combustible",
    nombre: "Cambio de Filtro de Combustible",
    descripcion: "Reemplazo del filtro de combustible para proteger el sistema de inyección.",
    duracionMin: 20,
    precioBase: 5500,
    incluye: ["Filtro de combustible", "Revisión de mangueras", "Verificación de presión del sistema"],
    categoria: "mantenimiento",
  },
  {
    id: "pastillas-freno",
    nombre: "Cambio de Pastillas de Freno",
    descripcion: "Reemplazo de pastillas de freno delanteras o traseras. Presupuesto por eje.",
    duracionMin: 45,
    precioBase: 18000,
    incluye: ["Pastillas de freno (eje)", "Limpieza de pinzas", "Revisión de discos", "Prueba de frenado"],
    categoria: "frenos",
  },
  {
    id: "liquido-frenos",
    nombre: "Cambio de Líquido de Frenos",
    descripcion: "Sustitución del líquido de frenos DOT 4. Se recomienda cada 2 años o 40.000 km.",
    duracionMin: 30,
    precioBase: 6500,
    incluye: ["Líquido de frenos DOT 4", "Purga completa del circuito", "Revisión de mangueras"],
    categoria: "frenos",
  },
  {
    id: "alineacion",
    nombre: "Alineación al Frente",
    descripcion: "Alineación computarizada de las ruedas delanteras para prolongar la vida de los neumáticos.",
    duracionMin: 40,
    precioBase: 9000,
    incluye: ["Alineación computarizada", "Informe de geometría", "Revisión de gomas"],
    categoria: "suspension",
  },
  {
    id: "balanceo",
    nombre: "Balanceo de Ruedas (x4)",
    descripcion: "Balanceo de las 4 ruedas para eliminar vibraciones y desgaste irregular.",
    duracionMin: 30,
    precioBase: 7000,
    incluye: ["Balanceo dinámico x4", "Plomitos de balanceo incluidos", "Revisión de presión de gomas"],
    categoria: "suspension",
  },
  {
    id: "kit-distribucion",
    nombre: "Kit de Distribución",
    descripcion: "Cambio completo del kit de distribución. Servicio crítico según km del fabricante.",
    duracionMin: 180,
    precioBase: 55000,
    incluye: ["Correa o cadena de distribución", "Tensores y rodillos", "Bomba de agua (opcional)", "Selladores y juntas"],
    categoria: "mantenimiento",
  },
];

export function calcularPrecio(servicio: Servicio, litrosAceite?: number): number {
  if (servicio.precioPorLitro && litrosAceite) {
    return servicio.precioBase + litrosAceite * servicio.precioPorLitro;
  }
  return servicio.precioBase;
}

export function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);
}
