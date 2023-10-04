module.exports = function (sequelize, Sequelize) {
    var NativeItem = sequelize.define("NativeItem", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        name: {
            type: Sequelize.STRING(255),
            defaultValue: "New Item"
        },
        unique: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        equippable: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        currency: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        iconSrc: {
            type: Sequelize.STRING(1027),
            defaultValue: "./assets/loot.png"
        },
        notes: {
            type: Sequelize.STRING(1027),
            defaultValue: ""
        },
    });
    return NativeItem;
};