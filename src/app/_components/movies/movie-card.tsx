"use client";

import { Card, CardBody, CardFooter, Tooltip } from "@nextui-org/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { type Movie } from "~/app/types";
import Image from "next/image";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link key={movie?.id} href={`/api/movies/${movie.id}`}>
      <Card
        className="h-[400px] w-[250px] bg-slate-500"
        shadow="sm"
        key={movie.id}
        isPressable
        onPress={() => console.log("item pressed")}
      >
        <CardBody className="overflow-hidden p-0">
          {movie?.poster_path ? (
            <Image
              loader={() => TMDB_IMAGE_BASE_URL + movie?.poster_path}
              alt={movie?.title}
              width={300}
              height={300}
              className=""
              src={TMDB_IMAGE_BASE_URL + movie?.poster_path}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200">
              <PhotoIcon className="h-24 w-24" />
            </div>
          )}
        </CardBody>
        <CardFooter className="flex-col items-start text-small">
          <div className="flex">
            <Tooltip color="primary" content={movie.title}>
              <p className="... line-clamp-2 overflow-hidden text-ellipsis text-left">
                <b>{movie.title}</b>
              </p>
            </Tooltip>
          </div>
          <div className="flex">
            <p>Year:</p>
            &nbsp;
            <p className="line-clamp-2 overflow-hidden text-ellipsis text-left">
              {new Date(movie.release_date).getFullYear()}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
