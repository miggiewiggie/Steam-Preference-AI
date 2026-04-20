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
      1. Recommend 3 games they should play next
      2. Explain why based on their habits
      3. Keep it short, friendly, and not repetitive
      4. Compare top played games with recently played games to see the trend of games 
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

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No recommendation generated.";
}