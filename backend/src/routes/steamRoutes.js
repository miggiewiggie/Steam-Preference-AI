import express from "express";
import { getOwnedGames, getRecentGames } from "../controllers/steamController.js";

const router = express.Router();

//user GET Routes (For retrieving user information from Steam)
router.get("/owned/:steamId", getOwnedGames);
router.get("/recent/:steamId", getRecentGames);


export default router;