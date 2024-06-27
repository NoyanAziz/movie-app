"use client";

import { PhotoIcon } from "@heroicons/react/24/outline";
import { Card, CardFooter, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { type MovieCast } from "~/app/types";

export const MovieCastCard = ({ cast }: { cast: MovieCast }) => {
  return (
    <Card
      isFooterBlurred
      className="flex w-[200px] items-center justify-center bg-gray-500"
      shadow="lg"
      key={cast?.id}
      isPressable
    >
      <div className="h-[300px] content-center overflow-hidden p-0">
        {cast?.profile_path ? (
          <Image
            loader={() => TMDB_IMAGE_BASE_URL + cast?.profile_path + "?w=300"}
            alt={cast?.name}
            width={200}
            height={400}
            className="z-0 object-cover"
            src={TMDB_IMAGE_BASE_URL + cast?.profile_path}
          />
        ) : (
          <div className="mb-[50px]">
            <PhotoIcon className="z-0 h-24 w-24" />
          </div>
        )}
      </div>
      <CardFooter className="absolute bottom-0 z-10 h-[70px] flex-col items-start justify-between bg-slate-950/30 text-small">
        <Tooltip className="bg-slate-800 text-slate-200" content={cast?.name}>
          <p className="... line-clamp-1 overflow-hidden text-ellipsis text-left text-slate-100">
            <b>{cast?.name}</b>
          </p>
        </Tooltip>
        <Tooltip className="bg-slate-800 text-slate-200" content={cast?.name}>
          <p className="... dark/text-slate-100 line-clamp-1 overflow-hidden text-ellipsis text-left">
            {cast?.character}
          </p>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};
