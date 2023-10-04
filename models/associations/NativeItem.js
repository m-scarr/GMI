module.exports = (db) => {
    db.NativeItem.belongsTo(db.Game, { as: "game", foreignKey: "gameId" })
    db.NativeItem.hasMany(db.InventoryItem, { as: "inventoryItems", foreignKey: "itemId", onDelete: "CASCADE" })
    db.NativeItem.hasMany(db.Stat, { as: "stats", foreignKey: "itemId", onDelete: "CASCADE" })
    db.NativeItem.hasMany(db.Log, { as: "logs", foreignKey: "itemId", onDelete: "CASCADE" })
}