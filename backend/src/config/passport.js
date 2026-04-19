import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";

passport.use(
  new SteamStrategy(
    {
        returnURL: "http://127.0.0.1:5000/auth/steam/return",
        realm: "http://127.0.0.1:5000/",
        apiKey: process.env.STEAM_API_KEY,
    },
    function (identifier, profile, done){ //function runs after a succesful authentication, recieves steam ID and profile data
        return done(null, profile); // tells passport that authentication was successful and attaches info to request object as req.user
    }
  )
);

// required for sessions
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});