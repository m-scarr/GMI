module.exports = (db) => {
    db.GroupMember.belongsTo(db.Group, { as: "group", foreignKey: "groupId" })
    db.GroupMember.belongsTo(db.Character, { as: "character", foreignKey: "characterId" })
}