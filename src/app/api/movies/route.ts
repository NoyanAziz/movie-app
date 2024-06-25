import { type Movie } from "~/app/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") ?? 1;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      },
    );
    const data = (await response.json()) as { results: Movie[] };
    return new Response(JSON.stringify(data.results), { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
