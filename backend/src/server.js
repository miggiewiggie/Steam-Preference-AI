import dotenv from "dotenv";
import express from "express";
import steamRoutes from "./routes/steamRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/steam", steamRoutes);
app.use("/api/user", userRoutes);


const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
});
