import { type MovieDetail } from "~/app/types";
import { db } from "~/server/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("movieId");
  const userId = searchParams.get("userId");

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      },
    );
    const data = (await response.json()) as MovieDetail;

    const isFavorite = await db.watchlistMovie.findUnique({
      where: {
        userId_movieId: {
          userId: userId!,
          movieId: movieId!,
        },
      },
    });

    return new Response(JSON.stringify({ ...data, isFavorite }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
  }
}
