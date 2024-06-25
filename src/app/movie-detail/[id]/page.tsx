import Image from "next/image";
import { redirect } from "next/navigation";
import { MovieCastCard } from "~/app/_components/movie-details/movie-cast-card";
import { MovieInfo } from "~/app/_components/movie-details/movie-info";
import { APPLICATION_BASE_URL, TMDB_IMAGE_BASE_URL } from "~/app/constants";
import { type MovieDetail } from "~/app/types";
import { getServerAuthSession } from "~/server/auth";

export default async function MovieDetail({
  params,
}: {
  params: { id: number };
}) {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/login");

  const { id } = params;

  let movieDetail = {} as MovieDetail;

  const response = await fetch(
    `${APPLICATION_BASE_URL}/api/movie-details?movie_id=${id}`,
  );

  if (response.ok) {
    movieDetail = (await response.json()) as MovieDetail;
  }

  return (
    <div className="flex flex-col">
      <MovieInfo movieDetail={movieDetail} />
      <div className="flex flex-shrink-0 flex-row ">
        {movieDetail?.credits?.cast?.map((cast) => (
          <MovieCastCard key={cast?.id} cast={cast} />
        ))}
      </div>
    </div>
  );
}
