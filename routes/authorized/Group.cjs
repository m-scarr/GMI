const groupController = require("../../controllers/Group.cjs");
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
      "unique",
      "markerSrc",
      "localeId",
      "x",
      "y",
      "visible",
      "notes",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [{ type: "Group", id: req.body.id }]
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
      [{ type: "Group", id: req.query.id }]
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
  groupController.authorized.create
);
router.put("/update", permissionMiddleWare.update, groupController.authorized.update);
router.delete(
  "/delete",
  permissionMiddleWare.delete,
  groupController.authorized.delete
);

module.exports = router;
