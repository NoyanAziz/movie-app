import { getServerAuthSession } from "~/server/auth";
import { type SearchParams, type Movie } from "~/app/types";
import { MovieCard } from "../_components/movies/movie-card";
import { redirect } from "next/navigation";
import { APPLICATION_BASE_URL } from "../constants";
import SearchBar from "../_components/movies/search-bar";

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/login");

  const query = searchParams?.query ?? "";

  let movies = [] as Movie[];
  if (query) {
    const response = await fetch(
      `${APPLICATION_BASE_URL}/api/movies?query=${query}`,
    );
    if (response.ok) {
      movies = (await response.json()) as Movie[];
    }
  }

  return (
    <>
      <div className="w-full">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies?.map((movie) => <MovieCard key={movie?.id} movie={movie} />)}
      </div>
    </>
  );
}
