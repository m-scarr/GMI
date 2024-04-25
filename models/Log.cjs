const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Log = sequelize.define(
    "Log",
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerCategory: {
        type: DataTypes.ENUM(
          "Battlefield",
          "Cache",
          "Character",
          "Event",
          "Group",
          "Locale",
          "NativeItem"
        ),
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      updatedAt: false,
    }
  );

  Log.associate = (models) => {
    Log.belongsTo(models.Battlefield, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Battlefield",
      },
    });

    Log.belongsTo(models.Cache, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Cache",
      },
    });

    Log.belongsTo(models.Character, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Character",
      },
    });

    Log.belongsTo(models.Event, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Event",
      },
    });

    Log.belongsTo(models.Group, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Group",
      },
    });

    Log.belongsTo(models.Locale, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Locale",
      },
    });

    Log.belongsTo(models.NativeItem, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "NativeItem",
      },
    });
  };

  return Log;
};
