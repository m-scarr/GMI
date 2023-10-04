module.exports = (db) => {
    db.Combatant.belongsTo(db.Battlefield, { as: "battlefield", foreignKey: "battlefieldId" })
    db.Combatant.belongsTo(db.Character, { as: "character", foreignKey: "characterId" })
}