module.exports = function (sequelize, Sequelize) {
    var Locale = sequelize.define("Locale", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        name: {
            type: Sequelize.STRING(255),
            defaultValue: "New Locale"
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
        markerSrc: {
            type: Sequelize.STRING(1027),
            defaultValue: "./assets/locale.png"
        },
        mapSrc: {
            type: Sequelize.STRING(1027),
            defaultValue: "./assets/noimage.png"
        },
        notes: {
            type: Sequelize.STRING(1027),
            defaulValue: ""
        }
    });
    return Locale;
};