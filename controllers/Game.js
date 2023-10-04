const limitAttributes = require("./limitAttributes")

module.exports = {
    unauthorized: {
        get: {
        },
        post: {
        },
        delete: {
        }
    },
    authorized: {
        get: {
            readAll: (db, req, res) => {
                db.Game.findAll({ where: { userId: req.user.id } }).then((response) => { res.json(response) })
            },
            read: (db, req, res) => {
                console.log(req.query.id)
                db.Game.findByPk(req.query.id, {
                    include: [{
                        model: db.Character, as: "characters", include: [
                            { model: db.Log, as: "logs" },
                            { model: db.InventoryItem, as: "inventory" }
                        ]
                    },
                    {
                        model: db.Group, as: "groups", include: [
                            { model: db.Log, as: "logs" },
                            { model: db.GroupMember, as: "members" }
                        ]
                    },
                    {
                        model: db.Cache, as: "caches", include: [
                            { model: db.Log, as: "logs" },
                            { model: db.InventoryItem, as: "inventory" }
                        ]
                    },
                    {
                        model: db.NativeItem, as: "nativeItems", include: [
                            { model: db.Log, as: "logs" },
                            { model: db.Stat, as: "stats" }
                        ]
                    },
                    {
                        model: db.Battlefield, as: "battlefields", include: [
                            { model: db.Log, as: "logs" },
                            { model: db.Combatant, as: "combatants" },
                        ]
                    },
                    {
                        model: db.Event, as: "events", include: [
                            { model: db.Log, as: "logs" },
                        ]
                    },
                    {
                        model: db.Locale, as: "locales", include: [
                            { model: db.Log, as: "logs" },
                        ]
                    }]
                }).then((response) => {
                    console.log(response)
                    res.json(response)
                })
            }
        },
        post: {
            create: (db, req, res) => {
                db.Game.create({ userId: req.user.id }).then((response) => { res.json(response) })
            },
            update: (db, req, res) => {
                reqData = limitAttributes(req.body, ["name"]);
                db.Game.update(reqData, { where: { id: req.body.id } }).then((result) => {
                    res.json((result[0] > 0));
                }).catch((err) => {
                    console.log(err);
                    res.json(false);
                })
            }
        },
        delete: {
            delete: (db, req, res) => {
                db.Game.destroy({ where: { id: req.query.id } }).then((result) => {
                    res.json((result > 0));
                }).catch((err) => {
                    console.log(err);
                    res.json(false);
                })
            }
        }
    }
}
