module.exports = (db) => {
    db.Event.belongsTo(db.Game, { as: "game", foreignKey: "gameId" })
    db.Event.hasMany(db.Log, { as: "logs", foreignKey: "eventId", onDelete: "CASCADE" })
}