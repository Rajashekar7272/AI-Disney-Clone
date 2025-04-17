import MoviesBanner from "@/components/MoviesBanner";
import { getPopularMovies, getSearchMovies } from "@/lib/getMovies";

// Define the Props type with params as a Promise
type Props = {
  params: Promise<{ term: string }>; // params is a Promise
}

async function SearchPage({ params }: Props) {
  // Await the params Promise to get the term
  const { term } = await params;
  const termToUse = decodeURIComponent(term);
  const movies = await getSearchMovies(termToUse);
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-7xl 2xl:max-w-8xl mx-auto">
      <div className="px-4 md:px-10 pt-20 md:pt-20">
        <h1 className="text-3xl md:text-5xl 2xl:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Results for {termToUse}
        </h1>
        
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl 2xl:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Top Results
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-4 gap-3 md:gap-4 2xl:gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45" />
                
                <img
                  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 md:h-56 lg:h-64 2xl:h-80 object-cover"
                />
                
                <div className="p-3 md:p-4 2xl:p-5">
                  <h3 className="font-semibold text-sm md:text-base lg:text-lg 2xl:text-xl truncate mb-1 text-white">
                    {movie.title}
                  </h3>
                  <div className="flex justify-between items-center text-xs md:text-sm 2xl:text-base text-gray-400">
                    <p>
                      {movie.release_date ? 
                        new Date(movie.release_date).getFullYear() : 
                        "N/A"}
                    </p>
                    <div className="flex items-center space-x-1 2xl:space-x-2">
                      <span className="text-yellow-400 2xl:text-xl">★</span>
                      <span>
                        {movie.vote_average ? 
                          Number(movie.vote_average).toFixed(1) : 
                          "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <MoviesBanner
          title="You May Also Like"
          movies={popularMovies}
          isVertical
        />
      </div>
    </div>
  );
}

export default SearchPage;