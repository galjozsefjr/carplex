export type Paginated<T> = {
  current_page: number;
  first_page_url: string;
  from: number;
  to: number;
  per_page: number;
  total: number;
  last_page: number;
  data: T[];

  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
};
