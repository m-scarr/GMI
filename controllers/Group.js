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
                db.Group.create({ gameId: req.body.gameId }).then((response) => { res.json(response) })
            },
            update: (db, req, res) => {
                reqData = limitAttributes(req.body, ["name", "unique", "markerSrc", "localeId", "x", "y", "visible", "notes"]);
                db.Group.findByPk(req.body.id).then((group) => {
                    group.update(reqData).then(() => {
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
                db.Group.destroy({ where: { id: req.query.id } }).then((result) => {
                    res.json((result > 0));
                }).catch((err) => {
                    console.log(err);
                    res.json(false);
                })
            }
        }
    }
}
