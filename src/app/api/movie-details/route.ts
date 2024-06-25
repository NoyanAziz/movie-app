import { type MovieDetail } from "~/app/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movie_id = searchParams.get("movie_id");

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=credits&language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      },
    );
    const data = (await response.json()) as MovieDetail;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
