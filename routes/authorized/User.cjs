const userController = require("../../controllers/User.cjs");
const router = require("express").Router();

router.post("/logOut", userController.authorized.logOut);

module.exports = router;
