"use client";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { type Movie } from "~/app/types";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link key={movie?.id} href={`/api/movies/${movie.id}`}>
      <Card
        className=" bg-slate-500"
        shadow="sm"
        key={movie.id}
        isPressable
        onPress={() => console.log("item pressed")}
      >
        <CardBody className="h-[300px] w-[200px] overflow-visible p-0">
          {movie?.poster_path ? (
            <Image
              alt=""
              className="object-cover group-hover:opacity-75"
              width={600}
              height={900}
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
            <p>Title:</p>
            &nbsp;
            <b>{movie.title}</b>
          </div>
          <div className="flex">
            <p>Year:</p>
            &nbsp;
            <p>{movie.release_date}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
