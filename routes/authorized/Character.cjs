const characterController = require("../../controllers/Character.cjs");
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
      "typeName",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [{ type: "Game", id: req.preparedData.gameId }]
    );
    req.preparedData.name = "New " + req.preparedData.typeName;
    req.preparedData.markerSrc =
      "./assets/" + req.preparedData.typeName.toLowerCase() + ".png";
    if (!permissionRequest.permitted) {
      res.json(false);
      return;
    }
    next();
  },

  update: async (req, res, next) => {
    if (
      !req.body.gameMasterMode &&
      ("playerUsername" in req.body ||
        "playerWritePermission" in req.body ||
        "visible" in req.body ||
        "unique" in req.body)
    ) {
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
      "hp",
      "maxHp",
      "playerUsername",
      "playerWritePermission",
    ]);
    const permissionRequest = await permissionsController.verifyPermission(
      req.user.id,
      req.body.gameMasterMode,
      [{ type: "Character", id: req.body.id }]
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
      [{ type: "Character", id: req.query.id }]
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
  characterController.authorized.create
);
router.get("/read", characterController.authorized.read);
router.get(
  "/readByUser",
  characterController.authorized.readByUser
);
router.put(
  "/update",
  permissionMiddleWare.update,
  characterController.authorized.update
);
router.delete(
  "/delete",
  permissionMiddleWare.delete,
  characterController.authorized.delete
);

module.exports = router;
