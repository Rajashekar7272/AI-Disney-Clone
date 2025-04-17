import { Movie } from "@/typings";
import MovieCard from "./MovieCard";

type Props = {
  title?: string;
  movies: Movie[];
  isVertical: boolean;
};

function MoviesBanner({ title, movies }: Props) {
  return (
    <div className="z-50">
      <h2 className="px-10 py-2 text-2xl font-bold">{title}</h2>
      <div className="flex space-x-5 overflow-scroll px-5 lg:px-10 py-5 scrollbar-hide">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MoviesBanner;
