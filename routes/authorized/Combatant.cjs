const combatantController = require("../../controllers/Combatant.cjs");
const permissionsController = require("./permissions.cjs");

const router = require("express").Router();

const permissionMiddleWare = {
  create: async (req, res, next) => {
    if (!req.body.gameMasterMode) {
      res.json(false);
      return;
    }
    req.preparedData = permissionsController.limitAttributes(req.body, [
      "x",
      "y",
      "characterId",
      "battlefieldId",
      "ally",
      "hp",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [
        req.body.gameMasterMode
          ? { type: "Battlefield", id: req.preparedData.battlefieldId }
          : { type: "Character", id: req.preparedData.characterId },
      ]
    );
    if (!permissionRequest.permitted) {
      res.json(false);
      return;
    }
    next();
  },

  update: async (req, res, next) => {
    if (!req.body.gameMasterMode && "scale" in req.body) {
      res.json(false);
      return;
    }
    req.preparedData = permissionsController.limitAttributes(req.body, [
      "x",
      "y",
      "hp",
      "scale",
      "visible",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [
        { type: "Combatant", id: req.body.id },
        req.body.gameMasterMode
          ? { type: "Battlefield", idField: "battlefieldId" }
          : { type: "Character", idField: "characterId" },
      ]
    );
    if (!permissionRequest.permitted) {
      res.json(false);
      return;
    }
    req.entity = permissionRequest.entities[0];
    next();
  },

  delete: async (req, res, next) => {
    if (!req.query.gameMasterMode == "true") {
      res.json(false);
      return;
    }
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.query.gameMasterMode == "true",
      [
        { type: "Combatant", id: req.query.id },
        req.query.gameMasterMode == "true"
          ? { type: "Battlefield", idField: "battlefieldId" }
          : { type: "Character", idField: "characterId" },
      ]
    );
    if (!permissionRequest.permitted) {
      res.json(false);
      return;
    }
    req.entity = permissionRequest.entities[0];
    next();
  },
};

router.post(
  "/create",
  permissionMiddleWare.create,
  combatantController.authorized.create
);
router.put(
  "/update",
  permissionMiddleWare.update,
  combatantController.authorized.update
);
router.delete(
  "/delete",
  permissionMiddleWare.delete,
  combatantController.authorized.delete
);

module.exports = router;
