const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Event = sequelize.define("Event", {
    name: {
      type: DataTypes.STRING,
      defaultValue: "New Event",
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
      defaultValue: "./assets/event.png",
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  });

  Event.associate = (models) => {
    Event.hasMany(models.Log, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Event",
      },
      as: "logs",
    });
    Event.belongsTo(models.Game, {
      foreignKey: "gameId",
      as: "game",
    });
    Event.belongsTo(models.Locale, {
      foreignKey: "localeId",
      as: "locale",
    });
  };

  return Event;
};
