module.exports = (db) => {
    db.Group.belongsTo(db.Game, { as: "game", foreignKey: "gameId" })
    db.Group.hasMany(db.GroupMember, { as: "members", foreignKey: "groupId", onDelete: "CASCADE" })
    db.Group.hasMany(db.Log, { as: "logs", foreignKey: "groupId", onDelete: "CASCADE" })
}