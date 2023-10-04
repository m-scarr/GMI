module.exports = (db) => {
    db.Character.afterUpdate((character) => {
        // trigger for unique
        if (character.dataValues.unique !== character._previousDataValues.unique) {
            db.GroupMember.destroy({ where: { characterId: character.dataValues.id } })
            db.Combatant.destroy({ where: { characterId: character.dataValues.id } })
            db.InventoryItem.destroy({ where: { characterId: character.dataValues.id } })

        }
        // trigger for hp
        if (character.dataValues.hp !== character._previousDataValues.hp) {
            db.Combatants.update({ hp: character.dataValues.hp }, { where: { characterId: character.dataValues.id } })
        }
    })
}