import { Genres } from "@/typings";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

async function GenreDropdown() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url, options);
  const data = (await response.json()) as Genres;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center">
        Genre <ChevronDown className="ml-1" />
        <DropdownMenuContent className="max-h-96 overflow-y-auto scrollbar-hide">
          <DropdownMenuLabel>Select Genere</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {data.genres.map((genre) => (
            <DropdownMenuItem className="font-semibold" key={genre.id}>
              <Link href={`/genre/${genre.id}?genre=${genre.name}`}>
                {genre.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}

export default GenreDropdown;
