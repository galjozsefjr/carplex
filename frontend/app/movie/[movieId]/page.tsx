import { MoviePage } from '@/components/movie/MoviePage';

export default async function ServerMoviePage({ params }: PageProps<'/movie/[movieId]'>) {
  const { movieId } = await params;
  return <MoviePage movieId={movieId} />;
}
