import axios from "axios";
import passport from "passport";
import {Strategy as SteamStrategy} from "passport-steam";

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

export async function getRecentGames(req, res){

    const {steamId} = req.params;

    

    try{
        const response = await axios.get(
            'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/',
            {
                params:{
                    key: process.env.STEAM_API_KEY,
                    steamid: steamId,
                },
            }
        );

        // 1. Extract games safely
        const games = response.data.response.games || [];

        // 2. Sort by playtime (in minutes) in last 2 weeks (highest first)
        const sortedGames = games.sort(
        (a, b) => (b.playtime_2weeks || 0) - (a.playtime_2weeks || 0)
        );

        // 3. Send response
        res.json(sortedGames);

    } catch(err){
        res.status(500).json({error: "Failed to fetch games"});
    }

}
