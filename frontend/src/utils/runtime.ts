export const formatRuntime = (runtime: number | null): string => {
  if (!runtime) {
    return '';
  }
  const runtimeMins = runtime % 60;
  const runtimeHours = Math.round((runtime - runtimeMins) / 60);
  return `${runtimeHours}h ${runtimeMins}min`;
};
