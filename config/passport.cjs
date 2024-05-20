var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  bcrypt = require("bcrypt");

module.exports = function (app, db) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new LocalStrategy(
      { usernameField: "logInName", passwordField: "password" },
      function (username, password, done) {
        db.User.findOne({
          where: {
            logInName: username,
          },
        }).then(async function (user) {
          if (user == null) {
            return done(null, false, { message: "Wrong Username or Password" });
          } else {
            if (await bcrypt.compare(password, user.dataValues.password)) {
              return done(null, {
                id: user.id,
                logInName: user.logInName
              });
            } else {
              return done(null, false, {
                message: "Wrong Username or Password",
              });
            }
          }
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.User.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "logInName"],
    }).then(function (user) {
      if (user == null) {
        done(new Error("Something went wrong!"));
      } else {
        done(null, {
          id: user.id,
          logInName: user.logInName
        });
      }
    });
  });
};
