import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

export default async function Login() {
  const session = await getServerAuthSession();
  if (session) redirect("/home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-700 text-white">
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
    </main>
    // <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    //   <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
    //     <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
    //       Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
    //     </h1>
    //     <div className="flex flex-col items-center gap-2">
    //       <div className="flex flex-col items-center justify-center gap-4">
    //         <p className="text-center text-2xl text-white">
    //           {session && <span>Logged in as {session.user?.name}</span>}
    //         </p>

    //       </div>
    //     </div>
    //     {/* <CrudShowcase /> */}
    //   </div>
    // </main>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   // const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       <p>You have no posts yet.</p>
//       <Button color="primary" size="sm" variant="flat">
//         Click me hehe
//       </Button>

//       <CreatePost />
//     </div>
//   );
// }
