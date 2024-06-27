import { redirect } from "next/navigation";
import { MovieCastInfo } from "~/app/_components/movie-details/movie-cast-info";
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

  if (!movieDetail?.id) {
    redirect("/");
  }

  return (
    <div className="flex flex-col">
      <MovieInfo movieDetail={movieDetail} userId={userId} />
      <MovieCastInfo cast={movieDetail?.credits?.cast || []} />
    </div>
  );
}
