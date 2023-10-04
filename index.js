const port = process.env.PORT || 8080;
const http = require("http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const db = require("./models");
const routes = require("./routes.js");
const session = require("cookie-session");
var path = require("path");
const app = express();
var env = process.env.NODE_ENV || "development";

//for development
if (env === "development") {
    const corsOptions = {
        origin: "http://localhost:3000",
        credentials: true,
    };
    app.use(cors(corsOptions));
}
//

app.use(cookieParser());

app.use(bodyParser.json({ limit: "5mb" }));

app.use(
    session({
        cookie: {
            secure: true,
            maxAge: 60000,
        },
        secret: "secret",
    })
);

db.init();

app.use(express.static(__dirname + "/build"));
app.route("/").get((req, res) => {
    res.sendFile(
        path.join(__dirname, "build", "index.html")
    );
});



const passport = require("./config/passport")(app, db);

routes(app, db, passport);
const server = http.createServer(app);

server.listen(port, () => {
    console.log("We're up and running on port " + port + "!");
});
