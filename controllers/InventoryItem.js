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
                var reqData = limitAttributes(req.body, ["cacheId", "characterId", "itemId"])
                db.InventoryItem.create(reqData).then((response) => { res.json(response) })
            },
            update: (db, req, res) => {
                reqData = limitAttributes(req.body, ["quantity", "equipped"]);
                db.InventoryItem.findByPk(req.body.id).then((inventoryItem) => {
                    inventoryItem.update(reqData).then(() => {
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
                db.InventoryItem.destroy({ where: { id: req.query.id } }).then((result) => {
                    res.json((result > 0));
                }).catch((err) => {
                    console.log(err);
                    res.json(false);
                })
            }
        }
    }
}
