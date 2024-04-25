const battlefieldController = require("../../controllers/Battlefield.cjs");
const permissionsController = require("./permissions.cjs");
const router = require("express").Router();

const permissionMiddleWare = {
  create: async (req, res, next) => {
    if (!req.body.gameMasterMode) {
      res.json(false);
      return;
    }
    req.preparedData = permissionsController.limitAttributes(req.body, [
      "gameId",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [{ type: "Game", id: req.preparedData.gameId }]
    );
    if (!permissionRequest.permitted) {
      res.json(false);
      return;
    }
    next();
  },

  update: async (req, res, next) => {
    if (!req.body.gameMasterMode) {
      res.json(false);
      return;
    }
    req.preparedData = permissionsController.limitAttributes(req.body, [
      "name",
      "scale",
      "markerSrc",
      "mapSrc",
      "localeId",
      "x",
      "y",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [{ type: "Battlefield", id: req.body.id }]
    );

    if (!permissionRequest.permitted) {
      res.json(false);
      return;
    }
    req.entity = permissionRequest.entities[0];
    next();
  },

  delete: async (req, res, next) => {
    if (!req.query.gameMasterMode) {
      res.json(false);
      return;
    }
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.query.gameMasterMode,
      [{ type: "Battlefield", id: req.query.id }]
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
  battlefieldController.authorized.create
);
router.put(
  "/update",
  permissionMiddleWare.update,
  battlefieldController.authorized.update
);
router.delete(
  "/delete",
  permissionMiddleWare.delete,
  battlefieldController.authorized.delete
);

module.exports = router;
