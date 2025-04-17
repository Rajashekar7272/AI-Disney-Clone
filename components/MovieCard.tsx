import getImagePath from "@/lib/getImagePath";
import { Movie } from "@/typings";
import Image from "next/image";

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="relative flex-shrink-0 cursor-pointer transform transition duration-300 
    ease-in-out group hover:z-10 w-48 sm:w-56 md:w-64 lg:w-72">
      {/* Background overlay */}
      <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-b from-transparent 
      via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image container */}
      <div className="relative w-full h-32 sm:h-36 md:h-40 lg:h-48 rounded-lg md:rounded-xl overflow-hidden shadow">
        <Image
          src={getImagePath(movie.backdrop_path || movie.poster_path || undefined)}
          alt={movie.title}
          width={1920}
          height={1080}
          className="object-cover object-center w-full h-full transform transition duration-300 
          ease-in-out group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent 
      to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-lg md:rounded-xl" />

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-2 space-y-0.5">
        <p className="text-white font-semibold text-xs sm:text-sm md:text-[18px] truncate transform transition 
        duration-300 group-hover:translate-y-1 text-shadow">
          {movie.title}
        </p>
        <p className="text-gray-300 text-[10px] sm:text-xs md:text-sm opacity-0 group-hover:opacity-100 
        transition-opacity duration-300">
          {movie.release_date?.split("-")[0]}
          <span className="mx-1">•</span>
          ★ {movie.vote_average?.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;