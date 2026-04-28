import axios from "axios";

const BASE_URL = "https://www.steamgriddb.com/api/v2";

export async function getGameImageFromGridDB(appid) {
  try {
    const response = await axios.get(
      `${BASE_URL}/grids/steam/${appid}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STEAMGRID_API_KEY}`
        }
      }
    );

    const grids = response.data.data;

    if (!grids || grids.length === 0) {
      return null;
    }

    // pick first image (can improve later)
    return grids[0].url;

  } catch (err) {
    console.error("SteamGridDB error:", err.message);
    return null;
  }
}

export async function addImagesToGames(games) {
  return await Promise.all(
    games.map(async (game) => {
        
      let image = await getGameImageFromGridDB(game.appid);

      return {
        ...game,
        image
      };
    })
  );
}