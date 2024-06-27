"use client";

import { type WatchlistMovie } from "~/app/types";
import { MovieCard } from "../movies/movie-card";
import { useState } from "react";

export const WatchlistInfo = ({
  watchlistMovies,
  userId,
}: {
  watchlistMovies: WatchlistMovie[];
  userId: string;
}) => {
  const [watchlistedMovies, setWatchlistedMovies] = useState(watchlistMovies);

  const removeMovieFromWatchlist = async (movieId: number) => {
    const newWatchlistMovies = watchlistedMovies?.filter(
      (movie) => movie.movieId !== movieId.toString(),
    );
    setWatchlistedMovies(newWatchlistMovies);
  };

  return (
    <>
      {!watchlistedMovies.length ? (
        <div className="flex h-1/2 items-center ">
          <h1 className="text-2xl">
            Ooops! No movies in your watchlist. Go to Home page to add movies
          </h1>
        </div>
      ) : (
        <div className="flex grid grid-cols-1 justify-items-center gap-6 gap-y-20 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {watchlistedMovies?.map((movie) => (
            <MovieCard
              isWatchlist
              removeMovieFromWatchlist={removeMovieFromWatchlist}
              userId={userId}
              key={movie?.movieId}
              movie={{
                ...movie,
                release_date: movie?.release_year,
                id: parseInt(movie?.movieId),
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};
