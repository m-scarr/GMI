module.exports = function (sequelize, Sequelize) {
    var Stat = sequelize.define("Stat", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        name: {
            type: Sequelize.STRING(255)
        },
        value: {
            type: Sequelize.STRING(255)
        },
    });
    return Stat;
};