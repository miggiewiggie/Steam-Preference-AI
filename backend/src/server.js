import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import steamRoutes from "./routes/steamRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const PORT = parseInt(process.env.BACKEND_PORT);

const app = express();
app.use(express.json());

app.use(cors());
app.use("/steam", steamRoutes);
app.use("/auth", authRoutes);



app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
});
