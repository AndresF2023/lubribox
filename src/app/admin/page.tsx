import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LoginForm from "./LoginForm";

export default async function AdminPage() {
  const session = await getSession();
  if (session.isAdmin) redirect("/admin/dashboard");
  return <LoginForm />;
}
