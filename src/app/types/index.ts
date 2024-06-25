export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export interface SearchParams {
  query?: string;
  page?: number;
}
