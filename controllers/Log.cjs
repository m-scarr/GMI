const db = require("../models/index.cjs");

module.exports = {
    unauthorized: {},
    authorized: {
      create: async (req, res) => {
        try {
          const newLog = await db.Log.create(req.preparedData);
          res.json(newLog);
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
  