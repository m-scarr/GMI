const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Stat = sequelize.define("Stat", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Stat.associate = (models) => {
    Stat.belongsTo(models.NativeItem, {
      foreignKey: "nativeItemId",
      as: "nativeItem",
    });
  };

  return Stat;
};
