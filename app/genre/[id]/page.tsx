import MoviesBanner from "@/components/MoviesBanner";
import { getDiscoverMovies } from "@/lib/getMovies";
import AIRecommendations from "@/components/AIRecommendations";
import { Suspense } from 'react';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ genre: string }>;
}

async function GenrePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { genre } = await searchParams;

  const movies = await getDiscoverMovies(id);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20">
      <div className="max-w-7xl 2xl:max-w-8xl mx-auto px-4 md:px-10 py-8 md:py-12 2xl:py-16">
        <h1 className="text-3xl md:text-4xl pt-10 2xl:text-5xl font-bold mb-8 md:mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {genre} Movies also Explore AI {genre} Movies
        </h1>

        <section>
          <MoviesBanner movies={movies} isVertical />
        </section>

        <Suspense fallback={
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 ml-4 text-2xl text-blue-500 font-medium">AI Recommendation</p>
          </div>
        }>
          <AIRecommendations genre={genre} />
        </Suspense>
      </div>
    </div>
  );
}

export default GenrePage;