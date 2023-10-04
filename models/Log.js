module.exports = function (sequelize, Sequelize) {
    var Log = sequelize.define("Log", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        text: {
            type: Sequelize.STRING(1027),
            default: ""
        },
    });
    return Log;
};