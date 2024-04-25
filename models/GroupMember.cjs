const { DataTypes, Op } = require("sequelize");
module.exports = (sequelize) => {
  const GroupMember = sequelize.define("GroupMember", {
    quantity: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
  });

  GroupMember.associate = (models) => {
    GroupMember.belongsTo(models.Character, {
      foreignKey: "characterId",
      as: "character",
    });
    GroupMember.belongsTo(models.Group, {
      foreignKey: "groupId",
      as: "group",
    });
  };

  GroupMember.initializeHooks = (models) => {
    models.GroupMember.afterCreate((groupMember) => {
      models.Character.findByPk(groupMember.dataValues.characterId).then(
        (character) => {
          if (character.dataValues.unique) {
            models.GroupMember.destroy({
              where: {
                characterId: character.dataValues.id,
                id: { [Op.ne]: groupMember.dataValues.id },
              },
            });
          }
        }
      );
    });
    models.GroupMember.afterUpdate((groupMember) => {
      if (
        groupMember.dataValues.quantity !==
          groupMember._previousDataValues.quantity &&
        groupMember.dataValues.quantity <= 0
      ) {
        groupMember.destroy();
      }
    });
  };

  return GroupMember;
};
