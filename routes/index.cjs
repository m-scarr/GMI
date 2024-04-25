const express = require("express");
const router = express.Router();

router.use(
  "/auth",
  (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect("/");
  },
  require("./authorized/index.cjs")
);
router.use("/", require("./unauthorized/index.cjs"));

module.exports = router;
