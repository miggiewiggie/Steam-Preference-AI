import express from "express";
import passport from "passport";

const router = express.Router();

//start login
router.get("/steam", passport.authenticate("steam"));

//callback
router.get(
  "/steam/return",
  (req, res, next) => {
    console.log("=== RETURN HIT ===");
    console.log("Query params:", JSON.stringify(req.query, null, 2));
    console.log("Session:", JSON.stringify(req.session, null, 2));
    console.log("Cookie header:", req.headers.cookie);
    next();
  },
  passport.authenticate("steam", {
    failureRedirect: "http://127.0.0.1:5174",
    failureMessage: true,
  }),
    (err, req, res, next) => {
        if (err) console.error(err);
        next();
    },
    (req, res) => {
        res.redirect("http://127.0.0.1:5174");
    }
);
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

export default router;