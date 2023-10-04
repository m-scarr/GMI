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
                var reqData = limitAttributes(req.body, ["gameId", "category"]);
                var name = "New ";
                if (reqData.category === "heroes") {
                    name += "Hero";
                    reqData.markerSrc = "./assets/hero.png";
                } else if (reqData.category === "npcs") {
                    name += "NPC";
                    reqData.markerSrc = "./assets/npc.png";
                } else {
                    name += "Enemy";
                    reqData.markerSrc = "./assets/enemy.png";
                }
                reqData.name = name;
                db.Character.create(reqData).then((response) => { res.json(response) });
            },
            update: (db, req, res) => {
                var reqData = limitAttributes(req.body, ["name", "unique", "markerSrc", "localeId", "x", "y", "visible", "hp", "maxHp"]);
                db.Character.findByPk(req.body.id).then((character) => {
                    character.update(reqData).then(() => {
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
                db.Character.destroy({ where: { id: req.query.id } }).then((result) => {
                    res.json((result > 0));
                }).catch((err) => {
                    console.log(err);
                    res.json(false);
                })
            }
        }
    }
}
