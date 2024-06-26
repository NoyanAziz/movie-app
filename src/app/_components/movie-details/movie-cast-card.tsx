"use client";

import { PhotoIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardFooter, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { type MovieCast } from "~/app/types";

export const MovieCastCard = ({ cast }: { cast: MovieCast }) => {
  return (
    <Card className="w-[200px] bg-slate-100" shadow="sm" key={cast.id}>
      <CardBody className="h-[200px] overflow-hidden p-0">
        {cast?.profile_path ? (
          <Image
            loader={() =>
              TMDB_IMAGE_BASE_URL + cast?.profile_path + "?w=300&h=400"
            }
            alt={cast?.name}
            width={300}
            height={400}
            className="h-full w-full object-cover"
            src={TMDB_IMAGE_BASE_URL + cast?.profile_path}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200">
            <PhotoIcon className="h-24 w-24" />
          </div>
        )}
      </CardBody>
      <CardFooter className="h-[70px] flex-col items-start text-small">
        <Tooltip className="bg-slate-800 text-slate-200" content={cast?.name}>
          <p className="... line-clamp-1 overflow-hidden text-ellipsis text-left text-slate-800">
            <b>{cast?.name}</b>
          </p>
        </Tooltip>
        <Tooltip
          className="bg-slate-800 text-slate-200"
          content={cast?.character}
        >
          <p className="... line-clamp-1 overflow-hidden text-ellipsis text-left text-slate-800">
            {cast?.character}
          </p>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};
