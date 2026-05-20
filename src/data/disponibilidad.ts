// Horarios disponibles — Lun-Vie 8:30 a 19:00 / Sáb 9:00 a 14:00
export const HORARIOS = ["08:30", "09:30", "10:30", "11:30", "12:30", "14:00", "15:00", "16:00", "17:00", "18:00"];
export const HORARIOS_SABADO = ["09:00", "10:00", "11:00", "12:00", "13:00"];

// Slots ocupados (simulados)
const OCUPADOS: Record<string, string[]> = {
  1: ["09:30", "11:30", "15:00"], // lunes
  2: ["08:30", "10:30", "14:00", "17:00"], // martes
  3: ["09:30", "12:30"], // miércoles
  4: ["10:30", "11:30", "15:00", "16:00"], // jueves
  5: ["08:30", "09:30", "14:00"], // viernes
  6: ["10:00", "11:00"], // sábado
};

export function getProximosDias(cantidad = 7): Date[] {
  const dias: Date[] = [];
  const hoy = new Date();
  let offset = 1;
  while (dias.length < cantidad) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() + offset);
    const dow = d.getDay();
    if (dow !== 0) dias.push(d); // sin domingos
    offset++;
  }
  return dias;
}

export function getHorariosDisponibles(fecha: Date): string[] {
  const dow = fecha.getDay(); // 0=Dom ... 6=Sáb
  const ocupados = OCUPADOS[dow] ?? [];
  // sábado: horarios especiales hasta las 14:00
  const horariosDelDia = dow === 6 ? HORARIOS_SABADO : HORARIOS;
  return horariosDelDia.filter((h) => !ocupados.includes(h));
}

export function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
