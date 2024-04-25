const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Locale = sequelize.define("Locale", {
    name: {
      type: DataTypes.STRING,
      defaultValue: "New Locale",
      allowNull: false,
    },
    localeId: { type: DataTypes.INTEGER },
    x: { type: DataTypes.INTEGER },
    y: { type: DataTypes.INTEGER },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    markerSrc: {
      type: DataTypes.STRING,
      defaultValue: "./assets/locale.png",
      allowNull: false,
    },
    mapSrc: {
      type: DataTypes.STRING,
      defaultValue: "./assets/noimage.png",
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  });

  Locale.associate = (models) => {
    Locale.hasMany(models.Log, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Locale",
      },
      as: "logs",
    });
    Locale.hasMany(models.Battlefield, {
      foreignKey: "localeId",
      as: "battlefields",
    });
    Locale.hasMany(models.Cache, {
      foreignKey: "localeId",
      as: "caches",
    });
    Locale.hasMany(models.Character, {
      foreignKey: "localeId",
      as: "characters",
    });
    Locale.hasMany(models.Event, {
      foreignKey: "localeId",
      as: "events",
    });
    Locale.hasMany(models.Group, {
      foreignKey: "localeId",
      as: "groups",
    });
    Locale.belongsTo(models.Game, {
      foreignKey: "gameId",
      as: "game",
    });
  };
  Locale.initializeHooks = (models) => {
    models.Locale.beforeDestroy((locale) => {
      models.Character.update(
        { localeId: null },
        { where: { localeId: locale.dataValues.id } }
      );
      models.Group.update(
        { localeId: null },
        { where: { localeId: locale.dataValues.id } }
      );
      models.Cache.update(
        { localeId: null },
        { where: { localeId: locale.dataValues.id } }
      );
      models.Battlefield.update(
        { localeId: null },
        { where: { localeId: locale.dataValues.id } }
      );
      models.Locale.update(
        { localeId: null },
        { where: { localeId: locale.dataValues.id } }
      );
      models.Event.update(
        { localeId: null },
        { where: { localeId: locale.dataValues.id } }
      );
    });
  };
  return Locale;
};
