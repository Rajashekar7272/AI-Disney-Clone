import { getDiscoverMovies } from "@/lib/getMovies";
import SlidingBanner from "./SlidingBanner";

type Props = {
  id: string;
  keyword: string;
};

async function MovieBannerSliding({ id, keyword }: Props) {
  const movies = await getDiscoverMovies(id, keyword);
  return (
    <div>
      <SlidingBanner movies={movies} genres={[]} />
    </div>
  );
}

export default MovieBannerSliding;
