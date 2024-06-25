"use client";

import { Card, CardBody, CardFooter, Tooltip } from "@nextui-org/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { type Movie } from "~/app/types";
import Image from "next/image";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link key={movie?.id} href={`/movie-detail/${movie.id}`}>
      <Card
        className="w-[200px] bg-slate-500"
        shadow="sm"
        key={movie.id}
        isPressable
      >
        <CardBody className="h-[300px] overflow-hidden p-0">
          {movie?.poster_path ? (
            <Image
              loader={() => TMDB_IMAGE_BASE_URL + movie?.poster_path}
              alt={movie?.title}
              width={300}
              height={400}
              className="h-full w-full object-cover"
              src={TMDB_IMAGE_BASE_URL + movie?.poster_path}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200">
              <PhotoIcon className="h-24 w-24" />
            </div>
          )}
        </CardBody>
        <CardFooter className="h-[70px] flex-col items-start text-small">
          <Tooltip
            className="bg-slate-800 text-slate-200"
            content={movie.title}
          >
            <p className="... line-clamp-1 overflow-hidden text-ellipsis text-left text-slate-300">
              <b>{movie.title}</b>
            </p>
          </Tooltip>
          <p className="text-left text-slate-300">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};
