import MoviesBanner from "@/components/MoviesBanner";
import { getDiscoverMovies } from "@/lib/getMovies";
import { GoogleGenAI } from "@google/genai";

// Instantiate Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// Define expected props from Next.js App Router
interface Props {
  params: Promise<{ id: string }>; // Wrap params in Promise
  searchParams: Promise<{ genre: string }>; // Wrap searchParams in Promise
}

// Recommendation type with rating
type Recommendation = {
  title: string;
  year: string;
  rating: string;
  description: string;
};

async function GenrePage({ params, searchParams }: Props) {
  const { id } = await params; // Await Promise
  const { genre } = await searchParams; // Await Promise

  const movies = await getDiscoverMovies(id);

  // Request AI recommendations with ratings
  const aiResp = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Recommend the top 10 ${genre.toLowerCase()} movies of all time. For each movie, use this format:

1. **Title** (Year) - Rating: X.X/10: Five-sentence description of why it's great.

Do not include any extra text like 'Here are' or numbering outside this.`,
  });

  // Parse AI response
  const recommendations: Recommendation[] = (aiResp.text ?? "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l)
    .map((line) => {
      const match = line.match(
        /^\d+\.?\s*\*\*(.+?)\*\*\s*\((\d{4})\)\s*-\s*Rating:\s*([\d.]+\/10)\s*[:\-]\s*(.+)$/
      );
      if (match) {
        return {
          title: match[1].replace(/\*/g, ""),
          year: match[2],
          rating: match[3],
          description: match[4],
        };
      }
      return { title: line.replace(/\*/g, ""), year: "", rating: "", description: "" };
    });

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20">
      <div className="max-w-7xl 2xl:max-w-8xl mx-auto px-4 md:px-10 py-8 md:py-12 2xl:py-16">
        <h1 className="text-3xl md:text-4xl pt-10 2xl:text-5xl font-bold mb-8 md:mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {genre} Movies
        </h1>

        <section>
          <MoviesBanner movies={movies} isVertical />
        </section>

        <section className="mt-8 mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-blue-500">
            AI-Recommended Top {genre} Movies
          </h2>
          <ol className="list-decimal list-inside space-y-6 text-red-600">
            {recommendations.map(({ title, year, rating, description }, idx) => (
              <li key={idx} className="text-lg">
                <span className="font-bold text-red-600 text-xl">
                  {title} ({year})
                </span>
                {rating && (
                  <span className="text-yellow-500 ml-2 text-xl">Rating: {rating}</span>
                )}
                {description && (
                  <p className="mt-1 text-gray-200">{description}</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

export default GenrePage;