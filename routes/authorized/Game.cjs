const gameController = require("../../controllers/Game.cjs");
const permissionsController = require("./permissions.cjs");

const router = require("express").Router();

const permissionMiddleWare = {
  create: async (req, res, next) => {
    req.preparedData = { userId: req.user.id };
    next();
  },

  read: async (req, res, next) => {
    next();
  },

  readByUser: async (req, res, next) => {
    next();
  },

  update: async (req, res, next) => {
    if (!req.body.gameMasterMode || !("name" in req.body)) {
      res.json(false);
      return;
    }
    req.preparedData = permissionsController.limitAttributes(req.body, [
      "name",
    ]);
    next();
  },

  delete: async (req, res, next) => {
    next();
  },
};

router.post(
  "/create",
  permissionMiddleWare.create,
  gameController.authorized.create
);
router.get("/read", permissionMiddleWare.read, gameController.authorized.read);
router.get(
  "/readByUser",
  permissionMiddleWare.readByUser,
  gameController.authorized.readByUser
);
router.put(
  "/update",
  permissionMiddleWare.update,
  gameController.authorized.update
);
router.delete(
  "/delete",
  permissionMiddleWare.delete,
  gameController.authorized.delete
);

module.exports = router;
