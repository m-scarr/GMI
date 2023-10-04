module.exports = (db) => {
    db.InventoryItem.belongsTo(db.NativeItem, { as: "item", foreignKey: "itemId" })
    db.InventoryItem.belongsTo(db.Character, { as: "character", foreignKey: "characterId" })
    db.InventoryItem.belongsTo(db.Cache, { as: "cache", foreignKey: "cacheId" })
}