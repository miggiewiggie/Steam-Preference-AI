import axios from "axios";
import {} from "../services/gameServices.js";

export async function getOwnedGames(req, res){

    const {steamId} = req.params;

    try{
        const response = await axios.get(
            'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/',
            {
                params:{
                    key: process.env.STEAM_API_KEY,
                    steamid: steamId,
                    include_appinfo: true,
                    include_played_free_games: true,
                    skip_unvetted_apps: false
                },
            }
        );

        console.log(response.data);
        res.json(response.data);

    } catch(err){
        res.status(500).json({error: "Failed to fetch games"});
    }

}

export async function getRecentGames(req, res) {
  const { steamid } = req.params;

  const data = await getSteamGames(steamid);

  res.json(data);
}