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

export default function SlidingBanner({ movies }: Props) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, duration: 100 },
    [Autoplay()]
  );

  return (
    <div
      ref={emblaRef}
      className="relative w-full overflow-hidden h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] 2xl:h-[95vh]"
    >
      <div className="flex h-full">
        {movies.map((movie) => (
          <div key={movie.id} className="relative min-w-full h-full">
            {/* Full‑bleed cover image */}
            <Image
              src={getImagePath(
                movie.backdrop_path || movie.poster_path || undefined,
                true
              )}
              alt={movie.title}
              fill
              sizes="100vw"
              quality={80}
              className="object-cover object-center"
              priority
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />

            {/* Text content */}
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8 lg:p-12 text-white">
              {/* Title */}
              <h2 className="text-lg sm:text-2xl md:text-4xl font-bold drop-shadow-lg">
                {movie.title}
              </h2>

              {/* Meta row (year · rating) */}
              <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm md:text-base">
                {movie.release_date && (
                  <span>{movie.release_date.slice(0, 4)}</span>
                )}
                <span>•</span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>

              {/* Overview (hidden on smallest devices) */}
              <p className="mt-2 hidden sm:block sm:line-clamp-2 md:line-clamp-3 text-sm sm:text-base lg:text-lg text-gray-200 max-w-xl">
                {movie.overview}
              </p>

              {/* Call‑to‑action */}
              <button className="mt-4 bg-gradient-to-r from-red-500 to-orange-500 px-4 py-1.5 sm:px-6 sm:py-2 md:px-8 md:py-3 rounded-md font-semibold text-sm sm:text-base hover:from-red-600 hover:to-orange-600 transition">
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
