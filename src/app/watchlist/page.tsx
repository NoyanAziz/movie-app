import { MovieCard } from "../_components/movies/movie-card";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { type WatchlistMovie } from "../types";
import { APPLICATION_BASE_URL } from "../constants";

export default async function Watchlist() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/login");

  const response = await fetch(
    `${APPLICATION_BASE_URL}/api/watchlist?userId=${session?.user?.id}`,
  );

  const watchlistMovies = (await response.json()) as WatchlistMovie[];
  console.log(watchlistMovies);

  return (
    <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {watchlistMovies?.map((movie) => (
        <MovieCard
          key={movie?.movieId}
          movie={{ ...movie, id: parseInt(movie?.movieId) }}
        />
      ))}
    </div>
  );
}
