const statController = require("../../controllers/Stat.cjs");
const permissionsController = require("./permissions.cjs");

const router = require("express").Router();

const permissionMiddleWare = {
  create: async (req, res, next) => {
    if (!req.body.gameMasterMode) {
      res.json(false);
      return;
    }
    req.preparedData = permissionsController.limitAttributes(req.body, [
      "nativeItemId",
      "name",
      "value",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [{ type: "NativeItem", id: req.preparedData.nativeItemId }]
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
      "value",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [
        { type: "Stat", id: req.body.id },
        { type: "NativeItem", idField: "nativeItemId" },
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
        { type: "Stat", id: req.query.id },
        { type: "NativeItem", idField: "nativeItemId" },
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
  statController.authorized.create
);
router.put(
  "/update",
  permissionMiddleWare.update,
  statController.authorized.update
);
router.delete(
  "/delete",
  permissionMiddleWare.delete,
  statController.authorized.delete
);

module.exports = router;
