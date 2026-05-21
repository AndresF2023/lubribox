// Horarios de trabajo
const INICIO_LV = "08:30";
const PAUSA_INICIO = "13:00"; // almuerzo
const PAUSA_FIN = "14:00";
const FIN_LV = "19:00";
const INICIO_SAB = "09:00";
const FIN_SAB = "14:00"; // sábados sin pausa (día corto)

function minutosDeHora(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function horaDeMinutos(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Genera slots de `duracionMin` minutos dentro del rango dado
function generarSlots(inicioStr: string, finStr: string, duracionMin: number): string[] {
  const slots: string[] = [];
  let cursor = minutosDeHora(inicioStr);
  const fin = minutosDeHora(finStr);
  while (cursor + duracionMin <= fin) {
    slots.push(horaDeMinutos(cursor));
    cursor += duracionMin;
  }
  return slots;
}

// Devuelve los próximos N días hábiles (sin domingos), comenzando mañana
export function getProximosDias(cantidad = 14): Date[] {
  const dias: Date[] = [];
  const hoy = new Date();
  let offset = 1;
  while (dias.length < cantidad) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() + offset);
    if (d.getDay() !== 0) dias.push(d); // sin domingos
    offset++;
  }
  return dias;
}

/**
 * Devuelve los horarios disponibles para una fecha dada.
 * Los slots se calculan según la duración del servicio seleccionado.
 * El local puede atender hasta 3 trabajos del mismo tipo a la vez,
 * por lo que todos los slots generados se muestran como disponibles.
 */
export function getHorariosDisponibles(fecha: Date, duracionMin = 60): string[] {
  const dow = fecha.getDay();
  if (dow === 0) return []; // domingos: cerrado
  if (dow === 6) {
    // Sábados: 09:00 a 14:00, sin pausa
    return generarSlots(INICIO_SAB, FIN_SAB, duracionMin);
  }
  // Lunes a viernes: mañana + pausa almuerzo + tarde
  const manana = generarSlots(INICIO_LV, PAUSA_INICIO, duracionMin);
  const tarde = generarSlots(PAUSA_FIN, FIN_LV, duracionMin);
  return [...manana, ...tarde];
}

export function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
