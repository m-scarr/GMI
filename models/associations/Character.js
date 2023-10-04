module.exports = (db) => {
    db.Character.belongsTo(db.Game, { as: "game", foreignKey: "gameId" })

    db.Character.hasMany(db.Combatant, { as: "combatants", foreignKey: "characterId", onDelete: "CASCADE" })
    db.Character.hasMany(db.GroupMember, { as: "groupMembers", foreignKey: "characterId", onDelete: "CASCADE" })
    db.Character.hasMany(db.InventoryItem, { as: "inventory", foreignKey: "characterId", onDelete: "CASCADE" })
    db.Character.hasMany(db.Log, { as: "logs", foreignKey: "characterId", onDelete: "CASCADE" })
}