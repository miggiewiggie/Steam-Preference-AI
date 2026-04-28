import dotenv from "dotenv";

dotenv.config();

export async function generateGameRecommendation(userProfile) {

  const {topGames, recentGames, dominantPlaystyle, avgPlaytime, totalHours} = userProfile;

  const prompt = `
      You are a gaming recommendation AI.

      USER PROFILE:
      - Total hours: ${totalHours}
      - Avg playtime: ${avgPlaytime}
      - Playstyle: ${dominantPlaystyle}

      Top Games:
      ${topGames.map(g =>
        `- ${g.name} (${(g.hours || 0).toFixed(1)} hours)`
      ).join("\n")}

      RECENT ACTIVITY (Last 2 Weeks):
      ${recentGames.length > 0
        ? recentGames.map(g =>
            `- ${g.name} (${(g.recentHours || 0).toFixed(1)} hrs recent)`
          ).join("\n")
        : "No recent activity"
      }

      Task:
      Return ONLY valid JSON in this format:
      {
        "recommendations": [
          {
            "rank": 1,
            "name": "Game Name",
            "reason": "Short explanation"
          },
          {
            "rank": 2,
            "name": "Game Name",
            "reason": "Short explanation"
          },
          {
            "rank": 3,
            "name": "Game Name",
            "reason": "Short explanation"
          }
        ]
      }

      Do not include any extra text outside JSON.
  `;

  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
  
  try {
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    parsed = JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse AI response", err);
    parsed = { recommendations: [] };
  }

  return parsed || "No recommendation generated.";
}