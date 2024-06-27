import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { type WatchlistMovie } from "../types";
import { APPLICATION_BASE_URL, LABELS } from "../constants";
import { WatchlistInfo } from "../_components/watchlist/watchlist-info";

export default async function Watchlist() {
  const session = await getServerAuthSession();
  if (!session?.user) redirect("/login");

  const response = await fetch(
    `${APPLICATION_BASE_URL}/api/watchlist?userId=${session?.user?.id}`,
  );

  const watchlistMovies = (await response.json()) as WatchlistMovie[];

  return (
    <div className="flex w-full flex-col px-20">
      <div className="my-10 flex items-center justify-center">
        <h1 className="text-5xl font-bold">{LABELS.WATCHLIST}</h1>
      </div>
      <WatchlistInfo
        watchlistMovies={watchlistMovies}
        userId={session?.user?.id}
      />
    </div>
  );
}
