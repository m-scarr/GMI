const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      defaultValue: "New Game",
      allowNull: false,
    },
    overworldId: {
      type: DataTypes.INTEGER,
    },
  });

  Game.associate = (models) => {
    Game.hasMany(models.Battlefield, {
      foreignKey: "gameId",
      as: "battlefields",
    });
    Game.hasMany(models.Cache, {
      foreignKey: "gameId",
      as: "caches",
    });
    Game.hasMany(models.Character, {
      foreignKey: "gameId",
      as: "characters",
    });
    Game.hasMany(models.Event, {
      foreignKey: "gameId",
      as: "events",
    });
    Game.hasMany(models.Group, {
      foreignKey: "gameId",
      as: "groups",
    });
    Game.hasMany(models.NativeItem, {
      foreignKey: "gameId",
      as: "nativeItems",
    });
    Game.hasMany(models.Locale, {
      foreignKey: "gameId",
      as: "locales",
    });
    Game.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  Game.initializeHooks = (models) => {
    models.Game.afterCreate((game) => {
      models.Locale.create(
        {
          name: "Overworld Locale",
          mapSrc: "./assets/defaultMap.jpeg",
          gameId: game.dataValues.id,
        },
        { returning: ["id"] }
      ).then((res) => {
        game.update({ overworldId: res.dataValues.id });
      });
    });
  };

  return Game;
};
