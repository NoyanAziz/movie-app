import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

export default async function Login() {
  const session = await getServerAuthSession();
  if (session) redirect("/home");

  return (
    <div>
      {/* <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={100}
        height={24}
        priority
      /> */}
      <Link
        href={"/api/auth/signin"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {"Sign in"}
      </Link>
    </div>
  );
}
