import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function App() {
  const session = await getServerAuthSession();

  return !session?.user ? redirect("/login") : redirect("/home");
}
