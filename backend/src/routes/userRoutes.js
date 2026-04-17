import express from "express";
import { getSteamId } from "../controllers/userController.js";

const router = express.Router();

router.get("/:username", getSteamId);

export default router;