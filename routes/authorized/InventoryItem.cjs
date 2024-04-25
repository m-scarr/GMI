const inventoryItemController = require("../../controllers/InventoryItem.cjs");
const permissionsController = require("./permissions.cjs");
const db = require("../../models/index.cjs");

const router = require("express").Router();

const permissionMiddleWare = {
  create: async (req, res, next) => {
    if (req.body.ownerCategory !== "Character" && !req.body.gameMasterMode) {
      res.json(false);
      return;
    }
    req.preparedData = permissionsController.limitAttributes(req.body, [
      "ownerCategory",
      "ownerId",
      "nativeItemId",
    ]);

    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [
        {
          type: req.preparedData.ownerCategory,
          id: req.preparedData.ownerId,
        },
      ]
    );
    if (!permissionRequest.permitted) {
      res.json(false);
      return;
    }
    next();
  },

  update: async (req, res, next) => {
    try {
      req.entity = await db.InventoryItem.findByPk(req.body.id);
      req.preparedData = permissionsController.limitAttributes(req.body, [
        "quantity",
        "equipped",
      ]);
      if (
        req.entity.dataValues.ownerCategory !== "Character" &&
        !req.body.gameMasterMode
      ) {
        res.json(false);
        return;
      }
      const permissionRequest = await permissionsController.verifyPermission(
        req.user.id,
        req.body.gameMasterMode,
        [
          {
            type: req.entity.dataValues.ownerCategory,
            id: req.entity.dataValues.ownerId,
          },
        ]
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

  delete: async (req, res, next) => {
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [
        { type: "InventoryItem", id: req.body.id },
        gameMasterMode
          ? { type: "Cache", id: "cacheId" }
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
  inventoryItemController.authorized.create
);
router.put(
  "/update",
  permissionMiddleWare.update,
  inventoryItemController.authorized.update
);
router.delete(
  "/delete",
  permissionMiddleWare.delete,
  inventoryItemController.authorized.delete
);

module.exports = router;
