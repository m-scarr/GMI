module.exports = (db) => {
    db.Cache.belongsTo(db.Game, { as: "game", foreignKey: "gameId" })
    db.Cache.hasMany(db.Log, { as: "logs", foreignKey: "cacheId", onDelete: "CASCADE" })
    db.Cache.hasMany(db.InventoryItem, { as: "inventory", foreignKey: "cacheId", onDelete: "CASCADE" })
}