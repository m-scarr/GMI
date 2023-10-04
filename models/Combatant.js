module.exports = function (sequelize, Sequelize) {
    var Combatant = sequelize.define("Combatant", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        x: {
            type: Sequelize.INTEGER,
        },
        y: {
            type: Sequelize.INTEGER,
        },
        hp: {
            type: Sequelize.INTEGER,
            defaultValue: 10
        },
        visible: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        ally: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        scale: {
            type: Sequelize.DECIMAL(3, 2),
            defaultValue: 1
        },
    });
    return Combatant;
};