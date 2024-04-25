const db = require("../models/index.cjs");

module.exports = {
  unauthorized: {},
  authorized: {
    create: async (req, res) => {
      try {
        const newBattlefield = await db.Battlefield.create(req.preparedData);
        res.json(newBattlefield);
        return;
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
    update: async (req, res) => {
      try {
        await req.entity.update(req.preparedData);
        res.json(true);
        return;
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
    delete: async (req, res) => {
      try {
        await req.entity.destroy();
        res.json(true);
        return;
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
  },
};
