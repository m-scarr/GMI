module.exports = function (sequelize, Sequelize) {
    var Game = sequelize.define("Game", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        name: {
            type: Sequelize.STRING(255),
            defaultValue: "New Game"
        },
        overworldId: { type: Sequelize.INTEGER }
    });
    return Game;
};