const userController = require("../../controllers/User.cjs");
const passport = require('passport');
const express = require("express");
const router = express.Router();

router.get("/isLoggedIn", userController.unauthorized.isLoggedIn);
router.post("/register", userController.unauthorized.register);
router.post(
  "/logIn",
  passport.authenticate("local", { failureMessage: true }),
  userController.unauthorized.logIn
);

module.exports = router;
