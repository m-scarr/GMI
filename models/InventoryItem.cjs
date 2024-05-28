const { DataTypes, Op } = require("sequelize");
module.exports = (sequelize) => {
  const InventoryItem = sequelize.define("InventoryItem", {
    equipped: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
    ownerCategory: {
      type: DataTypes.ENUM("Cache", "Character"),
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  InventoryItem.associate = (models) => {
    InventoryItem.belongsTo(models.Cache, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Cache",
      },
    });

    InventoryItem.belongsTo(models.Character, {
      foreignKey: "ownerId",
      constraints: false,
      scope: {
        ownerCategory: "Character",
      },
    });

    InventoryItem.belongsTo(models.NativeItem, {
      foreignKey: "nativeItemId",
      as: "nativeItem",
    });
  };

  InventoryItem.initializeHooks = (models) => {
    models.InventoryItem.afterCreate((inventoryItem) => {
      models.InventoryItem.findAll({
        where: {
          nativeItemId: inventoryItem.dataValues.nativeItemId,
          ownerCategory: inventoryItem.dataValues.ownerCategory,
          ownerId: inventoryItem.dataValues.ownerId,
          id: { [Op.ne]: inventoryItem.dataValues.id },
        }
      }).then((result) => {
        result.forEach((item) => {
          item.destroy();
        });
      });
      models.NativeItem.findByPk(inventoryItem.dataValues.nativeItemId).then(
        (item) => {
          if (item.dataValues.unique) {
            models.InventoryItem.destroy({
              where: {
                nativeItemId: item.dataValues.id,
                id: { [Op.ne]: inventoryItem.dataValues.id },
              },
            });
          }
        }
      );
    });
    models.InventoryItem.afterUpdate((inventoryItem) => {
      if (
        inventoryItem.dataValues.quantity !==
        inventoryItem._previousDataValues.quantity &&
        inventoryItem.dataValues.quantity <= 0
      ) {
        inventoryItem.destroy();
      }
    });
  };

  return InventoryItem;
};
