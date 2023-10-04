module.exports = (db) => {
    db.NativeItem.afterUpdate((item) => {
        if (item.dataValues.unique !== item._previousDataValues.unique) {
            db.InventoryItem.destroy({ where: { itemId: item.dataValues.id } })
            if (item.dataValues.unique) {
                item.update({ currency: false })
            }
        }
        if (item.dataValues.currency !== item._previousDataValues.currency && item.dataValues.currency) {
            item.update({ equippable: false, unique: false })
        }
        if (item.dataValues.equippable !== item._previousDataValues.equippable && item.dataValues.equippable) {
            item.update({ currency: false })
        }
    })
}