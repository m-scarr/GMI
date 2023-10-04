module.exports = (db) => {
    require("./User")(db);
    require("./Game")(db);
    require("./Battlefield")(db);
    require("./Cache")(db);
    require("./Character")(db);
    require("./Combatant")(db);
    require("./Event")(db);
    require("./InventoryItem")(db);
    require("./NativeItem")(db);
    require("./Log")(db);
    require("./Stat")(db);
    require("./Locale")(db);
    require("./Group")(db);
    require("./GroupMember")(db);
}