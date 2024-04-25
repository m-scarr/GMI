const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Cache = sequelize.define("Cache", {
    name: {
      type: DataTypes.STRING,
      defaultValue: "New Cache",
      allowNull: false,
    },
    x: { type: DataTypes.INTEGER },
    y: { type: DataTypes.INTEGER },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    markerSrc: {
      type: DataTypes.STRING,
      defaultValue: "./assets/cache.png",
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  });

  Cache.associate = (models) => {
    Cache.hasMany(models.Log, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Cache",
      },
      as: "logs",
    });
    Cache.hasMany(models.InventoryItem, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Cache",
      },
      as: "inventoryItems",
    });
    Cache.belongsTo(models.Game, { foreignKey: "gameId", as: "game" });
    Cache.belongsTo(models.Locale, { foreignKey: "localeId", as: "locale" });
  };

  return Cache;
};
