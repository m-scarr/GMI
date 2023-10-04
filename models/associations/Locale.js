module.exports = (db) => {
    db.Locale.belongsTo(db.Game, { as: "game", foreignKey: "gameId" })
    db.Locale.hasMany(db.Log, { as: "logs", foreignKey: "localeId", onDelete: "CASCADE" })
}