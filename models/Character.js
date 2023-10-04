module.exports = function (sequelize, Sequelize) {
    var Character = sequelize.define("Character", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        category: {
            type: Sequelize.ENUM,
            values: ['heroes', 'npcs', 'enemies'],
        },
        name: {
            type: Sequelize.STRING(255),
            defaultValue: ""
        },
        unique: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        localeId: {
            type: Sequelize.INTEGER,
        },
        x: {
            type: Sequelize.INTEGER,
        },
        y: {
            type: Sequelize.INTEGER,
        },
        visible: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        hp: {
            type: Sequelize.INTEGER,
            defaultValue: 10,
        },
        maxHp: {
            type: Sequelize.INTEGER,
            defaultValue: 10,
        },
        playerUserId: { type: Sequelize.INTEGER, },
        playerWritePermission: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        markerSrc: {
            type: Sequelize.STRING(1027),
            defaultValue: ""
        },
    });
    return Character;
};