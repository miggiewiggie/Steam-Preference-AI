import axios from "axios";

export async function getSteamId(req, res){
    const { username } = req.params;

    console.log(username);
    console.log(process.env.STEAM_API_KEY);

    try{
        const response = await axios.get(
            "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1", //Change this out for OpenID variation that uses a login to get the users steam ID.
            {
                params:{
                    key: process.env.STEAM_API_KEY,
                    vanityurl: username,
                },
            }
        );

        res.json(response.data.response);

    } catch(err){
        res.status(500).json({error: "Failed to resolve SteamID"});
    }
}