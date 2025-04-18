import { GoogleGenAI } from "@google/genai";

// Instantiate Gemini AI (ensure this is safe server-side)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

type Recommendation = {
  title: string;
  year: string;
  rating: string;
  description: string;
};

interface AIRecommendationsProps {
  genre: string;
}

async function AIRecommendations({ genre }: AIRecommendationsProps) {
  const aiResp = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Recommend the top 10 ${genre.toLowerCase()} movies of all time. For each movie, use this format:

1. **Title** (Year) - Rating: X.X/10: Five-sentence description of why it's great.

Do not include any extra text like 'Here are' or numbering outside this.`,
  });

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
              <p className="mt-1 text-black dark:text-white">{description}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default AIRecommendations;