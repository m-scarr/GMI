const fs = require("fs");
const path = require("path");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
};

module.exports = (app, db, passport) => {
    fs.readdirSync(path.join(__dirname, "./controllers"))
        .filter((file) => {
            return file.indexOf(".") !== 0 && file !== "index.js";
        })
        .forEach((file) => {
            app
                .route("/auth/" + file.slice(0, -3))
                .get(isLoggedIn, (req, res) => {
                    require("./controllers/" + file).authorized.get[req.query.func](db, req, res);
                }).post(isLoggedIn, (req, res) => {
                    require("./controllers/" + file).authorized.post[req.query.func](db, req, res);
                }).delete(isLoggedIn, (req, res) => {
                    require("./controllers/" + file).authorized.delete[req.query.func](db, req, res);
                })
            app
                .route("/" + file.slice(0, -3))
                .get((req, res) => {
                    require("./controllers/" + file).unauthorized.get[req.query.func](db, req, res);
                }).post((req, res, next) => {
                    console.log(req.query.func);
                    if (req.query.func !== "logIn") {
                        require("./controllers/" + file).unauthorized.post[req.query.func](db, req, res);
                    } else {
                        passport.authenticate("local", { failureMessage: true })(req, res, next);
                    }
                }, (req, res) => {
                    if (req.query.func === "logIn") {
                        require("./controllers/" + file).unauthorized.post[req.query.func](db, req, res);
                    }
                }).delete((req, res) => {
                    require("./controllers/" + file).unauthorized.delete[req.query.func](db, req, res);
                })
        });
};