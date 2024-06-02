import http from "http";
import express from "express";
import rateLimit from 'express-rate-limit';
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./models/index.cjs";
import routes from "./routes/index.cjs";
import session from "express-session";
import passportConfig from "./config/passport.cjs";
import { fileURLToPath } from 'url';
import path from 'path';
import RedisStore from 'connect-redis';
import { createClient } from "redis";

const redisClient = createClient();
await redisClient.connect().catch(console.error)

const port = process.env.PORT || 8080;
const app = express();
const env = process.env.NODE_ENV || "development";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

//for development
if (env === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}
//

app.use(cookieParser());

app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || "secret",
    cookie: {
      httpOnly: true,
      secure: env === "production",
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: env === "production" ? "strict" : "none",
    },
  })
);

passportConfig(app, db);

app.use("/", routes);

app.use(express.static(__dirname + "/dist"));

app.route("/").get((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//routes(app, db, passport);
const server = http.createServer(app);

server.listen(port, () => {
  console.log("We're up and running on port " + port + "!");
});
