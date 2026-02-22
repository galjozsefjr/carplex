import { SearchLayout } from '@/components/search/search-layout';
import { SearchPage } from '@/components/search/search-page';

export default function Home() {
  return (
    <SearchLayout>
      <SearchPage />
    </SearchLayout>
  );
}
