module.exports = (db) => {
    db.Battlefield.belongsTo(db.Game, { as: "game", foreignKey: "gameId" })
    db.Battlefield.hasMany(db.Combatant, { as: "combatants", foreignKey: "battlefieldId", onDelete: "CASCADE" })
    db.Battlefield.hasMany(db.Log, { as: "logs", foreignKey: "battlefieldId", onDelete: "CASCADE" })
}