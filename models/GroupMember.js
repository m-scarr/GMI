module.exports = function (sequelize, Sequelize) {
    var GroupMember = sequelize.define("GroupMember", {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
    });
    return GroupMember;
};