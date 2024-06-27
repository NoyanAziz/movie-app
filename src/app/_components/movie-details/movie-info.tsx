"use client";

import {
  BookmarkIcon,
  BookmarkSlashIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { Button, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { type MovieDetail } from "~/app/types";

export const MovieInfo = ({
  movieDetail,
  userId,
}: {
  movieDetail: MovieDetail;
  userId: string;
}) => {
  const [isFavorite, setIsFavorite] = useState(movieDetail?.isFavorite);

  const {
    id,
    title,
    poster_path,
    release_date,
    runtime,
    overview,
    vote_average,
    genres,
  } = movieDetail;

  const addToWatchlist = async () => {
    if (isFavorite) {
      const response = await fetch(
        `/api/watchlist?userId=${userId}&movieId=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        setIsFavorite(false);
      }
    } else {
      const response = await fetch(`/api/watchlist?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: id.toString(),
          title,
          poster_path,
          release_year:
            (release_date && new Date(release_date).getFullYear().toString()) ||
            "",
        }),
      });

      if (response.ok) {
        setIsFavorite(true);
      }
    }
  };

  return (
    <div className="mx-5 my-5 flex flex-row">
      <div className="overflow-hidden rounded-xl">
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
            <PhotoIcon className="h-24 w-24 text-slate-200" />
          </div>
        )}
      </div>
      <div className="mx-10 flex flex-col gap-y-5">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        {movieDetail?.id && (
          <Tooltip
            content="Add to watchlist"
            className="bg-slate-800 text-slate-200"
          >
            <Button
              isIconOnly
              className="rounded-full bg-slate-800"
              onClick={() => addToWatchlist()}
            >
              {isFavorite ? (
                <BookmarkSlashIcon className="h-5 w-5 cursor-pointer text-slate-500" />
              ) : (
                <BookmarkIcon className="h-5 w-5 cursor-pointer text-slate-500" />
              )}
            </Button>
          </Tooltip>
        )}
        <div className="flex flex-col">
          <p className="text-lg font-bold">Plot Summary</p>
          <p className="text-slate-300">{overview}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold">Release Year</p>
          <p className="text-slate-300">
            {release_date && new Date(release_date).getFullYear()}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold">Genres</p>
          <p className="text-slate-300">
            {genres?.map((genre) => genre.name).join(", ")}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold">Rating</p>
          <p className="text-slate-300">{vote_average}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold">Runtime</p>
          <p className="text-slate-300">{runtime} minutes</p>
        </div>
      </div>
    </div>
  );
};
