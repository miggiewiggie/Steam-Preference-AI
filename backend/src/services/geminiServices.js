import dotenv from "dotenv";

dotenv.config();

export async function generateGameRecommendation(userProfile) {
  const prompt = `
            You are a gaming recommendation AI.

            The user’s most played games are:

            ${topGames.map(g =>
              `- ${g.name} (${g.hours?.toFixed(1) || 0} hours)`
            ).join("\n")}

            Task:
            1. Recommend 3 games they should play next
            2. Explain why based on their habits
            3. Keep it short, friendly, and not repetitive
    `;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  console.log("GEMINI STATUS:", response.status);

  const data = await response.json();

  console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No recommendation generated.";
}