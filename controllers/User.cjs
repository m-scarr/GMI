const bcrypt = require("bcrypt");
const db = require("../models/index.cjs");

module.exports = {
  unauthorized: {
    isLoggedIn: (req, res) => {
      res.json(
        req.isAuthenticated()
          ? { success: true, user: { ...req.user.dataValues } }
          : { success: false }
      );
    },
    register: async (req, res) => {
      try {
        const salt = bcrypt.genSaltSync(10);
        const newUser = await db.User.create({
          logInName: req.body.logInName,
          displayName: req.body.displayName,
          password: bcrypt.hashSync(req.body.password, salt),
          email: req.body.email,
        });
        const newUserForSend = newUser.toJSON();
        delete newUserForSend.password;
        res.json(newUserForSend);
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
    logIn: (req, res) => {
      res.json({
        success: true,
        user: { ...req.user },
      });
    },
  },
  authorized: {
    logOut: (req, res) => {
      req.logout();
      res.json(true);
      return;
    },
  },
};
