"use client";

import { Card, CardBody, CardFooter, Tooltip } from "@nextui-org/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { type Movie } from "~/app/types";
import Image from "next/image";
import { displayReleaseYear } from "~/app/helpers";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link key={movie?.id} href={`/movie-detail/${movie.id}`}>
      <Card
        isFooterBlurred
        className="flex w-[200px] items-center justify-center bg-slate-950"
        shadow="lg"
        key={movie.id}
        isPressable
      >
        <div className="h-[300px] content-center overflow-hidden p-0">
          {movie?.poster_path ? (
            <Image
              loader={() => TMDB_IMAGE_BASE_URL + movie?.poster_path + "?w=300"}
              alt={movie?.title}
              width={200}
              height={400}
              className="z-0 object-cover"
              src={TMDB_IMAGE_BASE_URL + movie?.poster_path}
            />
          ) : (
            <div className="mb-[50px]">
              <PhotoIcon className="z-0 h-24 w-24" />
            </div>
          )}
        </div>
        <CardFooter className="absolute bottom-0 z-10 h-[70px] flex-col items-start justify-between bg-slate-950/30 text-small">
          <Tooltip
            className="bg-slate-800 text-slate-200"
            content={movie.title}
          >
            <p className="... line-clamp-1 overflow-hidden text-ellipsis text-left text-slate-100">
              <b>{movie.title}</b>
            </p>
          </Tooltip>
          <p className="dark/text-slate-100 text-left">
            {displayReleaseYear(movie?.release_date)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};
