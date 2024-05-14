const db = require("../../models/index.cjs");

const permissions = {
  limitAttributes: (data, attributes) => {
    const newData = {};
    attributes.forEach((attribute) => {
      if (attribute in data) {
        newData[attribute] = data[attribute];
      }
    });
    return newData;
  },
  verifyPermission: async (userId, gameMasterMode, entityList) => {
    const entities = [];
    let i = 0;
    let currentEntity = { dataValues: {} };
    if (entityList[0].type != (gameMasterMode ? "Game" : "Character")) {
      while (
        i < entityList.length &&
        !(
          (gameMasterMode ? "gameId" : "characterId") in
          currentEntity.dataValues
        )
      ) {
        try {
          console.log(entityList[i])
          currentEntity = await db[entityList[i].type].findOne({
            where: {
              id:
                "id" in entityList[i]
                  ? entityList[i].id
                  : currentEntity.dataValues[entityList[i].idField],
            },
            logging: false,
          });
          if (currentEntity == null) {
            return { permitted: false };
          }
          entities.push(currentEntity);
          i++;
        } catch (err) {
          console.error(err);
          return { permitted: false };
        }
      }
    } else {
      currentEntity.dataValues[gameMasterMode ? "gameId" : "characterId"] =
        entityList[0].id;
    }
    if (i <= entityList.length) {
      try {
        const gameOrCharacter = await db[
          gameMasterMode ? "Game" : "Character"
        ].findOne({
          where: gameMasterMode
            ? {
                id: currentEntity.dataValues.gameId,
                userId,
              }
            : {
                id: currentEntity.dataValues.characterId,
                playerUserId: userId,
                playerWritePermission: true,
              },
          logging: false,
        });
        if (gameOrCharacter == null) {
          return { permitted: false };
        }
        entities.push(gameOrCharacter);
        return { permitted: true, entities };
      } catch (err) {
        console.error(err);
        return { permitted: false };
      }
    }
    return { permitted: false };
  },
};

module.exports = permissions;
