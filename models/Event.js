module.exports = function (sequelize, Sequelize) {
    var Event = sequelize.define("Event", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        name: {
            type: Sequelize.STRING(255),
            defaultValue: "New Event"
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
            defaultValue: "./assets/event.png"
        },
        notes: {
            type: Sequelize.STRING(1027),
            defaultValue: ""
        },
    });
    return Event;
};