module.exports = (db) => {
    db.Stat.belongsTo(db.NativeItem, { as: "item", foreignKey: "itemId" })
}