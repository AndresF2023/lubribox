import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getServiciosStore } from "@/lib/servicios-store";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin");

  const servicios = await getServiciosStore();

  return <DashboardClient serviciosIniciales={servicios} />;
}
