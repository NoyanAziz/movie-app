"use client";

import {
  BookmarkIcon,
  BookmarkSlashIcon,
  PhotoIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import { Button, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DISPLAY_STRINGS, LABELS, TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { displayReleaseYear, displayRuntime } from "~/app/helpers";
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

  const handleWatchlist = async () => {
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
          release_year: displayReleaseYear(release_date),
        }),
      });

      if (response.ok) {
        setIsFavorite(true);
      }
    }
  };

  return (
    <div className="mx-5 my-5 flex flex-row">
      <div className="max-h-[450px] w-full max-w-[300px] overflow-hidden rounded-xl">
        {poster_path ? (
          <Image
            loader={() => TMDB_IMAGE_BASE_URL + poster_path + "?w=600"}
            width={300}
            height={450}
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
          <p className="text-sm text-slate-300">
            {genres?.map((genre) => genre.name).join(", ")}
          </p>
        </div>
        {movieDetail?.id && (
          <div className="flex flex-row gap-3">
            <Tooltip
              content={DISPLAY_STRINGS.VIEW_WATCHLIST}
              className="bg-slate-800 text-slate-200"
            >
              <Button
                as={Link}
                isIconOnly
                className="rounded-full bg-slate-800"
                href="/watchlist"
              >
                <QueueListIcon className="h-5 w-5 cursor-pointer text-slate-400" />
              </Button>
            </Tooltip>

            <Tooltip
              content={
                isFavorite
                  ? DISPLAY_STRINGS.REMOVE_FROM_LIST
                  : DISPLAY_STRINGS.ADD_TO_WATCHLIST
              }
              className="bg-slate-800 text-slate-200"
            >
              <Button
                isIconOnly
                className="rounded-full bg-slate-800"
                onClick={() => handleWatchlist()}
              >
                {isFavorite ? (
                  <BookmarkSlashIcon className="h-5 w-5 cursor-pointer text-slate-400" />
                ) : (
                  <BookmarkIcon className="h-5 w-5 cursor-pointer text-slate-400" />
                )}
              </Button>
            </Tooltip>
          </div>
        )}
        <div className="flex w-[900px] flex-col">
          <p className="text-lg font-bold">{LABELS.SUMMARY}</p>
          <p className="text-slate-300">{overview}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold">{LABELS.RELEASE_YEAR}</p>
          <p className="text-slate-300">{displayReleaseYear(release_date)}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold">{LABELS.USER_RATING}</p>
          <p className="text-slate-300">{vote_average.toFixed(1)}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold">{LABELS.RUNTIME}</p>
          <p className="text-slate-300">{displayRuntime(runtime)}</p>
        </div>
      </div>
    </div>
  );
};
