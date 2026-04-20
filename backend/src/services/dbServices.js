import mongoose from "mongoose";
import User from "../models/user.js";

export const connectDB = async () => {
    try{

        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("MONGODB CONNECTED SUCCESSFULLY");

    } catch(error){

        console.error("Error connecting to MONGODB", error);
        process.exit(1);

    }
}

export async function storeUserProfile({ steamid, userProfile})
{
    try{

        const {

            topGames,
            recentGames,
            totalHours,
            avgPlaytime,
            dominantPlaystyle,
            recentActivity

        } = userProfile;

        const updatedUser = await User.findOneAndUpdate(
            {steamid},
            {
                steamid,
                profile:{
                    totalHours,
                    avgPlaytime,
                    dominantPlaystyle,
                    recentActivity,
                },
                topGames,
                recentGames,
                lastSynced: new Date(),
            },
            {
                upsert: true,
                new: true,
            }
        );

        console.log("User profile stored:", steamid);

        return updatedUser;

    } catch (err){
        console.error("Error storing user profile:", err);
        throw err;
    }


}