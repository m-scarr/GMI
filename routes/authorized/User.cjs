const userController = require("../../controllers/User.cjs");
const router = require("express").Router();

router.post("/logOut", userController.authorized.logOut);
router.get("/search", userController.authorized.search);

module.exports = router;
