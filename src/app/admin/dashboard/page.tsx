import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getFullStore } from "@/lib/servicios-store";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin");

  const { servicios, categorias } = await getFullStore();

  return <DashboardClient serviciosIniciales={servicios} categoriasIniciales={categorias} />;
}
