module.exports = function (sequelize, Sequelize) {
    var InventoryItem = sequelize.define("InventoryItem", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        equipped: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    });
    return InventoryItem;
};