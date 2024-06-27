"use client";

import { LABELS } from "~/app/constants";
import { MovieCastCard } from "./movie-cast-card";
import { type MovieCast } from "~/app/types";
import { Card, CardHeader } from "@nextui-org/react";

export const MovieCastInfo = ({ cast }: { cast: MovieCast[] }) => {
  return (
    <Card className="m-5 bg-gray-800">
      <CardHeader className="flex justify-center">
        <h1 className="text-3xl font-bold">{LABELS.MOVIE_CAST}</h1>
      </CardHeader>
      <div className="flex grid grid-cols-1 justify-items-center gap-6 gap-y-20 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cast?.map((cast) => <MovieCastCard key={cast?.id} cast={cast} />)}
      </div>
    </Card>
  );
};
