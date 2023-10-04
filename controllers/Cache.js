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
                db.Cache.create({ gameId: req.body.gameId }).then((response) => { res.json(response) })
            },
            update: (db, req, res) => {
                reqData = limitAttributes(req.body, ["name", "visible", "markerSrc", "localeId", "x", "y", "notes"]);
                db.Cache.update(reqData, { where: { id: req.body.id } }).then((result) => {
                    res.json((result[0] > 0));
                }).catch((err) => {
                    console.log(err);
                    res.json(false);
                })
            }
        },
        delete: {
            delete: (db, req, res) => {
                db.Cache.destroy({ where: { id: req.query.id } }).then((result) => {
                    res.json((result > 0));
                }).catch((err) => {
                    console.log(err);
                    res.json(false);
                })
            }
        }
    }
}
