const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Battlefield = sequelize.define("Battlefield", {
    name: {
      type: DataTypes.STRING,
      defaultValue: "New Battlefield",
      allowNull: false,
    },
    x: { type: DataTypes.INTEGER },
    y: { type: DataTypes.INTEGER },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    scale: {
      type: DataTypes.INTEGER,
      defaultValue: 96,
      validate: {
        isInt: true,
        min: 16,
        max: 1600,
      },
      allowNull: false,
    },
    mapSrc: {
      type: DataTypes.STRING,
      defaultValue: "./assets/noimage.png",
      allowNull: false,
    },
    markerSrc: {
      type: DataTypes.STRING,
      defaultValue: "./assets/battlefield.png",
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  });

  Battlefield.associate = (models) => {
    Battlefield.hasMany(models.Log, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Battlefield",
      },
      as: "logs",
    });

    Battlefield.hasMany(models.Combatant, {
      foreignKey: "battlefieldId",
      as: "combatants",
    });
    Battlefield.belongsTo(models.Locale, {
      foreignKey: "localeId",
      as: "locale",
    });
    Battlefield.belongsTo(models.Game, { foreignKey: "gameId", as: "game" });
  };

  return Battlefield;
};
