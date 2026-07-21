import { get, put } from "@vercel/blob";

const BLOB_PATH = "analytics.json";

interface DayData {
  pv: Record<string, number>; // path -> count
  ev: Record<string, number>; // event -> count
}

interface AnalyticsStore {
  days: Record<string, DayData>;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

async function getStore(): Promise<AnalyticsStore> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { days: {} };
  try {
    const result = await get(BLOB_PATH, {
      access: "private",
      useCache: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!result?.stream) return { days: {} };
    return await new Response(result.stream).json();
  } catch {
    return { days: {} };
  }
}

async function saveStore(store: AnalyticsStore): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  await put(BLOB_PATH, JSON.stringify(store), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

export async function recordPageview(path: string): Promise<void> {
  const store = await getStore();
  const day = todayStr();
  if (!store.days[day]) store.days[day] = { pv: {}, ev: {} };
  store.days[day].pv[path] = (store.days[day].pv[path] ?? 0) + 1;
  await saveStore(store);
}

export async function recordEvent(event: string): Promise<void> {
  const store = await getStore();
  const day = todayStr();
  if (!store.days[day]) store.days[day] = { pv: {}, ev: {} };
  store.days[day].ev[event] = (store.days[day].ev[event] ?? 0) + 1;
  await saveStore(store);
}

export async function getStats(numDays = 30) {
  const store = await getStore();

  const dates: string[] = [];
  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }

  let totalVisitas = 0;
  const allPv: Record<string, number> = {};
  const allEv: Record<string, number> = {};
  const visitasPorDia: { date: string; total: number }[] = [];

  for (const date of dates) {
    const day = store.days[date];
    let dayTotal = 0;
    if (day) {
      for (const [path, count] of Object.entries(day.pv)) {
        allPv[path] = (allPv[path] ?? 0) + count;
        dayTotal += count;
        totalVisitas += count;
      }
      for (const [ev, count] of Object.entries(day.ev)) {
        allEv[ev] = (allEv[ev] ?? 0) + count;
      }
    }
    visitasPorDia.push({ date, total: dayTotal });
  }

  const paginasTop = Object.entries(allPv)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([path, views]) => ({ path, views }));

  const eventosTop = Object.entries(allEv)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([event, count]) => ({ event, count }));

  return {
    totalVisitas,
    turnosConfirmados: allEv["turno_confirmado"] ?? 0,
    whatsappClicks: allEv["whatsapp_flotante_click"] ?? 0,
    visitasPorDia,
    paginasTop,
    eventosTop,
  };
}
