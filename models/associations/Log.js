module.exports = (db) => {
    db.Log.belongsTo(db.NativeItem, { as: "item", foreignKey: "itemId" })
    db.Log.belongsTo(db.Character, { as: "character", foreignKey: "characterId" })
    db.Log.belongsTo(db.Locale, { as: "locale", foreignKey: "localeId" })
    db.Log.belongsTo(db.Event, { as: "event", foreignKey: "eventId" })
    db.Log.belongsTo(db.Battlefield, { as: "battlefield", foreignKey: "battlefieldId" })
    db.Log.belongsTo(db.Cache, { as: "cache", foreignKey: "cacheId" })
    db.Log.belongsTo(db.Group, { as: "group", foreignKey: "groupId" })
}