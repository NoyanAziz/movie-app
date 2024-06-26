export interface Movie {
  id: number;
  title: string;
  release_year: string;
  poster_path: string;
}

interface Genre {
  id: number;
  name: string;
}

export interface MovieCast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  runtime: number;
  overview: string;
  vote_average: number;
  genres: Genre[];
  isFavorite: boolean;
  credits: {
    cast: MovieCast[];
  };
}

export interface SearchParams {
  query?: string;
  page?: number;
}

export interface WatchlistMovie {
  movieId: string;
  title: string;
  poster_path: string;
  release_year: string;
  userId: string;
}
