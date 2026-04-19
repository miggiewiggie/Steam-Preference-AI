import axios from "axios";

export async function getSteamGames(steamid) {
  const response = await axios.get(
    "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1",
    {
      params: {
        key: process.env.STEAM_API_KEY,
        steamid,
        include_appinfo: true,
        include_played_free_games: true,
      },
    }
  );

  const games = response.data?.response?.games || [];

  const topPlayed = [...games]
    .sort((a, b) => b.playtime_forever - a.playtime_forever)
    .slice(0, 5);

  const recentPlayed = [...games]
    .sort((a, b) => (b.playtime_2weeks || 0) - (a.playtime_2weeks || 0))
    .slice(0, 5);

  return { games, topPlayed, recentPlayed };
}

//loop through every game in the library 
export function scoreGames(games) {
  return games
  .map(game => {
    const hours = game.playtime_forever / 60; //playtime (in minutes) to hours played
    const recent = (game.playtime_2weeks || 0) / 60; //hours played recently

    // simple weighted score
    const score =
      hours * 0.6 +        // long-term interest
      recent * 0.4;        // current interest

    return { //Attaches score to each game -> adds new field called score
      ...game,
      score,
      hours,
    };
  }).sort((a, b) => b.score - a.score);
}