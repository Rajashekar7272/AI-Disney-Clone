export type Movie = {
    certification: string;
    id: number;                     // Unique movie ID
    title: string;                  // Movie title
    original_title: string;         // Original title of the movie
    overview: string;               // Short description of the movie
    release_date: string;           // Release date (format: YYYY-MM-DD)
    popularity: number;             // Popularity score
    vote_average: number;           // Average user rating
    vote_count: number;             // Total number of votes
    adult: boolean;                 // Whether the movie is for adults (true/false)
    video: boolean;                 // Whether the movie has a video trailer (true/false)
    genre_ids: number[];            // Array of genre IDs associated with the movie
    poster_path: string | null;     // Path to the poster image
    backdrop_path: string | null;   // Path to the backdrop image
    original_language: string;      // Original language (e.g., "en", "fr")
    genres: Genre[];               // Array of genres (optional, can be fetched based on genre_ids)

};
export type SearchResults = {
    results: Movie[];               // Array of Movie objects
    page: number;                   // Current page number
    total_pages: number;             // Total number of pages
    total_results: number;           // Total number of movies found
};

export type Genre = {
    id: number;
    name: string;
}

export type Genres = {
    genres: Genre[]
}