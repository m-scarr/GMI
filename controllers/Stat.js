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
                var reqData = limitAttributes(req.body, ["itemId","name","value"])
                db.Stat.create(reqData).then((response) => { res.json(response) })
            },
        },
        delete: {
            delete: (db, req, res) => {
                db.Stat.destroy({ where: { id: req.query.id } }).then((result) => {
                    res.json((result > 0));
                }).catch((err) => {
                    console.log(err);
                    res.json(false);
                })
            }
        }
    }
}
