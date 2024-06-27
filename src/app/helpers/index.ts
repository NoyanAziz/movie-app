// Helpers

export const displayReleaseYear = (date: string | undefined) => {
  if (!date) return "";
  return new Date(date).getFullYear().toString();
};

export const displayRuntime = (runtime: number | undefined) => {
  if (!runtime) return "";
  return `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
}