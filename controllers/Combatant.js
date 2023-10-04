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
        get: {},
        post: {
            create: (db, req, res) => {
                var reqData = limitAttributes(req.body, ["x", "y", "characterId", "battlefieldId", "ally", "hp"])
                db.Combatant.create(reqData).then((response) => { res.json(response) })
            },
            update: (db, req, res) => {
                reqData = limitAttributes(req.body, ["x", "y", "hp", "scale", "visible"]);
                db.Combatant.findByPk(req.body.id).then((combatant) => {
                    combatant.update(reqData).then(() => {
                        res.json(true);
                    }).catch((err) => {
                        console.log(err);
                        res.json(false);
                    })
                }).catch((err) => {
                    console.log(err);
                    res.json(false);
                })
            }
        },
        delete: {
            delete: (db, req, res) => {
                db.Combatant.destroy({ where: { id: req.query.id } }).then((result) => {
                    console.log((result > 0))
                    res.json((result > 0));
                }).catch((err) => {
                    console.log(err);
                    res.json(false);
                })
            }
        }
    }
}
