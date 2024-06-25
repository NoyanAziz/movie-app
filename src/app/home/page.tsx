import { getServerAuthSession } from "~/server/auth";
import { type Movie } from "~/app/types";
import { MovieCard } from "../_components/movies/movie-card";
import { redirect } from "next/navigation";
import { APPLICATION_BASE_URL } from "../constants";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/login");
  const response = await fetch(`${APPLICATION_BASE_URL}/api/movies`);

  let movies = [] as Movie[];

  if (response.ok) {
    movies = (await response.json()) as Movie[];
  } else {
    movies = [];
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-700 text-white">
      <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies?.map((movie) => <MovieCard key={movie?.id} movie={movie} />)}
      </div>
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
