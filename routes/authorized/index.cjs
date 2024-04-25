const express = require("express");
const router = express.Router();

router.use("/Battlefield", require("./Battlefield.cjs"));
router.use("/Cache", require("./Cache.cjs"));
router.use("/Character", require("./Character.cjs"));
router.use("/Combatant", require("./Combatant.cjs"));
router.use("/Event", require("./Event.cjs"));
router.use("/Game", require("./Game.cjs"));
router.use("/Group", require("./Group.cjs"));
router.use("/GroupMember", require("./GroupMember.cjs"));
router.use("/InventoryItem", require("./InventoryItem.cjs"));
router.use("/Locale", require("./Locale.cjs"));
router.use("/Log", require("./Log.cjs"));
router.use("/NativeItem", require("./NativeItem.cjs"));
router.use("/Stat", require("./Stat.cjs"));
router.use("/User", require("./User.cjs"));

module.exports = router;