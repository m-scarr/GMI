const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Combatant = sequelize.define("Combatant", {
    x: { type: DataTypes.INTEGER },
    y: { type: DataTypes.INTEGER },
    hp: { type: DataTypes.INTEGER, defaultValue: 10 },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    ally: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    scale: {
      type: DataTypes.INTEGER,
      defaultValue: 48,
      validate: {
        isInt: true,
        min: 16,
        max: 1600,
      },
      allowNull: false,
    },
  });
  Combatant.associate = (models) => {
    Combatant.belongsTo(models.Battlefield, {
      foreignKey: "battlefieldId",
      as: "battlefield",
    });
    Combatant.belongsTo(models.Character, {
      foreignKey: "characterId",
      as: "character",
    });
  };
  return Combatant;
};
