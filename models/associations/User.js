module.exports = (db) => {
    db.User.hasMany(db.Game, { as: "games", foreignKey: "userId", onDelete: "CASCADE" })
}