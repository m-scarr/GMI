const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const NativeItem = sequelize.define("NativeItem", {
    name: {
      type: DataTypes.STRING,
      defaultValue: "New Item",
      allowNull: false,
    },
    unique: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
    equippable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    currency: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    iconSrc: {
      type: DataTypes.STRING,
      defaultValue: "./assets/loot.png",
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  });

  NativeItem.associate = (models) => {
    NativeItem.hasMany(models.Log, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "NativeItem",
      },
      as: "logs",
    });
    NativeItem.hasMany(models.InventoryItem, {
      foreignKey: "nativeItemId",
      as: "inventoryItems",
    });
    NativeItem.belongsTo(models.Game, {
      foreignKey: "gameId",
      as: "game",
    });
    NativeItem.hasMany(models.Stat, {
      foreignKey: "nativeItemId",
      as: "stats",
    });
  };

  NativeItem.initializeHooks = (models) => {
    models.NativeItem.afterUpdate((item) => {
      if (item.dataValues.unique !== item._previousDataValues.unique) {
        models.InventoryItem.destroy({
          where: { nativeItemId: item.dataValues.id },
        });
        if (item.dataValues.unique) {
          item.update({ currency: false });
        }
      }
      if (
        item.dataValues.currency !== item._previousDataValues.currency &&
        item.dataValues.currency
      ) {
        item.update({ equippable: false, unique: false });
      }
      if (
        item.dataValues.equippable !== item._previousDataValues.equippable &&
        item.dataValues.equippable
      ) {
        item.update({ currency: false });
      }
    });
  };

  return NativeItem;
};
