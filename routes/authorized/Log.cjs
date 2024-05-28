const logController = require("../../controllers/Log.cjs");
const db = require("../../models/index.cjs");
const permissionsController = require("./permissions.cjs");

const router = require("express").Router();

const permissionMiddleWare = {
  create: async (req, res, next) => {
    req.preparedData = permissionsController.limitAttributes(req.body, [
      "text",
      "ownerCategory",
      "ownerId",
    ]);
    if (
      !req.body.gameMasterMode &&
      req.preparedData.ownerCategory !== "Character"
    ) {
      res.json(false);
      return;
    }
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [
        req.body.gameMasterMode
          ? {
            type: req.preparedData.ownerCategory,
            id: req.preparedData.ownerId,
          }
          : { type: "Character", id: req.preparedData.ownerId },
      ]
    );
    if (!permissionRequest.permitted) {
      res.json(false);
      return;
    }
    next();
  },

  delete: async (req, res, next) => {
    try {
      req.entity = await db.Log.findByPk(req.query.id);
      const permissionRequest = await permissionsController.verifyPermission(
        req.user.id,
        req.query.gameMasterMode == "true",
        [req.query.gameMasterMode == "true" ? { type: req.entity.ownerCategory, id: req.entity.ownerId } : { type: "Character", id: req.entity.ownerId }]
      );
      if (!permissionRequest.permitted) {
        res.json(false);
        return;
      }
      next();
    } catch (err) {
      console.error(err);
      res.json(false);
    }
  },
};

router.post(
  "/create",
  permissionMiddleWare.create,
  logController.authorized.create
);
router.delete(
  "/delete",
  permissionMiddleWare.delete,
  logController.authorized.delete
);

module.exports = router;
