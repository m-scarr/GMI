const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    logInName: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    displayName: { type: DataTypes.STRING(255) },
    email: { type: DataTypes.STRING(255) },
    password: { type: DataTypes.STRING },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Character, {
      foreignKey: "playerUserId",
      as: "playerCharacters",
    });
    User.hasMany(models.Game, {
      foreignKey: "userId",
      as: "games",
    });
  };

  return User;
};
