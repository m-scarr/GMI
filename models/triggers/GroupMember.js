module.exports = (db) => {
    db.GroupMember.afterCreate((groupMember) => {
        db.Character.findByPk(groupMember.dataValues.characterId).then((character) => {
            if (character.dataValues.unique) {
                db.GroupMember.destroy({ where: { characterId: character.dataValues.id, id: { [db.Sequelize.Op.ne]: groupMember.dataValues.id } } })
            }
        })
    })
    db.GroupMember.afterUpdate((groupMember) => {
        if (groupMember.dataValues.quantity !== groupMember._previousDataValues.quantity && groupMember.dataValues.quantity <= 0) {
            groupMember.destroy();
        }
    })
}