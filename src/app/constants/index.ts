export const TMDB_IMAGE_BASE_URL =
  "http://image.tmdb.org/t/p/w600_and_h900_bestv2";
export const APPLICATION_BASE_URL = "http://localhost:3000";

export const MAX_SEARCH_STRING_LENGTH = 40;

export const LABELS = {
  HOME: "Home",
  WATCHLIST: "Watchlist",
  SUMMARY: "Summary",
  APP_TITLE: "Movie App",
  MOVIE_CAST: "Cast",
} as const;

export const DISPLAY_STRINGS = {
  APP_DESCRIPTION: "A movie search app with user's watchlist",
  SEARCH_BAR_PLACEHOLDER: "Type to search...",
  ADD_TO_WATCHLIST: "Add to Watchlist",
  REMOVE_FROM_LIST: "Remove from Watchlist",
} as const;
