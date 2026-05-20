import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getPrecios } from "@/lib/precios";
import { servicios } from "@/data/servicios";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin");

  const precios = await getPrecios();

  return <DashboardClient servicios={servicios} preciosIniciales={precios} />;
}
