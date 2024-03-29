module.exports = (db) => {
    db.Game.afterCreate((game) => {
        db.Locale.create({ name: "Overworld Locale", mapSrc: "./assets/defaultMap.jpeg", gameId: game.dataValues.id }, { returning: ["id"] })
            .then((res) => {
                game.update({ overworldId: res.dataValues.id })
            })
    })
}