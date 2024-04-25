const groupMemberController = require("../../controllers/GroupMember.cjs");
const permissionsController = require("./permissions.cjs");

const router = require("express").Router();

const permissionMiddleWare = {
  create: async (req, res, next) => {
    req.preparedData = permissionsController.limitAttributes(req.body, [
      "groupId",
      "characterId",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [
        req.body.gameMasterMode
          ? { type: "Group", id: req.preparedData.groupId }
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
    if (!req.body.gameMasterMode) {
      res.json(false);
      return;
    }
    req.preparedData = permissionsController.limitAttributes(req.body, [
      "quantity",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [
        { type: "GroupMember", id: req.body.id },
        req.body.gameMasterMode
          ? { type: "Group", idField: "groupId" }
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
    if (!req.query.gameMasterMode) {
      res.json(false);
      return;
    }
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [
        { type: "GroupMember", id: req.body.id },
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
};

router.post(
  "/create",
  permissionMiddleWare.create,
  groupMemberController.authorized.create
);
router.put(
  "/update",
  permissionMiddleWare.update,
  groupMemberController.authorized.update
);
router.delete(
  "/delete",
  permissionMiddleWare.delete,
  groupMemberController.authorized.delete
);

module.exports = router;
