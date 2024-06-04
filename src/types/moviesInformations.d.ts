export interface MovieInformation {
  id: number;
  original_title: string;
  backdrop_path: string;
  original_language: string;
  release_date: string;
  runtime_minutes: number;
  genres: string;
  overview: string;
  popularity: number;
  revenue: number;
  poster_url: string;
  official_website: string;
  tagline: string;
  production_companies: string;
  origin_country: string;
  vote_average: number;
  vote_count: number;
  collection_id?: number;
  collection_name?: string;
  collection_poster_path?: string;
  collection_backdrop_path?: string;
}
