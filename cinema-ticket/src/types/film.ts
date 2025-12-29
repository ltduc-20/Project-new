export type film = {
  film_name: string;
  director?: string;
  thumbnail_url?: string;
  trailer_url?: string;
  description?: string;
  genre_id?: number;
  rating_id?: number;
  release_date?: string;
  is_showing?: boolean;
};
export type FilmList = {
 id:string;
 film_name: string; 
  thumbnail_url?: string;
  mst_film_genres?: { genre_name?: string};
  mst_film_ratings?: {
    rating_name?: string;
  };
  release_date?: string;
};