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
        }).then(function (user) {
          if (user == null) {
            return done(null, false, { message: "Wrong Username or Password" });
          } else {
            var hashedPassword = bcrypt.hashSync(password, user.salt);
            if (user.password === hashedPassword) {
              return done(null, user);
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
    done(null, user.dataValues.id);
  });

  passport.deserializeUser(function (id, done) {
    db.User.findOne({
      where: {
        id: id,
      },
    }).then(function (user) {
      if (user == null) {
        done(new Error("Something went wrong!"));
      } else {
        done(null, user);
      }
    });
  });

  return passport;
};
