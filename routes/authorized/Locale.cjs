const localeController = require("../../controllers/Locale.cjs");
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
      "visible",
      "mapSrc",
      "markerSrc",
      "localeId",
      "x",
      "y",
      "notes",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [{ type: "Locale", id: req.body.id }]
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
      [{ type: "Locale", id: req.query.id }]
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
  localeController.authorized.create
);
router.put(
  "/update",
  permissionMiddleWare.update,
  localeController.authorized.update
);
router.delete(
  "/delete",
  permissionMiddleWare.delete,
  localeController.authorized.delete
);

module.exports = router;
