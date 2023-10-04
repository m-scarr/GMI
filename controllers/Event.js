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
                db.Event.create({ gameId: req.body.gameId }).then((response) => { res.json(response) })
            },
            update: (db, req, res) => {
                reqData = limitAttributes(req.body, ["name", "visible", "markerSrc", "localeId", "x", "y", "notes"]);
                db.Event.findByPk(req.body.id).then((event) => {
                    event.update(reqData).then(() => {
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
                db.Event.destroy({ where: { id: req.query.id } }).then((result) => {
                    res.json((result > 0));
                }).catch((err) => {
                    console.log(err);
                    res.json(false);
                })
            }
        }
    }
}
