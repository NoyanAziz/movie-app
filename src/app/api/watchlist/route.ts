import { type WatchlistMovie } from "~/app/types";
import { db } from "~/server/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const response = await db.watchlistMovie.findMany({
      where: {
        userId: userId!,
      },
    });

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const { title, poster_path, release_year, movieId } =
    (await request.json()) as WatchlistMovie;

  try {
    const response = await db.watchlistMovie.create({
      data: {
        title,
        poster_path,
        release_year,
        movieId: movieId,
        userId: userId!,
      },
    });
    return new Response(JSON.stringify({ ...response, id: response.movieId }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const movieId = searchParams.get("movieId");

  try {
    const response = await db.watchlistMovie.delete({
      where: {
        userId_movieId: {
          userId: userId!,
          movieId: movieId!,
        },
      },
    });

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
