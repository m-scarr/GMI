"use strict";

const fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, "../config", "database.json"))[env];
var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
var db = {};

db.init = (cb) => {
    sequelize
        .query(
            "USE " + config.database.toUpperCase() + ";"
        )
        .catch((error) => {
            console.log(error);
        })
        .then((err, res) => {
            fs.readdirSync(__dirname)
                .filter((file) => {
                    return (
                        file.indexOf(".") !== 0 &&
                        file !== "index.js" && file !== "triggers" && file !== "associations"
                    );
                })
                .forEach((file) => {
                    const model = require(path.join(__dirname, file))(
                        sequelize,
                        Sequelize.DataTypes
                    );
                    console.log(model);
                    db[model.name] = model;
                });
            Object.keys(db).forEach((modelName) => {
                if ("associate" in db[modelName]) {
                    db[modelName].associate(db);
                }
            });
            require("./associations")(db);
            require("./triggers")(db);
            sequelize
                .sync()
                .catch((error) => {
                    console.log(error);
                })
                .then(() => {
                    //require("./mockData.js")(db);
                    if (typeof cb == "function") {
                        cb();
                    }
                });
        });
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;