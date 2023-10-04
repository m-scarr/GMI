module.exports = (db) => {
    require("./Game")(db);
    require("./Character")(db);
    require("./GroupMember")(db);
    require("./InventoryItem")(db);
    require("./NativeItem")(db);
}