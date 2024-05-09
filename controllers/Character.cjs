const db = require("../models/index.cjs");

module.exports = {
  unauthorized: {},
  authorized: {
    create: async (req, res) => {
      try {
        const newCharacter = await db.Character.create(req.preparedData);
        res.json(newCharacter);
        return;
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
    read: async (req, res) => {
      try {
        const character = await db.Character.findOne({
          where: { playerUserId: req.user.id, id: req.query.characterId },
          include: [
            { model: db.Log, as: "logs", order: [["createdAt", "ASC"]] },
            { model: db.InventoryItem, as: "inventoryItems" },
            {
              model: db.GroupMember,
              as: "groupMembers",
              include: [{ model: db.Group, as: "group" }],
            },
            { model: db.Combatant, as: "combatants" },
          ],
        });

        if (!character) {
          res.json(false);
          return;
        }

        const nativeItems = await db.NativeItem.findAll({
          where: { gameId: character.gameId },
          include: [{ model: db.Stat, as: "stats" }],
        });

        const battlefieldIds = character.combatants.map(
          (combatant) => combatant.battlefieldId
        );
        
        const battlefields = await db.Battlefield.findAll({
          where: { id: battlefieldIds },
          include: [
            {
              model: db.Combatant,
              as: "combatants",
              include: [{ model: db.Character, as: "character" }],
            },
          ],
        });

        const localeId =
          character.groupMembers.length > 0
            ? character.groupMembers[0].group.localeId
            : character.localeId;

        const locale = await db.Locale.findOne({ where: { id: localeId } });
        res.json({
          character: { ...character.dataValues },
          nativeItems: [...nativeItems],
          locale: { ...locale.dataValues },
          battlefields: [...battlefields],
        });
        return;
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
    readByUser: async (req, res) => {
      try {
        const characters = await db.Character.findAll({
          where: { playerUserId: req.user.id },
          attributes: ["id", "name"],
        });
        res.json(characters);
      } catch (err) {
        console.error(err);
        res.json(false);
        return;
      }
    },
    update: async (req, res) => {
      if (req.body.gameMasterMode && "playerUsername" in req.preparedData) {
        try {
          const playerUser = await db.User.findOne({
            where: { logInName: req.preparedData.playerUsername },
          });
          if (playerUser == null) {
            res.json(false);
            return;
          }
          req.entity.update({ playerUserId: playerUser.dataValues.id });
          res.json(true);
        } catch (err) {
          console.error(err);
          res.json(false);
        }
      } else {
        try {
          await req.entity.update(req.preparedData);
          res.json(true);
        } catch (err) {
          console.error(err);
          res.json(false);
        }
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
