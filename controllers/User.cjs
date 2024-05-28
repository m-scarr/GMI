const bcrypt = require("bcrypt");
const db = require("../models/index.cjs");
const { Op } = require('sequelize');

module.exports = {
  unauthorized: {
    isLoggedIn: (req, res) => {
      res.json(
        req.isAuthenticated()
          ? { success: true, user: req.user }
          : { success: false }
      );
    },
    register: async (req, res) => {
      try {
        const salt = bcrypt.genSaltSync(10);
        const newUser = await db.User.create({
          logInName: req.body.logInName,
          password: bcrypt.hashSync(req.body.password, salt),
        });
        const newUserForSend = newUser.toJSON();
        delete newUserForSend.password;
        res.json(newUserForSend);
      } catch (err) {
        console.error("Error: User failed to register, likely due to a username that is already in use.");
        res.json(false);
      }
    },
    logIn: (req, res) => {
      res.json({
        success: true,
        user: req.user,
      });
    },
  },
  authorized: {
    logOut: (req, res) => {
      req.logout();
      res.json(true);
    },
    search: async (req, res) => {
      const users = await db.User.findAll({
        where: {
          logInName: {
            [Op.like]: `%${req.query.logInName}%`
          }
        },
        attributes: ["logInName", "id"]
      });
      res.json(users);
    }
  },
};
