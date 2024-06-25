import { type Movie } from "~/app/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Batman";
  console.log(process.env.TMDB_ACCESS_TOKEN);
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${"inside out"}&include_adult=false&language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      },
    );
    const data = (await response.json()) as { results: Movie[] };
    console.log(data);
    return new Response(JSON.stringify(data.results), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
