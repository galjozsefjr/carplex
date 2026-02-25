import { type FC, useCallback, useEffect, useState } from 'react';
import { useAddMovie } from '@/hooks/useAddMovie';
import { useEditMovie } from '@/hooks/useEditMovie';
import type { CreateMovie, Movie } from '@/types/Movie';
import { formatDate } from '@/utils/date';
import type { MovieEditorStatus } from './MovieEditorForm';
import { MovieEditorModal } from './MovieEditorModal';

type MovieEditorProps = Readonly<{
  movie: Movie | null | false;
  onClose: () => void;
}>;

export const MovieEditor: FC<MovieEditorProps> = ({ movie, onClose }) => {
  const isOpen = movie !== false;
  const selectedMovie = isOpen ? movie : null;

  const { trigger: triggerEditMovie } = useEditMovie(selectedMovie?.id ?? null);
  const { trigger: triggerAddMovie } = useAddMovie();
  const [status, setStatus] = useState<MovieEditorStatus>();

  useEffect(() => {
    if (!isOpen) {
      setStatus(undefined);
    }
  }, [isOpen]);

  const editMovie = useCallback(
    async (movie: CreateMovie) => {
      try {
        const updated = await triggerEditMovie({
          ...movie,
          release_date: formatDate(movie.release_date)
        });
        setStatus('updated');
        return updated;
      } catch (error) {
        setStatus('error');
        throw error;
      }
    },
    [triggerEditMovie]
  );

  const addMovie = useCallback(
    async (movie: CreateMovie) => {
      try {
        const updated = await triggerAddMovie({
          ...movie,
          release_date: formatDate(movie.release_date)
        });
        setStatus('added');
        return updated;
      } catch (error) {
        setStatus('error');
        throw error;
      }
    },
    [triggerAddMovie]
  );

  return (
    <MovieEditorModal
      isOpen={isOpen}
      movie={movie === false ? null : movie}
      onClose={onClose}
      onSubmit={selectedMovie ? editMovie : addMovie}
      status={status}
    />
  );
};
