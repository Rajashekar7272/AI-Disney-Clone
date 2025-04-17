import MovieBannerSliding from "@/components/MovieBannerSliding";
import MoviesBanner from "@/components/MoviesBanner";
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/lib/getMovies";

export default async function Home() {
  const upComingMovies = await getUpcomingMovies();
  const topRateMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <div>
      <main>
        
        {/* MoviesSlidingBanner */}
        <MovieBannerSliding id={""} keyword={""} />

        <div className="flex flex-col space-y-2 xl:mt-48">
          {/* MovieBanner movies={...} title="upcoming" */}
          <MoviesBanner title="Upcoming" movies={upComingMovies} isVertical />
          <MoviesBanner title="Top Rated" movies={topRateMovies} isVertical />
          <MoviesBanner title="Popular" movies={popularMovies} isVertical />
        </div>
      </main>
    </div>
  );
}
