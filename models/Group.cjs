const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Group = sequelize.define("Group", {
    name: {
      type: DataTypes.STRING,
      defaultValue: "New Group",
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
      defaultValue: "./assets/group.png",
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  });

  Group.associate = (models) => {
    Group.hasMany(models.Log, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Group",
      },
      as: "logs",
    });
    Group.belongsTo(models.Game, {
      foreignKey: "gameId",
      as: "game",
    });
    Group.belongsTo(models.Locale, {
      foreignKey: "localeId",
      as: "locale",
    });
    Group.hasMany(models.GroupMember, {
      foreignKey: "groupId",
      as: "groupMembers",
    });
  };

  return Group;
};
