"use client";

import getImagePath from "@/lib/getImagePath";
import { Genre, Movie } from "@/typings";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type Props = {
  movies: Movie[];
  genres: Genre[];
};

Autoplay.globalOptions = { delay: 4000 };

function SlidingBanner({ movies }: Props) {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay(),
  ]);

  return (
    <div
      className="overflow-hidden relative w-full h-[50vh] md:h-[70vh] lg:h-[85vh] 2xl:h-[95vh]"
      ref={emblaRef}
    >
      <div className="flex h-full">
        {movies.map((movie) => (
          <div key={movie.id} className="relative min-w-full">
            <Image
              src={getImagePath(
                movie.backdrop_path || movie.poster_path || undefined,
                true
              )}
              alt={movie.title}
              width={3840}
              height={2160}
              priority
              quality={100}
              className="w-full h-fit object-cover object-center transition-transform duration-700 ease-in-out"
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90">
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 space-y-1 md:space-y-2 text-white">
                <h2 className="text-xl md:text-4xl font-bold drop-shadow-md">
                  {movie.title}
                </h2>

                <div className="hidden md:flex items-center gap-2 text-sm md:text-base">
                  <span>{movie.release_date?.substring(0, 4)}</span>
                  <div className="hidden md:flex items-center gap-2">
                    <span>•</span>
                    <span>Rating: {(movie.vote_average).toFixed(1)}</span>
                  </div>
                </div>

                <p className="hidden md:line-clamp-3 text-sm lg:text-base lg:max-w-2xl text-gray-200">
                  {movie.overview}
                </p>

                <button className="hidden md:inline-block mt-4 bg-gradient-to-r from-red-500 to-orange-500 px-6 py-2 rounded-md hover:from-red-600 hover:to-orange-600 transition-all duration-200 font-semibold">
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlidingBanner;