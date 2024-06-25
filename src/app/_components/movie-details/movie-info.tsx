"use client";

import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { type MovieDetail } from "~/app/types";

export const MovieInfo = ({ movieDetail }: { movieDetail: MovieDetail }) => {
  const {
    title,
    poster_path,
    release_date,
    runtime,
    overview,
    vote_average,
    genres,
  } = movieDetail;

  return (
    <div className="mx-5 my-5 flex flex-row">
      <div className="mx-2 overflow-hidden rounded-xl">
        {poster_path ? (
          <Image
            loader={() => TMDB_IMAGE_BASE_URL + poster_path}
            width={900}
            height={800}
            src={TMDB_IMAGE_BASE_URL + poster_path}
            alt={title}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200">
            <PhotoIcon className="h-24 w-24" />
          </div>
        )}
      </div>
      <div className="mx-5 flex flex-col">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-slate-500">
            {release_date && new Date(release_date).getFullYear()}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold">Overview</p>
          <p className="text-slate-500">{overview}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold">Genres</p>
          <p className="text-slate-500">
            {genres?.map((genre) => genre.name).join(", ")}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold">Rating</p>
          <p className="text-slate-500">{vote_average}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold">Runtime</p>
          <p className="text-slate-500">{runtime} minutes</p>
        </div>
      </div>
    </div>
  );
};
