"use client";

import { PhotoIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { type MovieCast } from "~/app/types";

export const MovieCastCard = ({ cast }: { cast: MovieCast }) => {
  return (
    <Card
      className="h-[350px] w-[200px] bg-slate-500"
      shadow="sm"
      key={cast?.id}
      isPressable
    >
      <CardBody className="overflow-hidden p-0">
        {cast?.profile_path ? (
          <Image
            loader={() => TMDB_IMAGE_BASE_URL + cast?.profile_path}
            width={200}
            height={200}
            src={TMDB_IMAGE_BASE_URL + cast?.profile_path}
            alt={cast?.name}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200">
            <PhotoIcon className="h-24 w-24" />
          </div>
        )}
      </CardBody>
      <CardFooter className="flex-col items-start text-small">
        <div className="flex">
          <p className="... line-clamp-2 overflow-hidden text-ellipsis text-left text-slate-300">
            <b>{cast?.name}</b>
          </p>
        </div>
        <div className="flex text-slate-300">
          <p className="line-clamp-2 overflow-hidden text-ellipsis text-left text-slate-300">
            {cast?.character}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
