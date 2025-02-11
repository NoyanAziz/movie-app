import { getServerAuthSession } from "~/server/auth";
import { type SearchParams, type Movie } from "~/app/types";
import { MovieCard } from "../_components/movies/movie-card";
import { redirect } from "next/navigation";
import { APPLICATION_BASE_URL, MAX_SEARCH_STRING_LENGTH } from "../constants";
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
    const queryParam = query.substring(0, MAX_SEARCH_STRING_LENGTH);
    const response = await fetch(
      `${APPLICATION_BASE_URL}/api/movies?query=${queryParam}`,
    );
    if (response.ok) {
      movies = (await response.json()) as Movie[];
    }
  }

  return (
    <div className="flex w-full flex-col px-20">
      <div className="w-full">
        <SearchBar />
      </div>
      <div className="flex grid grid-cols-1 justify-items-center gap-6 gap-y-20 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies?.map((movie) => (
          <MovieCard userId={session?.user?.id} key={movie?.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
