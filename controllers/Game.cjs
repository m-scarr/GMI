const db = require("../models/index.cjs");

module.exports = {
  unauthorized: {},
  authorized: {
    create: async (req, res) => {
      try {
        const newGame = await db.Game.create(req.preparedData);
        res.json(newGame);
        return;
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
    read: async (req, res) => {
      try {
        const game = await db.Game.findOne({
          where: { id: req.query.id, userId: req.user.id },
          include: [
            {
              model: db.Character,
              as: "characters",
              include: [
                { model: db.Log, as: "logs" },
                { model: db.InventoryItem, as: "inventoryItems" },
              ],
            },
            {
              model: db.Group,
              as: "groups",
              include: [
                { model: db.Log, as: "logs" },
                { model: db.GroupMember, as: "groupMembers" },
              ],
            },
            {
              model: db.Cache,
              as: "caches",
              include: [
                { model: db.Log, as: "logs" },
                { model: db.InventoryItem, as: "inventoryItems" },
              ],
            },
            {
              model: db.NativeItem,
              as: "nativeItems",
              include: [
                { model: db.Log, as: "logs" },
                { model: db.Stat, as: "stats" },
              ],
            },
            {
              model: db.Battlefield,
              as: "battlefields",
              include: [
                { model: db.Log, as: "logs" },
                { model: db.Combatant, as: "combatants" },
              ],
            },
            {
              model: db.Event,
              as: "events",
              include: [{ model: db.Log, as: "logs" }],
            },
            {
              model: db.Locale,
              as: "locales",
              include: [{ model: db.Log, as: "logs" }],
            },
          ],
        });
        res.json(game !== null ? game : false);
        return;
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
    readByUser: async (req, res) => {
      try {
        const games = await db.Game.findAll({
          where: { userId: req.user.id },
          attributes: ["id", "name", "overworldId", "createdAt", "updatedAt"],
        });
        res.json(games);
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
    update: async (req, res) => {
      try {
        const [rowsAffected] = await db.Game.update(req.preparedData, {
          where: { id: req.body.id, userId: req.user.id },
        });
        res.json(rowsAffected > 0);
        return;
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
    delete: async (req, res) => {
      try {
        const result = await db.Game.destroy({
          where: { id: req.query.id, userId: req.user.id },
        });
        res.json(result > 0);
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
  },
};
