// Horarios disponibles simulados para los próximos 7 días
export const HORARIOS = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

// Slots ocupados (simulados)
const OCUPADOS: Record<string, string[]> = {
  0: ["09:00", "11:00", "15:00"], // lunes
  1: ["08:00", "10:00", "14:00", "17:00"],
  2: ["09:00", "12:00"],
  3: ["10:00", "11:00", "15:00", "16:00"],
  4: ["08:00", "09:00", "14:00"],
  5: ["10:00", "11:00"], // sábado
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
  // sábado: solo hasta las 13:00
  const horariosDelDia = dow === 6 ? HORARIOS.filter((h) => h <= "13:00") : HORARIOS;
  return horariosDelDia.filter((h) => !ocupados.includes(h));
}

export function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
