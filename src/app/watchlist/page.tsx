import { MovieCard } from "../_components/movies/movie-card";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { type WatchlistMovie } from "../types";
import { APPLICATION_BASE_URL, LABELS } from "../constants";

export default async function Watchlist() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/login");

  const response = await fetch(
    `${APPLICATION_BASE_URL}/api/watchlist?userId=${session?.user?.id}`,
  );

  const watchlistMovies = (await response.json()) as WatchlistMovie[];

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">{LABELS.WATCHLIST}</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {watchlistMovies?.map((movie) => (
          <MovieCard
            isWatchlist
            userId={session?.user?.id}
            key={movie?.movieId}
            movie={{
              ...movie,
              release_date: movie?.release_year,
              id: parseInt(movie?.movieId),
            }}
          />
        ))}
      </div>
    </>
  );
}
