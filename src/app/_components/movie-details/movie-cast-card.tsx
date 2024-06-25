"use client";

import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { type MovieCast } from "~/app/types";

export const MovieCastCard = ({ cast }: { cast: MovieCast }) => {
  return (
    <div key={cast?.id}>
      <Image
        loader={() => TMDB_IMAGE_BASE_URL + cast?.profile_path}
        width={300}
        height={300}
        src={TMDB_IMAGE_BASE_URL + cast?.profile_path}
        alt={cast?.name}
      />
      <p>{cast?.name}</p>
      <p>{cast?.character}</p>
    </div>
  );
};
