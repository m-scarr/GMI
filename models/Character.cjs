const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Character = sequelize.define("Character", {
    name: {
      type: DataTypes.STRING,
      defaultValue: "New Character",
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("Hero", "NPC", "Enemy"),
      allowNull: false,
    },
    unique: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
    x: { type: DataTypes.INTEGER },
    y: { type: DataTypes.INTEGER },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    hp: { type: DataTypes.INTEGER, defaultValue: 10, allowNull: false },
    maxHp: { type: DataTypes.INTEGER, defaultValue: 10, allowNull: false },
    playerWritePermission: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    markerSrc: {
      type: DataTypes.STRING,
      defaultValue: "./assets/noimage.png",
      allowNull: false,
    },
  });

  Character.associate = (models) => {
    Character.hasMany(models.Log, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Character",
      },
      as: "logs",
    });
    Character.hasMany(models.InventoryItem, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Character",
      },
      as: "inventoryItems",
    });
    Character.belongsTo(models.Game, { foreignKey: "gameId", as: "game" });
    Character.belongsTo(models.Locale, {
      foreignKey: "localeId",
      as: "locale",
    });
    Character.hasMany(models.Combatant, {
      foreignKey: "characterId",
      as: "combatants",
    });
    Character.hasMany(models.GroupMember, {
      foreignKey: "characterId",
      as: "groupMembers",
    });
    Character.belongsTo(models.User, {
      foreignKey: "playerUserId",
      as: "playerUser",
    });
  };

  Character.initializeHooks = (models) => {
    models.Character.afterUpdate((character) => {
      // trigger for unique
      if (
        character.dataValues.unique !== character._previousDataValues.unique
      ) {
        models.GroupMember.destroy({
          where: { characterId: character.dataValues.id },
        });
        models.Combatant.destroy({
          where: { characterId: character.dataValues.id },
        });
        models.InventoryItem.destroy({
          where: { ownerCategory: "Character", ownerId: character.dataValues.id },
        });
      }
      // trigger for hp, this actually may not matter at all because of the way the front end is managed
      if (character.dataValues.hp !== character._previousDataValues.hp && character.dataValues.unique) {
        models.Combatant.update(
          { hp: character.dataValues.hp },
          { where: { characterId: character.dataValues.id } }
        );
      }
    });
  };

  return Character;
};
