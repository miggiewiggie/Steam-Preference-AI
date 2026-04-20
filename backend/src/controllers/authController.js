import SteamAuth from "node-steam-openid";
import dotenv from "dotenv";
import { getSteamGames, scoreGames } from "../services/gameServices.js";
import { generateGameRecommendation } from "../services/geminiServices.js";
import { buildUserProfile } from "../services/userServices.js";
import { storeUserProfile } from "../services/dbServices.js";

dotenv.config();

//Redirect User to Steam
export async function steamLogin(req, res){


    const steam = new SteamAuth({
        realm: process.env.BACKEND_ROUTE,
        returnUrl: process.env.BACKEND_RETURN_ROUTE,
        apiKey: process.env.STEAM_API_KEY,
    });

        try{
            const url = await steam.getRedirectUrl();
            res.redirect(url);
        } catch (err){
            console.error("Steam redirect error:", err);
            res.status(500).send("Failed to start Steam login");
        }
    }

//Handle Steam Callback
export async function steamReturn(req, res){

    const steam = new SteamAuth({
        realm: process.env.BACKEND_ROUTE,
        returnUrl: process.env.BACKEND_RETURN_ROUTE,
        apiKey: process.env.STEAM_API_KEY,
    });

  try {
    const user = await steam.authenticate(req);

    const steamid = user.steamid;

    const { games, topPlayed, recentPlayed } = await getSteamGames(steamid);

    const userProfile = buildUserProfile(games);

    await storeUserProfile({
      steamid,
      userProfile
    })

    const rankedGames = scoreGames(games);

    const top5 = rankedGames.slice(0, 5);



    //const aiText = await generateGameRecommendation(userProfile);

    const aiText = "AI turned off"


   res.send(`
  <html>
    <head>
      <title>Steam AI Test</title>
      <style>
        body {
          font-family: Arial;
          background: #0f172a;
          color: white;
          padding: 40px;
          text-align: center;
        }

        .card {
          background: #1e293b;
          padding: 20px;
          margin: 20px auto;
          width: 80%;
          border-radius: 12px;
        }

        h1 { color: #38bdf8; }
        h2 { color: #a78bfa; }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          padding: 8px;
          border-bottom: 1px solid #334155;
        }

        .score {
          color: #22c55e;
        }
      </style>
    </head>

    <body>

      <h1>Test</h1>

      <div class="card">
        <h2>SteamID</h2>
        <p>${steamid}</p>
      </div>

      <div class="card">
        <h2>Ranked Top 5 Games</h2>
        <ul>
          ${top5.map(game => `
            <li>
              <strong>${game.name}</strong><br/>
              Hours: ${game.hours.toFixed(1)} |
              Score: <span class="score">${game.score.toFixed(2)}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <div class="card">
        <h2>AI Recommendation</h2>
        <p style="white-space: pre-wrap; text-align:left;">
            ${aiText}
        </p>
     </div>

    </body>
  </html>
`);

  } catch (err) {
    res.send("Login failed");
  }
}




