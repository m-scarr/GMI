import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./models/index.cjs";
import routes from "./routes/index.cjs";
import session from "cookie-session";
import passportConfig from "./config/passport.cjs";
import { fileURLToPath } from 'url';
import path from 'path';

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
    cookie: {
      secure: true,
      maxAge: 60000,
    },
    secret: "secret",
  })
);

passportConfig(app, db);

app.use("/", routes);

app.use(express.static(__dirname + "/build"));

/*app.route("/").get((req, res) => {
      res.sendFile(path.join(__dirname, "build", "index.html"));
    });*/

//routes(app, db, passport);
const server = http.createServer(app);

server.listen(port, () => {
  console.log("We're up and running on port " + port + "!");
});
