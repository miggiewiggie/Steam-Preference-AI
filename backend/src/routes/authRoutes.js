import express from "express";

import { steamLogin, steamReturn } from "../controllers/authController.js"

const router = express.Router();

router.get("/steam", steamLogin);
router.get("/steam/return", steamReturn);

export default router;