module.exports = function (sequelize, Sequelize) {
    var Battlefield = sequelize.define("Battlefield", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        name: {
            type: Sequelize.STRING(255),
            defaultValue: "New Battlefield"
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
        scale: {
            type: Sequelize.DECIMAL(3, 2),
            defaultValue: 1
        },
        mapSrc: {
            type: Sequelize.STRING(1027),
            defaultValue: "./assets/noimage.png"
        },
        markerSrc: {
            type: Sequelize.STRING(1027),
            defaultValue: "./assets/battlefield.png"
        },
        notes: {
            type: Sequelize.STRING(1027),
            defaultValue: ""
        }
    });
    return Battlefield;
};