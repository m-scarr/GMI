module.exports = (db) => {
    db.Game.belongsTo(db.User, { as: "user", foreignKey: "userId" });

    db.Game.hasMany(db.Locale, { as: "locales", foreignKey: "gameId", onDelete: "CASCADE" });
    db.Game.hasMany(db.Battlefield, { as: "battlefields", foreignKey: "gameId", onDelete: "CASCADE" });
    db.Game.hasMany(db.Cache, { as: "caches", foreignKey: "gameId", onDelete: "CASCADE" });
    db.Game.hasMany(db.Character, { as: "characters", foreignKey: "gameId", onDelete: "CASCADE" });
    db.Game.hasMany(db.Event, { as: "events", foreignKey: "gameId", onDelete: "CASCADE" });
    db.Game.hasMany(db.NativeItem, { as: "nativeItems", foreignKey: "gameId", onDelete: "CASCADE" });
    db.Game.hasMany(db.Group, { as: "groups", foreignKey: "gameId", onDelete: "CASCADE" });
}