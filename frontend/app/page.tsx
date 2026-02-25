import { MovieListContainer } from '@/components/movie/MovieListContainer';
import { SearchLayout } from '@/components/search/SearchLayout';
import { SearchPage } from '@/components/search/SearchPage';

type HomeProps = Readonly<{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>;

export default async function Home({ searchParams }: HomeProps) {
  const { page: pageParam } = await searchParams;
  let page = 1;
  if (pageParam && typeof pageParam === 'string') {
    page = parseInt(pageParam, 10) || 1;
  }
  return (
    <>
      <SearchLayout>
        <SearchPage />
      </SearchLayout>
      <MovieListContainer page={page} />
    </>
  );
}
