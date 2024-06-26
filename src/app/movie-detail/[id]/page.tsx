import { redirect } from "next/navigation";
import { MovieCastCard } from "~/app/_components/movie-details/movie-cast-card";
import { MovieInfo } from "~/app/_components/movie-details/movie-info";
import { APPLICATION_BASE_URL } from "~/app/constants";
import { type MovieDetail } from "~/app/types";
import { getServerAuthSession } from "~/server/auth";

export default async function MovieDetail({
  params,
}: {
  params: { id: number };
}) {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/login");

  const userId = session?.user?.id;
  const { id } = params;

  let movieDetail = {} as MovieDetail;

  const response = await fetch(
    `${APPLICATION_BASE_URL}/api/movie-details?movieId=${id}&userId=${userId}`,
  );

  if (response.ok) {
    movieDetail = (await response.json()) as MovieDetail;
  }

  return (
    <div className="flex flex-col">
      <MovieInfo movieDetail={movieDetail} userId={userId} />
      <div className="bg-slate-100">
        <h1 className="mx-5 my-2 flex items-center justify-center text-3xl font-bold text-slate-800">
          Movie Cast
        </h1>
        <div className="flex grid grid-cols-1 justify-items-center gap-6 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movieDetail?.credits?.cast?.map((cast) => (
            <MovieCastCard key={cast?.id} cast={cast} />
          ))}
        </div>
      </div>
    </div>
  );
}
