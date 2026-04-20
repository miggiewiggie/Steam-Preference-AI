import mongoose from "mongoose";

export const connectDB = async () => {
    try{

        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("MONGODB CONNECTED SUCCESSFULLY");

    } catch(error){

        console.error("Error connecting to MONGODB", error);
        process.exit(1);

    }
}