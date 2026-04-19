import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import express from "express";
import steamRoutes from "./routes/steamRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import "./config/passport.js";


dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(
    cors({
        origin: "http://127.0.0.1:5174",
        credentials: true
    })
);

app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "none"
}
  })
);

app.use(passport.initialize());
app.use(passport.session());



app.use("/steam", steamRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);


const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
});
